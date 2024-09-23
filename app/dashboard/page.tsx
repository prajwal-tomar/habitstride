'use client'

import { useState } from 'react';
import { Suspense } from 'react';
import { RecentActivity } from '@/components/recent-activity';
import { HabitList } from '@/components/habit-list';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { HabitTracker } from '@/components/habit-grid';
import { Header } from '@/components/header';
import { AddHabitModal } from '@/components/add-habit-modal';
import { Button } from '@/components/ui/button';

export default function DashboardPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleAddHabitClick() {
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
  }

  return (
    <>
      <Header />
      <div className='bg-gradient-to-b from-[#FFA07A] to-[#FFE4B5]'>
        <div className="max-w-6xl mx-auto px-4 py-8 ">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="md:col-span-2">
              <HabitTracker />
            </div>
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Today&apos;s Habits</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading habits...</div>}>
                    <HabitList />
                  </Suspense>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <Suspense fallback={<div>Loading recent activity...</div>}>
                    <RecentActivity />
                  </Suspense>
                </CardContent>
              </Card>
              <Button onClick={handleAddHabitClick} className="w-full mt-4">
                + Add New Habit
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && <AddHabitModal onClose={handleCloseModal} />}
    </>
  );
}
