export interface Habit {
  id: number;
  name: string;
  timezone: string;
  reminder_time: string;
  push_notifications: boolean;
  email_reminders: boolean;
  created_at: string;
  updated_at: string;
}