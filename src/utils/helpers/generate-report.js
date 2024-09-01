import { format } from 'date-fns';
import jsPDF from 'jspdf';

export const generatePDFReport = (shipment) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.width;
  
  // Add a header
  doc.setFillColor(25, 118, 210); // Material UI primary color
  doc.rect(0, 0, pageWidth, 40, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.text('Shipment Report', pageWidth / 2, 25, { align: 'center' });
  
  // Reset text color for body
  doc.setTextColor(0, 0, 0);
  
  // Add shipment details
  doc.setFontSize(14);
  doc.text(`Shipment ID: ${shipment.id}`, 20, 60);
  
  doc.setFontSize(12);
  const startY = 80;
  const lineHeight = 10;
  
  doc.text(`Date: ${format(new Date(shipment.created_at), 'dd/MM/yyyy')}`, 20, startY);
  doc.text(`Exporter: ${shipment.exporter ? shipment.exporter.name : 'N/A'}`, 20, startY + lineHeight);
  doc.text(`Importer: ${shipment.importer ? shipment.importer.name : 'N/A'}`, 20, startY + 2 * lineHeight);
  doc.text(`Category: ${shipment.category ? shipment.category.name : 'N/A'}`, 20, startY + 3 * lineHeight);
  doc.text(`Packaging: ${shipment.packaging ? shipment.packaging.name : 'N/A'}`, 20, startY + 4 * lineHeight);
  
  // Add status with colored box
  const statusY = startY + 5 * lineHeight;
  doc.setFillColor(shipment.status.color === 'success' ? 76 : 211, 
                   shipment.status.color === 'warning' ? 175 : 0, 
                   0);
  doc.rect(20, statusY - 5, 60, 10, 'F');
  doc.setTextColor(255, 255, 255);
  doc.text(`Status: ${shipment.status.label}`, 25, statusY);
  
  // Add flight information if available
  if (shipment.flight_ticket) {
    doc.setTextColor(0, 0, 0);
    doc.setFontSize(14);
    doc.text('Flight Information', 20, statusY + 20);
    doc.setFontSize(12);
    doc.text(`Airlines: ${shipment.flight_ticket.airlines.map(airline => airline.name).join(' + ')}`, 20, statusY + 35);
    doc.text(`Departure: ${format(new Date(shipment.flight_ticket.departure.datetime), 'dd/MM/yyyy HH:mm')}`, 20, statusY + 45);
    doc.text(`Airport: ${shipment.flight_ticket.departure.airport.name}`, 20, statusY + 55);
  }
  
  // Add footer
  doc.setFontSize(10);
  doc.setTextColor(150);
  doc.text(`Generated on ${format(new Date(), 'dd/MM/yyyy HH:mm')}`, pageWidth - 20, doc.internal.pageSize.height - 10, { align: 'right' });
  
  // Generate PDF blob and open in new tab
  const pdfBlob = doc.output('blob');
  const pdfUrl = URL.createObjectURL(pdfBlob);
  window.open(pdfUrl, '_blank');
};