import { configureStore } from "@reduxjs/toolkit";
import { AuthSlice } from "../authSlice/AuthSlice";
import { TimerSlice } from "../timerSlice/TimerSlice";

export const Store = configureStore({
  reducer: {
    auth: AuthSlice.reducer,
    timerState: TimerSlice.reducer,
  },
});
