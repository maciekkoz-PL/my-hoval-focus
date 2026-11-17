"""Offline structural and sensitive-data checks; not a tenant/runtime validation."""
import json,re
from pathlib import Path
import xml.etree.ElementTree as ET
import yaml
root=Path(__file__).resolve().parents[1]
files=[p for p in root.rglob('*') if p.is_file() and not any(x in p.parts for x in ('.git','node_modules','__pycache__'))]
for p in files:
    if p.suffix=='.json': json.loads(p.read_text())
    if p.suffix in ('.yaml','.yml'):
        parsed=yaml.safe_load(p.read_text()); assert parsed, p
    if p.suffix in ('.png','.xlsx','.zip','.msapp','.har'): raise AssertionError(f'Unexpected binary/export: {p}')
    text=p.read_text()
    assert not re.search(r'https://hoval(?:-my)?\.sharepoint\.com',text), f'Corporate URL: {p}'
    assert not re.search(r'[\w.+-]+@hoval\.com',text,re.I), f'Corporate email: {p}'
    assert not re.search(r'gh[pousr]_[A-Za-z0-9]{30,}',text), f'Possible token: {p}'
columns=json.loads((root/'sharepoint/ProjectTasks.columns.json').read_text())['columns']
assert len({c['name'] for c in columns})==15
for c in columns: assert ET.fromstring(c['schemaXml']).get('Name')==c['name']
key=ET.fromstring(next(c['schemaXml'] for c in columns if c['name']=='SourceKey'))
assert key.get('Indexed')=='TRUE' and key.get('EnforceUniqueValues')=='TRUE'
source=(root/'powerapps/my-sources/controls.pa.yaml').read_text()
assert 'mhffrmSource.Item' not in source
fixture=json.loads((root/'tests/fixtures/project-result.synthetic.json').read_text())
assert len(fixture['tasks'])==41 and len(fixture['sections'])==6
rows=[x['sourceRow'] for x in fixture['tasks']+fixture['sections']]
assert sorted(rows)==list(range(3,50))
print(f'Validated {len(files)} text files: JSON/YAML/XML, source invariants, fixture rows and targeted sensitive-data checks.')
