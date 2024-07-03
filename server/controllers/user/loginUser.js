import bcrypt from "bcrypt";
import User from "../../models/User.js";

const loginUser = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return { success: false, message: "Invalid email or password" };
    }

    // Compare the provided password with the hashed password stored in the user object
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return { success: false, message: "Invalid email or password" };
    }

    // If the password is valid, return success along with the user object
    return {
      success: true,
      user: { id: user.id, currentCartId: user.currentCartId },
    };
  } catch (error) {
    console.error("Error logging in:", error);
    return { success: false, message: "Internal server error" };
  }
};

// Usage example
bcrypt.hash("mypassword", 10, async (err, hash) => {
  if (err) {
    console.error("Error hashing password:", err);
    return;
  }

  // Simulate user login with the hashed password
  const loginResult = await loginUser("user@example.com", "mypassword", hash);

  console.log(loginResult);
});

export default loginUser;
