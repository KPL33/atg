// ShirtSizes.jsx
import PropTypes from "prop-types";
import "./shirt-sizes.css";

const sizeToProductId = {
  SM: 5,
  MD: 6,
  LG: 7,
  XL: 8,
};

const ShirtSizes = ({ selectedSize, onSizeChange }) => {
  const sizes = ["SM", "MD", "LG", "XL"];

  const handleSizeClick = (size) => {
    onSizeChange(size, sizeToProductId[size]);
  };

  return (
    <section className="shirt-sizes">
      {sizes.map((size) => (
        <div
          key={size}
          className={`size-option ${selectedSize === size ? "selected" : ""}`}
          onClick={() => handleSizeClick(size)}
        >
          {size}
        </div>
      ))}
    </section>
  );
};

ShirtSizes.propTypes = {
  selectedSize: PropTypes.string.isRequired,
  onSizeChange: PropTypes.func.isRequired,
};

export default ShirtSizes;
