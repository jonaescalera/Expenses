export const convertValueToMask = (value: number) => {
  return value ? Number(value).toFixed(2) : 0.00;
}; 