import { sendContact } from "../../utils/emailer.mjs";

const sendContactFormEmailController = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Send the contact email
    await sendContact(name, email, message);

    // Send response
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
};

export default sendContactFormEmailController;
