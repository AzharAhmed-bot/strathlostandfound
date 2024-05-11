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
export const postQuestion = createAsyncThunk(
  "lostandfound/postQuestion",
  async ({question,endpoint}) => {

    const response = await fetch(`http://localhost:5000/${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ review: question }),
    });
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Failed to post question');
    }
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
    builder.addCase(postQuestion.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(postQuestion.fulfilled, (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(postQuestion.rejected, (state) => {
      state.isLoading = false;
      state.error = true;
    });
  },
});


export const { rejectClaim } = lostAndFoundSlice.actions;

export default lostAndFoundSlice.reducer;
