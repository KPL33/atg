import useAppContext from "../../../../../context/useAppContext";
import "./quantity.css";
import {
  decrementAtc,
  incrementAtc,
} from "../../../../../../../utils/addToCart";

const Quantity = () => {
  const { foodQuantity, setFoodQuantity, selectedFood } = useAppContext();

  const handleDecrement = () => {
    decrementAtc(foodQuantity, setFoodQuantity);
  };

  const handleIncrement = () => {
    incrementAtc(foodQuantity, setFoodQuantity);
  };

  return (
    <section className="quantity-container">
      {selectedFood && (
        <div id="food-quantity">
          <button onClick={handleDecrement}>–</button>
          <input
            type="text"
            className="count"
            value={foodQuantity}
            onChange={(e) =>
              setFoodQuantity(parseInt(e.target.value, 10) || "")
            }
          />
          <button onClick={handleIncrement}>+</button>
        </div>
      )}
    </section>
  );
};

export default Quantity;
