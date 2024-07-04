// n-editUser.cjs

// Dynamic import for User model and validation
const editUser = async (userId, userData) => {
  const { default: User } = await import("../../server/models/User.js");
  const { passwordRegex, emailRegex } = await import(
    "../../utils/validation.js"
  );

  // Validate the password format using regex
  if (userData.password && !passwordRegex.test(userData.password)) {
    throw new Error("Password does not meet complexity requirements");
  }

  // Validate the email format using regex
  if (userData.email && !emailRegex.test(userData.email)) {
    throw new Error("Invalid email format");
  }

  // Find the user to update
  const userToUpdate = await User.findByPk(userId);

  // Check if the user exists
  if (!userToUpdate) {
    throw new Error("User not found");
  }

  // Update the user based on the provided data
  const updatedUser = await userToUpdate.update(userData);

  // Return the updated user
  return updatedUser;
};

// Netlify function handler
exports.handler = async (event) => {
  const { userId, userData } = JSON.parse(event.body);

  try {
    // Call editUser function to perform user update
    const updatedUser = await editUser(userId, userData);

    // Return success response with updated user data
    return {
      statusCode: 200,
      body: JSON.stringify(updatedUser),
    };
  } catch (error) {
    // Handle any errors and return appropriate response
    console.error("Error handling edit user request:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};
