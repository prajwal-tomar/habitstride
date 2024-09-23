'use client'

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const HabitStrideDashboard = () => {
  const [habits, setHabits] = useState([
    { id: 1, title: 'Morning Workout', completed: false, streak: 5 },
    { id: 2, title: 'Read 30 minutes', completed: false, streak: 3 },
    { id: 3, title: 'Meditate', completed: false, streak: 7 },
  ]);

  const [activeView, setActiveView] = useState('daily');

  function toggleHabit(id: number) {
    setHabits(habits.map(habit => 
      habit.id === id ? { ...habit, completed: !habit.completed } : habit
    ));
  }

  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <TooltipProvider>
      <div className="min-h-screen bg-gradient-to-br from-[#FFA07A] to-[#FFE4B5] text-gray-800">
        <main className="container mx-auto mt-8 p-4">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-2">Your Habit Dashboard</h1>
            <p className="text-lg">{currentDate}</p>
          </motion.header>

          <div className="flex flex-col lg:flex-row gap-8">
            <motion.section
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-1/3"
            >
              <Card className="bg-white shadow-lg">
                <CardHeader>
                  <h2 className="text-2xl font-semibold">Your Habits</h2>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    {habits.map(habit => (
                      <li key={habit.id} className="bg-gray-50 p-4 rounded-lg shadow">
                        <div className="flex items-center justify-between">
                          <span className="text-lg">{habit.title}</span>
                          <Button
                            variant={habit.completed ? "default" : "outline"}
                            size="sm"
                            onClick={() => toggleHabit(habit.id)}
                          >
                            <CheckCircle size={18} className={habit.completed ? "text-green-500" : "text-gray-400"} />
                          </Button>
                        </div>
                        <Progress value={habit.streak * 10} className="mt-2" />
                        <div className="text-sm text-gray-600 mt-1">
                          🔥 {habit.streak} day streak
                        </div>
                      </li>
                    ))}
                  </ul>
                  <Button className="w-full mt-6" variant="outline">
                    <PlusCircle size={18} className="mr-2" />
                    Add New Habit
                  </Button>
                </CardContent>
              </Card>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full lg:w-2/3"
            >
              <Card className="bg-white shadow-lg">
                <CardHeader className="flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Habit Grid</h2>
                  <Tabs value={activeView} onValueChange={setActiveView}>
                    <TabsList>
                      <TabsTrigger value="daily">Daily</TabsTrigger>
                      <TabsTrigger value="weekly">Weekly</TabsTrigger>
                      <TabsTrigger value="overall">Overall</TabsTrigger>
                    </TabsList>
                  </Tabs>
                </CardHeader>
                <CardContent>
                  <TabsContent value="daily" className="mt-4">
                    <div className="grid grid-cols-7 gap-2">
                      {[...Array(7)].map((_, index) => (
                        <Tooltip key={index}>
                          <TooltipTrigger>
                            <div 
                              className={`
                                w-12 h-12 rounded-md cursor-pointer transition-colors duration-300
                                ${index % 3 === 0 ? 'bg-green-200 hover:bg-green-300' : 
                                  index % 3 === 1 ? 'bg-yellow-200 hover:bg-yellow-300' : 
                                  'bg-red-200 hover:bg-red-300'}
                              `}
                            />
                          </TooltipTrigger>
                          <TooltipContent>
                            {new Date(Date.now() - (6 - index) * 24