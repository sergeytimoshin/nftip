import { useState } from "react";
import { Modal } from "../../Common/Modal/Modal";
import { ConfirmStep } from "./ConfirmStep/ConfirmStep";
import {
  StepType,
  SubmitForRentContext,
} from "./context/submitForRent.context";
import { SetupStep } from "./SetupStep/SetupStep";
import { SuccessStep } from "./SuccessStep/SuccessStep";

export const SubmitForRent = ({ nft }) => {
  const [openModal, setOpenModal] = useState(false);
  const [moneyValue, setMoneyValue] = useState("");

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
        Submit For Rent
      </button>

      <Modal visible={openModal} onClose={() => setOpenModal(false)}>
        <SubmitForRentContext.Provider
          value={{ step, setStep, moneyValue, setMoneyValue, nft }}
        >
          {step == "setup" && <SetupStep />}
          {step == "confirm" && <ConfirmStep />}
          {step == "success" && <SuccessStep />}
        </SubmitForRentContext.Provider>
      </Modal>
    </>
  );
};
