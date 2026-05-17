import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import GlaidoProfilePage from './components/GlaidoProfilePage';

export default function App() {
  const [view, setView] = useState<'landing' | 'portal'>('landing');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onEnterPortal={() => setView('portal')} />
      ) : (
        <GlaidoProfilePage onBack={() => setView('landing')} />
      )}
    </>
  );
}
