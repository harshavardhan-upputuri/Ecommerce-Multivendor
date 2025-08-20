import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

export const fetchSellerProfile=createAsyncThunk("/sellers/fetchSellerProfile",
    async(jwt,{rejectWithValue})=>{
        console.log(`Bearer ${jwt}`);
        try {
            const response=await api.get("/sellers/profile",{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            })
            console.log("fetch seller profile ",response.data)
            return response.data;
        } catch (error) {
            console.log("error - - -",error);
        }
    }
);

const initialState = {
  sellers: [],
  selectedSeller: null,
  profile: null,
  report: null,
  loading: false,
  error: null,
};

const sellerSlice=createSlice({
    name:"sellers",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
        .addCase(fetchSellerProfile.pending,(state)=>{
            state.loading=true;
        })
        .addCase(fetchSellerProfile.fulfilled,(state,action)=>{
            state.loading=false;
            state.profile=action.payload;
        }).addCase(fetchSellerProfile.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

    }
});

export default sellerSlice.reducer;