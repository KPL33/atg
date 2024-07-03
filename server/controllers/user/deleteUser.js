import User from "../../models/User.js";
import Cart from "../../models/Cart.js";

// Function to delete a user by ID
const deleteUserById = async (userId) => {
  try {
    // Find the user to delete
    const userToDelete = await User.findByPk(userId);

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Find all carts associated with the user
    const cartsToDelete = await Cart.findAll({
      where: {
        userId: userId,
      },
    });

    // Delete all carts associated with the user
    await Promise.all(cartsToDelete.map((cart) => cart.destroy()));

    // Now delete the user
    await userToDelete.destroy();

    return {
      success: true,
      message: "User and associated carts deleted successfully",
    };
  } catch (error) {
    console.error("Error deleting user:", error);
    throw new Error("Internal server error");
  }
};

export default deleteUserById;
