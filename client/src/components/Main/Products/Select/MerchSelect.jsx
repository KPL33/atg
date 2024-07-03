import { useEffect } from "react";
import useAppContext from "../../../../context/useAppContext";
import PropTypes from "prop-types";

import Select from "react-dropdown-select";


import MerchQuantity from "./Quantity/MerchQuantity.jsx";
import MerchAtc from "./AtcButtons/MerchAtc.jsx";

import { handleProductSelection } from "../../../../../../utils/addToCart.js";

import "./prod-select.css";

const options = [
  { value: 5, label: "T-Shirt - $6.99" },
  { value: 9, label: "Coffee Mug - $4.99" },
  { value: 10, label: "Commuter Mug - $10.99" },
];

const MerchSelect = () => {
  const {
    setMerchQuantity,
    selectedMerch,
    setSelectedMerch,
    setMerchSelectionError,
    merchAtcClicked,
    setMerchAtcClicked,
    selectedSize,
    setSelectedSize,
    setMerchSizeError,
  } = useAppContext();

  useEffect(() => {
    setSelectedMerch(null);
    setMerchSelectionError(false);
    setMerchAtcClicked(false);
    setMerchSizeError(false);
  }, [
    setSelectedMerch,
    setMerchSelectionError,
    setMerchAtcClicked,
    setMerchSizeError,
  ]);

  const handleOnChange = (values) => {
    handleProductSelection(values, setSelectedMerch, setMerchQuantity);
    setMerchSizeError(false);
    if (merchAtcClicked) {
      setMerchAtcClicked(false);
      console.log("handleOnChange reset merchAtcClicked to false");
    }
  };

  const handleSizeChange = (size, productId) => {
    setSelectedSize(size);
    setSelectedMerch({ value: productId, label: `T-Shirt - ${size}` });
    if (merchAtcClicked) {
      setMerchAtcClicked(false);
      console.log("handleSizeChange reset merchAtcClicked to false");
    }
  };

  useEffect(() => {
    if (
      selectedMerch &&
      selectedMerch.label.includes("T-Shirt") &&
      !selectedSize
    ) {
      setMerchSizeError(true);
    } else {
      setMerchSizeError(false);
    }
  }, [selectedMerch, selectedSize, setMerchSizeError]);

  return (
    <div className="prod-select-details">
      <div className="prod-name-quantity">
        <Select
          className="select-menu"
          options={options}
          onChange={handleOnChange}
          labelField="label"
          valueField="value"
          searchable={false}
        />
        
        {selectedMerch && <MerchQuantity />}
      </div>

      <MerchAtc />        
    </div>
  );
};

MerchSelect.propTypes = {
  onSelectChange: PropTypes.func,
};

export default MerchSelect;
