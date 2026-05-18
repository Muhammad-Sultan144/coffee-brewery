import React, { useState, useEffect } from 'react';
import LandingPage from './components/LandingPage';
import Sultan's ParlourProfilePage from './components/Sultan's ParlourProfilePage';
import { supabase } from './lib/supabaseClient';

export default function App() {
  const [view, setView] = useState<'landing' | 'portal'>('landing');
  const [user, setUser] = useState<any>(null);

  // Initialize Supabase Auth Session listener
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <>
      {view === 'landing' ? (
        <LandingPage 
          user={user} 
          onEnterPortal={() => setView('portal')} 
        />
      ) : (
        <Sultan's ParlourProfilePage 
          user={user} 
          onBack={() => setView('landing')} 
        />
      )}
    </>
  );
}
