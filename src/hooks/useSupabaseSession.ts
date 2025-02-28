// import './index.css'
import { useState, useEffect } from 'react';
import { Session } from '@supabase/supabase-js';
import { default as supabaseClient } from '@/lib/supabase.config';


const supabase = supabaseClient;

const useSupabaseSession = () => {
  const [supabaseSession, setsupabaseSession] = useState<Session | null>(null)

  /* eslint-disable no-console */
  console.log("Testing");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setsupabaseSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setsupabaseSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

  return {supabaseSession};
}

export default useSupabaseSession;
