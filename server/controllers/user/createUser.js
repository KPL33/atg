import bcrypt from "bcrypt";
import User from "../../models/User.js";
import Cart from "../../models/Cart.js"; // Import the Cart model

import { passwordRegex } from "../../../utils/validation.js"; // Import the password regex

const createUser = async (userData) => {
  try {
    // Validate the password format using regex
    if (!passwordRegex.test(userData.password)) {
      throw new Error("Password does not meet complexity requirements");
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user with the hashed password
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });

    // Log a message indicating that the user has been created
    console.log(`User created with ID ${newUser.id}`);

    // Create a cart for the new user
    const newCart = await Cart.create({
      userId: newUser.id,
    });

    // Log a message indicating that a cart has been created for the user
    console.log(
      `Cart created with ID ${newCart.id} for user with ID ${newUser.id}`
    );

    return newUser;
  } catch (error) {
    // Log any errors that occur during user creation
    console.error("Error creating user:", error);
    throw error;
  }
};

export default createUser;
