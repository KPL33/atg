import Product from "../../models/Product.js";

const editProduct = async (productId, productData) => {
  try {
    // Validate if the product exists
    const productToUpdate = await Product.findByPk(productId);
    if (!productToUpdate) {
      throw new Error("Product not found");
    }

    // Check if the provided data includes price, name, or description
    if (
      "price" in productData ||
      "name" in productData ||
      "description" in productData
    ) {
      // Validate the presence of name, description, and price
      if (!productData.name || !productData.description || !productData.price) {
        throw new Error("Name, description, and price are required.");
      }

      // Validate price format
      if (isNaN(productData.price)) {
        throw new Error(
          "Product price must be a valid number (Numerals and 1 decimal only; No $ should be included)."
        );
      }
    }

    // Update the product
    const updatedProduct = await productToUpdate.update(productData);

    return updatedProduct;
  } catch (error) {
    throw error;
  }
};

export default editProduct;