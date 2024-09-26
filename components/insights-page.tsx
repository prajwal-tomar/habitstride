'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Progress } from "@/components/ui/progress"
import { PenSquare, Dumbbell, ArrowRight, Share2 } from 'lucide-react'
import { withAuth } from './withAuth'

function MotivationalFeedback() {
  const [reflection, setReflection] = useState('')
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })
  const currentTime = new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFA07A] to-[#FFE4B5] text-gray-800">
      <header className="w-full py-8 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold mb-2"
        >
          Your Progress Today
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg"
        >
          {currentDate} | {currentTime}
        </motion.p>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-8">
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-6 mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">GPT-4 Feedback</h2>
          <p className="text-lg mb-4">
            Great job! 🎉 You're 85% on track with your goal! Keep up the fantastic work, and remember: every step forward is progress.
          </p>
          <Progress value={85} className="h-2 mb-2" />
          <p className="text-sm text-gray-600">4/5 tasks completed this week</p>
          <p className="text-sm font-semibold text-green-600">Almost there! Keep going!</p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold mb-4">Next Steps</h2>
          <div className="space-y-4">
            <div className="flex items-center">
              <Dumbbell className="mr-2 h-5 w-5 text-blue-500" />
              <span>Complete your workout for today</span>
            </div>
            <div className="flex items-center">
              <PenSquare className="mr-2 h-5 w-5 text-green-500" />
              <span>Log your journal entry</span>
            </div>
          </div>
          <Button className="mt-4 bg-blue-500 hover:bg-blue-600 text-white">
            Let's Get Started! <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mb-8"
        >
          <div className="bg-gray-100 rounded-lg p-6 relative overflow-hidden">
            <div 
              className="absolute inset-0 bg-cover bg-center opacity-10" 
              style={{backgroundImage: "url('https://images.unsplash.com/photo-1519681393784-d120267933ba?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"}}
            ></div>
            <h2 className="text-2xl font-semibold mb-4 relative z-10">Daily Reflection</h2>
            <p className="mb-4 relative z-10">How did you feel about your progress today?</p>
            <Textarea
              value={reflection}
              onChange={(e) => setReflection(e.target.value)}
              placeholder="Take a moment to reflect on your efforts. You've got this!"
              className="w-full mb-4 relative z-10"
              rows={4}
            />
            <Button className="bg-green-500 hover:bg-green-600 text-white relative z-10">
              Save Reflection
            </Button>
          </div>
        </motion.section>
      </main>

      <footer className="w-full py-8 text-center bg-white">
        <p className="text-lg font-semibold mb-4">Every small step counts! 👍</p>
        <div className="flex justify-center space-x-4">
          <Button variant="outline" className="flex items-center">
            <Share2 className="mr-2 h-4 w-4" /> Share Progress
          </Button>
        </div>
      </footer>
    </div>
  )
}

export default withAuth(MotivationalFeedback)