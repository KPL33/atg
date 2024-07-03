import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import useAppContext from "../../../context/useAppContext";
import Current from "./Current-Edit-ForOrder/Current";
import Edit from "./Current-Edit-ForOrder/Edit";
import "./profile.css";

const UserProfile = () => {
  const { setEditingProfile } = useAppContext();
  const navigate = useNavigate();

  const handleEditClick = () => {
    setEditingProfile(true);
    navigate("edit"); // Navigate to the relative path edit under /UserProfile
  };

  const handleSaveClick = () => {
    setEditingProfile(false);
    navigate("current"); // Navigate to the relative path current under /UserProfile
  };

  return (
    <section className="profile">
      <div className="profile-container">
        <Routes>
          {/* Route for Current component */}
          <Route
            path="current"
            element={<Current onEditClick={handleEditClick} />}
          />
          {/* Route for Edit component */}
          <Route path="edit" element={<Edit onSave={handleSaveClick} />} />
          {/* Default route for invalid URLs */}
          <Route path="*" element={<Navigate to="./current" />} />
        </Routes>
      </div>
    </section>
  );
};

export default UserProfile;
