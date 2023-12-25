// import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";
// import { api } from "../../libs/api";

// type initThread = {
//   isLoading: boolean;
//   isError: boolean;
//   data: [] | any;
// };

// const initialState: initThread = {
//   isLoading: false,
//   isError: false,
//   data: [],
// };
// const token = localStorage.getItem("token");
// const headers = {
//   Authorization: `Bearer ${token}`,
// };
// export const getAllThread = createAsyncThunk("getAllThread", async () => {
//     try {
//         const response = await api.get("/threads", { headers });
//         return response.data.data;
        
//     } catch (error) {
//         console.log(error);
//     }
// });

// const getThreads = createSlice({
//   name: "getDataThread",
//   initialState,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//       .addCase(getAllThread.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getAllThread.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data = action.payload;
//         state.isError = false;
//       })
//       .addCase(getAllThread.rejected, (state) => {
//         state.isLoading = false;
//         state.isError = true;
//       });
//   },
// });

// export default getThreads.reducer;
