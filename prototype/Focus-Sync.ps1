# Windows PowerShell 5.1. Run alongside the existing Ticket Asystent Token.ps1.
[CmdletBinding()]
param([string]$Account)
$ErrorActionPreference = 'Stop'
$readyFile = Join-Path $PSScriptRoot 'focus-calendar-ready.json'
$session = [guid]::NewGuid().ToString()
$headers = @{}
$token = $null

function Parse-JsonText([string]$json) {
    if ((Get-Command ConvertFrom-Json).Parameters.ContainsKey('DateKind')) {
        return ConvertFrom-Json -InputObject $json -DateKind String
    }
    return ConvertFrom-Json -InputObject $json
}
function Write-NewJson($path,$data) {
    $temp = "$path.$session.tmp"
    [IO.File]::WriteAllText($temp, ($data | ConvertTo-Json -Depth 8), (New-Object Text.UTF8Encoding($false)))
    [IO.File]::Move($temp,$path)
}
function Timestamp($value) {
    if ($value -is [DateTime]) { return $value.ToUniversalTime().ToString("yyyy-MM-ddTHH:mm:ss.fffZ") }
    if ($value -is [DateTimeOffset]) { return $value.UtcDateTime.ToString("yyyy-MM-ddTHH:mm:ss.fffZ") }
    return [string]$value
}
function Same-Date($a,$b) {
    if (-not $a -or -not $b) { return (-not $a -and -not $b) }
    return ([DateTimeOffset]::Parse((Timestamp $a)) -eq [DateTimeOffset]::Parse((Timestamp $b)))
}
function Request-Api($method,$route,$body) {
    $argsApi = @{ Uri = "https://api.xurrent.com/v1/$route"; Headers=$headers; Method=$method; MaximumRedirection=0; TimeoutSec=30; ErrorAction='Stop' }
    if ($null -ne $body) { $argsApi.ContentType='application/json'; $argsApi.Body=($body | ConvertTo-Json -Compress) }
    $response = Invoke-WebRequest -UseBasicParsing @argsApi
    return Parse-JsonText $response.Content
}
function Apply-Deadline($change,$owner) {
    $id = [string]$change.id
    if ($id -notmatch '^[1-9][0-9]{0,14}$') { throw 'Unsupported Xurrent request ID.' }
    $destination = Timestamp $change.to
    if ($destination -notmatch '^\d{4}-\d\d-\d\dT\d\d:\d\d:\d\d(\.\d{1,3})?Z$') { throw 'Invalid destination timestamp.' }
    $null = [DateTimeOffset]::Parse($destination)
    $route = "requests/$id"
    $current = Request-Api 'Get' $route $null
    if ([string]$current.id -ne $id -or $current.subject -cne $change.subject -or [string]$current.member.id -ne [string]$owner -or $current.status -eq 'completed') {
        throw 'Request changed, closed or reassigned. Refresh the export.'
    }
    if (-not ($current.PSObject.Properties.Name -contains 'desired_completion_at')) { throw 'Current desired completion is unavailable.' }
    if (-not (Same-Date $current.desired_completion_at $change.to)) {
        if (-not (Same-Date $current.desired_completion_at $change.from)) { throw 'Deadline changed in Xurrent. Refresh the export.' }
        $null = Request-Api 'Patch' $route @{ desired_completion_at = $destination }
        $after = Request-Api 'Get' $route $null
        if (-not (Same-Date $after.desired_completion_at $change.to)) { throw 'Write could not be verified. Refresh the export.' }
    }
    return @{ id=$id; status='verified'; to=$destination }
}
try {
    if (-not $Account) { $Account = Read-Host 'Xurrent account (account ID in your ticket export)' }
    if ($Account -notmatch '^[a-zA-Z0-9_-]+$') { throw 'Invalid Xurrent account.' }
    . (Join-Path $PSScriptRoot 'Token.ps1')
    $token = Get-XurrentToken
    $credential = New-Object System.Net.NetworkCredential('', $token)
    $headers = @{ Authorization=('Bearer '+$credential.Password.Trim()); 'X-Xurrent-Account'=$Account; Accept='application/json' }
    $me = Request-Api 'Get' 'me' $null
    if (-not $me.id) { throw 'Could not verify Xurrent user.' }
    # Exclusive open keeps two running helpers from claiming the same folder.
    $lock = [IO.File]::Open((Join-Path $PSScriptRoot 'focus-calendar.lock'),'OpenOrCreate','ReadWrite','None')
    if (Test-Path -LiteralPath $readyFile) { Remove-Item -LiteralPath $readyFile }
    Write-NewJson $readyFile @{session=$session;account=$Account;owner=[string]$me.id}
    Write-Host 'Focus calendar sync ready. Keep this window open. Press Ctrl+C to stop.'
    while ($true) {
        foreach ($file in @(Get-ChildItem -LiteralPath $PSScriptRoot -Filter 'focus-calendar-*.request.json' -File)) {
            if ($file.Name -notmatch '^focus-calendar-([0-9a-f-]{36})\.request\.json$') { continue }
            $batch=$Matches[1]
            $resultFile=Join-Path $PSScriptRoot "focus-calendar-$batch.result.json"
            if (Test-Path -LiteralPath $resultFile) { continue }
            try { $request=Parse-JsonText ([IO.File]::ReadAllText($file.FullName)) } catch { continue }
            if ($request.session -cne $session -or $request.batch -cne $batch -or $request.version -ne 1) { continue }
            $age=([DateTimeOffset]::UtcNow-[DateTimeOffset]::Parse((Timestamp $request.created))).TotalSeconds
            $results=@()
            foreach ($change in @($request.changes)) {
                try {
                    if ($age -lt -10 -or $age -gt 120) { throw 'Expired batch. Review the drafts again.' }
                    $results += Apply-Deadline $change $me.id
                } catch {
                    $results += @{id=[string]$change.id;status='unverified';message='Could not confirm deadline. Refresh the export and check the request.'}
                    Write-Host "Request $($change.id): $($_.Exception.Message)"
                }
            }
            Write-NewJson $resultFile @{batch=$batch;session=$session;results=$results}
            Write-Host "Processed $($results.Count) deadline changes."
            Remove-Item -LiteralPath $file.FullName
        }
        Start-Sleep -Milliseconds 500
    }
} finally {
    if ($lock) {
        if (Test-Path -LiteralPath $readyFile) { Remove-Item -LiteralPath $readyFile }
        $lock.Dispose()
    }
    $headers.Clear()
    $credential=$null
    if ($token) { $token.Dispose() }
}
