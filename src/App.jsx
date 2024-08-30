import { useState } from "react";
import {
  Welcome,
  Selectnetwork,
  Recovery,
  Secretrecov,
  Password,
  Account,
} from "./Components";
import styles from "./style.js";
import { NetworkProvider } from "./NetworkContext.jsx";

function App() {
  const [currentStep, setCurrentStep] = useState(1);

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <Welcome nextStep={nextStep} />;
      case 2:
        return <Selectnetwork nextStep={nextStep} prevStep={prevStep} />;
      case 3:
        return <Recovery nextStep={nextStep} prevStep={prevStep} />;
      case 4:
        return <Secretrecov nextStep={nextStep} prevStep={prevStep} />;
      case 5:
        return <Password nextStep={nextStep} prevStep={prevStep} />;
      case 6:
        return <Account />;
      default:
        return <Welcome nextStep={nextStep} />;
    }
  };

  const nextStep = () => {
    setCurrentStep(currentStep + 1);
  };
  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  return (
    <NetworkProvider>
      <div className="bg-primary w-full h-screen overflow-auto">
        <div
          className={`flex flex-col justify-start items-center
          min-h-screen ${styles.paddingX} pt-[10vh]`}
        >
          {renderStep()}
        </div>
      </div>
    </NetworkProvider>
  );
}

export default App;
