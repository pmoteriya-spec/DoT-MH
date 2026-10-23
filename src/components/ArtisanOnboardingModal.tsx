import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Palette, CheckCircle, Sparkles, Building, Upload, Award, ShieldCheck, Info } from 'lucide-react';
import { ArtisanRegistration } from '../types';

interface ArtisanOnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onArtisanRegistered: (registration: ArtisanRegistration) => void;
}

const CRAFT_CATEGORIES = [
  'Warli Tribal Art & Murals (Palghar/Dahanu)',
  'Paithani Silk Handloom Weaving (Paithan/Yeola)',
  'Authentic Kolhapuri Chappals & Leather (Kolhapur)',
  'Sawantwadi Lacquered Wooden Toys & Ganjifa (Sindhudurg)',
  'Bidriware Silver Wire Inlay Art (Chh. Sambhajinagar)',
  'Solapur Jacquard Chaddar & Handloom (Solapur)',
  'Korku / Melghat Bamboo Forest Crafts (Amravati)',
  'Konkan Brassware & Dhokra Metal Craft (Ratnagiri)'
];

const DISTRICTS_MH = [
  'Palghar', 'Chhatrapati Sambhajinagar', 'Kolhapur', 'Sindhudurg', 'Solapur',
  'Pune', 'Raigad', 'Nashik', 'Amravati', 'Ratnagiri', 'Nagpur', 'Satara'
];

export default function ArtisanOnboardingModal({
  isOpen,
  onClose,
  onArtisanRegistered
}: ArtisanOnboardingModalProps) {
  const [artisanName, setArtisanName] = useState('');
  const [craftType, setCraftType] = useState(CRAFT_CATEGORIES[0]);
  const [district, setDistrict] = useState(DISTRICTS_MH[0]);
  const [village, setVillage] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [email, setEmail] = useState('');
  const [experienceYears, setExperienceYears] = useState(12);
  const [artisanCardNo, setArtisanCardNo] = useState('MH-GI-');
  const [workshopOffered, setWorkshopOffered] = useState(true);
  const [sampleDescription, setSampleDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `MH-ART-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedRefId(refId);

    const reg: ArtisanRegistration = {
      id: refId,
      artisanName: artisanName.trim(),
      craftType,
      district,
      village: village.trim() || district,
      phone: phone.trim(),
      email: email.trim(),
      experienceYears: Number(experienceYears) || 5,
      artisanCardNo: artisanCardNo.trim() || undefined,
      sampleDescription: sampleDescription.trim(),
      workshopOffered,
      submittedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'pending'
    };

    onArtisanRegistered(reg);
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
            <Palette className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Artisan Registration & Onboarding
              </h3>
              <p className="text-[9px] text-amber-200/60 font-mono">Directorate of Maharashtra Handicrafts & GI Promotion</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {!isSubmitted ? (
            <form id="artisan-form" onSubmit={handleSubmit} className="space-y-3.5">
              {/* Info banner */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex gap-2.5 items-start">
                <Sparkles className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div className="text-[10px] text-amber-200/80 leading-relaxed">
                  Join Maharashtra's official tourism platform! Showcase your handicrafts directly to thousands of verified tourists, receive workshop bookings, and sell with zero middlemen commissions.
                </div>
              </div>

              {/* Artisan Name */}
              <div>
                <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                  Master Artisan / Craftsman Full Name *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. Ramesh Baburao Hengadi"
                  value={artisanName}
                  onChange={(e) => setArtisanName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Craft Category */}
              <div>
                <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                  Traditional Craft Category *
                </label>
                <select
                  value={craftType}
                  onChange={(e) => setCraftType(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                >
                  {CRAFT_CATEGORIES.map((craft) => (
                    <option key={craft} value={craft}>{craft}</option>
                  ))}
                </select>
              </div>

              {/* District & Village */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                    District *
                  </label>
                  <select
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                  >
                    {DISTRICTS_MH.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                    Village / Town / Cluster *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Bapgaon, Dahanu"
                    value={village}
                    onChange={(e) => setVillage(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Phone & Years Exp */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                    Contact Mobile Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98220 00000"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                    Years Practicing Craft *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={70}
                    value={experienceYears}
                    onChange={(e) => setExperienceYears(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Govt Artisan Card / GI Certificate */}
              <div>
                <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                  Artisan Pehchan Card / GI Tag Reg No. (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. MH-GI-WARLI-0089 or DC Handicrafts Card"
                  value={artisanCardNo}
                  onChange={(e) => setArtisanCardNo(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              {/* Workshop Offered Toggle */}
              <div className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between">
                <div>
                  <span className="font-bold text-white text-xs block">Offer Hands-On Tourist Workshops?</span>
                  <span className="text-[9px] text-slate-400">Allow travelers to book live 2-hour learning masterclasses with you</span>
                </div>
                <input
                  type="checkbox"
                  checked={workshopOffered}
                  onChange={(e) => setWorkshopOffered(e.target.checked)}
                  className="w-4 h-4 accent-amber-500 cursor-pointer"
                />
              </div>

              {/* Sample Description */}
              <div>
                <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                  Describe Your Craft Heritage & Materials Used
                </label>
                <textarea
                  rows={2}
                  required
                  placeholder="Describe your raw materials (e.g. natural dyes, teak wood, vegetable leather) and family lineage..."
                  value={sampleDescription}
                  onChange={(e) => setSampleDescription(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2 text-xs focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
                />
              </div>
            </form>
          ) : (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-4">
              <div className="w-14 h-14 bg-emerald-500/15 border border-emerald-500/30 rounded-full flex items-center justify-center text-emerald-400">
                <CheckCircle className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-sm font-black text-white">Application Successfully Submitted!</h4>
                <p className="text-[11px] text-emerald-400 font-mono mt-1">
                  Reference ID: {generatedRefId}
                </p>
                <p className="text-[10px] text-slate-400 max-w-[280px] mt-2 leading-relaxed">
                  The MTDC Handicrafts & GI Promotion Cell will review your profile within 48 hours. Your workshop profile will be activated on the MahaPassport Artisan Village immediately upon verification.
                </p>
              </div>

              <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl w-full text-left text-[10px] space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Artisan:</span>
                  <span className="font-bold text-white">{artisanName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Craft:</span>
                  <span className="font-bold text-amber-400">{craftType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">District:</span>
                  <span className="font-bold text-white">{district} ({village})</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Verification Status:</span>
                  <span className="font-mono text-amber-400 font-bold uppercase">Pending Official Review</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#201913] border-t border-[#2D231A] flex justify-between items-center shrink-0">
          {!isSubmitted ? (
            <>
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-2 text-slate-400 hover:text-white text-xs font-bold cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                form="artisan-form"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition active:scale-95 shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Submit Artisan Application</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              Done & Return to Services
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
