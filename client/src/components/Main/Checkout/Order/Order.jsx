import { useEffect } from "react";
import useAppContext from "../../../../context/useAppContext";
import axios from "axios";
import "./order.css";

const Order = () => {
  const { cartProducts, setCartProducts } = useAppContext();

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

        // Populate the Order component on the frontend with fetched CartProducts
        setCartProducts(cartProducts);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartProducts();
  }, [setCartProducts]);

  return (
    <section className="order">
      <div className="order-container">
        <h2 className="title">Your Order...</h2>
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
                  <p className="product-name">{product.Product.name}</p>
                </div>
              </div>

              <div className="quantity-column">
                <div className="product-quantity">
                  <p>{product.productQuantity}</p>
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

      </div>
    </section>
  );
};

export default Order;
