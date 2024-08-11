import { SupabaseClient } from '@supabase/supabase-js';

// This table contains the flights that are part of a flight ticket.

export const table = 'flight_ticket_flights';

export interface FlightTicketFlight {
  id: number;
  flight_ticket_id: number;
  flight_id: number;
  sequence: number;
  created_at: string;
  updated_at: string;
}

export const flightTicketFlightSchema = {
  id: 'integer',
  flight_ticket_id: 'integer references flight_tickets(id)',
  flight_id: 'integer references flights(id)',
  sequence: 'integer',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createFlightTicketFlightsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_flight_ticket_flights_table', {
    schema: JSON.stringify(flightTicketFlightSchema),
  });

  if (error) {
    console.error('Error creating flight_ticket_flights table:', error);
  } else {
    console.log('Flight_ticket_flights table created successfully');
  }
}

export function isValidFlightTicketFlight(data: any): data is FlightTicketFlight {
  return (
    typeof data.flight_id === 'number' &&
    typeof data.flight_ticket_id === 'number' &&
    typeof data.sequence === 'number' &&
    Object.keys(data).every(key => ['flight_id', 'flight_ticket_id', 'sequence'].includes(key))
  )
}