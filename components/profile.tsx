'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabaseClient'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm, Controller } from 'react-hook-form'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { useDropzone } from 'react-dropzone'

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

interface ProfileFormData {
  username: string
  avatar_url: string
  bio: string
  habits: string[]
  reminder_time: string
  theme: string
}

export default function ProfileSetup() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const { data: { session }, error: authError } = await supabase.auth.getSession()
      if (authError || !session) {
        router.push('/login')
        return
      }

      const { data: profile, error: profileError } = await supabase
        .from('profile')
        .select('onboarded')
        .eq('id', session.user.id)
        .single()

      if (profileError) {
        console.error('Error fetching profile:', profileError)
        return
      }

      if (profile && profile.onboarded) {
        router.push('/dashboard')
      } else {
        setIsLoading(false)
      }
    }

    checkOnboardingStatus()
  }, [router])

  const { control, handleSubmit, setValue, watch } = useForm<ProfileFormData>({
    defaultValues: {
      username: '',
      avatar_url: '',
      bio: '',
      habits: [],
      reminder_time: '09:00',
      theme: 'light',
    }
  })
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null)

  const watchAvatarUrl = watch('avatar_url')

  useEffect(() => {
    // Update local avatarUrl state when form avatar_url changes
    setAvatarUrl(watchAvatarUrl)
  }, [watchAvatarUrl])

  const onSubmit = async (data: ProfileFormData) => {
    setIsLoading(true)
    try {
      const { data: { user }, error: authError } = await supabase.auth.getUser()
      
      if (authError) throw authError
      if (!user) throw new Error('User not authenticated')

      // Save user profile
      const { error: profileError } = await supabase
        .from('profile')
        .upsert({
          id: user.id,
          username: data.username,
          avatar_url: data.avatar_url,
          bio: data.bio,
          onboarded: true // Set onboarded to true
        })

      if (profileError) throw profileError

      // Save user habits
      const habitPromises = data.habits.map(habit => 
        supabase.from('habits').insert({
          user_id: user.id,
          habit_name: habit,
          goal: '', // You might want to add a goal field to your form if needed
        })
      )

      await Promise.all(habitPromises)

      // Save user preferences
      const { error: preferencesError } = await supabase
        .from('preferences')
        .upsert({
          id: user.id,
          reminder_time: data.reminder_time,
          theme: data.theme,
        })

      if (preferencesError) throw preferencesError

      // Navigate to the dashboard
      router.push('/dashboard')
    } catch (error) {
      console.error('Error saving profile:', error)
      toast.error('Failed to save profile. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAvatarUpload = async (file: File) => {
    try {
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random()}.${fileExt}`
      const filePath = `${fileName}`

      let { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file)

      if (uploadError) {
        throw uploadError
      }

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)
      
      if (data) {
        setValue('avatar_url', data.publicUrl)
        setAvatarUrl(data.publicUrl) // Update local state
        toast.success('Avatar uploaded successfully!')
      } else {
        throw new Error('Failed to get public URL')
      }
    } catch (error) {
      toast.error('Error uploading avatar!')
      console.error(error)
    }
  }

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      handleAvatarUpload(acceptedFiles[0])
    }
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    multiple: false
  })

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFA07A] to-[#FFE4B5] text-gray-800 py-12 px-4">
      {/* <FloatingBubbles /> */}
      <ToastContainer />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8"
      >
        <h1 className="text-3xl font-light text-black text-center mb-2">
          Let&apos;s set up your HabitStride profile!
        </h1>
        <p className="text-center text-gray-700 italic mb-8">
          Tell us about yourself, the habits you want to build, and your preferences.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Controller
              name="username"
              control={control}
              rules={{ required: 'Username is required' }}
              render={({ field }) => (
                <Input
                  {...field}
                  id="username"
                  placeholder="Enter your username"
                  className="mt-1 border-green-200"
                />
              )}
            />
          </div>

          <div>
            <Label>Profile Picture</Label>
            <div className="mt-1 flex items-center space-x-4">
              <div
                {...getRootProps()}
                className={`w-20 h-20 rounded-full border-2 border-dashed flex items-center justify-center cursor-pointer transition-colors ${
                  isDragActive ? 'border-green-500 bg-green-50' : 'border-gray-300'
                }`}
              >
                <input {...getInputProps()} />
                {avatarUrl ? (
                  <Avatar className="w-full h-full">
                    <AvatarImage src={avatarUrl} alt="Profile" />
                    <AvatarFallback>
                      {watch('username')?.charAt(0).toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                ) : (
                  <span className="text-gray-400">
                    {isDragActive ? 'Drop here' : 'Upload'}
                  </span>
                )}
              </div>
              <div className="flex-grow">
                <p className="text-sm text-gray-600 mb-2">
                  Drag and drop an image here, or click to select a file
                </p>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById('avatar-input')?.click()}
                >
                  Select File
                </Button>
                <input
                  id="avatar-input"
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      handleAvatarUpload(e.target.files[0])
                    }
                  }}
                  className="hidden"
                />
              </div>
            </div>
          </div>

          <div>
            <Label htmlFor="bio">Bio</Label>
            <Controller
              name="bio"
              control={control}
              render={({ field }) => (
                <Textarea
                  {...field}
                  id="bio"
                  placeholder="Tell us a bit about yourself"
                  className="mt-1 border-green-200"
                />
              )}
            />
          </div>

          <div>
            <h2 className="text-xl font-semibold text-green-600 mb-4">What habits would you like to build?</h2>
            <div className="space-y-2">
              {predefinedHabits.map((habit) => (
                <div key={habit.name} className="flex items-center space-x-2">
                  <Controller
                    name="habits"
                    control={control}
                    render={({ field }) => (
                      <Checkbox
                        id={habit.name}
                        checked={field.value.includes(habit.name)}
                        onCheckedChange={(checked) => {
                          const updatedHabits = checked
                            ? [...field.value, habit.name]
                            : field.value.filter((h) => h !== habit.name)
                          field.onChange(updatedHabits)
                        }}
                      />
                    )}
                  />
                  <Label htmlFor={habit.name} className="flex items-center space-x-2">
                    <span className="text-2xl">{habit.icon}</span>
                    <span>{habit.name}</span>
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="reminder_time">Daily Reminder Time</Label>
            <Controller
              name="reminder_time"
              control={control}
              render={({ field }) => (
                <Input
                  {...field}
                  type="time"
                  id="reminder_time"
                  className="mt-1 border-green-200"
                />
              )}
            />
          </div>

          <div>
            <Label htmlFor="theme">Theme Preference</Label>
            <Controller
              name="theme"
              control={control}
              render={({ field }) => (
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger className="w-full mt-1 border-green-200">
                    <SelectValue placeholder="Select a theme" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              )}
            />
          </div>

          <Button type="submit" className="w-full bg-coral-500 hover:bg-coral-600 text-black" disabled={isLoading}>
            {isLoading ? 'Saving...' : 'Save Profile and Preferences'}
          </Button>
        </form>
      </motion.div>
    </div>
  )
}