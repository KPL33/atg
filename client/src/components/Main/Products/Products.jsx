import useAppContext from "../../../context/useAppContext.jsx";
import { useNavigate } from "react-router-dom";

import bowl from "../../../../src/assets/bowl.jpg";
import commuter from "../../../../src/assets/commuter_mug.jpg";
import mug from "../../../../src/assets/mug.jpg";
import shirt from "../../../../src/assets/shirt.jpg";
import whiteCart from "../../../../src/assets/cart_w.svg";

import FoodSelect from "./Select/FoodSelect.jsx";
import MerchSelect from "./Select/MerchSelect.jsx";

import "./products.css";

const Products = () => {
  const { selectedMerch } = useAppContext();

  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart"); // Navigate to the checkout page
  };

  const getMerchImage = (value) => {
    switch (value) {
      case 5:
        return shirt;
      case 9:
        return mug;
      case 10:
        return commuter;
      default:
        return shirt; // Default to shirt if no valid value is found
    }
  };

  return (
    <section className="products">
      <h1 className="products-title">
        What would you like to check out today?
      </h1>

      <div className="product-card-container">
        <div className="product-card">
          <h2 className="product-card-title">Cereal</h2>
          <div className="product-image-container">
            <img
              className="food-image"
              src={bowl}
              alt="A picture of a bowl of cereal."
            />
          </div>
          <h4 className="product-card-description">
            Hungry? You&apos;re in the right place!
          </h4>
          <FoodSelect />
        </div>

        <button className="cart-icon-container" onClick={handleCart}>
          <img src={whiteCart} alt="Cart" />
        </button>

        <div className="product-card">
          <h2 className="product-card-title">Merchandise</h2>
          <div className="product-image-container">
            <img
              className="merch-image"
              src={getMerchImage(selectedMerch?.value)}
              alt="A picture of merchandise."
            />
          </div>
          <h4 className="product-card-description">
            Love our products? Spread the word!
          </h4>
          <MerchSelect />
        </div>
      </div>
    </section>
  );
};

export default Products;
