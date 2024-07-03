import User from "../../models/User.js";
import Cart from "../../models/Cart.js";

// Helper function to construct user data with currentCartId
const buildUserResponse = (user, cart) => {
  return {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
    address1: user.address1,
    address2: user.address2,
    city: user.city,
    zip: user.zip,
    state: user.state,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt,
    currentCartId: cart ? cart.id : null,
  };
};

// Function to retrieve all users with currentCartId included
export const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    const usersWithCartId = await Promise.all(
      users.map(async (user) => {
        const cart = await Cart.findOne({ where: { userId: user.id } });
        return buildUserResponse(user, cart);
      })
    );
    return usersWithCartId;
  } catch (error) {
    throw error;
  }
};

// Function to retrieve user by ID with currentCartId included
export const getUserById = async (id) => {
  try {
    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    const cart = await Cart.findOne({ where: { userId: id } });

    return buildUserResponse(user, cart);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Function to retrieve user by email with currentCartId included
export const getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw new Error("User not found");
    }

    const cart = await Cart.findOne({ where: { userId: user.id } });

    return buildUserResponse(user, cart);
  } catch (error) {
    console.error("Error fetching user by email:", error);
    throw error;
  }
};

// Export an object containing all functions
const UserController = {
  getAllUsers,
  getUserById,
  getUserByEmail,
};

export default UserController;
