import { SupabaseClient } from '@supabase/supabase-js';

export interface FlightRate {
  id: number;
  label: string | null;
  rates_json: string;
  created_at: string;
}

export const flightRatesSchema = {
  id: 'integer',
  label: 'text',
  rates_json: 'text',
  created_at: 'timestamp with time zone',
};

export async function createFlightRatesTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_flight_rates_table', {
    schema: JSON.stringify(flightRatesSchema),
  });

  if (error) {
    console.error('Error creating flight_rates table:', error);
  } else {
    console.log('Flight_rates table created successfully');
  }
}

export function isValidFlightRate(data: any): data is FlightRate {
  return (
    typeof data.id === 'number' &&
    (data.label === null || typeof data.label === 'string') &&
    typeof data.rates_json === 'string' &&
    typeof data.created_at === 'string' &&
    Object.keys(data).every(key => ['id', 'label', 'rates_json', 'created_at'].includes(key))
  )
}

export function isValidRatesStructure(ratesJson: string): boolean {
  try {
    const rates = JSON.parse(ratesJson);
    return Array.isArray(rates) && rates.every(rate => 
      typeof rate.min === 'number' &&
      typeof rate.max === 'number' &&
      typeof rate.price_per_unit === 'number' &&
      rate.min < rate.max
    );
  } catch (error) {
    return false;
  }
}