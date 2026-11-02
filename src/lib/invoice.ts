import type { IBooking } from "@/lib/types/booking";

export const downloadInvoice = async (booking: IBooking) => {
  const { jsPDF } = await import("jspdf");
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const left = 48;
  const right = 547;
  let y = 64;

  doc.setFillColor(194, 65, 12);
  doc.rect(0, 0, 595, 110, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(26);
  doc.text("StudioSpace", left, 62);
  doc.setFontSize(11);
  doc.setFont("helvetica", "normal");
  doc.text("Booking Invoice", left, 84);
  doc.text(`Invoice No: SS-${booking._id.slice(-8).toUpperCase()}`, right, 62, { align: "right" });
  doc.text(
    `Issued: ${new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}`,
    right,
    84,
    { align: "right" },
  );

  doc.setTextColor(30, 30, 40);
  y = 150;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Billed To", left, y);
  doc.text("Hosted By", 320, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(booking.userName, left, y + 18);
  doc.text(booking.userEmail, left, y + 34);
  doc.text(booking.hostName, 320, y + 18);
  doc.text(booking.hostEmail, 320, y + 34);

  y = 230;
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text("Studio", left, y);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.text(booking.studioTitle, left, y + 18);
  doc.text(`${booking.studioCategory} | ${booking.studioLocation}`, left, y + 34);
  doc.text(`Date: ${booking.date}`, left, y + 56);
  doc.text(`Time: ${booking.startTime} - ${booking.endTime} (${booking.hours} hrs)`, left, y + 72);
  doc.text(`Status: ${booking.status}`, left, y + 88);

  y = 360;
  doc.setFillColor(245, 240, 232);
  doc.rect(left, y, right - left, 28, "F");
  doc.setFont("helvetica", "bold");
  doc.text("Description", left + 12, y + 18);
  doc.text("Amount", right - 12, y + 18, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.text(
    `Studio rental: ${booking.hours} hrs x $${booking.hourlyRate.toFixed(2)}`,
    left + 12,
    y + 52,
  );
  doc.text(`$${booking.subtotal.toFixed(2)}`, right - 12, y + 52, { align: "right" });
  doc.text("Security deposit", left + 12, y + 78);
  doc.text(`$${booking.securityDeposit.toFixed(2)}`, right - 12, y + 78, { align: "right" });

  doc.setDrawColor(210, 205, 198);
  doc.line(left, y + 96, right, y + 96);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(14);
  doc.text("Total", left + 12, y + 122);
  doc.text(`$${booking.totalPrice.toFixed(2)}`, right - 12, y + 122, { align: "right" });

  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(110, 110, 120);
  doc.text(
    "Thank you for booking with StudioSpace. The security deposit is refundable subject to the host's studio rules.",
    left,
    760,
    { maxWidth: right - left },
  );

  doc.save(`StudioSpace-Invoice-${booking._id.slice(-8).toUpperCase()}.pdf`);
};
