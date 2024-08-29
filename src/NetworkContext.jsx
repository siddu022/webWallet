import { createContext, useContext, useState } from "react";
import PropTypes from "prop-types";

// Create the context
const NetworkContext = createContext();

// Create a provider component
export const NetworkProvider = ({ children }) => {
  const [selectedNetwork, setSelectedNetwork] = useState(null);

  return (
    <NetworkContext.Provider value={{ selectedNetwork, setSelectedNetwork }}>
      {children}
    </NetworkContext.Provider>
  );
};

// Custom hook to use the NetworkContext
export const useNetwork = () => useContext(NetworkContext);

NetworkProvider.propTypes = {
  children: PropTypes.node,
};
