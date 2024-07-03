import express from "express";
import loginUser from "../../controllers/user/loginUser.js";

const loginUserRouter = express.Router();

loginUserRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const { success, user, message } = await loginUser(email, password);

    if (!success) {
      return res.status(401).json({ message });
    }

    req.session.userId = user.id;
    res
      .status(200)
      .json({
        message: "Login successful",
        userId: user.id,
        currentCartId: user.currentCartId,
      });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

export default loginUserRouter;
