import { useEffect } from "react";
import useAppContext from "../../../../../context/useAppContext";
import "./quantity.css";
import {
  decrementAtc,
  incrementAtc,
} from "../../../../../../../utils/addToCart";

const MerchQuantity = () => {
  const {
    merchQuantity,
    setMerchQuantity,
    selectedMerch,
    merchAtcClicked,
    setMerchAtcClicked,
  } = useAppContext();

  const handleDecrement = () => {
    decrementAtc(merchQuantity, setMerchQuantity);
    if (merchAtcClicked) {
      setMerchAtcClicked(false);
      console.log("Quantity decremented, reset merchAtcClicked to false");
    }
  };

  const handleIncrement = () => {
    incrementAtc(merchQuantity, setMerchQuantity);
    if (merchAtcClicked) {
      setMerchAtcClicked(false);
      console.log("Quantity incremented, reset merchAtcClicked to false");
    }
  };

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10) || "";
    setMerchQuantity(newQuantity);

    if (merchAtcClicked) {
      setMerchAtcClicked(false);
      console.log("Quantity changed, reset merchAtcClicked to false");
    }

    if (newQuantity < 1 || newQuantity > 99) {
      console.log("Quantity out of range, triggering error");
    }
  };

  useEffect(() => {
    console.log("MerchQuantity rendered. merchAtcClicked:", merchAtcClicked);
  }, [merchAtcClicked]);

  return (
    <section className="quantity-container">
      {selectedMerch && (
        <div id="merch-quantity">
          <button onClick={handleDecrement}>–</button>
          <input
            type="text"
            className="count"
            value={merchQuantity}
            onChange={handleQuantityChange}
          />
          <button onClick={handleIncrement}>+</button>
        </div>
      )}
    </section>
  );
};

export default MerchQuantity;
