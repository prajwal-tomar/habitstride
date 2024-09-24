'use client'

import React from 'react';
import { HabitTracker } from './habit-grid';

export function Dashboard() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <HabitTracker />
    </div>
  );
}