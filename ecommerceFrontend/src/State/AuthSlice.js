import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../config/Api";


export const sendLoginSignupOtp=createAsyncThunk("/auth/sendLoginSignupOtp",
    async({email},{rejectWithValue})=>{
        try {
            const response=await api.post("/auth/sent/login-signup-otp",{email})
            console.log("login otp ",response)
        } catch (error) {
            console.log("error - - -",error);
        }
    }
); 

export const signin = createAsyncThunk(
  "/auth/signing",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signing", { email, otp });
      console.log("login response ", response.data);
      localStorage.setItem("jwt",response.data.jwt);
      return response.data; // important
    } catch (error) {
      console.log("error - - -", error);
      return rejectWithValue(error.response?.data || { message: "Network Error" });
    }
  }
);

export const signup = createAsyncThunk(
  "/auth/signup",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/auth/signup", { email, otp });
      console.log("signup  response ", response.data);
      localStorage.setItem("jwt",response.data.jwt);
      return response.data; // important
    } catch (error) {
      console.log("error - - -", error);
      return rejectWithValue(error.response?.data || { message: "Network Error" });
    }
  }
);

export const fetchUserProfile = createAsyncThunk(
  "/auth/fetchUserProfile",
  async ({jwt} , { rejectWithValue }) => {
    try {
      const response = await api.get("/api/users/profile", { 
          headers:{
            Authorization:`Bearer ${jwt}`
          }
       });
      console.log("user profile ", response.data);
      return response.data; // important
    } catch (error) {
      console.log("error - - -", error);
      return rejectWithValue(error.response?.data || { message: "Network Error" });
    }
  }
);

export const logout = createAsyncThunk("/auth/logout",
  async (navigate,{rejectWithValue})=>{
    try {
      localStorage.clear();
      console.log("logout success")
      navigate("/")
    } catch (error) {
      console.error("error - - - "+error)
    }
  }
)
const initialState={
  jwt:null,
  otpSent:false,
  isLoggedIn:false,
  user:null,
  loading:false
}
const authSlice=createSlice({
  name:"auth",
  initialState,
  reducers:{},
  extraReducers:(builder)=>{
    builder.addCase(sendLoginSignupOtp.pending,(state)=>{
      state.loading=true
    });
    builder.addCase(sendLoginSignupOtp.fulfilled,(state)=>{
      state.loading=false;
      state.otpSent=true;
    });
    builder.addCase(sendLoginSignupOtp.rejected,(state)=>{
      state.loading=false;
    });
    builder.addCase(signin.fulfilled,(state,action)=>{
      state.jwt=action.payload
      state.isLoggedIn=true
    });
    builder.addCase(signup.fulfilled,(state,action)=>{
      state.jwt=action.payload
      state.isLoggedIn=true
    });
    builder.addCase(fetchUserProfile.fulfilled,(state,action)=>{
      state.user=action.payload
      state.isLoggedIn=true
    });
    builder.addCase(logout.fulfilled,(state)=>{
      state.jwt=null;
      state.isLoggedIn=false;
      state.user=null;
    })

  }

})
export default authSlice.reducer;