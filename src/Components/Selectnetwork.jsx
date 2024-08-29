import styles from "../style.js";
import PropTypes from "prop-types";
import solLogo from "../assets/solana.png";
import ethLogo from "../assets/ethereum.webp";
import { useNetwork } from "../NetworkContext.jsx";

const SelectNetwork = ({ nextStep }) => {
  const { setSelectedNetwork } = useNetwork();

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    nextStep();
  };

  return (
    <div
      className={`flex flex-col justify-center items-center ${styles.paddingX} font-poppins `}
    >
      <h1 className="text-center font-semibold text-4xl text-fuchsia-50">
        Select Network
      </h1>
      <p className="text-center font-poppins font-thin text-[16px] text-gray-400 mt-8">
        Packback supports multiple blockchains.
        <br />
        Which do you want to use? You can add more later.
      </p>

      <div className="flex flex-col">
        <input
          type="text"
          placeholder="Search Network"
          className="mt-8 w-[582px] h-[52px] border-1 border-gray-300 rounded-xl px-4 bg-black-gradient
            cursor-line-1 text-white font-poppins font-thin text-[16px] focus:ring-2 focus:ring-offset-2 foucs:outline-none"
        />
        <hr className={`border-1 border-gray-900 mt-6`}></hr>
      </div>
      <div
        className="w-[582px] h-[62px] bg-black-gradient text-fuchsia-50 rounded-xl p-4 pointer cursor-pointer mt-4 flex flex-row 
         items-center font-semibold gap-4 hover:text-gray-400"
        onClick={() => handleNetworkSelect("solana")}
      >
        <img src={solLogo} className="w-[32px] h-[32px]" />
        <h3>Solana</h3>
      </div>
      <div
        className="w-[582px] h-[62px] bg-black-gradient text-fuchsia-50 rounded-xl p-4 pointer cursor-pointer mt-4 flex flex-row 
         items-center font-semibold gap-4 hover:text-gray-400"
        onClick={() => handleNetworkSelect("ethereum")}
      >
        <img src={ethLogo} className="w-[32px] h-[32px]" />
        <h3>Ethereum</h3>
      </div>
    </div>
  );
};

SelectNetwork.propTypes = {
  nextStep: PropTypes.func,
};

export default SelectNetwork;
