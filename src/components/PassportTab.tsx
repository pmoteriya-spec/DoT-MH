import React, { useState } from 'react';
import { UserProfile, Destination, Circuit } from '../types';
import { DESTINATIONS, CIRCUITS } from '../data';
import { Award, CheckCircle, Share2, Compass, ArrowRight, BookOpen, Clock, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface PassportTabProps {
  profile: UserProfile;
  language: 'en' | 'mr';
  destinations?: Destination[];
  circuits?: Circuit[];
}

export default function PassportTab({ profile, language, destinations, circuits }: PassportTabProps) {
  const destinationsList = destinations || DESTINATIONS;
  const circuitsList = circuits || CIRCUITS;

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  // Helper to map circuit to custom motif icon
  const getCircuitMotif = (circuitId: string) => {
    if (circuitId.includes('sahyadri') || circuitId.includes('fort')) return '🏰';
    if (circuitId.includes('heritage') || circuitId.includes('caves') || circuitId.includes('ajanta')) return '🛕';
    if (circuitId.includes('wildlife') || circuitId.includes('tadoba') || circuitId.includes('deccan')) return '🐅';
    if (circuitId.includes('konkan') || circuitId.includes('coastal') || circuitId.includes('beach')) return '🌊';
    if (circuitId.includes('pilgrimage') || circuitId.includes('spiritual')) return '🛐';
    if (circuitId.includes('hill')) return '🏔️';
    return '🚩';
  };

  const getCircuitProgress = (circuit: Circuit) => {
    if (!circuit.destinations || circuit.destinations.length === 0) return 0;
    const completedCount = circuit.destinations.filter(id => profile.checkedInDestinations.includes(id)).length;
    return Math.round((completedCount / circuit.destinations.length) * 100);
  };

  const completedCircuitsCount = circuitsList.filter(c => getCircuitProgress(c) === 100).length;

  const handleSharePassport = () => {
    setIsShareModalOpen(true);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent text-slate-100 overflow-hidden relative">
      {/* Passport Header */}
      <div className="p-4 bg-[#18130E] border-b border-[#2A241C] sticky top-0 z-10 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <BookOpen className="w-5 h-5 text-amber-500" />
          <h2 className="text-sm font-bold text-white uppercase tracking-wider">
            {language === 'mr' ? 'डिजिटल पासपोर्ट' : 'Digital Passport'}
          </h2>
        </div>
        <button
          onClick={handleSharePassport}
          className="p-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-slate-950 flex items-center justify-center gap-1 active:scale-95 transition text-[10px] font-bold"
        >
          <Share2 className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'शेअर करा' : 'Share Card'}</span>
        </button>
      </div>

      {/* Main scrolling Passport Pages */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-8 space-y-4">
        {/* Passport statistics overview */}
        <div className="p-3.5 bg-gradient-to-br from-amber-500/10 via-slate-950/40 to-slate-950/20 border border-amber-500/20 rounded-2xl flex justify-between items-center gap-4">
          <div className="space-y-1">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">PASSPORT HOLDER</span>
            <h3 className="text-base font-bold text-white truncate max-w-[160px]">{profile.name || "Guest Traveller"}</h3>
            <p className="text-[9px] text-slate-400 font-mono">ID: {profile.referralCode || "MH-GUEST"}</p>
          </div>
          <div className="text-right">
            <span className="block text-[8px] text-slate-400 font-bold uppercase mb-0.5">CIRCUIT STAMPS</span>
            <div className="flex items-baseline justify-end gap-1">
              <span className="text-2xl font-black text-amber-400">{completedCircuitsCount}</span>
              <span className="text-xs text-slate-500 font-semibold">/ {circuitsList.length}</span>
            </div>
          </div>
        </div>

        {/* Passport Circuit Stamps Grid (Stamps are based on Circuit) */}
        <div className="space-y-3">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'mr' ? 'सर्किट आधारित पासपोर्ट शिक्के' : 'Circuit Passport Stamps'}</span>
            </h4>
            <span className="text-[8px] font-mono text-amber-400 font-bold uppercase">
              {completedCircuitsCount} VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
            {circuitsList.map((circuit, index) => {
              const pct = getCircuitProgress(circuit);
              const isStamped = pct === 100;
              const checkedInCount = circuit.destinations.filter(id => profile.checkedInDestinations.includes(id)).length;
              const motif = getCircuitMotif(circuit.id);

              return (
                <div
                  key={circuit.id}
                  className={`p-3 rounded-2xl border flex flex-col justify-between items-center transition relative overflow-hidden text-center ${
                    isStamped 
                      ? 'bg-gradient-to-br from-amber-500/15 via-slate-950/60 to-slate-950/40 border-amber-500/50 shadow-lg' 
                      : 'bg-slate-950/40 border-slate-800/80'
                  }`}
                >
                  {/* Decorative ink watermarks if circuit fully stamped */}
                  {isStamped && (
                    <div className="absolute inset-0 border border-dashed border-amber-500/20 rounded-full scale-[0.85] animate-spin" style={{ animationDuration: '30s' }} />
                  )}

                  <div className="w-full flex justify-between items-center text-[8px] text-slate-500 font-mono font-bold z-10">
                    <span>CIRCUIT #{index + 1}</span>
                    <span className={isStamped ? 'text-amber-400' : 'text-slate-400'}>{pct}%</span>
                  </div>

                  {/* Stamp motif with spring animation */}
                  <motion.div 
                    initial={isStamped ? { scale: 3, rotate: -30, opacity: 0 } : { scale: 0.9, opacity: 0.3 }}
                    animate={isStamped ? { scale: 1.1, rotate: -6, opacity: 1 } : { scale: 0.9, opacity: 0.3 }}
                    transition={isStamped ? { 
                      type: 'spring', 
                      stiffness: 220, 
                      damping: 12,
                      delay: 0.1 + (index * 0.05) 
                    } : { duration: 0.2 }}
                    className="text-3xl filter drop-shadow-md select-none my-2 z-10"
                  >
                    {motif}
                  </motion.div>

                  {/* Stamp details */}
                  <div className="text-center z-10 w-full">
                    <span className="block text-[10px] text-white font-extrabold truncate">
                      {language === 'mr' ? circuit.nameMr : circuit.name}
                    </span>
                    <span className="block text-[8px] text-slate-400 font-mono mt-0.5">
                      {checkedInCount}/{circuit.destinations.length} Spots Checked
                    </span>

                    {isStamped ? (
                      <span className="text-[8px] text-amber-400 font-mono font-black tracking-wider flex items-center justify-center gap-0.5 mt-1.5 uppercase bg-amber-500/10 border border-amber-500/30 py-0.5 rounded-full">
                        <CheckCircle className="w-2 h-2 stroke-[3]" />
                        <span>CIRCUIT STAMPED</span>
                      </span>
                    ) : (
                      <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden mt-2">
                        <div className="h-full bg-amber-500/60 rounded-full" style={{ width: `${pct}%` }} />
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Destination-Based Unlocked Badges */}
        <div className="bg-slate-900 border border-slate-800/60 rounded-3xl p-4 space-y-3.5 shadow-xl relative overflow-hidden">
          <div className="flex justify-between items-center px-1">
            <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Award className="w-3.5 h-3.5 text-amber-500" />
              <span>{language === 'mr' ? 'गंतव्य स्थानांवर आधारित पदके' : 'Destination Merit Badges'}</span>
            </h4>
            <span className="text-[8px] font-black bg-amber-500/10 text-amber-400 border border-amber-500/20 px-1.5 py-0.5 rounded font-mono uppercase tracking-widest">
              {profile.badges.length} UNLOCKED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {destinationsList.map((dest) => {
              const isCheckedIn = profile.checkedInDestinations.includes(dest.id);
              const badgeName = `${dest.name} Explorer`;

              return (
                <div
                  key={dest.id}
                  className={`p-2.5 rounded-2xl border flex items-center gap-2 transition relative overflow-hidden ${
                    isCheckedIn 
                      ? 'bg-gradient-to-br from-amber-500/15 via-slate-950/60 to-slate-950/40 border-amber-500/30 shadow-md' 
                      : 'bg-slate-950/20 border-slate-850/60 opacity-50'
                  }`}
                >
                  <span className="text-xl z-10 filter drop-shadow-sm select-none">{dest.stampMotif}</span>
                  <div className="min-w-0 z-10">
                    <h5 className="text-[9px] font-black text-white uppercase tracking-wide truncate">{badgeName}</h5>
                    <span className={`block text-[6px] font-bold font-mono tracking-wider uppercase ${isCheckedIn ? 'text-amber-400' : 'text-slate-500'}`}>
                      {isCheckedIn ? 'DESTINATION VERIFIED' : 'CHECK-IN REQUIRED'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Shareable Card Popover Overlay */}
      <AnimatePresence>
        {isShareModalOpen && (
          <div className="absolute inset-0 bg-slate-950/95 z-50 flex flex-col justify-between p-6 overflow-y-auto">
            <div className="flex-1 flex flex-col items-center justify-center my-auto">
              <div className="w-full max-w-[280px] bg-slate-900 border border-amber-500/40 rounded-3xl p-5 shadow-2xl relative space-y-4 text-center overflow-hidden">
                <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-full w-14 h-14 flex items-center justify-center mx-auto mb-2">
                  <Compass className="w-8 h-8 text-amber-400" />
                </div>

                <div className="space-y-1">
                  <span className="block text-[8px] font-black text-amber-400 uppercase tracking-widest">OFFICIAL TOURISM RECORD</span>
                  <h3 className="text-base font-extrabold text-white">MAHARASHTRA TRAVELER</h3>
                  <div className="w-16 h-0.5 bg-amber-500/30 mx-auto"></div>
                </div>

                <div className="space-y-2 py-3 bg-slate-950/50 rounded-2xl border border-slate-800">
                  <div>
                    <span className="block text-[8px] text-slate-500 font-bold uppercase">EXPLORER</span>
                    <span className="text-sm font-bold text-white">{profile.name}</span>
                  </div>
                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="block text-[7px] text-slate-500 font-bold uppercase">XP RECORDED</span>
                      <span className="text-xs font-extrabold text-amber-400">{profile.xp} XP</span>
                    </div>
                    <div>
                      <span className="block text-[7px] text-slate-500 font-bold uppercase">LEVEL RANK</span>
                      <span className="text-xs font-extrabold text-cyan-400">Lvl {profile.level}</span>
                    </div>
                  </div>
                </div>

                <div className="flex justify-around items-center gap-1 bg-amber-500/5 py-2.5 rounded-xl border border-amber-500/10">
                  <div className="text-center">
                    <span className="block text-[7px] text-slate-400 uppercase">CIRCUIT STAMPS</span>
                    <span className="text-xs font-black text-amber-400">{completedCircuitsCount} / {circuitsList.length}</span>
                  </div>
                  <div className="h-6 w-px bg-slate-800"></div>
                  <div className="text-center">
                    <span className="block text-[7px] text-slate-400 uppercase">DESTINATIONS</span>
                    <span className="text-xs font-black text-amber-400">
                      {profile.checkedInDestinations.length} / {destinationsList.length}
                    </span>
                  </div>
                </div>

                <span className="block text-[8px] font-mono text-slate-500 uppercase tracking-wider">
                  VERIFIED BY GOVERNMENT OF MAHARASHTRA
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setIsShareModalOpen(false)}
              className="w-full bg-slate-800 border border-slate-700 hover:bg-slate-750 text-slate-200 py-3 rounded-xl text-xs font-bold transition mt-4 cursor-pointer"
            >
              Close Share Card
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
