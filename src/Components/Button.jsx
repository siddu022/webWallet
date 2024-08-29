import PropTypes from "prop-types";

const Button = ({ onClick, value, className }) => (
  <button
    type="button"
    className={` font-poppins font-medium text-[18px] text-fuchsia-50 bg-black-gradient rounded-[10px] outline-none
      hover:text-gray-400 hover:bg-black-gradient-hover focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 ${className}`}
    onClick={onClick}
  >
    {value}
  </button>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default Button;
