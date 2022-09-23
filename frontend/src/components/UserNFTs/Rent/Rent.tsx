import { useState } from "react";
import { Modal } from "../../Common/Modal/Modal";
import { ConfirmStep } from "./ConfirmStep/ConfirmStep";
import { StepType, RentContext } from "./context/rent.context";
import { SetupStep } from "./SetupStep/SetupStep";
import { SuccessStep } from "./SuccessStep/SuccessStep";

export const Rent = ({ nft }) => {
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState<StepType>("setup");

  const openConnectWalletModal = () => {
    setOpenModal(true);
    setStep("setup");
  };

  return (
    <>
      <button
        className="button buttonCta buttonFullWidth"
        onClick={openConnectWalletModal}
      >
        Rent Now
      </button>

      <Modal visible={openModal} onClose={() => setOpenModal(false)}>
        <RentContext.Provider value={{ step, setStep, nft }}>
          {step == "setup" && <SetupStep />}
          {step == "confirm" && <ConfirmStep />}
          {step == "success" && <SuccessStep />}
        </RentContext.Provider>
      </Modal>
    </>
  );
};
