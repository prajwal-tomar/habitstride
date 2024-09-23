import ProfileSetup from '@/components/profile'
import { Header } from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'

export default function OnboardingPage() {
  return (
    <ProtectedRoute>
      <Header />
    <div><ProfileSetup /></div>
    </ProtectedRoute>
  )
}
