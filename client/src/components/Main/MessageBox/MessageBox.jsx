import PropTypes from "prop-types";
import useAppContext from "../../../context/useAppContext";
import "./message-box.css";

const MessageBox = ({ message, type }) => {
  const { showFoodAtcMessageBox, showMerchAtcMessageBox } = useAppContext();

  return (
    <div className="message-box-container">
      {showFoodAtcMessageBox && (
        <div className={`message-box ${type}`}>{message}</div>
      )}

      {showMerchAtcMessageBox && (
        <div className={`message-box ${type}`}>{message}</div>
      )}
    </div>
  );
};

MessageBox.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["positive", "negative"]).isRequired,
};

export default MessageBox;
