import React, { useState } from 'react';
import { Destination, UserProfile } from '../types';
import { DESTINATIONS } from '../data';
import { MapPin, Compass, Navigation, RefreshCw, CheckCircle, Smartphone, Eye, Award } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface MapTabProps {
  profile: UserProfile;
  language: 'en' | 'mr';
  onCheckInSuccess: (destinationId: string, xpEarned: number) => void;
  selectedDestinationId: string | null;
  userLat: number;
  userLng: number;
  onUpdateLocation: (lat: number, lng: number) => void;
  destinations?: Destination[];
}

export default function MapTab({ 
  profile, 
  language, 
  onCheckInSuccess, 
  selectedDestinationId,
  userLat,
  userLng,
  onUpdateLocation,
  destinations
}: MapTabProps) {
  const destinationsList = destinations || DESTINATIONS;

  const [selectedDest, setSelectedDest] = useState<Destination | null>(
    selectedDestinationId ? (destinationsList.find(d => d.id === selectedDestinationId) || null) : null
  );

  const [isSimulatingLocation, setIsSimulatingLocation] = useState(false);
  const [checkInResult, setCheckInResult] = useState<'success' | 'out_of_geofence' | 'loading' | null>(null);
  const [distanceRemaining, setDistanceRemaining] = useState<number | null>(null);
  const [showTrail, setShowTrail] = useState(true);

  // Real GPS sync state
  const [gpsStatus, setGpsStatus] = useState<{ type: 'idle' | 'fetching' | 'success' | 'error'; message: string | null }>({ type: 'idle', message: null });

  const handleSyncRealGps = () => {
    if (!navigator.geolocation) {
      setGpsStatus({
        type: 'error',
        message: language === 'mr' ? 'तुमच्या ब्राउझरमध्ये जिओलोकेशन सपोर्ट नाही.' : 'Geolocation is not supported by your browser.'
      });
      return;
    }

    setGpsStatus({
      type: 'fetching',
      message: language === 'mr' ? 'उपग्रहाशी संपर्क जोडत आहे...' : 'Retrieving physical satellite coordinates...'
    });

    navigator.geolocation.getCurrentPosition(
      (position) => {
        onUpdateLocation(position.coords.latitude, position.coords.longitude);
        setGpsStatus({
          type: 'success',
          message: language === 'mr' 
            ? `यशस्वीरित्या सिंक केले! अक्षांश: ${position.coords.latitude.toFixed(4)}, रेखांश: ${position.coords.longitude.toFixed(4)}`
            : `Successfully synced! Lat: ${position.coords.latitude.toFixed(4)}, Lng: ${position.coords.longitude.toFixed(4)}`
        });
      },
      (error) => {
        let msg = language === 'mr' ? 'स्थान मिळवण्यात अडचण आली.' : 'Could not fetch device location.';
        if (error.code === error.PERMISSION_DENIED) {
          msg = language === 'mr'
            ? 'परवानगी नाकारली. कृपया तुमच्या ब्राउझर सेटिंग्जमध्ये स्थान परवानगी सक्षम करा आणि HTTPS वापरा.'
            : 'Permission denied. Please enable location permissions in browser settings & ensure you are using HTTPS (secure connection).';
        } else if (error.code === error.POSITION_UNAVAILABLE) {
          msg = language === 'mr' ? 'स्थान अनुपलब्ध आहे.' : 'Device location is currently unavailable.';
        } else if (error.code === error.TIMEOUT) {
          msg = language === 'mr' ? 'वेळ संपली.' : 'Request timed out.';
        }
        setGpsStatus({ type: 'error', message: msg });
      },
      { enableHighAccuracy: true, timeout: 12000, maximumAge: 0 }
    );
  };

  // Journey trail map destinations
  const visitedDestIds = profile.checkedInDestinations || [];

  const visitedCoords = visitedDestIds
    .map(id => destinationsList.find(d => d.id === id))
    .filter((d): d is Destination => !!d)
    .map(d => ({
      cx: 80 + (d.lng - 72.5) * 45,
      cy: 240 - (d.lat - 17.5) * 45,
      name: d.name,
      nameMr: d.nameMr,
      stamp: d.stampMotif,
      id: d.id
    }));

  const calculateTotalTrailDistance = () => {
    if (visitedCoords.length < 2) return 0;
    let total = 0;
    for (let i = 0; i < visitedCoords.length - 1; i++) {
      const d1 = destinationsList.find(d => d.id === visitedDestIds[i]);
      const d2 = destinationsList.find(d => d.id === visitedDestIds[i + 1]);
      if (d1 && d2) {
        total += calculateDistance(d1.lat, d1.lng, d2.lat, d2.lng);
      }
    }
    return Math.round(total / 1000);
  };

  // QR Scan simulated states
  const [isQrScannerOpen, setIsQrScannerOpen] = useState(false);

  // Haversine formula to compute actual distance in meters between user and destination
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // Earth radius in meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    return R * c; // Distance in meters
  };

  const handleSelectDest = (dest: Destination) => {
    setSelectedDest(dest);
    setCheckInResult(null);
    setDistanceRemaining(null);
  };

  // Simulated Teleport (Simulates walking/travelling to the destination, matching UC-02)
  const handleTeleportToDest = (dest: Destination) => {
    setIsSimulatingLocation(true);
    setTimeout(() => {
      // Offset slightly to simulate high accuracy GPS
      onUpdateLocation(dest.lat + 0.0003, dest.lng - 0.0002);
      setIsSimulatingLocation(false);
      setCheckInResult(null);
    }, 800);
  };

  const handleResetLocation = () => {
    onUpdateLocation(18.5204, 73.8567); // Reset back to Pune center
    setCheckInResult(null);
    setDistanceRemaining(null);
  };

  // Simulating the actual GPS check-in action
  const triggerCheckIn = () => {
    if (!selectedDest) return;
    setCheckInResult('loading');

    // Calculate actual simulated distance
    const dist = calculateDistance(userLat, userLng, selectedDest.lat, selectedDest.lng);
    setDistanceRemaining(Math.round(dist));

    setTimeout(() => {
      if (dist <= selectedDest.geofenceRadius) {
        setCheckInResult('success');
        onCheckInSuccess(selectedDest.id, 100); // Earn 100 XP
      } else {
        setCheckInResult('out_of_geofence');
      }
    }, 1200);
  };

  const triggerQrCheckIn = () => {
    if (!selectedDest) return;
    setIsQrScannerOpen(true);
    setTimeout(() => {
      setIsQrScannerOpen(false);
      setCheckInResult('success');
      onCheckInSuccess(selectedDest.id, 100);
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent text-slate-100 overflow-hidden relative">
      {/* Upper Map Screen - Gorgeous simulated vector map of Maharashtra */}
      <div className="h-64 w-full bg-[#13110E] relative border-b border-[#2A241C] overflow-hidden flex items-center justify-center">
        {/* Animated Background Mesh Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)] bg-[size:16px_16px] opacity-40"></div>
        <div className="absolute inset-0 bg-radial-gradient from-transparent via-slate-950/80 to-slate-950"></div>

        {/* Dynamic Glowing Dots & Stylized Maharashtra District Boundaries */}
        <svg viewBox="0 0 400 300" className="w-full h-full p-6 text-slate-600">
          <defs>
            <linearGradient id="trailGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34d399" />
              <stop offset="50%" stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#3b82f6" />
            </linearGradient>
            <filter id="trailGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          {/* Schematic State Boundaries */}
          <path
            d="M 50 150 Q 80 80 120 70 T 220 50 T 320 80 T 370 140 T 300 240 T 150 250 T 50 180 Z"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeDasharray="4 4"
            className="text-slate-800 animate-pulse"
          />

          {/* VISITED JOURNEY TRAIL */}
          {showTrail && visitedCoords.length >= 2 && (
            <>
              {/* Thick Glowing Underlay Trail Line */}
              <path
                d={visitedCoords.map((coord, idx) => `${idx === 0 ? 'M' : 'L'} ${coord.cx} ${coord.cy}`).join(' ')}
                fill="none"
                stroke="#10b981"
                strokeWidth="5"
                strokeLinecap="round"
                strokeLinejoin="round"
                opacity="0.18"
                style={{ filter: 'url(#trailGlow)' }}
              />
              {/* Sharp Animated Overlay Trail Line */}
              <path
                d={visitedCoords.map((coord, idx) => `${idx === 0 ? 'M' : 'L'} ${coord.cx} ${coord.cy}`).join(' ')}
                fill="none"
                stroke="url(#trailGradient)"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeDasharray="6 4"
                className="animate-dash-flow"
              />
            </>
          )}

          {/* Planning/prospect line from last visited to selected but not visited destination */}
          {showTrail && visitedCoords.length > 0 && selectedDest && !profile.checkedInDestinations.includes(selectedDest.id) && (
            <line
              x1={visitedCoords[visitedCoords.length - 1].cx}
              y1={visitedCoords[visitedCoords.length - 1].cy}
              x2={80 + (selectedDest.lng - 72.5) * 45}
              y2={240 - (selectedDest.lat - 17.5) * 45}
              stroke="#f59e0b"
              strokeWidth="1.5"
              strokeDasharray="3 3"
              opacity="0.8"
            />
          )}

          {/* User simulated position */}
          <g>
            {/* Find matching coordinates mapping */}
            <circle
              cx={80 + (userLng - 72.5) * 45}
              cy={240 - (userLat - 17.5) * 45}
              r="7"
              className="fill-cyan-400 stroke-slate-950 stroke-2 animate-bounce"
            />
            <circle
              cx={80 + (userLng - 72.5) * 45}
              cy={240 - (userLat - 17.5) * 45}
              r="18"
              className="fill-cyan-400/20 stroke-cyan-400/40 stroke-1 animate-ping"
            />
          </g>

          {/* Glowing Pins representing destination coordinates */}
          {destinationsList.map(dest => {
            // Map GPS coordinates into SVG space roughly
            const cx = 80 + (dest.lng - 72.5) * 45;
            const cy = 240 - (dest.lat - 17.5) * 45;
            const isSelected = selectedDest?.id === dest.id;
            const isVisited = profile.checkedInDestinations.includes(dest.id);
            const visitIndex = visitedDestIds.indexOf(dest.id);

            return (
              <g 
                key={dest.id} 
                onClick={() => handleSelectDest(dest)} 
                className="cursor-pointer group"
              >
                {/* Glow ring */}
                <circle
                  cx={cx}
                  cy={cy}
                  r={isSelected ? "14" : "10"}
                  className={`transition-all duration-300 ${isSelected ? 'fill-amber-500/20 stroke-amber-500/30' : 'fill-slate-800/20 stroke-slate-800/10 group-hover:fill-amber-500/10'}`}
                />
                {/* Inner pin */}
                <circle
                  cx={cx}
                  cy={cy}
                  r="5"
                  className={`transition-all duration-300 ${isVisited ? 'fill-emerald-400' : isSelected ? 'fill-amber-500' : 'fill-slate-500 group-hover:fill-amber-400'}`}
                />
                
                {/* Sequenced index marker overlay */}
                {isVisited && visitIndex !== -1 && (
                  <g>
                    <circle
                      cx={cx + 6}
                      cy={cy - 6}
                      r="4.5"
                      className="fill-emerald-500 stroke-slate-950 stroke-[0.5]"
                    />
                    <text
                      x={cx + 6}
                      y={cy - 4.5}
                      textAnchor="middle"
                      className="fill-slate-950 font-sans text-[5.5px] font-black"
                    >
                      {visitIndex + 1}
                    </text>
                  </g>
                )}
              </g>
            );
          })}
        </svg>

        {/* Compass Widget */}
        <div className="absolute top-3 left-3 bg-slate-950/60 border border-slate-800/80 backdrop-blur-md px-2 py-1.5 rounded-xl flex items-center gap-1.5 z-10 text-[9px] font-semibold text-slate-300">
          <Compass className="w-3.5 h-3.5 text-amber-500 animate-spin" style={{ animationDuration: '8s' }} />
          <span>WESTERN GHATS</span>
        </div>

        {/* Live GPS Coords of user */}
        <div className="absolute top-3 right-3 bg-slate-950/60 border border-slate-800/80 backdrop-blur-md px-2.5 py-1.5 rounded-xl text-right z-10 text-[8px] font-mono text-cyan-400">
          <div>LAT: {userLat.toFixed(4)}° N</div>
          <div>LNG: {userLng.toFixed(4)}° E</div>
        </div>
      </div>

      {/* Action Drawer & Verification Simulation Panel */}
      <div className="flex-1 overflow-y-auto px-4 py-3 pb-8">
        <style>{`
          @keyframes dash {
            to {
              stroke-dashoffset: -20;
            }
          }
          .animate-dash-flow {
            animation: dash 3s linear infinite;
          }
        `}</style>
        {!selectedDest ? (
          <div className="space-y-4">
            <div className="text-center py-6">
              <Navigation className="w-10 h-10 text-slate-600 mx-auto mb-2 animate-pulse" />
              <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-1">
                {language === 'mr' ? 'नकाशावरील पिन निवडा' : 'Select a Destination Pin'}
              </h3>
              <p className="text-[11px] text-slate-400 max-w-[240px] mx-auto leading-relaxed">
                {language === 'mr' ? 'प्रेक्षणीय स्थळाची माहिती पाहण्यासाठी आणि पासपोर्टवर शिक्का मिळवण्यासाठी नकाशावरील कोणत्याही बिंदूवर टॅप करा.' : 'Tap any glowing pin on the map to explore its GPS check-in parameters and claim your Digital Stamp.'}
              </p>
            </div>

            {/* Travel Trail Summary / Journey Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 text-left space-y-4">
              <div className="flex justify-between items-center pb-2 border-b border-slate-850">
                <div className="flex items-center gap-2">
                  <Compass className="w-4 h-4 text-emerald-400 animate-spin" style={{ animationDuration: '12s' }} />
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    {language === 'mr' ? 'तुमचा प्रवास महामार्ग' : 'Your Travel Trail'}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-[9px] text-slate-400 font-semibold">
                    {language === 'mr' ? 'नकाशावर दाखवा' : 'Show Trail'}
                  </span>
                  <button
                    onClick={() => setShowTrail(!showTrail)}
                    className={`w-8 h-4 rounded-full transition-colors relative ${showTrail ? 'bg-emerald-500' : 'bg-slate-700'}`}
                  >
                    <div className={`w-3 h-3 bg-white rounded-full absolute top-0.5 transition-transform ${showTrail ? 'translate-x-4.5' : 'translate-x-0.5'}`} />
                  </button>
                </div>
              </div>

              {visitedCoords.length === 0 ? (
                <div className="py-4 text-center">
                  <p className="text-[11px] text-slate-400 leading-normal">
                    {language === 'mr' ? 'अद्याप कोणताही प्रवास सुरू केलेला नाही. पहिला शिक्का मिळवण्यासाठी कोणत्याही स्थळावर टॅप करा!' : 'No check-ins logged yet. Warp to any destination and verify your GPS location to begin carving your visual travel trail!'}
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Trail Quick Metrics */}
                  <div className="grid grid-cols-2 gap-2 text-center">
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <span className="block text-[8px] text-slate-400 uppercase font-bold mb-0.5">
                        {language === 'mr' ? 'एकूण जोडलेले थांबे' : 'Visited Waypoints'}
                      </span>
                      <span className="text-xs font-black text-white flex items-center justify-center gap-1">
                        <CheckCircle className="w-3 h-3 text-emerald-400" />
                        {visitedCoords.length} / {destinationsList.length}
                      </span>
                    </div>
                    <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                      <span className="block text-[8px] text-slate-400 uppercase font-bold mb-0.5">
                        {language === 'mr' ? 'सफर अंतर' : 'Trail Length'}
                      </span>
                      <span className="text-xs font-black text-cyan-400">
                        ~{calculateTotalTrailDistance()} km
                      </span>
                    </div>
                  </div>

                  {/* Interactive timeline visualization */}
                  <div className="space-y-2 pl-1 pt-1">
                    <span className="text-[8px] font-black tracking-wider text-slate-400 uppercase block">
                      {language === 'mr' ? 'प्रवास कालानुक्रम' : 'Journey Order Timeline'}
                    </span>
                    <div className="relative border-l-2 border-emerald-500/30 ml-2 space-y-4 py-1">
                      {visitedCoords.map((coord, idx) => {
                        const isLast = idx === visitedCoords.length - 1;
                        return (
                          <div
                            key={coord.id}
                            className="relative pl-6 group cursor-pointer"
                            onClick={() => {
                              const dest = destinationsList.find(d => d.id === coord.id);
                              if (dest) handleSelectDest(dest);
                            }}
                          >
                            {/* Sequence dot indicator */}
                            <span className="absolute -left-1.5 top-1.5 w-3 h-3 bg-slate-950 border-2 border-emerald-400 rounded-full flex items-center justify-center text-[7px] font-black text-emerald-400 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                              {idx + 1}
                            </span>
                            <div className="flex items-center gap-2">
                              <span className="text-sm">{coord.stamp}</span>
                              <div>
                                <h4 className="text-[10px] font-bold text-white group-hover:text-emerald-400 transition-colors">
                                  {language === 'mr' ? coord.nameMr : coord.name}
                                </h4>
                                {isLast && (
                                  <span className="text-[7px] bg-emerald-500/10 text-emerald-400 px-1 py-0.2 rounded font-semibold inline-block">
                                    {language === 'mr' ? 'चालू स्थान' : 'Latest Stamp'}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {/* Mini destination card */}
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-3 flex gap-3 relative">
              <img src={selectedDest.imageUrl} className="w-16 h-16 rounded-xl object-cover" alt="" />
              <div className="flex-1 min-w-0">
                <span className="text-[8px] uppercase tracking-wider font-bold bg-amber-500/10 text-amber-400 px-2 py-0.5 rounded-md">
                  {selectedDest.category}
                </span>
                <h4 className="text-xs font-bold text-white mt-1.5 truncate">
                  {language === 'mr' ? selectedDest.nameMr : selectedDest.name}
                </h4>
                <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3 h-3 text-amber-500" />
                  <span>{selectedDest.district} District</span>
                </p>
              </div>
            </div>

            {/* Simulated Distance Information */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-xl p-3.5 space-y-3">
              <div className="flex justify-between items-center text-xs gap-2 flex-wrap">
                <span className="text-slate-400 font-semibold uppercase tracking-wider text-[10px]">GPS Verification Status</span>
                <div className="flex gap-1.5">
                  <button 
                    onClick={handleSyncRealGps} 
                    className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/20 transition flex items-center gap-1 text-[9px] font-bold"
                    title="Prompts browser for actual coordinates. Requires HTTPS."
                  >
                    <Smartphone className="w-3 h-3 text-cyan-400" />
                    <span>Sync Real GPS</span>
                  </button>
                  <button 
                    onClick={handleResetLocation} 
                    className="p-1.5 rounded-lg bg-slate-800/50 hover:bg-slate-800 text-slate-400 hover:text-white transition flex items-center gap-1 text-[9px] font-bold"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>Reset GPS</span>
                  </button>
                </div>
              </div>

              {/* Real-time GPS sync telemetry messaging */}
              {gpsStatus.type !== 'idle' && (
                <div className={`p-2.5 rounded-lg text-[9px] border leading-normal ${
                  gpsStatus.type === 'fetching' ? 'bg-cyan-500/5 border-cyan-500/20 text-cyan-300 animate-pulse' :
                  gpsStatus.type === 'success' ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-300' :
                  'bg-rose-500/5 border-rose-500/20 text-rose-300'
                }`}>
                  <div className="font-bold flex items-center gap-1.5 uppercase tracking-wider text-[8px]">
                    <span className={`w-1.5 h-1.5 rounded-full ${
                      gpsStatus.type === 'fetching' ? 'bg-cyan-400 animate-ping' :
                      gpsStatus.type === 'success' ? 'bg-emerald-400' : 'bg-rose-400'
                    }`} />
                    <span>{gpsStatus.type}</span>
                  </div>
                  <p className="mt-1 font-sans text-slate-300 leading-relaxed">{gpsStatus.message}</p>
                </div>
              )}

              {/* simulated distance calculations */}
              <div className="grid grid-cols-2 gap-2 text-center">
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="block text-[8px] text-slate-400 uppercase font-bold mb-0.5">Your Geofence Limit</span>
                  <span className="text-xs font-bold text-white">{selectedDest.geofenceRadius} meters</span>
                </div>
                <div className="bg-slate-950/60 p-2.5 rounded-xl border border-slate-800">
                  <span className="block text-[8px] text-slate-400 uppercase font-bold mb-0.5">Current Distance</span>
                  <span className="text-xs font-bold text-cyan-400">
                    {Math.round(calculateDistance(userLat, userLng, selectedDest.lat, selectedDest.lng) / 1000)} km away
                  </span>
                </div>
              </div>

              {/* Simulation Trigger (Helps demonstrate failure/success scenarios easily, in accordance with UC-02) */}
              <div className="p-3 bg-amber-500/5 border border-amber-500/10 rounded-xl space-y-2">
                <p className="text-[10px] text-slate-300 leading-normal">
                  <span className="text-amber-400 font-bold">Simulator:</span> In a real phone app, you must physically stand at the site. For this web prototype, click <strong className="text-amber-400">Teleport</strong> to simulate walking inside the geofence boundary!
                </p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => handleTeleportToDest(selectedDest)}
                    disabled={isSimulatingLocation}
                    className="bg-slate-800 border border-slate-700 hover:bg-slate-750 disabled:bg-slate-900 text-slate-200 py-1.5 px-3 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 active:scale-95"
                  >
                    {isSimulatingLocation ? 'Travelling...' : '✈️ Teleport to Site'}
                  </button>
                  <button
                    onClick={triggerCheckIn}
                    disabled={checkInResult === 'loading'}
                    className="bg-amber-500 text-slate-950 py-1.5 px-3 rounded-lg text-[10px] font-bold transition flex items-center justify-center gap-1 active:scale-95 shadow-md shadow-amber-950/20"
                  >
                    <Smartphone className="w-3.5 h-3.5" />
                    <span>Verify Location</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Check-In results message */}
            <AnimatePresence mode="wait">
              {checkInResult && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="rounded-xl overflow-hidden"
                >
                   {checkInResult === 'success' && (
                    <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl flex gap-3 items-center">
                      <div className="p-2 bg-emerald-500/20 rounded-full">
                        <CheckCircle className="w-5 h-5 text-emerald-400" />
                      </div>
                      <div>
                        <h4 className="text-xs font-bold text-white">Check-In Successful!</h4>
                        <p className="text-[10px] text-slate-300 mt-0.5">
                          {language === 'mr' ? '१०० एक्सपी आणि डिजिटल शिक्का मिळाला!' : 'You earned +100 XP & a new Passport Stamp!'}
                        </p>
                      </div>
                    </div>
                  )}

                  {checkInResult === 'out_of_geofence' && (
                    <div className="p-3.5 bg-rose-500/10 border border-rose-500/20 rounded-xl flex gap-3 items-start">
                      <div className="p-2 bg-rose-500/20 rounded-full mt-0.5">
                        <Navigation className="w-5 h-5 text-rose-400" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xs font-bold text-white">Outside Geofence Limit</h4>
                        <p className="text-[10px] text-slate-300 mt-1 leading-relaxed">
                          You are currently too far away from {selectedDest.name}. You must be within {selectedDest.geofenceRadius} meters to check-in.
                        </p>
                        <p className="text-[9px] text-amber-400/90 mt-1 font-semibold">
                          💡 Tip: Try clicking "Teleport to Site" above first!
                        </p>
                      </div>
                    </div>
                  )}

                  {checkInResult === 'loading' && (
                    <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl text-center space-y-2">
                      <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                      <p className="text-[10px] text-slate-300">Contacting satellite & matching geofence coordinates...</p>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            {/* QR Plaque Fallback (M10/M19) */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-3 flex justify-between items-center gap-3">
              <div className="space-y-1">
                <h4 className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Award className="w-4 h-4 text-emerald-400" />
                  <span>Monsoon / QR Plaque Fallback</span>
                </h4>
                <p className="text-[9px] text-slate-400 leading-normal max-w-[210px]">
                  If GPS signal is weak in mountain valleys or reserves, scan the physical QR plaque at the site to check-in.
                </p>
              </div>
              <button 
                onClick={triggerQrCheckIn}
                className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 text-[10px] font-bold px-3 py-1.5 rounded-lg active:scale-95 transition whitespace-nowrap"
              >
                Scan QR Code
              </button>
            </div>

            {/* QR Simulation overlay */}
            <AnimatePresence>
              {isQrScannerOpen && (
                <div className="absolute inset-0 bg-slate-950/90 z-50 flex flex-col items-center justify-center p-6 text-center">
                  <div className="w-44 h-44 border-2 border-emerald-400 rounded-3xl relative mb-6 flex items-center justify-center bg-slate-900/50">
                    <div className="absolute inset-x-4 h-0.5 bg-emerald-400 animate-bounce top-1/2"></div>
                    <Smartphone className="w-12 h-12 text-slate-700" />
                  </div>
                  <h4 className="text-sm font-bold text-white mb-2">Scanning QR Plaque</h4>
                  <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
                    Aligning camera with physical plaque installed at {selectedDest.name}...
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </div>
  );
}
