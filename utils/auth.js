// set authentication status in localStorage
export const setAuthenticated = () => {
  localStorage.setItem("authenticated", "true");

  // Log the values that are being stored in localStorage
  console.log("Authenticated set to true");
};

// check if the user is authenticated
export const isAuthenticated = () => {
  const authenticated = localStorage.getItem("authenticated") === "true";

  return authenticated;
};

// Function to clear authentication status and user info from localStorage
export const clearAuthenticated = () => {
  localStorage.removeItem("authenticated");
  localStorage.removeItem("userId");
  localStorage.removeItem("currentCartId");
};
