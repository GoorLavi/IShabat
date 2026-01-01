// convert-shabat-times.js
const xlsx = require("xlsx");
const fs = require("fs");

// CHANGE THIS to your real file name if needed
const INPUT_FILE = "./scripts/spreadsheet.xlsx";
// choose where to save the JSON
const OUTPUT_FILE = "shabat_times_2025.json";

// set your cutoff date (everything BEFORE this will be filtered out)
const cutoff = new Date("2025-12-11"); // or: new Date() for "from today and on"

// Helper function to convert Excel serial date to ISO string (YYYY-MM-DD)
function excelDateToISO(serial) {
  if (typeof serial !== "number") return serial;
  const excelEpoch = new Date(1900, 0, 1).getTime();
  const daysToMs = (serial - 2) * 24 * 60 * 60 * 1000;
  const date = new Date(excelEpoch + daysToMs);
  return date.toISOString().split("T")[0];
}

// Helper function to convert decimal time to HH:MM format
function decimalToTime(decimal) {
  if (typeof decimal !== "number" || decimal === null) return decimal;
  const totalMinutes = Math.round(decimal * 24 * 60);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
}

// 1. read workbook
const workbook = xlsx.readFile(INPUT_FILE);

// 2. pick first sheet (or change index/name if needed)
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];

// 3. convert sheet to JSON rows
let rows = xlsx.utils.sheet_to_json(sheet, { defval: null });

// 4. figure out which column is the date column
const dateColumnName = "date";

// 5. filter by date and transform to desired format
let rowIndex = 0;
const filtered = rows
  .filter((row) => {
    const raw = row[dateColumnName];

    if (!raw) {
      rowIndex++;
      return false;
    }

    // Convert Excel serial date to JavaScript Date for filtering
    let d;
    if (typeof raw === "number") {
      const excelEpoch = new Date(1900, 0, 1).getTime();
      const daysToMs = (raw - 2) * 24 * 60 * 60 * 1000;
      d = new Date(excelEpoch + daysToMs);
    } else {
      d = new Date(raw);
    }

    rowIndex++;
    return d >= cutoff;
  })
  .map((row) => {
    // Transform the row to match the desired format
    return {
      date: excelDateToISO(row.date),
      parasha: row.parasha,
      heb_date: row.heb_date,
      type: row.type,
      Jerusalem_in: decimalToTime(row.Jerusalem_in),
      Jerusalem_out: decimalToTime(row.Jerusalem_out),
      TelAviv_in: decimalToTime(row.TelAviv_in),
      TelAviv_out: decimalToTime(row.TelAviv_out),
      Hayfa_in: decimalToTime(row.Hayfa_in),
      Hayfa_out: decimalToTime(row.Hayfa_out),
      BeerSheva_in: decimalToTime(row.BeerSheva_in),
      BeerSheva_out: decimalToTime(row.BeerSheva_out),
    };
  });

// 6. write JSON with indentation
fs.writeFileSync(OUTPUT_FILE, JSON.stringify(filtered, null, 2), "utf8");

console.log(`✅ Wrote ${filtered.length} rows to ${OUTPUT_FILE}`);
