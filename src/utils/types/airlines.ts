import { SupabaseClient } from '@supabase/supabase-js';

export const table = 'airlines';

export interface Airline {
  id: number;
  name: string;
  logo: string | null;
  created_at: string;
  updated_at: string;
}

export const airlineSchema = {
  id: 'integer',
  name: 'text',
  logo: 'text',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createAirlinesTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_airlines_table', {
    schema: JSON.stringify(airlineSchema),
  });

  if (error) {
    console.error('Error creating airlines table:', error);
  } else {
    console.log('Airlines table created successfully');
  }
}

export function isValidAirline(data: any): data is Airline {
  return (
    typeof data.name === 'string' &&
    (data.logo === null || typeof data.logo === 'string') &&
    Object.keys(data).every(key => ['name', 'logo'].includes(key))
  )
}