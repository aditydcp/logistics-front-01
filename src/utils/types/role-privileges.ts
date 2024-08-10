import { SupabaseClient } from '@supabase/supabase-js';

// This table contains access privileges for each role to a specific module.

export const table = 'role_privileges';

export interface RolePrivilege {
  id: number;
  role_id: number;
  module_id: number;
  read: boolean;
  write: boolean;
  delete: boolean;
  update: boolean;
  created_at: string;
  updated_at: string;
}

export const rolePrivilegeSchema = {
  id: 'integer',
  role_id: 'integer references roles(id)',
  module_id: 'integer references modules(id)',
  read: 'boolean',
  write: 'boolean',
  delete: 'boolean',
  update: 'boolean',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createRolePrivilegesTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_role_privileges_table', {
    schema: JSON.stringify(rolePrivilegeSchema),
  });

  if (error) {
    console.error('Error creating role_privileges table:', error);
  } else {
    console.log('Role_privileges table created successfully');
  }
}

export function isValidRolePrivilege(data: any): data is RolePrivilege {
  return (
    typeof data.role_id === 'number' &&
    typeof data.module_id === 'number' &&
    Object.keys(data).every(key => ['module_id', 'role_id'].includes(key))
  )
}