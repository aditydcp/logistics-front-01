import { SupabaseClient } from '@supabase/supabase-js';

export const table = 'flights';

export interface Flight {
  id: number;
  airline_id: number;
  plane_model: string;
  baggage_size: number;
  departure_airport_id: number;
  departure_datetime: string;
  arrival_airport_id: number;
  arrival_datetime: string;
  created_at: string;
  updated_at: string;
}

export const flightSchema = {
  id: 'integer',
  airline_id: 'integer references airlines(id)',
  plane_model: 'varchar',
  baggage_size: 'integer',
  departure_airport_id: 'integer references airports(id)',
  departure_datetime: 'timestamp with time zone',
  arrival_airport_id: 'integer references airports(id)',
  arrival_datetime: 'timestamp with time zone',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createFlightsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_flights_table', {
    schema: JSON.stringify(flightSchema),
  });

  if (error) {
    console.error('Error creating flights table:', error);
  } else {
    console.log('Flights table created successfully');
  }
}

export function isValidFlight(data: any): data is Flight {
  return (
    typeof data.airline_id === 'number' &&
    typeof data.rates_id === 'number' &&
    typeof data.plane_model === 'string' &&
    typeof data.baggage_size === 'number' &&
    typeof data.departure_airport_id === 'number' &&
    typeof data.departure_datetime === 'string' &&
    typeof data.arrival_airport_id === 'number' &&
    typeof data.arrival_datetime === 'string' &&
    Object.keys(data).every(key => ['airline_id', 'rates_id', 'plane_model', 'baggage_size', 'departure_airport_id', 'departure_datetime', 'arrival_airport_id', 'arrival_datetime'].includes(key))
  )
}