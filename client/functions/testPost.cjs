// testPost.js

// Netlify function handler
exports.handler = async (event) => {
  try {
    const requestBody = JSON.parse(event.body);

    console.log("Received POST request with body:", requestBody);

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "POST request received successfully!" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
