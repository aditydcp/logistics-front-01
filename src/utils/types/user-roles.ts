import { SupabaseClient } from '@supabase/supabase-js';

// This table contains the roles for each user.

export const table = 'user_roles';

export interface UserRole {
  id: number;
  user_id: number;
  role_id: number;
  created_at: string;
  updated_at: string;
}

export const userRoleSchema = {
  id: 'integer',
  user_id: 'integer references users(id)',
  role_id: 'integer references roles(id)',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createUserRolesTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_user_roles_table', {
    schema: JSON.stringify(userRoleSchema),
  });

  if (error) {
    console.error('Error creating user_roles table:', error);
  } else {
    console.log('User_roles table created successfully');
  }
}

export function isValidUserRole(data: any): data is UserRole {
  return (
    typeof data.user_id === 'number' &&
    typeof data.role_id === 'number' &&
    Object.keys(data).every(key => ['user_id', 'role_id'].includes(key))
  )
}