import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useAppContext from "../../../context/useAppContext.jsx";
import Current from "../Profile/Current-Edit-ForOrder/Current.jsx";
import Edit from "../Profile/Current-Edit-ForOrder/Edit.jsx";
import "./checkout.css";
import Order from "./Order/Order.jsx";

const Checkout = () => {
  const {
    editingProfile,
    setEditingProfile,
    hasEmptyFields,
    setHasEmptyFields,
  } = useAppContext();

  const navigate = useNavigate();

  const handleCart = () => {
    navigate("/cart"); // Navigate to the checkout page
  };

  const handleShopping = () => {
    navigate("/products"); // Navigate to the checkout page
  };
  

  const handleEditClick = () => {
    setEditingProfile(true);
  };

  const handleSaveClick = () => {
    setEditingProfile(false);
  };

  const checkFields = (hasEmpty) => {
    setHasEmptyFields(hasEmpty);
    setEditingProfile(hasEmpty);
  };

  useEffect(() => {
    // When the component mounts, set editingProfile based on empty fields
    setEditingProfile(hasEmptyFields);
  }, [setEditingProfile, hasEmptyFields]);

  return (
    <section className="checkout">
      {/* <h1
        className="checkout-title"
        style={{ display: editingProfile ? "none" : "block" }}
      >
        Ready to checkout?
      </h1>
      <div className="checkout-profile">
        {editingProfile ? (
          <Edit onSave={handleSaveClick} />
        ) : (
          <Current onEditClick={handleEditClick} checkFields={checkFields} />
        )}
      </div>
      <div className="checkout-order">
        <Order />
        <div className="cart-buttons">
          <button className="cart-button" onClick={handleCart}>
            <h4 className="to-cart-text">Adjust Cart</h4>
          </button>

          <button
            className="cart-button checkout-button"
            id="finalize-button"
            //   onClick={handleFinalize}
          >
            <h4 className="finalize-text">Looks good!</h4>
          </button>

          <button className="cart-button" onClick={handleShopping}>
            <h4 className="checkout-text">Keep Shopping!</h4>
          </button>
        </div>
      </div> */}
      <div className="coming-soon">
        <h1>Checkout with &ldquo;Stripe&rdquo;, coming soon!</h1>
      </div>
    </section>
  );
};

export default Checkout;
