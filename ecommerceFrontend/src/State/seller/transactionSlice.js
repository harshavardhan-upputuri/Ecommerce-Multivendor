import axios from 'axios';
import { api } from '../../config/Api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState={
    transactions:[],
    transaction:null,
    loading:false,
    error:null,
};

export const fetchTransactionsBySeller=createAsyncThunk('transactions/fetchTransactionsBySeller',
    async(jwt,{rejectWithValue})=>{
        try {
            const response=await api.get('/api/transactions/seller',{
                headers:{
                    Authorization:`Bearer ${jwt}`,
                },
            });
            console.log("fetchTransactionsBySeller",response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
        }
    }
)

export const fetchAllTransactions=createAsyncThunk('transactions/fetchAllTransactions',
    async(__dirname,{rejectWithValue})=>{
        try {
            const response=await api.get("/api/transactions");
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response.data.message);
            
        }
    }
)

const transactionSlice=createSlice({
    name:"transactions",
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchTransactionsBySeller.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });

        builder.addCase(fetchTransactionsBySeller.fulfilled,(state,action)=>{
            state.loading=false;
            state.transactions=action.payload;
        });

         builder.addCase(fetchTransactionsBySeller.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

        builder.addCase(fetchAllTransactions.pending,(state)=>{
            state.loading=true;
            state.error=null;
        });

        builder.addCase(fetchAllTransactions.fulfilled,(state,action)=>{
            state.loading=false;
            state.transactions=action.payload;
        });

         builder.addCase(fetchAllTransactions.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

        

    }
})

export default transactionSlice.reducer