import axios from "axios";
import useAppContext from "../../../../context/useAppContext";
import PropTypes from "prop-types";

const states = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

const ForOrder = ({ onSave }) => {
  const {
    profileData,
    setProfileData,
    error,
    setError,
    fieldErrors,
    setFieldErrors,
  } = useAppContext();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value,
    });
    setFieldErrors({
      ...fieldErrors,
      [name]: false,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = [
      "firstName",
      "lastName",
      "address1",
      "city",
      "state",
      "zip",
    ];
    let errors = {};

    requiredFields.forEach((field) => {
      if (!profileData[field]) {
        errors[field] = "This field is required.";
      }
    });

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setError("All fields marked with * are required.");
      return;
    }

    setError("");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID not found.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        profileData
      );
      console.log("User information updated:", response.data);
      onSave(); // Trigger save callback to switch back to current profile view
    } catch (error) {
      console.error("Error updating user information:", error);
      setError("Failed to update user information.");
    }
  };

  return (
    <section className="edit-profile">
      <h1 className="title">Update your information below.</h1>

      <form className="user-details" onSubmit={handleSubmit}>
        <label>
          First Name: *
          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            className={fieldErrors.firstName ? "profile-error" : ""}
          />
          {fieldErrors.firstName && (
            <span className="profile-error-message">
              {fieldErrors.firstName}
            </span>
          )}
        </label>
        <label>
          Last Name: *
          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            className={fieldErrors.lastName ? "profile-error" : ""}
          />
          {fieldErrors.lastName && (
            <span className="profile-error-message">
              {fieldErrors.lastName}
            </span>
          )}
        </label>
        <label>
          Address 1: *
          <input
            type="text"
            name="address1"
            value={profileData.address1}
            onChange={handleChange}
            className={fieldErrors.address1 ? "profile-error" : ""}
          />
          {fieldErrors.address1 && (
            <span className="profile-error-message">
              {fieldErrors.address1}
            </span>
          )}
        </label>
        <label>
          Address 2: (optional)
          <input
            type="text"
            name="address2"
            value={profileData.address2}
            onChange={handleChange}
          />
        </label>
        <label>
          City: *
          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={handleChange}
            className={fieldErrors.city ? "profile-error" : ""}
          />
          {fieldErrors.city && (
            <span className="profile-error-message">{fieldErrors.city}</span>
          )}
        </label>
        <label>
          State: *
          <select
            name="state"
            value={profileData.state}
            onChange={handleChange}
            className={fieldErrors.state ? "profile-error" : ""}
          >
            <option value="" disabled>
              Select State
            </option>
            {states.map((state) => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
          {fieldErrors.state && (
            <span className="profile-error-message">{fieldErrors.state}</span>
          )}
        </label>
        <label>
          Zip: *
          <input
            type="text"
            name="zip"
            value={profileData.zip}
            onChange={handleChange}
            className={fieldErrors.zip ? "profile-error" : ""}
          />
          {fieldErrors.zip && (
            <span className="profile-error-message">{fieldErrors.zip}</span>
          )}
        </label>

        {error && <p className="profile-error">{error}</p>}

        <button type="submit">Save</button>
      </form>
    </section>
  );
};

ForOrder.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default ForOrder;
