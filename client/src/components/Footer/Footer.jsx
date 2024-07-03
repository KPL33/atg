import "./footer.css";
import email from "../../../src/assets/email.svg";
import github from "../../../src/assets/github.svg";
import linkedin from "../../../src/assets/LI-white_clear.png";
import leetcode from "../../../src/assets/leetcode_logo.svg";
import reactLogo from "../../../src/assets/react_white.svg";

const Footer = () => {
  const emailAddress = "kevdev@myyahoo.com";

  const handleEmailClick = () => {
    window.location.href = `mailto:${emailAddress}`;
  };
  return (
    <footer className="footer">
      <div className="email-container">
        <a
          className="email-link"
          href={`mailto:${emailAddress}`}
          onClick={handleEmailClick}
        >
          <img className="email" src={email} alt="Email icon" />
          <p>kevdev@myyahoo.com</p>
        </a>
      </div>
      <div className="socials">
        <a href="https://www.linkedin.com/in/kevin-lewis92126">
          <img
            className="linkedin"
            src={linkedin}
            alt="LinkedIn logo"
          />
        </a>
        <a href="https://github.com/KPL33">
          <img className="github" src={github} alt="GitHub logo" />
        </a>
        <a href="https://leetcode.com/KPL33/">
          <img
            className="leetcode"
            src={leetcode}
            alt="LeetCode logo"
          />
        </a>
      </div>
      <div className="made-with">
        <p>
          This site made with <span>React</span>
        </p>
        <img className="react" src={reactLogo} alt="React logo" />
        <p>by Kevin Lewis</p>
      </div>
    </footer>
  );
};
export default Footer;
