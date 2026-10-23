import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  Compass,
  Sparkles,
  Star,
  ShieldCheck,
  MapPin,
  Calendar,
  Users,
  Clock,
  Phone,
  QrCode,
  FileText,
  Palette,
  CheckCircle,
  Search,
  Filter,
  ArrowRight,
  Plus,
  Ticket,
  ChevronDown,
  ChevronUp,
  AlertCircle,
  X,
  CreditCard,
  ThumbsUp,
  Award
} from 'lucide-react';
import {
  CarService,
  GuideService,
  ActivityService,
  Artisan,
  PermitApplication,
  Booking,
  Review,
  ArtisanRegistration,
  DriverRegistration,
  GuideRegistration,
  UserProfile
} from '../types';
import PaymentGatewayModal from './PaymentGatewayModal';
import ReviewModal from './ReviewModal';
import ArtisanOnboardingModal from './ArtisanOnboardingModal';
import PermitApplicationModal from './PermitApplicationModal';
import DriverRegistrationModal from './DriverRegistrationModal';
import GuideRegistrationModal from './GuideRegistrationModal';

interface ServicesTabProps {
  profile: UserProfile;
  language: 'en' | 'mr';
  cars: CarService[];
  guides: GuideService[];
  activities: ActivityService[];
  artisans: Artisan[];
  permits: PermitApplication[];
  bookings: Booking[];
  onAddBooking: (booking: Booking, xpDeducted: number) => void;
  onCancelBooking: (bookingId: string) => void;
  onAddReview: (serviceType: 'car' | 'guide' | 'activity' | 'artisan', serviceId: string, review: Review) => void;
  onRegisterArtisan: (registration: ArtisanRegistration) => void;
  onRegisterDriver: (registration: DriverRegistration) => void;
  onRegisterGuide: (registration: GuideRegistration) => void;
  onIssuePermit: (permit: PermitApplication) => void;
}

type ServiceSection = 'cars' | 'guides' | 'activities' | 'artisans' | 'permits' | 'bookings' | 'partners';

export default function ServicesTab({
  profile,
  language,
  cars,
  guides,
  activities,
  artisans,
  permits,
  bookings,
  onAddBooking,
  onCancelBooking,
  onAddReview,
  onRegisterArtisan,
  onRegisterDriver,
  onRegisterGuide,
  onIssuePermit
}: ServicesTabProps) {
  const [activeSection, setActiveSection] = useState<ServiceSection>('cars');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState<string>('all');
  const [expandedItemId, setExpandedItemId] = useState<string | null>(null);

  // Modals state
  const [paymentModalItem, setPaymentModalItem] = useState<{
    id: string;
    type: 'car' | 'guide' | 'activity' | 'artisan_workshop' | 'permit' | 'artisan_product';
    title: string;
    providerName: string;
    imageUrl?: string;
    price: number;
    priceUnit?: string;
  } | null>(null);

  const [reviewModalTarget, setReviewModalTarget] = useState<{
    type: 'car' | 'guide' | 'activity' | 'artisan';
    id: string;
    title: string;
  } | null>(null);

  const [isArtisanOnboardingOpen, setIsArtisanOnboardingOpen] = useState(false);
  const [isDriverModalOpen, setIsDriverModalOpen] = useState(false);
  const [isGuideModalOpen, setIsGuideModalOpen] = useState(false);
  const [isPermitModalOpen, setIsPermitModalOpen] = useState(false);

  // Review upvoting simulation state
  const [upvotedReviewIds, setUpvotedReviewIds] = useState<Record<string, boolean>>({});

  const handleToggleUpvote = (revId: string) => {
    setUpvotedReviewIds(prev => ({ ...prev, [revId]: !prev[revId] }));
  };

  // Filter lists by search and district
  const filteredCars = cars.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.vehicleModel.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.driverName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || c.districtsCovered.includes(selectedDistrict);
    return matchesSearch && matchesDistrict;
  });

  const filteredGuides = guides.filter(g => {
    const matchesSearch = g.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.specialization.toLowerCase().includes(searchQuery.toLowerCase()) ||
      g.languages.some(l => l.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesDistrict = selectedDistrict === 'all' || g.districts.includes(selectedDistrict);
    return matchesSearch && matchesDistrict;
  });

  const filteredActivities = activities.filter(a => {
    const matchesSearch = a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.locationName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || a.district.toLowerCase() === selectedDistrict.toLowerCase();
    return matchesSearch && matchesDistrict;
  });

  const filteredArtisans = artisans.filter(art => {
    const matchesSearch = art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.craftType.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.village.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDistrict = selectedDistrict === 'all' || art.district.toLowerCase() === selectedDistrict.toLowerCase();
    return matchesSearch && matchesDistrict;
  });

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent text-slate-100 overflow-hidden relative">
      {/* Top Bar Header */}
      <div className="p-3 bg-[#18130E] border-b border-[#2A241C] sticky top-0 z-10 space-y-2.5">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-lg bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Compass className="w-3.5 h-3.5" />
            </div>
            <div>
              <h2 className="text-xs font-black text-white uppercase tracking-wider">
                {language === 'mr' ? 'पर्यटन सेवा व नोंदणी' : 'Tourism Services & Booking'}
              </h2>
              <span className="text-[8px] text-amber-200/60 font-mono">MTDC Certified & Verified Network</span>
            </div>
          </div>

          {/* Quick Active Bookings Count Pill */}
          <button
            type="button"
            onClick={() => setActiveSection('bookings')}
            className={`px-2 py-1 rounded-lg text-[9px] font-black uppercase tracking-wider flex items-center gap-1 transition cursor-pointer ${
              activeSection === 'bookings'
                ? 'bg-amber-500 text-slate-950 shadow-md'
                : 'bg-slate-900 border border-slate-700 text-amber-400 hover:text-white'
            }`}
          >
            <Ticket className="w-3 h-3" />
            <span>Passes ({bookings.length})</span>
          </button>
        </div>

        {/* Primary Sub-Nav Switcher Pills */}
        <div className="flex gap-1 overflow-x-auto pb-1 no-scrollbar">
          {[
            { id: 'cars' as const, label: language === 'mr' ? 'गाड्या व टॅक्सी' : 'Cabs & Cars', icon: Car },
            { id: 'guides' as const, label: language === 'mr' ? 'मार्गदर्शक' : 'Guides', icon: Compass },
            { id: 'activities' as const, label: language === 'mr' ? 'साहसी खेळ' : 'Activities', icon: Sparkles },
            { id: 'artisans' as const, label: language === 'mr' ? 'हस्तकला ग्राम' : 'Artisans', icon: Palette },
            { id: 'permits' as const, label: language === 'mr' ? 'ई-परवाने' : 'E-Permits', icon: FileText },
            { id: 'partners' as const, label: language === 'mr' ? 'नोंदणी कक्ष' : 'Register / Partner', icon: ShieldCheck }
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeSection === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => {
                  setActiveSection(tab.id);
                  setExpandedItemId(null);
                }}
                className={`px-2.5 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-wider flex items-center gap-1.5 whitespace-nowrap transition cursor-pointer ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 shadow-md font-bold'
                    : 'bg-slate-900/80 border border-slate-800 text-slate-400 hover:text-white hover:border-slate-700'
                }`}
              >
                <Icon className="w-3 h-3 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Search & District Filter (When not in bookings, permits, or partners tab) */}
        {activeSection !== 'bookings' && activeSection !== 'permits' && activeSection !== 'partners' && (
          <div className="flex gap-1.5 pt-0.5">
            <div className="relative flex-1">
              <Search className="w-3 h-3 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder={`Search ${activeSection}...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-slate-900/90 border border-slate-850 rounded-lg pl-7 pr-2.5 py-1 text-[10px] text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="bg-slate-900 border border-slate-850 rounded-lg px-2 py-1 text-[9px] text-amber-300 font-bold focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="all">All Districts</option>
              <option value="pune">Pune</option>
              <option value="satara">Satara</option>
              <option value="raigad">Raigad</option>
              <option value="aurangabad">Chh. Sambhajinagar</option>
              <option value="sindhudurg">Sindhudurg</option>
              <option value="chandrapur">Chandrapur</option>
              <option value="nashik">Nashik</option>
              <option value="mumbai">Mumbai</option>
              <option value="kolhapur">Kolhapur</option>
              <option value="palghar">Palghar</option>
            </select>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto p-3 space-y-3">
        
        {/* ================= SECTION 1: CABS & CARS ================= */}
        {activeSection === 'cars' && (
          <div className="space-y-3">
            {/* Cab Driver Onboarding Banner */}
            <div className="p-3 bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
              <div>
                <span className="text-[8px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded uppercase">
                  MTDC Commercial Fleet
                </span>
                <h4 className="text-xs font-bold text-white">Own a Taxi or Tourist Cab in Maharashtra?</h4>
                <p className="text-[9px] text-slate-300">Register your vehicle & earn steady tourist bookings with 0% commission.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsDriverModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider shrink-0 transition active:scale-95 shadow-md flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Register Cab</span>
              </button>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
              <span>Verified Cabs for Ghats & Expressways</span>
              <span className="font-mono text-amber-400">{filteredCars.length} available</span>
            </div>

            {filteredCars.map((car) => {
              const isExpanded = expandedItemId === car.id;
              return (
                <div
                  key={car.id}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition shadow-lg"
                >
                  <div className="relative h-32 w-full">
                    <img src={car.imageUrl} alt={car.name} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    {/* Badge */}
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-amber-500 text-slate-950 shadow">
                        {car.category}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-slate-900/80 border border-slate-700 text-white backdrop-blur">
                        {car.ac ? 'Chilled AC' : 'Non-AC'}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                      <div>
                        <h3 className="text-xs font-bold text-white drop-shadow">{car.name}</h3>
                        <p className="text-[9px] text-slate-300 drop-shadow font-mono">{car.vehicleModel}</p>
                      </div>
                      <div className="text-right">
                        <span className="text-sm font-black text-amber-400">₹{car.basePrice.toLocaleString()}</span>
                        <span className="block text-[7px] text-slate-300 font-mono">{car.priceUnit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body summary */}
                  <div className="p-3 space-y-2.5">
                    <div className="grid grid-cols-3 gap-2 text-[9px] bg-slate-950/60 p-2 rounded-xl border border-slate-850">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Users className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>{car.capacity} Seats</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                        <span className="font-bold text-white">{car.rating} ({car.reviewCount})</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <ShieldCheck className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span className="truncate">{car.driverName}</span>
                      </div>
                    </div>

                    {/* Features pill tags */}
                    <div className="flex flex-wrap gap-1">
                      {car.features.slice(0, 3).map((f, i) => (
                        <span key={i} className="text-[8px] bg-slate-800/80 border border-slate-700/60 text-slate-300 px-1.5 py-0.5 rounded">
                          ✓ {f}
                        </span>
                      ))}
                    </div>

                    {/* Expanded view for reviews & specs */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 border-t border-slate-800 space-y-3 overflow-hidden text-[10px]"
                        >
                          <div className="space-y-1">
                            <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                              Verified Driver Credentials
                            </span>
                            <div className="flex justify-between items-center text-slate-300 bg-slate-950 p-2 rounded-lg">
                              <span>Driver: <b>{car.driverName}</b></span>
                              <span className="font-mono text-emerald-400 text-[9px] flex items-center gap-1">
                                <Phone className="w-2.5 h-2.5" /> {car.driverPhone}
                              </span>
                            </div>
                          </div>

                          {/* Reviews List */}
                          <div className="space-y-1.5">
                            <div className="flex justify-between items-center">
                              <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                                Traveler Reviews ({car.reviews.length})
                              </span>
                              <button
                                type="button"
                                onClick={() => setReviewModalTarget({ type: 'car', id: car.id, title: car.name })}
                                className="text-[9px] text-amber-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                              >
                                <Star className="w-2.5 h-2.5 fill-amber-400" /> Write Review
                              </button>
                            </div>

                            {car.reviews.map((rev) => (
                              <div key={rev.id} className="p-2 bg-slate-950 border border-slate-850 rounded-lg space-y-1">
                                <div className="flex justify-between items-center">
                                  <div className="flex items-center gap-1">
                                    <span className="font-bold text-white text-[9px]">{rev.userName}</span>
                                    {rev.tag && (
                                      <span className="text-[7px] bg-amber-500/15 text-amber-300 px-1 py-0.2 rounded font-bold">
                                        {rev.tag}
                                      </span>
                                    )}
                                  </div>
                                  <div className="flex items-center text-amber-400 text-[8px] font-bold">
                                    ★ {rev.rating}
                                  </div>
                                </div>
                                <p className="text-slate-300 text-[9px] leading-snug">{rev.comment}</p>
                                <div className="flex justify-between items-center text-[7px] text-slate-500 pt-0.5">
                                  <span>{rev.date}</span>
                                  <button
                                    type="button"
                                    onClick={() => handleToggleUpvote(rev.id)}
                                    className={`flex items-center gap-0.5 hover:text-white cursor-pointer ${upvotedReviewIds[rev.id] ? 'text-amber-400 font-bold' : ''}`}
                                  >
                                    <ThumbsUp className="w-2 h-2" />
                                    <span>Helpful ({rev.helpfulCount + (upvotedReviewIds[rev.id] ? 1 : 0)})</span>
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="pt-1 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setExpandedItemId(isExpanded ? null : car.id)}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide Details' : 'Reviews & Specs'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentModalItem({
                          id: car.id,
                          type: 'car',
                          title: car.name,
                          providerName: `Driver: ${car.driverName}`,
                          imageUrl: car.imageUrl,
                          price: car.basePrice,
                          priceUnit: car.priceUnit
                        })}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>Book Cab Now</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= SECTION 2: CERTIFIED GUIDES ================= */}
        {activeSection === 'guides' && (
          <div className="space-y-3">
            {/* Guide Onboarding Banner */}
            <div className="p-3 bg-gradient-to-r from-amber-950/40 via-amber-900/30 to-amber-950/40 border border-amber-500/30 rounded-2xl flex items-center justify-between gap-3 shadow-lg">
              <div>
                <span className="text-[8px] bg-amber-500/20 text-amber-300 font-bold px-1.5 py-0.5 rounded uppercase">
                  MTDC Guide Accreditation
                </span>
                <h4 className="text-xs font-bold text-white">Are you an MTDC Guide or Historian?</h4>
                <p className="text-[9px] text-slate-300">Get listed on MahaPassport & lead official heritage tours across Maharashtra.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsGuideModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider shrink-0 transition active:scale-95 shadow-md flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Apply as Guide</span>
              </button>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
              <span>MTDC Licensed Historians & Naturalists</span>
              <span className="font-mono text-amber-400">{filteredGuides.length} verified</span>
            </div>

            {filteredGuides.map((guide) => {
              const isExpanded = expandedItemId === guide.id;
              return (
                <div
                  key={guide.id}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 space-y-3 hover:border-slate-700 transition shadow-lg"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={guide.imageUrl}
                      alt={guide.name}
                      className="w-16 h-16 rounded-xl object-cover border border-amber-500/30 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xs font-bold text-white truncate">{guide.name}</h3>
                          <span className="text-[9px] text-amber-400 font-bold block">{guide.specialization}</span>
                        </div>
                        <div className="text-right shrink-0">
                          <span className="text-xs font-black text-white">₹{guide.pricePerDay.toLocaleString()}</span>
                          <span className="block text-[7px] text-slate-400 font-mono">per day</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[8px]">
                        <span className="flex items-center gap-0.5 text-amber-400 font-bold">
                          <Star className="w-2.5 h-2.5 fill-amber-400" /> {guide.rating} ({guide.reviewCount})
                        </span>
                        <span className="text-slate-500">•</span>
                        <span className="text-slate-300">{guide.experienceYears} yrs experience</span>
                        <span className="text-slate-500">•</span>
                        <span className="text-emerald-400 font-mono font-bold">MTDC Certified</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-300 leading-relaxed line-clamp-2">
                    {language === 'mr' ? guide.bioMr : guide.bio}
                  </p>

                  {/* Languages & Badges */}
                  <div className="flex flex-wrap gap-1">
                    {guide.languages.map((lang) => (
                      <span key={lang} className="text-[8px] bg-slate-950 text-slate-300 border border-slate-800 px-1.5 py-0.5 rounded">
                        🗣️ {lang}
                      </span>
                    ))}
                    {guide.badges.map((b) => (
                      <span key={b} className="text-[8px] bg-amber-500/10 text-amber-400 border border-amber-500/25 px-1.5 py-0.5 rounded font-bold">
                        🏆 {b}
                      </span>
                    ))}
                  </div>

                  {/* Expanded Reviews */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2 border-t border-slate-800 space-y-2 text-[10px]"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                            Traveler Reviews ({guide.reviews.length})
                          </span>
                          <button
                            type="button"
                            onClick={() => setReviewModalTarget({ type: 'guide', id: guide.id, title: guide.name })}
                            className="text-[9px] text-amber-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Star className="w-2.5 h-2.5 fill-amber-400" /> Write Review
                          </button>
                        </div>

                        {guide.reviews.map((rev) => (
                          <div key={rev.id} className="p-2 bg-slate-950 border border-slate-850 rounded-lg space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-white text-[9px]">{rev.userName}</span>
                              <span className="text-amber-400 text-[8px] font-bold">★ {rev.rating}</span>
                            </div>
                            <p className="text-slate-300 text-[9px] leading-snug">{rev.comment}</p>
                            <div className="flex justify-between items-center text-[7px] text-slate-500 pt-0.5">
                              <span>{rev.date}</span>
                              <button
                                type="button"
                                onClick={() => handleToggleUpvote(rev.id)}
                                className={`flex items-center gap-0.5 hover:text-white cursor-pointer ${upvotedReviewIds[rev.id] ? 'text-amber-400 font-bold' : ''}`}
                              >
                                <ThumbsUp className="w-2 h-2" />
                                <span>Helpful ({rev.helpfulCount + (upvotedReviewIds[rev.id] ? 1 : 0)})</span>
                              </button>
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Actions */}
                  <div className="pt-1 flex gap-2">
                    <button
                      type="button"
                      onClick={() => setExpandedItemId(isExpanded ? null : guide.id)}
                      className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide' : 'Reviews'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentModalItem({
                        id: guide.id,
                        type: 'guide',
                        title: `Guide: ${guide.name} (${guide.specialization})`,
                        providerName: `License: ${guide.licenseNumber}`,
                        imageUrl: guide.imageUrl,
                        price: guide.pricePerDay,
                        priceUnit: 'per day full escort'
                      })}
                      className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md cursor-pointer"
                    >
                      <Compass className="w-3.5 h-3.5" />
                      <span>Hire Guide</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= SECTION 3: RECREATIONAL ACTIVITIES ================= */}
        {activeSection === 'activities' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
              <span>Scuba, Paragliding, Rafting & Safaris</span>
              <span className="font-mono text-amber-400">{filteredActivities.length} adventures</span>
            </div>

            {filteredActivities.map((act) => {
              const isExpanded = expandedItemId === act.id;
              return (
                <div
                  key={act.id}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-700 transition shadow-lg"
                >
                  <div className="relative h-32 w-full">
                    <img src={act.imageUrl} alt={act.title} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                    
                    <div className="absolute top-2 left-2 flex gap-1">
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-wider bg-cyan-500 text-slate-950 shadow">
                        {act.category.replace('_', ' ')}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[8px] font-bold bg-slate-900/80 border border-slate-700 text-amber-400 backdrop-blur">
                        📍 {act.district}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-3 right-3 flex justify-between items-end">
                      <div className="min-w-0 pr-2">
                        <h3 className="text-xs font-bold text-white drop-shadow truncate">{act.title}</h3>
                        <p className="text-[9px] text-slate-300 drop-shadow truncate">{act.locationName}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-sm font-black text-amber-400">₹{act.pricePerPerson.toLocaleString()}</span>
                        <span className="block text-[7px] text-slate-300 font-mono">per person</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-3 space-y-2.5">
                    <p className="text-[10px] text-slate-300 leading-relaxed">
                      {act.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[9px] bg-slate-950/60 p-2 rounded-xl border border-slate-850">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Clock className="w-3 h-3 text-amber-500 shrink-0" />
                        <span>Duration: <b>{act.duration}</b></span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <Star className="w-3 h-3 text-amber-400 fill-amber-400 shrink-0" />
                        <span className="font-bold text-white">{act.rating} ({act.reviewCount} reviews)</span>
                      </div>
                    </div>

                    {/* What's included */}
                    <div className="space-y-1">
                      <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                        Included in Ticket:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {act.includedItems.slice(0, 3).map((item, i) => (
                          <span key={i} className="text-[8px] bg-slate-800 text-slate-300 px-1.5 py-0.5 rounded">
                            ✓ {item}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Expanded view for reviews */}
                    <AnimatePresence>
                      {isExpanded && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          className="pt-2 border-t border-slate-800 space-y-2 text-[10px]"
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                              Adventure Reviews ({act.reviews.length})
                            </span>
                            <button
                              type="button"
                              onClick={() => setReviewModalTarget({ type: 'activity', id: act.id, title: act.title })}
                              className="text-[9px] text-amber-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                            >
                              <Star className="w-2.5 h-2.5 fill-amber-400" /> Write Review
                            </button>
                          </div>

                          {act.reviews.map((rev) => (
                            <div key={rev.id} className="p-2 bg-slate-950 border border-slate-850 rounded-lg space-y-1">
                              <div className="flex justify-between items-center">
                                <span className="font-bold text-white text-[9px]">{rev.userName}</span>
                                <span className="text-amber-400 text-[8px] font-bold">★ {rev.rating}</span>
                              </div>
                              <p className="text-slate-300 text-[9px] leading-snug">{rev.comment}</p>
                              <div className="flex justify-between items-center text-[7px] text-slate-500 pt-0.5">
                                <span>{rev.date}</span>
                                <button
                                  type="button"
                                  onClick={() => handleToggleUpvote(rev.id)}
                                  className={`flex items-center gap-0.5 hover:text-white cursor-pointer ${upvotedReviewIds[rev.id] ? 'text-amber-400 font-bold' : ''}`}
                                >
                                  <ThumbsUp className="w-2 h-2" />
                                  <span>Helpful ({rev.helpfulCount + (upvotedReviewIds[rev.id] ? 1 : 0)})</span>
                                </button>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Actions */}
                    <div className="pt-1 flex gap-2">
                      <button
                        type="button"
                        onClick={() => setExpandedItemId(isExpanded ? null : act.id)}
                        className="py-2 px-3 rounded-xl bg-slate-800 hover:bg-slate-750 text-slate-300 hover:text-white text-[10px] font-bold flex items-center gap-1 transition cursor-pointer"
                      >
                        <span>{isExpanded ? 'Hide' : 'Reviews'}</span>
                        {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                      </button>

                      <button
                        type="button"
                        onClick={() => setPaymentModalItem({
                          id: act.id,
                          type: 'activity',
                          title: act.title,
                          providerName: act.locationName,
                          imageUrl: act.imageUrl,
                          price: act.pricePerPerson,
                          priceUnit: 'per adventurer'
                        })}
                        className="flex-1 py-2 px-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition active:scale-95 shadow-md cursor-pointer"
                      >
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Book Activity Slot</span>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= SECTION 4: ARTISAN VILLAGE & ONBOARDING ================= */}
        {activeSection === 'artisans' && (
          <div className="space-y-3">
            {/* Artisan Onboarding Banner */}
            <div className="p-3.5 bg-gradient-to-r from-amber-500/20 via-orange-500/15 to-transparent border border-amber-500/30 rounded-2xl flex justify-between items-center">
              <div className="min-w-0 pr-2">
                <span className="text-[8px] font-black uppercase tracking-wider text-amber-400 block mb-0.5">
                  Artisan Empowerment Program
                </span>
                <h4 className="text-xs font-bold text-white">Are you a Maharashtra Craftsperson?</h4>
                <p className="text-[9px] text-slate-300">Get listed on MahaPassport & host tourist workshops.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsArtisanOnboardingOpen(true)}
                className="px-3 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-[9px] uppercase tracking-wider shrink-0 transition active:scale-95 shadow-md flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Register</span>
              </button>
            </div>

            <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
              <span>GI Tagged Master Craftsmen</span>
              <span className="font-mono text-amber-400">{filteredArtisans.length} masters</span>
            </div>

            {filteredArtisans.map((artisan) => {
              const isExpanded = expandedItemId === artisan.id;
              return (
                <div
                  key={artisan.id}
                  className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3.5 space-y-3 hover:border-slate-700 transition shadow-lg"
                >
                  <div className="flex gap-3 items-start">
                    <img
                      src={artisan.imageUrl}
                      alt={artisan.name}
                      className="w-16 h-16 rounded-xl object-cover border border-amber-500/30 shrink-0"
                    />
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-xs font-bold text-white truncate">{artisan.name}</h3>
                          <span className="text-[9px] text-amber-400 font-bold block">{artisan.craftType}</span>
                        </div>
                        <span className="text-[8px] bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 px-1.5 py-0.5 rounded font-bold font-mono">
                          GI TAGGED
                        </span>
                      </div>

                      <div className="flex items-center gap-2 mt-1 text-[8px] text-slate-400">
                        <span>📍 {artisan.village}, {artisan.district}</span>
                        <span>•</span>
                        <span>{artisan.experienceYears} yrs craft lineage</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[10px] text-slate-300 leading-relaxed">
                    {language === 'mr' ? artisan.bioMr : artisan.bio}
                  </p>

                  {/* Workshop Offering Card */}
                  <div className="p-2.5 bg-slate-950 border border-amber-500/20 rounded-xl flex justify-between items-center">
                    <div>
                      <span className="text-[8px] text-amber-400 font-bold uppercase tracking-wider block">
                        Hands-On Tourist Masterclass
                      </span>
                      <span className="text-[10px] font-bold text-white block">{artisan.workshopDuration}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-black text-amber-400 font-mono">₹{artisan.workshopPrice}</span>
                      <button
                        type="button"
                        onClick={() => setPaymentModalItem({
                          id: artisan.id,
                          type: 'artisan_workshop',
                          title: `${artisan.craftType} Workshop with ${artisan.name}`,
                          providerName: `${artisan.village}, ${artisan.district}`,
                          imageUrl: artisan.imageUrl,
                          price: artisan.workshopPrice,
                          priceUnit: 'per attendee (materials included)'
                        })}
                        className="px-2.5 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 text-[9px] font-black uppercase transition active:scale-95 shadow cursor-pointer"
                      >
                        Book Workshop
                      </button>
                    </div>
                  </div>

                  {/* Handmade Catalog Items */}
                  <div className="space-y-1.5">
                    <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold block">
                      Direct Artisan Handicrafts (Zero Commission):
                    </span>
                    <div className="grid grid-cols-2 gap-2">
                      {artisan.catalog.map((cat) => (
                        <div key={cat.id} className="p-2 bg-slate-950 border border-slate-850 rounded-xl space-y-1">
                          <img src={cat.imageUrl} alt={cat.title} className="w-full h-20 rounded-lg object-cover" />
                          <h5 className="font-bold text-white text-[9px] truncate">{cat.title}</h5>
                          <div className="flex justify-between items-center pt-0.5">
                            <span className="text-[9px] font-black text-amber-400">₹{cat.price.toLocaleString()}</span>
                            <button
                              type="button"
                              onClick={() => setPaymentModalItem({
                                id: cat.id,
                                type: 'artisan_product',
                                title: cat.title,
                                providerName: `Crafted by ${artisan.name}`,
                                imageUrl: cat.imageUrl,
                                price: cat.price,
                                priceUnit: 'authentic GI craft piece'
                              })}
                              className="px-2 py-0.5 bg-slate-800 hover:bg-amber-500 hover:text-slate-950 text-slate-300 text-[8px] font-bold rounded transition cursor-pointer"
                            >
                              Buy Direct
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Expanded Reviews */}
                  <AnimatePresence>
                    {isExpanded && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="pt-2 border-t border-slate-800 space-y-2 text-[10px]"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-[8px] uppercase tracking-wider text-slate-400 font-bold">
                            Craft Reviews ({artisan.reviews.length})
                          </span>
                          <button
                            type="button"
                            onClick={() => setReviewModalTarget({ type: 'artisan', id: artisan.id, title: artisan.name })}
                            className="text-[9px] text-amber-400 font-bold hover:underline cursor-pointer flex items-center gap-1"
                          >
                            <Star className="w-2.5 h-2.5 fill-amber-400" /> Write Review
                          </button>
                        </div>

                        {artisan.reviews.map((rev) => (
                          <div key={rev.id} className="p-2 bg-slate-950 border border-slate-850 rounded-lg space-y-1">
                            <div className="flex justify-between items-center">
                              <span className="font-bold text-white text-[9px]">{rev.userName}</span>
                              <span className="text-amber-400 text-[8px] font-bold">★ {rev.rating}</span>
                            </div>
                            <p className="text-slate-300 text-[9px] leading-snug">{rev.comment}</p>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="flex justify-between items-center pt-1 border-t border-slate-800/60">
                    <button
                      type="button"
                      onClick={() => setExpandedItemId(isExpanded ? null : artisan.id)}
                      className="text-[9px] text-slate-400 hover:text-white font-bold flex items-center gap-1 cursor-pointer"
                    >
                      <span>{isExpanded ? 'Hide Reviews' : 'Show Reviews'}</span>
                      {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                    </button>
                    <span className="text-[8px] text-slate-500 font-mono">Pehchan ID: {artisan.artisanCardNo}</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* ================= SECTION 5: ONLINE PERMITS & REGISTRATIONS ================= */}
        {activeSection === 'permits' && (
          <div className="space-y-3">
            <div className="p-3 bg-gradient-to-r from-emerald-500/15 via-slate-900 to-transparent border border-emerald-500/30 rounded-2xl flex justify-between items-center">
              <div>
                <span className="text-[8px] font-black uppercase tracking-wider text-emerald-400 block mb-0.5">
                  Official Government E-Services
                </span>
                <h4 className="text-xs font-bold text-white">Online Permits & Registrations</h4>
                <p className="text-[9px] text-slate-400">Kaas flower pass, Tadoba safari permits & homestay registrations.</p>
              </div>
              <button
                type="button"
                onClick={() => setIsPermitModalOpen(true)}
                className="px-3 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-[9px] uppercase tracking-wider shrink-0 transition active:scale-95 shadow-md flex items-center gap-1 cursor-pointer"
              >
                <Plus className="w-3 h-3" />
                <span>Apply Pass</span>
              </button>
            </div>

            <div className="space-y-2.5">
              <span className="text-[9px] uppercase tracking-wider font-bold text-slate-400 block px-1">
                Your Submitted & Issued Permits ({permits.length})
              </span>

              {permits.map((pmt) => (
                <div key={pmt.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5">
                  <div className="flex justify-between items-start">
                    <div className="min-w-0 flex-1 pr-2">
                      <span className="text-[8px] font-mono text-amber-400 font-bold">{pmt.id}</span>
                      <h4 className="font-bold text-white text-xs truncate mt-0.5">{pmt.title}</h4>
                      <p className="text-[9px] text-slate-400">Applicant: <b>{pmt.applicantName}</b></p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[8px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 font-mono shrink-0">
                      {pmt.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2 rounded-lg text-[9px]">
                    <div>
                      <span className="text-[7px] text-slate-500 block uppercase font-mono">Date</span>
                      <span className="font-bold text-white">{pmt.visitDate}</span>
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-500 block uppercase font-mono">Visitors</span>
                      <span className="font-bold text-white">{pmt.visitorsCount} Guests</span>
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-500 block uppercase font-mono">Fee Paid</span>
                      <span className="font-bold text-amber-400">₹{pmt.feePaid}</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center pt-1 border-t border-slate-800 text-[8px] text-slate-400">
                    <span className="flex items-center gap-1">
                      <QrCode className="w-3 h-3 text-amber-400" />
                      <span>{pmt.qrCodeToken}</span>
                    </span>
                    <span className="text-emerald-400 font-bold">Valid for Entry</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ================= SECTION 6: MY BOOKINGS & PASSES ================= */}
        {activeSection === 'bookings' && (
          <div className="space-y-3">
            <div className="flex justify-between items-center text-[10px] text-slate-400 px-1">
              <span>Your Active Digital Vouchers & Tickets</span>
              <span className="font-mono text-amber-400">{bookings.length} active</span>
            </div>

            {bookings.length === 0 ? (
              <div className="py-16 text-center space-y-2">
                <Ticket className="w-10 h-10 text-slate-600 mx-auto" />
                <h4 className="text-xs font-bold text-slate-400">No active bookings yet</h4>
                <p className="text-[10px] text-slate-500 max-w-[200px] mx-auto">
                  Browse our Cabs, Certified Guides, or Recreational Activities to plan your trip!
                </p>
                <button
                  type="button"
                  onClick={() => setActiveSection('cars')}
                  className="mt-2 px-3 py-1.5 bg-amber-500 text-slate-950 rounded-xl font-bold text-[9px] uppercase cursor-pointer"
                >
                  Explore Services
                </button>
              </div>
            ) : (
              bookings.map((b) => (
                <div
                  key={b.id}
                  className="bg-[#14100C] border border-amber-500/30 rounded-2xl p-3.5 space-y-3 relative overflow-hidden shadow-xl"
                >
                  {/* Decorative notch */}
                  <div className="flex justify-between items-start border-b border-amber-500/20 pb-2.5">
                    <div className="min-w-0 pr-2">
                      <div className="flex items-center gap-1.5">
                        <span className="text-[8px] bg-amber-500/20 text-amber-400 border border-amber-500/30 px-1.5 py-0.2 rounded font-mono font-bold">
                          {b.id}
                        </span>
                        <span className="text-[7px] text-slate-400 uppercase font-mono">{b.serviceType}</span>
                      </div>
                      <h4 className="font-bold text-white text-xs truncate mt-1">{b.serviceTitle}</h4>
                      <p className="text-[9px] text-slate-400 truncate">{b.providerName}</p>
                    </div>

                    {/* High fidelity QR token */}
                    <div className="w-12 h-12 bg-white p-1 rounded-lg shrink-0 flex items-center justify-center shadow">
                      <QrCode className="w-10 h-10 text-slate-950" />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[9px] bg-slate-950 p-2 rounded-xl">
                    <div>
                      <span className="text-[7px] text-slate-500 block uppercase font-mono">Date & Slot</span>
                      <span className="font-bold text-white truncate block">{b.date} ({b.slotOrDuration || 'Standard'})</span>
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-500 block uppercase font-mono">Amount Paid</span>
                      <span className="font-bold text-emerald-400">₹{b.finalPaidAmount.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-500 block uppercase font-mono">Guests / Capacity</span>
                      <span className="font-bold text-white">{b.guestCount} Person(s)</span>
                    </div>
                    <div>
                      <span className="text-[7px] text-slate-500 block uppercase font-mono">Payment Mode</span>
                      <span className="font-mono text-slate-300 uppercase">{b.paymentMethod}</span>
                    </div>
                  </div>

                  {b.notes && (
                    <div className="text-[8px] text-amber-300/80 bg-amber-500/10 p-1.5 rounded-lg border border-amber-500/20">
                      Note: {b.notes}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-1 border-t border-slate-800">
                    <span className="text-[8px] text-emerald-400 font-mono font-bold flex items-center gap-1">
                      <CheckCircle className="w-2.5 h-2.5" /> CONFIRMED & ACTIVE
                    </span>
                    <button
                      type="button"
                      onClick={() => onCancelBooking(b.id)}
                      className="text-[8px] text-rose-400 hover:text-rose-300 font-bold hover:underline cursor-pointer"
                    >
                      Cancel Booking
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* ================= SECTION 7: PARTNER & ONBOARDING HUB ================= */}
        {activeSection === 'partners' && (
          <div className="space-y-3.5">
            {/* Header Showcase */}
            <div className="p-4 bg-gradient-to-br from-amber-950/50 via-slate-900 to-amber-950/30 border border-amber-500/30 rounded-2xl space-y-2.5 shadow-xl">
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[8px] bg-amber-500/20 text-amber-300 font-mono font-bold px-2 py-0.5 rounded uppercase">
                    MTDC Enterprise Onboarding
                  </span>
                  <h3 className="text-sm font-black text-white mt-1 uppercase tracking-wide">
                    {language === 'mr' ? 'महाराष्ट्र पर्यटन भागीदार नोंदणी केंद्र' : 'Maharashtra Partner Registration Hub'}
                  </h3>
                </div>
                <div className="w-8 h-8 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <p className="text-[10px] text-slate-300 leading-relaxed">
                {language === 'mr'
                  ? 'स्थानिक टॅक्सी चालक, अधिकृत मार्गदर्शक, पारंपरिक कारागीर आणि ई-परवान्यांसाठी एकात्मिक नोंदणी कक्ष.'
                  : 'Empowering local drivers, certified historians, and master artisans with direct tourist bookings, zero commission fees, and verified MTDC digital credentials.'}
              </p>

              {/* Highlights row */}
              <div className="grid grid-cols-3 gap-1.5 pt-1 text-center font-mono">
                <div className="p-1.5 bg-slate-950/70 rounded-lg border border-slate-850">
                  <span className="text-[7px] text-slate-400 block uppercase">Commission</span>
                  <span className="text-[11px] font-black text-emerald-400">0% Zero</span>
                </div>
                <div className="p-1.5 bg-slate-950/70 rounded-lg border border-slate-850">
                  <span className="text-[7px] text-slate-400 block uppercase">Settlement</span>
                  <span className="text-[11px] font-black text-cyan-400">Direct UPI</span>
                </div>
                <div className="p-1.5 bg-slate-950/70 rounded-lg border border-slate-850">
                  <span className="text-[7px] text-slate-400 block uppercase">Govt Badge</span>
                  <span className="text-[11px] font-black text-amber-400">MTDC Verified</span>
                </div>
              </div>
            </div>

            {/* 4 Interactive Registration Cards */}
            <div className="space-y-2.5">
              <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 px-1 block">
                Select Your Onboarding Category:
              </span>

              {/* CARD 1: CAB & DRIVER REGISTRATION */}
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl space-y-2.5 transition shadow-lg">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                    <Car className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black text-white">Local Cab & Driver Registration</h4>
                      <span className="text-[7px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded font-bold uppercase">Commercial Fleet</span>
                    </div>
                    <p className="text-[9px] text-slate-300 mt-0.5 leading-relaxed">
                      Register your yellow-plate taxi, SUV (Innova, Ertiga), or Tempo traveler for Sahyadri Ghats, Mumbai-Pune Expressway, and Konkan circuits.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-[8px] text-slate-400">
                    <span>✓ RTO Badge Verified</span>
                    <span>•</span>
                    <span>✓ Set Your Daily Tariff</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsDriverModalOpen(true)}
                    className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-[9px] uppercase tracking-wider transition active:scale-95 shadow cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Register Cab</span>
                  </button>
                </div>
              </div>

              {/* CARD 2: TOUR GUIDE ACCREDITATION */}
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl space-y-2.5 transition shadow-lg">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black text-white">Tour Guide & Historian Accreditation</h4>
                      <span className="text-[7px] font-mono bg-cyan-500/20 text-cyan-300 px-1.5 py-0.5 rounded font-bold uppercase">MTDC Certified</span>
                    </div>
                    <p className="text-[9px] text-slate-300 mt-0.5 leading-relaxed">
                      Accreditation for certified MTDC guides, Maratha fort historians, tiger trackers in Tadoba/Melghat, and Ajanta-Ellora cave experts.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-[8px] text-slate-400">
                    <span>✓ Multi-language Badges</span>
                    <span>•</span>
                    <span>✓ Direct Booking Calendar</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsGuideModalOpen(true)}
                    className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black rounded-xl text-[9px] uppercase tracking-wider transition active:scale-95 shadow cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Apply as Guide</span>
                  </button>
                </div>
              </div>

              {/* CARD 3: ARTISAN & CRAFTSPERSON ONBOARDING */}
              <div className="p-3.5 bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 rounded-2xl space-y-2.5 transition shadow-lg">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                    <Palette className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black text-white">Artisan & GI Craftsperson Onboarding</h4>
                      <span className="text-[7px] font-mono bg-emerald-500/20 text-emerald-300 px-1.5 py-0.5 rounded font-bold uppercase">Handicrafts Cell</span>
                    </div>
                    <p className="text-[9px] text-slate-300 mt-0.5 leading-relaxed">
                      Sell Warli art, Paithani silk, Kolhapuri chappals, and Sawantwadi wooden toys directly to tourists. Host hands-on cultural workshops.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-[8px] text-slate-400">
                    <span>✓ GI Tag Promotion</span>
                    <span>•</span>
                    <span>✓ Host Tourist Workshops</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsArtisanOnboardingOpen(true)}
                    className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-[9px] uppercase tracking-wider transition active:scale-95 shadow cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Register Artisan</span>
                  </button>
                </div>
              </div>

              {/* CARD 4: TOURIST & CITIZEN E-PERMIT APPLICATION */}
              <div className="p-3.5 bg-slate-900/80 border border-slate-850 hover:border-indigo-500/40 rounded-2xl space-y-2.5 transition shadow-lg">
                <div className="flex gap-3 items-start">
                  <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 shrink-0">
                    <FileText className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h4 className="text-xs font-black text-white">Protected Eco & Heritage E-Permits</h4>
                      <span className="text-[7px] font-mono bg-indigo-500/20 text-indigo-300 px-1.5 py-0.5 rounded font-bold uppercase">Official Permits</span>
                    </div>
                    <p className="text-[9px] text-slate-300 mt-0.5 leading-relaxed">
                      Apply for daily restricted entry passes to Kaas Flower Valley, Tadoba Jeep Safari, Raigad Ropeway, and Rural Homestay approvals.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between items-center pt-2 border-t border-slate-800/80">
                  <div className="flex items-center gap-2 text-[8px] text-slate-400">
                    <span>✓ Instant QR Pass</span>
                    <span>•</span>
                    <span>✓ Forest Dept Integrated</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsPermitModalOpen(true)}
                    className="px-3 py-1.5 bg-indigo-500 hover:bg-indigo-400 text-white font-black rounded-xl text-[9px] uppercase tracking-wider transition active:scale-95 shadow cursor-pointer flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Apply E-Permit</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Payment Gateway Modal */}
      {paymentModalItem && (
        <PaymentGatewayModal
          isOpen={true}
          onClose={() => setPaymentModalItem(null)}
          item={paymentModalItem}
          userXp={profile.xp}
          userMobile={profile.mobile}
          onPaymentSuccess={(newBooking, xpDeducted) => {
            onAddBooking(newBooking, xpDeducted);
          }}
        />
      )}

      {/* Review Modal */}
      {reviewModalTarget && (
        <ReviewModal
          isOpen={true}
          onClose={() => setReviewModalTarget(null)}
          serviceId={reviewModalTarget.id}
          serviceTitle={reviewModalTarget.title}
          userName={profile.name}
          onReviewSubmitted={(newReview) => {
            onAddReview(reviewModalTarget.type, reviewModalTarget.id, newReview);
          }}
        />
      )}

      {/* Artisan Onboarding Modal */}
      {isArtisanOnboardingOpen && (
        <ArtisanOnboardingModal
          isOpen={true}
          onClose={() => setIsArtisanOnboardingOpen(false)}
          onArtisanRegistered={(reg) => {
            onRegisterArtisan(reg);
          }}
        />
      )}

      {/* Driver Registration Modal */}
      {isDriverModalOpen && (
        <DriverRegistrationModal
          isOpen={true}
          onClose={() => setIsDriverModalOpen(false)}
          onDriverRegistered={(reg) => {
            onRegisterDriver(reg);
          }}
        />
      )}

      {/* Guide Registration Modal */}
      {isGuideModalOpen && (
        <GuideRegistrationModal
          isOpen={true}
          onClose={() => setIsGuideModalOpen(false)}
          onGuideRegistered={(reg) => {
            onRegisterGuide(reg);
          }}
        />
      )}

      {/* Permit Application Modal */}
      {isPermitModalOpen && (
        <PermitApplicationModal
          isOpen={true}
          onClose={() => setIsPermitModalOpen(false)}
          onPermitIssued={(permit) => {
            onIssuePermit(permit);
          }}
        />
      )}
    </div>
  );
}
