import useAppContext from "../../../../../context/useAppContext";
import { useState, useEffect } from "react";
import axios from "axios";

import MessageBox from "../../../MessageBox/MessageBox";

import "./atc-button.css";

const FoodAtc = () => {
  const {
    loggedIn,
    selectedFood,
    foodQuantity,
    setFoodQuantityError,
    setFoodAtcClicked,
    setFoodSelectionError,
    setShowFoodAtcMessageBox,
    showFoodAtcMessageBox,
    isAtcDisabled,
    setIsAtcDisabled,
  } = useAppContext();

  const [showAnimation, setShowAnimation] = useState(false);
  const [messageType, setMessageType] = useState("");
  const [messageContent, setMessageContent] = useState("");

  useEffect(() => {
    if (showFoodAtcMessageBox) {
      setShowAnimation(true);
      setIsAtcDisabled(true);

      const timer = setTimeout(() => {
        setShowAnimation(false);
        setShowFoodAtcMessageBox(false);
        setIsAtcDisabled(false);
        setFoodSelectionError(false);
        setFoodQuantityError(false);
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [
    showFoodAtcMessageBox,
    setShowFoodAtcMessageBox,
    setFoodSelectionError,
    setFoodQuantityError,
    setIsAtcDisabled,
  ]);

  const handleCartClick = async () => {
    if (!selectedFood) {
      setFoodAtcClicked(true);
      setFoodSelectionError(true);
      setMessageType("negative");
      setMessageContent("Please select food.");
      setShowFoodAtcMessageBox(true);
      return;
    }

    if (loggedIn) {
      if (foodQuantity < 1 || foodQuantity > 99) {
        setFoodQuantityError(true);
        setMessageType("negative");
        setMessageContent("Qty. must be less than 99.");
        setShowFoodAtcMessageBox(true);
        return;
      }

      setFoodQuantityError(false);
      setFoodAtcClicked(true);

      try {
        const userId = localStorage.getItem("userId");
        const currentCartId = localStorage.getItem("currentCartId");

        if (!userId || !currentCartId) {
          setMessageType("negative");
          setShowFoodAtcMessageBox(true);
          return;
        }

        const endpoint = `http://localhost:3000/products/${selectedFood.value}`;

        const foodItemInfoResponse = await axios.get(endpoint);

        const foodItemPrice = foodItemInfoResponse.data.price;

        const foodItemTotal = foodItemPrice * foodQuantity;

        await axios.post("http://localhost:3000/cart/products/", {
          userId: userId,
          cartId: currentCartId,
          foodItemId: selectedFood.value,
          productId: selectedFood.value,
          quantity: foodQuantity,
          foodItemPrice: foodItemPrice,
          foodItemTotal: foodItemTotal,
        });

        setMessageType("positive");
        setMessageContent("Added to cart!");
        setShowFoodAtcMessageBox(true);
      } catch (error) {
        console.error("Error adding food item to cart:", error);

        setMessageType("negative");
        setMessageContent("Error adding food item to cart.");
        setShowFoodAtcMessageBox(true);
      }
    }
  };

  return (
    <div className="atc-container">
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

export default FoodAtc;
