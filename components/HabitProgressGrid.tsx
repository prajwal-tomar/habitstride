import { useState } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from 'lucide-react'
import { cn } from "@/lib/utils"

interface Habit {
  id: number
  name: string
  icon: string
  streak: number
  completionData: boolean[]
}

interface HabitProgressGridProps {
  view: 'daily' | 'weekly' | 'overall'
  habits: Habit[]
}

export default function HabitProgressGrid({ view, habits }: HabitProgressGridProps) {
  const [selectedHabit, setSelectedHabit] = useState<number | null>(null)

  const renderDailyView = () => (
    <div className="space-y-4">
      {habits.map(habit => (
        <div key={habit.id} className="flex items-center justify-between bg-white rounded-lg p-4">
          <div className="flex items-center">
            <span className="mr-2">{habit.icon}</span>
            <span>{habit.name}</span>
            <span className="ml-2 text-sm text-orange-500">🔥 {habit.streak} days</span>
          </div>
          {habit.completionData[habit.completionData.length - 1] ? (
            <Check className="text-green-500" />
          ) : (
            <X className="text-red-500" />
          )}
        </div>
      ))}
    </div>
  )

  const renderWeeklyView = () => (
    <div className="space-y-4">
      {habits.map(habit => (
        <div key={habit.id} className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center">
              <span className="mr-2">{habit.icon}</span>
              <span>{habit.name}</span>
              <span className="ml-2 text-sm text-orange-500">🔥 {habit.streak} days</span>
            </div>
          </div>
          <div className="flex justify-between">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
              <div key={day} className="text-center">
                <div className="text-xs mb-1">{day}</div>
                <div 
                  className={cn(
                    "w-6 h-6 rounded-full",
                    habit.completionData[habit.completionData.length - 7 + index]
                      ? "bg-green-500"
                      : "bg-red-500"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  const renderOverallView = () => (
    <div className="space-y-8">
      {habits.map(habit => (
        <div key={habit.id} className="bg-white rounded-lg p-4">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <span className="mr-2">{habit.icon}</span>
              <span className="font-semibold">{habit.name}</span>
              <span className="ml-2 text-sm text-orange-500">🔥 {habit.streak} days</span>
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1">
            {habit.completionData.map((completed, index) => (
              <div 
                key={index}
                className={cn(
                  "w-4 h-4 rounded-sm",
                  completed ? "bg-green-500" : "bg-red-500"
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  )

  return (
    <Card>
      <CardContent className="pt-6">
        {view === 'daily' && renderDailyView()}
        {view === 'weekly' && renderWeeklyView()}
        {view === 'overall' && renderOverallView()}
      </CardContent>
    </Card>
  )
}