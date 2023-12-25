import {createSlice, createAsyncThunk} from "@reduxjs/toolkit"
import { api } from "../../libs/api"

type initFollows = {
    isLoading: boolean,
    isError: boolean,
    data: [] | any
}

const initialState : initFollows = {
    isLoading: false,
    isError: false,
    data: []
}

const token = localStorage.getItem("token");
const headers = {
    Authorization: `Bearer ${token}`,
};

export const getDataFollows = createAsyncThunk("getDataFollows", async () => {
    try {
        const response = await api("/follows", { headers });
        return response.data.data;
    } catch (error){
        console.log(error);
    }
})

const followsSlice = createSlice({
    name : "follows",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getDataFollows.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getDataFollows.fulfilled, (state, action) => {
            state.isLoading = false;
            state.data = action.payload;
            state.isError = false;
        })
        .addCase(getDataFollows.rejected, (state) => {
            state.isError = true;
            state.data = [];
        })
    }
})

export default followsSlice.reducer