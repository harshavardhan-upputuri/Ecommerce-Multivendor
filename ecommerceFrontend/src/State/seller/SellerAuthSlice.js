import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api"


export const sellerLogin = createAsyncThunk(
  "/sellers/login",
  async ({ email, otp }, { rejectWithValue }) => {
    try {
      const response = await api.post("/sellers/login", { email, otp });
      console.log("login response ", response.data);
      const jwt=response.data.jwt;
      localStorage.setItem("jwt",jwt);

    } catch (error) {
      console.log("error - - -", error);
       
    }
  }
);