import { SupabaseClient } from '@supabase/supabase-js';

// This table contains the extra data for the flights table that references other table, such as categories and packaging.

export const table = 'flight_references';

export interface FlightReference {
  id: number;
  flight_id: number;
  ref_id: number;
  ref_type: string;
  created_at: string;
  updated_at: string;
}

export const flightReferenceSchema = {
  id: 'integer',
  flight_id: 'integer references flights(id)',
  ref_id: 'integer',
  ref_type: 'varchar',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createFlightsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_flight_references_table', {
    schema: JSON.stringify(flightReferenceSchema),
  });

  if (error) {
    console.error('Error creating flight_references table:', error);
  } else {
    console.log('Flight_references table created successfully');
  }
}

export function isValidFlightReference(data: any): data is FlightReference {
  return (
    typeof data.flight_id === 'number' &&
    typeof data.ref_id === 'number' &&
    typeof data.ref_type === 'string' &&
    Object.keys(data).every(key => ['flight_id', 'ref_id', 'ref_type'].includes(key))
  )
}