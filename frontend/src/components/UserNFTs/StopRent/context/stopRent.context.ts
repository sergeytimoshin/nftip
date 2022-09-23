import { createContext, Dispatch, SetStateAction } from "react";

export type StepType = "confirm" | "success";

interface StopRentContext {
  step: StepType;
  setStep: Dispatch<SetStateAction<string>>;
  nft: any;
}

export const StopRentContext = createContext({} as StopRentContext);
