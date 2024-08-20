import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/AuthSlice.ts";
import { meetingsSlice } from "./slices/MeetingSlice.tsx";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    meetings: meetingsSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;