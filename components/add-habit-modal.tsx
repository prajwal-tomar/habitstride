'use client'

import React, { FC, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface AddHabitModalProps {
  isOpen: boolean;
  onClose: () => void;
  onHabitAdded: () => void;
}

export const AddHabitModal: FC<AddHabitModalProps> = ({ isOpen, onClose, onHabitAdded }) => {
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [pushNotifications, setPushNotifications] = useState(false);
  const [emailReminders, setEmailReminders] = useState(false);

  async function handleAddHabit() {
    const { data, error } = await supabase
      .from('habits')
      .insert([
        {
          name,
          timezone,
          reminder_time: reminderTime,
          push_notifications: pushNotifications,
          email_reminders: emailReminders,
        },
      ]);

    if (error) {
      toast.error('Failed to add habit');
    } else {
      toast.success('Habit added successfully');
      onHabitAdded();
      onClose();
    }
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-semibold mb-4">Add New Habit</h2>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Habit Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="text"
            placeholder="Timezone"
            value={timezone}
            onChange={(e) => setTimezone(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="time"
            placeholder="Reminder Time"
            value={reminderTime}
            onChange={(e) => setReminderTime(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={pushNotifications}
              onChange={(e) => setPushNotifications(e.target.checked)}
              className="mr-2"
            />
            <label>Push Notifications</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={emailReminders}
              onChange={(e) => setEmailReminders(e.target.checked)}
              className="mr-2"
            />
            <label>Email Reminders</label>
          </div>
        </div>
        <div className="mt-4 flex justify-end">
          <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded">Close</button>
          <button onClick={handleAddHabit} className="bg-blue-500 text-white px-4 py-2 rounded ml-2">Add Habit</button>
        </div>
      </div>
    </div>
  );
};