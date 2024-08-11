import { SupabaseClient } from '@supabase/supabase-js';

// This table contains data about flight tickets, the packaged flight that the user can see and book.

export const table = 'flight_tickets';

export interface FlightTicket {
  id: number;
  rates_json: string;
  created_at: string;
  updated_at: string;
}

export const flightTicketSchema = {
  id: 'integer',
  rates_json: 'text',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createFlightTicketsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_flight_tickets_table', {
    schema: JSON.stringify(flightTicketSchema),
  });

  if (error) {
    console.error('Error creating flight_tickets table:', error);
  } else {
    console.log('Flight_tickets table created successfully');
  }
}

export function isValidFlightTicket(data: any): data is FlightTicket {
  return (
    typeof data.rates_json === 'string' &&
    Object.keys(data).every(key => ['rates_json'].includes(key))
  )
}