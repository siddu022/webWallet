import styles from "../style.js"; // Assuming styles.js exists and is imported correctly
import PropTypes from "prop-types";
import solLogo from "../assets/solana.png";
import ethLogo from "../assets/ethereum.webp";
import { useNetwork } from "../NetworkContext.jsx"; // Assuming NetworkContext.jsx exists and provides useNetwork hook
import { useState } from "react";

const SelectNetwork = ({ nextStep }) => {
  const { setSelectedNetwork } = useNetwork();
  const [searchTerm, setSearchTerm] = useState("");
  const [originalNetworks, setOriginalNetworks] = useState([
    { name: "Solana", logo: solLogo, value: "solana" },
    { name: "Ethereum", logo: ethLogo, value: "ethereum" },
  ]);
  const [filteredNetworks, setFilteredNetworks] = useState(originalNetworks); // Initialize with original data

  const handleNetworkSelect = (network) => {
    setSelectedNetwork(network);
    nextStep();
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value.toLowerCase()); // Ensure case-insensitive search

    const filtered = originalNetworks.filter((network) =>
      network.name.toLowerCase().includes(searchTerm),
    );
    setFilteredNetworks(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm(""); // Clear search term
    setFilteredNetworks(originalNetworks); // Reset to original data
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
          value={searchTerm}
          onChange={handleSearchChange}
          className="mt-8 w-[582px] h-[52px] border-1 border-gray-300 rounded-xl px-4 bg-black-gradient
          cursor-line-1 text-white font-poppins font-thin text-[16px] focus:ring-2 focus:ring-offset-2 foucs:outline-none"
        />
        <hr className={`border-1 border-gray-900 mt-6`}></hr>
        {searchTerm.length > 0 && ( // Show clear button only when searching
          <button
            className="text-sm text-gray-500 hover:text-gray-700 mt-2"
            onClick={handleClearSearch}
          >
            Clear Search
          </button>
        )}
      </div>

      {filteredNetworks.map((network, index) => (
        <div
          key={index}
          className="w-[582px] h-[62px] bg-black-gradient text-fuchsia-50 rounded-xl p-4 pointer cursor-pointer mt-4 flex flex-row 
          items-center font-semibold gap-4 hover:text-gray-400"
          onClick={() => handleNetworkSelect(network.value)}
        >
          <img src={network.logo} className="w-[32px] h-[32px]" />
          <h3>{network.name}</h3>
        </div>
      ))}
    </div>
  );
};

SelectNetwork.propTypes = {
  nextStep: PropTypes.func.isRequired,
};

export default SelectNetwork;
