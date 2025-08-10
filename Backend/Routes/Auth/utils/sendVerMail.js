const crypto = require('crypto');
const nodemailer = require('nodemailer');
const { send } = require('process');
require('dotenv').config();
const { ADMIN_EMAIL, ADMIN_PASSWORD , VERIFY_URL } = process.env;

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: { user: ADMIN_EMAIL, pass: ADMIN_PASSWORD },
});

async function sendVerificationEmail(userEmail, token) {
    // for now yaha localhost aaega 
     const url = `${VERIFY_URL}${token}`;

    await transporter.sendMail({
        to: userEmail,
        subject: 'Verify Your Email',
        html: `<p>Please verify your email by clicking <a href="${url}">here</a>.</p>`,
    });
}

async function sendLoginAlertEmail(userEmail) {
  await transporter.sendMail({
    to: userEmail,
    subject: 'Alert: Multiple Failed Login Attempts',
    html: `<p>There were multiple failed login attempts on your account. Your account is locked for 10 minutes for security. If this wasn't you, please reset your password immediately.</p>`,
  });
}


module.exports = { sendVerificationEmail , sendLoginAlertEmail };
