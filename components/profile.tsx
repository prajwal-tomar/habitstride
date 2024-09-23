'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Bell, Mail, Upload, ArrowRight, ArrowLeft } from "lucide-react"
import { Checkbox } from "@/components/ui/checkbox"

interface Habit {
  name: string
  icon: string
}

const predefinedHabits: Habit[] = [
  { name: 'Exercise', icon: '🏋️' },
  { name: 'Drink Water', icon: '💧' },
  { name: 'Read', icon: '📚' },
  { name: 'Meditate', icon: '🧘' },
  { name: 'Sleep Early', icon: '🛌' },
]

const FloatingBubbles = () => (
  <div className="absolute top-0 left-0 w-full h-40 overflow-hidden pointer-events-none">
    {[...Array(10)].map((_, i) => (
      <motion.div
        key={i}
        className="absolute bg-white rounded-full opacity-20"
        style={{
          width: Math.random() * 20 + 10,
          height: Math.random() * 20 + 10,
          left: `${Math.random() * 100}%`,
        }}
        initial={{ y: 100, opacity: 0 }}
        animate={{
          y: -100,
          opacity: [0, 1, 0],
          transition: {
            duration: Math.random() * 3 + 2,
            repeat: Infinity,
            delay: Math.random() * 2,
          },
        }}
      />
    ))}
  </div>
)

export default function ProfileSetup() {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const [name, setName] = useState('')
  const [timezone, setTimezone] = useState('')
  const [selectedHabits, setSelectedHabits] = useState<string[]>([])
  const [customHabit, setCustomHabit] = useState('')
  const [reminderTime, setReminderTime] = useState('')
  const [pushNotifications, setPushNotifications] = useState(false)
  const [emailReminders, setEmailReminders] = useState(false)
  const [progress, setProgress] = useState(25)

  useEffect(() => {
    const completedSteps = [name, timezone, selectedHabits.length > 0, reminderTime].filter(Boolean).length
    setProgress(completedSteps * 25)
  }, [name, timezone, selectedHabits, reminderTime])

  const handleHabitToggle = (habit: string) => {
    setSelectedHabits(prev =>
      prev.includes(habit) ? prev.filter(h => h !== habit) : [...prev, habit]
    )
  }

  const handleAddCustomHabit = () => {
    if (customHabit && !selectedHabits.includes(customHabit)) {
      setSelectedHabits(prev => [...prev, customHabit])
      setCustomHabit('')
    }
  }

  const handleSubmit = async () => {
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError) throw authError
      if (!user) throw new Error('User not authenticated')

      // Save user profile
      const { data: userData, error: userError } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          name,
          timezone,
          reminder_time: reminderTime,
          push_notifications: pushNotifications,
          email_reminders: emailReminders,
        })
        .select()

      console.log('User Data:', userData)
      if (userError) throw userError

      // Save user habits
      const habitData = selectedHabits.map(habit => ({
        user_id: user.id,
        habit_name: habit,
        is_custom: !predefinedHabits.some(h => h.name === habit),
      }))

      const { data: habitDataResponse, error: habitError } = await supabase
        .from('habits')
        .upsert(habitData)
        .select()

      console.log('Habit Data:', habitDataResponse)
      if (habitError) throw habitError

      // Navigate to the dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving profile:', error)
      // TODO: Show error message to user
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFA07A] to-[#FFE4B5] text-gray-800 py-12 px-4">
      <FloatingBubbles />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <h1 className="text-3xl font-light text-gray-600 text-center mb-2">
          Let&apos;s get started on your journey with HabitStride!
        </h1>
        <p className="text-center text-gray-500 italic mb-8">
          Tell us about yourself and the habits you want to build.
        </p>

        <div className="space-y-6">
          <div>
            <Label htmlFor="name">Your Name</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-1 border-green-200"
            />
          </div>

          <div>
            <Label htmlFor="timezone">Timezone</Label>
            <Select onValueChange={setTimezone}>
              <SelectTrigger id="timezone" className="mt-1">
                <SelectValue placeholder="Select your timezone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pst">Pacific Standard Time (PST)</SelectItem>
                <SelectItem value="est">Eastern Standard Time (EST)</SelectItem>
                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                {/* Add more timezone options as needed */}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Profile Picture (Optional)</Label>
            <div className="mt-1 flex items-center justify-center w-32 h-32 border-2 border-dashed border-gray-300 rounded-full hover:border-green-200 transition-colors">
              <Button variant="ghost" className="w-full h-full rounded-full">
                <Upload className="w-6 h-6 text-gray-400" />
              </Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-green-600 mb-4">What habits would you like to build?</h2>
            <div className="space-y-2">
              {predefinedHabits.map((habit) => (
                <div key={habit.name} className="flex items-center space-x-2">
                  <Checkbox
                    id={habit.name}
                    checked={selectedHabits.includes(habit.name)}
                    onCheckedChange={() => handleHabitToggle(habit.name)}
                  />
                  <Label htmlFor={habit.name} className="flex items-center space-x-2">
                    <span className="text-2xl">{habit.icon}</span>
                    <span>{habit.name}</span>
                  </Label>
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-2">
              <Input
                value={customHabit}
                onChange={(e) => setCustomHabit(e.target.value)}
                placeholder="Add your own habit"
                className="flex-grow"
              />
              <Button onClick={handleAddCustomHabit}>Add</Button>
            </div>
          </div>

          <div>
            <h2 className="text-xl font-semibold text-coral-500 mb-4">Set Your Reminders</h2>
            <div className="flex items-center space-x-4">
              <Input
                type="time"
                value={reminderTime}
                onChange={(e) => setReminderTime(e.target.value)}
                className="border-coral-200"
              />
              <div className="flex items-center space-x-2">
                <Switch
                  id="push-notifications"
                  checked={pushNotifications}
                  onCheckedChange={setPushNotifications}
                />
                <Label htmlFor="push-notifications" className="flex items-center space-x-2">
                  <Bell className="w-4 h-4 text-green-500" />
                  <span>Push Notifications</span>
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="email-reminders"
                  checked={emailReminders}
                  onCheckedChange={setEmailReminders}
                />
                <Label htmlFor="email-reminders" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4 text-blue-500" />
                  <span>Email Reminders</span>
                </Label>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <Progress value={progress} className="h-2 mb-2" />
          <p className="text-center text-lg font-semibold text-green-600">
            You&apos;re almost there! Keep going.
          </p>
        </div>

        <div className="mt-8 flex justify-between items-center">
          <Button variant="link" className="text-gray-500">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <Button className="bg-coral-500 hover:bg-coral-600 text-white px-6 py-2" onClick={handleSubmit}>
            Next
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </motion.div>
    </div>
  )
}