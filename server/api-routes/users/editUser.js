import express from "express";
import editUser from "../../controllers/user/editUser.js";

const router = express.Router();

// Route for updating an existing user
router.put("/:id", async (req, res) => {
  try {
    // Extract user data from the request body
    const userId = req.params.id; // Extract user ID from the URL
    const userData = req.body;

    // Update the user based on the provided data
    const updatedUser = await editUser(userId, userData);

    // Log the updated user data to the console
    console.log("Updated User Data:", updatedUser);

    if (!updatedUser) {
      // If updatedUser is undefined, return an error response
      return res.status(404).json({ error: "User not found or not updated" });
    }

    // Send a success response with the updated user data in the response body
    res
      .status(200)
      .json({ message: "User updated successfully", user: updatedUser });
  } catch (error) {
    // Handle errors
    console.error("Error editing user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
