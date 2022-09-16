import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type InitialState = {
  accountNumber: string;
};

const initialState: InitialState = {
  accountNumber: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserAccountNumber: (state, action: PayloadAction<string>) => {
      state.accountNumber = action.payload;
    },
  },
});

export const { setUserAccountNumber } = userSlice.actions;

export default userSlice.reducer;
