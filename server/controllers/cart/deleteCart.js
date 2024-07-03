import Cart from "../../models/Cart.js";
import CartProduct from "../../models/CartProduct.js";

// Function to delete a cart by ID
export const deleteCartById = async (cartId) => {
  try {
    // Find the cart item by ID
    const cart = await Cart.findByPk(cartId);
    if (!cart) {
      return { success: false, message: "Cart not found" };
    }

    // Find all CartProducts associated with the cart
    const cartProducts = await CartProduct.findAll({
      where: { cartId: cartId },
    });

    // Delete each CartProduct associated with the cart
    for (const cartProduct of cartProducts) {
      await cartProduct.destroy();
    }

    // Now that all related CartProducts are deleted, delete the cart
    await cart.destroy();

    return { success: true, message: "Cart deleted successfully" };
  } catch (error) {
    // Throw the error to be handled by the caller
    throw error;
  }
};
