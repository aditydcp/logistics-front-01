import { SupabaseClient } from '@supabase/supabase-js';

export const tableCategories = 'categories';
export const tablePackagings = 'packagings';
export const tableModules = 'modules';
export const tableRoles = 'roles';

export interface Reference {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export const referenceSchema = {
  id: 'integer',
  name: 'text',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createCategoriesTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_categories_table', {
    schema: JSON.stringify(referenceSchema),
  });

  if (error) {
    console.error('Error creating categories table:', error);
  } else {
    console.log('Categories table created successfully');
  }
}

export async function createPackagingsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_packagings_table', {
    schema: JSON.stringify(referenceSchema),
  });

  if (error) {
    console.error('Error creating packagings table:', error);
  } else {
    console.log('Packagings table created successfully');
  }
}

export async function createModulesTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_modules_table', {
    schema: JSON.stringify(referenceSchema),
  });

  if (error) {
    console.error('Error creating modules table:', error);
  } else {
    console.log('Modules table created successfully');
  }
}

export async function createRolesTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_roles_table', {
    schema: JSON.stringify(referenceSchema),
  });

  if (error) {
    console.error('Error creating roles table:', error);
  } else {
    console.log('Roles table created successfully');
  }
}

export function isValidReference(data: any): data is Reference {
  return (
    typeof data.name === 'string' &&
    Object.keys(data).every(key => ['name'].includes(key))
  )
}