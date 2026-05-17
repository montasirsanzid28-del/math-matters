import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';
import 'dotenv/config';

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API route for email inquiry
  app.post('/api/inquiry', async (req, res) => {
    const { name, phone, subject, grade, message } = req.body;

    if (!name || !phone) {
      return res.status(400).json({ error: 'Name and Phone are required.' });
    }

    try {
      // Create a test account if no SMTP credentials are provided
      const user = process.env.SMTP_USER;
      const pass = process.env.SMTP_PASS;

      let transporter;
      if (user && pass) {
        transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com', // Assuming Gmail, configure as needed
          port: 465,
          secure: true,
          auth: { user, pass },
        });
      } else {
        // Fallback to ethereal email for testing if no credentials are set
        const testAccount = await nodemailer.createTestAccount();
        transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: testAccount.user, // generated ethereal user
            pass: testAccount.pass, // generated ethereal password
          },
        });
      }

      const info = await transporter.sendMail({
        from: '"Math Matters Inquiry" <noreply@mathmatters.com>',
        to: 'minev6427@gmail.com',
        subject: `New Enrollment Inquiry from ${name}`,
        text: `
Name: ${name}
Phone: ${phone}
Subject of Interest: ${subject || 'Not specified'}
Grade: ${grade || 'Not specified'}

Message:
${message || 'No additional message.'}
        `,
        html: `
          <h3>New Enrollment Inquiry</h3>
          <ul>
            <li><strong>Name:</strong> ${name}</li>
            <li><strong>Phone:</strong> ${phone}</li>
            <li><strong>Subject:</strong> ${subject || 'Not specified'}</li>
            <li><strong>Grade:</strong> ${grade || 'Not specified'}</li>
          </ul>
          <h4>Message:</h4>
          <p>${message ? message.replace(/\n/g, '<br/>') : 'No additional message.'}</p>
        `,
      });

      console.log('Message sent: %s', info.messageId);

      // If using ethereal, log the preview URL
      if (!user) {
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
      }

      res.status(200).json({ success: true, message: 'Inquiry sent successfully!' });
    } catch (error) {
      console.error('Error sending email:', error);
      res.status(500).json({ error: 'Failed to send inquiry. Please check server configuration.' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    // Production serving
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
