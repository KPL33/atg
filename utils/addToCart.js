// Decrement quantity (before adding to cart)
export const decrementAtc = (currentQuantity, setQuantity) => {
  if (currentQuantity > 1) {
    setQuantity(currentQuantity - 1);
  }
};

// Increment quantity (before adding to cart)
export const incrementAtc = (currentQuantity, setQuantity) => {
  setQuantity(currentQuantity + 1);
};

// Decrement quantity after it's in the cart.
export const decrementInCart = (productId, cartProducts, setCartProducts) => {
  const updatedCartProducts = cartProducts.map((product) => {
    if (product.id === productId) {
      return { ...product, productQuantity: product.productQuantity - 1 };
    }
    return product;
  });
  setCartProducts(updatedCartProducts);
};

// Increment quantity after it's in the cart.
export const incrementInCart = (productId, cartProducts, setCartProducts) => {
  const updatedCartProducts = cartProducts.map((product) => {
    if (product.id === productId) {
      return { ...product, productQuantity: product.productQuantity + 1 };
    }
    return product;
  });
  setCartProducts(updatedCartProducts);
};

// Handle change in food selection
export const handleProductSelection = (
  values,
  setSelectedProduct,
  setQuantity
) => {
  setSelectedProduct(values.length > 0 ? values[0] : null);
  setQuantity(1); // Reset quantity to 1 when food selection changes
};

// Handle adding item to cart
export const handleAddToCart = (loggedIn, selectedProduct) => {
  if (loggedIn) {
    // Handle adding item to cart (e.g., call an API to add to cart)
    if (selectedProduct) {
      console.log("Adding to cart:", selectedProduct.label);
      // Add logic to actually add item to cart (e.g., call API)
    }
  } else {
    // Redirect user to login page or display message
    console.log("User must log in to add to cart");
  }
};
