import User from "../../models/User.js";

import { passwordRegex, emailRegex } from "../../../utils/validation.js"; // Import both regex patterns

// Function to edit an existing user
const editUser = async (userId, userData) => {
  try {
    // Validate the passworxd format using regex
    if (userData.password && !passwordRegex.test(userData.password)) {
      throw new Error("Password does not meet complexity requirements");
    }

    // Validate the email format using regex
    if (userData.email && !emailRegex.test(userData.email)) {
      throw new Error("Invalid email format");
    }

    // Find the user to update
    const userToUpdate = await User.findByPk(userId);

    // Check if the user exists
    if (!userToUpdate) {
      throw new Error("User not found");
    }

    // Update the user based on the provided data
    const updatedUser = await userToUpdate.update(userData);

    // Return the updated user
    return updatedUser;
  } catch (error) {
    // If an error occurs, throw it to be handled by the route
    throw error;
  }
};

export default editUser;
