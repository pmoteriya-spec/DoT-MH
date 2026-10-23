import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, FileText, CheckCircle, ShieldCheck, QrCode, ArrowRight, Calendar, Users, MapPin, Building } from 'lucide-react';
import { PermitApplication } from '../types';

interface PermitApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPermitIssued: (permit: PermitApplication) => void;
}

const PERMIT_TYPES = [
  {
    type: 'kaas_pass' as const,
    title: 'Kaas Plateau UNESCO Biosphere Daily E-Pass',
    district: 'Satara',
    destination: 'Kaas Plateau Valley of Flowers',
    feePerPerson: 150,
    authority: 'Maharashtra Forest Department (Satara Division)',
    notes: 'Preserves delicate flowering micro-flora. Valid for 3-hour entry window.'
  },
  {
    type: 'tadoba_safari' as const,
    title: 'Tadoba-Andhari Tiger Reserve Buffer Safari Permit',
    district: 'Chandrapur',
    destination: 'Moharli / Kolara / Agarzari Gates',
    feePerPerson: 500,
    authority: 'Tadoba Tiger Conservation Foundation',
    notes: 'Mandatory identification verification at entry barrier gate.'
  },
  {
    type: 'raigad_ropeway' as const,
    title: 'Raigad Fort Historic Ropeway Express Pass',
    district: 'Raigad',
    destination: 'Chhatrapati Shivaji Maharaj Capital Fort',
    feePerPerson: 380,
    authority: 'Millennium Raigad Ropeway Trust & MTDC',
    notes: 'Ascends 420 meters in 4 minutes. Senior citizen priority seating.'
  },
  {
    type: 'homestay_reg' as const,
    title: 'MTDC Rural Homestay Tourism Registration Scheme',
    district: 'All Maharashtra Districts',
    destination: 'Rural Maharashtra Agrotourism & Village Homestays',
    feePerPerson: 0,
    authority: 'Directorate of Tourism, Govt of Maharashtra',
    notes: 'Free official government host accreditation and subsidy registration.'
  },
  {
    type: 'temple_vip' as const,
    title: 'Trimbakeshwar / Shirdi VIP Darshan E-Pass',
    district: 'Nashik / Ahmednagar',
    destination: 'Trimbakeshwar Jyotirlinga & Shirdi Saibaba',
    feePerPerson: 200,
    authority: 'Autonomous Temple Devasthan Sansthan Trust',
    notes: 'Dedicated express queue access during festival & peak weekend hours.'
  }
];

export default function PermitApplicationModal({
  isOpen,
  onClose,
  onPermitIssued
}: PermitApplicationModalProps) {
  const [selectedTypeIdx, setSelectedTypeIdx] = useState(0);
  const [applicantName, setApplicantName] = useState('');
  const [applicantMobile, setApplicantMobile] = useState('+91 ');
  const [aadhaarOrId, setAadhaarOrId] = useState('');
  const [visitDate, setVisitDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 2);
    return d.toISOString().split('T')[0];
  });
  const [visitorsCount, setVisitorsCount] = useState(2);
  const [vehicleReg, setVehicleReg] = useState('MH-12-');
  const [isIssued, setIsIssued] = useState(false);
  const [issuedPermit, setIssuedPermit] = useState<PermitApplication | null>(null);

  if (!isOpen) return null;

  const currentPermit = PERMIT_TYPES[selectedTypeIdx];
  const totalFee = currentPermit.feePerPerson * visitorsCount;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const pmtId = `PMT-${currentPermit.district.substring(0, 3).toUpperCase()}-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newPermit: PermitApplication = {
      id: pmtId,
      permitType: currentPermit.type,
      title: currentPermit.title,
      applicantName: applicantName.trim() || 'Maharashtra Traveler',
      applicantMobile: applicantMobile.trim(),
      aadhaarOrId: aadhaarOrId.trim() || 'XXXX-XXXX-9912',
      district: currentPermit.district,
      destinationName: currentPermit.destination,
      visitDate,
      visitorsCount,
      feePaid: totalFee,
      status: 'approved',
      appliedAt: new Date().toISOString().split('T')[0],
      qrCodeToken: `GOV-MH-PERMIT-${pmtId}`
    };

    setIssuedPermit(newPermit);
    setIsIssued(true);
    onPermitIssued(newPermit);
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
            <FileText className="w-4 h-4 text-amber-500" />
            <div>
              <h3 className="text-xs font-black text-white uppercase tracking-wider">
                Online Tourism Permit & Registration Portal
              </h3>
              <p className="text-[9px] text-amber-200/60 font-mono">Government of Maharashtra E-Services</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
          {!isIssued ? (
            <form id="permit-form" onSubmit={handleSubmit} className="space-y-3.5">
              {/* Select Permit Type */}
              <div>
                <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                  Select Required Permit / Scheme *
                </label>
                <div className="space-y-1.5">
                  {PERMIT_TYPES.map((p, idx) => (
                    <button
                      type="button"
                      key={p.type}
                      onClick={() => setSelectedTypeIdx(idx)}
                      className={`w-full p-2.5 rounded-xl border text-left transition flex justify-between items-center cursor-pointer ${
                        selectedTypeIdx === idx
                          ? 'border-amber-500/80 bg-amber-500/10 text-white'
                          : 'border-slate-800 bg-slate-900/60 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="min-w-0 pr-2">
                        <span className="text-[10px] font-bold block truncate">{p.title}</span>
                        <span className="text-[8px] text-slate-400">{p.authority}</span>
                      </div>
                      <span className="text-xs font-black text-amber-400 shrink-0 font-mono">
                        {p.feePerPerson === 0 ? 'FREE' : `₹${p.feePerPerson}/person`}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Applicant Name & Mobile */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                    Primary Applicant Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. Anand Deshmukh"
                    value={applicantName}
                    onChange={(e) => setApplicantName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                    Mobile Number *
                  </label>
                  <input
                    required
                    type="tel"
                    placeholder="+91 98200 00000"
                    value={applicantMobile}
                    onChange={(e) => setApplicantMobile(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Govt ID */}
              <div>
                <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                  Govt Photo ID (Aadhaar / Passport / Voter ID) *
                </label>
                <input
                  required
                  type="text"
                  placeholder="e.g. XXXX-XXXX-5821"
                  value={aadhaarOrId}
                  onChange={(e) => setAadhaarOrId(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              {/* Date & Visitors */}
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                    Date of Visit *
                  </label>
                  <input
                    required
                    type="date"
                    min={new Date().toISOString().split('T')[0]}
                    value={visitDate}
                    onChange={(e) => setVisitDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
                    Number of Visitors *
                  </label>
                  <input
                    type="number"
                    min={1}
                    max={20}
                    value={visitorsCount}
                    onChange={(e) => setVisitorsCount(Math.max(1, Number(e.target.value)))}
                    className="w-full bg-slate-900 border border-slate-700 text-white rounded-lg p-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              {/* Fee Notice */}
              <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex justify-between items-center text-xs">
                <div>
                  <span className="text-[9px] text-slate-400 block">Total Statutory Permit Fee</span>
                  <span className="text-[8px] text-slate-500">{currentPermit.notes}</span>
                </div>
                <span className="text-sm font-black text-amber-400 font-mono">
                  {totalFee === 0 ? '₹0 (Free Scheme)' : `₹${totalFee.toLocaleString()}`}
                </span>
              </div>
            </form>
          ) : issuedPermit && (
            <div className="space-y-4">
              <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-slate-950 shrink-0 shadow-md">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-white">Official E-Permit Successfully Issued!</h4>
                  <p className="text-[10px] text-emerald-400 font-mono mt-0.5">
                    Permit Pass No: {issuedPermit.id}
                  </p>
                </div>
              </div>

              {/* Pass Card */}
              <div className="bg-[#120F0B] border border-amber-500/30 rounded-2xl p-4 space-y-3">
                <div className="flex justify-between items-start border-b border-amber-500/20 pb-2">
                  <div>
                    <span className="text-[8px] font-bold text-amber-400 uppercase tracking-widest block">
                      GOVERNMENT OF MAHARASHTRA E-PASS
                    </span>
                    <h5 className="font-bold text-white text-xs mt-0.5">{issuedPermit.title}</h5>
                    <span className="text-[9px] text-slate-400">{issuedPermit.destinationName}</span>
                  </div>
                  <div className="w-14 h-14 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center">
                    <QrCode className="w-12 h-12 text-slate-950" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px]">
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">Holder</span>
                    <span className="font-bold text-white">{issuedPermit.applicantName}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">Permit Date</span>
                    <span className="font-bold text-white">{issuedPermit.visitDate}</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">Pass Count</span>
                    <span className="font-bold text-white">{issuedPermit.visitorsCount} Person(s)</span>
                  </div>
                  <div>
                    <span className="text-[8px] text-slate-500 block uppercase font-mono">Status</span>
                    <span className="text-emerald-400 font-bold uppercase font-mono">VERIFIED / ACTIVE</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800 text-[8px] text-slate-500 flex justify-between">
                  <span>Present at the forest/heritage checkpost</span>
                  <span className="font-mono text-amber-400">Status: APPROVED</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 bg-[#201913] border-t border-[#2D231A] flex justify-between items-center shrink-0">
          {!isIssued ? (
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
                form="permit-form"
                className="px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition active:scale-95 shadow-lg flex items-center gap-1.5 cursor-pointer"
              >
                <CheckCircle className="w-3.5 h-3.5" />
                <span>Submit & Issue E-Pass</span>
              </button>
            </>
          ) : (
            <button
              type="button"
              onClick={onClose}
              className="w-full py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs transition active:scale-95 shadow-md flex items-center justify-center gap-1 cursor-pointer"
            >
              Done & View in E-Permits
            </button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
