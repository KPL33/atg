import "./header.css";
import atgLogo from "../../../src/assets/atg_logo.svg";

import Nav from "./Nav/Nav.jsx";

const Header = () => {
  return (
    <header className="header">
      <img className="logo" src={atgLogo}></img>
      <div className="title-container">
        <div className="company-title">
          <h1 className="against">Against</h1>
          <h1 className="the">the</h1>
          <h1 className="grains">Grains</h1>
        </div>
        <h3 className="subtitle">
          The best grain-free cereal ever.
        </h3>
      </div>
      <Nav id="nav-sidebar" />
    </header>
  );
};
export default Header;
