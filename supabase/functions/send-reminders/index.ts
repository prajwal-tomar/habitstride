import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from '@supabase/supabase-js';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req: Request) => {
  if (req.method === 'OPTIONS') return new Response('ok', { headers: corsHeaders })

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    const now = new Date()
    const currentTime = now.toISOString().substr(11, 5)

    // Fetch users with reminders set for the current time
    const { data: users, error } = await supabaseClient
      .from('profiles')
      .select('id, name, timezone, reminder_time, push_notifications, email_reminders')
      .eq('reminder_time', currentTime)

    if (error) throw error

    for (const user of users) {
      if (user.push_notifications) {
        // TODO: Implement push notification logic
        console.log(`Sending push notification to user ${user.id}`)
      }

      if (user.email_reminders) {
        // TODO: Implement email reminder logic
        console.log(`Sending email reminder to user ${user.id}`)
      }
    }

    return new Response(JSON.stringify({ success: true, usersNotified: users.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    })
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred';
    return new Response(JSON.stringify({ error: errorMessage }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    })
  }
})
