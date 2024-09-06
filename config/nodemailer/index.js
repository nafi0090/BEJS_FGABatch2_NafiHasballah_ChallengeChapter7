const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
    },
});

const sendResetPasswordEmail = (email, token) => {
    const resetLink = `http://localhost:5000/api/v1/auth/reset-password/${token}`;
    return transporter.sendMail({
        to: email,
        subject: 'Reset Password',
        text: `Click the following link to reset your password: ${resetLink}`,
    });
};

module.exports = {
    sendResetPasswordEmail
};