import { useState } from "react";
import { Modal } from "../../Common/Modal/Modal";
import { ConfirmStep } from "./ConfirmStep/ConfirmStep";
import { StepType, StopRentContext } from "./context/stopRent.context";
import { SuccessStep } from "./SuccessStep/SuccessStep";

export const StopRent = ({ nft }) => {
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState<StepType>("confirm");

  const openConnectWalletModal = () => {
    setOpenModal(true);
    setStep("confirm");
  };

  return (
    <>
      <button
        className="button buttonCancel buttonFullWidth"
        onClick={openConnectWalletModal}
      >
        Stop Rent
      </button>

      <Modal visible={openModal} onClose={() => setOpenModal(false)}>
        <StopRentContext.Provider value={{ step, setStep, nft }}>
          {step == "confirm" && <ConfirmStep />}
          {step == "success" && <SuccessStep />}
        </StopRentContext.Provider>
      </Modal>
    </>
  );
};
