import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { ExtractTransactions, FormatTransactions } from "../../../Utils/Transactions";
import { dispatch } from "../../store";

const url = "https://localhost:7266/api/user";
const initialState = {
  accounts: null,
  isAcctLoading: false,
  error: null,
  currentAccountId: null,
  Transactions: null,
  AllTransactions: null,
  RecentTransactions: null,
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

export const AddAccount = createAsyncThunk("user/AddAccounts", async (Data) => {
  try {
    const res = await fetch(`${url}/Branch/create`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        Authorization: `Bearer ${Data.token}`,
      }),

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
});

export const UpdateAccount = createAsyncThunk("user/UpdateAccounts", async (Data) => {
  console.log(Data, "heyy")
  try {
    const res = await fetch(`${url}/Branch/${Data.formBody.BranchId}`, {
      method: "PUT",
      headers: new Headers({
        "content-type": "application/json",
        Authorization: `Bearer ${Data.token}`,
      }),

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
});

export const UnlinkAccount = createAsyncThunk("user/UnlinkAccount", async (Data) => {
  try {
    const res = await fetch(`${url}/Branch/UnlinkAccount/${Data.BranchId}`, {
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
});

export const GetAccountId = createAsyncThunk(
  "user/GetAccountId",
  async (Data) => {
    console.log(Data);
    try {
      const res = await fetch(
        `${url}/branch/AccountId/${Data.BranchId}?code=${Data.code}`,
        {
          headers: {
            Authorization: `Bearer ${Data.token}`,
            Accept: "application/json",
          },
        },
      );
      const result = await res.json();
      console.log(result);
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
      const res = await fetch(`${url}/branch/Transactions/${Data.branchId}`, {
        headers: {
          Authorization: `Bearer ${Data.token}`,
          Accept: "application/json",
        },
      });

      const result = await res.json();
      const transactions = JSON.parse(result.transactions);
     
      if (res.status === 404) {
        throw Error(result[404].errors[0].errorMessage);
      }
      return transactions;
    } catch (err) {
      console.log(err);
    }
  },
);

export const GetAllTransactions = createAsyncThunk(
  "user/GetAllTransactions",
  async (Data) => {
    try {
      const res = await fetch(
        `${url}/branch/AllTransactions/${Data.userId}`,
        {
          headers: {
            Authorization: `Bearer ${Data.token}`,
            Accept: "application/json",
          },
        },
      );

      const result = await res.json();
      if (res.status === 404) {
        throw Error(result[404].errors[0].errorMessage);
      }
      let formattedData = FormatTransactions(result.transactions)
      dispatch(setRecentTransactions(ExtractTransactions(result.transactions)))
      return formattedData
    } catch (err) {
      console.log(err);
    }
  },
);

const AccountSlice = createSlice({
  name: "Accounts",
  initialState,
  reducers: {
    accountSetState: (state, action) => {
      state.Transactions = action.payload.transactions;
    },
    setRecentTransactions : (state, action) => {
      state.RecentTransactions = action.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(GetAccounts.pending, (state) => {
      state.isAcctLoading = true;
    });
    builder.addCase(GetAccounts.fulfilled, (state, action) => {
      state.error = null;
      state.isAcctLoading = false;
      state.accounts = action.payload;
    });
    builder.addCase(GetAccounts.rejected, (state, action) => {
      state.isAcctLoading = false;
      state.error = action.error.message;
    });

    //Add Account
    builder.addCase(UpdateAccount.pending, (state) => {
      state.isAcctLoading = true;
    });
    builder.addCase(UpdateAccount.fulfilled, (state) => {
      state.error = null;
      state.isAcctLoading = false;
    });
    builder.addCase(UpdateAccount.rejected, (state, action) => {
      state.isAcctLoading = false;
      state.error = action.error.message;
    });

    //UpdateAccount
    builder.addCase(AddAccount.pending, (state) => {
      state.isAcctLoading = true;
    });
    builder.addCase(AddAccount.fulfilled, (state) => {
      state.error = null;
      state.isAcctLoading = false;
    });
    builder.addCase(AddAccount.rejected, (state, action) => {
      state.isAcctLoading = false;
      state.error = action.error.message;
    });


    //UnlinkAccount
    builder.addCase(UnlinkAccount.pending, (state) => {
      state.isAcctLoading = true;
    });
    builder.addCase(UnlinkAccount.fulfilled, (state) => {
      state.error = null;
      state.isAcctLoading = false;
    });
    builder.addCase(UnlinkAccount.rejected, (state, action) => {
      state.isAcctLoading = false;
      state.error = action.error.message;
    });

    //GetAccountId
    builder.addCase(GetAccountId.pending, (state) => {
      state.isAcctLoading = true;
    });
    builder.addCase(GetAccountId.fulfilled, (state, action) => {
      state.currentAccountId = action.payload;
      state.isAcctLoading = false;
    });
    builder.addCase(GetAccountId.rejected, (state, action) => {
      state.isAcctLoading = false;
      state.error = action.error.message;
    });

    //Get Account Transactions
    builder.addCase(GetAccountTransactions.pending, (state) => {
      state.isAcctLoading = true;
    });
    builder.addCase(GetAccountTransactions.fulfilled, (state, action) => {
      state.Transactions = action.payload;
      state.isAcctLoading = false;
    });
    builder.addCase(GetAccountTransactions.rejected, (state, action) => {
      state.isAcctLoading = false;
      state.error = action.error.message;
    });

    //Get All Transactions
    builder.addCase(GetAllTransactions.pending, (state) => {
      state.isAcctLoading = true;
    });
    builder.addCase(GetAllTransactions.fulfilled, (state, action) => {
      state.AllTransactions = action.payload;
      state.isAcctLoading = false;
    });
    builder.addCase(GetAllTransactions.rejected, (state, action) => {
      state.isAcctLoading = false;
      state.error = action.error.message;
    });
  },
});
//code_qC20fL77sGrbwtA6HI2z
export const { accountSetState, setRecentTransactions } = AccountSlice.actions;

export default AccountSlice.reducer;
