import { useEffect } from "react";
import useAppContext from "../../../../context/useAppContext";

import Select from "react-dropdown-select";

import FoodQuantity from "./Quantity/FoodQuantity.jsx";
import FoodAtc from "./AtcButtons/FoodAtc.jsx";

import { handleProductSelection } from "../../../../../../utils/addToCart.js";

import "./prod-select.css";

const options = [
  { value: 1, label: "0.5 lbs. cereal - $4.99 ea." },
  { value: 2, label: "2.0 lbs. cereal - $8.99 ea." },
  { value: 3, label: "5.0 lbs. cereal - $12.99 ea." },
  { value: 4, label: "10.0 lbs. cereal - $21.99 ea." },
];

const FoodSelect = () => {
  const {
    setFoodQuantity,
    selectedFood,
    setSelectedFood,
    setFoodSelectionError,
    setFoodAtcClicked,
  } = useAppContext();

  useEffect(() => {
    setSelectedFood(null);
    setFoodSelectionError(false);
    setFoodAtcClicked(false);
  }, [setSelectedFood, setFoodSelectionError, setFoodAtcClicked]);

  const handleOnChange = (values) => {
    handleProductSelection(values, setSelectedFood, setFoodQuantity);
  };

  return (
    <div className="prod-select-details">
      <div className="prod-name-quantity">
        <Select
          className="select-menu"
          options={options}
          onChange={handleOnChange}
          labelField="label"
          searchable={false}
        />
        
        {selectedFood && <FoodQuantity />}
      </div>
      
      <FoodAtc />
    </div>
  );
};

export default FoodSelect;
