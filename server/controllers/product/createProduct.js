import Product from "../../models/Product.js";

// Function to create a new product
const createProduct = async (productData) => {
  try {
    // Validate the required fields
    if (!productData.name) {
      throw new Error("Product name is required.");
    }

    if (!productData.description) {
      throw new Error("Product description is required.");
    }

    if (!productData.price || isNaN(productData.price)) {
      throw new Error(
        "Product price must be a valid number (Numerals and 1 decimal only; No $ should be included)."
      );
    }

    if (!productData.amountInStock || isNaN(productData.amountInStock)) {
      throw new Error("Amount in stock must be a valid number.");
    }

    // Calculate productValue based on price and amountInStock
    const productValue = productData.price * productData.amountInStock;

    // Create a new product including productValue
    const newProduct = await Product.create({
      ...productData,
      productValue: productValue,
    });

    return newProduct;
  } catch (error) {
    // If an error occurs, throw it to be handled by the route
    throw error;
  }
};

export default createProduct;
