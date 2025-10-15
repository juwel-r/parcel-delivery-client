export const calculateParcelFee = (weights: string) => {

  const weight = Number(weights)
  if (!weight || weight <= 0.5) {
    return 120;
  } else if (weight <= 1) {
    return 150;
  } else if (weight >= 1) {
    return 150 + ((weight - 1) * 15);
  }
};
