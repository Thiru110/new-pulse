import { createSlice } from "@reduxjs/toolkit";

export const TimerSlice = createSlice({
  name: "timerState",
  initialState: { currentTimer: 0, timerActive: false },
  reducers: {
    incrementTimer: (state) => {
      state.currentTimer += 1;
    },
    resetTimer: (state) => {
      state.currentTimer = 0;
      state.timerActive = false;
    },
    startTimer: (state) => {
      state.timerActive = true;
    },
    endTimer: (state) => {
      state.timerActive = false;
    },
  },
});

export const { incrementTimer, resetTimer, startTimer, endTimer } =
  TimerSlice.actions;
export default TimerSlice.reducer;
