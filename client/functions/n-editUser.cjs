// n-editUser.cjs

const editUser = async (userId, userData) => {
  try {
    const { passwordRegex, emailRegex } = await import(
      "../../utils/validation.js"
    );
    const { default: User } = await import("../../server/models/User.js");

    if (userData.password && !passwordRegex.test(userData.password)) {
      throw new Error("Password does not meet complexity requirements");
    }

    if (userData.email && !emailRegex.test(userData.email)) {
      throw new Error("Invalid email format");
    }

    const userToUpdate = await User.findByPk(userId);

    if (!userToUpdate) {
      throw new Error("User not found");
    }

    // Update user logic...

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "User updated successfully" }),
    };
  } catch (error) {
    console.error("Error editing user:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Internal server error" }),
    };
  }
};

exports.handler = async (event) => {
  try {
    const { id, userData } = JSON.parse(event.body);

    const result = await editUser(id, userData);

    return {
      statusCode: 200,
      body: JSON.stringify(result),
    };
  } catch (error) {
    console.error("Error in handler:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
