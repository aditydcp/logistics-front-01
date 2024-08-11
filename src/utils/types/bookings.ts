import { SupabaseClient } from '@supabase/supabase-js';

export const table = 'bookings';

export interface Booking {
  id: number;
  user_id: number;
  exporter_id: number | null;
  importer_id: number | null;
  flight_id: number | null;
  category_id: number | null;
  packaging_id: number | null;
  quantity: number | null;
  dimension: number | null;
  weight: number | null;
  status: number;
  created_at: string;
  updated_at: string;
}

export const bookingSchema = {
  id: 'integer',
  user_id: 'integer reference users(id)',
  exporter_id: 'integer reference exporters(id)',
  importer_id: 'integer reference importers(id)',
  flight_id: 'integer reference flights(id)',
  category_id: 'integer reference categories(id)',
  packaging_id: 'integer reference packagings(id)',
  quantity: 'integer',
  dimension: 'real',
  weight: 'real',
  status: 'integer',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createBookingsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_bookings_table', {
    schema: JSON.stringify(bookingSchema),
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
    typeof data.category_id === 'number' &&
    typeof data.packaging_id === 'number' &&
    typeof data.quantity === 'number' &&
    typeof data.dimension === 'number' &&
    typeof data.weight === 'number' &&
    typeof data.status === 'number' &&
    Object.keys(data).every(key => ['user_id', 'exporter_id', 'importer_id', 'flight_id', 'category_id', 'packaging_id', 'quantity', 'dimension', 'weight', 'status'].includes(key))
  )
}