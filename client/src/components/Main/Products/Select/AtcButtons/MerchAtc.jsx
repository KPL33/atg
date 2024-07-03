import useAppContext from "../../../../../context/useAppContext";
import { useState, useEffect } from "react";
import axios from "axios";

import MessageBox from "../../../MessageBox/MessageBox";
import ShirtSizes from "../ShirtSizes/ShirtSizes.jsx";

import "./atc-button.css";

const MerchAtc = () => {
  const {
    loggedIn,
    selectedMerch,
    setSelectedMerch,
    merchQuantity,
    setMerchQuantityError,
    merchAtcClicked,
    setMerchAtcClicked,
    setMerchSelectionError,
    setShowMerchAtcMessageBox,
    showMerchAtcMessageBox,
    selectedSize,
    setSelectedSize,
    setMerchSizeError,
    isAtcDisabled,
    setIsAtcDisabled,
  } = useAppContext();

  const [showAnimation, setShowAnimation] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    if (showMerchAtcMessageBox) {
      setShowAnimation(true);
      setIsAtcDisabled(true);

      const timer = setTimeout(() => {
        setShowAnimation(false);
        setShowMerchAtcMessageBox(false);
        setIsAtcDisabled(false);
        setMerchSelectionError(false);
        setMerchQuantityError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [
    showMerchAtcMessageBox,
    setShowMerchAtcMessageBox,
    setMerchSelectionError,
    setMerchQuantityError,
    setIsAtcDisabled,
  ]);

  const handleCartClick = async () => {
    if (!selectedMerch) {
      setMerchAtcClicked(true);
      setMerchSelectionError(true);
      setMessageType("negative");
      setMessageContent("Please select an item.");
      setShowMerchAtcMessageBox(true);
      return;
    }

    if (selectedMerch.label.includes("T-Shirt") && !selectedSize) {
      setMerchSizeError(true);
      setMerchSelectionError(true);
      setMessageType("negative");
      setMessageContent("Please select a size.");
      setShowMerchAtcMessageBox(true); // Ensure message box is shown
      return;
    } else {
      setMerchSizeError(false);
    }

    if (loggedIn) {
      if (merchQuantity < 1 || merchQuantity > 99) {
        setMerchQuantityError(true);
        setMessageType("negative");
        setMessageContent("Qty. must be less than 99.");
        setShowMerchAtcMessageBox(true);
        return;
      }

      setMerchQuantityError(false);
      setMerchAtcClicked(true);

      try {
        const userId = localStorage.getItem("userId");
        const currentCartId = localStorage.getItem("currentCartId");

        if (!userId || !currentCartId) {
          setMessageType("negative");
          setMessageContent("User or cart ID missing.");
          setShowMerchAtcMessageBox(true);
          return;
        }

        const endpoint = `http://localhost:3000/products/${selectedMerch.value}`;
        const response = await axios.get(endpoint);
        const merchItemPrice = response.data.price;
        const merchItemTotal = merchItemPrice * merchQuantity;

        await axios.post("http://localhost:3000/cart/products/", {
          userId,
          cartId: currentCartId,
          merchItemId: selectedMerch.value,
          productId: selectedMerch.value,
          quantity: merchQuantity,
          merchItemPrice,
          merchItemTotal,
        });

        setMessageType("positive");
        setMessageContent("Added to cart!");
        setShowMerchAtcMessageBox(true);
      } catch (error) {
        console.error("Error adding merch item to cart:", error);
        setMessageType("negative");
        setMessageContent("Error adding merch item to cart.");
        setShowMerchAtcMessageBox(true);
      }
    }
  };

  const handleSizeChange = (size, productId) => {
    setSelectedSize(size);
    setSelectedMerch({ value: productId, label: `T-Shirt - ${size}` });
    if (merchAtcClicked) {
      setMerchAtcClicked(false);
    }
  };

  return (
    <div className="atc-container">
      {selectedMerch?.label.includes("T-Shirt") && (
        <ShirtSizes
          selectedSize={selectedSize}
          onSizeChange={handleSizeChange}
        />
      )}

      <button
        className="atc-button"
        onClick={handleCartClick}
        disabled={!loggedIn || isAtcDisabled}
      >
        {loggedIn ? "Add to cart" : "Login to add to cart"}
      </button>

      <div className="message-box-wrapper">
        {showAnimation && (
          <MessageBox message={messageContent} type={messageType} />
        )}
      </div>
    </div>
  );
};

export default MerchAtc;
