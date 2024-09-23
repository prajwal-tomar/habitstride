import { CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function HabitList() {
  // This is a placeholder. In a real application, you'd fetch this data from your backend.
  const habits = [
    { id: 1, title: 'Morning Workout', completed: false },
    { id: 2, title: 'Read 30 minutes', completed: true },
    { id: 3, title: 'Meditate', completed: false },
  ];

  return (
    <ul className="space-y-4">
      {habits.map((habit) => (
        <li key={habit.id} className="flex items-center justify-between">
          <span>{habit.title}</span>
          <Button variant="default" size="sm">
            <CheckCircle size={18} className={habit.completed ? 'text-green-500' : 'text-gray-400'} />
          </Button>
        </li>
      ))}
    </ul>
  );
}