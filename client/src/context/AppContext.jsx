import { createContext, useState, useEffect } from "react";
import PropTypes from "prop-types";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordMismatch, setPasswordMismatch] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);
  const [selectedMerch, setSelectedMerch] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [foodQuantity, setFoodQuantity] = useState(1);
  const [merchQuantity, setMerchQuantity] = useState(1);
  const [merchSizeError, setMerchSizeError] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [signoutClicked, setSignoutClicked] = useState(false);
  const [navOpen, setNavOpen] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [cartId, setCartId] = useState(null);
  const [cartProducts, setCartProducts] = useState([]);
  const [showDefaultZero, setShowDefaultZero] = useState(false);
  const [editingProfile, setEditingProfile] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [hasEmptyFields, setHasEmptyFields] = useState(false);
  const [foodAtcClicked, setFoodAtcClicked] = useState(false);
  const [merchAtcClicked, setMerchAtcClicked] = useState(false);
  const [isAtcDisabled, setIsAtcDisabled] = useState(false);
  const [showFoodAtcMessageBox, setShowFoodAtcMessageBox] = useState(false);
  const [showMerchAtcMessageBox, setShowMerchAtcMessageBox] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    address1: "",
    address2: "",
    city: "",
    state: "",
    zip: "",
  });

  const [foodQuantityError, setFoodQuantityError] = useState(false);
  const [merchQuantityError, setMerchQuantityError] = useState(false);
  const [foodSelectionError, setFoodSelectionError] = useState(false);
  const [merchSelectionError, setMerchSelectionError] = useState(false);

  useEffect(() => {
    // Check if the user is authenticated when the component mounts
    const isAuthenticated = localStorage.getItem("authenticated") === "true";
    // Update loggedIn state based on authentication status
    setLoggedIn(isAuthenticated);

    if (isAuthenticated) {
      const storedUserId = localStorage.getItem("userId");
      const storedCartId = localStorage.getItem("cartId");
      setUserId(storedUserId);
      setCartId(storedCartId);
    }
  }, []); // Empty dependency array ensures this effect runs only once when component mounts

  return (
    <AppContext.Provider
      value={{
        email,
        setEmail,
        password,
        setPassword,
        confirmPassword,
        setConfirmPassword,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        passwordMismatch,
        setPasswordMismatch,
        selectedFood,
        setSelectedFood,
        selectedMerch,
        setSelectedMerch,
        selectedSize,
        setSelectedSize,
        foodQuantity,
        setFoodQuantity,
        merchQuantity,
        setMerchQuantity,
        merchSizeError,
        setMerchSizeError,
        error,
        setError,
        foodQuantityError,
        setFoodQuantityError,
        merchQuantityError,
        setMerchQuantityError,
        cartProducts,
        setCartProducts,
        showDefaultZero,
        setShowDefaultZero,
        navOpen,
        setNavOpen,
        loggedIn,
        setLoggedIn,
        signoutClicked,
        setSignoutClicked,
        userId,
        cartId,
        userData,
        setUserData,
        loading,
        setLoading,
        editingProfile,
        setEditingProfile,
        showFoodAtcMessageBox,
        setShowFoodAtcMessageBox,
        showMerchAtcMessageBox,
        setShowMerchAtcMessageBox,
        profileData,
        setProfileData,
        fieldErrors,
        setFieldErrors,
        hasEmptyFields,
        setHasEmptyFields,
        foodSelectionError,
        setFoodSelectionError,
        merchSelectionError,
        setMerchSelectionError,
        foodAtcClicked,
        setFoodAtcClicked,
        merchAtcClicked,
        setMerchAtcClicked,
        isAtcDisabled,
        setIsAtcDisabled,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export { AppProvider, AppContext };
