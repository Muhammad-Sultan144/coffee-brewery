import React, { useState } from 'react';
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
  Coffee
} from 'lucide-react';

// Props for the profile page
interface GlaidoProfilePageProps {
  onBack: () => void;
}

// Stats Card shape
interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}

// Integration Row shape
interface IntegrationRowProps {
  name: string;
  desc: string;
  connected: boolean;
}

export default function GlaidoProfilePage({ onBack }: GlaidoProfilePageProps) {
  const [activeTab, setActiveTab] = useState<'profile' | 'usage' | 'integrations'>('profile');
  const [profileName, setProfileName] = useState('ANC');
  const [profileEmail, setProfileEmail] = useState('coffee.enthusiast@glaido.com');
  const [targetTemp, setTargetTemp] = useState<number>(93); // Celsius
  const [brewMethod, setBrewMethod] = useState('Espresso (declining pressure)');
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-[#0D0D0D] text-white flex flex-col font-sans selection:bg-[#BFF549] selection:text-black animate-fadeIn">
      
      {/* 1. TOP NAV / HEADER */}
      <header className="border-b border-[#252525] bg-[#0D0D0D]/90 backdrop-blur-md sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Custom SVG Logo */}
          <div className="flex items-center gap-2">
            <svg width="32" height="32" viewBox="0 0 82 82" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-6 w-auto">
              <path d="M65.9202 27.3358H29.9063C28.5227 27.3358 27.401 28.4546 27.401 29.8348V38.5815C27.401 39.9617 28.5227 41.0805 29.9063 41.0805H66.2274C67.3794 41.0805 68.3372 41.9653 68.4255 43.111V65.7586C68.4255 67.1388 69.5472 68.2577 70.9308 68.2577H79.5429C80.9265 68.2577 82.0482 67.1388 82.0482 65.7586V43.5796C82.0482 42.1994 80.9265 41.0805 79.5429 41.0805H71.0874C69.6173 41.0805 68.4255 39.8917 68.4255 38.4253V29.8348C68.4255 28.4546 67.3039 27.3358 65.9202 27.3358Z" fill="#BFF549"/>
              <path d="M54.9604 65.9124V57.1657C54.9604 55.7855 53.8387 54.6667 52.455 54.6667H23.3307C17.9691 54.6667 13.6227 50.3311 13.6227 44.9829V17.4933C13.6227 15.4231 15.3052 13.7448 17.3806 13.7448H65.7645C67.1482 13.7448 68.2698 12.6259 68.2698 11.2457V2.49905C68.2698 1.11886 67.1482 0 65.7645 0H17.5372C7.85167 0 0 7.83203 0 17.4933V45.3504C0 51.3155 2.37557 57.0363 6.60411 61.2543L27.4019 82V70.9105C27.4019 69.5303 28.5226 68.4114 29.9072 68.4114H52.455C53.8387 68.4114 54.9604 67.2926 54.9604 65.9124Z" fill="#BFF549"/>
            </svg>
            <span className="font-bold text-xl uppercase tracking-wider hidden sm:block font-sans">Glaido</span>
          </div>
          <span className="text-[#252525] font-light">/</span>
          <span className="text-[#B6B6B6] text-sm uppercase tracking-widest font-mono">Coffee Controller</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button onClick={onBack} className="bg-transparent text-[#B6B6B6] border border-[#252525] font-bold text-xs px-4 py-2 rounded-[2px] hover:text-white hover:border-[#BFF549] transition-all flex items-center gap-2 cursor-pointer">
            <Coffee size={14} className="text-[#BFF549]" />
            <span>Go to Portal</span>
          </button>
        </div>
      </header>

      {/* 2. PROFILE BANNER HERO WITH GLOW AND BACKGROUND OVERLAY */}
      <section className="relative h-64 w-full bg-[#080808] border-b border-[#252525] overflow-hidden flex items-end">
        {/* Deep background mesh overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0D] via-[#0D0D0D]/60 to-transparent z-0" />
        <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-[#BFF549]/10 blur-[120px] pointer-events-none z-0" />
        
        {/* Content Overlay */}
        <div className="w-full max-w-5xl mx-auto px-6 pb-6 flex flex-col sm:flex-row items-start sm:items-end gap-6 z-10">
          
          {/* Avatar Container with Lime Green sharp border */}
          <div className="w-28 h-28 bg-[#161616] border border-[#BFF549] p-1 rounded-none flex items-center justify-center shrink-0 shadow-lg">
            <div className="w-full h-full bg-[#252525] rounded-none overflow-hidden flex items-center justify-center text-[#BFF549]">
              <Coffee size={44} />
            </div>
          </div>

          <div className="flex-1 pb-2">
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-3xl font-bold tracking-tight">{profileName}</h2>
              <span className="bg-[#BFF549]/10 text-[#BFF549] border border-[#BFF549]/30 text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-none font-bold">
                Roast Master
              </span>
            </div>
            <p className="text-[#B6B6B6] text-sm mt-1 font-mono">{profileEmail}</p>
          </div>

          <div className="pb-2">
            <span className="text-[#B6B6B6] text-xs uppercase font-bold tracking-widest block text-left sm:text-right">Extraction Tier</span>
            <span className="text-[#BFF549] text-2xl font-bold tracking-wider">PREMIUM 22% EY</span>
          </div>
        </div>
      </section>

      {/* 3. MAIN CONTENT CONTAINER */}
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

          <div className="border-t border-[#252525] my-6 pt-6 flex flex-col gap-3">
            <div className="bg-[#161616] border border-[#252525] rounded-none p-4">
              <span className="text-[#B6B6B6] text-[10px] uppercase font-bold tracking-widest block mb-1">Scale Connection</span>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 bg-[#BFF549] animate-pulse rounded-full" />
                <span className="text-xs font-mono font-bold uppercase">Acaia Connected</span>
              </div>
            </div>

            <button className="w-full bg-[#161616] border border-[#252525] text-red-400 text-xs font-bold uppercase tracking-wider px-4 py-3 rounded-[2px] hover:bg-red-950/20 hover:border-red-900 transition-all flex items-center gap-2 justify-center cursor-pointer">
              <LogOut size={14} />
              Disconnect Setup
            </button>
          </div>
        </aside>

        {/* WORKSPACE AREA */}
        <section className="flex-1 bg-[#121212] border border-[#252525] rounded-none p-6 md:p-8 min-h-[450px]">
          
          {/* TAB 1: ROAST PARAMETERS */}
          {activeTab === 'profile' && (
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight">Extraction Configuration</h3>
                <p className="text-[#B6B6B6] text-xs mt-1">Adjust target temperature metrics and default brewing methods.</p>
              </div>

              {isSaved && (
                <div className="bg-[#1A1A1A] border border-[#BFF549] rounded-none p-4 flex items-center gap-3 text-sm text-[#BFF549] font-mono animate-fadeIn">
                  <Check size={16} />
                  <span>Success: Extraction parameters synced to Glaido Smart Machine.</span>
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
                      setProfileName('ANC');
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
            <div className="flex flex-col gap-6 animate-fadeIn">
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

              {/* Progress bar and speed benchmark */}
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
            <div className="flex flex-col gap-6 animate-fadeIn">
              <div>
                <h3 className="text-xl font-bold uppercase tracking-tight">Machine Hardware Sync</h3>
                <p className="text-[#B6B6B6] text-xs mt-1">Connect your Glaido engine directly to high-end smart scale weight metrics.</p>
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
          
        </section>

      </main>

      {/* 4. FOOTER */}
      <footer className="border-t border-[#252525] py-8 text-center text-[#B6B6B6] text-xs font-mono mt-10">
        <p>© {new Date().getFullYear()} Glaido Inc. High-Performance Coffee Extraction Infrastructure.</p>
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
      <div>
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
