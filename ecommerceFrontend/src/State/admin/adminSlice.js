import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {api} from '../../config/Api'
const API_URL= '/admin';

export const updateHomeCategory=createAsyncThunk('homeCategory/updateHomeCategory',
    async({id,data},{rejectWithValue})=>{
        try {
            const response =await api.patch(`${API_URL}/home-category/${id}`,data);
            console.log("category updated ",response);
            return response.data;
        } catch (error) {
            console.log("error ",error);
            if(error.response && error.response.data){
                return rejectWithValue(error.response.data);
            }else{
                return rejectWithValue('An error occurred while updating the category')
            }
        }
    }
);

export const fetchHomeCategories=createAsyncThunk(
    'homeCategory/fetchHomeCategories',
    async(_, {rejectWithValue})=>{
        try {
            const response=await api.get(`${API_URL}/home-category`);
            console.log("categories ",response.data);
            return response.data;
        } catch (error) {
            console.log("error ",error.response);
            return rejectWithValue(error.response?.data?.message || 'Failed to fetch category');
        }
    }
);

const initialState={
    categories:[],
    loading:false,
    error:null,
    categoryUpdated:false,
};

const homeCategorySlice=createSlice({
    name:'homeCategory',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(updateHomeCategory.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.categoryUpdated=false;
        });
        builder.addCase(updateHomeCategory.fulfilled,(state,action)=>{
            state.loading=false;
            state.categoryUpdated=true;
            const index = state.categories.findIndex((category)=>category.id===action.payload.id);
            if(index !== -1){
                state.categories[index]=action.payload;
            }else{
                state.categories.push(action.payload);
            }
        });
        builder.addCase(updateHomeCategory.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });

        builder.addCase(fetchHomeCategories.pending,(state)=>{
            state.loading=true;
            state.error=null;
            state.categoryUpdated=false;
        });
        builder.addCase(fetchHomeCategories.fulfilled,(state,action)=>{
            state.loading=false;
            state.categories=action.payload;
        });
        builder.addCase(fetchHomeCategories.rejected,(state,action)=>{
            state.loading=false;
            state.error=action.payload;
        });
    }


})

export default homeCategorySlice.reducer;
