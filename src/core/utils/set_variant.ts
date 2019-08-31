export const setVariant = (days_left: number) => {
  let variant = 'primary';
  if (days_left < 3) {
    variant = 'warning';
  }

  if (days_left === 0) {
    variant = 'danger';
  }
  return variant;
};
