import { createSlice } from "@reduxjs/toolkit";
import { Navigate } from "react-router-dom";
type AuthState = {
  id: number;
  username: string;
  fullname: string;
  email: string;
  profile_picture: string;
  profile_description: string;
  token: string | null;
};

const initialState: AuthState = {
  id: 0,
  username: "",
  fullname: "",
  email: "",
  profile_picture: "",
  profile_description: "",
  token: "",
};



export const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    LOGIN_SUKSES: (_, action) => {
      localStorage.setItem("token", action.payload);
   

    },
    USER_LOGIN: (state, action) => {
      state.id = action.payload.id;
      state.fullname = action.payload.full_name;
      state.profile_picture = action.payload.profile_picture;
    },
    USER_LOGOUT: () => {
      localStorage.removeItem("token");
      window.location.reload();
      
    }
  },
});

export const { USER_LOGIN, LOGIN_SUKSES, USER_LOGOUT } = authSlice.actions;
export default authSlice.reducer;
