import { SupabaseClient } from '@supabase/supabase-js';

export const table = 'airports';

export interface Airport {
  id: number;
  name: string;
  code: string;
  city: string;
  country: string;
  created_at: string;
  updated_at: string;
}

export const airportSchema = {
  id: 'integer',
  name: 'text',
  code: 'varchar',
  city: 'text',
  country: 'text',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createAirportsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_airports_table', {
    schema: JSON.stringify(airportSchema),
  });

  if (error) {
    console.error('Error creating airports table:', error);
  } else {
    console.log('Airports table created successfully');
  }
}

export function isValidAirport(data: any): data is Airport {
  return (
    typeof data.name === 'string' &&
    typeof data.code === 'string' &&
    typeof data.city === 'string' &&
    typeof data.country === 'string' &&
    Object.keys(data).every(key => ['name', 'code', 'city', 'country'].includes(key))
  )
}