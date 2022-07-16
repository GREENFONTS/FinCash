import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dispatch } from "../../store";

const url = "https://localhost:7266/api/user";
const initialState = {
  accounts: null,
  isLoading: false,
  error: null,
  currentAccountId : null,
  Transactions : null
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

export const AddAccount = createAsyncThunk(
  "user/AddAccounts",
  async (Data) => {

    try {
      const res = await fetch(`${url}/Branch/create`, {
        method: "POST",
        headers: new Headers({ "content-type": "application/json", Authorization: `Bearer ${Data.token}` }),

        body: JSON.stringify(Data.formBody),
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

export const GetAccountId = createAsyncThunk(
  "user/GetAccountId",
  async (Data) => {
console.log(Data)
    try {
      const res = await fetch(`${url}/Branch/${Data.BranchId}/${Data.code}`, {
        headers: {
          Authorization: `Bearer ${Data.token}`,
          Accept: "application/json",
        },
      });
      const result = await res.json();
      console.log(result)
      if (res.status === 404) {
        throw Error(result[404].errors[0].errorMessage);
      }
      return result;
    } catch (err) {
      console.log(err);
    }
  },
);

export const GetAccountTransactions = createAsyncThunk(
  "user/GetAccountTransactions",
  async (Data) => {
    try {
      const res = await fetch(`${url}/Branch/Transactions/${Data.branchId}`, {
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
  reducers: {
    accountSetState : (state, action) => {
      state.Transactions = action.payload.transactions
    }
  },
  extraReducers: (builder) => {
    builder.addCase(GetAccounts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAccounts.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.accounts = action.payload
    });
    builder.addCase(GetAccounts.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //Add Account
    builder.addCase(AddAccount.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddAccount.fulfilled, (state) => {
      state.error = null;
      state.isLoading = false;
    });
    builder.addCase(AddAccount.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //GetAccountId
    builder.addCase(GetAccountId.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAccountId.fulfilled, (state, action) => {
      state.currentAccountId = action.payload
      state.isLoading = false;
    });
    builder.addCase(GetAccountId.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //Get Account Transactions
     builder.addCase(GetAccountTransactions.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(GetAccountTransactions.fulfilled, (state, action) => {
      state.Transactions = JSON.parse(action.payload)
      state.isLoading = false;
    });
    builder.addCase(GetAccountTransactions.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const {accountSetState} = AccountSlice.actions;

export default AccountSlice.reducer;
