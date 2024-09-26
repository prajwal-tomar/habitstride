import { motion } from 'framer-motion'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle, Trophy } from 'lucide-react'

interface Habit {
  id: string
  name: string
  current_streak: number
  longest_streak: number
  last_completed_date: string
}

interface StreaksAndMilestonesProps {
  habits: Habit[]
}

export default function StreaksAndMilestones({ habits }: StreaksAndMilestonesProps) {
  console.log('Habits received in StreaksAndMilestones:', habits) // Add this line
  const sortedHabits = [...habits].sort((a, b) => b.currentStreak - a.currentStreak)
  const topHabit = sortedHabits[0]
  const longestEverStreak = Math.max(...habits.map(h => h.longestStreak))
  console.log('Longest ever streak:', longestEverStreak) // Add this line

  const getMilestoneMessage = (streak: number) => {
    if (streak >= 365) return "1 Year Milestone!"
    if (streak >= 180) return "6 Months Streak!"
    if (streak >= 90) return "3 Months Consistency!"
    if (streak >= 30) return "1 Month Achievement!"
    if (streak >= 7) return "1 Week Streak!"
    return "Keep going!"
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="mb-8"
    >
      <h2 className="text-2xl font-semibold mb-4">Streaks & Milestones</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CheckCircle className="mr-2 h-5 w-5 text-green-500" />
              Current Top Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-bold">{topHabit?.currentStreak || 0} days</p>
            <p className="text-sm text-gray-600">{topHabit?.name || 'No habits yet'}</p>
            <p className="text-sm text-gray-600">{getMilestoneMessage(topHabit?.currentStreak || 0)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
              All-Time Best Streak
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xl font-semibold">{longestEverStreak} days</p>
            <p className="text-sm text-gray-600">
              {habits.find(h => h.longestStreak === longestEverStreak)?.name || 'No habits yet'}
            </p>
            <p className="text-sm text-gray-600">{getMilestoneMessage(longestEverStreak)}</p>
          </CardContent>
        </Card>
      </div>
    </motion.section>
  )
}