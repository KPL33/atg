import Product from "../../models/Product.js";

const deleteProductById = async (productId) => {
  try {
    const deletedProduct = await Product.destroy({
      where: {
        id: productId,
      },
    });

    if (deletedProduct === 0) {
      return { success: false, message: "Product not found" };
    }

    return { success: true, message: "Product deleted successfully" };
  } catch (error) {
    console.error("Error deleting product:", error);
    throw new Error("Internal server error");
  }
};

export default deleteProductById;