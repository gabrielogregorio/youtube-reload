export const fillIfNecessary = (item: number) => {
  const NUMBER_START_TWO_POSITIONS = 10;
  if (item < NUMBER_START_TWO_POSITIONS) {
    return `0${item}`;
  }

  return item.toString();
};
