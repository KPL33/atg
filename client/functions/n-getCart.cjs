// Function to retrieve cart by ID with associated products and calculated cartTotal
const getCartById = async (cartId) => {
  try {
    // Import necessary Sequelize models within the function scope
    const { default: Cart } = await import("../../server/models/Cart.js");
    const { default: Product } = await import("../../server/models/Product.js");
    const { default: CartProduct } = await import(
      "../../server/models/CartProduct.js"
    );

    // Utility function to calculate cartTotal based on products in a cart
    const calculateCartTotal = (products) => {
      if (!products || products.length === 0) {
        return "0.00";
      }

      const cartTotal = products.reduce((total, product) => {
        return total + parseFloat(product.CartProduct.productTotal);
      }, 0);

      return cartTotal.toFixed(2);
    };

    // Retrieve the cart by its primary key (ID)
    const cart = await Cart.findByPk(cartId, {
      include: {
        model: Product,
        through: {
          model: CartProduct,
          attributes: ["productQuantity", "productPrice", "productTotal"],
        },
        attributes: ["id", "name", "category", "description"], // Specify the attributes of Product to include
      },
      attributes: ["id", "userId", "createdAt", "updatedAt"], // Specify the attributes of Cart to include
    });

    // Calculate cartTotal based on products in the cart
    if (cart) {
      cart.dataValues.cartTotal = calculateCartTotal(cart.Products);
    }

    return cart;
  } catch (error) {
    console.error("Error fetching cart by ID:", error);
    throw error;
  }
};

// Netlify function handler
exports.handler = async (event) => {
  try {
    const { id } = event.queryStringParameters;

    // Call the getCartById function with the provided cartId
    const cart = await getCartById(id);

    // Return a success response with the cart data
    return {
      statusCode: 200,
      body: JSON.stringify(cart),
    };
  } catch (error) {
    // Return an error response if there's an issue
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
