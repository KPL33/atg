import express from "express";
import deleteUserById from "../../controllers/user/deleteUser.js";

const router = express.Router();

// DELETE route for deleting a user by ID
router.delete("/:id", async (req, res) => {
  const userId = req.params.id;

  try {
    // Call the deleteUserById function from the controller
    const result = await deleteUserById(userId);

    if (result.success) {
      res.status(200).json({ message: result.message });
    } else {
      res.status(404).json({ error: result.message });
    }
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
