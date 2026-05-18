import React, { useState } from 'react';
import { 
  Coffee, 
  ArrowRight, 
  Cpu, 
  Gauge, 
  RotateCw, 
  Thermometer, 
  Sparkles,
  Zap,
  ChevronRight,
  LogOut,
  UserCheck
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface LandingPageProps {
  user: any;
  onEnterPortal: () => void;
}

type CoffeeRoast = 'geisha' | 'sl28' | 'obsidian';

interface RoastSettings {
  name: string;
  roastLevel: string;
  recommendedTemp: number;
  pressureProfile: string;
  ratio: string;
  targetYield: string;
  description: string;
}

const ROASTS_DATA: Record<CoffeeRoast, RoastSettings> = {
  geisha: {
    name: "Panama Geisha Washed Light",
    roastLevel: "Ultra-Light (Filter/Espresso)",
    recommendedTemp: 94,
    pressureProfile: "Declining Pressure (9 bar to 5 bar)",
    ratio: "1:2.5 (18g in, 45g out)",
    targetYield: "22.5% EY (High Acidity, Bergamot & Jasmine)",
    description: "Designed for floral complexity. Requires high water temperature and declining pressure to extract solubles without bitterness."
  },
  sl28: {
    name: "Kenya SL28 Acidic Medium",
    roastLevel: "Light-Medium (High Density)",
    recommendedTemp: 92,
    pressureProfile: "Flat 9 Bar Profile with 6s Pre-infusion",
    ratio: "1:2.0 (18g in, 36g out)",
    targetYield: "21.8% EY (Blackcurrant, Sparkling Malic Acidity)",
    description: "Dense, hard bean structure. Responds best to flat 9 bar pressure after a prolonged pre-infusion hold to fully saturate the puck."
  },
  obsidian: {
    name: "Sultan's Parlour Obsidian Dark Blend",
    roastLevel: "Elite Medium-Dark (High Caramel)",
    recommendedTemp: 89,
    pressureProfile: "Low Temp Lever Profile (6 bar peak)",
    ratio: "1:1.5 (20g in, 30g out Ristretto)",
    targetYield: "20.2% EY (Dark Chocolate, Heavy Molasses Body)",
    description: "Highly soluble roast. We suggest lower extraction temperature and a short ratio to isolate chocolatey compounds and avoid dry tannins."
  }
};

export default function LandingPage({ user, onEnterPortal }: LandingPageProps) {
  const [selectedRoast, setSelectedRoast] = useState<CoffeeRoast>('geisha');
  const [simulateExtraction, setSimulateExtraction] = useState(false);
  const [extractionProgress, setExtractionProgress] = useState(0);
  const [activeYield, setActiveYield] = useState('0.0%');

  // Auth States
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [authSuccess, setAuthSuccess] = useState('');

  const startExtractionSimulation = () => {
    if (simulateExtraction) return;
    setSimulateExtraction(true);
    setExtractionProgress(0);
    setActiveYield('0.0%');
    
    let current = 0;
    const interval = setInterval(() => {
      current += 2;
      setExtractionProgress(current);
      // Dynamic EY growth simulation
      const calculatedEY = ((current / 100) * 22.5).toFixed(1);
      setActiveYield(`${calculatedEY}%`);
      
      if (current >= 100) {
        clearInterval(interval);
        setTimeout(() => {
          setSimulateExtraction(false);
        }, 1500);
      }
    }, 60);
  };

  const handleAuthAction = async () => {
    setAuthError('');
    setAuthSuccess('');
    
    if (!email || !password) {
      setAuthError('Error: Please complete all parameter fields.');
      return;
    }

    try {
      if (authMode === 'signin') {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        setAuthSuccess('Success: Barista key verified! Synced.');
        setTimeout(() => {
          setShowAuthModal(false);
          setAuthSuccess('');
          setEmail('');
          setPassword('');
        }, 1200);
      } else {
        const { error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;
        setAuthSuccess('Success: Account created! Try logging in now.');
        setAuthMode('signin');
      }
    } catch (err: any) {
      setAuthError(`Error: ${err.message || 'Authentication calibration failure.'}`);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  const activeRoast = ROASTS_DATA[selectedRoast];

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans selection:bg-[#BFF549] selection:text-black">
      
      {/* 1. HEADER */}
      <header className="border-b border-[#252525] bg-[#0D0D0D]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/brand-identity/resources/logo.png" alt="Sultan's Parlour Logo" className="h-8 w-auto rounded-md shadow-lg border border-[#BFF549]/20" />
            <span className="font-bold text-xl uppercase tracking-wider font-sans">Sultan's Parlour</span>
          </div>
          <span className="text-[#252525] font-light">/</span>
          <span className="text-[#B6B6B6] text-xs uppercase tracking-widest font-mono">Espresso Lab</span>
        </div>
        
        <div className="flex items-center gap-4 md:gap-6">
          {user ? (
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-mono text-[#BFF549] hidden md:flex items-center gap-1.5 bg-[#BFF549]/10 border border-[#BFF549]/20 px-2.5 py-1">
                <UserCheck size={10} />
                BARISTA: {user.email.length > 15 ? `${user.email.substring(0, 15)}...` : user.email}
              </span>
              <button 
                onClick={handleSignOut}
                className="bg-transparent text-red-400 border border-red-950 hover:border-red-900 font-bold text-xs px-3.5 py-2 rounded-[2px] transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <LogOut size={12} />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <button 
              onClick={() => {
                setAuthMode('signin');
                setShowAuthModal(true);
              }}
              className="bg-transparent text-white border border-[#252525] hover:border-[#BFF549] font-bold text-xs px-4 py-2 rounded-[2px] transition-all cursor-pointer"
            >
              Sign In
            </button>
          )}

          <button 
            onClick={onEnterPortal}
            className="bg-[#BFF549] text-black font-bold text-xs px-5 py-2.5 rounded-[2px] hover:bg-[#A6D83F] active:scale-95 transition-all shadow-none flex items-center gap-2 cursor-pointer"
          >
            <span>Launch Roast Portal</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative min-h-[80vh] w-full flex items-center justify-center border-b border-[#252525] overflow-hidden py-16 px-6">
        
        {/* Glow Effects */}
        <div className="absolute inset-0 bg-[#0D0D0D] z-0" />
        <div className="absolute top-1/4 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-[#BFF549]/5 blur-[160px] pointer-events-none z-0" />
        <div className="absolute bottom-1/4 right-1/4 translate-y-1/2 w-[400px] h-[400px] rounded-full bg-[#BFF549]/5 blur-[140px] pointer-events-none z-0" />

        <div className="w-full max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10">
          
          {/* Left Column: Copy & Design Overlay */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            
            {/* Visual Inspiration PNG overlay as a stunning top column card */}
            <div className="relative group overflow-hidden border border-[#252525] bg-[#0A0A0A] aspect-video w-full mb-2">
              <div className="absolute top-0 left-0 w-2.5 h-2.5 border-t-2 border-l-2 border-[#BFF549] z-20" />
              <div className="absolute top-0 right-0 w-2.5 h-2.5 border-t-2 border-r-2 border-[#BFF549] z-20" />
              <div className="absolute bottom-0 left-0 w-2.5 h-2.5 border-b-2 border-l-2 border-[#BFF549] z-20" />
              <div className="absolute bottom-0 right-0 w-2.5 h-2.5 border-b-2 border-r-2 border-[#BFF549] z-20" />
              
              <img 
                src="/brand-identity/resources/visual-inspiration.png" 
                alt="Sultan's Parlour Visual Paradigm"
                className="w-full h-full object-cover filter brightness-[0.7] contrast-[1.1] grayscale hover:grayscale-0 group-hover:scale-102 transition-all duration-700 ease-in-out"
              />
              
              {/* Overlay label */}
              <div className="absolute bottom-3 left-3 bg-[#0D0D0D]/90 backdrop-blur-sm border border-[#252525] px-3 py-1.5 z-10">
                <span className="text-[10px] font-mono font-bold text-[#BFF549] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 bg-[#BFF549] animate-pulse rounded-full" />
                  00 / Design Paradigm Calibration
                </span>
              </div>
            </div>

            <span className="text-[#BFF549] text-xs font-bold uppercase tracking-widest font-mono bg-[#BFF549]/10 px-3 py-1.5 border border-[#BFF549]/20 self-start">
              Extraction Performance Redefined
            </span>
            <h1 className="text-5xl md:text-7xl font-black tracking-tight leading-[1.05] uppercase">
              High-Performance <br />
              <span className="text-[#BFF549]">Coffee Brewery</span>
            </h1>
            <p className="text-[#B6B6B6] text-sm md:text-base leading-relaxed max-w-xl">
              Professional pressure-profiling extraction frameworks engineered for elite coffee density. 
              Sultan's Parlour connects real-time solubles telemetry with smart-scale weight feedback loops to deliver 
              unparalleled extraction yield consistency.
            </p>
            
            <div className="flex flex-wrap gap-4 mt-2">
              <button 
                onClick={onEnterPortal}
                className="bg-[#BFF549] text-[#0D0D0D] font-bold text-sm px-8 py-4 rounded-[2px] transition-all hover:bg-[#A6D83F] duration-200 active:scale-95 shadow-none flex items-center gap-3 cursor-pointer"
              >
                <span>Enter Roast Master Portal</span>
                <ArrowRight size={16} />
              </button>
              <a 
                href="#configurator"
                className="bg-transparent text-[#B6B6B6] border border-[#252525] font-bold text-sm px-8 py-4 rounded-[2px] transition-all hover:text-[#FFFFFF] hover:border-[#BFF549] duration-200 active:scale-95 shadow-none text-center flex items-center justify-center cursor-pointer"
              >
                Explore roast curves
              </a>
            </div>
            
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-6 pt-6 border-t border-[#252525] mt-6">
              <div>
                <span className="block text-[#BFF549] text-2xl font-black font-mono">22.8%</span>
                <span className="text-[#B6B6B6] text-[10px] uppercase font-bold tracking-widest block mt-0.5">Optimal EY Target</span>
              </div>
              <div>
                <span className="block text-[#FFFFFF] text-2xl font-black font-mono">99.8%</span>
                <span className="text-[#B6B6B6] text-[10px] uppercase font-bold tracking-widest block mt-0.5">Puck Precision</span>
              </div>
              <div>
                <span className="block text-[#FFFFFF] text-2xl font-black font-mono">&lt; 0.1s</span>
                <span className="text-[#B6B6B6] text-[10px] uppercase font-bold tracking-widest block mt-0.5">Telemetry Lag</span>
              </div>
            </div>
          </div>

          {/* Right Column: Visual Simulator */}
          <div className="lg:col-span-5 w-full flex items-center justify-center">
            <div className="w-full max-w-[380px] bg-[#121212] border border-[#252525] p-6 flex flex-col gap-6 relative shadow-2xl">
              
              {/* Corner tech accents */}
              <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#BFF549]" />
              <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#BFF549]" />
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#BFF549]" />
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#BFF549]" />
              
              <div className="flex justify-between items-center border-b border-[#252525] pb-4">
                <span className="text-xs font-mono font-bold uppercase text-[#B6B6B6] flex items-center gap-1.5">
                  <Cpu size={12} className="text-[#BFF549]" />
                  Sultan's Parlour Simulator V2
                </span>
                <span className="text-[#BFF549] text-[10px] font-mono uppercase font-bold bg-[#BFF549]/10 px-2 py-0.5">
                  Online
                </span>
              </div>

              {/* Simulation State Visualizer */}
              <div className="bg-[#080808] border border-[#252525] aspect-square w-full flex flex-col items-center justify-center relative overflow-hidden p-6 text-center">
                
                {/* Simulated fluid animation overlay */}
                {simulateExtraction && (
                  <div 
                    className="absolute bottom-0 left-0 right-0 bg-[#BFF549]/5 transition-all duration-300"
                    style={{ height: `${extractionProgress}%` }}
                  />
                )}

                <div className="z-10 flex flex-col items-center gap-2">
                  <div className="w-20 h-20 rounded-full border-4 border-dashed border-[#BFF549]/30 flex items-center justify-center relative">
                    {simulateExtraction ? (
                      <RotateCw className="text-[#BFF549] animate-spin" size={32} />
                    ) : (
                      <Coffee className="text-[#B6B6B6]" size={32} />
                    )}
                  </div>
                  
                  <div className="mt-4">
                    <span className="text-[#B6B6B6] text-[10px] uppercase font-bold tracking-widest block">Extraction Solubles Yield</span>
                    <span className="text-4xl font-mono font-black text-white block mt-1 tracking-tight">
                      {activeYield}
                    </span>
                  </div>

                  <span className="text-[10px] font-mono text-[#BFF549] block mt-1">
                    {simulateExtraction ? "ACTIVE EXTRACTION STREAMING" : "SYSTEM CALIBRATED"}
                  </span>
                </div>
              </div>

              {/* Extraction Diagnostics */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className="bg-[#161616] border border-[#252525] p-3">
                  <span className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest block">Core Pressure</span>
                  <span className="text-sm font-mono font-bold block text-white mt-0.5">
                    {simulateExtraction ? `${(9.2 - (extractionProgress / 100) * 3).toFixed(1)} bar` : "0.0 bar"}
                  </span>
                </div>
                <div className="bg-[#161616] border border-[#252525] p-3">
                  <span className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest block">Water Flow</span>
                  <span className="text-sm font-mono font-bold block text-white mt-0.5">
                    {simulateExtraction ? `${(2.2 - (extractionProgress / 100) * 0.6).toFixed(1)} g/s` : "0.0 g/s"}
                  </span>
                </div>
              </div>

              <button 
                onClick={startExtractionSimulation}
                disabled={simulateExtraction}
                className="w-full bg-[#BFF549] text-[#0D0D0D] font-bold text-xs uppercase tracking-wider py-3 rounded-[2px] transition-all hover:bg-[#A6D83F] disabled:bg-[#252525] disabled:text-[#555555] cursor-pointer"
              >
                {simulateExtraction ? "Extracting Solubles..." : "Trigger Extraction Cycle"}
              </button>

            </div>
          </div>

        </div>
      </section>

      {/* 3. TECHNICAL SPECIFICATIONS GRID */}
      <section className="py-20 px-6 border-b border-[#252525] relative">
        <div className="w-full max-w-5xl mx-auto">
          
          <div className="text-left max-w-xl mb-12">
            <span className="text-[#BFF549] text-xs font-mono font-bold uppercase tracking-widest">Core Architecture</span>
            <h2 className="text-4xl font-black uppercase mt-2">Engineered Performance Features</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            <div className="bg-[#121212] border border-[#252525] p-6 text-left relative flex flex-col gap-4">
              <div className="w-10 h-10 bg-[#BFF549]/10 text-[#BFF549] flex items-center justify-center rounded-[2px]">
                <Gauge size={20} />
              </div>
              <h3 className="text-lg font-bold uppercase">Obsidian Pressure Engine</h3>
              <p className="text-[#B6B6B6] text-xs leading-relaxed">
                Utilizes precise, low-friction, multi-stage pressure profiling to isolate floral notes in delicate roasts while avoiding drying, bitter compounds.
              </p>
              <span className="text-[#BFF549] font-mono text-[10px] mt-auto font-bold uppercase tracking-wider">PRESSURE RANGE: 0 - 12 BAR</span>
            </div>

            <div className="bg-[#121212] border border-[#252525] p-6 text-left relative flex flex-col gap-4">
              <div className="w-10 h-10 bg-[#BFF549]/10 text-[#BFF549] flex items-center justify-center rounded-[2px]">
                <Cpu size={20} />
              </div>
              <h3 className="text-lg font-bold uppercase">TDS Telemetry Sync</h3>
              <p className="text-[#B6B6B6] text-xs leading-relaxed">
                Seamless real-time refractometer integrations analyze dissolved coffee solids dynamically and log them into the active master controller portal.
              </p>
              <span className="text-[#BFF549] font-mono text-[10px] mt-auto font-bold uppercase tracking-wider">CALIBRATION TOLERANCE: 99.8%</span>
            </div>

            <div className="bg-[#121212] border border-[#252525] p-6 text-left relative flex flex-col gap-4">
              <div className="w-10 h-10 bg-[#BFF549]/10 text-[#BFF549] flex items-center justify-center rounded-[2px]">
                <Thermometer size={20} />
              </div>
              <h3 className="text-lg font-bold uppercase">Thermal Induction Control</h3>
              <p className="text-[#B6B6B6] text-xs leading-relaxed">
                Dual thermoblock loops regulate head temperatures with microscopic accuracy, maintaining thermal variance below 0.1°C throughout flow.
              </p>
              <span className="text-[#BFF549] font-mono text-[10px] mt-auto font-bold uppercase tracking-wider">RESPONSE METRIC: &lt; 0.1s DELAY</span>
            </div>

          </div>

        </div>
      </section>

      {/* 4. ROAST CONFIGURATOR (INTERACTIVE ELEMENT) */}
      <section id="configurator" className="py-20 px-6 bg-[#080808] border-b border-[#252525]">
        <div className="w-full max-w-5xl mx-auto">
          
          <div className="text-left max-w-xl mb-12">
            <span className="text-[#BFF549] text-xs font-mono font-bold uppercase tracking-widest">Calibration Matrix</span>
            <h2 className="text-4xl font-black uppercase mt-2">Active Roast Calibration</h2>
            <p className="text-[#B6B6B6] text-xs mt-2">
              Select one of our baseline roast varieties to view their optimal hardware parameters, pre-infusion timings, and target yields.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left selector */}
            <div className="lg:col-span-4 flex flex-col gap-2">
              <button
                onClick={() => setSelectedRoast('geisha')}
                className={`w-full text-left text-xs font-bold uppercase tracking-wider px-4 py-4 rounded-[2px] transition-all flex items-center justify-between cursor-pointer ${
                  selectedRoast === 'geisha'
                    ? 'bg-[#BFF549] text-black'
                    : 'bg-[#121212] text-[#B6B6B6] border border-[#252525] hover:text-white hover:border-[#BFF549]'
                }`}
              >
                <span>Panama Geisha Washed</span>
                <ChevronRight size={14} />
              </button>

              <button
                onClick={() => setSelectedRoast('sl28')}
                className={`w-full text-left text-xs font-bold uppercase tracking-wider px-4 py-4 rounded-[2px] transition-all flex items-center justify-between cursor-pointer ${
                  selectedRoast === 'sl28'
                    ? 'bg-[#BFF549] text-black'
                    : 'bg-[#121212] text-[#B6B6B6] border border-[#252525] hover:text-white hover:border-[#BFF549]'
                }`}
              >
                <span>Kenya SL28 Acidic</span>
                <ChevronRight size={14} />
              </button>

              <button
                onClick={() => setSelectedRoast('obsidian')}
                className={`w-full text-left text-xs font-bold uppercase tracking-wider px-4 py-4 rounded-[2px] transition-all flex items-center justify-between cursor-pointer ${
                  selectedRoast === 'obsidian'
                    ? 'bg-[#BFF549] text-black'
                    : 'bg-[#121212] text-[#B6B6B6] border border-[#252525] hover:text-white hover:border-[#BFF549]'
                }`}
              >
                <span>Sultan's Parlour Obsidian Dark</span>
                <ChevronRight size={14} />
              </button>
            </div>

            {/* Right details board */}
            <div className="lg:col-span-8 bg-[#121212] border border-[#252525] p-6 md:p-8 text-left flex flex-col gap-6 relative min-h-[300px]">
              
              {/* Subtle top lime light bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-[#BFF549]" />
              
              <div>
                <span className="text-[#BFF549] text-[10px] font-mono uppercase font-bold tracking-widest block">Sync Configuration Specs</span>
                <h3 className="text-2xl font-bold uppercase tracking-tight mt-1 text-white">{activeRoast.name}</h3>
              </div>

              <p className="text-[#B6B6B6] text-xs leading-relaxed font-mono">
                {activeRoast.description}
              </p>

              {/* Data Table */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-[#252525] pt-6 mt-2">
                
                <div className="flex flex-col gap-1">
                  <span className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <Thermometer size={10} className="text-[#BFF549]" />
                    Target Water Temp
                  </span>
                  <span className="text-base font-mono font-bold text-white">{activeRoast.recommendedTemp}°C</span>
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <Cpu size={10} className="text-[#BFF549]" />
                    Pressure Profile
                  </span>
                  <span className="text-sm font-bold text-white">{activeRoast.pressureProfile}</span>
                </div>

                <div className="flex flex-col gap-1 border-t sm:border-t-0 border-[#252525] pt-4 sm:pt-0">
                  <span className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <RotateCw size={10} className="text-[#BFF549]" />
                    Brewing Ratio
                  </span>
                  <span className="text-sm font-mono font-bold text-white">{activeRoast.ratio}</span>
                </div>

                <div className="flex flex-col gap-1 border-t sm:border-t-0 border-[#252525] pt-4 sm:pt-0">
                  <span className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <Sparkles size={10} className="text-[#BFF549]" />
                    Extraction Target Yield
                  </span>
                  <span className="text-sm font-bold text-white">{activeRoast.targetYield}</span>
                </div>

              </div>

              <div className="border-t border-[#252525] pt-6 flex justify-end mt-4">
                <button
                  onClick={onEnterPortal}
                  className="bg-[#BFF549] text-black font-bold text-xs uppercase tracking-wider px-6 py-3 rounded-[2px] hover:bg-[#A6D83F] transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Sync parameters to portal</span>
                  <ChevronRight size={14} />
                </button>
              </div>

            </div>

          </div>

        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-[#252525] py-12 text-center text-[#B6B6B6] text-xs font-mono bg-[#0D0D0D]">
        <div className="max-w-5xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© {new Date().getFullYear()} Sultan's Parlour Inc. High-Performance Coffee Extraction Infrastructure.</p>
          <div className="flex gap-6">
            <span className="hover:text-white cursor-pointer transition-colors">Documentation</span>
            <span className="hover:text-white cursor-pointer transition-colors">API Logs</span>
            <span className="hover:text-white cursor-pointer transition-colors">Telemetry Hub</span>
          </div>
        </div>
      </footer>

      {/* Barista Authentication Modal */}
      {showAuthModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center z-[999] px-4">
          <div className="bg-[#121212] border border-[#252525] p-6 max-w-sm w-full relative">
            <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-[#BFF549]" />
            <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-[#BFF549]" />
            <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-[#BFF549]" />
            <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-[#BFF549]" />
            
            <div className="flex justify-between items-center border-b border-[#252525] pb-4 mb-6">
              <span className="text-xs font-mono font-bold uppercase text-[#B6B6B6] flex items-center gap-1.5">
                <Coffee size={12} className="text-[#BFF549]" />
                {authMode === 'signin' ? 'Barista Authentication' : "Create Sultan's Parlour Account"}
              </span>
              <button 
                onClick={() => {
                  setShowAuthModal(false);
                  setAuthError('');
                  setAuthSuccess('');
                }}
                className="text-[#B6B6B6] hover:text-white text-xs font-mono cursor-pointer"
              >
                [ESC] CLOSE
              </button>
            </div>

            {authError && (
              <div className="bg-red-950/20 border border-red-800 text-red-400 text-xs font-mono p-3 mb-4 text-left">
                {authError}
              </div>
            )}
            {authSuccess && (
              <div className="bg-green-950/20 border border-[#BFF549] text-[#BFF549] text-xs font-mono p-3 mb-4 text-left">
                {authSuccess}
              </div>
            )}

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1 text-left">
                <label className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest font-mono">Barista Email</label>
                <input 
                  type="email" 
                  placeholder="name@Sultan's Parlour.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-[#080808] border border-[#252525] text-white text-sm p-3 focus:outline-none focus:border-[#BFF549] rounded-none font-mono"
                />
              </div>

              <div className="flex flex-col gap-1 text-left">
                <label className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest font-mono">Access Cryptokey</label>
                <input 
                  type="password" 
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-[#080808] border border-[#252525] text-white text-sm p-3 focus:outline-none focus:border-[#BFF549] rounded-none font-mono"
                />
              </div>

              <button 
                onClick={handleAuthAction}
                className="bg-[#BFF549] text-black font-bold text-xs uppercase tracking-wider py-3 rounded-[2px] hover:bg-[#A6D83F] transition-all cursor-pointer mt-2"
              >
                {authMode === 'signin' ? 'Sync Barista Keys' : 'Register Operator'}
              </button>

              <div className="text-center mt-2">
                <button 
                  onClick={() => setAuthMode(authMode === 'signin' ? 'signup' : 'signin')}
                  className="text-[10px] font-mono text-[#B6B6B6] hover:text-[#BFF549] transition-colors cursor-pointer bg-transparent border-none"
                >
                  {authMode === 'signin' 
                    ? "Need a new account? Register operator" 
                    : "Already registered? Login operator"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
