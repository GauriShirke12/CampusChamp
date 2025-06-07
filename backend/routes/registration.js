const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

router.post('/', async (req, res) => {
  const { name, email, eventTitle, collegeOrOrganization } = req.body;

  if (!name || !email || !eventTitle || !collegeOrOrganization) {
    return res.status(400).json({ msg: 'All fields are required.' });
  }

  try {
    // (Optional) You can save the registration to a DB here.

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,     // your email (from .env)
        pass: process.env.EMAIL_PASS,     // your app-specific password
      },
    });

    // Compose email
    const mailOptions = {
      from: `"CampusChamp" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: `Registration Confirmed: ${eventTitle}`,
      html: `
        <p>Hi <strong>${name}</strong>,</p>
        <p>Thank you for registering for the event: <strong>${eventTitle}</strong>.</p>
        <p><strong>College/Organization:</strong> ${collegeOrOrganization}</p>
        <p>We're excited to have you participate!</p>
        <br/>
        <p>Regards,<br/>CampusChamp Team</p>
      `,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res.status(200).json({ msg: 'Registration successful. Confirmation email sent.' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ msg: 'Server error. Could not send email.' });
  }
});

module.exports = router;
