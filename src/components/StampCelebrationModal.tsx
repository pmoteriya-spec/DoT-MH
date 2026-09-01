import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, Award, ArrowRight, BookOpen } from 'lucide-react';

interface StampCelebrationModalProps {
  isOpen: boolean;
  type: 'stamp' | 'badge';
  name: string;
  motif?: string; // e.g. "🧗‍♂️" or "🍓" for destinations
  category?: string; // e.g. "hill_station", "heritage"
  onClose: () => void;
  language: 'en' | 'mr';
}

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
  size: number;
}

export default function StampCelebrationModal({
  isOpen,
  type,
  name,
  motif = '📍',
  category = 'adventure',
  onClose,
  language,
}: StampCelebrationModalProps) {
  // Animation phases: 'hover' | 'press' | 'reveal'
  const [phase, setPhase] = useState<'hover' | 'press' | 'reveal'>('hover');
  const [particles, setParticles] = useState<Particle[]>([]);
  const [stampSoundTrigger, setStampSoundTrigger] = useState(false);

  // Generate particles on stamp press
  const spawnParticles = () => {
    const colors = type === 'stamp' 
      ? ['#f59e0b', '#fbbf24', '#fef08a', '#d97706'] // Amber theme for stamps
      : ['#22d3ee', '#38bdf8', '#06b6d4', '#e0f2fe']; // Cyan/blue theme for badges
    
    const newParticles = Array.from({ length: 30 }).map((_, i) => {
      const angle = Math.random() * Math.PI * 2;
      const velocity = 20 + Math.random() * 80;
      return {
        id: i,
        x: Math.cos(angle) * velocity,
        y: Math.sin(angle) * velocity,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: 3 + Math.random() * 6,
      };
    });
    setParticles(newParticles);
  };

  useEffect(() => {
    if (isOpen) {
      setPhase('hover');
      setParticles([]);
      
      // Sequence:
      // 1. Enter from above and hover (0ms)
      // 2. Slam down hard (600ms)
      const pressTimer = setTimeout(() => {
        setPhase('press');
        setStampSoundTrigger(true);
        spawnParticles();
      }, 700);

      // 3. Lift stamp and reveal the ink impression (1100ms)
      const revealTimer = setTimeout(() => {
        setPhase('reveal');
      }, 1200);

      return () => {
        clearTimeout(pressTimer);
        clearTimeout(revealTimer);
      };
    }
  }, [isOpen, name, type]);

  if (!isOpen) return null;

  const titleText = type === 'stamp' 
    ? (language === 'mr' ? 'नवीन शिक्का मिळाला!' : 'PASSPORT STAMPED!') 
    : (language === 'mr' ? 'नवीन पदक अनलॉक झाले!' : 'BADGE ACQUIRED!');

  const subText = type === 'stamp'
    ? (language === 'mr' ? `${name} चे स्थान यशस्वीरित्या सत्यापित केले गेले.` : `Successfully verified GPS coordinates at ${name}.`)
    : (language === 'mr' ? `अभिनंदन! तुम्ही "${name}" संपादन साध्य केले आहे.` : `Congratulations! You unlocked the elite "${name}" accomplishment.`);

  const themeColor = type === 'stamp' ? 'text-amber-400 border-amber-500/40 bg-amber-500/5' : 'text-cyan-400 border-cyan-500/40 bg-cyan-500/5';
  const themeInkColor = type === 'stamp' ? 'text-amber-500 border-amber-500' : 'text-cyan-500 border-cyan-500';
  const stampImage = type === 'stamp' ? motif : '🏅';

  return (
    <AnimatePresence>
      <div className="absolute inset-0 bg-slate-950/95 backdrop-blur-md z-50 flex flex-col justify-center items-center p-4 overflow-hidden select-none">
        {/* Flash Effect on Slam Down */}
        {phase === 'press' && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.4, 0] }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-white z-50 pointer-events-none"
          />
        )}

        {/* Core Celebration Canvas */}
        <div className="w-full max-w-[320px] flex flex-col items-center relative py-6">
          
          {/* Virtual Passport Page background */}
          <div className="w-full bg-slate-900 border border-slate-800/80 rounded-3xl p-5 shadow-2xl relative space-y-6 overflow-hidden flex flex-col items-center">
            {/* Passport Grid Watermark */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:12px_12px] opacity-20" />
            
            <div className="z-10 text-center space-y-1">
              <span className="text-[9px] font-black tracking-widest text-slate-500 uppercase">
                {type === 'stamp' ? 'OFFICIAL INK RECORD' : 'STATE ACCOMPLISHMENT'}
              </span>
              <h3 className="text-sm font-extrabold text-white uppercase tracking-wider">{titleText}</h3>
              <div className="w-12 h-0.5 bg-slate-800 mx-auto" />
            </div>

            {/* Target Area for Stamp */}
            <div className="w-40 h-40 rounded-full border-2 border-dashed border-slate-800 flex items-center justify-center relative bg-slate-950/20">
              
              {/* Splatters / Particles on hit */}
              <div className="absolute">
                {particles.map((p) => (
                  <motion.div
                    key={p.id}
                    initial={{ x: 0, y: 0, scale: 1, opacity: 1 }}
                    animate={{ x: p.x, y: p.y, scale: 0, opacity: 0 }}
                    transition={{ type: 'spring', stiffness: 80, damping: 10, duration: 0.8 }}
                    className="absolute rounded-full pointer-events-none"
                    style={{
                      backgroundColor: p.color,
                      width: p.size,
                      height: p.size,
                      marginLeft: -p.size / 2,
                      marginTop: -p.size / 2,
                    }}
                  />
                ))}
              </div>

              {/* Ink Impression Left on the Page */}
              <AnimatePresence>
                {(phase === 'press' || phase === 'reveal') && (
                  <motion.div
                    initial={{ scale: 2.2, opacity: 0, rotate: -30 }}
                    animate={{ 
                      scale: 1, 
                      opacity: 1, 
                      rotate: -12,
                      filter: ['blur(2px)', 'blur(0.5px)', 'blur(0px)']
                    }}
                    transition={{ 
                      type: 'spring', 
                      stiffness: phase === 'press' ? 450 : 150, 
                      damping: phase === 'press' ? 12 : 20,
                    }}
                    className={`w-32 h-32 rounded-full border-4 ${themeInkColor} flex flex-col items-center justify-center p-3 relative select-none`}
                  >
                    {/* Double Ring Retro Stamp Design */}
                    <div className={`absolute inset-1.5 border-2 border-dashed ${themeInkColor} rounded-full opacity-60`} />
                    <div className={`absolute inset-4 border border-solid ${themeInkColor} rounded-full opacity-25`} />
                    
                    {/* Distressed ink texture simulation overlay */}
                    <div className="absolute inset-0 bg-[radial-gradient(#0f172a_1px,transparent_1px)] bg-[size:3px_3px] opacity-35 mix-blend-multiply pointer-events-none" />

                    <span className="text-4xl filter drop-shadow-md z-10 select-none animate-pulse">
                      {stampImage}
                    </span>

                    <span className="block text-[8px] font-black uppercase tracking-widest mt-1.5 z-10 text-center truncate max-w-full">
                      {name.split(' ')[0]}
                    </span>
                    
                    <span className="block text-[6px] font-bold font-mono tracking-wide opacity-85 z-10">
                      {type === 'stamp' ? 'VERIFIED VISIT' : 'UNLOCKED'}
                    </span>

                    <span className="absolute bottom-2.5 text-[5px] font-bold font-mono opacity-60 tracking-widest">
                      MH-TOURISM
                    </span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Ink Shockwave Ripple ring on strike */}
              {phase === 'press' && (
                <motion.div
                  initial={{ scale: 0.3, opacity: 1, borderWidth: 8 }}
                  animate={{ scale: 1.6, opacity: 0, borderWidth: 1 }}
                  transition={{ duration: 0.5 }}
                  className={`absolute rounded-full border ${themeInkColor} pointer-events-none`}
                  style={{ width: '120px', height: '120px' }}
                />
              )}
            </div>

            {/* Milestone Text & XP Info */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: phase === 'reveal' ? 1 : 0, y: phase === 'reveal' ? 0 : 10 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-center z-10 w-full"
            >
              <div className="space-y-1">
                <p className="text-[11px] text-slate-300 leading-normal font-medium max-w-[240px] mx-auto">
                  {subText}
                </p>
                {type === 'stamp' ? (
                  <span className="inline-block text-[8px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Category: {category.replace('_', ' ')}
                  </span>
                ) : (
                  <span className="inline-block text-[8px] font-bold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                    Accomplishment Earned
                  </span>
                )}
              </div>

              {/* Reward pill */}
              <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-2xl flex justify-around items-center max-w-[240px] mx-auto">
                <div className="text-center">
                  <span className="block text-[7px] text-slate-500 font-bold uppercase">REWARDED</span>
                  <span className="text-xs font-black text-amber-400 flex items-center gap-0.5 justify-center">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span>+100 XP</span>
                  </span>
                </div>
                <div className="w-px h-6 bg-slate-800" />
                <div className="text-center">
                  <span className="block text-[7px] text-slate-500 font-bold uppercase">WALLET</span>
                  <span className="text-xs font-black text-white">UPDATED</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Physical Rubber Stamp Tool that flies in and slams down */}
          <AnimatePresence>
            {(phase === 'hover' || phase === 'press') && (
              <motion.div
                initial={{ y: -350, x: -10, rotate: -35, scale: 1.8, opacity: 0 }}
                animate={
                  phase === 'hover'
                    ? { y: -105, x: 0, rotate: -15, scale: 1.4, opacity: 1 }
                    : { y: -15, x: 0, rotate: 0, scale: 1.0, opacity: 1 }
                }
                exit={{ y: -250, scale: 1.5, opacity: 0, rotate: 20 }}
                transition={{
                  type: 'spring',
                  stiffness: phase === 'press' ? 450 : 150,
                  damping: phase === 'press' ? 14 : 16,
                  mass: phase === 'press' ? 1.2 : 1.0,
                }}
                className="absolute top-1/2 left-1/2 -ml-12 -mt-36 z-50 pointer-events-none drop-shadow-[0_20px_35px_rgba(0,0,0,0.8)]"
              >
                {/* Visual Representation of a Vintage Wooden Stamp Tool */}
                <div className="flex flex-col items-center">
                  {/* Top Wooden Handle Knob */}
                  <div className="w-8 h-8 rounded-full bg-amber-850 border border-amber-900 shadow-inner" style={{ background: 'linear-gradient(135deg, #78350f, #451a03)' }} />
                  {/* Handle neck */}
                  <div className="w-3 h-8 bg-amber-800 border-x border-amber-900" style={{ background: '#78350f' }} />
                  {/* Metallic collar ring */}
                  <div className="w-10 h-2 bg-slate-400 border border-slate-500" />
                  {/* Stamp mount base */}
                  <div className="w-24 h-5 rounded-md bg-slate-800 border-t border-slate-700 shadow-md flex items-center justify-center font-bold text-[8px] text-slate-500 font-mono">
                    MH-TOURISM
                  </div>
                  {/* Rubber seal layer */}
                  <div className={`w-22 h-1.5 bg-rose-600 rounded-b-md ${phase === 'press' ? 'opacity-30' : 'opacity-100'}`} />
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Action button to proceed */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: phase === 'reveal' ? 1 : 0, y: phase === 'reveal' ? 0 : 20 }}
            className="w-full mt-5 text-center"
          >
            <button
              onClick={onClose}
              className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 font-black py-3 rounded-2xl text-xs transition duration-200 shadow-lg shadow-amber-950/40 active:scale-95 flex items-center justify-center gap-1.5 uppercase tracking-wider"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{language === 'mr' ? 'पासपोर्ट मध्ये जतन करा' : 'File in Passport'}</span>
            </button>
          </motion.div>

        </div>
      </div>
    </AnimatePresence>
  );
}
