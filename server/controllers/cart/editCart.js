import Cart from "../../models/Cart.js";

// Function to edit a cart item (e.g., update quantity)
export const editCartItem = async (cartId, cartData) => {
  try {
    // Find the cart item by ID
    const cartItemToUpdate = await Cart.findByPk(cartId);
    if (!cartItemToUpdate) {
      throw new Error("Cart item not found");
    }

    // Validate and update the cart item data (e.g., quantity)
    if ("quantity" in cartData) {
      // Validate the quantity (ensure it's a positive integer)
      const newQuantity = parseInt(cartData.quantity);
      if (isNaN(newQuantity) || newQuantity <= 0) {
        throw new Error(
          "Invalid quantity. Quantity must be a positive integer."
        );
      }

      // Update the quantity
      cartItemToUpdate.quantity = newQuantity;
    }

    // Save the updated cart item
    const updatedCartItem = await cartItemToUpdate.save();

    return updatedCartItem;
  } catch (error) {
    throw error;
  }
};
