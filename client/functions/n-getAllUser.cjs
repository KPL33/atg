// n-getAllUser.cjs



const getAllUsers = async () => {
    const { default: User } = await import("../../server/models/User.js");
    const { default: Cart } = await import("../../server/models/Cart.js");

  try {
    const users = await User.findAll();
    const usersWithCartId = await Promise.all(
      users.map(async (user) => {
        const cart = await Cart.findOne({ where: { userId: user.id } });
        return buildUserResponse(user, cart);
      })
    );
    return usersWithCartId;
  } catch (error) {
    console.error("Error fetching all users:", error);
    throw error;
  }
};

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

// Netlify function handler
exports.handler = async () => {
  try {
    const usersWithCart = await getAllUsers();
    return {
      statusCode: 200,
      body: JSON.stringify(usersWithCart),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
