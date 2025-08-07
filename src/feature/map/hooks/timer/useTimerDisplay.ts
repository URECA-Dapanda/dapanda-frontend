export const useTimerDisplay = (remainingTime: number, duration: number) => {
  const minutes = String(Math.floor(remainingTime / 60)).padStart(2, "0");
  const seconds = String(remainingTime % 60).padStart(2, "0");
  const percentage = duration > 0 ? (remainingTime / duration) * 100 : 0;

  return { minutes, seconds, percentage };
};
