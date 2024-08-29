import styles from "../style.js";
import PropTypes from "prop-types";
import tick from "../assets/tickbox.svg";
import box from "../assets/box.svg";
import Button from "./Button";
import { useEffect, useState } from "react";
import { generateMnemonic } from "bip39";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Secretrecov = ({ nextStep, prevStep }) => {
  const [checked, setChecked] = useState(false);
  const [mnemonic, setMnemonic] = useState(generateMnemonic());

  localStorage.setItem("mnemonic", mnemonic);

  const notify = () => toast("Copied to clipboard");

  useEffect(() => {
    setMnemonic(generateMnemonic());
  }, []);

  const mnemonicArray = mnemonic.split(" ");

  const copyToClipboard = () => {
    navigator.clipboard.writeText(mnemonicArray).then(() => notify());
  };
  return (
    <div className={`flex  flex-col ${styles.paddingX} font-poppins`}>
      <div className={` flex flex-col justify-center items-center mt-52`}>
        <h1 className="text-[36px] text-fuchsia-50">Secret Recovery Phrase</h1>
      </div>
      <p className="text-center font-poppins font-thin text-[16px] text-gray-400 mt-3">
        Save these words in a safe place.
        <br /> They are the only way to recover your account.
      </p>
      <p
        className="text-center font-poppins cursor-pointer font-thin text-[16px] text-orange-300 mt-3 hover:text-orange-400"
        onClick={() => {
          prevStep();
        }}
      >
        Read the warnings again
      </p>
      <div
        className={`font-poppins w-[582px] h-[240px]  bg-black-gradient  mt-6 rounded-lg overflow-hidden cursor-pointer`}
        onClick={copyToClipboard}
      >
        <ToastContainer
          position="top-right"
          autoClose={1500}
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
        <div className=" mt-5 flex-wrap gap-4 text-gray-400  text-[16px] p-4` grid grid-cols-3 gap-x-20 font-semibold ">
          {mnemonicArray.map((word, index) => (
            <div key={index} className=" px-5 rounded-md ">
              {index + 1}{" "}
              <span className="pl-2 text-fuchsia-50  text-[15px]"> {word}</span>
            </div>
          ))}
        </div>
        <p
          className={`mt-9 text-gray-400 text-center text-[14px] hover:text-gray-500`}
        >
          Click anywhere on this card to copy
        </p>
      </div>

      <div className="flex flex-row text-fuchsia-50 mt-6 justify-center items-center">
        <img
          src={checked ? tick : box}
          className="w-[20px] h-[20px] mr-2  cursor-pointer"
          onClick={() => setChecked(!checked)}
        />
        <h3 className="text-fuchsia-50 font-normal text-[16px]">
          I saved my secret recovery phrase
        </h3>
      </div>
      <div className="flex justify-center items-center">
        <Button
          value={"Next"}
          nextStep={nextStep}
          onClick={checked ? nextStep : () => {}}
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

Secretrecov.propTypes = {
  prevStep: PropTypes.func.isRequired,
  nextStep: PropTypes.func.isRequired,
};

export default Secretrecov;
