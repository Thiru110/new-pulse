import { endTimer, incrementTimer, startTimer } from "./TimerSlice";

export const manageTimer = () => (dispatch, getState) => {
  // Start the timer
  dispatch(startTimer());
  const interval = setInterval(() => {
    // Check if the timer should still be running
    const { timerActive } = getState().timerState;
    if (!timerActive) {
      clearInterval(interval);
    } else {
      dispatch(incrementTimer());
    }
  }, 1000);

  // Provide a way to stop the timer
  return () => {
    clearInterval(interval);
    dispatch(endTimer());
  };
};
