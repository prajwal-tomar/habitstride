'use client'

import React, { useState, useEffect } from 'react';
import { CalendarDays } from 'lucide-react';
import { AddHabitModal } from './add-habit-modal';
import { Habit } from '../types/habit';

interface HabitGridProps {
  streakDays: number;
  totalDays: number;
}

function HabitGrid({ streakDays, totalDays }: HabitGridProps) {
  const [gridItems, setGridItems] = useState<boolean[]>([]);

  useEffect(() => {
    const items = Array(totalDays).fill(false);
    items.fill(true, 0, streakDays);
    setGridItems(items);
  }, [streakDays, totalDays]);

  return (
    <div className="flex flex-wrap gap-1">
      {gridItems.map((active, index) => (
        <div
          key={index}
          className={`w-4 h-4 rounded-sm ${
            active ? 'bg-green-500' : 'bg-gray-200'
          }`}
        />
      ))}
    </div>
  );
}

export function HabitTracker({ initialHabits }: { initialHabits: Habit[] }) {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    setHabits(initialHabits);
  }, [initialHabits]);

  function handleAddHabit(newHabit: Habit) {
    setHabits((prevHabits) => [...prevHabits, newHabit]);
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white rounded-xl shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <div className="flex space-x-4">
          <button className="px-4 py-2 rounded-full bg-gray-200">Today</button>
          <button className="px-4 py-2 rounded-full bg-gray-200">Weekly</button>
          <button className="px-4 py-2 rounded-full bg-green-200">Overall</button>
        </div>
      </div>
      <div className="space-y-4">
        {habits.map((habit) => (
          <div key={habit.id} className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                {/* <span className="text-2xl">📚</span> */}
                <span className="font-semibold">{habit.name}</span>
              </div>
              <div className="flex items-center space-x-2">
                <CalendarDays size={16} />
                <span>0 Days</span>
              </div>
            </div>
            <HabitGrid
              streakDays={0}
              totalDays={100}
            />
          </div>
        ))}
        <button
          className="w-full py-2 bg-gray-100 rounded-lg text-gray-600 flex items-center justify-center"
          onClick={() => setIsModalOpen(true)}
        >
          <span className="text-2xl mr-2">+</span> Add new habit
        </button>
      </div>
      <AddHabitModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onHabitAdded={handleAddHabit}
      />
    </div>
  );
}