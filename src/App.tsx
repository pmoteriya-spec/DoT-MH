import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import PhoneFrame from './components/PhoneFrame';
import Onboarding from './components/Onboarding';
import DiscoverTab from './components/DiscoverTab';
import MapTab from './components/MapTab';
import QuizTab from './components/QuizTab';
import PassportTab from './components/PassportTab';
import ProfileTab from './components/ProfileTab';
import ServicesTab from './components/ServicesTab';
import StampCelebrationModal from './components/StampCelebrationModal';
import UserAnalyticsPortal from './components/UserAnalyticsPortal';
import OfficialPortal from './components/OfficialPortal';
import MaharashtraLogo from './components/MaharashtraLogo';
import { UserProfile, Challenge, Destination, AppNotification, Circuit, District, Category, CarService, GuideService, ActivityService, Artisan, PermitApplication, Booking, ArtisanRegistration, DriverRegistration, GuideRegistration, Review } from './types';
import { CHALLENGES, DESTINATIONS, CIRCUITS, DISTRICTS, CATEGORIES } from './data';
import { INITIAL_CARS, INITIAL_GUIDES, INITIAL_ACTIVITIES, INITIAL_ARTISANS, INITIAL_PERMIT_APPLICATIONS, INITIAL_BOOKINGS } from './servicesData';
import { 
  Compass, 
  MapPin, 
  Award, 
  BookOpen, 
  User, 
  Star,
  MessageSquare,
  Sparkles, 
  Layers, 
  Car, 
  Tv, 
  TrendingUp, 
  Terminal, 
  Clock, 
  Eye, 
  Heart,
  BarChart3,
  BookMarked,
  Bell,
  BellOff,
  X,
  Info,
  AlertTriangle,
  Check,
  FileText,
  CheckCircle2,
  DollarSign,
  Calendar,
  Zap,
  Target,
  ShieldAlert,
  Users,
  Briefcase,
  Shield
} from 'lucide-react';

const MOCK_TRAVEL_TIPS = [
  {
    title: "💡 Travel Tip: Monsoon Magic",
    body: "Monsoon is the best time to visit Western Ghats. Carry rainproof gear and watch for slippery steps near forts!",
    type: "tip" as const
  },
  {
    title: "💡 Route Advisory: Western Ghats",
    body: "Foggy conditions reported near Amboli Ghat and Lonavala. Reduce speeds and keep hazard lights active.",
    type: "alert" as const
  },
  {
    title: "💡 Wildlife Update: Tadoba Safari",
    body: "Higher tiger sighting probabilities reported in Moharli zone this morning. Best hours: 06:00 to 09:00 AM.",
    type: "tip" as const
  },
  {
    title: "💡 Heritage Fact: Ellora Cave 16",
    body: "The magnificent Kailasa Temple at Ellora Caves was carved top-down from a single rock! It is an engineering marvel.",
    type: "tip" as const
  },
  {
    title: "💡 Local Food Guide",
    body: "Don't miss the steaming hot Wada Pav and spicy Misal Pav near Shaniwar Wada, Pune. Truly authentic flavors!",
    type: "tip" as const
  },
  {
    title: "💡 Ajanta Caves Alert",
    body: "Ajanta Caves are closed to tourists on Mondays. Plan your historical Ajanta-Ellora circuit accordingly!",
    type: "tip" as const
  }
];

const LOCAL_TIPS_DICTIONARY: Record<string, { title: string; body: string; type: 'tip' | 'alert' }[]> = {
  lonavala: [
    { title: "🌧️ Lonavala Weather Warning", body: "Heavy rain and dense fog reported near Amboli Ghat & Tiger Leap. Watch for wet paths!", type: "alert" },
    { title: "🍿 Snack Guide: Lonavala", body: "Savor piping hot Onion Pakodas and sweet peanut chikki near Bhushi Dam!", type: "tip" }
  ],
  mahabaleshwar: [
    { title: "🍓 Strawberry Season: Mahabaleshwar", body: "Mapro Garden is hosting a strawberry carnival! Taste fresh strawberries with rich cream.", type: "tip" },
    { title: "🗺️ Sightseeing Tip: Mahabaleshwar", body: "Early mornings are perfect for breathtaking sunrise views at Arthur's Seat.", type: "tip" }
  ],
  matheran: [
    { title: "🐎 Eco-Sensitive Alert: Matheran", body: "Zero automobiles allowed! Walk or ride horses along the pristine red-clay routes.", type: "alert" },
    { title: "🌅 Charlotte Lake Scenic Tip", body: "Watch the spectacular sunset reflections over Charlotte Lake. Stay clear of cliff edges.", type: "tip" }
  ],
  ajanta: [
    { title: "🎨 Heritage Insight: Ajanta Caves", body: "Admire the ancient frescos in Cave 1 (Padmapani). Pro Tip: Flash photography is forbidden!", type: "tip" },
    { title: "⚠️ Schedule Reminder: Ajanta", body: "Ajanta Caves are closed on Mondays. Plan your ancient tour accordingly!", type: "alert" }
  ],
  ellora: [
    { title: "🧱 Architectural Wonder: Ellora", body: "Cave 16 (Kailasa Temple) was carved top-down from a single rock over 100 years!", type: "tip" },
    { title: "🚶‍♂️ Exploration Tip: Ellora", body: "Wear comfortable walking shoes. Ellora is vast and spans across 34 caves.", type: "tip" }
  ],
  shaniwar_wada: [
    { title: "🏰 Historic Alert: Shaniwar Wada", body: "The Peshwa Light and Sound show starts at 7:15 PM in English & Marathi. Highly recommended!", type: "tip" },
    { title: "🌶️ Pune Street Food Guide", body: "Try legendary bakharwadi from Chitale Bandhu and Mango Mastani shake nearby!", type: "tip" }
  ],
  tadoba: [
    { title: "🐅 Safari Advisory: Tadoba Reserve", body: "Tigress 'Maya' was spotted near Lake zone 10 minutes ago. Maintain silence in open gypsies.", type: "alert" },
    { title: "🌅 Morning Safari Tip", body: "Wild animals are most active during 06:00 AM - 09:00 AM. Keep cameras ready!", type: "tip" }
  ],
  sanjay_gandhi: [
    { title: "🐆 Wildlife Alert: SGNP", body: "Leopard sightings reported near Kanheri Caves path. Remain in designated walking zones.", type: "alert" },
    { title: "🚲 Cycling Trek: Sanjay Gandhi Park", body: "Rent cycles at the main gate to explore the forest paths up to Kanheri Caves!", type: "tip" }
  ],
  melghat: [
    { title: "🦅 Tribal Heritage: Melghat", body: "Discover Korku bamboo crafts. Purchasing local tribal arts directly supports forest families.", type: "tip" },
    { title: "🍂 Jungle Advisory: Satpuras", body: "Melghat features extreme deep ravines. Ensure you travel only with certified forest guides.", type: "alert" }
  ]
};

const PROPOSAL_COST_ITEMS = [
  { id: 'ui', title: 'UI/UX Interactive Design', inr: 1500000, usd: 18000, description: 'Wireframes, custom vector passport stamp motifs, responsive layout' },
  { id: 'apps', title: 'Cross-Platform Apps & Web', inr: 3750000, usd: 45000, description: 'Fully optimized React code, custom map component, Android/iOS deployment wrappers' },
  { id: 'backend', title: 'Robust Backend API Service', inr: 1830000, usd: 22000, description: 'Real-time GPS geofencing microservices, server-side Gemini logic, analytics engine' },
  { id: 'cms', title: 'Real-Time Analytics Dashboard', inr: 1250000, usd: 15000, description: 'Real-time active users tracking, live GPS and Quiz analytics, gamification reports' },
  { id: 'lang', title: 'Multilingual Implementation', inr: 660000, usd: 8000, description: 'Full English/Marathi initial localization, flexible framework for other Indian/intl tongues' },
  { id: 'qa', title: 'QA & GPS Geofence Calibration', inr: 830000, usd: 10000, description: 'Automated test suite, simulated GPS accuracy testing, mobile device optimization' },
  { id: 'deploy', title: 'Deployment & Security Audit', inr: 580000, usd: 7000, description: 'GCP Cloud Run setup, SSL configuration, Government standards penetration testing' },
  { id: 'amc', title: 'Annual Maintenance (AMC / Support)', inr: 1000000, usd: 12000, description: '24/7 server monitoring, performance tuning, minor visual updates & seasonal circuit injection' }
];

export default function App() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState<'discover' | 'services' | 'quiz' | 'passport' | 'profile'>('discover');
  const [selectedDestinationId, setSelectedDestinationId] = useState<string | null>(null);
  const [activeChallenges, setActiveChallenges] = useState<Challenge[]>(CHALLENGES);

  // Dynamic Destinations, Circuits, Districts and Categories states fed from backend JSON DB
  const [destinations, setDestinations] = useState<Destination[]>(DESTINATIONS);
  const [circuits, setCircuits] = useState<Circuit[]>(CIRCUITS);
  const [districts, setDistricts] = useState<District[]>(DISTRICTS);
  const [categories, setCategories] = useState<Category[]>(CATEGORIES);

  // Services, Artisans, Permits & Bookings state
  const [cars, setCars] = useState<CarService[]>(INITIAL_CARS);
  const [guides, setGuides] = useState<GuideService[]>(INITIAL_GUIDES);
  const [activities, setActivities] = useState<ActivityService[]>(INITIAL_ACTIVITIES);
  const [artisans, setArtisans] = useState<Artisan[]>(INITIAL_ARTISANS);
  const [permits, setPermits] = useState<PermitApplication[]>(INITIAL_PERMIT_APPLICATIONS);
  const [bookings, setBookings] = useState<Booking[]>(INITIAL_BOOKINGS);
  const [artisanRegistrations, setArtisanRegistrations] = useState<ArtisanRegistration[]>([
    {
      id: 'MH-ART-2026-1049',
      artisanName: 'Balu Shriram Potdukhe',
      craftType: 'Warli Tribal Art & Murals (Palghar/Dahanu)',
      district: 'Palghar',
      village: 'Ganjad, Dahanu',
      phone: '+91 94210 88291',
      experienceYears: 18,
      artisanCardNo: 'MH-GI-WARLI-0120',
      sampleDescription: 'Specializes in wedding chowk designs and natural herbal pigments.',
      workshopOffered: true,
      submittedAt: '18 Oct 2026',
      status: 'pending'
    }
  ]);
  const [driverRegistrations, setDriverRegistrations] = useState<DriverRegistration[]>([
    {
      id: 'MH-CAB-2026-4821',
      driverName: 'Sachin Ramdas Jadhav',
      phone: '+91 98220 54129',
      licenseNo: 'MH-12-2015-0048192',
      rtoBadgeNo: 'RTO-PUN-CM-8821',
      vehicleModel: 'Maruti Suzuki Ertiga ZXi+ Hybrid',
      vehicleCategory: 'suv',
      vehiclePlateNo: 'MH-12-TC-9481',
      capacity: 6,
      ac: true,
      districtsCovered: ['pune', 'satara', 'raigad'],
      basePrice: 3200,
      priceUnit: 'per day (300 km included)',
      experienceYears: 11,
      ghatExpert: true,
      submittedAt: '19 Oct 2026',
      status: 'pending'
    }
  ]);
  const [guideRegistrations, setGuideRegistrations] = useState<GuideRegistration[]>([
    {
      id: 'MH-GD-2026-7319',
      guideName: 'Prashant Pandurang Kulkarni',
      phone: '+91 98901 34912',
      email: 'prashant.heritage@gmail.com',
      licenseNo: 'MTDC-RLG-2022-048',
      specialization: 'Maratha Forts & Shivaji Military Architecture',
      districts: ['raigad', 'pune', 'satara'],
      languages: ['Marathi', 'English', 'Hindi'],
      experienceYears: 9,
      pricePerDay: 2400,
      bio: 'Historian and certified Sahyadri trek leader specialized in Raigad, Rajgad, and Sinhagad battle histories.',
      submittedAt: '20 Oct 2026',
      status: 'pending'
    }
  ]);


  // Fetch travel database on load
  useEffect(() => {
    fetch('/api/travel-data')
      .then(res => res.json())
      .then(data => {
        if (data.destinations && data.destinations.length > 0) {
          setDestinations(data.destinations);
        }
        if (data.circuits && data.circuits.length > 0) {
          setCircuits(data.circuits);
        }
        if (data.districts && data.districts.length > 0) {
          setDistricts(data.districts);
        }
        if (data.categories && data.categories.length > 0) {
          setCategories(data.categories);
        }
      })
      .catch(err => console.error("Error loading travel database:", err));
  }, []);

  // Handler to sync edited travel databases to the backend filesystem
  const handleSaveTravelData = (
    newDestinations: Destination[],
    newCircuits: Circuit[],
    newDistricts?: District[],
    newCategories?: Category[]
  ) => {
    const updatedDistricts = newDistricts || districts;
    const updatedCategories = newCategories || categories;

    setDestinations(newDestinations);
    setCircuits(newCircuits);
    if (newDistricts) setDistricts(newDistricts);
    if (newCategories) setCategories(newCategories);

    fetch('/api/travel-data/save', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        destinations: newDestinations,
        circuits: newCircuits,
        districts: updatedDistricts,
        categories: updatedCategories
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        addLog("Live travel database synchronized on server.", "success");
      }
    })
    .catch(err => {
      console.error("Error saving travel database:", err);
      addLog("Failed to save travel database to disk.", "warn");
    });
  };
  
  // Companion Panel Drawer Toggle States
  const [isCompanionOpen, setIsCompanionOpen] = useState(true);
  const [companionTab, setCompanionTab] = useState<'app' | 'analytics' | 'users'>('app');

  // Directory of all registered user profiles
  const [mockRegisteredUsers, setMockRegisteredUsers] = useState<UserProfile[]>([
    {
      name: 'Sahil Deshmukh',
      mobile: '9876543210',
      language: 'en',
      ageBand: '18-25',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      xp: 680,
      level: 3,
      levelTitle: 'Senior Explorer',
      checkedInDestinations: ['lonavala', 'mahabaleshwar', 'matheran'],
      badges: ['Monsoon Rookie', 'Sahyadri Climber'],
      referralCode: 'MHT-SAH-592'
    },
    {
      name: 'Pooja Kulkarni',
      mobile: '9123456789',
      language: 'mr',
      ageBand: '26-35',
      country: 'India',
      state: 'Maharashtra',
      district: 'Mumbai',
      xp: 450,
      level: 2,
      levelTitle: 'Fort Crusader',
      checkedInDestinations: ['ajanta', 'ellora'],
      badges: ['Heritage Rookie'],
      referralCode: 'MHT-POO-103'
    },
    {
      name: 'Aniket Shinde',
      mobile: '8888777766',
      language: 'mr',
      ageBand: '36-45',
      country: 'India',
      state: 'Maharashtra',
      district: 'Nagpur',
      xp: 920,
      level: 4,
      levelTitle: 'Royal Chhatrapati Envoy',
      checkedInDestinations: ['tadoba', 'melghat', 'sanjay_gandhi', 'lonavala'],
      badges: ['Wildlife Warrior', 'Monsoon Rookie'],
      referralCode: 'MHT-ANI-994'
    }
  ]);

  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  // Synchronized user profile injection so that current user displays in the directory in real-time
  const allRegisteredUsers = React.useMemo(() => {
    if (!profile) return mockRegisteredUsers;
    const exists = mockRegisteredUsers.some(u => u.referralCode === profile.referralCode && u.referralCode !== '');
    if (exists) {
      return mockRegisteredUsers.map(u => u.referralCode === profile.referralCode ? profile : u);
    }
    return [profile, ...mockRegisteredUsers];
  }, [profile, mockRegisteredUsers]);

  // User simulated coordinates (hoisted from MapTab)
  const [userLat, setUserLat] = useState(18.5204);
  const [userLng, setUserLng] = useState(73.8567);

  // Push Notifications state
  const [notifications, setNotifications] = useState<AppNotification[]>([
    {
      id: 'welcome',
      title: 'Welcome to Maharashtra! 🌟',
      body: 'Start exploring dynamic tourism circuits and check-in near physical sites to claim stamps!',
      timestamp: new Date().toLocaleTimeString(),
      read: false,
      type: 'alert'
    }
  ]);
  const [activeToast, setActiveToast] = useState<AppNotification | null>(null);
  const [isNotificationCenterOpen, setIsNotificationCenterOpen] = useState(false);
  const [notifiedDestinations, setNotifiedDestinations] = useState<string[]>([]);

  // Push Notification Center simulator states (Interactive UX)
  const [alertInterval, setAlertInterval] = useState<number>(20); // Default 20s
  const [countdown, setCountdown] = useState<number>(20);
  const [isAlertGeneratorEnabled, setIsAlertGeneratorEnabled] = useState<boolean>(false);
  const [notificationTab, setNotificationTab] = useState<'feed' | 'simulator'>('feed');
  
  // Admin & Analytics Dashboard state (M24/M25)
  const [auditLogs, setAuditLogs] = useState<{ id: string; timestamp: string; action: string; type: 'info' | 'success' | 'warn' | 'system' }[]>([
    { id: '1', timestamp: new Date().toLocaleTimeString(), action: 'Maharashtra Tourism Gamification engine booted.', type: 'system' },
    { id: '2', timestamp: new Date().toLocaleTimeString(), action: 'Waiting for traveler registration...', type: 'info' }
  ]);

  const [analytics, setAnalytics] = useState({
    dau: 1420,
    mau: 18450,
    completionRate: 64, // %
    totalCheckedIns: 3204,
    popularDest: 'Lonavala (Tiger Point)'
  });

  const [language, setLanguage] = useState<'en' | 'mr'>('en');

  // Stamp and Badge Milestone Celebration state (M15)
  const [stampCelebration, setStampCelebration] = useState<{
    type: 'stamp' | 'badge';
    name: string;
    motif?: string;
    category?: string;
  } | null>(null);
  
  const [pendingBadgeCelebration, setPendingBadgeCelebration] = useState<{
    type: 'stamp' | 'badge';
    name: string;
    motif?: string;
    category?: string;
  } | null>(null);

  // Push to Live Audit Log
  const addLog = (action: string, type: 'info' | 'success' | 'warn' | 'system' = 'info') => {
    setAuditLogs(prev => [
      {
        id: String(prev.length + 1),
        timestamp: new Date().toLocaleTimeString(),
        action,
        type
      },
      ...prev
    ]);
  };

  // Push Notification Dispatcher
  const triggerPushNotification = (
    title: string,
    body: string,
    type: 'alert' | 'tip' | 'achievement' | 'nearby',
    destinationId?: string
  ) => {
    const newNotif: AppNotification = {
      id: `${type}-${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
      title,
      body,
      timestamp: new Date().toLocaleTimeString(),
      read: false,
      type,
      destinationId
    };
    setNotifications(prev => [newNotif, ...prev]);
    setActiveToast(newNotif);
    addLog(`Push Notification: "${title}" triggered.`, 'info');
  };

  // Haversine distance helper for proximity alerts
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371e3; // meters
    const phi1 = (lat1 * Math.PI) / 180;
    const phi2 = (lat2 * Math.PI) / 180;
    const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
    const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
      Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // Get closest destination from user's coordinates
  const getClosestDestination = () => {
    let closestDest: Destination | null = null;
    let minDistance = Infinity;

    DESTINATIONS.forEach(dest => {
      const dist = calculateDistance(userLat, userLng, dest.lat, dest.lng);
      if (dist < minDistance) {
        minDistance = dist;
        closestDest = dest;
      }
    });

    return { destination: closestDest, distanceMeters: minDistance };
  };

  // Trigger a localized periodic tip or advisory based on mock coordinates
  const triggerDynamicPeriodicAlert = () => {
    const { destination, distanceMeters } = getClosestDestination();
    const distanceKm = Math.round(distanceMeters / 1000);

    // If there is a close destination (within 100km)
    if (destination && distanceMeters <= 100000) {
      const tips = LOCAL_TIPS_DICTIONARY[destination.id];
      if (tips && tips.length > 0) {
        const randomTip = tips[Math.floor(Math.random() * tips.length)];
        const title = `${randomTip.title}`;
        const body = `${randomTip.body} (${distanceKm}km away)`;
        triggerPushNotification(title, body, randomTip.type, destination.id);
        return;
      }
    }

    // Fallback to random general travel tips
    const idx = Math.floor(Math.random() * MOCK_TRAVEL_TIPS.length);
    const tip = MOCK_TRAVEL_TIPS[idx];
    triggerPushNotification(tip.title, tip.body, tip.type);
  };

  // Monitor location changes for Proximity Alerts
  useEffect(() => {
    if (!profile) return;

    DESTINATIONS.forEach(dest => {
      const dist = calculateDistance(userLat, userLng, dest.lat, dest.lng);
      // If within 40km and we haven't warned about this destination yet
      if (dist <= 40000 && !notifiedDestinations.includes(dest.id)) {
        const title = `📍 Nearby: ${dest.name}`;
        const body = `You are within ${Math.round(dist / 1000)}km of ${dest.name}. Head to the Map page to teleport closer and check-in!`;
        
        triggerPushNotification(title, body, 'nearby', dest.id);
        setNotifiedDestinations(prev => [...prev, dest.id]);
        addLog(`System detected proximity to ${dest.name}. Firing geo-alert.`, 'system');
      }
    });
  }, [userLat, userLng, profile, notifiedDestinations]);

  // Background Periodic Alerts Interval (Timer Ticker)
  useEffect(() => {
    if (!profile) return;

    const timer = setInterval(() => {
      if (isAlertGeneratorEnabled) {
        setCountdown(prev => {
          if (prev <= 1) {
            triggerDynamicPeriodicAlert();
            return alertInterval;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [profile, isAlertGeneratorEnabled, alertInterval, userLat, userLng]);

  // Handle Clicking on a push notification (reads it and routes optionally)
  const handleNotificationClick = (notif: AppNotification) => {
    setNotifications(prev =>
      prev.map(n => n.id === notif.id ? { ...n, read: true } : n)
    );

    if (notif.destinationId) {
      handleNavigateToMap(notif.destinationId);
    }
    
    setActiveToast(null);
    setIsNotificationCenterOpen(false);
  };

  // Load and restore profile from localStorage and sync profiles from server database on startup
  useEffect(() => {
    const saved = localStorage.getItem('mah_passport_profile');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object' && parsed.name) {
          setProfile(parsed);
          if (parsed.language) {
            setLanguage(parsed.language);
          }
          addLog(`Restored saved passport session for ${parsed.name}.`, 'success');
        }
      } catch (e) {
        console.error("Failed to parse saved session", e);
      }
    }

    // Fetch registered users list from backend database to populate the live console directory
    fetch('/api/profiles')
      .then(res => res.json())
      .then(data => {
        if (data.profiles && data.profiles.length > 0) {
          setMockRegisteredUsers(data.profiles);
        }
      })
      .catch(err => console.error("Error fetching database profiles:", err));
  }, []);

  // Sync profile changes to both local storage and the server-side database
  useEffect(() => {
    if (profile) {
      localStorage.setItem('mah_passport_profile', JSON.stringify(profile));
      if (profile.mobile) {
        fetch('/api/profile/save', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(profile)
        })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            // Update directory to keep lists synchronized
            fetch('/api/profiles')
              .then(res => res.json())
              .then(usersData => {
                if (usersData.profiles) {
                  setMockRegisteredUsers(usersData.profiles);
                }
              })
              .catch(err => console.error("Error re-syncing database profiles:", err));
          }
        })
        .catch(err => console.error("Error saving profile to server:", err));
      }
    } else {
      localStorage.removeItem('mah_passport_profile');
    }
  }, [profile]);

  // Setup mock pre-defined profile for instant testing bypass if they want
  const handleBypassOnboarding = () => {
    const defaultProfile: UserProfile = {
      name: 'Sahil Deshmukh',
      mobile: '9876543210',
      language: 'en',
      ageBand: '18-25',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      xp: 150,
      level: 1,
      levelTitle: 'Novice Explorer',
      checkedInDestinations: ['lonavala'], // already checked in to Lonavala
      badges: ['Monsoon Rookie'],
      referralCode: 'MHT-SAH-592'
    };
    setProfile(defaultProfile);
    setLanguage('en');
    addLog('Preloaded demo profile pre-auth bypass used.', 'system');
    addLog('User "Sahil Deshmukh" logged in.', 'success');
    addLog('Virtual Passport loaded with 1 active stamp.', 'success');
  };

  const handleOnboardingComplete = (newProfile: UserProfile) => {
    setProfile(newProfile);
    setLanguage(newProfile.language);
    addLog(`Traveler registration successful for ${newProfile.name}.`, 'success');
    addLog(`Digital Passport issued (ID: ${newProfile.referralCode}).`, 'success');
    addLog(`Level-1 XP Wallet allocated.`, 'system');
  };

  const handleContinueAsGuest = () => {
    const guestProfile: UserProfile = {
      name: 'Guest Explorer',
      mobile: '',
      language: 'en',
      ageBand: 'Not Specified',
      country: 'India',
      state: 'Maharashtra',
      district: 'Pune',
      xp: 0,
      level: 1,
      levelTitle: 'Guest Explorer',
      checkedInDestinations: [],
      badges: [],
      referralCode: ''
    };
    setProfile(guestProfile);
    addLog('Continuing in Anonymous Guest mode (Browse-only).', 'warn');
  };

  // Handle successful check-in
  const handleCheckInSuccess = (destId: string, xpEarned: number) => {
    if (!profile) return;
    
    // Check if already checked in
    if (profile.checkedInDestinations.includes(destId)) {
      addLog(`Repeat visit logged at ${destId}. XP awarded, but no duplicate stamp.`, 'info');
      updateXp(50); // half reward for repeat
      return;
    }

    const updatedCheckedIns = [...profile.checkedInDestinations, destId];
    const destination = DESTINATIONS.find(d => d.id === destId);
    
    setProfile(prev => {
      if (!prev) return null;

      let updatedBadges = [...prev.badges];
      
      // Calculate newly completed circuits to award badges dynamically
      const completedHillStations = ['lonavala', 'mahabaleshwar', 'matheran'].every(id => updatedCheckedIns.includes(id));
      const completedHeritage = ['ajanta', 'ellora', 'shaniwar_wada'].every(id => updatedCheckedIns.includes(id));
      const completedWildlife = ['tadoba', 'sanjay_gandhi', 'melghat'].every(id => updatedCheckedIns.includes(id));
      
      let unlockedBadgeName: string | null = null;
      let badgeMotif = '🏅';
      
      if (completedHillStations && !prev.badges.includes('Sahyadri Climber')) {
        unlockedBadgeName = 'Sahyadri Climber';
        badgeMotif = '🧗‍♂️';
        updatedBadges.push('Sahyadri Climber');
      } else if (completedHeritage && !prev.badges.includes('Heritage Protector')) {
        unlockedBadgeName = 'Heritage Protector';
        badgeMotif = '🛡️';
        updatedBadges.push('Heritage Protector');
      } else if (completedWildlife && !prev.badges.includes('Wildlife Warrior')) {
        unlockedBadgeName = 'Wildlife Warrior';
        badgeMotif = '🦁';
        updatedBadges.push('Wildlife Warrior');
      }
      
      if (unlockedBadgeName) {
        addLog(`Unveiled new Merit badge "${unlockedBadgeName}" inside Passport!`, 'success');
        setPendingBadgeCelebration({
          type: 'badge',
          name: unlockedBadgeName,
          motif: badgeMotif
        });
      }

      return {
        ...prev,
        checkedInDestinations: updatedCheckedIns,
        badges: updatedBadges
      };
    });

    addLog(`GPS match verified successfully for ${destination?.name}!`, 'success');
    addLog(`Digital Stamp (${destination?.stampMotif}) permanently appended to Passport.`, 'success');
    updateXp(xpEarned);

    // Trigger primary stamp celebration
    if (destination) {
      setStampCelebration({
        type: 'stamp',
        name: destination.name,
        motif: destination.stampMotif,
        category: destination.category
      });
    }

    // Update Challenges (weekly_explorer)
    setActiveChallenges(prev => 
      prev.map(ch => {
        if (ch.id === 'weekly_explorer') {
          const newProgress = Math.min(ch.progress + 1, ch.target);
          if (newProgress === ch.target && !ch.isClaimed) {
            addLog(`Weekly Challenge "Sahyadri Expedition" achieved! +100 XP claimable.`, 'success');
          }
          return { ...ch, progress: newProgress };
        }
        return ch;
      })
    );
  };

  // Handle successful quiz completion
  const handleQuizSuccess = (xpEarned: number) => {
    addLog(`Passed destination trivia quiz with 100% correctness!`, 'success');
    updateXp(xpEarned);

    // Unlock "Trivia Master" merit badge if not already unlocked
    setProfile(prev => {
      if (!prev) return null;
      if (prev.badges.includes('Trivia Master')) return prev;

      addLog(`Unveiled new Merit badge "Trivia Master" inside Passport!`, 'success');
      setStampCelebration({
        type: 'badge',
        name: 'Trivia Master',
        motif: '🎓'
      });

      return {
        ...prev,
        badges: [...prev.badges, 'Trivia Master']
      };
    });

    // Update Challenges (daily_quiz)
    setActiveChallenges(prev => 
      prev.map(ch => {
        if (ch.id === 'daily_quiz') {
          const newProgress = Math.min(ch.progress + 1, ch.target);
          if (newProgress === ch.target && !ch.isClaimed) {
            addLog(`Daily Challenge "Daily Trivia Scout" achieved!`, 'success');
          }
          return { ...ch, progress: newProgress };
        }
        return ch;
      })
    );
  };

  // XP and Leveling Logic (M14)
  const updateXp = (xpGained: number) => {
    setProfile(prev => {
      if (!prev) return null;
      const newXp = prev.xp + xpGained;
      const threshold = 250;
      const newLevel = Math.floor(newXp / threshold) + 1;
      let levelTitle = prev.levelTitle;

      if (newLevel > prev.level) {
        levelTitle = newLevel >= 3 
          ? (language === 'mr' ? 'महाराष्ट्र भूषण' : 'Maharashtra Legend') 
          : (language === 'mr' ? 'वारसा रक्षक' : 'Heritage Scout');
        addLog(`LEVEL UP! ${prev.name} reached Level ${newLevel} (${levelTitle})!`, 'success');
        addLog(`Unlocked premium cosmetic avatar customization frames!`, 'system');
      }

      return {
        ...prev,
        xp: newXp,
        level: newLevel,
        levelTitle
      };
    });
    addLog(`Earned +${xpGained} Experience Points (XP) credited.`, 'info');
  };

  // Navigating between tabs
  const handleNavigateToMap = (destId: string) => {
    setSelectedDestinationId(destId);
    setActiveTab('discover');
    addLog(`Navigated to detail view for ${destId}.`, 'info');
  };

  const handleNavigateToQuiz = (destId: string) => {
    setSelectedDestinationId(destId);
    setActiveTab('quiz');
    addLog(`Redirected directly to Quiz Panel for ${destId}.`, 'info');
  };

  const handleClaimChallengeReward = (challengeId: string, reward: number) => {
    setActiveChallenges(prev => 
      prev.map(ch => {
        if (ch.id === challengeId) {
          return { ...ch, isClaimed: true };
        }
        return ch;
      })
    );
    updateXp(reward);
    addLog(`Challenge reward of ${reward} XP claimed.`, 'success');
  };

  const handleLogout = () => {
    setProfile(null);
    setActiveTab('discover');
    setSelectedDestinationId(null);
    setActiveChallenges(CHALLENGES);
    setAuditLogs([
      { id: '1', timestamp: new Date().toLocaleTimeString(), action: 'Demo session reset. Back to onboarding carousel.', type: 'system' }
    ]);
  };

  const handleOpenCompanion = (destId?: string) => {
    setIsCompanionOpen(true);
    setCompanionTab('app');
    if (destId) {
      setSelectedDestinationId(destId);
      setActiveTab('discover');
    }
  };

  // Service, Artisan, Permit and Review Handlers
  const handleAddBooking = (newBooking: Booking, xpDeducted: number) => {
    setBookings(prev => [newBooking, ...prev]);
    if (xpDeducted > 0) {
      updateXp(-xpDeducted);
    }
    addLog(`New booking confirmed: ${newBooking.serviceTitle} (PNR: ${newBooking.id}) via ${newBooking.paymentMethod.toUpperCase()}`, 'success');
    triggerPushNotification(
      '🎟️ Booking Confirmed!',
      `Your booking for ${newBooking.serviceTitle} on ${newBooking.date} is confirmed (PNR: ${newBooking.id}).`,
      'achievement'
    );
  };

  const handleCancelBooking = (bookingId: string) => {
    setBookings(prev => prev.filter(b => b.id !== bookingId));
    addLog(`Booking ${bookingId} cancelled by traveler.`, 'info');
    triggerPushNotification(
      'Booking Cancelled',
      `Your booking ${bookingId} has been cancelled. Refund initiated to source.`,
      'alert'
    );
  };

  const handleAddReview = (serviceType: 'car' | 'guide' | 'activity' | 'artisan', serviceId: string, review: Review) => {
    if (serviceType === 'car') {
      setCars(prev => prev.map(c => {
        if (c.id !== serviceId) return c;
        const updatedReviews = [review, ...c.reviews];
        const newRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(1));
        return { ...c, reviews: updatedReviews, rating: newRating, reviewCount: updatedReviews.length };
      }));
    } else if (serviceType === 'guide') {
      setGuides(prev => prev.map(g => {
        if (g.id !== serviceId) return g;
        const updatedReviews = [review, ...g.reviews];
        const newRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(2));
        return { ...g, reviews: updatedReviews, rating: newRating, reviewCount: updatedReviews.length };
      }));
    } else if (serviceType === 'activity') {
      setActivities(prev => prev.map(a => {
        if (a.id !== serviceId) return a;
        const updatedReviews = [review, ...a.reviews];
        const newRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(2));
        return { ...a, reviews: updatedReviews, rating: newRating, reviewCount: updatedReviews.length };
      }));
    } else if (serviceType === 'artisan') {
      setArtisans(prev => prev.map(art => {
        if (art.id !== serviceId) return art;
        const updatedReviews = [review, ...art.reviews];
        const newRating = Number((updatedReviews.reduce((sum, r) => sum + r.rating, 0) / updatedReviews.length).toFixed(2));
        return { ...art, reviews: updatedReviews, rating: newRating, reviewCount: updatedReviews.length };
      }));
    }
    updateXp(25);
    addLog(`Traveler posted a review for ${serviceId} (+25 XP awarded)`, 'success');
    triggerPushNotification(
      '⭐ Review Published (+25 XP)',
      `Thank you for reviewing! Your feedback helps other travelers across Maharashtra.`,
      'achievement'
    );
  };

  const handleRegisterArtisan = (reg: ArtisanRegistration) => {
    setArtisanRegistrations(prev => [reg, ...prev]);
    addLog(`New artisan registration submitted: ${reg.artisanName} (${reg.craftType}, ${reg.district})`, 'info');
    triggerPushNotification(
      '🎨 Artisan Application Received',
      `Application ${reg.id} submitted for MTDC verification. Thank you for preserving Maharashtra heritage!`,
      'tip'
    );
  };

  const handleIssuePermit = (permit: PermitApplication) => {
    setPermits(prev => [permit, ...prev]);
    addLog(`Official Permit issued: ${permit.title} for ${permit.applicantName} (${permit.id})`, 'success');
    triggerPushNotification(
      '📜 Official E-Permit Issued',
      `Your entry permit for ${permit.destinationName} has been approved and issued!`,
      'achievement'
    );
  };

  const handleApproveArtisan = (regId: string) => {
    setArtisanRegistrations(prev => prev.map(r => r.id === regId ? { ...r, status: 'approved' } : r));
    addLog(`Artisan application ${regId} approved by MTDC Administrator.`, 'success');
  };

  const handleApprovePermit = (pmtId: string) => {
    setPermits(prev => prev.map(p => p.id === pmtId ? { ...p, status: 'approved' } : p));
    addLog(`Permit ${pmtId} approved & issued by MTDC Administrator.`, 'success');
  };

  const handleRegisterDriver = (reg: DriverRegistration) => {
    setDriverRegistrations(prev => [reg, ...prev]);
    addLog(`New cab driver application submitted: ${reg.driverName} (${reg.vehicleModel}, ${reg.vehiclePlateNo})`, 'info');
    triggerPushNotification(
      '🚖 Cab Application Received',
      `Application ${reg.id} submitted for MTDC verification. RTO verification in progress!`,
      'tip'
    );
  };

  const handleRegisterGuide = (reg: GuideRegistration) => {
    setGuideRegistrations(prev => [reg, ...prev]);
    addLog(`New tour guide application submitted: ${reg.guideName} (${reg.specialization})`, 'info');
    triggerPushNotification(
      '🎓 Guide Accreditation Lodged',
      `Application ${reg.id} submitted for MTDC verification. Thank you for showcasing Maharashtra!`,
      'tip'
    );
  };

  const handleApproveDriver = (regId: string) => {
    const reg = driverRegistrations.find(r => r.id === regId);
    setDriverRegistrations(prev => prev.map(r => r.id === regId ? { ...r, status: 'approved' } : r));
    if (reg) {
      const newCar: CarService = {
        id: `car_${reg.id.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        name: `${reg.vehicleModel} (${reg.driverName.split(' ')[0]})`,
        nameMr: `${reg.vehicleModel} (${reg.driverName})`,
        category: reg.vehicleCategory,
        vehicleModel: reg.vehicleModel,
        capacity: reg.capacity,
        luggageCount: 4,
        ac: reg.ac,
        basePrice: reg.basePrice,
        priceUnit: reg.priceUnit,
        districtsCovered: reg.districtsCovered,
        driverName: reg.driverName,
        driverPhone: reg.phone,
        driverRating: 5.0,
        reviewCount: 1,
        rating: 5.0,
        imageUrl: reg.vehicleCategory === 'suv'
          ? 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80'
          : 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80',
        features: [
          reg.ghatExpert ? 'Certified Ghats Hill Expert' : 'City & Highway Expert',
          reg.ac ? 'Chilled AC' : 'Non-AC',
          'Commercial Yellow Plate Verified',
          'Zero Cancellation Guaranteed'
        ],
        reviews: [
          {
            id: `rev_${Date.now()}`,
            serviceId: `car_${reg.id}`,
            userName: 'MTDC Inspection Wing',
            rating: 5,
            comment: `Vehicle ${reg.vehiclePlateNo} verified and cleared with RTO Badge ${reg.rtoBadgeNo}.`,
            date: 'Just now',
            tag: 'MTDC Verified',
            helpfulCount: 3,
            verifiedBooking: true
          }
        ],
        available: true
      };
      setCars(prev => [newCar, ...prev]);
    }
    addLog(`Commercial Cab Application ${regId} approved by MTDC Administrator. Added to live fleet!`, 'success');
    triggerPushNotification(
      '🚖 Cab Application Approved!',
      `Commercial cab ${reg?.vehiclePlateNo} (${reg?.driverName}) has been approved and listed on MahaPassport!`,
      'achievement'
    );
  };

  const handleApproveGuide = (regId: string) => {
    const reg = guideRegistrations.find(r => r.id === regId);
    setGuideRegistrations(prev => prev.map(r => r.id === regId ? { ...r, status: 'approved' } : r));
    if (reg) {
      const newGuide: GuideService = {
        id: `guide_${reg.id.toLowerCase().replace(/[^a-z0-9]/g, '_')}`,
        name: reg.guideName,
        nameMr: reg.guideName,
        specialization: reg.specialization,
        specializationMr: reg.specialization,
        districts: reg.districts,
        destinationsCovered: reg.districts.map(d => d.toUpperCase()),
        languages: reg.languages,
        experienceYears: reg.experienceYears,
        pricePerDay: reg.pricePerDay,
        pricePerHalfDay: Math.round(reg.pricePerDay * 0.6),
        mtdcCertified: true,
        licenseNumber: reg.licenseNo,
        rating: 5.0,
        reviewCount: 1,
        imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        bio: reg.bio,
        bioMr: reg.bio,
        badges: ['MTDC Certified', 'Official Historian', 'Heritage Expert'],
        reviews: [
          {
            id: `rev_g_${Date.now()}`,
            serviceId: `guide_${reg.id}`,
            userName: 'MTDC Directorate',
            rating: 5,
            comment: `Official credentials and license ${reg.licenseNo} verified by MTDC Heritage Board.`,
            date: 'Just now',
            tag: 'Govt Certified',
            helpfulCount: 5,
            verifiedBooking: true
          }
        ],
        available: true
      };
      setGuides(prev => [newGuide, ...prev]);
    }
    addLog(`Tour Guide Accreditation ${regId} approved by MTDC Administrator. Added to guide directory!`, 'success');
    triggerPushNotification(
      '🎓 Guide Accreditation Granted!',
      `Guide ${reg?.guideName} (${reg?.licenseNo}) is now certified and listed on MahaPassport!`,
      'achievement'
    );
  };

  // Dynamic statistics
  return (
    <div className="min-h-screen bg-[#13110E] text-slate-100 font-sans flex flex-col lg:flex-row relative overflow-hidden antialiased">
      
      {/* 1. Left Sidebar Dashboard: Brand Header, Language Syncer & Simulation Console */}
      <div className="w-full lg:w-[420px] h-screen bg-[#1C1713] border-r border-[#2D231A] flex flex-col overflow-hidden shrink-0 z-20 shadow-xl">
        {/* Compact Brand Header - Maximizes Vertical Space for Telemetry */}
        <div className="p-3 border-b border-[#2D231A] bg-[#241E19] flex items-center gap-3 shrink-0">
          <MaharashtraLogo size={32} light={true} hideText={true} />
          <div className="flex-1 min-w-0">
            <h1 className="text-xs font-black text-white tracking-tight uppercase flex items-center gap-1.5">
              <span>MahaPassport Console</span>
              <span className="text-[8px] bg-amber-500/15 border border-amber-500/30 text-amber-500 font-bold px-1.5 py-0.5 rounded font-mono uppercase">LIVE</span>
            </h1>
            <p className="text-[9px] text-amber-200/60 font-medium">Directorate of Maharashtra Tourism</p>
          </div>
        </div>

        {/* Live Admin Console Content Area */}
        <div className="flex-1 flex flex-col min-h-0 p-3 sm:p-4">
          <UserAnalyticsPortal
            profile={profile}
            auditLogs={auditLogs}
            notifications={notifications}
            bookings={bookings}
            permits={permits}
            artisanRegistrations={artisanRegistrations}
            driverRegistrations={driverRegistrations}
            guideRegistrations={guideRegistrations}
            onApproveArtisan={handleApproveArtisan}
            onApprovePermit={handleApprovePermit}
            onApproveDriver={handleApproveDriver}
            onApproveGuide={handleApproveGuide}
            language={language}
            onTriggerAlert={(title, body, type, destinationId) => triggerPushNotification(title, body, type, destinationId)}
            userLat={userLat}
            userLng={userLng}
            setUserLat={setUserLat}
            setUserLng={setUserLng}
            addLog={addLog}
            allRegisteredUsers={allRegisteredUsers}
            destinations={destinations}
            circuits={circuits}
            districts={districts}
            categories={categories}
            onSaveTravelData={handleSaveTravelData}
          />
        </div>



        {/* Sidebar Footer */}
        <div className="p-4 border-t border-[#2D231A] bg-[#241E19] flex justify-between items-center text-[9px] text-slate-500 font-semibold font-mono shrink-0">
          <span>SECURE MH-GOV SANDBOX</span>
          <span className="flex items-center gap-1 text-emerald-500 font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            CONSOLE ACTIVE
          </span>
        </div>
      </div>

      {/* 2. Main Center/Right Column: Phone Emulator Area with Premium Glow Canvas */}
      <div className="flex-1 h-screen bg-[#0A0D14] flex flex-col items-center relative p-2 sm:p-4 overflow-y-auto z-10">
        
        {/* Soft designer flare background */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-amber-500/10 rounded-full blur-[140px] pointer-events-none z-0" />
        <div className="absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-orange-600/10 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse" style={{ animationDuration: '10s' }} />

        {/* Smartphone Emulator container */}
        <div className="relative z-10 w-full flex items-center justify-center py-4 sm:py-8 lg:py-12 shrink-0">
          <PhoneFrame>
            {profile === null ? (
              <Onboarding 
                onComplete={handleOnboardingComplete}
                onContinueAsGuest={handleContinueAsGuest}
              />
            ) : (
              <div className="flex-1 flex flex-col h-full bg-transparent overflow-hidden">
                {/* App Internal Header showing coins/XP */}
                <div className="px-3 py-2.5 bg-[#13110E] border-b border-[#2A241C] flex justify-between items-center z-10 shrink-0 relative">
                  <div className="flex items-center gap-2 min-w-0">
                    <div className="shrink-0">
                      <MaharashtraLogo size={24} light={true} hideText={true} />
                    </div>
                    <div className="min-w-0">
                      <span className="block text-[8px] font-black text-amber-400 uppercase tracking-widest leading-none">MahaPassport</span>
                      <span className="text-[11px] font-black text-white truncate max-w-[95px] block mt-0.5 leading-none">
                        {profile.name}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 shrink-0">
                    {/* Push Notification Bell */}
                    <button
                      id="notification-bell"
                      type="button"
                      onClick={() => setIsNotificationCenterOpen(true)}
                      className="relative p-1.5 rounded-lg bg-slate-800/80 hover:bg-slate-700 text-slate-300 hover:text-white transition active:scale-95 flex items-center justify-center border border-slate-700/50 cursor-pointer"
                      title="Travel Notifications & Advisories"
                    >
                      <Bell className={`w-3.5 h-3.5 ${notifications.some(n => !n.read) ? 'animate-bounce text-amber-400' : ''}`} />
                      {notifications.some(n => !n.read) && (
                        <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-rose-500 rounded-full"></span>
                      )}
                    </button>

                    <div className="flex items-center gap-1 bg-amber-500/10 border border-amber-500/25 px-2 py-1 rounded-lg text-amber-400 text-[10px] font-black tracking-wide shrink-0">
                      <Sparkles className="w-3 h-3 text-amber-400 animate-spin" style={{ animationDuration: '6s' }} />
                      <span>{profile.xp} XP</span>
                    </div>
                  </div>
                </div>

                {/* Main Tab Views Switcher */}
                <div className="flex-1 overflow-hidden flex flex-col">
                  {activeTab === 'discover' && (
                    <DiscoverTab
                      profile={profile}
                      language={language}
                      onNavigateToMap={handleNavigateToMap}
                      onNavigateToQuiz={handleNavigateToQuiz}
                      userLat={userLat}
                      userLng={userLng}
                      destinations={destinations}
                      circuits={circuits}
                    />
                  )}

                  {activeTab === 'services' && (
                    <ServicesTab
                      profile={profile}
                      language={language}
                      cars={cars}
                      guides={guides}
                      activities={activities}
                      artisans={artisans}
                      permits={permits}
                      bookings={bookings}
                      onAddBooking={handleAddBooking}
                      onCancelBooking={handleCancelBooking}
                      onAddReview={handleAddReview}
                      onRegisterArtisan={handleRegisterArtisan}
                      onRegisterDriver={handleRegisterDriver}
                      onRegisterGuide={handleRegisterGuide}
                      onIssuePermit={handleIssuePermit}
                    />
                  )}

                  {activeTab === 'quiz' && (
                    <QuizTab
                      profile={profile}
                      language={language}
                      onQuizSuccess={handleQuizSuccess}
                      selectedDestinationId={selectedDestinationId}
                      destinations={destinations}
                    />
                  )}

                  {activeTab === 'passport' && (
                    <PassportTab
                      profile={profile}
                      language={language}
                      destinations={destinations}
                      circuits={circuits}
                    />
                  )}

                  {activeTab === 'profile' && (
                    <ProfileTab
                      profile={profile}
                      language={language}
                      circuits={circuits}
                      destinations={destinations}
                      onUpdateProfile={(updated) => {
                        setProfile(updated);
                        setLanguage(updated.language);
                        addLog(`Profile updated: Preferred language set to ${updated.language.toUpperCase()}.`, 'info');
                      }}
                      onLogout={handleLogout}
                      onUnlockBadge={(badgeName, motif) => {
                        setProfile(prev => {
                          if (!prev) return null;
                          if (prev.badges.includes(badgeName)) return prev;
                          return {
                            ...prev,
                            badges: [...prev.badges, badgeName]
                          };
                        });
                        setStampCelebration({
                          type: 'badge',
                          name: badgeName,
                          motif: motif
                        });
                        addLog(`Unveiled new Merit badge "${badgeName}" inside Passport!`, 'success');
                      }}
                    />
                  )}
                </div>

                {/* App Bottom Navigation Bar with gorgeous indicators */}
                <div className="h-[64px] bg-[#13110E] border-t border-[#2A241C] flex items-center justify-around px-2 z-10 shrink-0">
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('discover');
                      setSelectedDestinationId(null);
                    }}
                    className={`flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${activeTab === 'discover' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-amber-200/50 hover:text-amber-100'}`}
                  >
                    <Compass className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider">Explore</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('services');
                      setSelectedDestinationId(null);
                    }}
                    className={`flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${activeTab === 'services' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-amber-200/50 hover:text-amber-100'}`}
                  >
                    <Car className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider">Services</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('quiz');
                      setSelectedDestinationId(null);
                    }}
                    className={`flex flex-col items-center justify-center gap-1 py-1.5 px-2 rounded-xl transition cursor-pointer ${activeTab === 'quiz' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-amber-200/50 hover:text-amber-100'}`}
                  >
                    <Award className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider">Quizzes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('passport');
                      setSelectedDestinationId(null);
                    }}
                    className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition cursor-pointer ${activeTab === 'passport' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-amber-200/50 hover:text-amber-100'}`}
                  >
                    <BookOpen className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider">Passport</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('profile');
                      setSelectedDestinationId(null);
                    }}
                    className={`flex flex-col items-center justify-center gap-1 py-1.5 px-3 rounded-xl transition cursor-pointer ${activeTab === 'profile' ? 'text-amber-400 font-bold bg-amber-500/10' : 'text-amber-200/50 hover:text-amber-100'}`}
                  >
                    <User className="w-4 h-4" />
                    <span className="text-[9px] uppercase tracking-wider">Profile</span>
                  </button>
                </div>

                {/* Sliding Toast Notification Banner */}
                <AnimatePresence>
                  {activeToast && (
                    <motion.div
                      initial={{ y: -60, opacity: 0 }}
                      animate={{ y: 12, opacity: 1 }}
                      exit={{ y: -60, opacity: 0 }}
                      transition={{ type: 'spring', damping: 15 }}
                      onClick={() => handleNotificationClick(activeToast)}
                      className="absolute top-12 left-3 right-3 bg-slate-900/95 border-2 border-amber-500/80 rounded-2xl p-3 shadow-xl z-50 flex gap-3 cursor-pointer hover:bg-slate-850 transition"
                    >
                      <div className="p-2 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-500 flex items-center justify-center self-center shrink-0">
                        {activeToast.type === 'nearby' ? <MapPin className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-start gap-1">
                          <h4 className="text-[11px] font-bold text-white truncate">{activeToast.title}</h4>
                          <span className="text-[7px] text-slate-500 font-mono shrink-0 whitespace-nowrap mt-0.5">{activeToast.timestamp}</span>
                        </div>
                        <p className="text-[10px] text-slate-300 leading-snug mt-0.5 line-clamp-2">{activeToast.body}</p>
                        {activeToast.destinationId && (
                          <span className="text-[8px] text-amber-400 font-bold uppercase tracking-wider block mt-1">Tap to View Map ➔</span>
                        )}
                      </div>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setActiveToast(null);
                        }}
                        className="p-1 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 self-start mt-0.5 shrink-0 cursor-pointer"
                      >
                        <X className="w-3.5 h-3.5" />
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Notification Center Drawer overlay */}
                <AnimatePresence>
                  {isNotificationCenterOpen && (
                    <motion.div
                      initial={{ y: '100%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '100%' }}
                      transition={{ type: 'spring', damping: 20 }}
                      className="absolute inset-0 bg-slate-950/98 z-50 flex flex-col justify-between"
                    >
                      {/* Header */}
                      <div className="p-4 border-b border-slate-800 flex justify-between items-center bg-slate-900 sticky top-0 z-10">
                        <div className="flex items-center gap-2">
                          <Bell className="w-4 h-4 text-amber-500 animate-pulse" />
                          <h3 className="text-xs font-bold text-white uppercase tracking-wider">
                            {language === 'mr' ? 'अधिसूचना आणि सूचना' : 'Alerts & Advisories'}
                          </h3>
                        </div>
                        <button
                          type="button"
                          onClick={() => setIsNotificationCenterOpen(false)}
                          className="p-1.5 rounded-full bg-slate-800 hover:bg-slate-750 text-slate-400 hover:text-white transition cursor-pointer"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {/* Dual-tab Selector */}
                      <div className="flex bg-slate-900 p-1 rounded-xl mx-4 my-2 border border-slate-800 shrink-0">
                        <button
                          type="button"
                          onClick={() => setNotificationTab('feed')}
                          className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${notificationTab === 'feed' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
                        >
                          <Bell className="w-3.5 h-3.5" />
                          Feed ({notifications.length})
                        </button>
                        <button
                          type="button"
                          onClick={() => setNotificationTab('simulator')}
                          className={`flex-1 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer ${notificationTab === 'simulator' ? 'bg-amber-500 text-slate-950 shadow-md' : 'text-slate-400 hover:text-white'}`}
                        >
                          <Compass className="w-3.5 h-3.5" />
                          Travel Radar
                        </button>
                      </div>

                      {/* Tab Contents */}
                      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-3">
                        {notificationTab === 'feed' ? (
                          <>
                            {/* Actions Header */}
                            {notifications.length > 0 && (
                              <div className="flex justify-between items-center pb-2 border-b border-slate-800/80 sticky top-0 bg-slate-950/40 backdrop-blur-md py-1 z-10">
                                <span className="text-[10px] text-slate-400 font-semibold">
                                  {notifications.filter(n => !n.read).length} unread alerts
                                </span>
                                <div className="flex gap-2">
                                  <button
                                    type="button"
                                    onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))}
                                    className="text-[9px] text-amber-500 font-bold hover:underline cursor-pointer"
                                  >
                                    Mark all read
                                  </button>
                                  <span className="text-slate-700">|</span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      setNotifications([]);
                                      addLog('Cleared all push notifications.', 'info');
                                    }}
                                    className="text-[9px] text-rose-500 font-bold hover:underline cursor-pointer"
                                  >
                                    Clear all
                                  </button>
                                </div>
                              </div>
                            )}

                            {notifications.length === 0 ? (
                              <div className="flex flex-col items-center justify-center text-center py-20">
                                <div className="relative w-14 h-14 bg-slate-900 border border-slate-800 rounded-full flex items-center justify-center mb-4">
                                  <BellOff className="w-6 h-6 text-slate-500" />
                                  <div className="absolute inset-0 rounded-full border border-amber-500/20 animate-ping" />
                                </div>
                                <h4 className="text-xs font-bold text-slate-300">No active alerts</h4>
                                <p className="text-[10px] text-slate-500 max-w-[200px] mt-1 leading-relaxed">
                                  Maharashtra travel space is calm. Nearby alerts will pop up when you teleport or travel close to heritage sites!
                                </p>
                              </div>
                            ) : (
                              notifications.map(notif => {
                                let typeStyle = "border-slate-800 bg-slate-900/40 text-slate-300";
                                let icon = <Info className="w-3.5 h-3.5" />;
                                
                                if (notif.type === 'alert') {
                                  typeStyle = "border-rose-500/30 bg-rose-500/5 text-rose-400";
                                  icon = <AlertTriangle className="w-3.5 h-3.5" />;
                                } else if (notif.type === 'nearby') {
                                  typeStyle = "border-cyan-500/30 bg-cyan-500/5 text-cyan-400";
                                  icon = <MapPin className="w-3.5 h-3.5" />;
                                } else if (notif.type === 'tip') {
                                  typeStyle = "border-amber-500/30 bg-amber-500/5 text-amber-400";
                                  icon = <Sparkles className="w-3.5 h-3.5" />;
                                }

                                return (
                                  <div
                                    key={notif.id}
                                    onClick={() => handleNotificationClick(notif)}
                                    className={`p-3 border rounded-xl flex gap-3 transition cursor-pointer relative overflow-hidden ${typeStyle} ${notif.read ? 'opacity-60 border-slate-800/50 bg-slate-950/20' : 'hover:border-slate-700'}`}
                                  >
                                    <div className="p-1.5 rounded-lg bg-slate-950/40 self-start shrink-0">
                                      {icon}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex justify-between items-start gap-2">
                                        <h4 className="text-xs font-bold text-white leading-tight truncate">{notif.title}</h4>
                                        <span className="text-[8px] text-slate-500 font-mono shrink-0 whitespace-nowrap mt-0.5">{notif.timestamp}</span>
                                      </div>
                                      <p className="text-[10px] text-slate-300 leading-relaxed mt-1">{notif.body}</p>
                                      {notif.destinationId && (
                                        <span className="text-[8px] text-cyan-400 font-bold uppercase tracking-wider block mt-1.5">
                                          Tap to View Map Location ➔
                                        </span>
                                      )}
                                    </div>
                                    {!notif.read && (
                                      <span className="absolute top-3 right-3 w-1.5 h-1.5 bg-amber-500 rounded-full" />
                                    )}
                                  </div>
                                );
                              })
                            )}
                          </>
                        ) : (
                          <div className="space-y-4 text-left">
                            {/* Alert Status Controls */}
                            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-4 space-y-3">
                              <div className="flex justify-between items-center">
                                <span className="text-[10px] font-black tracking-wider text-amber-500 uppercase">
                                  Periodic Travel Alerts
                                </span>
                                <button
                                  type="button"
                                  onClick={() => {
                                    setIsAlertGeneratorEnabled(!isAlertGeneratorEnabled);
                                    addLog(`${!isAlertGeneratorEnabled ? 'Enabled' : 'Disabled'} periodic tourism alerts generator.`, 'system');
                                  }}
                                  className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase tracking-wider transition cursor-pointer ${isAlertGeneratorEnabled ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-slate-800 text-slate-400 border border-slate-700'}`}
                                >
                                  {isAlertGeneratorEnabled ? 'ACTIVE' : 'STOPPED'}
                                </button>
                              </div>
                              <p className="text-[10px] text-slate-400 leading-relaxed">
                                Automatically receives location-specific advice, weather advisories, and nearby destination alerts on a scheduled interval.
                              </p>
                              {isAlertGeneratorEnabled && (
                                <div className="pt-2 border-t border-slate-800/60 flex justify-between items-center text-[10px]">
                                  <span className="text-slate-500 font-mono">Next alert in:</span>
                                  <span className="font-mono text-amber-400 font-bold">{countdown}s</span>
                                </div>
                              )}
                            </div>

                            <div className="bg-slate-900/60 border border-slate-800 rounded-2xl p-3.5 relative overflow-hidden">
                              <span className="text-[8px] font-black tracking-wider text-cyan-400 uppercase block mb-1">Live GPS Telemetry</span>
                              <div className="flex items-center gap-1.5 text-xs font-bold text-white">
                                <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                                <span>{userLat.toFixed(4)}° N , {userLng.toFixed(4)}° E</span>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Footer banner */}
                      <div className="p-3 bg-slate-900 border-t border-slate-800 flex justify-between items-center text-[8px] text-slate-500 font-mono shrink-0">
                        <span>GEOLOCATION ENGINE: V2</span>
                        <span className="flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ACTIVE
                        </span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Stamp & Badge Milestone Celebration Modal overlay (M15) */}
                <StampCelebrationModal
                  isOpen={stampCelebration !== null}
                  type={stampCelebration?.type || 'stamp'}
                  name={stampCelebration?.name || ''}
                  motif={stampCelebration?.motif}
                  category={stampCelebration?.category}
                  language={language}
                  onClose={() => {
                    setStampCelebration(null);
                    if (pendingBadgeCelebration) {
                      setTimeout(() => {
                        setStampCelebration(pendingBadgeCelebration);
                        setPendingBadgeCelebration(null);
                      }, 400);
                    }
                  }}
                />
              </div>
            )}
          </PhoneFrame>

          {/* Bypass onboarding options for testing layout instantly, floating nicely at bottom */}
          {profile === null && (
            <div className="absolute bottom-6 right-6 flex flex-col gap-2 z-50">
              <button
                type="button"
                onClick={handleBypassOnboarding}
                className="bg-[#E86B21] hover:bg-[#C45512] text-white px-4 py-2.5 rounded-xl text-xs font-bold shadow-lg hover:shadow-xl transition active:scale-95 cursor-pointer border border-white/10"
              >
                🚀 Bypass Login (Demo Profile)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
