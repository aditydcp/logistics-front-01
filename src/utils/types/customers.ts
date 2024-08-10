import { SupabaseClient } from '@supabase/supabase-js';

export interface Customer {
  id: number;
  name: string;
  address: string | null;
  contact: string | null;
  company: string | null;
  created_at: string;
}

export const customersSchema = {
  id: 'integer',
  name: 'text',
  address: 'text',
  contact: 'text',
  company: 'text',
  created_at: 'timestamp with time zone',
};

export async function createCustomersTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_customers_table', {
    schema: JSON.stringify(customersSchema),
  });

  if (error) {
    console.error('Error creating customers table:', error);
  } else {
    console.log('Customers table created successfully');
  }
}

export function isValidCustomer(data: any): data is Customer {
  return (
    typeof data.name === 'string' &&
    (data.address === null || typeof data.address === 'string') &&
    (data.contact === null || typeof data.contact === 'string') &&
    (data.company === null || typeof data.logo_url === 'string') &&
    Object.keys(data).every(key => ['name', 'address', 'contact', 'company'].includes(key))
  )
}