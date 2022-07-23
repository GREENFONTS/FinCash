import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dispatch } from "../../store";
import UserService from "../../../Utils/axios/apis/user";

const initialState = {
  token: null,
  user: null,
  expiryDate: null,
  isLoading: false,
  error: null,
  authenticated: false,
  monoKey: null,
};

export const UserLogin = (data) => async () => {
  try {
    const res = await UserService.Login(data);
    dispatch(AddUserData(res.data));
  } catch (err) {
    console.log(err);
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const UserRegister = (data) => async () => {
  try {
    const res = await UserService.CreateUser(data);
    dispatch(AddUserData(res.data));
  } catch (err) {
    console.log(err);
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const UpdateUser = (data) => async () => {
  try {
    const res = await UserService.UpdateUser(data);
    console.log(res.data)
    //dispatch(AddUserData(res.data));
  } catch (err) {
    console.log(err);
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};



export const verifyToken = (token) => async () => {
  dispatch(setLoading(true));
  try {
    const res = await UserService.VerifyToken(token);
    if (res.data.user != null) {
      dispatch(
        setAuthenticated({
          state: true,
          data: res.data.user,
          mono: res.data.monoKey,
        }),
      );
    } else {
      dispatch(setLoading(false));
    }
  } catch (err) {
    console.log(err);
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

export const AddServiceKeys = (data) => async () => {
  try {
    const res = await UserService.AddServiceKeys(data);
    dispatch(setMonoKey(res.data));
  } catch (err) {
    console.log(err);
    dispatch(createError(err?.response?.data["404"].errors[0]));
  }
};

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUserData: (state, action) => {
      state.isLoading = false;
      state.token = action.payload.token[0];
      state.expiryDate = action.payload.token[1];
      state.user = action.payload.user;
      state.authenticated = true;
    },
    setUser:(state, action) => {
      state.user = action.payload
    },
    createError: (state, action) => {
      state.isLoading = false;
      state.error = action.payload.errorMessage;
    },
    reset: () => initialState,
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload.state;
      state.user = action.payload.data;
      state.monoKey = action.payload.mono;
      state.isLoading = false;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setState: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.expiryDate = action.payload.expiryDate;
      state.monoKey = action.payload.monoKey;
    },
    setMonoKey: (state, action) => {
      state.monoKey = action.payload.monoPrivateKey;
    },
  },
});

export const {
  reset,
  setLoading,
  setAuthenticated,
  setState,
  createError,
  AddUserData,
  setMonoKey,
  setUser
} = AuthSlice.actions;

export default AuthSlice.reducer;
