import { SupabaseClient } from '@supabase/supabase-js';

// This table contains the logs for user auth activities (logins and logout).

export const table = 'user_logs';

export interface UserLog {
  id: number;
  user_id: number;
  activity: string;
  timestamp: string;
  created_at: string;
  updated_at: string;
}

export const userLogSchema = {
  id: 'integer',
  user_id: 'integer references users(id)',
  activity: 'text',
  timestamp: 'timestamp with time zone',
  created_at: 'timestamp with time zone',
  updated_at: 'timestamp with time zone',
};

export async function createUserLogsTable(supabase: SupabaseClient) {
  const { error } = await supabase.rpc('create_user_logs_table', {
    schema: JSON.stringify(userLogSchema),
  });

  if (error) {
    console.error('Error creating user_logs table:', error);
  } else {
    console.log('User_logs table created successfully');
  }
}

export function isValidUserLog(data: any): data is UserLog {
  return (
    typeof data.user_id === 'number' &&
    typeof data.activity === 'string' &&
    typeof data.timestamp === 'string' &&
    Object.keys(data).every(key => ['user_id', 'activity', 'timestamp'].includes(key))
  )
}