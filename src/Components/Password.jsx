import styles from "../style.js";
import tick from "../assets/tickbox.svg";
import box from "../assets/box.svg";
import Button from "./Button";
import { useState } from "react";
import PropTypes from "prop-types";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Password = ({ nextStep }) => {
  const [checked, setChecked] = useState(false);
  const [password, setPassword] = useState("12345678");
  const [confirmPassword, setConfirmPassword] = useState("12345678");

  const isPasswordsMatching = password === confirmPassword;

  const isInputEmpty = password === "" || confirmPassword === "";
  const lenPass = password.length >= 8 || confirmPassword.length >= 8;
  const isReadyToProceed =
    checked && lenPass && isPasswordsMatching && !isInputEmpty;
  localStorage.setItem("password", password);

  const handleNext = () => {
    if (!isReadyToProceed) {
      if (!checked) toast.error("Kindly agree to the terms of service");
      else if (!lenPass)
        toast.error("Password should be at least 8 characters");
      else if (!isPasswordsMatching) toast.error("Passwords do not match");
      else if (isInputEmpty) toast.error("Invalid input");
    } else nextStep();
  };

  return (
    <div className={`flex flex-col ${styles.paddingX} font-poppins`}>
      <div className={` flex flex-col justify-center items-center `}>
        <h1 className="text-[36px] text-fuchsia-50">Create a Password</h1>
      </div>
      <p className="text-center font-poppins font-thin text-[16px] text-gray-400 mt-3">
        It should be at least 8 characters.
        <br /> You&apos;ll need this password to unlock your Packback.
      </p>

      <div className="flex flex-col">
        <input
          type="password"
          placeholder="Password"
          className="mt-8 w-[582px] h-[52px] border-1 border-gray-300 rounded-xl px-4 bg-black-gradient
            cursor-line-1 text-white font-poppins font-thin text-[16px] focus:outline-none focus:ring-2 focus:ring-offset-2"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-col">
        <input
          type="password"
          placeholder="Confirm Password"
          className="mt-4 w-[582px] h-[52px] border-1 border-gray-300 rounded-xl px-4 bg-black-gradient
            cursor-line-1 text-white font-poppins font-thin text-[16px] focus:outline-none focus:ring-2 focus:ring-offset-2"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
      </div>
      <div className="flex flex-row text-fuchsia-50 mt-40 justify-center items-center">
        <img
          src={checked && isPasswordsMatching ? tick : box}
          className="w-[20px] h-[20px] mr-2  cursor-pointer"
          onClick={() => setChecked(!checked)}
        />
        <h3 className="pl-2 text-fuchsia-50 font-normal text-[16px]">
          I agree to the{" "}
          <a
            href="https://support.backpack.exchange/en/articles/1030529"
            target="_blank"
            className="text-orange-300 hover:text-orange-400 cursor-pointer"
          >
            Terms & Conditions
          </a>
        </h3>
      </div>
      <div className="flex justify-center items-center">
        <ToastContainer
          position="top-right"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition:Bounce
        />
        <Button
          value={"Next"}
          nextStep={nextStep}
          onClick={handleNext ? handleNext : () => {}}
          className={
            checked
              ? `w-72 h-12 bg-black-gradient text-fuchsia-50 rounded-xl p-4 pointer cursor-pointer mt-6 flex justify-center items-center`
              : `w-72 h-12 bg-black-gradient text-gray-400 rounded-xl p-4 pointer cursor-pointer mt-6 flex justify-center items-center`
          }
        />
      </div>
    </div>
  );
};

Password.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default Password;
