import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { setAuthenticated } from "../../../../../utils/auth.js";
import axios from "axios";
import useAppContext from "../../../context/useAppContext.jsx";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../Login/forms.css";

const SignUp = () => {
  const {
    loggedIn,
    setLoggedIn,
    error,
    setError,
    email,
    setEmail,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    setPasswordMismatch,
    showPassword,
    setShowPassword,
    showConfirmPassword,
    setShowConfirmPassword,
  } = useAppContext();

  useEffect(() => {
    setError("");
    setPasswordMismatch(false);
  }, [setError, setPasswordMismatch]);

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmToggle = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      // Clear the error first to ensure state change is recognized
      setError("");
      setPasswordMismatch(true);
      // Set the error after a short delay to ensure the DOM updates
      setTimeout(() => {
        setError("Passwords do not match. Please try again.");
      }, 0);
      return;
    }

    setPasswordMismatch(false);
    setError("");

    try {
      // Determine API URL based on environment (development or production)
      const apiUrl =
        import.meta.env.NODE_ENV === "development"
          ? "http://localhost:3000/users/"
          : `${import.meta.env.VITE_REACT_APP_API_URL}/users/`;

      const response = await axios.post(apiUrl, {
        email,
        password,
      });

      if (response.status === 201) {
        const { id: userId } = response.data;

        setAuthenticated(userId);

        // Store userId in localStorage
        localStorage.setItem("userId", userId);

        // Fetch currentCartId after storing userId
        fetchCurrentCartId(userId);

        setLoggedIn(true);

        // Reset form fields upon successful signup
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setShowPassword(false);
        setShowConfirmPassword(false);

        console.log("User signed up:", response.data);
      } else {
        console.log("Signup failed:", response.statusText);
        setError("Error signing up. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up:", error);
      setError(
        error.response?.data?.error || "Error signing up. Please try again."
      );
    }
  };

  const fetchCurrentCartId = async (userId) => {
    try {
      // Determine API URL based on environment (development or production)
      const apiUrl =
        import.meta.env.NODE_ENV === "development"
          ? `http://localhost:3000/users/${userId}`
          : `${import.meta.env.VITE_REACT_APP_API_URL}/users/${userId}`;

      const response = await axios.get(apiUrl);

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
    <form
      name="signup"
      onSubmit={handleSubmit}
      className="login-signup-form"
      id="signup-form"
    >
      <h2 className="log-greeting">
        Welcome to Against the Grains! Please register below!
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
                required
              />
            </label>

            <div className="toggle-password"></div>
          </div>

          <div className="form-row">
            <h4 className="field-title">Password:</h4>
            <label htmlFor="password-input">
              <input
                id="password-input"
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>

            <span className="toggle-password" onClick={handlePasswordToggle}>
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="form-row">
            <h4 className="field-title">Confirm Password:</h4>

            <label htmlFor="confirm-password-input" className="field-title">
              <input
                id="confirm-password-input"
                type={showConfirmPassword ? "text" : "password"}
                name="confirm-password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </label>

            <span className="toggle-password" onClick={handleConfirmToggle}>
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>
        </div>
      </div>

      {error && <div className="form-message">{error}</div>}

      <button className="submit" type="submit">
        Submit
      </button>
    </form>
  );
};

export default SignUp;
