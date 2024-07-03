import express from "express";
import { sendWelcome } from "../../../utils/emailer.mjs";
import createUser from "../../controllers/user/createUser.js";

const router = express.Router();

// Route for creating a new user
router.post("/", async (req, res) => {
  try {
    // Extract user data from the request body
    const userData = req.body;

    // Call the user controller function to create the new user
    const newUser = await createUser(userData);

    // Send email to the user
    sendWelcome(newUser.email); // Assuming newUser.email contains the user's email address

    // Send a success response with the newly created user
    res.status(201).json(newUser);
  } catch (error) {
    // Handle errors
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
