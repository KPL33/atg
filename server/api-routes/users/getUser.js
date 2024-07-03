import express from "express";
import { getAllUsers, getUserById, getUserByEmail } from "../../controllers/user/getUser.js";

const router = express.Router();

// Route to get all users
router.get("/", async (req, res) => {
  try {
    const users = await getAllUsers();
    return res.status(200).json(users); // Return the response immediately
  } catch (error) {
    console.error("Error getting all users:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get a user by ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const user = await getUserById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user); // Return the response immediately
  } catch (error) {
    console.error("Error getting user by ID:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

router.get("/email/:email", async (req, res) => {
  const { email } = req.params;
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user); // Return the response immediately
  } catch (error) {
    console.error("Error getting user by email:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
});

export default router;
