'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Calendar, CheckCircle, AlertCircle, Trophy, Bell } from 'lucide-react'
import { withAuth } from './withAuth'
import HabitProgressGrid from './HabitProgressGrid'
import { createClient } from '@supabase/supabase-js'
import StreaksAndMilestones from './StreaksAndMilestones'

// Initialize Supabase client using environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

const supabase = createClient(supabaseUrl, supabaseAnonKey)

function DashboardComponent() {
  const [habits, setHabits] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    // Fetch the current user
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
    }

    fetchUser()
  }, [])

  useEffect(() => {
    if (user) {
      const fetchHabits = async () => {
        const { data, error } = await supabase
          .from('habits')
          .select(`
            id,
            habit_name,
            goal,
            habit_entries (
              entry_date,
              status
            ),
            habit_streaks (
              current_streak,
              longest_streak,
              last_completed_date
            )
          `)
          .eq('user_id', user.id)
          .order('created_at', { ascending: false })

        if (error) {
          console.error('Error fetching habits:', error)
        } else {
          console.log('Fetched habits data:', data) // For debugging
          const processedHabits = data.map(habit => ({
            id: habit.id,
            name: habit.habit_name,
            icon: '📌',
            goal: habit.goal,
            progress: calculateProgress(habit.habit_entries),
            currentStreak: habit.habit_streaks?.current_streak || 0,
            longestStreak: habit.habit_streaks?.longest_streak || 0,
            lastCompletedDate: habit.habit_streaks?.last_completed_date,
            completionData: processCompletionData(habit.habit_entries)
          }))
          console.log('Processed habits:', processedHabits) // For debugging
          setHabits(processedHabits)
        }
      }

      fetchHabits()
    }
  }, [user])

  const calculateProgress = (entries) => {
    return entries.filter(entry => entry.status).length
  }

  const processCompletionData = (entries) => {
    return entries.slice(0, 7).map(entry => entry.status)
  }

  const toggleHabitCompletion = async (id: string) => {
    const habit = habits.find(h => h.id === id)
    const today = new Date().toISOString().split('T')[0]
    
    // First, check if an entry already exists for today
    const { data: existingEntry, error: fetchError } = await supabase
      .from('habit_entries')
      .select('*')
      .eq('habit_id', id)
      .eq('entry_date', today)
      .single()

    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching habit entry:', fetchError)
      return
    }

    let result
    if (existingEntry) {
      // If entry exists, update it
      result = await supabase
        .from('habit_entries')
        .update({ status: !existingEntry.status })
        .eq('id', existingEntry.id)
    } else {
      // If entry doesn't exist, insert a new one
      result = await supabase
        .from('habit_entries')
        .insert({
          habit_id: id,
          entry_date: today,
          status: true // Assuming toggling from non-existent (false) to completed (true)
        })
    }

    const { error } = result

    if (error) {
      console.error('Error updating habit completion:', error)
    } else {
      // Update streaks
      await updateHabitStreak(id, habit.lastCompletedDate)
      
      // Update local state
      setHabits(habits.map(h => 
        h.id === id ? { 
          ...h, 
          completionData: [...h.completionData.slice(0, -1), !h.completionData[h.completionData.length - 1]],
          lastCompletedDate: today
        } : h
      ))
    }
  }

  const updateHabitStreak = async (habitId: string, lastCompletedDate: string) => {
    const today = new Date().toISOString().split('T')[0]
    const yesterday = new Date(new Date().setDate(new Date().getDate() - 1)).toISOString().split('T')[0]
    
    let { data: streakData, error: streakError } = await supabase
      .from('habit_streaks')
      .select('*')
      .eq('habit_id', habitId)
      .single()

    if (streakError && streakError.code !== 'PGRST116') {
      console.error('Error fetching habit streak:', streakError)
      return
    }

    let newCurrentStreak = 1
    let newLongestStreak = streakData?.longest_streak || 0

    if (lastCompletedDate === yesterday) {
      newCurrentStreak = (streakData?.current_streak || 0) + 1
    }

    if (newCurrentStreak > newLongestStreak) {
      newLongestStreak = newCurrentStreak
    }

    const { error: updateError } = await supabase
      .from('habit_streaks')
      .upsert({
        habit_id: habitId,
        current_streak: newCurrentStreak,
        longest_streak: newLongestStreak,
        last_completed_date: today
      })

    if (updateError) {
      console.error('Error updating habit streak:', updateError)
    } else {
      // Update local state
      setHabits(habits.map(h => 
        h.id === habitId ? { 
          ...h, 
          currentStreak: newCurrentStreak,
          longestStreak: newLongestStreak,
          lastCompletedDate: today
        } : h
      ))
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFA07A] to-[#FFE4B5] text-gray-800">
      <header className="w-full py-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-2"
        >
          Your Habit Dashboard
        </motion.h1>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Daily Check-in</h2>
          <div className="space-y-4">
            {habits.map(habit => (
              <div key={habit.id} className="flex items-center justify-between bg-white rounded-lg p-4">
                <span>{habit.name}</span>
                <Switch
                  checked={habit.completionData[habit.completionData.length - 1]}
                  onCheckedChange={() => toggleHabitCompletion(habit.id)}
                />
              </div>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Progress Tracking</h2>
          <Tabs defaultValue="daily">
            <TabsList>
              <TabsTrigger value="daily">Daily</TabsTrigger>
              <TabsTrigger value="weekly">Weekly</TabsTrigger>
              <TabsTrigger value="overall">Overall</TabsTrigger>
            </TabsList>
            <TabsContent value="daily">
              <HabitProgressGrid view="daily" habits={habits} />
            </TabsContent>
            <TabsContent value="weekly">
              <HabitProgressGrid view="weekly" habits={habits} />
            </TabsContent>
            <TabsContent value="overall">
              <HabitProgressGrid view="overall" habits={habits} />
            </TabsContent>
          </Tabs>
        </motion.section>

        <StreaksAndMilestones habits={habits} />

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Upcoming Reminders</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="mr-2 h-5 w-5 text-blue-500" />
                Today's Reminders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>Meditate at 7:00 PM</span>
                </li>
                <li className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-yellow-500" />
                  <span>Read before bed at 10:00 PM</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </motion.section>
      </main>
    </div>
  )
}

export default withAuth(DashboardComponent)