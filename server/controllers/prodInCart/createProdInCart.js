// import { Op } from "sequelize";
import CartProduct from "../../models/CartProduct.js";

const createProdInCart = async ({ userId, productId, quantity, cartId }) => {
  try {
    // Validate that all required fields are provided
    if (!userId || !productId || !quantity || !cartId) {
      throw new Error("Missing required fields");
    }

    // Parse cartId as an integer
    const parsedCartId = parseInt(cartId, 10);
    console.log("Parsed cartId:", parsedCartId);

    // Find or create a CartProduct for the specified user, product, and cart
    let [cartProduct, created] = await CartProduct.findOrCreate({
      where: {
        userId,
        productId,
        cartId: parsedCartId, // Use the parsed cartId
      },
      defaults: {
        productQuantity: quantity,
        productPrice: 0, // Placeholder for the product price (will be updated below)
        productTotal: 0, // Placeholder for the product total (will be updated below)
        cartTotal: 0, // Placeholder for the cart total (will be updated below)
      },
    });

    console.log("Found or created CartProduct:", cartProduct.toJSON());

    // Update product quantity if CartProduct already exists
    if (!created) {
      cartProduct.productQuantity += quantity;
    }

    // Retrieve the associated product (assuming you have a method to get the product details)
    const product = await cartProduct.getProduct();

    if (product) {
      // Update product price and total
      cartProduct.productPrice = product.price;
      cartProduct.productTotal = cartProduct.productQuantity * product.price;
    }

    // Save the updated CartProduct
    await cartProduct.save();

    // Calculate the cart total by summing up product totals
    const cartProducts = await CartProduct.findAll({
      where: { cartId: cartProduct.cartId },
    });

    // Calculate the cart total summing up product totals
    const updatedCartTotal = cartProducts.reduce(
      (total, cp) => total + cp.productTotal,
      0
    );

    // Format the updated cartTotal as a decimal with 2 decimal places
    const formattedCartTotal = parseFloat(updatedCartTotal).toFixed(2);

    // Update the cartTotal for the CartProduct instance
    cartProduct.cartTotal = formattedCartTotal;

    // Save the updated cartTotal for the CartProduct
    await cartProduct.save();

    // Return the updated CartProduct
    return cartProduct;
  } catch (error) {
    console.error("Error adding product to cart:", error);
    throw error; // Propagate the error to the caller
  }
};

export default createProdInCart;
