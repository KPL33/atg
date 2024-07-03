import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import useAppContext from "../../../context/useAppContext.jsx";
import { setAuthenticated } from "../../../../../utils/auth.js";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "./forms.css";

const Login = () => {
  const {
    loggedIn,
    setLoggedIn,
    setError,
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
  } = useAppContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`http://localhost:3000/users/login`, {
        email: email,
        password: password,
      });

      if (response.status === 200) {
        const { userId } = response.data; // Extract userId from response
        setLoggedIn(true);
        setAuthenticated();

        // Store userId in localStorage
        localStorage.setItem("userId", userId);

        // Fetch currentCartId after storing userId
        fetchCurrentCartId(userId);
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      console.error("Error logging in:", error);
      setError("Invalid email or password.");
    }
  };

  const fetchCurrentCartId = async (userId) => {
    try {
      const response = await axios.get(`http://localhost:3000/users/${userId}`);
      console.log("Fetch currentCartId response:", response.data);
      const { currentCartId } = response.data;

      // Store currentCartId in localStorage
      localStorage.setItem("currentCartId", currentCartId);
    } catch (error) {
      console.error("Error fetching currentCartId:", error);
    }
  };

  if (loggedIn) {
    return <Navigate to="/products" />;
  }

  return (
    <form name="login" onSubmit={handleSubmit} className="login-signup-form">
      <h2 className="log-greeting">
        Returning customer? Welcome back!
        <br />
        Please log-in to view your cart or make additional orders.
      </h2>

      <div className="form-body">
        <div className="form-rows">
          <div className="form-row">
            <h4 className="field-title">Email:</h4>

            <label htmlFor="email-input">
              <input
                id="email-input"
                type="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </label>

            <div className="toggle-password"></div>
          </div>

          <div className="form-row">
            <h4 className="field-title">Password:</h4>

            <label htmlFor="password-input">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </label>

            <span
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
      </div>

      <button className="submit" type="submit">
        Submit
      </button>

      <h4 className="log-greeting">New around here?</h4>

      <Link className="signup-link" to="/signup">
        <h4>Sign-Up!</h4>
      </Link>
    </form>
  );
};

export default Login;
