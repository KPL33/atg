// n-createUser.cjs

// Function to create a user
const createUser = async (userData) => {
  // Define passwordRegex directly in the function
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+}{"':;?/>.<,]).{8,50}$/;

  try {
    // Use dynamic import for User model, Cart model, and bcrypt
    const { default: User } = await import("../server/models/User.js");
    const { default: Cart } = await import("../server/models/Cart.js");
    const { default: bcrypt } = await import("bcrypt");

    if (!passwordRegex.test(userData.password)) {
      throw new Error("Password does not meet complexity requirements");
    }

    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const newUser = await User.create({
      ...userData,
      password: hashedPassword,
    });

    console.log(`User created with ID ${newUser.id}`);

    const newCart = await Cart.create({
      userId: newUser.id,
    });

    console.log(
      `Cart created with ID ${newCart.id} for user with ID ${newUser.id}`
    );

    return newUser;
  } catch (error) {
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
