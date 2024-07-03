import { useEffect, useState } from "react";
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

const Edit = ({ onSave }) => {
  const {
    profileData,
    setProfileData,
    error,
    setError,
    fieldErrors,
    setFieldErrors,
    setEditingProfile,
  } = useAppContext();

  const [address2Placeholder, setAddress2Placeholder] = useState("(optional)");

  useEffect(() => {
    // Set editingProfile to true when the component mounts
    setEditingProfile(true);
    localStorage.setItem("editingProfile", JSON.stringify(true));

    // Cleanup function to reset editingProfile when component unmounts
    return () => {
      setEditingProfile(false);
      localStorage.setItem("editingProfile", JSON.stringify(false));
    };
  }, [setEditingProfile]);

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

    const updatedFields = {};
    Object.keys(profileData).forEach((key) => {
      if (profileData[key] !== "") {
        updatedFields[key] = profileData[key];
      }
    });

    setError("");
    const userId = localStorage.getItem("userId");

    if (!userId) {
      setError("User ID not found.");
      return;
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/users/${userId}`,
        updatedFields
      );
      console.log("User information updated:", response.data);
      onSave(); // Trigger save callback to switch back to current profile view
    } catch (error) {
      console.error("Error updating user information:", error);
      setError("Failed to update user information.");
    }
  };

  const handleAddress2Focus = () => {
    setAddress2Placeholder("");
  };

  const handleAddress2Blur = () => {
    if (!profileData.address2) {
      setAddress2Placeholder("(optional)");
    }
  };

  return (
    <section className="edit-profile">
      <h1 className="title">Update your information below.</h1>

      <form className="user-details" onSubmit={handleSubmit}>
        <div className="edit-pair-container">
          <label className="edit-field-title">
            First Name:
            {fieldErrors.firstName && (
              <span className="profile-error-message">
                {fieldErrors.firstName}
              </span>
            )}
          </label>

          <input
            type="text"
            name="firstName"
            value={profileData.firstName}
            onChange={handleChange}
            className={
              fieldErrors.firstName ? "profile-error" : "edit-field-value"
            }
          />
        </div>

        <div className="edit-pair-container">
          <label className="edit-field-title">
            Last Name:
            {fieldErrors.lastName && (
              <span className="profile-error-message">
                {fieldErrors.lastName}
              </span>
            )}
          </label>

          <input
            type="text"
            name="lastName"
            value={profileData.lastName}
            onChange={handleChange}
            className={
              fieldErrors.lastName ? "profile-error" : "edit-field-value"
            }
          />
        </div>

        <div className="edit-pair-container">
          <label className="edit-field-title">
            Address 1:
            {fieldErrors.address1 && (
              <span className="profile-error-message">
                {fieldErrors.address1}
              </span>
            )}
          </label>

          <input
            type="text"
            name="address1"
            value={profileData.address1}
            onChange={handleChange}
            className={
              fieldErrors.address1 ? "profile-error" : "edit-field-value"
            }
          />
        </div>

        <div className="edit-pair-container">
          <label className="edit-field-title">Address 2: </label>

          <input
            className="edit-field-value"
            type="text"
            name="address2"
            value={profileData.address2}
            onChange={handleChange}
            onFocus={handleAddress2Focus}
            onBlur={handleAddress2Blur}
            placeholder={address2Placeholder}
          />
        </div>

        <div className="edit-pair-container">
          <label className="edit-field-title">
            City:
            {fieldErrors.city && (
              <span className="profile-error-message">{fieldErrors.city}</span>
            )}
          </label>

          <input
            type="text"
            name="city"
            value={profileData.city}
            onChange={handleChange}
            className={fieldErrors.city ? "profile-error" : "edit-field-value"}
          />
        </div>

        <div className="edit-pair-container state-pair-container">
          <label className="edit-field-title state-field-title">
            State:
            {fieldErrors.state && (
              <span className="profile-error-message">{fieldErrors.state}</span>
            )}
          </label>

          <select
            name="state"
            value={profileData.state}
            onChange={handleChange}
            className={fieldErrors.state ? "profile-error" : "state-list"}
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
        </div>

        <div className="edit-pair-container">
          <label className="edit-field-title">
            Zip:
            {fieldErrors.zip && (
              <span className="profile-error-message">{fieldErrors.zip}</span>
            )}
          </label>

          <input
            type="text"
            name="zip"
            value={profileData.zip}
            onChange={handleChange}
            className={fieldErrors.zip ? "profile-error" : "edit-field-value"}
          />
        </div>

        {error && <p className="profile-error">{error}</p>}

        <section className="edit-buttons">
          <button className=" save-button" type="submit">
            Save
          </button>
          <button
            className="cancel-button"
            type="button"
            onClick={onSave}
          >
            Cancel
          </button>
        </section>
      </form>
    </section>
  );
};

Edit.propTypes = {
  onSave: PropTypes.func.isRequired,
};

export default Edit;
