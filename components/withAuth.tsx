import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '../supabaseClient'

export function withAuth(WrappedComponent: React.ComponentType) {
  return function AuthComponent(props: any) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
      const checkAuth = async () => {
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

        if (!profile || !profile.onboarded) {
          router.push('/onboarding')
        } else {
          setIsLoading(false)
        }
      }

      checkAuth()
    }, [router])

    if (isLoading) {
      return <div>Loading...</div>
    }

    return <WrappedComponent {...props} />
  }
}