import { setPriority } from "os";
import { useState } from "react";
import { Modal } from "../../Common/Modal/Modal";
import {
  StepType,
  SubmitForRentContext,
} from "./context/submitForRent.context";
import { SetupStep } from "./SetupStep/SetupStep";

export const SubmitForRent = ({ nft }) => {
  const [openModal, setOpenModal] = useState(false);
  const [step, setStep] = useState<StepType>("setup");

  const openConnectWalletModal = () => {
    setOpenModal(true);
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
        <SubmitForRentContext.Provider value={{ step, setStep, nft }}>
          <SetupStep nft={nft} />
        </SubmitForRentContext.Provider>
      </Modal>
    </>
  );
};
