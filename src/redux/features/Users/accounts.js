import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dispatch } from "../../store";

const url = "https://localhost:7266/api/user";
const initialState = {
  branch: null,
  isLoading: false,
  error: null,
};

export const GetAccounts = createAsyncThunk(
  "user/GetAccounts",
  async (Data) => {
    try {
      const res = await fetch(`${url}/Branch?userId=${Data.id}`, {
        headers: {
          Authorization: `Bearer ${Data.token}`,
          Accept: "application/json",
        },
      });
      const result = await res.json();
      if (res.status === 404) {
        throw Error(result[404].errors[0].errorMessage);
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  },
);

const AccountSlice = createSlice({
  name: "Accounts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAccounts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAccounts.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      console.log(action.payload);
    });
    builder.addCase(GetAccounts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {} = AccountSlice.actions;

export default AccountSlice.reducer;
