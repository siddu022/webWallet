import { useState, useRef, useEffect } from "react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import sol from "../assets/solana.png";
import eth from "../assets/ethereum.webp";
import Solanawallet from "./Solanawallet.jsx";
import Ethereumwallet from "./Ethereumwallet.jsx";
import PropTypes from "prop-types";

const Dropdown = ({ wallets }) => {
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedNetwork, setSelectedNetwork] = useState("Solana");

  const handleDropdownClicked = (event) => {
    event.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleSelectNetwork = (network) => {
    setSelectedNetwork(network);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        isOpen &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target) &&
        menuRef.current &&
        !menuRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [isOpen]);

  const networkDetails = {
    Solana: {
      name: "Solana",
      img: sol,
    },
    Ethereum: {
      name: "Ethereum",
      img: eth,
    },
  };

  return (
    <div className="relative dropdown font-poppins">
      <button
        ref={buttonRef}
        onClick={handleDropdownClicked}
        className="w-[582px] h-[62px] flex items-center gap-4 p-4 bg-black-gradient text-white rounded-xl hover:bg-opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        <div className={`pl-5 flex justify-between w-full items-center`}>
          <div className="flex items-center gap-4">
            <img
              src={networkDetails[selectedNetwork].img}
              alt={networkDetails[selectedNetwork].name}
              className="h-6 w-6"
            />
            <span>{networkDetails[selectedNetwork].name} Network</span>
          </div>
          <ChevronDownIcon
            className={`h-6 w-6 transform transition duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </div>
      </button>
      <div
        ref={menuRef}
        className={`mt-3 absolute w-full rounded-xl bg-black-gradient shadow-md overflow-hidden transition duration-200 transform scale-0 opacity-0 text-gray-300 ${
          isOpen ? "scale-100 opacity-100" : ""
        }`}
      >
        <div className="px-4 py-2">
          <button
            className="flex items-center gap-4 py-2 px-4 text-left rounded-xl hover:text-gray-400"
            onClick={() => handleSelectNetwork("Solana")}
          >
            <img src={sol} alt="solana" className="h-6 w-6" />
            <span>Solana</span>
          </button>
          <button
            className="flex items-center gap-4 py-2 px-4 text-left rounded-xl hover:text-gray-400"
            onClick={() => handleSelectNetwork("Ethereum")}
          >
            <img src={eth} alt="ethereum" className="h-6 w-6" />
            <span>Ethereum</span>
          </button>
        </div>
      </div>

      <div className="mt-6">
        {selectedNetwork === "Solana" && (
          <Solanawallet wallets={wallets} selectedNetwork={selectedNetwork} />
        )}
        {selectedNetwork === "Ethereum" && (
          <Ethereumwallet wallets={wallets} selectedNetwork={selectedNetwork} />
        )}
      </div>
    </div>
  );
};

Dropdown.propTypes = {
  wallets: PropTypes.array.isRequired,
};

export default Dropdown;
