import { useContext } from 'react';
import { FlightDataContext } from 'src/contexts/flight-data-context';

export const useFlightData = () => useContext(FlightDataContext);