import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
// import userReducer from "./slice/dataUserSlice";
import threadReducer from "./slice/ThreadSlice";
import detailUserReduder from "./slice/visitUserSlice";
// import followsReducer from "./slice/followSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    detailUser: detailUserReduder,
    // dataUser: userReducer,
    // follows: followsReducer,
    thread: threadReducer,
  },
});

// this is neeeded for typescript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
