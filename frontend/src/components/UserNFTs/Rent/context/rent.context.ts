import { createContext, Dispatch, SetStateAction } from "react";

export type StepType = "setup" | "confirm" | "success";

interface RentContext {
  step: StepType;
  setStep: Dispatch<SetStateAction<string>>;
  nft: any;
}

export const RentContext = createContext({} as RentContext);
