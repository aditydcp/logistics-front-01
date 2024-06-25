export const getFlightRate = (flight, weight) => {
  return flight.rates.reduce((prev, curr) =>
    Math.abs(curr.min - weight) < Math.abs(prev.min - weight) ? curr : prev
  ).price
}