import { useState, useEffect } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import deleteIcon from "../assets/delete.svg";
import nacl from "tweetnacl";

export function Solanawallet() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);
  const [password, setPassword] = useState("");
  const [passwordInput, setPasswordInput] = useState("");
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [selectedWalletIndex, setSelectedWalletIndex] = useState(null);

  // Retrieve wallets and passwords from localStorage or initialize empty arrays
  useEffect(() => {
    const savedWallets = JSON.parse(localStorage.getItem("sol_wallets")) || [];
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
    localStorage.setItem("sol_wallets", JSON.stringify(wallets));
  }, [wallets]);

  const generateWallet = () => {
    const seed = mnemonicToSeedSync(generateMnemonic());
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;
    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey);

    const secretKeyHex = Array.from(secretKey)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    setWallets([
      ...wallets,
      { publicKey: keypair.publicKey.toBase58(), secretKey: secretKeyHex },
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
              <strong>Address:</strong> {wallet.publicKey}
            </div>
            <div className="wallet-number mb-2">
              <strong>Wallet Number:</strong> {index + 1}
            </div>
            <div className="private-key">
              <strong>Private Key:</strong>{" "}
              <button
                onClick={() => showPrivateKeyModal(index)}
                className="hover:text-gray-400 p-2 rounded-md"
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
              {passwordInput === password && selectedWalletIndex !== null && (
                <div>
                  <p>
                    <strong>Private Key:</strong>
                  </p>
                  <input
                    type="text"
                    value={wallets[selectedWalletIndex].secretKey}
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

export default Solanawallet;
