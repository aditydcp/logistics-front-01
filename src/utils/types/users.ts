import { SupabaseClient } from '@supabase/supabase-js';

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: string | null;
  password: string;
  remember_token: string | null;
  created_at: string;
  last_active: string;
}

export const usersSchema = {
  id: 'integer',
  name: 'text',
  email: 'text',
  email_verified_at: 'timestamp with time zone',
  password: 'varchar',
  remember_token: 'varchar',
  created_at: 'timestamp with time zone',
  last_active: 'timestamp with time zone',
};

export async function createUsersTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_users_table', {
    schema: JSON.stringify(usersSchema),
  });

  if (error) {
    console.error('Error creating users table:', error);
  } else {
    console.log('Users table created successfully');
  }
}

export function isValidUser(data: any): data is User {
  return (
    typeof data.name === 'string' &&
    typeof data.email === 'string' &&
    typeof data.password === 'string' &&
    Object.keys(data).every(key => ['name', 'email', 'password'].includes(key))
  )
}