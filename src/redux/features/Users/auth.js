import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dispatch } from "../../store";

const url = "http://localhost:5266/api";
const initialState = {
  token: null,
  user: null,
  expiryDate: null,
  isLoading: false,
  error: null,
  authenticated: false,
};

export const UserLogin = createAsyncThunk(
  "user/UserLogin",
  async (formBody) => {
    const res = await fetch(`${url}/login`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(formBody),
    });
    const result = await res.json();
    if (res.status === 404) {
      throw Error(result[404].errors[0].errorMessage);
    }
    dispatch(setAuthenticated(true));
    return result;
  },
);

export const verifyToken = createAsyncThunk(
  "user/verifyToken",
  async (token) => {
    try {
      const res = await fetch(`${url}/verifyToken?token=${token}`);
      const result = await res.json();
      dispatch(setAuthenticated(result));
      return result;
    } catch (err) {}
  },
);

export const UserRegister = createAsyncThunk(
  "user/UserRegister",
  async (formBody) => {
    const res = await fetch(`${url}/register`, {
      method: "POST",
      headers: new Headers({ "content-type": "application/json" }),
      body: JSON.stringify(formBody),
    });
    const result = await res.json();
    if (res.status === 404) {
      throw Error(result[404].errors[0].errorMessage);
    }
    dispatch(setAuthenticated(true));
    return result;
  },
);

const AuthSlice = createSlice({
  name: "userLogin",
  initialState,
  reducers: {
    reset: () => initialState,
    setAuthenticated: (state, action) => {
      state.authenticated = action.payload;
    },
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setState: (state, action) => {
        state.token = action.payload.token
        state.user = action.payload.user
        state.expiryDate = action.payload.expiryDate
    }
  },
  extraReducers: (builder) => {
    builder.addCase(UserLogin.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UserLogin.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.token = action.payload.token[0];
      state.expiryDate = action.payload.token[1]
      state.user = action.payload.user;
    });
    builder.addCase(UserLogin.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //register
    builder.addCase(UserRegister.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(UserRegister.fulfilled, (state, action) => {
      state.error = null;
      state.isLoading = false;
      state.token = action.payload.token;
      state.user = action.payload.user;
    });
    builder.addCase(UserRegister.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });

    //verifyToken
    builder.addCase(verifyToken.pending, (state) => {
        state.isLoading = true;
      });
      builder.addCase(verifyToken.fulfilled, (state, action) => {
        state.isLoading = false;
      });
  },
});

export const { reset, setLoading, setAuthenticated, setState} = AuthSlice.actions;

export default AuthSlice.reducer;
