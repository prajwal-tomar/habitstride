'use client'

import { useState } from 'react';
import { Switch } from '@radix-ui/react-switch';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { motion } from 'framer-motion';

export function Settings() {
  const [name, setName] = useState('');
  const [timezone, setTimezone] = useState('');
  const [profilePicture, setProfilePicture] = useState('');
  const [notifications, setNotifications] = useState(false);
  const [habitEditing, setHabitEditing] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Handle form submission
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFA07A] to-[#FFE4B5] text-gray-800 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl font-light text-black mb-2">
            Settings
          </h1>
          <p className="text-xl text-black">
            Adjust your preferences and personal information.
          </p>
        </motion.header>

        <form onSubmit={handleSubmit} className="space-y-6 bg-white rounded-lg shadow-md p-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">Name</label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Timezone</label>
            <Input
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Profile Picture URL</label>
            <Input
              value={profilePicture}
              onChange={(e) => setProfilePicture(e.target.value)}
              className="mt-1 block w-full"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Notifications</label>
            <Switch
              checked={notifications}
              onCheckedChange={(checked) => setNotifications(checked)}
              className="ml-2"
            />
          </div>
          <div className="flex items-center justify-between">
            <label className="block text-sm font-medium text-gray-700">Habit Editing</label>
            <Switch
              checked={habitEditing}
              onCheckedChange={(checked) => setHabitEditing(checked)}
              className="ml-2"
            />
          </div>
          <Button type="submit" className="w-full bg-blue-500 hover:bg-blue-600 text-white">
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
}
