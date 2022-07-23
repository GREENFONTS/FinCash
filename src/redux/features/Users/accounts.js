import { createSlice } from "@reduxjs/toolkit";
import AccountService from "../../../Utils/axios/apis/accounts";
import { ExtractTransactions } from "../../../Utils/Transactions";
import { dispatch } from "../../store";
import { createError } from "./auth";

const initialState = {
  accounts: null,
  isAcctLoading: false,
  error: null,
  currentAccountId: null,
  currentAccountInfo: null,
  currentAccountIdentity: null,
  currentAccount: null,
  Transactions: null,
  AllTransactions: null,
  RecentTransactions: null,
  filteredTransactions: [],
  time: null,
  creditAmount: null,
  debitAmount: null,
  creditTrans: [],
  debitTrans: [],
};

export const GetAccounts = (data) => async () => {
  try {
    const res = await AccountService.GetAccounts(data);
    dispatch(setAccounts(res.data));
  } catch (err) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const AddAccount = (data) => async () => {
  try {
    await AccountService.AddAccount(data);
    dispatch(GetAccounts(data.UserId));
    dispatch(setAcctLoading(false));
  } catch (err) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const GetAccountId = (data) => async () => {
  try {
    const res = await AccountService.GetAccountId(data);
    dispatch(setAccountId(res.data));
    dispatch(setAcctLoading(false));
    dispatch(GetAccounts(data.id));
  } catch (err) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const GetAccountInfo = (data) => async () => {
  try {
    const res = await AccountService.GetAccountInfo(data);
    dispatch(setAccountInfo(res.data));
  } catch (err) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const GetAccountIdentity = (data) => async () => {
  try {
    const res = await AccountService.GetAccountIdentity(data);
    dispatch(setAccountIdentity(res.data));
  } catch (err) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const GetAccountTransactions = (data) => async () => {
  try {
    const res = await AccountService.GetAccountTransactions(data);
    dispatch(setTransactions(JSON.parse(res.data.transactions)));
  } catch (err) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const GetAllTransactions = (data) => async () => {
  try {
    const res = await AccountService.GetAllTransactions(data);
    dispatch(setAllTransactions(JSON.parse(res.data.transactions)));
    dispatch(
      setRecentTransactions(
        ExtractTransactions(JSON.parse(res.data.transactions)),
      ),
    );
  } catch (err) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const UnlinkAccount = (data) => async () => {
  try {
    await AccountService.GetAllTransactions(data);
    dispatch(setAcctLoading(false));
  } catch (err) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const UpdateAccount = (data) => async () => {
  try {
    await AccountService.UpdateAccount(data);
    dispatch(setAcctLoading(false));
  } catch (err) {
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

const AccountSlice = createSlice({
  name: "Accounts",
  initialState,
  reducers: {
    setAccounts: (state, action) => {
      state.accounts = action.payload;
    },
    setAcctLoading: (state, action) => {
      state.isAcctLoading = action.payload;
    },
    setAccountId: (state, action) => {
      state.currentAccountId = action.payload;
    },
    setAccountInfo: (state, action) => {
      state.currentAccountInfo = action.payload;
    },
    setAccountIdentity: (state, action) => {
      state.currentAccountIdentity = action.payload;
    },
    setTransactions: (state, action) => {
      state.Transactions = action.payload;
    },
    accountSetState: (state, action) => {
      state.Transactions = action.payload.transactions;
      state.AllTransactions = action.payload.allTransactions;
      state.RecentTransactions = action.payload.recentTransactions;
    },
    setAllTransactions: (state, action) => {
      state.AllTransactions = action.payload;
    },
    setRecentTransactions: (state, action) => {
      state.RecentTransactions = action.payload;
    },
    setfilteredTransactions: (state, action) => {
      state.filteredTransactions = action.payload;
    },
    setTime: (state, action) => {
      state.time = action.payload;
    },
    setfilteredTransAmount: (state, action) => {
      state.creditAmount = action.payload.totalCredit;
      state.debitAmount = action.payload.totalDebit;
    },
    setTypeTransactions: (state, action) => {
      state.debitTrans = action.payload.debitTrans;
      state.creditTrans = action.payload.creditTrans;
    },
    setCurrentAccount: (state, action) => {
      state.currentAccount = action.payload;
    },
  },
});

export const {
  setAccounts,
  setAcctLoading,
  setAccountId,
  setAccountInfo,
  setAccountIdentity,
  setTransactions,
  setAllTransactions,
  accountSetState,
  setRecentTransactions,
  setfilteredTransactions,
  setTime,
  setfilteredTransAmount,
  setTypeTransactions,
  setCurrentAccount,
} = AccountSlice.actions;

export default AccountSlice.reducer;
