const nodemailer = require("nodemailer")

// Create a test account or replace with real credentials.
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "mslistofficial@gmail.com",
    pass: "czgc upbl kiyo zbrf",
  },
});

const sendEmail = async (to, subject, text, html) => {
    try {
        await transporter.sendMail({
            from: `mslistofficial@gmail.com`,
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