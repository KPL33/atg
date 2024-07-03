import CartProduct from "../../models/CartProduct.js";

const deleteProdInCartById = async (cartProductId) => {
  try {
    // Find the cart product by its ID
    const cartProductToDelete = await CartProduct.destroy({
      where: { id: cartProductId,

      },
    });
    
    if (cartProductToDelete === 0) {
      return { success: false, message: "Unable to remove that product from cart because it wasn't found."};
    }

    return { success: true, message: "Product removed from Cart successfully."};
  } catch(error) {
    console.error("Error deleting product from cart:", error);
    throw new Error("Internal server error");
  } 
};

export default deleteProdInCartById;
