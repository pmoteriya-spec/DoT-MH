import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Car, CheckCircle, ShieldCheck, MapPin, Gauge, AlertCircle, Phone, Award } from 'lucide-react';
import { DriverRegistration } from '../types';

interface DriverRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDriverRegistered: (registration: DriverRegistration) => void;
}

const DISTRICT_OPTIONS = [
  'Pune', 'Satara', 'Raigad', 'Mumbai', 'Nashik', 
  'Kolhapur', 'Chhatrapati Sambhajinagar', 'Sindhudurg', 
  'Ratnagiri', 'Chandrapur', 'Amravati', 'Nagpur'
];

const VEHICLE_CATEGORIES: { id: 'sedan' | 'suv' | 'ev' | 'tempo' | '4x4'; label: string; desc: string }[] = [
  { id: 'suv', label: 'Hill SUV (7-Seater)', desc: 'Innova, Ertiga, Scorpio - Ghats & Family Trips' },
  { id: 'sedan', label: 'Tour Sedan (4-Seater)', desc: 'Dzire, Etios, Aura - City & Expressway' },
  { id: 'ev', label: 'Green EV Cab', desc: 'Nexon EV, Tiago EV - Eco-sensitive zones' },
  { id: 'tempo', label: 'Group Tempo (12-17)', desc: 'Force Traveler - Large Pilgrimage & Trek Groups' },
  { id: '4x4', label: '4x4 Off-Roader', desc: 'Gypsy, Thar - Wildlife Safaris & Remote Forts' }
];

export default function DriverRegistrationModal({
  isOpen,
  onClose,
  onDriverRegistered
}: DriverRegistrationModalProps) {
  const [driverName, setDriverName] = useState('');
  const [phone, setPhone] = useState('+91 ');
  const [licenseNo, setLicenseNo] = useState('');
  const [rtoBadgeNo, setRtoBadgeNo] = useState('');
  const [vehicleModel, setVehicleModel] = useState('');
  const [vehicleCategory, setVehicleCategory] = useState<'sedan' | 'suv' | 'ev' | 'tempo' | '4x4'>('suv');
  const [vehiclePlateNo, setVehiclePlateNo] = useState('MH-');
  const [capacity, setCapacity] = useState(7);
  const [ac, setAc] = useState(true);
  const [selectedDistricts, setSelectedDistricts] = useState<string[]>(['Pune', 'Satara', 'Raigad']);
  const [basePrice, setBasePrice] = useState(3400);
  const [experienceYears, setExperienceYears] = useState(8);
  const [ghatExpert, setGhatExpert] = useState(true);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [generatedRefId, setGeneratedRefId] = useState('');

  if (!isOpen) return null;

  const toggleDistrict = (dist: string) => {
    setSelectedDistricts(prev => 
      prev.includes(dist) 
        ? (prev.length > 1 ? prev.filter(d => d !== dist) : prev) 
        : [...prev, dist]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const refId = `MH-CAB-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    setGeneratedRefId(refId);

    const reg: DriverRegistration = {
      id: refId,
      driverName: driverName.trim(),
      phone: phone.trim(),
      licenseNo: licenseNo.trim() || `MH-DL-2024-${Math.floor(100000 + Math.random() * 900000)}`,
      rtoBadgeNo: rtoBadgeNo.trim() || `RTO-MH-BADGE-${Math.floor(1000 + Math.random() * 9000)}`,
      vehicleModel: vehicleModel.trim() || 'Toyota Innova Crysta',
      vehicleCategory,
      vehiclePlateNo: vehiclePlateNo.trim().toUpperCase(),
      capacity: Number(capacity) || 6,
      ac,
      districtsCovered: selectedDistricts.map(d => d.toLowerCase()),
      basePrice: Number(basePrice) || 3000,
      priceUnit: 'per day (300 km included)',
      experienceYears: Number(experienceYears) || 5,
      ghatExpert,
      submittedAt: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      status: 'pending'
    };

    onDriverRegistered(reg);
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
            <Car className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Cab & Driver Onboarding Portal
              </h3>
              <p className="text-[9px] text-amber-200/60 font-mono">
                MTDC Tourist Fleet & Transport Verification Cell
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
                  Application Under Verification
                </span>
                <h3 className="text-base font-black text-white">
                  Driver & Cab Registration Submitted!
                </h3>
                <p className="text-[11px] text-slate-300 max-w-sm mx-auto">
                  Your commercial taxi onboarding profile has been submitted to the Maharashtra RTO & MTDC Transport Cell.
                </p>
              </div>

              {/* Reference ID Card */}
              <div className="p-3.5 bg-slate-950 border border-emerald-500/30 rounded-xl max-w-sm mx-auto text-left space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] text-slate-400 uppercase font-bold">Registration Ref ID:</span>
                  <span className="text-xs font-mono font-black text-emerald-400">{generatedRefId}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Driver Name:</span>
                  <span className="text-white font-bold">{driverName}</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Vehicle / Plate:</span>
                  <span className="text-amber-400 font-mono font-bold">{vehicleModel} ({vehiclePlateNo})</span>
                </div>
                <div className="flex justify-between items-center text-[10px]">
                  <span className="text-slate-400">Tariff Rate:</span>
                  <span className="text-white font-mono font-bold">₹{basePrice}/day</span>
                </div>
                <div className="pt-2 border-t border-slate-850 text-[9px] text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>MTDC Admin verification takes approx. 12-24 hours. Check the Admin Desk.</span>
                </div>
              </div>

              <button
                type="button"
                onClick={onClose}
                className="w-full max-w-sm py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl uppercase tracking-wider text-[10px] transition cursor-pointer"
              >
                Done / Return to Cabs List
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Guidance Info Banner */}
              <div className="p-3 bg-amber-500/10 border border-amber-500/25 rounded-xl flex items-start gap-2.5">
                <Car className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <div className="text-[10px] text-slate-300 leading-relaxed">
                  <span className="font-bold text-amber-400 block mb-0.5">
                    Official MTDC Tourist Vehicle Scheme 2026:
                  </span>
                  Register your commercial vehicle (yellow-plate) to receive direct tourist bookings across Western Ghats, coastal Konkan, and pilgrimage corridors with zero commission.
                </div>
              </div>

              {/* Section 1: Driver Personal Details */}
              <div className="space-y-2">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 block">
                  1. Driver Credentials
                </span>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Full Name (as on DL) *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Sachin Ramdas Jadhav"
                      value={driverName}
                      onChange={(e) => setDriverName(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Mobile Number (WhatsApp) *</label>
                    <input
                      type="tel"
                      required
                      placeholder="+91 98220 54129"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Driving License No. *</label>
                    <input
                      type="text"
                      required
                      placeholder="MH-12-2015-0048192"
                      value={licenseNo}
                      onChange={(e) => setLicenseNo(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">RTO Public Service Badge No. *</label>
                    <input
                      type="text"
                      required
                      placeholder="RTO-PUN-CM-8821"
                      value={rtoBadgeNo}
                      onChange={(e) => setRtoBadgeNo(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] font-mono focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-bold">Commercial Driving Experience (Years)</label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min={1}
                      max={30}
                      value={experienceYears}
                      onChange={(e) => setExperienceYears(Number(e.target.value))}
                      className="flex-1 accent-amber-500 cursor-pointer"
                    />
                    <span className="font-mono font-bold text-amber-400 text-xs w-16 text-right">
                      {experienceYears} Years
                    </span>
                  </div>
                </div>
              </div>

              {/* Section 2: Vehicle Specs */}
              <div className="space-y-2 pt-2 border-t border-slate-850">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 block">
                  2. Vehicle Specifications
                </span>

                <div className="space-y-1">
                  <label className="text-[9px] text-slate-400 font-bold">Vehicle Category *</label>
                  <div className="grid grid-cols-2 gap-1.5">
                    {VEHICLE_CATEGORIES.map(cat => (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => {
                          setVehicleCategory(cat.id);
                          if (cat.id === 'sedan') setCapacity(4);
                          else if (cat.id === 'tempo') setCapacity(12);
                          else if (cat.id === 'suv') setCapacity(7);
                          else if (cat.id === '4x4') setCapacity(5);
                        }}
                        className={`p-2 rounded-xl text-left border transition cursor-pointer ${
                          vehicleCategory === cat.id
                            ? 'bg-amber-500/15 border-amber-500 text-white shadow-sm'
                            : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <span className="text-[10px] font-bold block">{cat.label}</span>
                        <span className="text-[8px] text-slate-400 leading-tight block mt-0.5">{cat.desc}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Vehicle Make & Model *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g., Maruti Ertiga ZXi+ / Innova"
                      value={vehicleModel}
                      onChange={(e) => setVehicleModel(e.target.value)}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Yellow Commercial Plate No. *</label>
                    <input
                      type="text"
                      required
                      placeholder="MH-12-TC-9481"
                      value={vehiclePlateNo}
                      onChange={(e) => setVehiclePlateNo(e.target.value.toUpperCase())}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] font-mono uppercase focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Seating Capacity</label>
                    <select
                      value={capacity}
                      onChange={(e) => setCapacity(Number(e.target.value))}
                      className="w-full px-2 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-white text-[11px] focus:outline-none focus:border-amber-500"
                    >
                      <option value={4}>4 Passengers + Driver</option>
                      <option value={5}>5 Passengers + Driver</option>
                      <option value={6}>6 Passengers + Driver</option>
                      <option value={7}>7 Passengers + Driver</option>
                      <option value={12}>12 Passengers (Mini-bus)</option>
                      <option value={17}>17 Passengers (Tempo)</option>
                    </select>
                  </div>

                  <div className="space-y-1">
                    <label className="text-[9px] text-slate-400 font-bold">Daily Rental Tariff (₹/Day) *</label>
                    <input
                      type="number"
                      required
                      min={1000}
                      max={15000}
                      step={100}
                      value={basePrice}
                      onChange={(e) => setBasePrice(Number(e.target.value))}
                      className="w-full px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-amber-400 font-mono font-bold text-[11px] focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-1">
                  <label className="flex items-center gap-2 cursor-pointer text-[10px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={ac}
                      onChange={(e) => setAc(e.target.checked)}
                      className="accent-amber-500 w-3.5 h-3.5"
                    />
                    <span>Chilled AC Equipped</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer text-[10px] text-slate-300">
                    <input
                      type="checkbox"
                      checked={ghatExpert}
                      onChange={(e) => setGhatExpert(e.target.checked)}
                      className="accent-amber-500 w-3.5 h-3.5"
                    />
                    <span className="text-emerald-400 font-bold">🏔️ Ghat Roads & Fog Expert</span>
                  </label>
                </div>
              </div>

              {/* Section 3: Operating Districts */}
              <div className="space-y-1.5 pt-2 border-t border-slate-850">
                <span className="text-[9px] font-black uppercase tracking-wider text-amber-400 block">
                  3. Operating Districts (Select all you serve)
                </span>
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
                  <Car className="w-3.5 h-3.5" />
                  <span>Submit Cab Registration</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
