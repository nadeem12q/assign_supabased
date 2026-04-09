import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a fallback/mock supabase client when env vars are missing
// This prevents the entire app from crashing on startup
const createFallbackClient = () => {
  console.warn('⚠️ Supabase environment variables missing. Running in UI-only mode.');
  
  // Return a mock object that won't crash the app
  return {
    auth: {
      signInWithPassword: async () => ({ data: null, error: new Error('Supabase not configured') }),
      signOut: async () => ({ error: null }),
      getUser: async () => ({ data: { user: null } }),
      getSession: async () => ({ data: { session: null } }),
      onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
    },
    from: () => ({
      select: () => ({ eq: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }), order: async () => ({ data: [], error: new Error('Supabase not configured') }) }), order: async () => ({ data: [], error: new Error('Supabase not configured') }) }),
      insert: () => ({ select: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }),
      update: () => ({ eq: () => ({ select: () => ({ single: async () => ({ data: null, error: new Error('Supabase not configured') }) }) }) }),
      delete: () => ({ eq: () => ({ error: null }) }),
    }),
    storage: {
      from: () => ({
        upload: async () => ({ data: null, error: new Error('Supabase not configured') }),
        getPublicUrl: () => ({ data: { publicUrl: '' } }),
        createSignedUrl: async () => ({ data: { signedUrl: '' }, error: null }),
        remove: async () => ({ error: null }),
      }),
    },
  } as any;
};

// Export supabase client - real if env vars exist, mock otherwise
export const supabase = (!supabaseUrl || !supabaseAnonKey) 
  ? createFallbackClient() 
  : createClient(supabaseUrl, supabaseAnonKey);

// Helper types for database
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          name: string | null;
          role: 'admin' | 'student';
          phone: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email: string;
          name?: string | null;
          role?: 'admin' | 'student';
          phone?: string | null;
        };
        Update: {
          id?: string;
          email?: string;
          name?: string | null;
          role?: 'admin' | 'student';
          phone?: string | null;
        };
      };
      subjects: {
        Row: {
          id: string;
          name: string;
          description: string | null;
          color: string;
          folder_path: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          name: string;
          description?: string | null;
          color?: string;
          folder_path?: string | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          name?: string;
          description?: string | null;
          color?: string;
          folder_path?: string | null;
          is_active?: boolean;
          updated_at?: string;
        };
      };
      assignments: {
        Row: {
          id: string;
          subject_id: string;
          title: string;
          description: string | null;
          assign_date: string;
          due_date: string;
          status: 'active' | 'inactive';
          manual_status: 'active' | 'inactive' | null;
          folder_name: string | null;
          folder_path: string | null;
          created_at: string;
          updated_at: string;
          created_by: string | null;
        };
        Insert: {
          subject_id: string;
          title: string;
          description?: string | null;
          assign_date: string;
          due_date: string;
          status?: 'active' | 'inactive';
          manual_status?: 'active' | 'inactive' | null;
          folder_name?: string | null;
          folder_path?: string | null;
          created_by?: string | null;
        };
        Update: {
          subject_id?: string;
          title?: string;
          description?: string | null;
          assign_date?: string;
          due_date?: string;
          status?: 'active' | 'inactive';
          manual_status?: 'active' | 'inactive' | null;
          folder_name?: string | null;
          folder_path?: string | null;
          updated_at?: string;
          created_by?: string | null;
        };
      };
      submissions: {
        Row: {
          id: string;
          assignment_id: string;
          student_id: string;
          student_name: string;
          student_username: string;
          original_filename: string;
          stored_filename: string;
          file_path: string;
          file_url: string | null;
          file_size: number | null;
          file_type: string | null;
          submitted_at: string;
          status: 'submitted' | 'late' | 'graded' | 'returned';
          marks: number | null;
          feedback: string | null;
          graded_at: string | null;
          graded_by: string | null;
        };
        Insert: {
          assignment_id: string;
          student_id: string;
          student_name: string;
          student_username: string;
          original_filename: string;
          stored_filename: string;
          file_path: string;
          file_url?: string | null;
          file_size?: number | null;
          file_type?: string | null;
          status?: 'submitted' | 'late' | 'graded' | 'returned';
          marks?: number | null;
          feedback?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
        };
        Update: {
          assignment_id?: string;
          student_id?: string;
          student_name?: string;
          student_username?: string;
          original_filename?: string;
          stored_filename?: string;
          file_path?: string;
          file_url?: string | null;
          file_size?: number | null;
          file_type?: string | null;
          status?: 'submitted' | 'late' | 'graded' | 'returned';
          marks?: number | null;
          feedback?: string | null;
          graded_at?: string | null;
          graded_by?: string | null;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
