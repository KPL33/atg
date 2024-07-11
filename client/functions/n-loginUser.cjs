const loginUser = async (email, password) => {
  try {
    // Use dynamic import for bcrypt and User model
    const { default: bcrypt } = await import("bcrypt");
    const { default: User } = await import("../../server/models/User.js");

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

// Netlify function handler
exports.handler = async (event) => {
  try {
    const { email, password } = JSON.parse(event.body);

    const loginResult = await loginUser(email, password);

    return {
      statusCode: 200,
      body: JSON.stringify(loginResult),
    };
  } catch (error) {
    console.error("Error handling login request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
