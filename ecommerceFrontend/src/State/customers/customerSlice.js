import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// export const fetchHomePageData=createAsyncThunk('/home/fetchHomePageDate',
//     async(_, {rejectWithValue})=>{
//         try {
//             const response=await api.get('/home-page');
//             console.log("home page ",response.data);
//             return response.data;
//         } catch (error) {
//             const errorMessage=error.response?.data?.message || error.message || 'Failed to fetch ';
//             console.log("err ",errorMessage,error);
//             return rejectWithValue(errorMessage);
//         }
//     }
// )

export const createHomeCategories = createAsyncThunk('home/createHomeCategories',
    async (homeCategories, { rejectWithValue }) => {
        try {
            const response = await api.post('/home/categories', homeCategories);
            console.log("home categories created --- ", response.data);
            return response.data;
        } catch (error) {
            const errorMessage = error.response?.data?.message || error.message || 'Failed to create ';
            console.log("err ", errorMessage, error);
            return rejectWithValue(errorMessage);
        }
    }
)

const initialState = {
    homePageData: null,
    homeCategories: [],
    loading: false,
    error: null
}
const homeSlice = createSlice({
    name: "home",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Handle createHomeCategories lifecycle
        builder.addCase(createHomeCategories.pending, (state) => {
            state.loading = true;
            state.error = null;
        });

        builder.addCase(createHomeCategories.fulfilled, (state, action) => {
            state.loading = false;
            state.homePageData = action.payload; // store the updated home page data
        });

        builder.addCase(createHomeCategories.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload || 'Failed to create home categories';
        });

    }

});

export default homeSlice.reducer;