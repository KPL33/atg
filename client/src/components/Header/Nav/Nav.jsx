import { Link } from "react-router-dom";
import { clearAuthenticated } from "../../../../../utils/auth.js";
import useAppContext from "../../../context/useAppContext.jsx";
import Hamburger from "hamburger-react";
import "./nav.css";

const Nav = () => {
  const { loggedIn, setLoggedIn, navOpen, setNavOpen, setSignoutClicked } =
    useAppContext();

  const handleSignOut = () => {
    clearAuthenticated();
    setLoggedIn(false);
    setSignoutClicked(true);
    setNavOpen(false);

    // Delay resetting signOutClicked after 5 seconds (5000 milliseconds)
    setTimeout(() => {
      setSignoutClicked(false);
    }, 6000); // Adjust the delay time (in milliseconds) as needed
  };

  return (
    <div className={`sidebar ${navOpen ? "open" : ""}`}>
      <div className="hamburger" onClick={() => setNavOpen(!navOpen)}>
        <Hamburger toggled={navOpen} toggle={setNavOpen} />
      </div>
      <nav className={`sidebar-nav ${navOpen ? "open" : ""}`}>
        {/* Navigation Links */}
        <Link to="/" className="nav-link" onClick={() => setNavOpen(false)}>
          <h3>Products</h3>
        </Link>
        <Link
          to="/about"
          className="nav-link"
          onClick={() => setNavOpen(false)}
        >
          <h3>About Us</h3>
        </Link>
        {/* Conditional Links based on loggedIn state */}
        <Link
          to="/login"
          className="nav-link"
          style={{ display: loggedIn ? "none" : "flex" }}
          onClick={() => setNavOpen(false)}
        >
          <h3> Sign-Up/Log-In</h3>
        </Link>
        {/* Display only when logged in */}
        <Link
          to="/profile"
          className="nav-link"
          style={{ display: loggedIn ? "flex" : "none" }}
          onClick={() => setNavOpen(false)}
        >
          <h3>My Profile</h3>
        </Link>
        <Link
          to="/cart"
          className="nav-link"
          style={{ display: loggedIn ? "flex" : "none" }}
          onClick={() => setNavOpen(false)}
        >
          <h3>My Cart</h3>
        </Link>
        <Link
          to="/cart"
          className="nav-link"
          style={{ display: loggedIn ? "flex" : "none" }}
          onClick={() => setNavOpen(false)}
        >
          <h3>My Past Orders</h3>
        </Link>
        <Link
          to="/contact"
          className="nav-link"
          onClick={() => setNavOpen(false)}
        >
          <h3>Contact Us</h3>
        </Link>
        {/* Sign Out Link */}
        <Link
          to="/"
          className="nav-link"
          style={{ display: loggedIn ? "flex" : "none" }}
          onClick={handleSignOut}
        >
          <h3>Sign Out</h3>
        </Link>
      </nav>
    </div>
  );
};

export default Nav;
