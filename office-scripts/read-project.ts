interface ProjectTask {
  sourceRow: number;
  section: string;
  step: string;
  description: string;
  systemsAffected: string;
  owner: string;
  statusText: string;
  dueDateText: string;
  dependencies: string;
  comments: string;
}
interface ReviewRow {
  sourceRow: number;
  reason: string;
  cells: string[];
}
function main(workbook: ExcelScript.Workbook): string {
  const sheet = workbook.getWorksheet("Tabelle1");
  if (!sheet) throw new Error("Worksheet Tabelle1 was not found. No data was changed.");
  const used = sheet.getUsedRange(true);
  if (!used) throw new Error("Tabelle1 is empty. No data was changed.");
  const rows = used.getTexts();
  const firstRow = used.getRowIndex() + 1;
  const expected = ["Step", "Description", "Systems affected", "Owner", "Status", "Due Date", "Dependencies", "Comments"];
  const normalize = (text: string): string => text.replace(/\s+/g, " ").trim().toLowerCase();
  let headerIndex = -1;
  let columns: number[] = [];
  for (let i = 0; i < rows.length; i++) {
    const headings = rows[i].map((value) => normalize(value));
    const positions = expected.map((name) => headings.indexOf(normalize(name)));
    if (positions.every((position) => position >= 0)) {
      headerIndex = i;
      columns = positions;
      break;
    }
  }
  if (headerIndex < 0) throw new Error("Expected eight project columns were not found. Check the header row. No data was changed.");
  const tasks: ProjectTask[] = [];
  const reviewRows: ReviewRow[] = [];
  const sections: ReviewRow[] = [];
  const preamble: ReviewRow[] = [];
  let section = "";
  let blankRowCount = 0;
  let repeatedHeaderCount = 0;
  for (let i = 0; i < rows.length; i++) {
    const cells = rows[i].map((value) => value.trim());
    const sourceRow = firstRow + i;
    if (cells.every((value) => value === "")) { blankRowCount++; continue; }
    if (i < headerIndex) {
      preamble.push({sourceRow, reason: "Before project header", cells});
      continue;
    }
    if (i === headerIndex) continue;
    if (expected.every((name, k) => normalize(cells[columns[k]]) === normalize(name))) {
      repeatedHeaderCount++; continue;
    }
    const values = columns.map((column) => cells[column] || "");
    const step = values[0];
    const description = values[1];
    // Only a non-numeric Step cell is populated: a likely section heading.
    if (step !== "" && !/^\d+(?:[.,]\d+)*\.?$/.test(step) && cells.filter((value) => value !== "").length === 1) {
      section = step;
      sections.push({sourceRow, reason: "Section candidate: verify once against the workbook", cells});
      continue;
    }
    // Keep ambiguous rows for review, rather than silently dropping them.
    if (!step || !description) {
      reviewRows.push({sourceRow, reason: "Missing Step or Description; possible note or continuation", cells});
      continue;
    }
    tasks.push({sourceRow, section, step, description,
      systemsAffected: values[2], owner: values[3], statusText: values[4],
      dueDateText: values[5], dependencies: values[6], comments: values[7]});
    if (cells.some((value, column) => value !== "" && columns.indexOf(column) < 0)) {
      reviewRows.push({sourceRow, reason: "Task also contains data outside the eight mapped columns", cells});
    }
  }
  const summary = {
    worksheet: sheet.getName(), usedRange: used.getAddress(),
    headerRow: firstRow + headerIndex, scannedRowCount: rows.length,
    taskCount: tasks.length, sectionCount: sections.length,
    reviewRowCount: reviewRows.length, blankRowCount, repeatedHeaderCount
  };
  // Log counts only; full project data remains in the returned result.
  console.log(JSON.stringify(summary));
  return JSON.stringify({schemaVersion: "1.0", extractedAtUtc: new Date().toISOString(),
    summary, tasks, sections, reviewRows, preamble});
}
