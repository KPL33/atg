// n-createUserAndLogin.cjs

// Function to create a user
const createUser = async (userData) => {
  try {
    // Use dynamic import for validation, User model, Cart model, and bcrypt
    const { passwordRegex } = await import("../../utils/validation.mjs");
    const { default: User } = await import("../../server/models/User.js");
    const { default: Cart } = await import("../../server/models/Cart.js");
    const { default: bcrypt } = await import("bcrypt");

    if (!passwordRegex.test(userData.password)) {
      throw new Error("Password does not meet complexity requirements");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });

    console.log(`User created with ID ${newUser.id}`);

    const newCart = await Cart.create({
      userId: newUser.id,
    });

    console.log(
      `Cart created with ID ${newCart.id} for user with ID ${newUser.id}`
    );

    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error;
  }
};

// Function to log in a user
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
    const { email, password, ...userData } = JSON.parse(event.body);

    // Check if the request is for creating a user or logging in
    if (email && password && Object.keys(userData).length === 0) {
      // Handle login
      const loginResult = await loginUser(email, password);

      return {
        statusCode: 200,
        body: JSON.stringify(loginResult),
      };
    } else {
      // Handle user creation
      const newUser = await createUser({ email, password, ...userData });

      return {
        statusCode: 201,
        body: JSON.stringify(newUser),
      };
    }
  } catch (error) {
    console.error("Error handling request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
