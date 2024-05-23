import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchLostAndFound = createAsyncThunk(
  "lostandfound/fetch",
  async (endpoint) => {
    const response = await fetch(`http://localhost:5000${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.json();
  }
);


const initialState = {
  isLoading: false,
  data: [],
  claims:[],
  error: null,
};

const lostAndFoundSlice = createSlice({
  name: "lostAndFound",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchLostAndFound.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchLostAndFound.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(fetchLostAndFound.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});


export default lostAndFoundSlice.reducer;
