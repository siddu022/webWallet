import { useState } from "react";
import { generateMnemonic, mnemonicToSeedSync } from "bip39";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";

export function Solanawallet() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [wallets, setWallets] = useState([]);

  // Retrieve mnemonic from localStorage or generate a new one
  const mnemonic = localStorage.getItem("mnemonic") || generateMnemonic();

  // Store the mnemonic in localStorage if it was newly generated
  if (!localStorage.getItem("mnemonic")) {
    localStorage.setItem("mnemonic", mnemonic);
  }

  const addWallet = () => {
    // Convert the mnemonic to a seed
    const seed = mnemonicToSeedSync(mnemonic);

    // Derive a keypair using the seed and the current path
    const path = `m/44'/501'/${currentIndex}'/0'`;
    const derivedSeed = derivePath(path, seed.toString("hex")).key;

    // Generate the keypair from the derived seed
    const secretKey = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;
    const keypair = Keypair.fromSecretKey(secretKey);

    // Convert the secretKey to a hex string
    const secretKeyHex = Array.from(secretKey)
      .map((byte) => byte.toString(16).padStart(2, "0"))
      .join("");

    // Update the state with the new wallet and increment the index
    setWallets([
      ...wallets,
      { publicKey: keypair.publicKey, secretKey: secretKeyHex },
    ]);
    setCurrentIndex(currentIndex + 1);
  };

  return (
    <div className={`text-fuchsia-50 text-[16px] font-poppins`}>
      <button onClick={addWallet} className="mb-4 p-2 bg-blue-600 rounded-md">
        Add wallet
      </button>

      <div className="wallet-container">
        {wallets.map((wallet, index) => (
          <div
            key={index}
            className="wallet-item mb-4 p-4 bg-gray-800 rounded-md"
          >
            <div className="public-key mb-2">
              <strong>Public Key:</strong> {wallet.publicKey.toBase58()}
            </div>
            <div className="private-key">
              <strong>Private Key:</strong>{" "}
              <input
                type="text"
                value={wallet.secretKey}
                readOnly
                className="w-full p-2 bg-gray-700 text-gray-200 rounded-md"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Solanawallet;
