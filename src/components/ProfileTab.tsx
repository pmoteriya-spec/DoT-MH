import React, { useState } from 'react';
import { UserProfile, Circuit, Destination } from '../types';
import { CIRCUITS } from '../data';
import { Award, Shield, User, Share2, Users, Trophy, Settings, ChevronRight, Check, Compass, CheckCircle2 } from 'lucide-react';

interface ProfileTabProps {
  profile: UserProfile;
  language: 'en' | 'mr';
  onUpdateProfile: (updatedProfile: UserProfile) => void;
  onLogout: () => void;
  onUnlockBadge?: (badgeName: string, motif: string) => void;
  circuits?: Circuit[];
  destinations?: Destination[];
}

export default function ProfileTab({ 
  profile, 
  language, 
  onUpdateProfile, 
  onLogout, 
  onUnlockBadge,
  circuits,
  destinations 
}: ProfileTabProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(profile.name);
  const [editedLanguage, setEditedLanguage] = useState<'en' | 'mr'>(profile.language);

  const circuitsList = circuits || CIRCUITS;
  const totalCircuits = circuitsList.length;
  
  // Calculate circuit completion progress
  const completedCircuitsCount = circuitsList.filter(c => 
    c.destinations.length > 0 && c.destinations.every(id => profile.checkedInDestinations.includes(id))
  ).length;

  const circuitCoveragePct = totalCircuits > 0 ? Math.round((completedCircuitsCount / totalCircuits) * 100) : 0;

  const handleSaveProfile = () => {
    onUpdateProfile({
      ...profile,
      name: editedName,
      language: editedLanguage
    });
    setIsEditing(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent text-slate-100 overflow-hidden relative">
      {/* Profile Header */}
      <div className="p-4 bg-[#18130E] border-b border-[#2A241C] sticky top-0 z-10 flex justify-between items-center">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider">
          {language === 'mr' ? 'संशोधक प्रोफाइल' : 'Explorer Profile'}
        </h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="text-xs text-amber-500 font-bold hover:text-amber-400"
        >
          {isEditing ? (language === 'mr' ? 'रद्द करा' : 'Cancel') : (language === 'mr' ? 'संपादन' : 'Edit')}
        </button>
      </div>

      {/* Profile Scroll Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-8 space-y-4">
        {/* Explorer Avatar Display */}
        <div className="bg-slate-950/40 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center relative">
          <div className="relative w-20 h-20 mb-2.5">
            <div className="absolute inset-0 rounded-full border-2 border-amber-500/80 ring-4 ring-amber-500/20 flex items-center justify-center p-1">
              <div className="w-full h-full rounded-full bg-slate-800 flex items-center justify-center overflow-hidden">
                <span className="text-3xl">👤</span>
              </div>
            </div>

            <div className="absolute -bottom-1.5 -right-1 bg-amber-500 text-slate-950 text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900">
              {profile.level}
            </div>
          </div>

          <h3 className="text-xs font-bold text-white uppercase tracking-wider mt-1">
            {language === 'mr' ? 'अधिकृत पर्यटक प्रोफाइल' : 'Verified Tourism Traveller'}
          </h3>

          <div className="text-xs font-bold text-amber-400 mt-0.5">
            {profile.name || "Guest Traveller"}
          </div>
          <p className="text-[9px] text-slate-500 font-mono mt-0.5">District: {profile.district || 'Pune'}</p>
        </div>

        {/* Circuit Coverage Progression Card */}
        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 font-bold uppercase tracking-wider text-[10px] flex items-center gap-1.5">
              <Compass className="w-4 h-4 text-amber-500" />
              <span>{language === 'mr' ? 'सर्किट कव्हरेज प्रगती' : 'Circuit Coverage Progression'}</span>
            </span>
            <span className="text-amber-400 font-black font-mono">{circuitCoveragePct}%</span>
          </div>

          {/* Overall Circuit Progress bar */}
          <div className="space-y-1">
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div 
                className="h-full bg-gradient-to-r from-amber-500 to-amber-400 rounded-full transition-all duration-500" 
                style={{ width: `${circuitCoveragePct}%` }} 
              />
            </div>
            <div className="flex justify-between text-[9px] text-slate-400 font-mono font-semibold pt-0.5">
              <span>{completedCircuitsCount} of {totalCircuits} CIRCUITS COMPLETED</span>
              <span>{profile.xp} TOTAL XP</span>
            </div>
          </div>

          {/* Breakdown by Circuit */}
          <div className="pt-2 border-t border-slate-800/80 space-y-2">
            <span className="block text-[8px] text-slate-500 font-bold uppercase tracking-wider">
              {language === 'mr' ? 'प्रत्येक सर्किटची स्थिती' : 'Individual Circuit Completion'}
            </span>
            
            <div className="space-y-1.5">
              {circuitsList.map(circuit => {
                const checkedInInCircuit = circuit.destinations.filter(id => profile.checkedInDestinations.includes(id)).length;
                const totalInCircuit = circuit.destinations.length;
                const pct = totalInCircuit > 0 ? Math.round((checkedInInCircuit / totalInCircuit) * 100) : 0;
                const isComplete = pct === 100;

                return (
                  <div key={circuit.id} className="p-2 bg-slate-950/60 rounded-lg border border-slate-850/80 space-y-1">
                    <div className="flex justify-between items-center text-[9px] font-bold">
                      <span className="text-slate-200 flex items-center gap-1 truncate max-w-[170px]">
                        {isComplete ? <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" /> : <div className="w-2 h-2 rounded-full bg-amber-500/50 shrink-0" />}
                        {language === 'mr' ? circuit.nameMr : circuit.name}
                      </span>
                      <span className={`font-mono shrink-0 ${isComplete ? 'text-emerald-400' : 'text-amber-400'}`}>
                        {checkedInInCircuit}/{totalInCircuit} ({pct}%)
                      </span>
                    </div>
                    <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${isComplete ? 'bg-emerald-400' : 'bg-amber-500'}`} 
                        style={{ width: `${pct}%` }} 
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Edit profile form if active */}
        {isEditing && (
          <div className="p-4 bg-slate-900 border-2 border-amber-500/20 rounded-xl space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">Edit Profile Settings</h4>
            
            <div className="space-y-3">
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Name</label>
                <input
                  type="text"
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase mb-1">Language</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setEditedLanguage('en')}
                    className={`py-1.5 rounded-lg border text-xs font-bold ${editedLanguage === 'en' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditedLanguage('mr')}
                    className={`py-1.5 rounded-lg border text-xs font-bold ${editedLanguage === 'mr' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-slate-950 border-slate-800 text-slate-400'}`}
                  >
                    मराठी
                  </button>
                </div>
              </div>

              <button
                type="button"
                onClick={handleSaveProfile}
                className="w-full bg-amber-500 text-slate-950 font-bold py-2 rounded-lg text-xs active:scale-95 transition"
              >
                Save Profile
              </button>
            </div>
          </div>
        )}

        {/* Invite Friends Referral System Dashboard */}
        <div className="p-3.5 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
          <div className="flex justify-between items-center text-xs">
            <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4 h-4 text-cyan-400" />
              <span>Referral Network</span>
            </h4>
            <span className="text-[8px] bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded-full text-cyan-400 font-bold uppercase">
              No Cash Rewards
            </span>
          </div>

          <p className="text-[10px] text-slate-300 leading-relaxed">
            Invite friends to explore Maharashtra! Both you and your friend earn <strong className="text-amber-400">+50 XP</strong> and unlock the exclusive <strong className="text-cyan-400">Community Builder</strong> Badge!
          </p>

          <div className="p-2.5 bg-slate-950/50 border border-slate-800 rounded-xl flex justify-between items-center">
            <div>
              <span className="block text-[8px] text-slate-500 font-bold uppercase">Your Invite Code</span>
              <span className="text-xs font-mono font-black text-amber-400 tracking-wider">
                {profile.referralCode || "MHT-GUEST-99"}
              </span>
            </div>
            <button 
              type="button"
              onClick={() => {
                if (onUnlockBadge) {
                  onUnlockBadge('Community Builder', '👥');
                }
              }}
              className="px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-black text-[10px] rounded-lg active:scale-95 transition flex items-center gap-1 uppercase tracking-wider cursor-pointer"
            >
              <Share2 className="w-3.5 h-3.5 stroke-[3]" />
              <span>Copy Code</span>
            </button>
          </div>

          {/* Referral Statistics */}
          <div className="grid grid-cols-3 gap-2 text-center pt-1 border-t border-slate-800/80">
            <div>
              <span className="block text-[8px] text-slate-500 font-bold uppercase">Invites Sent</span>
              <span className="text-xs font-black text-white">4</span>
            </div>
            <div>
              <span className="block text-[8px] text-slate-500 font-bold uppercase">Pending</span>
              <span className="text-xs font-black text-slate-400">3</span>
            </div>
            <div>
              <span className="block text-[8px] text-slate-500 font-bold uppercase">Converted</span>
              <span className="text-xs font-black text-emerald-400">1</span>
            </div>
          </div>
        </div>

        {/* Clear Data Reset option */}
        <button
          type="button"
          onClick={onLogout}
          className="w-full py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 text-rose-400 text-xs font-bold transition active:scale-95 cursor-pointer"
        >
          {language === 'mr' ? 'लॉगआउट / डेटा रीसेट करा' : 'Reset Demo Session'}
        </button>
      </div>
    </div>
  );
}
