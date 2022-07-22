import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { dispatch } from "../../store";
import UserService from "../../../Utils/axios/apis";

const url = "http://localhost:5266/api"

const initialState = {
  token: null,
  user: null,
  expiryDate: null,
  isLoading: false,
  error: null,
  authenticated: false,
  monoKey: null,
};



// export const verifyToken = createAsyncThunk(
//   "user/verifyToken",
//   async (token) => {
//     try {
//       const res = await fetch(`${url}/verifyToken?token=${token}`);
//       const result = await res.json()
//       dispatch(setAuthenticated(result));
//       return result;
//     } catch (err) {
//       console.log(err)
//     }
//   },
// );

export const UserLogin = async (data) => {
  try{
    const res = await UserService.Login(data)
     dispatch(AddUserData(res.data))
  }
  catch(err){
    console.log(err)
   dispatch(createError(err?.response?.data["404"].errors[0]))
  }
}

export const UserRegister = async (data) => {
    try{
      const res = await UserService.CreateUser(data)
      console.log(res.data)
       dispatch(AddUserData(res.data))
    }
    catch(err){
      console.log(err)
     dispatch(createError(err?.response?.data["404"].errors[0]))
    }
}

export const verifyToken = async (token) => {
  
  try{
    const res = await UserService.VerifyToken(token)
    console.log(res.data)
    if(res.data != null){
      
      dispatch(setAuthenticated(true));
    }
    else{
      dispatch(setAuthenticated(false))
    }
   
  }
  catch(err){
    console.log(err)
   dispatch(createError(err?.response?.data["404"].errors[0]))
  }
}

export const AddServiceKeys = createAsyncThunk(
  "user/AddServiceKeys",
  async (Data) => {
    console.log(Data.formBody);
    const res = await fetch(`${url}/AddServiceKeys`, {
      method: "POST",
      headers: new Headers({
        "content-type": "application/json",
        Authorization: `Bearer ${Data.token}`,
        Accept: "application/json",
      }),
      body: JSON.stringify(Data.formBody),
    });
    const result = await res.json();
    if (res.status === 404) {
      throw Error(result[404].errors[0].errorMessage);
    }
    return result;
  },
);

const AuthSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    AddUserData : (state, action) => {
      console.log(action.payload)
      state.isLoading = false;
      state.token = action.payload.token[0];
      state.expiryDate = action.payload.token[1];
      state.user = action.payload.user;
      state.authenticated = true
    },
    createError : (state, action) => {
      console.log(action.payload)
      state.isLoading = false;
      state.error = action.payload.errorMessage
    },
    reset: () => initialState,
    setAuthenticated: (state, action) => {
      console.log(action.payload)
      state.authenticated = action.payload;
      // state.user = action.payload.user
       state.isLoading = false
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
  },
  extraReducers: (builder) => {
   
    // //verifyToken
    // builder.addCase(verifyToken.pending, (state) => {
    //   state.isLoading = true;
    // });
    // builder.addCase(verifyToken.fulfilled, (state, action) => {
    //   state.isLoading = false;
    // });

    //add service Keys
    builder.addCase(AddServiceKeys.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(AddServiceKeys.fulfilled, (state, action) => {
      state.isLoading = false;
      state.monoKey = action.payload;
    });
    builder.addCase(AddServiceKeys.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message;
    });
  },
});

export const { reset, setLoading, setAuthenticated, setState, createError, AddUserData } =
  AuthSlice.actions;

export default AuthSlice.reducer;


