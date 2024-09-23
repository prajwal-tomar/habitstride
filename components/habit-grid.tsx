'use client'

import React from 'react';
import { CalendarDays } from 'lucide-react';

interface Habit {
  name: string;
  streakDays: number;
  totalDays: number;
  color: string;
  icon: string;
}

interface HabitGridProps {
  habit: Habit;
  streakDays: number;
  totalDays: number;
}

function HabitGrid({ habit, streakDays, totalDays }: HabitGridProps) {
  const gridItems = Array(totalDays).fill(false);
  gridItems.fill(true, 0, streakDays);

  return (
    <div className="flex flex-wrap gap-1">
      {gridItems.map((active, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-sm ${
            active ? habit.color : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

export function HabitTracker() {
  const habits: Habit[] = [
    { name: 'Reading', streakDays: 33, totalDays: 100, color: 'bg-red-500', icon: '📚' },
    { name: 'Coding', streakDays: 27, totalDays: 100, color: 'bg-green-500', icon: '🐼' },
    { name: 'Going to gym', streakDays: 6, totalDays: 100, color: 'bg-purple-500', icon: '🏋️' },
    { name: 'Meditate', streakDays: 42, totalDays: 100, color: 'bg-green-500', icon: '🧘' },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        {/* <h1 className="text-2xl font-bold">Habit Radar</h1> */}
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded-full bg-gray-200">Today</button>
          <button className="px-4 py-2 rounded-full bg-gray-200">Weekly</button>
          <button className="px-4 py-2 rounded-full bg-green-200">Overall</button>
        </div>
      </div>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.name} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{habit.icon}</span>
                <span className="font-semibold">{habit.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays size={16} />
                <span>{habit.streakDays} Days</span>
              </div>
            </div>
            <HabitGrid
              habit={habit}
              streakDays={habit.streakDays}
              totalDays={habit.totalDays}
            />
          </div>
        ))}
        <button className="w-full py-2 bg-gray-100 rounded-lg text-gray-600 flex items-center justify-center">
          <span className="text-2xl mr-2">+</span> Add new habit
        </button>
      </div>
    </div>
  );
}