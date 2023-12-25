import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { api } from "../../libs/api";

type initUser = {
  isLoading: boolean;
  isError: boolean;
  data: [] | any;
};

// type initUserbyId = {
//   isLoading: boolean;
//   isError: boolean;
//   data: {} | any;
// };
const initialState: initUser = {
  isLoading: false,
  isError: false,
  data: [],
};

// const initialStateById: initUserbyId = {
//   isLoading: false,
//   isError: false,
//   data: {},
// };

const token = localStorage.getItem("token");
const headers = {
  Authorization: `Bearer ${token}`,
};

export const getAllUser: any = createAsyncThunk("getAllUser", async () => {
  const response = await api.get("/users", { headers });
  return response.data;
});

// export const getUserById: any = createAsyncThunk(
//   "getUserById",
//   async (userId: number) => {
//     const response = await api.get(`/users/${userId}`, { headers });
//     return response.data.data;
//   }
// );

const dataUserSlice = createSlice({
  name: "dataUser",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
        state.isError = false;
      })
      .addCase(getAllUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.isError = action.payload || true;
        state.data = [];
      });
  },
});

// export const dataUserByIdSlice = createSlice({
//   name: "dataUserById",
//   initialState: initialStateById,
//   reducers: {},
//   extraReducers: (builder) => {
//     builder
//     .addCase(getUserById.pending, (state) => {
//         state.isLoading = true;
//       })
//       .addCase(getUserById.fulfilled, (state, action) => {
//         state.isLoading = false;
//         state.data = action.payload;
//         state.isError = false;
//       })
//       .addCase(getUserById.rejected, (state, action: PayloadAction<any>) => {
//         state.isLoading = false;
//         state.isError = action.payload || true;
//         state.data = [];
//       });
//   },
// });


export default dataUserSlice.reducer

