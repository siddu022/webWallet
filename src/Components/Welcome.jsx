import Button from "./Button";
import logo from "../assets/logo.png";
import PropTypes from "prop-types";
const Welcome = ({ nextStep }) => {
  return (
    <div className="font-poppins ">
      <img src={logo} alt="logo" className="w-[130px] h-[130px] mt-4 ml-32" />
      <h1 className="mt-6 font-semibold text-4xl text-fuchsia-50 ">
        Welcome to Packback
      </h1>

      <p
        className={`ml-32 font-poppins font-thin text-[16px] text-gray-400 mt-4`}
      >
        Let&apos;s get started.
      </p>
      <div className="mt-20 mx-16 ">
        <Button
          onClick={nextStep}
          value={"Create a new wallet"}
          className="h-12 w-72"
        />
      </div>
    </div>
  );
};
Welcome.propTypes = {
  nextStep: PropTypes.func,
};

export default Welcome;
