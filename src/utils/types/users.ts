import { SupabaseClient } from '@supabase/supabase-js';

// This table contains the users of the application.

export const table = 'users';

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  verified_at: string | null;
  created_at: string;
  updated_at: string;
}

export const usersSchema = {
  id: 'integer',
  name: 'text',
  email: 'text',
  password: 'text',
  verified_at: 'timestamp with time zone',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
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

export function isValidCredentials(data: any): data is User {
  return (
    typeof data.email === 'string' &&
    typeof data.password === 'string' &&
    Object.keys(data).every(key => ['email', 'password'].includes(key))
  )
}