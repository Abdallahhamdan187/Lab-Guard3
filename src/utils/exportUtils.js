import jsPDF from 'jspdf';
import * as XLSX from 'xlsx';

/**
 * Export transactions to PDF format
 * @param {Array} transactions - Array of transaction objects
 * @param {string} fileName - Output file name
 */
export function exportToPDF(transactions, fileName = 'transactions.pdf') {
  const doc = new jsPDF();
  
  // Add header
  doc.setFontSize(20);
  doc.text('LabGuard - Transaction Report', 20, 20);
  
  doc.setFontSize(12);
  doc.text(`Al Hussein Technical University`, 20, 30);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 37);
  
  // Add table headers
  let y = 50;
  doc.setFontSize(10);
  doc.setFont(undefined, 'bold');
  doc.text('Date', 20, y);
  doc.text('Equipment', 60, y);
  doc.text('Type', 120, y);
  doc.text('Status', 150, y);
  
  // Add transaction data
  y += 7;
  doc.setFont(undefined, 'normal');
  
  transactions.forEach((txn) => {
    if (y > 270) {
      doc.addPage();
      y = 20;
    }
    
    const date = new Date(txn.requestDate).toLocaleDateString();
    doc.text(date, 20, y);
    doc.text(txn.equipmentName.substring(0, 20), 60, y);
    doc.text(txn.type, 120, y);
    doc.text(txn.status, 150, y);
    y += 7;
  });
  
  doc.save(fileName);
}

/**
 * Export transactions to Excel format
 * @param {Array} transactions - Array of transaction objects
 * @param {string} fileName - Output file name
 */
export function exportToExcel(transactions, fileName = 'transactions.xlsx') {
  const data = transactions.map(txn => ({
    'Date': new Date(txn.requestDate).toLocaleDateString(),
    'Equipment': txn.equipmentName,
    'User': txn.userName,
    'Type': txn.type,
    'Status': txn.status,
    'Quantity': txn.quantity,
    'Purpose': txn.purpose,
    'Approved By': txn.approvedBy || 'N/A'
  }));
  
  const ws = XLSX.utils.json_to_sheet(data);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Transactions');
  
  XLSX.writeFile(wb, fileName);
}
