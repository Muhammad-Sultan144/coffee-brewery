import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  Clock, 
  Zap, 
  Check, 
  LogOut, 
  Key, 
  Sliders, 
  Thermometer, 
  Sparkles,
  ArrowRight,
  Coffee,
  Calculator,
  History,
  Lock,
  UserCheck
} from 'lucide-react';
import { supabase } from '../lib/supabaseClient';

interface Sultan's ParlourProfilePageProps {
  user: any;
  onBack: () => void;
}

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}

interface IntegrationRowProps {
  name: string;
  desc: string;
  connected: boolean;
}

interface BaristaCalculation {
  id: string;
  weight: number;
  coffee_cups: number;
  activity_level: string;
  calories_burn: number;
  caffeine_level: number;
  gear_recommendation: string;
  created_at: string;
}

export default function Sultan's ParlourProfilePage({ user, onBack }: Sultan's ParlourProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'usage' | 'integrations' | 'calculator'>('profile');
  const [profileName, setProfileName] = useState(user ? user.email.split('@')[0].toUpperCase() : 'ANC');
  const [profileEmail, setProfileEmail] = useState(user ? user.email : 'coffee.enthusiast@Sultan's Parlour.com');
  const [targetTemp, setTargetTemp] = useState<number>(93); // Celsius
  const [brewMethod, setBrewMethod] = useState('Espresso (declining pressure)');
  const [isSaved, setIsSaved] = useState(false);

  // Calorie & Gear-Up Calculator States
  const [weight, setWeight] = useState<number>(75);
  const [cups, setCups] = useState<number>(3);
  const [activity, setActivity] = useState<string>('active');
  const [computedCalories, setComputedCalories] = useState<number>(0);
  const [computedCaffeine, setComputedCaffeine] = useState<number>(0);
  const [gearRecommendation, setGearRecommendation] = useState<string>('');
  const [calculationSuccess, setCalculationSuccess] = useState<boolean>(false);
  const [calcHistory, setCalcHistory] = useState<BaristaCalculation[]>([]);

  // Inline Login States (if accessed when logged out)
  const [inlineEmail, setInlineEmail] = useState('');
  const [inlinePassword, setInlinePassword] = useState('');
  const [inlineError, setInlineError] = useState('');

  // Handle profile names updating dynamically when user signs in or out
  useEffect(() => {
    if (user) {
      setProfileName(user.email.split('@')[0].toUpperCase());
      setProfileEmail(user.email);
    } else {
      setProfileName('ANC');
      setProfileEmail('coffee.enthusiast@Sultan's Parlour.com');
    }
  }, [user]);

  // Load calculation history when tab is opened and user is logged in
  useEffect(() => {
    if (activeTab === 'calculator' && user) {
      fetchCalculationHistory();
    }
  }, [activeTab, user]);

  const fetchCalculationHistory = async () => {
    try {
      const { data, error } = await supabase
        .from('barista_calculations')
        .select('*')
        .order('created_at', { ascending: false });
      if (error) throw error;
      setCalcHistory(data || []);
    } catch (err: any) {
      console.error('Error fetching calculation telemetry:', err.message);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  // Perform metabolism math and log to Supabase
  const handleCalculateAndLog = async (e: React.FormEvent) => {
    e.preventDefault();
    setCalculationSuccess(false);

    // Dynamic Barista Calorie Burn Math
    // Base metabolic rate (approx): Weight * 24
    let multiplier = 1.2; // Sedentary
    if (activity === 'active') multiplier = 1.45;
    if (activity === 'peak') multiplier = 1.75;
    if (activity === 'overclocked') multiplier = 2.1;

    let calBurn = Math.round(weight * 24 * multiplier);
    // Dynamic Caffeine Caloric Boost: Each cup of coffee boosts metabolism by 50 calories
    calBurn += cups * 50;

    // Caffeine levels (approx 100mg per cup)
    const activeCaff = cups * 100;

    // Gear recommendations based on caffeine profile
    let gearRec = "Sultan's Parlour Standard Brewing Station & Refractometer Link";
    if (cups >= 3 && cups <= 4) {
      gearRec = "Decent DE1 Pressure Profiler & Acaia Lunar Calibration Setup";
    } else if (cups >= 5) {
      gearRec = "Obsidian Overclocked Triple Multiplex Induction System";
    }

    setComputedCalories(calBurn);
    setComputedCaffeine(activeCaff);
    setGearRecommendation(gearRec);
    setCalculationSuccess(true);

    if (user) {
      try {
        const { error } = await supabase.from('barista_calculations').insert([
          {
            user_id: user.id,
            weight: Number(weight),
            coffee_cups: Number(cups),
            activity_level: activity,
            calories_burn: calBurn,
            caffeine_level: activeCaff,
            gear_recommendation: gearRec
          }
        ]);
        if (error) throw error;
        // Refresh calculation log list
        fetchCalculationHistory();
      } catch (err: any) {
        console.error('Error logging to Supabase:', err.message);
      }
    }
  };

  const handleInlineLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setInlineError('');
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: inlineEmail,
        password: inlinePassword
      });
      if (error) throw error;
      setInlineEmail('');
      setInlinePassword('');
    } catch (err: any) {
      setInlineError(err.message || 'Verification failure.');
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans selection:bg-[#BFF549] selection:text-black animate-fadeIn">
      
      {/* 1. TOP NAV / HEADER */}
      <header className="border-b border-[#252525] bg-[#0D0D0D]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <img src="/brand-identity/resources/logo.png" alt="Sultan's Parlour Logo" className="h-8 w-auto rounded-md shadow-lg border border-[#BFF549]/20" />
            <span className="font-bold text-xl uppercase tracking-wider hidden sm:block font-sans">Sultan's Parlour</span>
          </div>
          <span className="text-[#252525] font-light">/</span>
          <span className="text-[#B6B6B6] text-sm uppercase tracking-widest font-mono">Coffee Controller</span>
        </div>
        
        <div className="flex items-center gap-4">
          {user && (
            <span className="text-[10px] font-mono text-[#BFF549] hidden md:flex items-center gap-1.5 bg-[#BFF549]/10 border border-[#BFF549]/20 px-2.5 py-1">
              <UserCheck size={10} />
              SYNCED: {user.email}
            </span>
          )}
          <button onClick={onBack} className="bg-transparent text-[#B6B6B6] border border-[#252525] font-bold text-xs px-4 py-2 rounded-[2px] hover:text-white hover:border-[#BFF549] transition-all flex items-center gap-2 cursor-pointer">
            <Coffee size={14} className="text-[#BFF549]" />
            <span>Go to Portal</span>
          </button>
        </div>
      </header>

      {/* 2. PROFILE BANNER HERO WITH GLOW */}
      <section className="relative h-64 w-full bg-[#080808] border-b border-[#252525] overflow-hidden flex items-end">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent z-0" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#BFF549]/10 blur-[120px] pointer-events-none z-0" />
        
        <div className="w-full max-w-5xl mx-auto px-6 pb-6 flex flex-col sm:flex-row items-start sm:items-end gap-6 z-10">
          <div className="w-28 h-28 bg-[#161616] border border-[#BFF549] p-1 rounded-none flex items-center justify-center shrink-0 shadow-lg">
            <div className="w-full h-full bg-[#252525] rounded-none overflow-hidden flex items-center justify-center text-[#BFF549]">
              <Coffee size={44} />
            </div>
          </div>

          <div className="flex-1 pb-2 text-left">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{profileName}</h2>
              <span className="bg-[#BFF549]/10 text-[#BFF549] border border-[#BFF549]/30 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-none font-bold">
                {user ? 'Authenticated Barista' : 'Guest Operator'}
              </span>
            </div>
            <p className="text-[#B6B6B6] text-sm mt-1 font-mono">{profileEmail}</p>
          </div>

          <div className="pb-2 text-left sm:text-right">
            <span className="text-[#B6B6B6] text-xs uppercase font-bold tracking-widest block">Extraction Tier</span>
            <span className="text-[#BFF549] text-2xl font-bold tracking-wider">PREMIUM 22% EY</span>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-10 flex flex-col md:flex-row gap-8">
        
        {/* SIDEBAR NAVIGATION */}
        <aside className="w-full md:w-64 shrink-0 flex flex-col gap-1">
          <button 
            onClick={() => setActiveTab('profile')}
            className={`w-full text-left text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-[2px] transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'profile' 
                ? 'bg-[#BFF549] text-black' 
                : 'bg-[#161616] text-[#B6B6B6] border border-[#252525] hover:text-white hover:border-[#BFF549]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Settings size={14} />
              Roast Parameters
            </span>
            <ArrowRight size={12} className={activeTab === 'profile' ? 'opacity-100' : 'opacity-0'} />
          </button>

          <button 
            onClick={() => setActiveTab('usage')}
            className={`w-full text-left text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-[2px] transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'usage' 
                ? 'bg-[#BFF549] text-black' 
                : 'bg-[#161616] text-[#B6B6B6] border border-[#252525] hover:text-white hover:border-[#BFF549]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Zap size={14} />
              Extraction Telemetry
            </span>
            <ArrowRight size={12} className={activeTab === 'usage' ? 'opacity-100' : 'opacity-0'} />
          </button>

          <button 
            onClick={() => setActiveTab('integrations')}
            className={`w-full text-left text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-[2px] transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'integrations' 
                ? 'bg-[#BFF549] text-black' 
                : 'bg-[#161616] text-[#B6B6B6] border border-[#252525] hover:text-white hover:border-[#BFF549]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Sliders size={14} />
              Hardware Scale Sync
            </span>
            <ArrowRight size={12} className={activeTab === 'integrations' ? 'opacity-100' : 'opacity-0'} />
          </button>

          <button 
            onClick={() => setActiveTab('calculator')}
            className={`w-full text-left text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-[2px] transition-all flex items-center justify-between cursor-pointer ${
              activeTab === 'calculator' 
                ? 'bg-[#BFF549] text-black' 
                : 'bg-[#161616] text-[#B6B6B6] border border-[#252525] hover:text-white hover:border-[#BFF549]'
            }`}
          >
            <span className="flex items-center gap-2">
              <Calculator size={14} />
              Caloric & Gear-Up Calibration
            </span>
            <ArrowRight size={12} className={activeTab === 'calculator' ? 'opacity-100' : 'opacity-0'} />
          </button>

          <div className="border-t border-[#252525] my-6 pt-6 flex flex-col gap-3">
            <div className="bg-[#161616] border border-[#252525] rounded-none p-4 text-left">
              <span className="text-[#B6B6B6] text-[10px] uppercase font-bold tracking-widest block mb-1">Scale Connection</span>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#BFF549] animate-pulse rounded-full" />
                <span className="text-xs font-mono font-bold uppercase">Acaia Connected</span>
              </div>
            </div>

            {user && (
              <button 
                onClick={handleSignOut}
                className="w-full bg-[#161616] border border-[#252525] text-red-400 text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-[2px] hover:bg-red-950/20 hover:border-red-900 transition-all flex items-center gap-2 justify-center cursor-pointer"
              >
                <LogOut size={14} />
                Disconnect Session
              </button>
            )}
          </div>
        </aside>

        {/* WORKSPACE AREA */}
        <section className="flex-1 bg-[#121212] border border-[#252525] rounded-none p-6 md:p-8 min-h-[450px]">
          
          {/* TAB 1: ROAST PARAMETERS */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6 animate-fadeIn text-left">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight">Extraction Configuration</h3>
                <p className="text-[#B6B6B6] text-xs mt-1">Adjust target temperature metrics and default brewing methods.</p>
              </div>

              {isSaved && (
                <div className="bg-[#1A1A1A] border border-[#BFF549] rounded-none p-4 flex items-center gap-3 text-sm text-[#BFF549] font-mono animate-fadeIn">
                  <Check size={16} />
                  <span>Success: Extraction parameters synced to Sultan's Parlour Smart Machine.</span>
                </div>
              )}

              <form onSubmit={handleSave} className="flex flex-col gap-6">
                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="pname" className="text-[#B6B6B6] text-[10px] font-bold uppercase tracking-widest">
                    Roast Master Name
                  </label>
                  <input
                    id="pname"
                    type="text"
                    value={profileName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileName(e.target.value)}
                    className="bg-[#161616] text-white border border-[#252525] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#BFF549] font-mono transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="pemail" className="text-[#B6B6B6] text-[10px] font-bold uppercase tracking-widest">
                    Email Stream
                  </label>
                  <input
                    id="pemail"
                    type="email"
                    value={profileEmail}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setProfileEmail(e.target.value)}
                    className="bg-[#161616] text-white border border-[#252525] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#BFF549] font-mono transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-2 w-full">
                  <label htmlFor="pmethod" className="text-[#B6B6B6] text-[10px] font-bold uppercase tracking-widest">
                    Active Brewing Method
                  </label>
                  <input
                    id="pmethod"
                    type="text"
                    value={brewMethod}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBrewMethod(e.target.value)}
                    className="bg-[#161616] text-white border border-[#252525] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#BFF549] font-mono transition-colors"
                  />
                </div>

                {/* Target Temperature Slider */}
                <div className="flex flex-col gap-3 border-t border-[#252525] pt-6">
                  <div className="flex justify-between items-center">
                    <label htmlFor="temp" className="text-[#B6B6B6] text-[10px] font-bold uppercase tracking-widest flex items-center gap-1.5">
                      <Thermometer size={12} className="text-[#BFF549]" />
                      Target Water Temperature
                    </label>
                    <span className="text-[#BFF549] text-xs font-mono font-bold">{targetTemp}°C</span>
                  </div>
                  <input
                    id="temp"
                    type="range"
                    min="85"
                    max="100"
                    value={targetTemp}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTargetTemp(Number(e.target.value))}
                    className="w-full accent-[#BFF549] cursor-pointer bg-[#252525]"
                  />
                  <span className="text-[#B6B6B6]/50 text-[10px] font-mono">Suggested range is 91°C–94°C for high-density washed light roasts.</span>
                </div>

                <div className="border-t border-[#252525] pt-6 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => {
                      setProfileName(user ? user.email.split('@')[0].toUpperCase() : 'ANC');
                      setBrewMethod('Espresso (declining pressure)');
                      setTargetTemp(93);
                    }}
                    className="bg-transparent text-[#B6B6B6] border border-[#252525] font-bold text-xs px-6 py-3 rounded-[2px] hover:text-white hover:border-[#BFF549] transition-all shadow-none cursor-pointer"
                  >
                    Reset parameters
                  </button>

                  <button 
                    type="submit"
                    className="bg-[#BFF549] text-black font-bold text-xs px-6 py-3 rounded-[2px] hover:bg-[#A6D83F] transition-all shadow-none cursor-pointer"
                  >
                    Sync to Machine
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* TAB 2: EXTRACTION TELEMETRY */}
          {activeTab === 'usage' && (
            <div className="flex flex-col gap-6 animate-fadeIn text-left">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight">Solubles Telemetry</h3>
                <p className="text-[#B6B6B6] text-xs mt-1">Real-time diagnostics from your synced Acaia scales and refractometer.</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <StatsCard 
                  icon={<Clock size={20} className="text-[#BFF549]" />}
                  label="Brew Time Avg"
                  value="28.4s"
                  change="+1.2s pre-infusion hold"
                />
                <StatsCard 
                  icon={<Sparkles size={20} className="text-[#BFF549]" />}
                  label="Extraction Yield"
                  value="21.8%"
                  change="99.8% precision rate"
                />
                <StatsCard 
                  icon={<Zap size={20} className="text-[#BFF549]" />}
                  label="TDS Strength"
                  value="1.38%"
                  change="Optimal sweet spot range"
                />
                <StatsCard 
                  icon={<Coffee size={20} className="text-[#BFF549]" />}
                  label="Total Brews"
                  value="482 cups"
                  change="Consistent flavor replication"
                />
              </div>

              {/* Progress bar */}
              <div className="border-t border-[#252525] pt-6 flex flex-col gap-3">
                <span className="text-[#B6B6B6] text-[10px] uppercase font-bold tracking-widest">Active Extraction Consistency</span>
                <div className="w-full bg-[#1A1A1A] h-2.5 rounded-none border border-[#252525]">
                  <div className="bg-[#BFF549] h-full" style={{ width: '99.2%' }} />
                </div>
                <div className="flex justify-between text-[10px] font-mono text-[#B6B6B6]/60">
                  <span>Standard Variance: 5.4%</span>
                  <span className="text-[#BFF549] font-bold">Your Consistency: 99.2%</span>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: HARDWARE SCALE SYNC */}
          {activeTab === 'integrations' && (
            <div className="flex flex-col gap-6 animate-fadeIn text-left">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight">Machine Hardware Sync</h3>
                <p className="text-[#B6B6B6] text-xs mt-1">Connect your Sultan's Parlour engine directly to high-end smart scale weight metrics.</p>
              </div>

              <div className="flex flex-col gap-4">
                <IntegrationRow 
                  name="Acaia Lunar Scale"
                  desc="Synchronize flow rate and real-time brewing weight logs."
                  connected={true}
                />
                <IntegrationRow 
                  name="Decent Espresso DE1"
                  desc="Sync live pressure, temperature, and weight profiles."
                  connected={true}
                />
                <IntegrationRow 
                  name="DiFluid Refractometer"
                  desc="Directly push TDS measurements into extraction logs."
                  connected={false}
                />
              </div>

              <div className="border-t border-[#252525] pt-6 flex flex-col gap-4">
                <div>
                  <h4 className="text-sm font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <Key size={14} className="text-[#BFF549]" />
                    Developer API Token
                  </h4>
                  <p className="text-[#B6B6B6]/60 text-xs mt-1 font-mono">Use your private credentials to query coffee extraction profile streams.</p>
                </div>
                
                <div className="flex items-center gap-2">
                  <input
                    type="password"
                    value="••••••••••••••••••••••••••••••••••••"
                    readOnly
                    className="flex-1 bg-[#161616] text-[#B6B6B6] border border-[#252525] rounded-none px-4 py-3 text-xs font-mono focus:outline-none"
                  />
                  <button className="bg-transparent text-white border border-[#252525] font-bold text-xs px-4 py-3 rounded-[2px] hover:border-[#BFF549] transition-all shadow-none cursor-pointer">
                    Reveal API Key
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: BARISTA CALORIE & GEAR-UP CALCULATOR */}
          {activeTab === 'calculator' && (
            <div className="flex flex-col gap-6 animate-fadeIn text-left">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight flex items-center gap-2">
                  <Calculator className="text-[#BFF549]" size={22} />
                  Caloric &amp; Gear-Up Calibration
                </h3>
                <p className="text-[#B6B6B6] text-xs mt-1">
                  Compute daily metabolic barista caloric expenditure boosted by caffeine consumption, and determine recommended hardware calibration profiles.
                </p>
              </div>

              {user ? (
                // Authenticated Calculator Tab View
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                  
                  {/* Left Column: Form */}
                  <form onSubmit={handleCalculateAndLog} className="lg:col-span-6 flex flex-col gap-5 w-full">
                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="weight" className="text-[#B6B6B6] text-[10px] font-bold uppercase tracking-widest">
                        Barista Weight (kg)
                      </label>
                      <input
                        id="weight"
                        type="number"
                        min="40"
                        max="150"
                        value={weight}
                        onChange={(e) => setWeight(Number(e.target.value))}
                        className="bg-[#161616] text-white border border-[#252525] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#BFF549] font-mono"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="cups" className="text-[#B6B6B6] text-[10px] font-bold uppercase tracking-widest">
                        Daily Coffee Consumption (cups)
                      </label>
                      <input
                        id="cups"
                        type="number"
                        min="0"
                        max="12"
                        value={cups}
                        onChange={(e) => setCups(Number(e.target.value))}
                        className="bg-[#161616] text-white border border-[#252525] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#BFF549] font-mono"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-2 w-full">
                      <label htmlFor="activity" className="text-[#B6B6B6] text-[10px] font-bold uppercase tracking-widest">
                        Barista Activity &amp; Stress Level
                      </label>
                      <select
                        id="activity"
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="bg-[#161616] text-white border border-[#252525] rounded-none px-4 py-3 text-sm focus:outline-none focus:border-[#BFF549] font-mono appearance-none"
                      >
                        <option value="sedentary">Sedentary (Lab Research Only)</option>
                        <option value="active">Active (Standard Espresso Bar)</option>
                        <option value="peak">Peak (High Volume Barista Speed)</option>
                        <option value="overclocked">Overclocked (Extensive Extractor Calibration)</option>
                      </select>
                    </div>

                    <button
                      type="submit"
                      className="bg-[#BFF549] text-black font-bold text-xs uppercase tracking-wider py-3.5 rounded-[2px] hover:bg-[#A6D83F] transition-all cursor-pointer flex items-center justify-center gap-2"
                    >
                      <Zap size={14} />
                      Compute &amp; Log Telemetry
                    </button>
                  </form>

                  {/* Right Column: Dynamic Output Results & History */}
                  <div className="lg:col-span-6 flex flex-col gap-6">
                    {calculationSuccess && (
                      <div className="bg-[#161616] border border-[#BFF549] p-5 relative">
                        <div className="absolute top-0 right-0 bg-[#BFF549] text-black font-mono font-bold text-[9px] uppercase tracking-wider px-2 py-0.5">
                          Synced to Cloud
                        </div>
                        <h4 className="text-xs font-mono font-bold text-[#BFF549] uppercase tracking-widest mb-3">Calculated Output Profile</h4>
                        
                        <div className="flex flex-col gap-3">
                          <div className="flex justify-between border-b border-[#252525] pb-2">
                            <span className="text-[#B6B6B6] text-xs">Total Metabolic Expenditure</span>
                            <span className="font-mono font-bold text-white text-sm">{computedCalories} kcal / day</span>
                          </div>
                          
                          <div className="flex justify-between border-b border-[#252525] pb-2">
                            <span className="text-[#B6B6B6] text-xs">Bloodstream Caffeine Peak</span>
                            <span className="font-mono font-bold text-white text-sm">{computedCaffeine} mg</span>
                          </div>

                          <div className="flex flex-col text-left pt-1">
                            <span className="text-[#B6B6B6] text-[10px] uppercase font-bold tracking-widest font-mono block mb-1">Suggested Hardware Configuration</span>
                            <span className="text-xs font-bold text-[#BFF549] leading-relaxed">{gearRecommendation}</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Historical Calibration Logs from Supabase */}
                    <div className="flex flex-col gap-3 border-t border-[#252525] pt-4">
                      <span className="text-xs font-mono font-bold uppercase text-[#B6B6B6] flex items-center gap-1.5">
                        <History size={12} className="text-[#BFF549]" />
                        Historical Calibration Logs ({calcHistory.length})
                      </span>

                      {calcHistory.length > 0 ? (
                        <div className="max-h-[220px] overflow-y-auto border border-[#252525] bg-[#0A0A0A]">
                          <table className="w-full text-left text-[11px] font-mono text-[#B6B6B6]">
                            <thead>
                              <tr className="border-b border-[#252525] bg-[#121212] text-white">
                                <th className="p-2 font-bold uppercase">Date</th>
                                <th className="p-2 font-bold uppercase">Weight</th>
                                <th className="p-2 font-bold uppercase">Cups</th>
                                <th className="p-2 font-bold uppercase">Kcal</th>
                              </tr>
                            </thead>
                            <tbody>
                              {calcHistory.map((log) => (
                                <tr key={log.id} className="border-b border-[#252525]/50 hover:bg-[#161616]">
                                  <td className="p-2">{new Date(log.created_at).toLocaleDateString()}</td>
                                  <td className="p-2">{log.weight}kg</td>
                                  <td className="p-2">{log.coffee_cups} cups</td>
                                  <td className="p-2 text-[#BFF549] font-bold">{log.calories_burn}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="bg-[#121212] border border-[#252525] p-6 text-center text-xs text-[#B6B6B6] font-mono">
                          No logged calculations found in Supabase.
                        </div>
                      )}
                    </div>

                  </div>

                </div>
              ) : (
                // Unauthenticated locked message with inline sign-in
                <div className="bg-[#161616] border border-[#252525] p-8 text-center flex flex-col items-center gap-6 relative">
                  <div className="w-16 h-16 rounded-none bg-[#252525] border border-[#252525] flex items-center justify-center text-[#BFF549] mb-2">
                    <Lock size={32} />
                  </div>
                  
                  <div className="max-w-md">
                    <h4 className="text-lg font-bold uppercase tracking-tight text-white">Caloric Metabolism Lock</h4>
                    <p className="text-[#B6B6B6] text-xs leading-relaxed mt-2">
                      Authenticate your Barista credentials to unlock the Caloric Metabolism and Profile Gear-Up Telemetry logger. Logs are securely synchronized in real time to your active Supabase database.
                    </p>
                  </div>

                  {/* Inline Auth Form */}
                  <form onSubmit={handleInlineLogin} className="w-full max-w-sm border-t border-[#252525] pt-6 flex flex-col gap-4 mt-2">
                    <span className="text-[10px] font-mono font-bold text-[#BFF549] uppercase tracking-widest block text-left">
                      Inline Verification
                    </span>

                    {inlineError && (
                      <div className="bg-red-950/20 border border-red-800 text-red-400 text-xs font-mono p-3 text-left">
                        Error: {inlineError}
                      </div>
                    )}

                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest font-mono">Barista Email</label>
                      <input 
                        type="email" 
                        placeholder="name@Sultan's Parlour.com"
                        value={inlineEmail}
                        onChange={(e) => setInlineEmail(e.target.value)}
                        className="bg-[#080808] border border-[#252525] text-white text-sm p-3 focus:outline-none focus:border-[#BFF549] rounded-none font-mono"
                        required
                      />
                    </div>

                    <div className="flex flex-col gap-1 text-left">
                      <label className="text-[#B6B6B6] text-[9px] uppercase font-bold tracking-widest font-mono">Access Cryptokey</label>
                      <input 
                        type="password" 
                        placeholder="••••••••"
                        value={inlinePassword}
                        onChange={(e) => setInlinePassword(e.target.value)}
                        className="bg-[#080808] border border-[#252525] text-white text-sm p-3 focus:outline-none focus:border-[#BFF549] rounded-none font-mono"
                        required
                      />
                    </div>

                    <button 
                      type="submit"
                      className="bg-[#BFF549] text-black font-bold text-xs uppercase tracking-wider py-3 rounded-[2px] hover:bg-[#A6D83F] transition-all cursor-pointer mt-1"
                    >
                      Authenticate Operator
                    </button>
                  </form>

                </div>
              )}

            </div>
          )}
          
        </section>

      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-[#252525] py-8 text-center text-[#B6B6B6] text-xs font-mono mt-10">
        <p>© {new Date().getFullYear()} Sultan's Parlour Inc. High-Performance Coffee Extraction Infrastructure.</p>
      </footer>

    </div>
  );
}

// Stats Card helper component
function StatsCard({ icon, label, value, change }: StatsCardProps) {
  return (
    <div className="bg-[#161616] border border-[#252525] p-5 rounded-none flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[#B6B6B6] text-[10px] uppercase font-bold tracking-widest">{label}</span>
        {icon}
      </div>
      <div>
        <h4 className="text-3xl font-bold tracking-tight text-white">{value}</h4>
        <span className="text-[#BFF549] text-[10px] font-mono mt-1 block">{change}</span>
      </div>
    </div>
  );
}

// Integration Row helper component
function IntegrationRow({ name, desc, connected }: IntegrationRowProps) {
  return (
    <div className="bg-[#161616] border border-[#252525] p-4 rounded-none flex items-center justify-between gap-4">
      <div className="text-left">
        <h4 className="text-sm font-bold uppercase tracking-wider text-white">{name}</h4>
        <p className="text-[#B6B6B6] text-xs mt-0.5">{desc}</p>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        {connected ? (
          <>
            <span className="text-[#BFF549] text-[10px] font-mono font-bold uppercase tracking-wider bg-[#BFF549]/10 px-2.5 py-1 border border-[#BFF549]/20">
              Active Sync
            </span>
            <button className="bg-transparent text-red-400 border border-red-900/30 hover:border-red-800 text-[10px] font-mono uppercase tracking-wider px-3 py-1 rounded-[2px] transition-all cursor-pointer">
              Disconnect
            </button>
          </>
        ) : (
          <button className="bg-[#BFF549] text-black text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-[2px] hover:bg-[#A6D83F] transition-all cursor-pointer">
            Connect
          </button>
        )}
      </div>
    </div>
  );
}
