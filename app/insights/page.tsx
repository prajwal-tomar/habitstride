import MotivationalFeedback from '@/components/insights-page'
import { Header } from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'

export default function InsightsPage() {
  return (
    <ProtectedRoute>
      <Header />
    <div><MotivationalFeedback /></div>
    </ProtectedRoute>
  )
}
