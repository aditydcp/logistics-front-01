import { SupabaseClient } from '@supabase/supabase-js';

export const tableExporters = 'exporters';
export const tableImporters = 'importers';

export interface Company {
  id: number;
  name: string;
  email: string | null;
  address: string | null;
  phone: string | null;
  logo: string | null;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export const companySchema = {
  id: 'integer',
  name: 'text',
  email: 'text',
  address: 'text',
  phone: 'text',
  logo: 'text',
  verified_at: 'timestamp with time zone',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createExportersTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_exporters_table', {
    schema: JSON.stringify(companySchema),
  });

  if (error) {
    console.error('Error creating exporters table:', error);
  } else {
    console.log('Exporters table created successfully');
  }
}

export async function createImportersTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_importers_table', {
    schema: JSON.stringify(companySchema),
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
    (data.email === null || typeof data.email === 'string') &&
    (data.phone === null || typeof data.phone === 'string') &&
    (data.logo === null || typeof data.logo === 'string') &&
    Object.keys(data).every(key => ['name', 'address', 'email', 'phone', 'logo'].includes(key))
  )
}

export function isValidVerifiedCompany(data: any): data is Company {
  return (
    typeof data.name === 'string' &&
    typeof data.address === 'string' &&
    typeof data.email === 'string' &&
    typeof data.phone === 'string' &&
    (data.logo === null || typeof data.logo === 'string') &&
    Object.keys(data).every(key => [
      'name',
      'address',
      'email',
      'phone',
      'logo',
      'id',
      'created_at',
      'updated_at',
      'verified_at'
    ].includes(key))
  )
}