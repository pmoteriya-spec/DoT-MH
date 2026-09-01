import React, { useState, useEffect, useRef } from 'react';
import { Destination, Circuit, UserProfile } from '../types';
import { DESTINATIONS, CIRCUITS } from '../data';
import { ChevronRight, ArrowLeft, Info, Landmark, MapPin, Search, Calendar, Car, AlertTriangle, Compass, Sparkles, Award, Navigation, Crosshair, RefreshCw, Route, Clock, ExternalLink, X } from 'lucide-react';
import { motion } from 'motion/react';
import MaharashtraLogo from './MaharashtraLogo';
import DestinationInteractiveHub from './DestinationInteractiveHub';

function getDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; // Radius of the earth in km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon1 - lon2) * Math.PI / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function getCardinalDirection(lat1: number, lon1: number, lat2: number, lon2: number): string {
  const dLon = (lon2 - lon1) * Math.PI / 180;
  const lat1Rad = lat1 * Math.PI / 180;
  const lat2Rad = lat2 * Math.PI / 180;
  const y = Math.sin(dLon) * Math.cos(lat2Rad);
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) - Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon);
  let brng = Math.atan2(y, x) * 180 / Math.PI;
  brng = (brng + 360) % 360;
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
  return directions[Math.round(brng / 45) % 8];
}

interface DiscoverTabProps {
  profile: UserProfile;
  language: 'en' | 'mr';
  onNavigateToMap: (destinationId: string) => void;
  onNavigateToQuiz: (destinationId: string) => void;
  userLat?: number;
  userLng?: number;
  destinations?: Destination[];
  circuits?: Circuit[];
}

export default function DiscoverTab({ 
  profile, 
  language, 
  onNavigateToMap, 
  onNavigateToQuiz, 
  userLat, 
  userLng,
  destinations,
  circuits
}: DiscoverTabProps) {
  const destinationsList = destinations || DESTINATIONS;
  const circuitsList = circuits || CIRCUITS;

  const [selectedCircuit, setSelectedCircuit] = useState<Circuit | null>(null);
  const [selectedDest, setSelectedDest] = useState<Destination | null>(null);
  const [selectedSpot, setSelectedSpot] = useState<any | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeSection, setActiveSection] = useState<'history' | 'culture' | 'food'>('history');

  // Nearby states
  const [gpsMode, setGpsMode] = useState<'gps' | 'city'>('gps');
  const [liveGps, setLiveGps] = useState<{ lat: number; lng: number; status: 'idle' | 'locating' | 'success' | 'error' }>({
    lat: userLat || 18.5204,
    lng: userLng || 73.8567,
    status: 'idle'
  });
  const [nearbyCitySearch, setNearbyCitySearch] = useState('Pune');
  const [maxDistance, setMaxDistance] = useState<number>(100);
  const [selectedDistanceDest, setSelectedDistanceDest] = useState<Destination | null>(null);

  const handleFetchCurrentGps = () => {
    setLiveGps(prev => ({ ...prev, status: 'locating' }));
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setLiveGps({
            lat: pos.coords.latitude,
            lng: pos.coords.longitude,
            status: 'success'
          });
        },
        (err) => {
          console.warn('Geolocation failed or denied:', err);
          setLiveGps(prev => ({ ...prev, status: 'error' }));
        },
        { timeout: 8000, enableHighAccuracy: true }
      );
    } else {
      setLiveGps(prev => ({ ...prev, status: 'error' }));
    }
  };

  // City/District coordinates helper for dynamic lookup
  const getCityCoordinates = (search: string): { lat: number; lng: number; resolvedName: string } => {
    const query = search.trim().toLowerCase();
    
    // Predefined coordinates for common Maharashtra cities
    const CITY_MAP: Record<string, { lat: number; lng: number; name: string; nameMr: string }> = {
      pune: { lat: 18.5204, lng: 73.8567, name: 'Pune', nameMr: 'पुणे' },
      mumbai: { lat: 19.0760, lng: 72.8777, name: 'Mumbai', nameMr: 'मुंबई' },
      satara: { lat: 17.6805, lng: 73.9918, name: 'Satara', nameMr: 'सातारा' },
      raigad: { lat: 18.5158, lng: 73.1822, name: 'Raigad', nameMr: 'रायगड' },
      aurangabad: { lat: 19.8762, lng: 75.3433, name: 'Aurangabad', nameMr: 'छत्रपती संभाजीनगर' },
      sambhajinagar: { lat: 19.8762, lng: 75.3433, name: 'Chhatrapati Sambhajinagar', nameMr: 'छत्रपती संभाजीनगर' },
      chhatrapati_sambhajinagar: { lat: 19.8762, lng: 75.3433, name: 'Chhatrapati Sambhajinagar', nameMr: 'छत्रपती संभाजीनगर' },
      chandrapur: { lat: 19.9615, lng: 79.2961, name: 'Chandrapur', nameMr: 'चंद्रपूर' },
      amravati: { lat: 20.9374, lng: 77.7796, name: 'Amravati', nameMr: 'अमरावती' },
      nagpur: { lat: 21.1458, lng: 79.0882, name: 'Nagpur', nameMr: 'नागपूर' },
      nashik: { lat: 19.9975, lng: 73.7898, name: 'Nashik', nameMr: 'नाशिक' },
      kolhapur: { lat: 16.7050, lng: 74.2433, name: 'Kolhapur', nameMr: 'कोल्हापूर' },
      sindhudurg: { lat: 16.1136, lng: 73.6880, name: 'Sindhudurg', nameMr: 'सिंधुदुर्ग' },
      ratnagiri: { lat: 16.9902, lng: 73.3120, name: 'Ratnagiri', nameMr: 'रत्नागिरी' }
    };

    if (query === 'gps' || query === 'my gps' || query === 'माझे जीपीएस' || query === 'जवळपास') {
      return { 
        lat: liveGps.lat, 
        lng: liveGps.lng, 
        resolvedName: language === 'mr' ? 'माझे जीपीएस स्थान' : 'My Current GPS' 
      };
    }

    if (CITY_MAP[query]) {
      const match = CITY_MAP[query];
      return { lat: match.lat, lng: match.lng, resolvedName: language === 'mr' ? match.nameMr : match.name };
    }

    // Partial match in predefined map
    const foundKey = Object.keys(CITY_MAP).find(k => k.includes(query) || query.includes(k));
    if (foundKey) {
      const match = CITY_MAP[foundKey];
      return { lat: match.lat, lng: match.lng, resolvedName: language === 'mr' ? match.nameMr : match.name };
    }

    // Search in DESTINATIONS data for matching district or name
    const matchingDest = destinationsList.find(dest => 
      dest.district.toLowerCase().includes(query) || 
      dest.name.toLowerCase().includes(query) || 
      dest.nameMr.includes(query)
    );

    if (matchingDest) {
      return { 
        lat: matchingDest.lat, 
        lng: matchingDest.lng, 
        resolvedName: language === 'mr' ? `${matchingDest.district} (जवळपास)` : `${matchingDest.district} Area` 
      };
    }

    // Fallback default coordinates
    return { 
      lat: 18.5204, 
      lng: 73.8567, 
      resolvedName: language === 'mr' ? 'पुणे (डिफॉल्ट)' : 'Pune (Default)' 
    };
  };

  const resolved = gpsMode === 'gps' 
    ? {
        lat: liveGps.lat,
        lng: liveGps.lng,
        resolvedName: language === 'mr' 
          ? `माझे जीपीएस (${liveGps.lat.toFixed(3)}°, ${liveGps.lng.toFixed(3)}°)`
          : `Live GPS (${liveGps.lat.toFixed(3)}° N, ${liveGps.lng.toFixed(3)}° E)`
      }
    : getCityCoordinates(nearbyCitySearch);

  const refLat = resolved.lat;
  const refLng = resolved.lng;
  const resolvedCityName = resolved.resolvedName;

  const nearbyDestinations = destinationsList.map(dest => {
    const dist = getDistanceKm(refLat, refLng, dest.lat, dest.lng);
    const direction = getCardinalDirection(refLat, refLng, dest.lat, dest.lng);
    return { ...dest, distance: dist, direction };
  }).filter(dest => dest.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance);

  const filterCircuits = circuitsList;

  const handleBackToCircuits = () => {
    setSelectedCircuit(null);
    setSelectedDest(null);
    setSelectedSpot(null);
  };

  const handleBackToCircuit = () => {
    setSelectedDest(null);
    setSelectedSpot(null);
  };

  const handleBackToDest = () => {
    setSelectedSpot(null);
  };

  const getCircuitProgress = (circuit: Circuit) => {
    const destsInCircuit = circuit.destinations;
    const completedCount = destsInCircuit.filter(id => profile.checkedInDestinations.includes(id)).length;
    return {
      completed: completedCount,
      total: destsInCircuit.length,
      percentage: Math.round((completedCount / destsInCircuit.length) * 100)
    };
  };

  // Search logic
  const searchedDestinations = destinationsList.filter(dest => {
    const query = searchQuery.toLowerCase();
    const nameMatch = dest.name.toLowerCase().includes(query) || dest.nameMr.includes(query);
    const districtMatch = dest.district.toLowerCase().includes(query);
    const descMatch = dest.description.toLowerCase().includes(query) || dest.descriptionMr.includes(query);
    return nameMatch || districtMatch || descMatch;
  });

  const handleSelectSearchedDest = (dest: Destination) => {
    setSelectedDest(dest);
    setSelectedSpot(null);
    setSearchQuery('');
    // Auto-resolve parent circuit
    const parent = circuitsList.find(c => c.destinations.includes(dest.id));
    if (parent) {
      setSelectedCircuit(parent);
    } else {
      setSelectedCircuit(null);
    }
  };

  // Helper for circuit images
  const getCircuitImage = (id: string) => {
    const images: Record<string, string> = {
      konkan: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=500&q=80',
      forts: 'https://images.unsplash.com/photo-1626264290740-02df5955b9e0?auto=format&fit=crop&w=500&q=80',
      hill_stations: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=500&q=80',
      pilgrimage: 'https://images.unsplash.com/photo-1597166160100-333e8b0933f3?auto=format&fit=crop&w=500&q=80',
      buddhist: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=500&q=80',
      wildlife: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=500&q=80',
      heritage: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=500&q=80',
      beach: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=500&q=80',
      wine: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=500&q=80',
      adventure: 'https://images.unsplash.com/photo-1533240332313-0db49b439ad3?auto=format&fit=crop&w=500&q=80',
      cultural: 'https://images.unsplash.com/photo-1514222134-b57cbb8ce073?auto=format&fit=crop&w=500&q=80',
      eco_tourism: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=500&q=80'
    };
    return images[id] || 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=500&q=80';
  };

  const [isGpsFinderOpen, setIsGpsFinderOpen] = useState(true);

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent text-slate-100 overflow-hidden relative">
      {/* Search Header - Only shown on Front Circuits list */}
      {!selectedCircuit && !selectedDest && !selectedSpot && (
        <div className="p-4 bg-[#18130E] border-b border-[#2A241C] sticky top-0 z-10 flex flex-col items-center text-center shrink-0">
          <div className="relative w-full">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'mr' ? 'प्रेक्षणीय स्थळे किंवा जिल्हे शोधा...' : 'Search destinations, districts...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-850/80 border border-slate-700/60 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-[#E86B21] focus:ring-1 focus:ring-[#E86B21]/20 transition placeholder-slate-500 font-medium"
            />
          </div>
        </div>
      )}

      {/* Main Container */}
      <div className="flex-1 overflow-y-auto px-4 py-4 pb-12">
        
        {/* VIEW 0: Search Results (Active when query is typed, and no dest is selected) */}
        {searchQuery && !selectedCircuit && !selectedDest && !selectedSpot && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-wider">
                {language === 'mr' ? `शोधाचे निकाल (${searchedDestinations.length})` : `Search Results (${searchedDestinations.length})`}
              </h3>
              <button 
                onClick={() => setSearchQuery('')}
                className="text-xs text-[#E86B21] font-bold hover:underline"
              >
                {language === 'mr' ? 'साफ करा' : 'Clear'}
              </button>
            </div>

            {searchedDestinations.map(dest => (
              <div 
                key={dest.id}
                onClick={() => handleSelectSearchedDest(dest)}
                className="bg-slate-900/60 border border-slate-800 rounded-xl overflow-hidden flex cursor-pointer hover:border-[#E86B21]/30 transition-all active:scale-[0.99]"
              >
                <img src={dest.imageUrl} className="w-20 h-20 object-cover" alt="" />
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-white line-clamp-1">
                      {language === 'mr' ? dest.nameMr : dest.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5 font-medium">
                      <MapPin className="w-3 h-3 text-[#E86B21]" />
                      <span>{dest.district} District</span>
                    </p>
                  </div>
                  <span className="text-[8px] font-black text-[#E86B21] bg-[#E86B21]/10 px-2 py-0.5 rounded-md self-start uppercase tracking-wider border border-[#E86B21]/15">
                    {dest.category}
                  </span>
                </div>
              </div>
            ))}

            {searchedDestinations.length === 0 && (
              <div className="text-center py-10 bg-slate-900/20 rounded-xl border border-dashed border-slate-800">
                <Info className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-xs text-slate-400">
                  {language === 'mr' ? 'कोणतेही स्थळ सापडले नाही.' : 'No destinations match your search.'}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 1: Front Page - Display All Circuits */}
        {!selectedCircuit && !selectedDest && !selectedSpot && !searchQuery && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            {/* GPS Nearby Finder Collapsible */}
            <div className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden">
              <button 
                onClick={() => setIsGpsFinderOpen(!isGpsFinderOpen)}
                className="w-full p-4 flex justify-between items-center hover:bg-slate-900/30 transition text-left"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#E86B21]" />
                  <div>
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-2">
                      <span>{language === 'mr' ? '📍 जीपीएस जवळपास स्थान व अंतर शोधक' : '📍 GPS Nearby Finder & Distance Calculator'}</span>
                      <span className="text-[8px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-1.5 py-0.5 rounded font-mono font-bold">LIVE GPS</span>
                    </h4>
                    <p className="text-[9px] text-slate-500 mt-0.5">
                      {language === 'mr' ? 'तुमचे सध्याचे जीपीएस स्थान किंवा शहराचे अंतर मोजा' : 'Find nearby destinations & calculate real-time GPS distances'}
                    </p>
                  </div>
                </div>
                <ChevronRight className={`w-4 h-4 text-slate-450 transition-transform ${isGpsFinderOpen ? 'rotate-90' : ''}`} />
              </button>

              {isGpsFinderOpen && (
                <div className="p-4 border-t border-slate-850 space-y-4 bg-slate-950/20">
                  {/* Mode Selector: Current GPS vs City Search */}
                  <div className="grid grid-cols-2 gap-2 bg-slate-900/80 p-1 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => {
                        setGpsMode('gps');
                        if (liveGps.status === 'idle') handleFetchCurrentGps();
                      }}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                        gpsMode === 'gps'
                          ? 'bg-[#E86B21] text-slate-950 shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <Crosshair className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'माझे जीपीएस स्थान' : 'Current GPS Location'}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setGpsMode('city')}
                      className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-[10px] font-black uppercase tracking-wider transition ${
                        gpsMode === 'city'
                          ? 'bg-[#E86B21] text-slate-950 shadow-md'
                          : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                      }`}
                    >
                      <Search className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'शहर / जिल्हा शोधा' : 'Search City / District'}</span>
                    </button>
                  </div>

                  {/* Mode 1: Current GPS Panel */}
                  {gpsMode === 'gps' && (
                    <div className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-[10px] font-bold text-white">
                            {language === 'mr' ? 'सध्याचे जीपीएस स्थान:' : 'Current Live GPS Location:'}
                          </span>
                        </div>

                        <button
                          type="button"
                          onClick={handleFetchCurrentGps}
                          className="flex items-center gap-1 text-[9px] text-[#E86B21] font-bold bg-[#E86B21]/10 hover:bg-[#E86B21]/20 border border-[#E86B21]/30 px-2 py-1 rounded-md transition"
                        >
                          <RefreshCw className={`w-3 h-3 ${liveGps.status === 'locating' ? 'animate-spin' : ''}`} />
                          <span>{liveGps.status === 'locating' ? 'Locating...' : 'Refresh GPS'}</span>
                        </button>
                      </div>

                      <div className="bg-slate-950 p-2 rounded-lg border border-slate-850 flex justify-between items-center text-[9px] font-mono">
                        <div className="text-slate-300">
                          <span className="text-slate-500 font-bold mr-1">LAT:</span> {liveGps.lat.toFixed(4)}°
                          <span className="text-slate-500 font-bold ml-2 mr-1">LNG:</span> {liveGps.lng.toFixed(4)}°
                        </div>
                        <span className="text-emerald-400 font-bold">
                          {liveGps.status === 'success' ? '✓ Precision Lock' : liveGps.status === 'locating' ? '📡 Acquiring...' : '• Active'}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Mode 2: City / District Search Input */}
                  {gpsMode === 'city' && (
                    <div className="relative">
                      <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        placeholder={language === 'mr' ? 'शहर किंवा जिल्ह्याचे नाव टाका (उदा. पुणे, मुंबई, सातारा)...' : 'Type city or district (e.g., Pune, Mumbai, Satara)...'}
                        value={nearbyCitySearch}
                        onChange={(e) => setNearbyCitySearch(e.target.value)}
                        className="w-full bg-slate-900/60 border border-slate-800 rounded-xl pl-9 pr-3 py-2 text-[10px] text-white focus:outline-none focus:border-[#E86B21] transition placeholder-slate-500 font-medium"
                      />
                    </div>
                  )}

                  {/* Distance radius slider */}
                  <div className="bg-slate-900/30 p-3 rounded-xl border border-slate-850">
                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-semibold mb-1.5">
                      <span>{language === 'mr' ? 'शोध त्रिज्या (अंतर)' : 'Search Radius (Distance Limit)'}</span>
                      <span className="text-[#E86B21] font-black">{maxDistance} km</span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="300"
                      step="10"
                      value={maxDistance}
                      onChange={(e) => setMaxDistance(Number(e.target.value))}
                      className="w-full accent-[#E86B21] bg-slate-800 h-1 rounded-lg cursor-pointer"
                    />
                  </div>

                  {/* Interactive Distance Matrix Popover / Modal when a destination is selected */}
                  {selectedDistanceDest && (
                    <div className="p-3 bg-gradient-to-br from-slate-900 to-slate-950 border border-amber-500/40 rounded-xl space-y-3 animate-fadeIn">
                      <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                        <div className="flex items-center gap-1.5">
                          <Route className="w-4 h-4 text-[#E86B21]" />
                          <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                            {language === 'mr' ? 'जीपीएस अंतर आणि मार्ग माहिती' : 'GPS Distance & Route Breakdown'}
                          </span>
                        </div>
                        <button
                          type="button"
                          onClick={() => setSelectedDistanceDest(null)}
                          className="text-slate-500 hover:text-slate-300 p-1 cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="flex items-center gap-2.5">
                        <img src={selectedDistanceDest.imageUrl} className="w-10 h-10 rounded-lg object-cover border border-slate-800" alt="" />
                        <div>
                          <h4 className="text-xs font-black text-white">{selectedDistanceDest.name}</h4>
                          <span className="text-[9px] text-slate-400">District: {selectedDistanceDest.district}</span>
                        </div>
                      </div>

                      {/* Distance breakdown statistics */}
                      <div className="grid grid-cols-2 gap-2 text-[9px] font-mono">
                        <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                          <span className="block text-slate-500 text-[8px] uppercase font-sans font-bold">Straight Line Air Distance</span>
                          <span className="text-amber-400 text-sm font-black">
                            {getDistanceKm(refLat, refLng, selectedDistanceDest.lat, selectedDistanceDest.lng).toFixed(1)} km
                          </span>
                        </div>

                        <div className="bg-slate-950 p-2 rounded-lg border border-slate-850">
                          <span className="block text-slate-500 text-[8px] uppercase font-sans font-bold">Est. Road Distance</span>
                          <span className="text-emerald-400 text-sm font-black">
                            ~{(getDistanceKm(refLat, refLng, selectedDistanceDest.lat, selectedDistanceDest.lng) * 1.22).toFixed(1)} km
                          </span>
                        </div>
                      </div>

                      <div className="grid grid-cols-3 gap-1.5 text-[8px] text-slate-300 bg-slate-950 p-2 rounded-lg border border-slate-850">
                        <div className="flex flex-col items-center text-center">
                          <Car className="w-3 h-3 text-amber-500 mb-0.5" />
                          <span className="text-slate-500 font-bold">Drive Time</span>
                          <span className="font-mono text-white font-bold">
                            ~{Math.round((getDistanceKm(refLat, refLng, selectedDistanceDest.lat, selectedDistanceDest.lng) * 1.22) / 50 * 60)} mins
                          </span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                          <Compass className="w-3 h-3 text-cyan-400 mb-0.5" />
                          <span className="text-slate-500 font-bold">Direction</span>
                          <span className="font-mono text-cyan-400 font-bold">
                            {getCardinalDirection(refLat, refLng, selectedDistanceDest.lat, selectedDistanceDest.lng)}
                          </span>
                        </div>

                        <div className="flex flex-col items-center text-center">
                          <MapPin className="w-3 h-3 text-emerald-400 mb-0.5" />
                          <span className="text-slate-500 font-bold">Dest Coords</span>
                          <span className="font-mono text-emerald-400 font-bold text-[7px]">
                            {selectedDistanceDest.lat.toFixed(2)}°, {selectedDistanceDest.lng.toFixed(2)}°
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            const url = `https://www.google.com/maps/dir/?api=1&origin=${refLat},${refLng}&destination=${selectedDistanceDest.lat},${selectedDistanceDest.lng}`;
                            window.open(url, '_blank');
                          }}
                          className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[9px] font-black py-2 rounded-lg transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <ExternalLink className="w-3 h-3" />
                          <span>Google Maps Directions</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            const original = destinationsList.find(d => d.id === selectedDistanceDest.id);
                            if (original) handleSelectSearchedDest(original);
                            setSelectedDistanceDest(null);
                          }}
                          className="bg-slate-800 hover:bg-slate-700 text-white text-[9px] font-bold px-3 py-2 rounded-lg transition cursor-pointer"
                        >
                          View In App
                        </button>
                      </div>
                    </div>
                  )}

                  {/* List of nearby destinations with distance tag & find distance trigger */}
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    <div className="flex justify-between items-center text-[10px] text-slate-450 font-bold uppercase tracking-wider mb-1">
                      <span>{language === 'mr' ? `जवळपासची ठिकाणे (${resolvedCityName}):` : `Destinations near ${resolvedCityName}:`}</span>
                      <span className="text-[#E86B21] font-mono text-[9px]">{nearbyDestinations.length} Found</span>
                    </div>

                    {nearbyDestinations.map((dest) => {
                      const isWithin100k = dest.distance <= 100;
                      const driveMins = Math.round((dest.distance * 1.22) / 50 * 60);

                      return (
                        <div
                          key={dest.id}
                          className="p-2 bg-slate-900/30 hover:bg-slate-800/40 border border-slate-850 hover:border-[#E86B21]/30 rounded-xl flex items-center justify-between transition group"
                        >
                          <div 
                            onClick={() => {
                              const original = destinationsList.find(d => d.id === dest.id);
                              if (original) handleSelectSearchedDest(original);
                            }}
                            className="flex items-center gap-2.5 flex-1 min-w-0 cursor-pointer"
                          >
                            <img src={dest.imageUrl} className="w-9 h-9 rounded-lg object-cover border border-slate-850 shrink-0" alt="" />
                            <div className="min-w-0">
                              <h4 className="text-xs font-bold text-white line-clamp-1 group-hover:text-amber-400 transition">
                                {language === 'mr' ? dest.nameMr : dest.name}
                              </h4>
                              <div className="flex items-center gap-2 text-[9px] text-slate-500 mt-0.5">
                                <span className="flex items-center gap-0.5">
                                  <MapPin className="w-2 h-2 text-[#E86B21]" />
                                  <span>{dest.district}</span>
                                </span>
                                <span className="text-cyan-400 font-mono font-bold flex items-center gap-0.5">
                                  <Clock className="w-2 h-2" />
                                  <span>~{driveMins < 60 ? `${driveMins}m` : `${(driveMins/60).toFixed(1)}h`}</span>
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-1.5 shrink-0 ml-2">
                            <button
                              type="button"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedDistanceDest(dest);
                              }}
                              className="px-2 py-1 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/25 rounded-lg text-amber-400 text-[8px] font-bold transition flex items-center gap-1 cursor-pointer"
                              title="Calculate exact distance and route breakdown"
                            >
                              <Navigation className="w-2.5 h-2.5" />
                              <span>Distance</span>
                            </button>

                            <span className={`text-[9px] font-black px-1.5 py-1 rounded-lg font-mono ${
                              isWithin100k 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-slate-800 text-slate-400 border border-slate-700/20'
                            }`}>
                              {dest.distance.toFixed(1)} km
                            </span>
                          </div>
                        </div>
                      );
                    })}

                    {nearbyDestinations.length === 0 && (
                      <div className="text-center py-5 bg-slate-900/10 border border-dashed border-slate-800 rounded-xl">
                        <p className="text-[10px] text-slate-500">
                          {language === 'mr' ? 'निवडलेल्या त्रिज्येमध्ये कोणतीही पर्यटन स्थळे सापडले नाहीत. शोध त्रिज्या वाढवा.' : 'No destinations found within this distance radius. Try increasing radius slider.'}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* State Intro Card */}
            <div className="bg-gradient-to-r from-amber-600/10 to-amber-500/5 border border-amber-500/15 p-4 rounded-2xl flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#E86B21]/15 border border-[#E86B21]/30 flex items-center justify-center font-black text-sm text-[#E86B21] shrink-0">
                MH
              </div>
              <div>
                <h3 className="text-sm font-black text-white uppercase tracking-wider">
                  {language === 'mr' ? 'महाराष्ट्र पर्यटन सर्किट्स' : 'Maharashtra Tourism Circuits'}
                </h3>
                <p className="text-[10px] text-slate-450 font-medium">
                  {language === 'mr' ? '१२ अद्वितीय सर्किट्स • समृद्ध इतिहास, संस्कृती आणि निसर्ग' : '12 Premium Circuits • Infinite History, Culture & Biomes'}
                </p>
              </div>
            </div>

            {/* Circuits Grid */}
            <div className="space-y-3">
              <h3 className="text-xs font-black text-slate-400 uppercase tracking-widest">
                {language === 'mr' ? 'सर्व पर्यटन सर्किट्स' : 'Explore Travel Circuits'}
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {circuitsList.map(circuit => {
                  const progress = getCircuitProgress(circuit);
                  return (
                    <div
                      key={circuit.id}
                      onClick={() => setSelectedCircuit(circuit)}
                      className="relative h-40 rounded-2xl overflow-hidden cursor-pointer shadow-lg group border border-slate-900 transition-all active:scale-[0.98]"
                    >
                      {/* Cover Backdrop */}
                      <img
                        src={getCircuitImage(circuit.id)}
                        className="absolute inset-0 w-full h-full object-cover brightness-[0.4] group-hover:scale-105 transition-all duration-500"
                        alt=""
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                      {/* Info Overlay */}
                      <div className="absolute inset-0 p-4 flex flex-col justify-between">
                        <div>
                          <span className="text-[8px] uppercase tracking-widest bg-black/40 backdrop-blur-md px-2 py-0.5 rounded-full text-[#E86B21] font-extrabold border border-[#E86B21]/20">
                            {circuit.id.replace('_', ' ')}
                          </span>
                          <h3 className="text-sm font-black text-white mt-1.5 leading-tight">
                            {language === 'mr' ? circuit.nameMr : circuit.name}
                          </h3>
                          <p className="text-[9px] text-slate-300 line-clamp-1.5 mt-1 leading-relaxed">
                            {language === 'mr' ? circuit.descriptionMr : circuit.description}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div>
                          <div className="flex justify-between items-center text-[9px] font-bold text-slate-300 mb-1">
                            <span>{progress.completed}/{progress.total} {language === 'mr' ? 'पूर्ण' : 'Visited'}</span>
                            <span className="text-[#E86B21]">{progress.percentage}%</span>
                          </div>
                          <div className="w-full h-1 bg-slate-900 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-[#E86B21] rounded-full transition-all duration-500" 
                              style={{ width: `${progress.percentage}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 2: Circuit's Destinations List */}
        {selectedCircuit && !selectedDest && !selectedSpot && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Header / Breadcrumb */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBackToCircuits}
                className="flex items-center gap-2 text-xs font-bold text-[#E86B21] bg-[#E86B21]/5 border border-[#E86B21]/10 px-3 py-1.5 rounded-xl hover:bg-[#E86B21]/10 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'mr' ? 'सर्व सर्किट्स' : 'All Circuits'}</span>
              </button>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                LEVEL 2 OF 4
              </span>
            </div>

            {/* Circuit Card Title Panel */}
            <div className="bg-slate-900/50 border border-slate-850 p-4 rounded-2xl relative overflow-hidden">
              <div className="flex items-center gap-2 mb-1.5">
                <span className={`w-3 h-3 rounded-full ${selectedCircuit.color || 'bg-[#E86B21]'}`} />
                <h3 className="text-base font-black text-white uppercase tracking-wider">
                  {language === 'mr' ? selectedCircuit.nameMr : selectedCircuit.name}
                </h3>
              </div>
              <p className="text-xs text-slate-350 leading-relaxed font-medium">
                {language === 'mr' ? selectedCircuit.descriptionMr : selectedCircuit.description}
              </p>
            </div>

            {/* Why It Matters (Geography, Culture & History) */}
            <div className="bg-slate-900/30 border border-slate-850/80 rounded-2xl p-4.5 space-y-4">
              <div className="flex items-center gap-1.5 border-b border-slate-850 pb-2.5">
                <Sparkles className="w-4 h-4 text-[#E86B21]" />
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  {language === 'mr' ? 'याचे महत्त्व काय? (भौगोलिक, सांस्कृतिक व इतिहास)' : 'Why It Matters (Geography, Culture & History)'}
                </h4>
              </div>

              <div className="space-y-4">
                {/* Geography */}
                {selectedCircuit.geography && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Compass className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span className="text-[10px] font-black text-slate-200 uppercase tracking-wider">
                        {language === 'mr' ? 'भौगोलिक वैशिष्ट्ये' : 'Geographical Significance'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium pl-5.5">
                      {language === 'mr' ? selectedCircuit.geographyMr : selectedCircuit.geography}
                    </p>
                  </div>
                )}

                {/* Culture */}
                {selectedCircuit.culture && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-3.5 h-3.5 text-pink-400 shrink-0" />
                      <span className="text-[10px] font-black text-slate-200 uppercase tracking-wider">
                        {language === 'mr' ? 'सांस्कृतिक वारसा' : 'Cultural Heritage'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium pl-5.5">
                      {language === 'mr' ? selectedCircuit.cultureMr : selectedCircuit.culture}
                    </p>
                  </div>
                )}

                {/* History */}
                {selectedCircuit.history && (
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Landmark className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span className="text-[10px] font-black text-slate-200 uppercase tracking-wider">
                        {language === 'mr' ? 'ऐतिहासिक महत्त्व' : 'Historical Importance'}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-300 leading-relaxed font-medium pl-5.5">
                      {language === 'mr' ? selectedCircuit.historyMr : selectedCircuit.history}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Destinations inside Circuit */}
            <div className="space-y-3.5">
              <h3 className="text-xs font-black text-slate-450 uppercase tracking-widest pl-1">
                {language === 'mr' ? 'समाविष्ट असलेली पर्यटन शहरे' : 'Destinations in this Circuit'}
              </h3>

              <div className="space-y-3">
                {selectedCircuit.destinations.map(destId => {
                  const dest = destinationsList.find(d => d.id === destId);
                  if (!dest) return null;
                  const isCheckedIn = profile.checkedInDestinations.includes(dest.id);
                  const spotCount = dest.touristSpots?.length || 0;

                  return (
                    <div
                      key={dest.id}
                      onClick={() => setSelectedDest(dest)}
                      className="bg-slate-900/40 border border-slate-850 hover:border-slate-750 rounded-2xl overflow-hidden flex cursor-pointer transition-all active:scale-[0.99] group"
                    >
                      <div className="w-28 h-28 relative overflow-hidden shrink-0">
                        <img src={dest.imageUrl} className="w-full h-full object-cover group-hover:scale-105 transition duration-500" alt="" />
                        {isCheckedIn && (
                          <div className="absolute top-2 left-2 bg-black/60 backdrop-blur-md text-[11px] px-1.5 py-0.5 rounded-full border border-emerald-500/30">
                            🎯
                          </div>
                        )}
                      </div>
                      
                      <div className="p-3.5 flex-1 flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-start gap-1">
                            <h4 className="text-xs font-extrabold text-white line-clamp-1">
                              {language === 'mr' ? dest.nameMr : dest.name}
                            </h4>
                            <span className="text-[8px] font-black bg-slate-950 text-slate-450 border border-slate-850 px-1.5 py-0.5 rounded uppercase tracking-wider shrink-0">
                              {spotCount} {language === 'mr' ? 'स्थळे' : 'Spots'}
                            </span>
                          </div>
                          
                          <p className="text-[9px] text-slate-400 flex items-center gap-1 mt-1 font-semibold">
                            <MapPin className="w-3 h-3 text-[#E86B21]" />
                            <span>{dest.district} District</span>
                          </p>
                          
                          <p className="text-[10px] text-slate-350 line-clamp-2 mt-1.5 leading-normal">
                            {language === 'mr' ? dest.descriptionMr : dest.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}

        {/* VIEW 3: Destination details & Tourist Spots */}
        {selectedDest && !selectedSpot && (
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Header back & navigation */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBackToCircuit}
                className="flex items-center gap-2 text-xs font-bold text-[#E86B21] bg-[#E86B21]/5 border border-[#E86B21]/10 px-3 py-1.5 rounded-xl hover:bg-[#E86B21]/10 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{selectedCircuit ? (language === 'mr' ? 'मागे जा' : 'Circuit List') : (language === 'mr' ? 'सर्व सर्किट्स' : 'All Circuits')}</span>
              </button>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                LEVEL 3 OF 4
              </span>
            </div>

            {/* Cover Banner */}
            <div className="relative h-44 rounded-2xl overflow-hidden border border-slate-900 shadow-md">
              <img src={selectedDest.imageUrl} className="w-full h-full object-cover" alt="" />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
              <div className="absolute bottom-3 left-3.5 right-3.5">
                <h3 className="text-lg font-black text-white drop-shadow-md leading-tight">
                  {language === 'mr' ? selectedDest.nameMr : selectedDest.name}
                </h3>
                <p className="text-xs text-slate-200 drop-shadow-md mt-1 flex items-center gap-1.5 font-medium">
                  <MapPin className="w-4 h-4 text-[#E86B21]" />
                  <span>{selectedDest.district} District • Radius: {selectedDest.geofenceRadius}m</span>
                </p>
              </div>
              
              {profile.checkedInDestinations.includes(selectedDest.id) && (
                <div className="absolute top-3 right-3 bg-[#E86B21]/90 text-white font-extrabold text-[9px] uppercase tracking-wider px-2.5 py-1 rounded-full backdrop-blur shadow flex items-center gap-1">
                  <span>UNLOCKED</span>
                  <span>{selectedDest.stampMotif}</span>
                </div>
              )}
            </div>

            {/* Interactive Experience Hub */}
            <DestinationInteractiveHub
              destination={selectedDest}
              profile={profile}
              language={language}
              onNavigateToQuiz={onNavigateToQuiz}
            />

            {/* Tabbed Info */}
            <div className="bg-slate-900/30 border border-slate-850 rounded-2xl p-4">
              <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-900 mb-3 gap-1">
                {(['history', 'culture', 'food'] as const).map(section => (
                  <button
                    key={section}
                    onClick={() => setActiveSection(section)}
                    className={`flex-1 py-1.5 rounded-lg text-[10px] uppercase font-black tracking-wider transition ${activeSection === section ? 'bg-[#E86B21]/15 text-[#E86B21] border border-[#E86B21]/25' : 'text-slate-450 hover:text-slate-200'}`}
                  >
                    {section}
                  </button>
                ))}
              </div>

              <p className="text-xs text-slate-300 leading-relaxed font-medium min-h-[70px]">
                {activeSection === 'history' && (language === 'mr' ? selectedDest.historyMr : selectedDest.history)}
                {activeSection === 'culture' && (language === 'mr' ? selectedDest.cultureMr : selectedDest.culture)}
                {activeSection === 'food' && (language === 'mr' ? selectedDest.foodMr : selectedDest.food)}
              </p>
            </div>

            {/* Tourist spots list */}
            <div className="space-y-3">
              <div className="flex items-center gap-1.5 pl-1">
                <Compass className="w-4 h-4 text-[#E86B21]" />
                <h4 className="text-xs font-black text-white uppercase tracking-wider">
                  {language === 'mr' ? 'प्रेक्षणीय स्थळे (माहिती व चेक-इनसाठी क्लिक करा)' : 'Tourist Spots (Click for Info & Check-In)'}
                </h4>
              </div>

              <div className="grid grid-cols-1 gap-2.5">
                {selectedDest.touristSpots && selectedDest.touristSpots.length > 0 ? (
                  selectedDest.touristSpots.map((spot, i) => (
                    <div
                      key={i}
                      onClick={() => setSelectedSpot(spot)}
                      className="bg-slate-900/50 border border-slate-850 hover:border-slate-700/80 p-3.5 rounded-xl cursor-pointer transition active:scale-[0.99] flex items-center justify-between gap-4 group"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h5 className="text-xs font-black text-white">
                            {language === 'mr' && spot.nameMr ? spot.nameMr : spot.name}
                          </h5>
                          <span className="text-[8px] font-black bg-slate-950 text-slate-450 border border-slate-850 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {language === 'mr' && spot.categoryMr ? spot.categoryMr : spot.category}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 line-clamp-1 mt-1 leading-normal font-medium">
                          {language === 'mr' && spot.shortDescriptionMr ? spot.shortDescriptionMr : spot.shortDescription}
                        </p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-[#E86B21] transition-colors shrink-0" />
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4 bg-slate-900/10 border border-dashed border-slate-850 rounded-xl">
                    <p className="text-[10px] text-slate-550 italic font-medium">
                      {language === 'mr' ? 'या ठिकाणी स्वतंत्र प्रेक्षणीय स्थळे जोडलेली नाहीत.' : 'No dedicated tourist spots added yet.'}
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Travel Logistics Plan */}
            <div className="grid grid-cols-1 gap-3">
              {/* Best Time */}
              {(selectedDest.bestTime || selectedDest.bestTimeMr) && (
                <div className="bg-slate-900/30 border border-slate-850 rounded-xl p-3.5">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-[#E86B21]" />
                    <span>{language === 'mr' ? 'जाण्यासाठी सर्वोत्तम वेळ' : 'Best Time to Visit'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-350 leading-relaxed font-medium">
                    {language === 'mr' ? selectedDest.bestTimeMr : selectedDest.bestTime}
                  </p>
                </div>
              )}

              {/* How to reach */}
              {(selectedDest.howToReach || selectedDest.howToReachMr) && (
                <div className="bg-slate-900/30 border border-slate-850 rounded-xl p-3.5">
                  <h4 className="text-[10px] font-bold text-white uppercase tracking-wider mb-1 flex items-center gap-1.5">
                    <Car className="w-3.5 h-3.5 text-[#E86B21]" />
                    <span>{language === 'mr' ? 'कसे पोहोचायचे' : 'How to Reach'}</span>
                  </h4>
                  <p className="text-[11px] text-slate-350 leading-relaxed font-medium">
                    {language === 'mr' ? selectedDest.howToReachMr : selectedDest.howToReach}
                  </p>
                </div>
              )}
            </div>

            {/* Travel Tips Advisory */}
            {(selectedDest.travelTips || selectedDest.travelTipsMr) && (
              <div className="bg-[#E86B21]/5 border border-[#E86B21]/15 rounded-xl p-3.5">
                <h4 className="text-[10px] font-bold text-[#E86B21] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                  <AlertTriangle className="w-3.5 h-3.5 text-[#E86B21]" />
                  <span>{language === 'mr' ? 'महत्वाच्या टिप्स आणि सल्ला' : 'Important Travel Advisory'}</span>
                </h4>
                <p className="text-[11px] text-slate-300 leading-relaxed font-medium">
                  {language === 'mr' ? selectedDest.travelTipsMr : selectedDest.travelTips}
                </p>
              </div>
            )}
          </motion.div>
        )}

        {/* VIEW 4: Tourist Spot Details Page */}
        {selectedSpot && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {/* Header Back Button */}
            <div className="flex items-center justify-between">
              <button 
                onClick={handleBackToDest}
                className="flex items-center gap-2 text-xs font-bold text-[#E86B21] bg-[#E86B21]/5 border border-[#E86B21]/10 px-3 py-1.5 rounded-xl hover:bg-[#E86B21]/10 transition"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>{language === 'mr' ? 'मागे जा' : 'Back to Destination'}</span>
              </button>
              <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">
                LEVEL 4 OF 4
              </span>
            </div>

            {/* Interactive category-themed card banner */}
            {(() => {
              const category = (selectedSpot.category || '').toLowerCase();
              let bgGradient = 'from-emerald-950 to-teal-900 border-emerald-500/15';
              let spotEmoji = '⛰️';
              let themeColor = 'text-emerald-400';
              let advisoryTip = '📍 Pro Tip: Early morning visits offer the best climate and avoid weekend crowds.';

              if (category.includes('fort') || category.includes('heritage')) {
                bgGradient = 'from-slate-950 to-amber-950 border-amber-500/15';
                spotEmoji = '🏰';
                themeColor = 'text-amber-400';
                advisoryTip = language === 'mr' 
                  ? '⚠️ प्रो टिप: किल्ल्यांवर चढाई करावी लागते. प्रवासासाठी बळकट पादत्राणे वापरा आणि सोबत पुरेशा प्रमाणात पिण्याचे पाणी नक्की बाळगा.'
                  : '⚠️ Pro Tip: Forts require steep climbs. We highly recommend wearing sturdy, non-slip footwear and carrying adequate drinking water.';
              } else if (category.includes('beach') || category.includes('coastal')) {
                bgGradient = 'from-sky-950 to-blue-900 border-sky-500/15';
                spotEmoji = '🏖️';
                themeColor = 'text-sky-400';
                advisoryTip = language === 'mr'
                  ? '🌊 प्रो टिप: समुद्राच्या भरती-ओहोटीचे वेळापत्रक तपासा. स्थानिक सुरक्षा रक्षक नसल्यास समुद्रात उतरणे टाळा.'
                  : '🌊 Pro Tip: Monitor tidal waves. Avoid entering deep sea water unless authorized lifeguards are present.';
              } else if (category.includes('temple') || category.includes('pilgrimage') || category.includes('shrine')) {
                bgGradient = 'from-amber-950 to-orange-900 border-orange-500/15';
                spotEmoji = '🛕';
                themeColor = 'text-orange-400';
                advisoryTip = language === 'mr'
                  ? '🛕 प्रो टिप: मंदिराचा आदर राखा. शांतता पाळा आणि गर्भगृहाच्या आत छायाचित्रण बंदीचे नियम पाळा.'
                  : '🛕 Pro Tip: Dress respectfully. Maintain serene silence inside the inner sanctum and obey restricted photography norms.';
              } else if (category.includes('waterfall')) {
                bgGradient = 'from-cyan-950 to-indigo-950 border-cyan-500/15';
                spotEmoji = '💧';
                themeColor = 'text-cyan-400';
                advisoryTip = language === 'mr'
                  ? '🌊 प्रो टिप: पावसाळ्यात धबधबे निसरडे होतात. पायऱ्यांवर जपून चाला आणि खोल डोहात पोहणे टाळा.'
                  : '🌊 Pro Tip: Waterfalls get highly slippery during monsoons. Maintain distance from rocky edges and avoid diving into unmeasured pools.';
              } else if (category.includes('adventure') || category.includes('sports')) {
                bgGradient = 'from-violet-950 to-fuchsia-950 border-violet-500/15';
                spotEmoji = '🧗‍♂️';
                themeColor = 'text-violet-400';
                advisoryTip = language === 'mr'
                  ? '🧗‍♂️ प्रो टिप: सर्व साहसी उपक्रम केवळ प्रमाणित ट्रेनरच्या मार्गदर्शनाखालीच पूर्ण करा.'
                  : '🧗‍♂️ Pro Tip: Always utilize certified guides and standardized safety equipment for parasailing, trekking, and water sports.';
              } else if (category.includes('wildlife') || category.includes('safari') || category.includes('nature')) {
                bgGradient = 'from-emerald-950 to-green-900 border-green-500/15';
                spotEmoji = '🐅';
                themeColor = 'text-green-400';
                advisoryTip = language === 'mr'
                  ? '🌲 प्रो टिप: शांतता राखा. प्राण्यांना खाद्य देणे किंवा जंगलात कचरा टाकणे सक्त गुन्हा आहे.'
                  : '🌲 Pro Tip: Maintain total silence to watch wildlife in their natural habitat. Feeding animals or littering is heavily penalized.';
              }

              return (
                <div className="space-y-4">
                  {/* Themed Visual Panel */}
                  <div className={`bg-gradient-to-br ${bgGradient} border p-6 rounded-2xl flex flex-col items-center text-center gap-3 shadow-md relative`}>
                    <div className="w-16 h-16 rounded-full bg-slate-950/40 backdrop-blur-md flex items-center justify-center text-3xl shadow">
                      {spotEmoji}
                    </div>
                    <div>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2.5 py-0.5 bg-black/40 rounded-full border border-slate-800 ${themeColor}`}>
                        {language === 'mr' && selectedSpot.categoryMr ? selectedSpot.categoryMr : selectedSpot.category}
                      </span>
                      <h3 className="text-lg font-black text-white mt-2 leading-snug">
                        {language === 'mr' && selectedSpot.nameMr ? selectedSpot.nameMr : selectedSpot.name}
                      </h3>
                      <p className="text-[11px] text-slate-400 mt-0.5">
                        {language === 'mr' ? `प्रेक्षणीय स्थळ • ${selectedDest.nameMr}` : `Sightseeing spot • ${selectedDest.name}`}
                      </p>
                    </div>
                  </div>

                  {/* Spot Description */}
                  <div className="bg-slate-900/40 border border-slate-850 p-5 rounded-2xl space-y-3">
                    <h4 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-[#E86B21]" />
                      <span>{language === 'mr' ? 'स्थळाविषयी माहिती' : 'About the Attraction'}</span>
                    </h4>
                    <p className="text-xs text-slate-300 leading-relaxed font-medium">
                      {language === 'mr' && selectedSpot.shortDescriptionMr ? selectedSpot.shortDescriptionMr : selectedSpot.shortDescription}
                    </p>
                  </div>

                  {/* GPS Check-In Action inside Tourist Spot details */}
                  <div className="grid grid-cols-1">
                    <button
                      onClick={() => onNavigateToMap(selectedDest.id)}
                      className="w-full bg-[#E86B21] hover:bg-[#C45512] text-white font-extrabold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer shadow-sm uppercase tracking-wider"
                    >
                      <MapPin className="w-4 h-4" />
                      <span>{language === 'mr' ? 'जीपीएस चेक-इन' : 'GPS Check-In'}</span>
                    </button>
                  </div>

                  {/* Dynamic advisory tip */}
                  <div className="bg-slate-900/30 border border-slate-850 p-4 rounded-xl flex items-start gap-3">
                    <div className="text-base leading-none pt-0.5">💡</div>
                    <p className="text-[11px] text-slate-350 leading-relaxed font-medium italic">
                      {advisoryTip}
                    </p>
                  </div>
                </div>
              );
            })()}
          </motion.div>
        )}

      </div>
    </div>
  );
}
