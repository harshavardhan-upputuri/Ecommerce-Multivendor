import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

// for types goto 1.03.10
export const fetchSellerProducts = createAsyncThunk(
    "/sellerProduct/fetchSellerProducts",
    async (jwt, { rejectWithValue }) => {
        try {
            const response = await api.get(`/sellers/products`, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })

            const data = response.data;
            console.log("seller products - ", data);
            return data;

        } catch (error) {
            console.log("error - - - ", error);

        }
    }
)

export const createProduct = createAsyncThunk(
    "/sellerProduct/createProduct",
    async ({ request, jwt }, { rejectWithValue }) => {
        try {
            const response = await api.post(`/sellers/products`, request, {
                headers: {
                    Authorization: `Bearer ${jwt}`,
                },
            })
            console.log("product created ", response.data);
            return response.data;
        } catch (error) {
            console.error("error - - -", error);
            // throw error;
        }
    }
)

const initialState = {
    products: [],
    loading: false,
    error: null,
}

const sellerProductSlice = createSlice({
    name: "sellerProduct",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchSellerProducts.pending, (state) => {
            state.loading = true;
        }),
            builder.addCase(fetchSellerProducts.fulfilled, (state, action) => {
                state.loading = false;
                state.products = action.payload;
            }),
            builder.addCase(fetchSellerProducts.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            }),
            builder.addCase(createProduct.pending, (state) => {
                state.loading = true;
            }),
            builder.addCase(createProduct.fulfilled, (state, action) => {
                state.loading = false;
                state.products.push(action.payload);
            }),
            builder.addCase(createProduct.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            });
    }
});

export default sellerProductSlice.reducer;