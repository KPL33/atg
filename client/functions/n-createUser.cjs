// n-createUser.cjs

// Function to create a user
const createUser = async (userData) => {
  try {
    // Require modules for validation, User model, Cart model, and bcrypt
    const { passwordRegex } = require("../../utils/validation.mjs");
    const User = require("../../server/models/User.js").default;
    const Cart = require("../../server/models/Cart.js").default;
    const bcrypt = require("bcrypt");

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

// Netlify function handler
export const handler = async (event) => {
  try {
    const userData = JSON.parse(event.body);

    const newUser = await createUser(userData);

    return {
      statusCode: 201,
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
