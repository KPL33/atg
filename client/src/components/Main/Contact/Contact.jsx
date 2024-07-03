import { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import "../Login/forms.css";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showBackToHomeLink, setShowBackToHomeLink] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:3000/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send email");
      }

      // Show success message
      setShowSuccessMessage(true);

      // Optionally show back to home link after success message timeout
      setTimeout(() => {
        setShowSuccessMessage(false); // Reset success message state after delay
        setShowBackToHomeLink(true); // Show back to home link
      }, 6000); // Reset after 6 seconds (adjust as needed)

      const result = await response.text();
      console.log("Server Response:", result);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // Reset back to home link state on formData change
  useEffect(() => {
    setShowBackToHomeLink(false);
  }, [formData]);

  return (
    <form name="contact" onSubmit={handleSubmit} className="login-signup-form">
      <h2 className="log-greeting">Contact Us!</h2>

      <div className="form-body">
        <div className="form-rows">
          <div className="form-row">
            <h4 className="field-title">Name:</h4>
            <label htmlFor="name-field">
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <h4 className="field-title">Email:</h4>
            <label htmlFor="email-field">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>

          <div className="form-row">
            <h4 className="field-title">Message:</h4>
            <label htmlFor="message-field">
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </label>
          </div>
        </div>
      </div>

      {showSuccessMessage && (
        <div className="form-message">Message sent successfully!</div>
      )}

      {showBackToHomeLink && (
        <Link className="signup-link back-contact-link" to="/">
          <span>{"\u21E6"}</span>
          <h4>Back to Home Page</h4>
        </Link>
      )}

      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default Contact;
