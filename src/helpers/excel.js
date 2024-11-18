import * as XLSX from 'xlsx/xlsx.mjs';

export default function downloadExcel(data = [], name = "State Backend") {
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook,`${name}` +new Date().toLocaleString("en-IN")+".xlsx");
  
  
  }