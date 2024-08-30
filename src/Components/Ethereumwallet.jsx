import { useState, useEffect } from "react";
import { ethers } from "ethers";
import deleteIcon from "../assets/delete.svg";

export function EthereumWallet() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(null);

  // Retrieve wallets from localStorage or initialize an empty array
  useEffect(() => {
    const savedWallets = JSON.parse(localStorage.getItem("eth_wallets")) || [];
    setWallets(savedWallets);
    if (savedWallets.length > 0) {
      setCurrentIndex(savedWallets.length);
    }

    // Retrieve and set the stored password if it exists
    const storedPassword = localStorage.getItem("password");
    if (storedPassword) {
      setPassword(storedPassword);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("eth_wallets", JSON.stringify(wallets));
  }, [wallets]);

  const generateWallet = () => {
    const wallet = ethers.Wallet.createRandom();
    const secretKey = wallet.privateKey;

    setWallets([
      ...wallets,
      { address: wallet.address, privateKey: secretKey },
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  const deleteWallet = (index) => {
    const updatedWallets = wallets.filter((_, i) => i !== index);
    setWallets(updatedWallets);
  };

  const handlePasswordChange = (e) => {
    setPasswordInput(e.target.value);
  };

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (passwordInput === password) {
      setIsPasswordModalOpen(false); // Close the password modal
    } else {
      alert("Incorrect password");
    }
  };

  const showPrivateKeyModal = (index) => {
    setSelectedWalletIndex(index);
    setIsPasswordModalOpen(true);
  };

  const closePasswordModal = () => {
    setIsPasswordModalOpen(false);
    setSelectedWalletIndex(null);
  };

  return (
    <div className="text-fuchsia-50 text-[16px] font-poppins">
      <button
        onClick={generateWallet}
        className="mb-4 p-2 bg-black-gradient rounded-md"
      >
        Generate Wallet
      </button>

      <div className="wallet-container">
        {wallets.map((wallet, index) => (
          <div
            key={index}
            className="wallet-item mb-4 p-4 bg-black-gradient rounded-xl"
          >
            <div className="address mb-2">
              <strong>Address:</strong> {wallet.address}
            </div>
            <div className="wallet-number mb-2">
              <strong>Wallet Number:</strong> {index + 1}
            </div>
            <div className="private-key">
              <strong>Private Key:</strong>{" "}
              <button
                onClick={() => showPrivateKeyModal(index)}
                className="hover:text-gray-400 p-2 rounded-md "
              >
                Show Private Key
              </button>
            </div>
            <button
              onClick={() => deleteWallet(index)}
              className="mt-2 p-2 bg-black-gradient rounded-md text-white"
            >
              <img src={deleteIcon} alt="delete" />
            </button>
          </div>
        ))}
      </div>

      {isPasswordModalOpen && selectedWalletIndex !== null && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-black-gradient rounded-lg p-4 shadow-md w-80">
            <h2 className="text-center text-2xl font-semibold mb-4">
              Enter Password
            </h2>
            <form onSubmit={handlePasswordSubmit}>
              <input
                type="password"
                value={passwordInput}
                onChange={handlePasswordChange}
                placeholder="Enter your password"
                className="w-full p-2 mb-4 bg-gray-700 text-gray-200 rounded-md"
              />
              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={closePasswordModal}
                  className="ml-2 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </form>
            <div className="mt-4">
              {passwordInput === password && (
                <div>
                  <p>
                    <strong>Private Key:</strong>
                  </p>
                  <input
                    type="text"
                    value={wallets[selectedWalletIndex].privateKey}
                    readOnly
                    className="w-full p-2 bg-gray-700 text-gray-200 rounded-md"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default EthereumWallet;
