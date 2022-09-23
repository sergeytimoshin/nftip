import { createContext, Dispatch, SetStateAction } from "react";

export type StepType = "setup" | "confirm" | "success";

interface SubmitforRentContext {
  step: StepType;
  setStep: Dispatch<SetStateAction<string>>;
  moneyValue: string;
  setMoneyValue: Dispatch<SetStateAction<string>>;
  nft: any;
}

export const SubmitForRentContext = createContext({} as SubmitforRentContext);
