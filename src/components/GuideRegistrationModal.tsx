import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Award, CheckCircle, ShieldCheck, MapPin, Languages, BookOpen, Sparkles, Phone, Mail } from 'lucide-react';
import { GuideRegistration } from '../types';

interface GuideRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGuideRegistered: (registration: GuideRegistration) => void;
}

const SPECIALIZATIONS = [
  'Maratha Forts & Shivaji Military History (Raigad, Sinhagad, Rajgad)',
  'Ajanta & Ellora UNESCO Caves, Buddhist & Ancient Art',
  'Sahyadri Flora, Fauna & Tiger Tracking (Tadoba, Melghat)',
  'Konkan Coastal Sea Forts & Maritime Heritage (Sindhudurg, Janjira)',
  'Sacred Pilgrimage & Warkari Spiritual Heritage (Pandharpur, Alandi, Trimbak)',
  'Deccan Geology, Meteorite Crater & Sahyadri Treks (Lonar, Kalsubai)',
  'Agro-Tourism, Vineyard Tours & Culinary Heritage (Nashik, Kolhapur)'
];

const AVAILABLE_LANGUAGES = [
  'Marathi', 'Hindi', 'English', 'Gujarati', 'German', 'French', 'Japanese', 'Sanskrit'
];

const DISTRICT_OPTIONS = [
  'Raigad', 'Pune', 'Satara', 'Chhatrapati Sambhajinagar', 'Chandrapur',
  'Nashik', 'Sindhudurg', 'Ratnagiri', 'Kolhapur', 'Amravati', 'Mumbai'
];

export default function GuideRegistrationModal({
  isOpen,
  onClose,
  onGuideRegistered
}: GuideRegistrationModalProps) {
  const [guideName, setGuideName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [licenseNo, setLicenseNo] = useState('MTDC-');
  const [specialization, setSpecialization] = useState(SPECIALIZATIONS[0]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['Marathi', 'Hindi', 'English']);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(['Raigad', 'Pune']);
  const [experienceYears, setExperienceYears] = useState(8);
  const [pricePerDay, setPricePerDay] = useState(2500);
  const [bio, setBio] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('');

  if (!isOpen) return null;

  const toggleLanguage = (lang: string) => {
    setSelectedLanguages(prev => 
      prev.includes(lang) 
        ? (prev.length > 1 ? prev.filter(l => l !== lang) : prev) 
        : [...prev, lang]
    );
  };

  const toggleDistrict = (dist: string) => {
    setSelectedDistricts(prev => 
      prev.includes(dist) 
        ? (prev.length > 1 ? prev.filter(d => d !== dist) : prev) 
        : [...prev, dist]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `MH-GD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedRefId(refId);

    const reg: GuideRegistration = {
      id: refId,
      guideName: guideName.trim(),
      phone: phone.trim(),
      email: email.trim() || undefined,
      licenseNo: licenseNo.trim() || `MTDC-GD-2024-${Math.floor(1000 + Math.random() * 9000)}`,
      specialization,
      districts: selectedDistricts.map(d => d.toLowerCase()),
      languages: selectedLanguages,
      experienceYears: Number(experienceYears) || 5,
      pricePerDay: Number(pricePerDay) || 2000,
      bio: bio.trim() || `Certified heritage guide specialized in ${specialization}. Dedicated to sharing Maharashtra's rich history with travelers.`,
      submittedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'pending'
    };

    onGuideRegistered(reg);
    setIsSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-lg bg-[#18130E] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
      >
        {/* Header */}
        <div className="p-3.5 bg-[#201913] border-b border-[#2D231A] flex justify-between items-center shrink-0">
          <div className="flex items-center gap-2">
            <Award className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Tour Guide & Historian Accreditation
              </h3>
              <p className="text-[9px] text-amber-200/60 font-mono">
                Directorate of Maharashtra Tourism • Guide Registry
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {isSubmitted ? (
            <div className="py-6 space-y-4 text-center">
              <div className="w-16 h-16 mx-auto rounded-full bg-emerald-500/20 border-2 border-emerald-500 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/20">
                <CheckCircle className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <span className="text-[9px] font-mono uppercase tracking-widest text-emerald-400 font-bold">
                  Accreditation Under Verification
                </span>
                <h3 className="text-base font-black text-white">
                  Guide Application Successfully Lodged!
                </h3>
                <p className="text-[11px] text-slate-300 max-w-sm mx-auto">
                  Your MTDC Guide credentials have been submitted for official verification. Once approved, your profile will be listed for tourists.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="p-3.5 bg-slate-950 border border-emerald-500/30 rounded-xl max-w-sm mx-auto text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">Application Ref ID:</span>
                  <span className="text-xs font-mono font-black text-emerald-400">{generatedRefId}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Guide Name:</span>
                  <span className="text-white font-bold">{guideName}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Specialization:</span>
                  <span className="text-amber-400 font-bold truncate max-w-[200px]">{specialization}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Spoken Languages:</span>
                  <span className="text-slate-200">{selectedLanguages.join(', ')}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Tariff per Day:</span>
                  <span className="text-white font-mono font-bold">₹{pricePerDay}/day</span>
                </div>
                <div className="pt-2 border-t border-slate-850 text-[9px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>The MTDC Heritage Board will review and verify your badge. Track via Admin Portal.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full max-w-sm py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-[10px] transition cursor-pointer"
              >
                Done / Return to Guides Directory
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Guidance Info Banner */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-start gap-2.5">
                <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-[10px] text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-400 block mb-0.5">
                    Official MTDC Guide Accreditation:
                  </span>
                  Are you a certified local guide, regional historian, Sahyadri mountaineer, or naturalist? Register to lead authenticated walking tours, fort expeditions, and cave explorations.
                </div>
              </div>

              {/* Section 1: Guide Personal Info */}
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 block">
                  1. Personal & Contact Details
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Guide Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Prashant P. Kulkarni"
                      value={guideName}
                      onChange={(e) => setGuideName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Mobile Phone (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98901 34912"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Email Address</label>
                    <input
                      type="email"
                      placeholder="prashant.heritage@gmail.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">MTDC or Ministry Guide Badge No. *</label>
                    <input
                      type="text"
                      required
                      placeholder="MTDC-RLG-2022-048"
                      value={licenseNo}
                      onChange={(e) => setLicenseNo(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Specialization & Languages */}
              <div className="space-y-2 pt-2 border-t border-slate-850">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 block">
                  2. Area of Expertise & Languages
                </span>

                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-bold">Primary Heritage Specialization *</label>
                  <select
                    value={specialization}
                    onChange={(e) => setSpecialization(e.target.value)}
                    className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-amber-500"
                  >
                    {SPECIALIZATIONS.map((spec, i) => (
                      <option key={i} value={spec}>{spec}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-bold">Languages Spoken Fluently (Select all) *</label>
                  <div className="flex flex-wrap gap-1.5">
                    {AVAILABLE_LANGUAGES.map(lang => {
                      const isSelected = selectedLanguages.includes(lang);
                      return (
                        <button
                          key={lang}
                          type="button"
                          onClick={() => toggleLanguage(lang)}
                          className={`px-2 py-1 rounded-lg text-[9px] font-bold transition cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 font-black'
                              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {isSelected ? '✓ ' : ''}{lang}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-bold">Primary Districts Served *</label>
                  <div className="flex flex-wrap gap-1.5">
                    {DISTRICT_OPTIONS.map(dist => {
                      const isSelected = selectedDistricts.includes(dist);
                      return (
                        <button
                          key={dist}
                          type="button"
                          onClick={() => toggleDistrict(dist)}
                          className={`px-2 py-1 rounded-lg text-[9px] font-bold transition cursor-pointer ${
                            isSelected
                              ? 'bg-amber-500 text-slate-950 font-black'
                              : 'bg-slate-950 text-slate-400 border border-slate-800 hover:border-slate-700'
                          }`}
                        >
                          {isSelected ? '✓ ' : ''}{dist}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5 pt-1">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Guiding Experience</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="range"
                        min={1}
                        max={35}
                        value={experienceYears}
                        onChange={(e) => setExperienceYears(Number(e.target.value))}
                        className="flex-1 accent-amber-500 cursor-pointer"
                      />
                      <span className="font-mono font-bold text-amber-400 text-xs w-14 text-right">
                        {experienceYears} Yrs
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Full Day Fee (₹/Day) *</label>
                    <input
                      type="number"
                      required
                      min={800}
                      max={12000}
                      step={100}
                      value={pricePerDay}
                      onChange={(e) => setPricePerDay(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono font-bold text-[11px] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>

              {/* Section 3: Bio */}
              <div className="space-y-1 pt-2 border-t border-slate-850">
                <label className="text-[9px] text-slate-400 font-bold">
                  Professional Bio & Heritage Narrative (Shown to travelers)
                </label>
                <textarea
                  rows={3}
                  placeholder="Describe your passion, historical training, notable treks, or unique stories you share..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] leading-relaxed focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Submit CTA */}
              <div className="pt-3 border-t border-slate-850 flex items-center justify-between gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-850 text-slate-400 rounded-xl text-[10px] font-bold uppercase transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-black rounded-xl text-[10px] uppercase tracking-wider shadow-lg transition active:scale-95 cursor-pointer flex items-center justify-center gap-2"
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Submit Guide Application</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
