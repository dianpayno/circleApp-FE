import { createSlice } from "@reduxjs/toolkit";

type UserType = {
  id: number;
  username: string;
  full_name: string;
  email: string;
  profile_picture: string;
  profile_description: string;
  cover_picture: string;
  threads: [];
  follows: number;
  following: number;
  isFollowing: boolean;
};

const initialState: UserType = {
  id: 0,
  username: "",
  full_name: "",
  email: "",
  profile_picture: "",
  profile_description: "",
  cover_picture: "",
  threads: [],
  follows: 0,
  following: 0,
  isFollowing: false,
};

export const detailUser = createSlice({
  name: "detailUser",
  initialState,
  reducers: {
    SAVE_DATA_USER: (state, action) => {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.full_name = action.payload.full_name;
      state.profile_description = action.payload.profile_description;
      state.profile_picture = action.payload.profile_picture;
      state.cover_picture = action.payload.cover_picture;
      state.threads = action.payload.threads;
      state.follows = action.payload.follows;
      state.following = action.payload.following;
      state.isFollowing = action.payload.isFollowing;
    },
  },
});

export const { SAVE_DATA_USER } = detailUser.actions;
export default detailUser.reducer;