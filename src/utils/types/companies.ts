import { SupabaseClient } from '@supabase/supabase-js';

export interface Company {
  id: number;
  name: string;
  address: string | null;
  contact: string | null;
  logo_url: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export const companiesSchema = {
  id: 'integer',
  name: 'text',
  address: 'text',
  contact: 'text',
  logo_url: 'text',
  verified_at: 'timestamp with time zone',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createExportersTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_exporters_table', {
    schema: JSON.stringify(companiesSchema),
  });

  if (error) {
    console.error('Error creating exporters table:', error);
  } else {
    console.log('Exporters table created successfully');
  }
}

export async function createImportersTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_importers_table', {
    schema: JSON.stringify(companiesSchema),
  });

  if (error) {
    console.error('Error creating importers table:', error);
  } else {
    console.log('Importers table created successfully');
  }
}

export function isValidCompany(data: any): data is Company {
  return (
    typeof data.name === 'string' &&
    (data.address === null || typeof data.address === 'string') &&
    (data.contact === null || typeof data.contact === 'string') &&
    (data.logo_url === null || typeof data.logo_url === 'string') &&
    Object.keys(data).every(key => ['name', 'address', 'contact', 'logo_url'].includes(key))
  )
}