const nodemailer = require('nodemailer');

const sendContactMessage = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' });
    }
    // Setup transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.EMAIL_PORT) || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
    // Send email to admin
    await transporter.sendMail({
      from: process.env.EMAIL_FROM || email,
      to: process.env.ADMIN_EMAIL,
      subject: 'New Contact Us Message',
      html: `<h2>Contact Us Submission</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong><br/>${message}</p>`
    });
    res.json({ success: true, message: 'Message sent to admin.' });
  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({ success: false, message: error.message || 'Failed to send message.' });
  }
};

module.exports = { sendContactMessage };
