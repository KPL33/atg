import CartProduct from "../../models/CartProduct.js";

const editProdInCart = async (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  try {
    // Find the cart product by its ID
    const cartProduct = await CartProduct.findByPk(productId);

    if (!cartProduct) {
      return res.status(404).json({ message: "Cart product not found" });
    }

    // Update the product quantity
    cartProduct.productQuantity = quantity;

    // Save the updated cart product
    await cartProduct.save();

    // Return a success response
    return res
      .status(200)
      .json({ message: "Cart product quantity updated successfully" });
  } catch (error) {
    console.error("Error updating cart product quantity:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default editProdInCart;
