'use server'
import nodemailer from 'nodemailer';

export async function sendTestEmail(recipientEmail: any) {
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        secure: process.env.EMAIL_SERVER_PORT === '465', // true dla portu 465, false dla innych portów
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      });
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: recipientEmail,
    subject: 'Test Email from Next.js',
    text: 'This is a test email sent from the Next.js application using nodemailer.',
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent: ' + info.response);
    return true;
  } catch (error) {
    console.error('Failed to send email: ', error);
    return false;
  }
}