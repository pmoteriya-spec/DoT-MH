import React, { useState } from 'react';
import { UserProfile } from '../types';
import { Compass, GraduationCap, Trophy, ArrowRight, CheckCircle2, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import MaharashtraLogo from './MaharashtraLogo';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
  onContinueAsGuest: () => void;
}

const COUNTRIES_DATA: Record<string, Record<string, string[]>> = {
  'India': {
    'Maharashtra': ['Pune', 'Mumbai', 'Satara', 'Aurangabad', 'Nagpur', 'Chandrapur', 'Amravati'],
    'Karnataka': ['Bengaluru', 'Mysuru', 'Hubli'],
    'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara']
  },
  'United States': {
    'California': ['Los Angeles', 'San Francisco', 'San Diego'],
    'Texas': ['Houston', 'Austin', 'Dallas'],
    'New York': ['Manhattan', 'Brooklyn', 'Queens']
  },
  'United Kingdom': {
    'England': ['Greater London', 'West Midlands', 'Greater Manchester'],
    'Scotland': ['Edinburgh', 'Glasgow', 'Aberdeen']
  }
};

export default function Onboarding({ onComplete, onContinueAsGuest }: OnboardingProps) {
  const [carouselIndex, setCarouselIndex] = useState(0);
  const [step, setStep] = useState<'carousel' | 'profile' | 'otp' | 'success'>('carousel');

  // Form states
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [language, setLanguage] = useState<'en' | 'mr'>('en');
  const [ageBand, setAgeBand] = useState('18-25');
  const [country, setCountry] = useState('India');
  const [stateVal, setStateVal] = useState('Maharashtra');
  const [district, setDistrict] = useState('Pune');
  const [guardianConsent, setGuardianConsent] = useState(false);
  const [otp, setOtp] = useState('');
  const [otpError, setOtpError] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [invitedCode, setInvitedCode] = useState('');

  // Sync / Restore States
  const [mode, setMode] = useState<'create' | 'sync'>('create');
  const [tempProfile, setTempProfile] = useState<UserProfile | null>(null);
  const [syncError, setSyncError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const carouselScreens = [
    {
      title: 'Explore Maharashtra',
      titleMr: 'महाराष्ट्र दर्शन',
      description: 'Journey through misty hill stations, ancient stone caves, and wild tiger reserves in a beautifully gamified format.',
      descriptionMr: 'धुके पडलेली थंड हवेची ठिकाणे, प्राचीन पाषाण लेणी आणि वाघांचे अभयारण्य यांचा एका रंजक खेळ स्वरूपात प्रवास करा.',
      icon: <Compass className="w-16 h-16 text-[#E86B21]" />,
      color: 'from-[#E86B21]/20 to-slate-900'
    },
    {
      title: 'Learn & Quiz',
      titleMr: 'शिका आणि क्विझ खेळा',
      description: 'Test your heritage knowledge with local trivia and play interactive visual games to earn Experience Points (XP).',
      descriptionMr: 'स्थानिक सामान्य ज्ञानासह तुमच्या वारशाची चाचणी घ्या आणि अनुभव गुण (XP) मिळवण्यासाठी रंजक खेळ खेळा.',
      icon: <GraduationCap className="w-16 h-16 text-emerald-500" />,
      color: 'from-emerald-600/20 to-slate-900'
    },
    {
      title: 'Stamp Your Passport',
      titleMr: 'पासポートवर शिक्का मिळवा',
      description: 'Perform real-time GPS check-ins at destinations to unlock unique digital stamps, rare collectibles, and official certificates.',
      descriptionMr: 'अद्वितीय डिजिटल शिक्के, दुर्मिळ गोष्टी आणि अधिकृत प्रमाणपत्रे मिळवण्यासाठी प्रत्यक्ष स्थळांवर जाऊन जीपीएस चेक-इन करा.',
      icon: <Trophy className="w-16 h-16 text-[#E86B21]" />,
      color: 'from-[#E86B21]/20 to-slate-900'
    }
  ];

  const handleNextCarousel = () => {
    if (carouselIndex < carouselScreens.length - 1) {
      setCarouselIndex(prev => prev + 1);
    } else {
      setStep('profile');
    }
  };

  const validateProfile = () => {
    if (!name.trim()) return false;
    if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
      setMobileError(language === 'mr' ? 'कृपया अचूक १०-अंकी मोबाईल क्रमांक टाका' : 'Enter a valid 10-digit mobile number');
      return false;
    }
    setMobileError('');
    if (ageBand === 'Under 13' && !guardianConsent) {
      return false;
    }
    return true;
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === 'create') {
      if (validateProfile()) {
        setStep('otp');
      }
    } else {
      // Sync / Restore mode
      if (mobile.length !== 10 || !/^\d+$/.test(mobile)) {
        setMobileError(language === 'mr' ? 'कृपया अचूक १०-अंकी मोबाईल क्रमांक टाका' : 'Enter a valid 10-digit mobile number');
        return;
      }
      setMobileError('');
      setSyncError('');
      setIsLoading(true);

      fetch(`/api/profile/${mobile}`)
        .then(res => {
          if (!res.ok) {
            throw new Error(language === 'mr' ? 'या मोबाईल क्रमांकाचा कोणताही पासपोर्ट सापडला नाही!' : 'No passport found for this mobile number! Please check and try again.');
          }
          return res.json();
        })
        .then(data => {
          if (data.success && data.profile) {
            setTempProfile(data.profile);
            setStep('otp');
          } else {
            setSyncError(language === 'mr' ? 'पासपोर्ट सापडला नाही.' : 'Passport not found.');
          }
        })
        .catch(err => {
          setSyncError(err.message || 'Error connecting to database');
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    if (otp === '123456') {
      setOtpError('');
      setStep('success');
      setTimeout(() => {
        if (mode === 'sync' && tempProfile) {
          onComplete(tempProfile);
        } else {
          onComplete({
            name: name,
            mobile: mobile,
            language: language,
            ageBand: ageBand,
            country: country,
            state: stateVal,
            district: district,
            xp: invitedCode.trim() ? 50 : 0,
            level: 1,
            levelTitle: language === 'mr' ? 'नवशिक्या संशोधक' : 'Novice Explorer',
            checkedInDestinations: [],
            badges: invitedCode.trim() ? ['Community Builder'] : [],
            referralCode: `MHT-${name.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
            invitedCode: invitedCode.trim() || undefined
          });
        }
      }, 1500);
    } else {
      setOtpError(language === 'mr' ? 'अचूक ६-अंकी ओटीसी (123456) टाका' : 'Invalid OTP. Enter 123456 for test demo!');
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-transparent text-slate-100 overflow-y-auto px-5 py-6">
      {step === 'carousel' && (
        <div className="flex-1 flex flex-col justify-between h-full">
          <div className="flex justify-between items-center mb-6">
            <MaharashtraLogo size={32} light={true} layout="horizontal" />
            <button 
              onClick={onContinueAsGuest}
              className="text-xs text-amber-200/50 hover:text-white transition bg-[#251E18]/50 px-2.5 py-1 rounded-full border border-[#3E3024]/50"
            >
              Skip as Guest
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center text-center my-auto">
            <motion.div 
              key={carouselIndex}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="mb-8"
            >
              {carouselIndex === 0 ? (
                <div className="flex flex-col items-center justify-center">
                  <MaharashtraLogo size={85} light={true} hideText={false} />
                </div>
              ) : (
                <div className="p-6 bg-[#251E18]/40 rounded-full border border-[#3E3024]/40 shadow-inner">
                  {carouselScreens[carouselIndex].icon}
                </div>
              )}
            </motion.div>

            <motion.h2 
              key={`title-${carouselIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="text-3xl font-extrabold tracking-tight text-white mb-3 text-center leading-tight bg-gradient-to-r from-white via-amber-200 to-[#E86B21] bg-clip-text text-transparent"
            >
              {language === 'mr' ? carouselScreens[carouselIndex].titleMr : carouselScreens[carouselIndex].title}
            </motion.h2>

            <motion.p 
              key={`desc-${carouselIndex}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
              className="text-base text-amber-100/90 leading-relaxed max-w-[310px]"
            >
              {language === 'mr' ? carouselScreens[carouselIndex].descriptionMr : carouselScreens[carouselIndex].description}
            </motion.p>
          </div>

          <div className="mt-8 flex flex-col gap-4">
            {/* Dots */}
            <div className="flex justify-center gap-2">
              {carouselScreens.map((_, idx) => (
                <div 
                  key={idx} 
                  className={`h-1.5 rounded-full transition-all duration-300 ${idx === carouselIndex ? 'w-6 bg-[#E86B21]' : 'w-1.5 bg-[#3E3024]'}`}
                />
              ))}
            </div>

            {/* Language toggle for preview */}
            <div className="flex justify-center gap-2 bg-[#251E18]/50 p-1 rounded-full border border-[#3E3024]/50 max-w-[160px] mx-auto text-xs mt-2">
              <button 
                onClick={() => setLanguage('en')}
                className={`flex-1 py-1 rounded-full text-center transition ${language === 'en' ? 'bg-[#E86B21] text-slate-950 font-bold' : 'text-amber-200/50'}`}
              >
                EN
              </button>
              <button 
                onClick={() => setLanguage('mr')}
                className={`flex-1 py-1 rounded-full text-center transition ${language === 'mr' ? 'bg-[#E86B21] text-slate-950 font-bold' : 'text-amber-200/50'}`}
              >
                मराठी
              </button>
            </div>

            <button 
              onClick={handleNextCarousel}
              className="w-full bg-[#E86B21] hover:bg-[#C45512] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-amber-950/20 active:scale-95 transition flex items-center justify-center gap-2 mt-2 cursor-pointer"
            >
              <span>{carouselIndex === carouselScreens.length - 1 ? (language === 'mr' ? 'सुरू करा' : 'Get Started') : (language === 'mr' ? 'पुढे जा' : 'Continue')}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {step === 'profile' && (
        <form onSubmit={handleProfileSubmit} className="flex-1 flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-col gap-4 mb-6">
              <MaharashtraLogo size={36} light={true} layout="horizontal" />
              <div className="h-px bg-[#2D231A] w-full" />
              
              {/* Beautiful Segmented Mode Switcher */}
              <div className="grid grid-cols-2 p-1 bg-slate-900/60 border border-slate-800 rounded-xl text-xs font-semibold">
                <button
                  type="button"
                  onClick={() => {
                    setMode('create');
                    setSyncError('');
                    setMobileError('');
                  }}
                  className={`py-2 rounded-lg text-center transition cursor-pointer ${mode === 'create' ? 'bg-[#E86B21] text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  {language === 'mr' ? 'नवीन पासपोर्ट' : 'New Passport'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode('sync');
                    setSyncError('');
                    setMobileError('');
                  }}
                  className={`py-2 rounded-lg text-center transition cursor-pointer ${mode === 'sync' ? 'bg-[#E86B21] text-white shadow-md font-bold' : 'text-slate-400 hover:text-white'}`}
                >
                  {language === 'mr' ? 'पासपोर्ट जोडा' : 'Sync / Restore'}
                </button>
              </div>

              <div>
                <h3 className="text-base font-bold text-white">
                  {mode === 'create' 
                    ? (language === 'mr' ? 'नवीन डिजिटल पासपोर्ट बनवा' : 'Create Digital Passport')
                    : (language === 'mr' ? 'जुना पासपोर्ट सिंक्रोनाइझ करा' : 'Restore Existing Passport')
                  }
                </h3>
                <p className="text-[10px] text-amber-200/60">
                  {mode === 'create' 
                    ? (language === 'mr' ? 'पायरी १ पैकी २: प्रोफाइल तयार करा' : 'Step 1 of 2: Create Profile')
                    : (language === 'mr' ? 'पायरी १ पैकी २: मोबाईलद्वारे शोधा' : 'Step 1 of 2: Find by Mobile')
                  }
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {mode === 'create' ? (
                <>
                  {/* Language selection */}
                  <div>
                    <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                      {language === 'mr' ? 'भाषा' : 'Preferred Language'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        onClick={() => setLanguage('en')}
                        className={`py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${language === 'en' ? 'bg-[#E86B21]/10 border-[#E86B21] text-amber-400' : 'bg-slate-800/30 border-slate-700/50 text-slate-300'}`}
                      >
                        English
                      </button>
                      <button
                        type="button"
                        onClick={() => setLanguage('mr')}
                        className={`py-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition ${language === 'mr' ? 'bg-[#E86B21]/10 border-[#E86B21] text-amber-400' : 'bg-slate-800/30 border-slate-700/50 text-slate-300'}`}
                      >
                        मराठी (Marathi)
                      </button>
                    </div>
                  </div>

              {/* Name */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? 'पूर्ण नाव' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder={language === 'mr' ? 'उदा. राहुल पाटील' : 'e.g. Rahul Patil'}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E86B21] focus:ring-1 focus:ring-[#E86B21]/30 transition placeholder-slate-500"
                />
              </div>

              {/* Mobile */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? 'मोबाईल नंबर' : 'Mobile Number'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl pl-12 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E86B21] focus:ring-1 focus:ring-[#E86B21]/30 transition placeholder-slate-500"
                  />
                </div>
                {mobileError && <p className="text-[10px] text-rose-500 mt-1">{mobileError}</p>}
              </div>

              {/* Invited Code (Optional) */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? 'निमंत्रण कोड / रेफरल कोड (ऐच्छिक)' : 'Invited Code / Referral Code (Optional)'}
                </label>
                <input
                  type="text"
                  placeholder={language === 'mr' ? 'उदा. MHT-SAH-592' : 'e.g. MHT-SAH-592'}
                  value={invitedCode}
                  onChange={(e) => setInvitedCode(e.target.value.toUpperCase().trim())}
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2.5 text-xs text-white uppercase focus:outline-none focus:border-[#E86B21] focus:ring-1 focus:ring-[#E86B21]/30 transition placeholder-slate-500 font-mono tracking-wider"
                />
                <span className="block text-[9px] text-slate-500 mt-1 leading-normal font-medium">
                  {language === 'mr' ? 'मित्राचा कोड टाकल्यास लगेच +५० XP आणि विशेष बॅज मिळेल!' : "Enter a friend's code to instantly start with +50 XP & Community Builder Badge!"}
                </span>
              </div>

              {/* Country Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? 'देश' : 'Country'}
                </label>
                <select
                  value={country}
                  onChange={(e) => {
                    const nextCountry = e.target.value;
                    setCountry(nextCountry);
                    const states = Object.keys(COUNTRIES_DATA[nextCountry] || {});
                    const nextState = states[0] || '';
                    setStateVal(nextState);
                    const districts = COUNTRIES_DATA[nextCountry]?.[nextState] || [];
                    setDistrict(districts[0] || '');
                  }}
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E86B21] transition"
                >
                  {Object.keys(COUNTRIES_DATA).map((c) => (
                    <option key={c} value={c} className="bg-slate-900 text-slate-100">
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              {/* State Selection */}
              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? 'राज्य' : 'State'}
                </label>
                <select
                  value={stateVal}
                  onChange={(e) => {
                    const nextState = e.target.value;
                    setStateVal(nextState);
                    const districts = COUNTRIES_DATA[country]?.[nextState] || [];
                    setDistrict(districts[0] || '');
                  }}
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E86B21] transition"
                >
                  {Object.keys(COUNTRIES_DATA[country] || {}).map((s) => (
                    <option key={s} value={s} className="bg-slate-900 text-slate-100">
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Age Band & District */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    {language === 'mr' ? 'वय गट' : 'Age Band'}
                  </label>
                  <select
                    value={ageBand}
                    onChange={(e) => setAgeBand(e.target.value)}
                    className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E86B21] transition"
                  >
                    <option value="Under 13" className="bg-slate-900 text-slate-100">Under 13</option>
                    <option value="13-18" className="bg-slate-900 text-slate-100">13-18</option>
                    <option value="18-25" className="bg-slate-900 text-slate-100">18-25</option>
                    <option value="25+" className="bg-slate-900 text-slate-100">25+</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                    {language === 'mr' ? 'जिल्हा / क्षेत्र' : 'District / Region'}
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E86B21] transition"
                  >
                    {(COUNTRIES_DATA[country]?.[stateVal] || []).map((d) => (
                      <option key={d} value={d} className="bg-slate-900 text-slate-100">
                        {d}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Guardian Consent if under 13 */}
              {ageBand === 'Under 13' && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl flex gap-2 items-start">
                  <input
                    type="checkbox"
                    id="consent"
                    checked={guardianConsent}
                    onChange={(e) => setGuardianConsent(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 bg-slate-800 text-rose-500 focus:ring-rose-500/30"
                  />
                  <label htmlFor="consent" className="text-[10px] text-slate-300 leading-snug">
                    {language === 'mr' 
                      ? 'मी पालक म्हणून माझ्या पाल्याला या पर्यटन प्लॅटफॉर्मचा वापर करण्याची परवानगी देत आहे.' 
                      : 'I consent as a parent/guardian for my child to explore this non-monetary learning platform.'}
                  </label>
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="p-4 bg-slate-900/60 border border-[#3E3024]/40 rounded-xl text-xs text-amber-200/80 leading-relaxed">
                {language === 'mr' 
                  ? 'इतर कोणत्याही सिस्टीम किंवा ब्राउझरवरून तुमचा जुना डिजिटल पासपोर्ट रिस्टोर करण्यासाठी तुमचा पूर्वी नोंदणीकृत मोबाईल नंबर टाका.'
                  : 'Enter your previously registered mobile number to retrieve and restore your digital passport, stamps, achievements, and explorer stats from other devices.'
                }
              </div>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? 'नोंदणीकृत मोबाईल नंबर' : 'Registered Mobile Number'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-xs font-semibold text-slate-400">+91</span>
                  <input
                    type="tel"
                    required
                    maxLength={10}
                    placeholder="9876543210"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl pl-12 pr-3 py-2.5 text-xs text-white focus:outline-none focus:border-[#E86B21] focus:ring-1 focus:ring-[#E86B21]/30 transition placeholder-slate-500"
                  />
                </div>
                {mobileError && <p className="text-[10px] text-rose-500 mt-1">{mobileError}</p>}
                {syncError && (
                  <p className="text-xs text-rose-400 mt-3 font-semibold bg-rose-500/10 border border-rose-500/20 p-3 rounded-xl leading-relaxed">
                    ⚠️ {syncError}
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

          <button
            type="submit"
            disabled={isLoading || (mode === 'create' && ageBand === 'Under 13' && !guardianConsent)}
            className="w-full bg-[#E86B21] hover:bg-[#C45512] disabled:bg-slate-800 disabled:text-slate-500 text-white font-bold py-3.5 px-4 rounded-xl shadow-lg mt-6 flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
          >
            {isLoading ? (
              <span className="animate-pulse">{language === 'mr' ? 'शोधत आहे...' : 'Locating Passport...'}</span>
            ) : (
              <>
                <span>{language === 'mr' ? 'ओटीपी पाठवा' : 'Request OTP'}</span>
                <ChevronRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>
      )}

      {step === 'otp' && (
        <form onSubmit={handleVerifyOtp} className="flex-1 flex flex-col justify-between h-full">
          <div>
            <div className="flex flex-col gap-4 mb-6">
              <MaharashtraLogo size={36} light={true} layout="horizontal" />
              <div className="h-px bg-slate-800 w-full" />
              <div>
                <h3 className="text-base font-bold text-white">
                  {language === 'mr' ? 'मोबाईल पडताळणी' : 'Verify Mobile'}
                </h3>
                <p className="text-[10px] text-slate-400">Step 2 of 2: OTP Verification</p>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-xs text-slate-300">
                {language === 'mr' 
                  ? `आम्ही तुमच्या +91 ${mobile} नंबरवर ६-अंकी ओटीसी (OTP) पाठवला आहे.` 
                  : `We sent a 6-digit OTP to +91 ${mobile}.`}
              </p>

              <div>
                <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-1.5">
                  {language === 'mr' ? '६-अंकी कोड प्रविष्ट करा' : 'Enter 6-Digit OTP'}
                </label>
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="123456"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full bg-slate-800/40 border border-slate-700/60 rounded-xl px-3 py-3 text-center text-lg font-bold tracking-[0.4em] text-white focus:outline-none focus:border-[#E86B21] focus:ring-1 focus:ring-[#E86B21]/30 transition placeholder-slate-600"
                />
                <span className="block text-[10px] text-slate-500 mt-1.5 text-center">
                  {language === 'mr' ? 'चाचणीसाठी "123456" टाका' : 'Hint: Use "123456" for instant demo validation'}
                </span>
                {otpError && <p className="text-[10px] text-rose-500 mt-1 text-center">{otpError}</p>}
              </div>

              <div className="flex justify-between items-center text-[10px] text-slate-400 px-1 mt-2">
                <span>Didn't receive OTP?</span>
                <button type="button" className="text-[#E86B21] font-semibold hover:underline">
                  Resend OTP
                </button>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-[#E86B21] hover:bg-[#C45512] text-white font-bold py-3.5 px-4 rounded-xl shadow-lg mt-6 flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer"
          >
            <span>{language === 'mr' ? 'पडताळणी करा' : 'Verify & Setup'}</span>
            <CheckCircle2 className="w-4 h-4" />
          </button>
        </form>
      )}

      {step === 'success' && (
        <div className="flex-1 flex flex-col items-center justify-center text-center h-full">
          <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <CheckCircle2 className="w-16 h-16 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">
            {language === 'mr' ? 'खाते यशस्वीरित्या तयार झाले!' : 'Account Activated!'}
          </h2>
          <p className="text-xs text-slate-300 leading-relaxed max-w-[240px]">
            {language === 'mr' 
              ? 'तुमचा महाराष्ट्र डिजिटल पासपोर्ट, संशोधक अवतार आणि एक्सपी वॉलेट तयार झाले आहे.' 
              : 'Your Digital Passport, Explorer Avatar, and Level-1 XP Wallet are successfully provisioned.'}
          </p>
          <div className="mt-8 w-24 h-1 bg-emerald-500/20 rounded-full overflow-hidden">
            <div className="h-full bg-emerald-500 animate-pulse w-full"></div>
          </div>
        </div>
      )}
    </div>
  );
}
