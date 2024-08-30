import { useState, useEffect } from "react";
import Dropdown from "./Dropdown";

const Account = () => {
  const [wallets, setWallets] = useState([]);

  useEffect(() => {
    const savedWallets = JSON.parse(localStorage.getItem("all_wallets")) || [];
    setWallets(savedWallets);
  }, []);

  useEffect(() => {
    localStorage.setItem("all_wallets", JSON.stringify(wallets));
  }, [wallets]);

  return (
    <div>
      <div className="w-[582px]">
        <Dropdown wallets={wallets} />
      </div>
    </div>
  );
};

export default Account;
