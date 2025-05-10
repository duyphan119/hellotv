export const formatSecondsToHMS = (seconds: number) => {
  // 123 seconds => 02:03

  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = seconds % 60;

  const paddedMinutes = String(minutes).padStart(2, "0");
  const paddedSeconds = remainingSeconds.toFixed(0).padStart(2, "0");

  if (!hours) return `${paddedMinutes}:${paddedSeconds}`;

  const paddedHours = String(hours).padStart(2, "0");
  return `${paddedHours}:${paddedMinutes}:${paddedSeconds}`;
};
