import styles from "../style.js";
import Dropdown from "./Dropdown";

const Account = () => {
  return (
    <div
      className={` ${styles.paddingX} font-poppins flex flex-col items-center justify-center `}
    >
      <div className="text-center mb-8">
        <h1 className="text-fuchsia-50 text-[36px]">Wallets</h1>
      </div>

      {/* Fixed container for the dropdown and wallet details */}
      <div className="w-[582px]">
        <Dropdown />
      </div>
    </div>
  );
};

export default Account;
