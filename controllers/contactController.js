const nodemailer = require('nodemailer');
const Inquiry = require('../models/Inquiry');

const submitContact = async (req, res, next) => {
  try {
    const { name, email, phone, service, message } = req.body;

    // Save to database if MongoDB is connected
    if (require('mongoose').connection.readyState === 1) {
      await Inquiry.create({ name, email, phone, service, message });
    }

    // Send email notification
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD
      }
    });

    const contactEmail = process.env.CONTACT_EMAIL || process.env.SMTP_USER;

    const mailOptions = {
      from: `"Sharp Properties Website" <${process.env.SMTP_USER}>`,
      to: contactEmail,
      replyTo: email,
      subject: `New Inquiry — ${service}`,
      html: `
        <div style="font-family:Arial,sans-serif;max-width:600px;margin:0 auto;">
          <h2 style="color:#DFA900;border-bottom:2px solid #DFA900;padding-bottom:10px;">New Contact Inquiry</h2>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="padding:8px 0;font-weight:bold;color:#333;">Name:</td><td style="padding:8px 0;">${name}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#333;">Email:</td><td style="padding:8px 0;">${email}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#333;">Phone:</td><td style="padding:8px 0;">${phone}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#333;">Service:</td><td style="padding:8px 0;">${service}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#333;">Message:</td><td style="padding:8px 0;">${message}</td></tr>
            <tr><td style="padding:8px 0;font-weight:bold;color:#333;">Date:</td><td style="padding:8px 0;">${new Date().toLocaleString()}</td></tr>
          </table>
        </div>
      `
    };

    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      await transporter.sendMail(mailOptions);
    } else {
      console.log('SMTP not configured. Email skipped. Inquiry saved to console.');
      console.log('--- Inquiry ---');
      console.log(JSON.stringify({ name, email, phone, service, message }, null, 2));
    }

    res.status(200).json({
      success: true,
      message: 'Your inquiry has been submitted successfully.'
    });
  } catch (error) {
    console.error('Contact form error:', error.message);
    res.status(500).json({
      success: false,
      message: 'Unable to process your inquiry. Please try again later.'
    });
  }
};

module.exports = { submitContact };
