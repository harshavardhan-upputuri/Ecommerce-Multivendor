import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../config/Api";

const API_URL = "/admin/deals";

// ✅ Async thunks
export const fetchDeals = createAsyncThunk(
  "deals/fetchDeals",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get(API_URL);
      console.log("Fetched deals:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching deals:", error.response);
      return rejectWithValue(error.response?.data?.message || "Failed to fetch deals");
    }
  }
);

export const createDeal = createAsyncThunk(
  "deals/createDeal",
  async (deal, { rejectWithValue }) => {
    try {
      const response = await api.post(API_URL, deal);
      console.log("Deal created:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error creating deal:", error.response);
      return rejectWithValue(error.response?.data?.message || "Failed to create deal");
    }
  }
);

export const updateDeal = createAsyncThunk(
  "deals/updateDeal",
  async ({ id, deal }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`${API_URL}/${id}`, deal);
      console.log("Deal updated:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error updating deal:", error.response);
      return rejectWithValue(error.response?.data?.message || "Failed to update deal");
    }
  }
);

export const deleteDeal = createAsyncThunk(
  "deals/deleteDeal",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`${API_URL}/${id}`);
      console.log("Deal deleted:", id);
      return id;
    } catch (error) {
      console.error("Error deleting deal:", error.response);
      return rejectWithValue(error.response?.data?.message || "Failed to delete deal");
    }
  }
);

// ✅ Initial state
const initialState = {
  deals: [],
  loading: false,
  error: null,
  dealUpdated: false,
};

// ✅ Slice
const dealSlice = createSlice({
  name: "deals",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchDeals.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealUpdated = false;
      })
      .addCase(fetchDeals.fulfilled, (state, action) => {
        state.loading = false;
        state.deals = action.payload;
      })
      .addCase(fetchDeals.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Create
      .addCase(createDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.deals.push(action.payload);
      })
      .addCase(createDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Update
      .addCase(updateDeal.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.dealUpdated = false;
      })
      .addCase(updateDeal.fulfilled, (state, action) => {
        state.loading = false;
        state.dealUpdated = true;
        const index = state.deals.findIndex(
          (deal) => deal.id === action.payload.id
        );
        if (index !== -1) {
          state.deals[index] = action.payload;
        } else {
          state.deals.push(action.payload);
        }
      })
      .addCase(updateDeal.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      // Delete
      .addCase(deleteDeal.fulfilled, (state, action) => {
        state.deals = state.deals.filter((deal) => deal.id !== action.payload);
      })
      .addCase(deleteDeal.rejected, (state, action) => {
        state.error = action.payload;
      });
  },
});

export default dealSlice.reducer;
