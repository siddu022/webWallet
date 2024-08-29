import styles from "../style.js";
import warnSign from "../assets/warning.svg";
import lock from "../assets/lock.svg";
import tick from "../assets/tickbox.svg";
import box from "../assets/box.svg";
import Button from "./Button";
import PropTypes from "prop-types";
import { useState } from "react";

const Recovery = ({ nextStep }) => {
  const [checked, setChecked] = useState(false);

  return (
    <div
      className={` flex flex-col justify-center items-center ${styles.paddingX} font-poppins`}
    >
      <h1 className="text-center font-semibold text-4xl text-fuchsia-50">
        Secret Recovery Phrase Warning
      </h1>
      <p className="text-center font-poppins font-thin text-[16px] text-gray-400 mt-8">
        On the next page, you will receive your secret
        <br />
        recovery phrase.
      </p>

      <div className="mt-6 flex flex-col gap-4">
        <div className="w-[450px] h-[96px] bg-black-gradient rounded-xl p-4 flex flex-row items-center gap-4 pl-5 border-2 border-primary">
          <img src={warnSign} className="w-[28px] h-[28px] " />
          <h3 className="text-gray-400 font-normal text-[16px]">
            This is the <span className="text-fuchsia-50">ONLY</span> way to
            recover your account <br /> if you lose access to your device or
            password.
          </h3>
        </div>
        <div className="w-[450px] h-[96px] bg-black-gradient rounded-xl p-4 flex flex-row items-center gap-4 pl-5 border-2 border-primary">
          <img src={lock} className="w-[28px] h-[28px] " />
          <h3 className="text-gray-400 font-normal text-[16px]">
            Write it down, store it in a safe place, and
            <br />
            <span className="text-fuchsia-50">NEVER</span> share it with anyone.
          </h3>
        </div>
        <div className="ml-4 flex flex-row text-fuchsia-50 mt-4">
          <img
            src={checked ? tick : box}
            className="w-[20px] h-[20px] mr-2 mt-1 cursor-pointer"
            onClick={() => setChecked(!checked)}
          />
          <h3 className="text-fuchsia-50 font-normal text-[16px]">
            I understand that I am responsible for saving my
            <br /> secret recovery phrase, and that it is the only way
            <br /> to recover my wallet
          </h3>
        </div>
      </div>

      <Button
        value={"Next"}
        nextStep={nextStep}
        onClick={checked ? nextStep : () => {}}
        prevStep={nextStep - 1}
        className={
          checked
            ? `w-72 h-12 bg-black-gradient text-fuchsia-50 rounded-xl p-4 pointer cursor-pointer mt-6 flex justify-center items-center`
            : `w-72 h-12 bg-black-gradient text-gray-400 rounded-xl p-4 pointer cursor-pointer mt-6 flex justify-center items-center `
        }
      />
    </div>
  );
};

Recovery.propTypes = {
  nextStep: PropTypes.func,
};
export default Recovery;
