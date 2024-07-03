import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.mail.yahoo.com", // SMTP server address for Yahoo Mail
  port: 465, // SMTP port (SSL) for Yahoo Mail
  secure: true, // Use SSL/TLS
  auth: {
    user: process.env.EMAIL_USER, // Your Yahoo email address
    pass: process.env.EMAIL_PASS, // Your Yahoo email password
  },
  debug: true, // Enable debug mode for detailed SMTP communication
});

export const sendWelcome = (recipientEmail) => {
  transporter.sendMail(
    {
      to: recipientEmail,
      from: {
        name: "Against The Grains", // Display name
        address: process.env.EMAIL_USER, // Email address
      },
      subject: "Welcome to Against The Grains!",
      html: `<h2 style="color:blue;font-size:20px;">
      <em>Thank you for registering. This is a fictitious company and this email is for demonstration purposes only. We promise, we won't share your information! 😊</em>
    </h2>`,
    },
    (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    }
  );
};

export const sendContact = async (name, email, message) => {
  try {
    // Send the email
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender email address
      to: "gitajob@yahoo.com", // Recipient email address
      subject: "New message from contact form",
      html: `<p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Message:</strong> ${message}</p>`,
    });

    console.log("Contact form email sent successfully.");
  } catch (error) {
    console.error("Error sending contact form email:", error);
    throw error; // Throw the error to handle it elsewhere if needed
  }
};
