import HabitTrackingSystem from '@/components/daily-checkin'
import { Header } from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'
import React from 'react'

export default function DailyCheckinPage() {
  return (
    <ProtectedRoute>
      <Header />
      <><HabitTrackingSystem /></>
    </ProtectedRoute>
  )
}
