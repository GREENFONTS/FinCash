import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import AccountService from "../../../Utils/axios/apis/accounts";
import { ExtractTransactions, FormatTransactions } from "../../../Utils/Transactions";
import { dispatch } from "../../store";
import { createError } from "./auth";

const url = "https://localhost:7266/api/user";
const initialState = {
  accounts: null,
  isAcctLoading: false,
  error: null,
  currentAccountId: null,
  currentAccountInfo: null,
  currentAccountIdentity: null,
  currentAccount : null,
  Transactions: null,
  AllTransactions: null,
  RecentTransactions: null,
  filteredTransactions: [],
  time: null,
  creditAmount: null,
  debitAmount: null,
  creditTrans: [],
  debitTrans: []
  
};


export const GetAccounts = (data) => async () => {
  try{
    const res = await AccountService.GetAccounts(data)
    dispatch(setAccounts(res.data))
  }
  catch(err){
   dispatch(createError(err?.response?.data["404"].errors[0]))
  }
}

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


export const GetAccountInfo = createAsyncThunk(
  "user/GetAccountInfo",
  async (Data) => {
    console.log(Data);
    try {
      const res = await fetch(
        `${url}/branch/AccountInfo/${Data.branchId}`,
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
      return result;
    } catch (err) {
      console.log(err);
    }
  },
);


export const GetAccountIdentity = createAsyncThunk(
  "user/GetAccountIdentity",
  async (Data) => {
    try {
      const res = await fetch(
        `${url}/branch/AccountIdentity/${Data.userId}`,
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
      return result;
    } catch (err) {
      console.log(err);
    }
  },
);


export const GetAccountTransactions = createAsyncThunk(
  "user/GetAccountTransactions",
  async (Data) => {
    console.log("enetered")
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
    setAccounts : (state, action) => {
      state.accounts = action.payload
    }, 
    accountSetState: (state, action) => {
      state.Transactions = action.payload.transactions;
      state.AllTransactions = action.payload.allTransactions
      state.RecentTransactions = action.payload.recentTransactions
    },
    setRecentTransactions : (state, action) => {
      state.RecentTransactions = action.payload
    },
    setfilteredTransactions : (state, action) => {
      state.filteredTransactions = action.payload
    },
    setTime : (state, action) => {
      state.time = action.payload
    },
    setfilteredTransAmount : (state, action) => {
      state.creditAmount = action.payload.totalCredit
      state.debitAmount = action.payload.totalDebit
    },
    setTypeTransactions :  (state, action) => {
      state.debitTrans = action.payload.debitTrans
      state.creditTrans = action.payload.creditTrans
    },
    setCurrentAccount : (state, action) => {
      state.currentAccount = action.payload
    },
    
  },
  extraReducers: (builder) => {
   
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


     //GetAccountInfo
     builder.addCase(GetAccountInfo.pending, (state) => {
      state.isAcctLoading = true;
    });
    builder.addCase(GetAccountInfo.fulfilled, (state, action) => {
      state.currentAccountInfo = JSON.parse(action.payload);
      state.isAcctLoading = false;
    });
    builder.addCase(GetAccountInfo.rejected, (state, action) => {
      state.isAcctLoading = false;
      state.error = action.error.message;
    });


    //GetAccountIdentity
    builder.addCase(GetAccountIdentity.pending, (state) => {
      state.isAcctLoading = true;
    });
    builder.addCase(GetAccountIdentity.fulfilled, (state, action) => {
      state.currentAccountIdentity = JSON.parse(action.payload);
      state.isAcctLoading = false;
    });
    builder.addCase(GetAccountIdentity.rejected, (state, action) => {
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

export const { setAccounts, accountSetState, setRecentTransactions, setfilteredTransactions, setTime, 
  setfilteredTransAmount, setTypeTransactions, setCurrentAccount} = AccountSlice.actions;

export default AccountSlice.reducer;
