// Function to retrieve user by ID with currentCartId included
const getUser = async (id) => {
  try {
    const { default: User } = await import("../../server/models/User.js");
    const { default: Cart } = await import("../../server/models/Cart.js");

    const user = await User.findByPk(id);

    if (!user) {
      throw new Error("User not found");
    }

    const cart = await Cart.findOne({ where: { userId: id } });

    // Helper function to construct user data with currentCartId
    const buildUserResponse = (user, cart) => {
      return {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        address1: user.address1,
        address2: user.address2,
        city: user.city,
        zip: user.zip,
        state: user.state,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        currentCartId: cart ? cart.id : null,
      };
    };

    return buildUserResponse(user, cart);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
};

// Netlify function handler
exports.handler = async (event) => {
  try {
    const { id } = event.queryStringParameters;

    const userWithCart = await getUser(id);

    return {
      statusCode: 200,
      body: JSON.stringify(userWithCart),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
