export const convertSecond = (second: number) => {
  const minutes = Math.floor(second / 60);
  const seconds = Math.floor(second % 60);

  const minuteText = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const secondText = seconds < 10 ? `0${seconds}` : `${seconds}`;

  return `${minuteText}:${secondText}`;
};
