import ProfileSetup from '@/components/profile'
import { ProtectedRoute } from '@/components/protected-route';
import { Header } from '@/components/header';

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <Header />
    <div><ProfileSetup /></div>
    </ProtectedRoute>
  )
}
