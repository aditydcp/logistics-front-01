import { SupabaseClient } from '@supabase/supabase-js';

export interface Booking {
  id: number;
  user_id: number;
  exporter_id: number;
  importer_id: number;
  flight_id: number;
  category: number;
  packaging: number;
  quantity: number;
  dimension: number;
  weight: number;
  status: number;
  created_at: string;
}

export const bookingsSchema = {
  id: 'integer',
  user_id: 'integer reference users(id)',
  exporter_id: 'integer reference exporters(id)',
  importer_id: 'integer reference importers(id)',
  flight_id: 'integer reference flights(id)',
  category: 'integer reference categories(id)',
  packaging: 'integer reference packagings(id)',
  quantity: 'integer',
  dimension: 'real',
  weight: 'real',
  status: 'integer',
  created_at: 'timestamp with time zone',
};

export async function createBookingsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_bookings_table', {
    schema: JSON.stringify(bookingsSchema),
  });

  if (error) {
    console.error('Error creating bookings table:', error);
  } else {
    console.log('Bookings table created successfully');
  }
}

export function isValidBooking(data: any): data is Booking {
  return (
    typeof data.user_id === 'number' &&
    typeof data.exporter_id === 'number' &&
    typeof data.importer_id === 'number' &&
    typeof data.flight_id === 'number' &&
    typeof data.category === 'number' &&
    typeof data.packaging === 'number' &&
    typeof data.quantity === 'number' &&
    typeof data.dimension === 'number' &&
    typeof data.weight === 'number' &&
    typeof data.status === 'number' &&
    Object.keys(data).every(key => ['user_id', 'exporter_id', 'importer_id', 'flight_id', 'category', 'packaging', 'quantity', 'dimension', 'weight', 'status'].includes(key))
  )
}