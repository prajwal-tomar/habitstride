import { createClient } from '@supabase/supabase-js';
import { Habit } from '../types/habit';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);

export async function fetchHabits(): Promise<Habit[]> {
  const { data, error } = await supabase
    .from('habits')
    .select('*');

    console.log(data)

  if (error) {
    console.error('Error fetching habits:', error);
    return [];
  }

  return data as Habit[];
}