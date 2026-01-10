import 'dotenv/config';     
import nodemailer from 'nodemailer'

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: process.env.EMAIL_PORT || 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  })
}

// Verify transporter configuration
const verifyTransporter = async () => {
  try {
    const transporter = createTransporter()
    await transporter.verify()
    console.log('Email transporter verified successfully')
    return true
  } catch (error) {
    console.error('Email transporter verification failed:', error)
    return false
  }
}

// Send email function
export const sendEmail = async ({ to, subject, html }) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Deepak Singh Portfolio'}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }

  } catch (error) {
    console.error('Error sending email:', error)
    throw new Error('Failed to send email')
  }
}

// Send email with attachments
export const sendEmailWithAttachment = async ({ to, subject, html, attachments }) => {
  try {
    const transporter = createTransporter()

    const mailOptions = {
      from: `"${process.env.EMAIL_FROM_NAME || 'Deepak Singh Portfolio'}" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
      attachments,
    }

    const info = await transporter.sendMail(mailOptions)
    console.log('Email with attachments sent successfully:', info.messageId)
    return { success: true, messageId: info.messageId }

  } catch (error) {
    console.error('Error sending email with attachments:', error)
    throw new Error('Failed to send email with attachments')
  }
}

// Initialize email service verification on startup
verifyTransporter()

export default {
  sendEmail,
  sendEmailWithAttachment,
  verifyTransporter
}