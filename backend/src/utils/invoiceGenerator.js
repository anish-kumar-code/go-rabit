const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

const generateInvoice = async (order, filePath) => {
    return new Promise((resolve, reject) => {
        const dir = path.dirname(filePath);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        const doc = new PDFDocument({ margin: 50 });
        const stream = fs.createWriteStream(filePath);
        doc.pipe(stream);

        // ✅ Gorabit Branding
        doc.fontSize(22).text('Gorabit', { align: 'center' });
        // doc.fontSize(12).text('Empowering Digital Solutions', { align: 'center' });
        doc.moveDown();
        doc.moveTo(50, doc.y).lineTo(550, doc.y).stroke(); // line separator
        doc.moveDown();

        // 🧾 Invoice Header
        doc.fontSize(14).text(`Booking ID: ${order.booking_id}`);
        doc.text(`Customer: ${order.userId?.name}`);
        doc.text(`Shop: ${order.shopId?.name}`);
        doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`);
        doc.moveDown();

        // 📦 Order Summary
        doc.fontSize(16).text('Order Summary');
        doc.moveDown();

        doc.fontSize(12).text(`Product: ${order.productData?.product_id?.name}`);
        doc.text(`Price: Rs. ${order.productData?.price}`);
        doc.text(`Quantity: ${order.productData?.quantity}`);
        doc.text(`Total: Rs. ${order.finalTotalPrice}`);

        doc.end();

        stream.on('finish', () => resolve(filePath));
        stream.on('error', reject);
    });
};

module.exports = generateInvoice;
