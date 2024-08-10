import { SupabaseClient } from '@supabase/supabase-js';

export interface Reference {
  id: number;
  name: string;
  created_at: string;
}

export const referencesSchema = {
  id: 'integer',
  name: 'text',
  created_at: 'timestamp with time zone',
};

export async function createCategoriesTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_categories_table', {
    schema: JSON.stringify(referencesSchema),
  });

  if (error) {
    console.error('Error creating categories table:', error);
  } else {
    console.log('Categories table created successfully');
  }
}

export async function createPackagingsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_packagings_table', {
    schema: JSON.stringify(referencesSchema),
  });

  if (error) {
    console.error('Error creating packagings table:', error);
  } else {
    console.log('Packagings table created successfully');
  }
}

export function isValidReference(data: any): data is Reference {
  return (
    typeof data.name === 'string' &&
    Object.keys(data).every(key => ['name'].includes(key))
  )
}