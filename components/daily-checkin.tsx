'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { CheckCircle, Sun, Moon, Coffee, Book, Droplet } from "lucide-react"

const habits = [
  { id: 1, name: 'Morning Meditation', icon: <Sun className="w-6 h-6" /> },
  { id: 2, name: 'Read 30 Minutes', icon: <Book className="w-6 h-6" /> },
  { id: 3, name: 'Drink 8 Glasses of Water', icon: <Droplet className="w-6 h-6" /> },
  { id: 4, name: 'Evening Reflection', icon: <Moon className="w-6 h-6" /> },
]

const encouragingMessages = [
  "You're doing great!",
  "Keep up the good work!",
  "Every small step counts!",
  "You're making progress!",
  "Consistency is key!",
]

interface Habit {
  id: number;
  name: string;
  icon: React.ReactNode;
}

interface HabitCardProps {
  habit: Habit;
  onStatusChange: (id: number, status: string) => void;
  status: string;
}

const HabitCard: React.FC<HabitCardProps> = ({ habit, onStatusChange, status }) => {
  const [showMessage, setShowMessage] = useState(false);

  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStatus = event.target.value;
    onStatusChange(habit.id, newStatus);
    setShowMessage(true);
    setTimeout(() => setShowMessage(false), 2000);
  }

  return (
    <motion.div
      className={`bg-white rounded-lg shadow-md p-6 ${status === 'Completed' ? 'bg-green-100' : status === 'Partial' ? 'bg-yellow-100' : 'bg-red-100'}`}
      whileHover={{ scale: 1.02 }}
      layout
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <div className="mr-3 text-blue-500">{habit.icon}</div>
          <h3 className="text-lg font-semibold text-gray-700">{habit.name}</h3>
        </div>
        <div className="flex space-x-2">
          <label>
            <input
              type="radio"
              name={`status-${habit.id}`}
              value="Completed"
              checked={status === 'Completed'}
              onChange={handleStatusChange}
            />
            Completed
          </label>
          <label>
            <input
              type="radio"
              name={`status-${habit.id}`}
              value="Partial"
              checked={status === 'Partial'}
              onChange={handleStatusChange}
            />
            Partial
          </label>
          <label>
            <input
              type="radio"
              name={`status-${habit.id}`}
              value="Missed"
              checked={status === 'Missed'}
              onChange={handleStatusChange}
            />
            Missed
          </label>
        </div>
      </div>
      <AnimatePresence>
        {showMessage && (
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-green-500 mt-2"
          >
            {encouragingMessages[Math.floor(Math.random() * encouragingMessages.length)]}
          </motion.p>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

const ProgressDisplay = ({ completedHabits }: { completedHabits: number }) => {
  const progress = (completedHabits / habits.length) * 100

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-semibold text-black mb-4">Today's Progress</h2>
      <div className="bg-white rounded-lg shadow-md p-6">
        <Progress value={progress} className="h-4 mb-2" />
        <p className="text-center text-gray-600">
          {completedHabits} out of {habits.length} habits completed
        </p>
      </div>
    </div>
  )
}

export default function HabitTrackingSystem() {
  const [habitStatuses, setHabitStatuses] = useState<{ [key: number]: string }>({});
  const [showCelebration, setShowCelebration] = useState(false);

  const handleStatusChange = (habitId: number, status: string) => {
    setHabitStatuses(prevStatuses => ({ ...prevStatuses, [habitId]: status }));
  }

  const handleSubmit = () => {
    const completedHabits = Object.values(habitStatuses).filter(status => status === 'Completed').length;
    if (completedHabits === habits.length) {
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 3000);
    }
  }

  const completedHabits = Object.values(habitStatuses).filter(status => status === 'Completed').length;

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
            Your Daily Check-In
          </h1>
          <p className="text-xl text-black">
            Small steps lead to big changes. You&apos;ve got this!
          </p>
        </motion.header>

        <ProgressDisplay completedHabits={completedHabits} />

        <div className="space-y-4">
          {habits.map(habit => (
            <HabitCard
              key={habit.id}
              habit={habit}
              onStatusChange={handleStatusChange}
              status={habitStatuses[habit.id] || 'Missed'}
            />
          ))}
        </div>

        <div className="text-center mt-8">
          <Button onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-600 text-white">
            Log Progress
          </Button>
        </div>

        <AnimatePresence>
          {showCelebration && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
            >
              <div className="bg-white rounded-lg p-8 text-center">
                <h2 className="text-3xl font-bold text-gray-800 mb-4">
                  Congratulations!
                </h2>
                <p className="text-xl text-gray-600">
                  You've completed all your habits for today!
                </p>
                <Coffee className="w-16 h-16 text-yellow-500 mx-auto mt-4" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}