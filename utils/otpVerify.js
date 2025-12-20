const nodemailer = require("nodemailer")

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,        // SSL
  secure: false, 
  auth: {
    user: process.env.FROM_EMAIL,
    pass: process.env.PASS_EMAIL,
  },
});

const sendEmail = async (to, subject, text, html) => {
    try {
        await transporter.sendMail({
            from: process.env.FROM_EMAIL,
            to,
            subject,
            text,
            html
        });
        console.log("Email sent successfully");
    } catch (error) {
        console.error("Email error:", error);
    }
};

module.exports = sendEmail