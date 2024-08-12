export const parseQueryValue = (value) => {
  if (typeof value === 'string') {
    return [parseInt(value, 10)];
  } else if (Array.isArray(value)) {
    return value.map(item => parseInt(item, 10));
  }
  return value;
};