import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import { api } from "../../libs/api";

type initThread = {
  isLoading: boolean;
  isError: boolean;
  data: [] | any;
};

const initialState: initThread = {
  isLoading: false,
  isError: false,
  data: [],
};
const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};
export const getmyThreads = createAsyncThunk("getmyThreads", async () => {
    try {
        const response = await api.get("/mythreads", { headers });
        return response.data.data;
        
    } catch (error) {
        console.log(error);
    }
});



const getThreads = createSlice({
  name: "getmyThreads",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getmyThreads.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getmyThreads.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(getmyThreads.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export default getThreads.reducer;
