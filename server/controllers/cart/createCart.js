import Cart from "../../models/Cart.js";

// Function to create a new item in the cart
const createCart = async (cartData) => {
  try {
    // Create a new cart item based on the provided data
    const newCartItem = await Cart.create(cartData);

    // Return the newly created cart item
    return newCartItem;
  } catch (error) {
    // If an error occurs during cart item creation, throw the error for centralized handling
    throw new Error(`Failed to create cart: ${error.message}`);
  }
};

export default createCart;