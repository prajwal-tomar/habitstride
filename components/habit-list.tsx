'use client'

import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchHabits } from '@/lib/db';
import { Habit } from '@/types/habit';

export function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadHabits() {
      setIsLoading(true);
      const fetchedHabits = await fetchHabits();
      setHabits(fetchedHabits);
      setIsLoading(false);
    }

    loadHabits();
  }, []);

  if (isLoading) {
    return <div>Loading habits...</div>;
  }

  return (
    <div className="h-[150px] overflow-y-auto pr-2">
      <ul className="space-y-4">
        {habits.map((habit) => (
          <li key={habit.id} className="flex items-center justify-between">
            <span>{habit.name}</span>
            <Button variant="default" size="sm">
              <CheckCircle size={18} className={habit.completed ? 'text-green-500' : 'text-gray-400'} />
            </Button>
          </li>
        ))}
      </ul>
    </div>
  );
}