import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../store";

export const user = (state: RootState) => state.user;

export const userAccountNumber = createSelector(
  user,
  (user) => user.accountNumber
);
