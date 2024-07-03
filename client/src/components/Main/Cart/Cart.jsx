import { useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../../context/AppContext";
import axios from "axios";
import "./cart.css";

const Cart = () => {
  const {
    cartProducts,
    setCartProducts,
    error,
    setError,
    showDefaultZero,
    setShowDefaultZero,
  } = useContext(AppContext);

  const navigate = useNavigate();

  const handleShopping = () => {
    navigate("/products"); // Navigate to the checkout page
  };

  const handleCheckout = () => {
    navigate("/checkout"); // Navigate to the checkout page
  };

  const handleInputBlur = (productId, currentQuantity) => {
    // If input is empty, set quantity to 0
    if (currentQuantity === "") {
      handleQuantityChange(productId, "0");
      setShowDefaultZero(true);
    } else {
      setShowDefaultZero(false);
    }
  };

  const handleQuantityChange = (productId, newQuantity) => {
    // Convert empty string to 0
    if (newQuantity === "") {
      newQuantity = 0;
    } else {
      newQuantity = parseInt(newQuantity);
    }

    // Check if quantity exceeds 99
    if (newQuantity > 99) {
      setError("Please adjust quantity. Cannot exceed 99 per item.");
      return;
    } else {
      setError(""); // Clear error if quantity is valid
    }

    const updatedProducts = cartProducts.map((product) => {
      if (product.id === productId) {
        const updatedProduct = {
          ...product,
          productQuantity: newQuantity,
          productTotal: (product.productPrice * newQuantity).toFixed(2), // Update product total
        };
        return updatedProduct;
      }
      return product;
    });

    setCartProducts(updatedProducts);

    // Send PUT request to update quantity in the backend
    const currentCartId = localStorage.getItem("currentCartId");
    if (currentCartId) {
      try {
        axios.put(
          `http://localhost:3000/cart/products/${productId}`, // Corrected path
          {
            cartId: currentCartId,
            quantity: newQuantity,
          }
        );
        // Handle success if needed
      } catch (error) {
        console.error("Error updating quantity:", error);
        // Handle error if needed
      }
    }
  };

  const handleDecrement = (productId) => {
    const product = cartProducts.find((product) => product.id === productId);
    if (product.productQuantity > 1) {
      handleQuantityChange(productId, product.productQuantity - 1);
    }
  };

  const handleIncrement = (productId) => {
    const product = cartProducts.find((product) => product.id === productId);
    handleQuantityChange(productId, product.productQuantity + 1);
  };

  useEffect(() => {
    const fetchCartProducts = async () => {
      try {
        const currentCartId = localStorage.getItem("currentCartId");

        if (!currentCartId) {
          console.error("No current cart ID found in local storage.");
          return;
        }

        const response = await axios.get(`http://localhost:3000/cart/products`);
        const cartData = response.data;

        // Filter CartProducts belonging to the current cart
        const cartProducts = cartData.filter(
          (product) => product.cartId === parseInt(currentCartId)
        );

        // Populate the cart component on the frontend with fetched CartProducts
        setCartProducts(cartProducts);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartProducts();
  }, [setCartProducts]);

  // Inside the Cart component
  const handleDeleteProduct = async (productId) => {
    try {
      const currentCartId = localStorage.getItem("currentCartId");
      if (currentCartId) {
        // Send DELETE request to backend API
        await axios.delete(`http://localhost:3000/cart/products/${productId}`, {
          data: { cartId: currentCartId },
        });

        // Remove the deleted product from the cartProducts state
        const updatedCartProducts = cartProducts.filter(
          (product) => product.id !== productId
        );
        setCartProducts(updatedCartProducts);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <section className="cart">
      <div className="cart-container">
        <h2 className="title">Here&apos;s your cart!</h2>
        <div className="in-cart">
          <div className="category-title-area">
            <div className="product-column">
              <h3 className="column-title product-column-title">Product</h3>
            </div>
            <div className="quantity-column">
              <h3 className="column-title">Quantity</h3>
            </div>
            <div className="price-column">
              <h3 className="column-title">Price</h3>
            </div>
            <div className="prod-total-column">
              <h3 className="column-title">Product Total</h3>
            </div>
          </div>

          {cartProducts.map((product) => (
            <div key={product.id} className="cart-items">
              <div className="product-column">
                <div className="product-name-container">
                  <button
                    className="delete-from-cart-button"
                    onClick={() => handleDeleteProduct(product.id)}
                  >
                    Remove
                  </button>
                  <p className="product-name">{product.Product.name}</p>
                </div>
              </div>

              <div className="quantity-column">
                <div className="product-quantity">
                  <button
                    onClick={() => handleDecrement(product.id)}
                    className="cart-quantity-button"
                  >
                    –
                  </button>
                  <input
                    type="text"
                    value={showDefaultZero ? "0" : product.productQuantity}
                    onChange={(e) =>
                      handleQuantityChange(product.id, e.target.value)
                    }
                    onBlur={(e) => handleInputBlur(product.id, e.target.value)}
                    className="product-quantity-input"
                  />
                  <button
                    onClick={() => handleIncrement(product.id)}
                    className="cart-quantity-button"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="price-column">
                <p className="product-price">${product.productPrice}</p>
              </div>

              <div className="prod-total-column">
                <p className="prod-total-price">
                  $
                  {product.productTotal
                    .toString()
                    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                </p>
              </div>
            </div>
          ))}
        </div>
        {error && <div className="error-message">{error}</div>}{" "}
        <div className="cart-total">
          <h3>Order Total:</h3>
          <p className="price-fineprint">(Pre-tax; Shipping is FREE!)</p>
          <p className="cart-total-dollars">
            $
            {cartProducts
              .reduce(
                (total, product) => total + parseFloat(product.productTotal),
                0
              )
              .toFixed(2)
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
            {/* Apply the same replace method */}
          </p>
        </div>
        
        <div className="cart-buttons">
          <button className="cart-button" onClick={handleShopping}>
            <h4 className="checkout-text">Keep Shopping!</h4>
          </button>
          <button className="cart-button" onClick={handleCheckout}>
            <h4 className="checkout-text">Check out!</h4>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Cart;
