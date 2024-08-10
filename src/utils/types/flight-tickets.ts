import { SupabaseClient } from '@supabase/supabase-js';

export const table = 'flight_tickets';

export interface FlightTicket {
  id: number;
  rates_id: number;
  created_at: string;
  updated_at: string;
}

export const flightTicketSchema = {
  id: 'integer',
  rates_id: 'integer references flight_rates(id)',
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
    typeof data.rates_id === 'number' &&
    Object.keys(data).every(key => ['rates_id'].includes(key))
  )
}