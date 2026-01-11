import express from 'express'
import rateLimit from 'express-rate-limit'
import nodemailer from 'nodemailer'

// Optional: Import controller functions if you still have them for admin routes
// import { getAllContactMessages, updateContactMessage, deleteContactMessage } from '../controllers/contactController.js'

const router = express.Router()

// --- Rate Limiting ---
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, 
  message: {
    success: false,
    error: 'Too many contact form submissions. Please try again later.'
  },
  standardHeaders: true,
  legacyHeaders: false,
})

// --- The Email Sending Function ---
const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  // Basic Validation
  if (!name || !email || !message) {
    return res.status(400).json({ success: false, error: 'Please fill in all fields.' });
  }

  try {
    // 1. Configure Transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER, // Your Gmail address
        pass: process.env.EMAIL_PASS, // Your App Password
      },
    });

    // 2. Email Options
    const mailOptions = {
      from: process.env.EMAIL_USER, // Sender must be YOU
      to: process.env.EMAIL_USER,   // 🟢 Sends to YOU. Change this if you want it sent elsewhere.
      replyTo: email,               // Reply to the visitor
      subject: `Portfolio Message: ${subject || 'No Subject'}`,
      text: `
        Name: ${name}
        Email: ${email}
        Subject: ${subject}
        
        Message:
        ${message}
      `,
    };

    // 3. Send Email & Log ID
    const info = await transporter.sendMail(mailOptions);

    // 🟢 DEBUG LOGS (Check Render Logs for this)
    console.log("--------------------------------------------------");
    console.log("✅ Message Sent Successfully!");
    console.log("🆔 Message ID:", info.messageId);
    console.log("📨 Accepted by:", info.accepted);
    console.log("--------------------------------------------------");
    
    return res.status(200).json({ success: true, message: 'Message sent successfully!' });

  } catch (error) {
    console.error('🔥 Email Error:', error);
    return res.status(500).json({ success: false, error: 'Server error sending email.' });
  }
};

// --- Routes ---

// Public route: Submit Contact Form
router.post('/', contactLimiter, submitContact)

// Admin routes (Placeholders - keep your imports if you have the controller)
router.get('/', (req, res) => res.status(501).json({message: "Admin route not implemented in this file"}))
router.put('/:id', (req, res) => res.status(501).json({message: "Admin route not implemented in this file"}))
router.delete('/:id', (req, res) => res.status(501).json({message: "Admin route not implemented in this file"}))

export default router