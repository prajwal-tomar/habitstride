import { Settings } from '@/components/settings'
import { Header } from '@/components/header'
import { ProtectedRoute } from '@/components/protected-route'

export default function SettingsPage() {
  return (
    <ProtectedRoute>
        <Header />
    <div><Settings /> </div>
    </ProtectedRoute>
  )
}
