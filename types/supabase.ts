export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      habit_completion: {
        Row: {
          id: string
          habit_id: string
          date: string
          status: 'completed' | 'partial' | 'missed'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          habit_id: string
          date: string
          status: 'completed' | 'partial' | 'missed'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          habit_id?: string
          date?: string
          status?: 'completed' | 'partial' | 'missed'
          created_at?: string
          updated_at?: string
        }
      }
      // ... other tables ...
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}