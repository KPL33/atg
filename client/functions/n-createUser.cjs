const createUser = async (userData) => {
  try {
    // Dynamically import bcrypt and User using import()
    const { default: bcrypt } = await import("bcrypt");
    const { default: User } = await import("../../server/models/User.js");
    const { default: Cart } = await import("../../server/models/Cart.js");
    const { passwordRegex } = await import("../../utils/validation.mjs");

    // Validate the password format using regex
    if (!passwordRegex.test(userData.password)) {
      throw new Error("Password does not meet complexity requirements");
    }

    // Hash the password using bcrypt
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    // Create a new user with the hashed password
    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });

    // Log a message indicating that the user has been created
    console.log(`User created with ID ${newUser.id}`);

    // Create a cart for the new user
    const newCart = await Cart.create({
      userId: newUser.id,
    });

    // Log a message indicating that a cart has been created for the user
    console.log(
      `Cart created with ID ${newCart.id} for user with ID ${newUser.id}`
    );

    return newUser;
  } catch (error) {
    // Log any errors that occur during user creation
    console.error("Error creating user:", error);
    throw error;
  }
};

// Netlify function handler
exports.handler = async (event) => {
  try {
    const userData = JSON.parse(event.body);

    const newUser = await createUser(userData);

    return {
      statusCode: 201,
      body: JSON.stringify(newUser),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
