import React, { useState, useEffect } from 'react';
import { 
  Activity, 
  Users, 
  MapPin, 
  HelpCircle, 
  Award, 
  BookOpen, 
  FileSpreadsheet, 
  Download, 
  TrendingUp, 
  Calendar, 
  Smartphone, 
  Globe, 
  Clock, 
  ShieldAlert, 
  Search, 
  ChevronRight, 
  SlidersHorizontal,
  FileText,
  Trash2,
  Edit,
  Plus,
  Lock,
  Unlock,
  LogOut,
  CheckCircle,
  XCircle,
  Camera,
  Check,
  Compass,
  Sparkles,
  Bell
} from 'lucide-react';
import { UserProfile, AppNotification, Destination, Circuit, District, Category, Badge, SelfieSubmission, Quiz, QuizQuestion, TouristSpot } from '../types';
import { STATIC_QUIZZES } from '../data';

interface UserAnalyticsPortalProps {
  profile: UserProfile | null;
  auditLogs: { id: string; timestamp: string; action: string; type: 'info' | 'success' | 'warn' | 'system' }[];
  notifications?: AppNotification[];
  language: 'en' | 'mr';
  onTriggerAlert?: (title: string, body: string, type: 'alert' | 'tip' | 'achievement' | 'nearby', destinationId?: string) => void;
  userLat: number;
  userLng: number;
  setUserLat: (lat: number) => void;
  setUserLng: (lng: number) => void;
  addLog: (action: string, type?: 'info' | 'success' | 'warn' | 'system') => void;
  allRegisteredUsers: UserProfile[];
  destinations: Destination[];
  circuits: Circuit[];
  districts: District[];
  categories: Category[];
  onSaveTravelData: (newDests: Destination[], newCircs: Circuit[], newDistricts?: District[], newCategories?: Category[]) => void;
}

type TabType = 'dashboard' | 'gps' | 'travelers' | 'quiz' | 'gamification' | 'passport' | 'locations' | 'circuits' | 'pois' | 'districts_categories' | 'badges' | 'reports';

export default function UserAnalyticsPortal({
  profile,
  auditLogs,
  notifications = [],
  language,
  onTriggerAlert,
  userLat,
  userLng,
  setUserLat,
  setUserLng,
  addLog,
  allRegisteredUsers,
  destinations,
  circuits,
  districts,
  categories,
  onSaveTravelData
}: UserAnalyticsPortalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
  // Static Login States
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    return localStorage.getItem('mah_admin_logged_in') === 'true';
  });
  const [adminUser, setAdminUser] = useState('');
  const [adminPass, setAdminPass] = useState('');
  const [loginError, setLoginError] = useState('');

  // Travelers Directory States
  const [userSearchQuery, setUserSearchQuery] = useState('');
  const [expandedUserId, setExpandedUserId] = useState<string | null>(null);

  // Real-time Filters
  const [dateFilter, setDateFilter] = useState('7d');
  const [districtFilter, setDistrictFilter] = useState('All');
  const [circuitFilter, setCircuitFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // CRUD Management States
  const [editingLocation, setEditingLocation] = useState<Destination | null>(null);
  const [isAddingLocation, setIsAddingLocation] = useState(false);
  const [editingCircuit, setEditingCircuit] = useState<Circuit | null>(null);
  const [isAddingCircuit, setIsAddingCircuit] = useState(false);

  // District & Category Management States
  const [editingDistrict, setEditingDistrict] = useState<District | null>(null);
  const [isAddingDistrict, setIsAddingDistrict] = useState(false);
  const [distId, setDistId] = useState('');
  const [distName, setDistName] = useState('');
  const [distNameMr, setDistNameMr] = useState('');
  const [districtSearchQuery, setDistrictSearchQuery] = useState('');

  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const [catId, setCatId] = useState('');
  const [catName, setCatName] = useState('');
  const [catNameMr, setCatNameMr] = useState('');
  const [categorySearchQuery, setCategorySearchQuery] = useState('');

  // Search in location list
  const [locationSearchQuery, setLocationSearchQuery] = useState('');

  // New Location Form States
  const [locName, setLocName] = useState('');
  const [locNameMr, setLocNameMr] = useState('');
  const [locDistrict, setLocDistrict] = useState('Pune');
  const [locCategory, setLocCategory] = useState('hill_station');
  const [locCircuits, setLocCircuits] = useState<string[]>([]);
  const [locGeofence, setLocGeofence] = useState(150);
  const [locLat, setLocLat] = useState(18.5204);
  const [locLng, setLocLng] = useState(73.8567);
  const [locImageUrl, setLocImageUrl] = useState('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600&q=80');
  const [locStamp, setLocStamp] = useState('🧗‍♂️');
  const [locDesc, setLocDesc] = useState('');
  const [locDescMr, setLocDescMr] = useState('');
  const [locHistory, setLocHistory] = useState('');
  const [locHistoryMr, setLocHistoryMr] = useState('');
  const [locCulture, setLocCulture] = useState('');
  const [locCultureMr, setLocCultureMr] = useState('');
  const [locFood, setLocFood] = useState('');
  const [locFoodMr, setLocFoodMr] = useState('');

  // POI (Points of Interest / Sightseeing Spots) Form States
  const [editingPoiIndex, setEditingPoiIndex] = useState<number | null>(null);
  const [editingPoiDestId, setEditingPoiDestId] = useState<string | null>(null);
  const [isAddingPoi, setIsAddingPoi] = useState(false);
  const [poiDestinationId, setPoiDestinationId] = useState('');
  const [poiCategory, setPoiCategory] = useState('Photography Point');
  const [poiCategoryMr, setPoiCategoryMr] = useState('छायाचित्रण बिंदू');
  const [poiName, setPoiName] = useState('');
  const [poiNameMr, setPoiNameMr] = useState('');
  const [poiDesc, setPoiDesc] = useState('');
  const [poiDescMr, setPoiDescMr] = useState('');
  const [poiSearchQuery, setPoiSearchQuery] = useState('');
  const [poiFilterDestId, setPoiFilterDestId] = useState('All');
  const [poiFilterCategory, setPoiFilterCategory] = useState('All');

  // New Circuit Form States
  const [cirId, setCirId] = useState('');
  const [cirName, setCirName] = useState('');
  const [cirNameMr, setCirNameMr] = useState('');
  const [cirDesc, setCirDesc] = useState('');
  const [cirDescMr, setCirDescMr] = useState('');
  const [cirColor, setCirColor] = useState('bg-gradient-to-r from-amber-500 to-orange-600');
  const [cirAccentColor, setCirAccentColor] = useState('border-amber-500');
  const [cirDestinations, setCirDestinations] = useState<string[]>([]);

  // Quiz Management States (Insert, Update, Delete Q/A per Destination)
  const [quizzesList, setQuizzesList] = useState<Quiz[]>(STATIC_QUIZZES);
  const [selectedQuizDestId, setSelectedQuizDestId] = useState<string>('lonavala');
  const [isAddingQuestion, setIsAddingQuestion] = useState<boolean>(false);
  const [editingQuestionIndex, setEditingQuestionIndex] = useState<number | null>(null);

  const [qQuestion, setQQuestion] = useState('');
  const [qOpt0, setQOpt0] = useState('');
  const [qOpt1, setQOpt1] = useState('');
  const [qOpt2, setQOpt2] = useState('');
  const [qOpt3, setQOpt3] = useState('');
  const [qCorrect, setQCorrect] = useState<number>(0);
  const [qExplanation, setQExplanation] = useState('');
  const [qXpReward, setQXpReward] = useState<number>(50);

  // User Selfie / Photo Verification States
  const [selfieSubmissions, setSelfieSubmissions] = useState<SelfieSubmission[]>([
    {
      id: 'sub_1',
      userId: 'usr_101',
      userName: 'Aniket Patil',
      destinationId: 'lonavala',
      destinationName: 'Lonavala Tiger Point',
      photoUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
      submittedAt: '12 mins ago',
      status: 'pending'
    },
    {
      id: 'sub_2',
      userId: 'usr_102',
      userName: 'Shreya Deshmukh',
      destinationId: 'shaniwarwada',
      destinationName: 'Shaniwar Wada Palace',
      photoUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=400&q=80',
      submittedAt: '35 mins ago',
      status: 'pending'
    },
    {
      id: 'sub_3',
      userId: 'usr_103',
      userName: 'Rohan More',
      destinationId: 'ellora',
      destinationName: 'Ellora Caves Complex',
      photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
      submittedAt: '2 hours ago',
      status: 'verified'
    }
  ]);

  // Badges Added / Management Screen States
  const [badgesList, setBadgesList] = useState<Badge[]>([
    { id: 'b1', name: 'Monsoon Explorer', description: 'Visited Lonavala during peak monsoon season', motif: '🧗‍♂️', xpRequired: 50, category: 'Hill Station' },
    { id: 'b2', name: 'Heritage Guardian', description: 'Explored historic forts and ancient UNESCO cave systems', motif: '🛡️', xpRequired: 100, category: 'Heritage' },
    { id: 'b3', name: 'Wildlife Ranger', description: 'Spotted tigers and rare flora in Tadoba Reserve', motif: '🐅', xpRequired: 150, category: 'Wildlife' },
    { id: 'b4', name: 'Sahyadri Climber', description: 'Scaled Sahyadri mountain trekking circuits', motif: '🏔️', xpRequired: 200, category: 'Adventure' },
    { id: 'b5', name: 'Trivia Master', description: 'Scored 100% on 5 destination trivia quizzes', motif: '🎓', xpRequired: 100, category: 'Quiz' },
    { id: 'b6', name: 'Community Builder', description: 'Referred fellow travellers to the Maharashtra Tourism app', motif: '👥', xpRequired: 50, category: 'Social' }
  ]);

  const [isAddingBadge, setIsAddingBadge] = useState(false);
  const [editingBadge, setEditingBadge] = useState<Badge | null>(null);

  const [badgeName, setBadgeName] = useState('');
  const [badgeNameMr, setBadgeNameMr] = useState('');
  const [badgeDesc, setBadgeDesc] = useState('');
  const [badgeDescMr, setBadgeDescMr] = useState('');
  const [badgeMotif, setBadgeMotif] = useState('🏅');
  const [badgeCategory, setBadgeCategory] = useState('Heritage');
  const [badgeXpReq, setBadgeXpReq] = useState(50);

  // Live timer for online users simulation and active triggers
  const [onlineUsers, setOnlineUsers] = useState(14);
  useEffect(() => {
    const interval = setInterval(() => {
      setOnlineUsers(prev => {
        const delta = Math.random() > 0.5 ? 1 : -1;
        return Math.max(8, Math.min(25, prev + delta));
      });
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Helper values derived from current session user to show real-time integration
  const registeredCount = profile ? 18451 : 18450;
  const activeCount = profile ? 1421 : 1420;
  const checkInCount = profile ? 3204 + (profile.checkedInDestinations ? profile.checkedInDestinations.length : 0) : 3204;
  const userXpEarned = profile ? profile.xp : 0;
  const userLevel = profile ? profile.level : 1;
  const stampsCount = profile ? (profile.checkedInDestinations ? profile.checkedInDestinations.length : 0) : 0;
  const badgesCount = profile ? (profile.badges ? profile.badges.length : 0) : 0;

  // Render sub-tabs navigation
  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity, desc: 'Core platform overview and KPIs' },
    { id: 'locations', label: 'Manage Locations', icon: MapPin, desc: 'Add, edit, or delete tourist destinations' },
    { id: 'circuits', label: 'Manage Circuits', icon: SlidersHorizontal, desc: 'Add, edit, or delete tourist circuits' },
    { id: 'pois', label: 'Manage POIs', icon: Compass, desc: 'Add, edit, or delete points of interest' },
    { id: 'districts_categories', label: 'Districts & Categories', icon: Globe, desc: 'Add, edit, or delete districts and categories' },
    { id: 'travelers', label: 'Travelers Directory', icon: Users, desc: 'All registered traveler profiles with all details' },
    { id: 'gps', label: 'GPS Analytics', icon: MapPin, desc: 'Spatial check-ins & location heatmaps' },
    { id: 'quiz', label: 'Quiz & Photos', icon: HelpCircle, desc: 'Destination Q/A CRUD and user selfie photo verifications' },
    { id: 'badges', label: 'Manage Badges', icon: Award, desc: 'Add, edit, or delete merit badges' },
    { id: 'gamification', label: 'Gamification', icon: Award, desc: 'XP logs, leaderboard tracking & badge stats' },
    { id: 'passport', label: 'Virtual Passport', icon: BookOpen, desc: 'Stamp distribution ledger & progress counters' },
    { id: 'reports', label: 'Reports', icon: FileSpreadsheet, desc: 'Export analytical spreadsheets and documents' },
  ] as const;

  // Handle Mock Report Downloads
  const handleExport = (format: 'Excel' | 'PDF', reportType: string) => {
    const filtersInfo = `Filters Applied: Date [${dateFilter}], District [${districtFilter}], Circuit [${circuitFilter}]`;
    alert(`Successfully generated and downloaded ${reportType} as ${format}.\n\n${filtersInfo}\nRecords exported: ${reportType === 'GPS Report' ? checkInCount : '12,540'}`);
  };

  if (!isLoggedIn) {
    const handleLoginSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (adminUser === 'admin' && adminPass === 'admin') {
        localStorage.setItem('mah_admin_logged_in', 'true');
        setIsLoggedIn(true);
        setLoginError('');
        addLog("Administrator console unlocked successfully.", "success");
      } else {
        setLoginError('Invalid username or password. Please try again.');
        addLog("Failed admin login attempt.", "warn");
      }
    };

    return (
      <div className="flex flex-col h-full items-center justify-center p-6 bg-slate-950/95 text-slate-300 rounded-2xl border border-slate-850">
        <div className="w-full max-w-sm bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5">
          <div className="text-center space-y-2">
            <div className="mx-auto w-12 h-12 bg-amber-500/10 border border-amber-500/30 rounded-xl flex items-center justify-center text-amber-400">
              <Lock className="w-6 h-6 animate-pulse" />
            </div>
            <h2 className="text-sm font-black text-white uppercase tracking-wider">MahaPassport Portal</h2>
            <p className="text-[10px] text-slate-400 font-medium">Government of Maharashtra Tourism Admin Lock</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                value={adminUser}
                onChange={(e) => setAdminUser(e.target.value)}
                placeholder="Enter admin username"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider">Password</label>
              <input 
                type="password" 
                value={adminPass}
                onChange={(e) => setAdminPass(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-amber-500 font-mono"
                required
              />
            </div>

            {loginError && (
              <p className="text-[10px] text-rose-450 font-semibold text-center">{loginError}</p>
            )}

            <button 
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-black rounded-xl text-xs hover:from-amber-400 hover:to-orange-500 transition shadow-lg shadow-amber-500/10"
            >
              Sign In to Dashboard
            </button>
          </form>

          <div className="pt-2 border-t border-slate-850 text-center space-y-1">
            <p className="text-[9px] text-slate-500 font-medium">Demo Access Credentials:</p>
            <p className="text-[9px] text-amber-500/80 font-mono bg-slate-950/40 py-1 rounded-lg border border-slate-850">
              admin / admin
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full min-h-0 w-full bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl relative">
      {/* Real-time Global Filters Control Bar */}
      <div className="p-2 bg-slate-950/60 border-b border-slate-850 flex items-center justify-between gap-1.5 shrink-0 overflow-x-auto whitespace-nowrap scrollbar-none">
        <div className="flex items-center gap-1 shrink-0">
          <SlidersHorizontal className="w-3 h-3 text-amber-500" />
          <span className="text-[8px] font-black uppercase tracking-wider text-slate-400">Filters:</span>
        </div>
        
        <div className="flex gap-1.5 items-center shrink-0">
          {/* Timeframe selector */}
          <select 
            value={dateFilter} 
            onChange={(e) => setDateFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] font-extrabold rounded-lg px-2 py-0.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="all">All Time</option>
          </select>

          {/* District Selector */}
          <select 
            value={districtFilter} 
            onChange={(e) => setDistrictFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] font-extrabold rounded-lg px-2 py-0.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="All">All Districts</option>
            {districts.map(dist => (
              <option key={dist.id} value={dist.name}>{dist.name}</option>
            ))}
          </select>

          {/* Circuit Selector */}
          <select 
            value={circuitFilter} 
            onChange={(e) => setCircuitFilter(e.target.value)}
            className="bg-slate-900 border border-slate-800 text-slate-300 text-[9px] font-extrabold rounded-lg px-2 py-0.5 focus:outline-none focus:border-amber-500 cursor-pointer"
          >
            <option value="All">All Circuits</option>
            <option value="Hill Stations">Hill Stations</option>
            <option value="Heritage">Ajanta Heritage</option>
            <option value="Wildlife">Deccan Wildlife</option>
          </select>

          {/* Static Sign Out */}
          <button
            onClick={() => {
              localStorage.removeItem('mah_admin_logged_in');
              setIsLoggedIn(false);
              addLog("Administrator signed out.", "info");
            }}
            className="flex items-center gap-1 px-2 py-1 rounded bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-[8px] font-bold transition cursor-pointer"
          >
            <LogOut className="w-2.5 h-2.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation Grid */}
      <div className="p-2 bg-slate-950/40 border-b border-slate-850 overflow-x-auto whitespace-nowrap scrollbar-none flex gap-1 shrink-0">
        {tabs.map(t => {
          const Icon = t.icon;
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-bold transition-all relative ${
                isActive 
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md shadow-amber-500/10' 
                  : 'text-slate-400 hover:text-white hover:bg-slate-900'
              }`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Main Analytics Content Area */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-[11px] text-slate-300 bg-slate-900/10 custom-scrollbar">

        {/* TAB 1: DASHBOARD OVERVIEW */}
        {activeTab === 'dashboard' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Real-time KPI Card Row */}
            <div className="grid grid-cols-3 gap-2.5">
              <div className="bg-slate-950/80 border border-slate-850 p-3 rounded-xl space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Total Registered</span>
                  <Users className="w-3.5 h-3.5 text-slate-500" />
                </div>
                <p className="text-base font-black text-white">{registeredCount.toLocaleString()}</p>
              </div>

              <div className="bg-slate-950/80 border border-slate-850 p-3 rounded-xl space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Daily Active (DAU)</span>
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                </div>
                <p className="text-base font-black text-white">{activeCount.toLocaleString()}</p>
               </div>

              <div className="bg-slate-950/80 border border-slate-850 p-3 rounded-xl space-y-1">
                <div className="flex justify-between items-start">
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-wider">Weekly Active (WAU)</span>
                  <Activity className="w-3.5 h-3.5 text-indigo-400" />
                </div>
                <p className="text-base font-black text-white">12,480</p>
              </div>
            </div>

            {/* Additional KPIs */}
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850/60 text-center">
                <span className="block text-[7px] text-slate-400 font-bold uppercase">Monthly Active (MAU)</span>
                <span className="text-xs font-black text-slate-200">48,250</span>
              </div>
              <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-850/60 text-center">
                <span className="block text-[7px] text-slate-400 font-bold uppercase">New Reg Today</span>
                <span className="text-xs font-black text-amber-500">148</span>
              </div>
             
            </div>

           
          </div>
        )}

        {/* TAB 2: GPS ANALYTICS */}
        {activeTab === 'gps' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-slate-950 p-2.5 border border-slate-850 rounded-xl text-center">
                <span className="block text-[7px] text-slate-400 font-bold uppercase">Total GPS Check-ins</span>
                <span className="text-sm font-black text-white">{checkInCount}</span>
              </div>
              <div className="bg-slate-950 p-2.5 border border-slate-850 rounded-xl text-center">
                <span className="block text-[7px] text-slate-400 font-bold uppercase">Today's Check-ins</span>
                <span className="text-sm font-black text-amber-500">142</span>
              </div>
            </div>

            {/* Checkins by Destination Table */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden">
              <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-850 flex justify-between items-center">
                <span className="text-[8px] font-black uppercase text-slate-300 tracking-wider">Top Visited Locations (Live stats)</span>
                <span className="text-[8px] text-slate-500 font-mono">Geofenced Radius</span>
              </div>
              <div className="p-1">
                <table className="w-full text-[9px] text-left border-collapse">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-900">
                      <th className="p-2 uppercase font-bold">Destination</th>
                      <th className="p-2 uppercase font-bold">District</th>
                      <th className="p-2 uppercase font-bold text-right">Visitor Ratio</th>
                      <th className="p-2 uppercase font-bold text-right">Total Visits</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60 font-medium">
                    {[
                      { name: 'Lonavala Tiger Point', dist: 'Pune', ratio: '42%', total: 1345, bar: 'bg-amber-500' },
                      { name: 'Shaniwar Wada Palace', dist: 'Pune', ratio: '26%', total: 833, bar: 'bg-cyan-500' },
                      { name: 'Ellora Caves complex', dist: 'Aurangabad', ratio: '18%', total: 576, bar: 'bg-emerald-500' },
                      { name: 'Tadoba Reserve Gate', dist: 'Chandrapur', ratio: '10%', total: 320, bar: 'bg-violet-500' },
                      { name: 'Matheran Viewpoint', dist: 'Raigad', ratio: '4%', total: 130, bar: 'bg-indigo-500' },
                    ].map((loc, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/20">
                        <td className="p-2 text-slate-200 font-bold">{loc.name}</td>
                        <td className="p-2 text-slate-400">{loc.dist}</td>
                        <td className="p-2">
                          <div className="flex items-center gap-1.5 justify-end">
                            <span className="text-slate-300 font-bold font-mono">{loc.ratio}</span>
                            <div className="w-10 h-1 bg-slate-800 rounded-full overflow-hidden">
                              <div className={`h-full ${loc.bar}`} style={{ width: loc.ratio }} />
                            </div>
                          </div>
                        </td>
                        <td className="p-2 text-right font-mono text-slate-400">{loc.total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Circuit Engagement Indexes */}
            <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
              <h4 className="text-[9px] font-black uppercase text-slate-300 tracking-wider">Circuit Engagement Indexes</h4>
              <div className="space-y-2">
                {[
                  { name: 'Sahyadri Hill Stations', pct: 88, color: 'from-amber-500 to-yellow-400', label: '88% Completion rate' },
                  { name: 'Ajanta Caves Heritage', pct: 64, color: 'from-cyan-500 to-blue-400', label: '64% Completion rate' },
                  { name: 'Deccan Wildlife Wilderness', pct: 41, color: 'from-emerald-500 to-teal-400', label: '41% Completion rate' },
                ].map((c, idx) => (
                  <div key={idx} className="space-y-1">
                    <div className="flex justify-between text-[9px] font-bold">
                      <span className="text-slate-300">{c.name}</span>
                      <span className="text-slate-400">{c.label}</span>
                    </div>
                    <div className="h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className={`h-full bg-gradient-to-r ${c.color}`} style={{ width: `${c.pct}%` }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Broadcast Notification to Travelers */}
            {onTriggerAlert && (
              <div className="p-3.5 bg-amber-950/20 border border-amber-500/20 rounded-xl space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-[9px] font-black uppercase text-amber-400 tracking-wider flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5" />
                    Broadcast Push Advisory
                  </span>
                  <span className="text-[8px] text-slate-500 font-mono">Live Sync</span>
                </div>
                <p className="text-[9px] text-slate-400">
                  Transmit an instant travel advisory or weather bulletin to all active traveler smartphones.
                </p>
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      onTriggerAlert(
                        '🚨 Heavy Monsoon Advisory',
                        'Heavy rains reported in Lonavala and Mahabaleshwar. Take scenic caution near Ghat roads!',
                        'alert',
                        'lonavala'
                      );
                      addLog('Admin broadcasted Monsoon Weather alert.', 'warn');
                    }}
                    className="p-2 bg-slate-900 hover:bg-slate-850 border border-rose-500/30 rounded-lg text-left transition text-rose-400 hover:text-rose-300 cursor-pointer"
                  >
                    <div className="text-[9px] font-bold truncate">🚨 Weather Advisory</div>
                    <div className="text-[7px] text-slate-500">Alert Ghat Travelers</div>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      onTriggerAlert(
                        '🐯 Tadoba Wildlife Flash',
                        'Tiger sighting reported near Moharli gate. Evening safaris starting at 3 PM!',
                        'tip',
                        'tadoba'
                      );
                      addLog('Admin broadcasted Tadoba Safari tip.', 'info');
                    }}
                    className="p-2 bg-slate-900 hover:bg-slate-850 border border-amber-500/30 rounded-lg text-left transition text-amber-400 hover:text-amber-300 cursor-pointer"
                  >
                    <div className="text-[9px] font-bold truncate">🐯 Wildlife Bulletin</div>
                    <div className="text-[7px] text-slate-500">Alert Safari Zone</div>
                  </button>
                </div>
              </div>
            )}

          
          </div>
        )}

        {/* TAB: TRAVELERS DIRECTORY */}
        {activeTab === 'travelers' && (
          <div className="space-y-4 text-left animate-fadeIn">
            {/* Header card with count */}
            <div className="bg-slate-950/60 border border-slate-850 p-4 rounded-xl">
              <span className="text-[8px] font-black tracking-wider text-amber-400 uppercase block mb-1">State Traveler Directory</span>
              <div className="flex justify-between items-center">
                <h3 className="text-xs font-black text-white uppercase">Registered Travelers</h3>
                
              </div>
            </div>

            {/* Search user list */}
            <div className="relative">
              <input
                type="text"
                placeholder="Filter by name, district, or passport ID..."
                value={userSearchQuery}
                onChange={(e) => setUserSearchQuery(e.target.value)}
                className="w-full bg-slate-950/40 border border-slate-800/80 rounded-xl pl-3.5 pr-8 py-2 text-xs text-white focus:outline-none focus:border-amber-500 transition placeholder-slate-500 font-medium font-sans"
              />
              {userSearchQuery && (
                <button
                  onClick={() => setUserSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Users list */}
            <div className="space-y-2.5">
              {allRegisteredUsers
                .filter(u => {
                  const q = userSearchQuery.toLowerCase();
                  return (
                    u.name.toLowerCase().includes(q) ||
                    u.district.toLowerCase().includes(q) ||
                    u.referralCode.toLowerCase().includes(q)
                  );
                })
                .map((u) => {
                  const isSelf = profile && profile.referralCode === u.referralCode;
                  const isExpanded = expandedUserId === u.referralCode || (expandedUserId === null && isSelf && !userSearchQuery);
                  
                  return (
                    <div
                      key={u.referralCode || 'guest-user'}
                      className={`border rounded-2xl p-3.5 transition-all cursor-pointer ${
                        isExpanded 
                          ? 'bg-slate-900 border-amber-500/40 shadow-lg' 
                          : 'bg-slate-950/40 border-slate-800/50 hover:bg-slate-900/40'
                      }`}
                      onClick={() => setExpandedUserId(expandedUserId === u.referralCode ? '' : u.referralCode)}
                    >
                      {/* Header Row */}
                      <div className="flex justify-between items-start gap-2.5">
                        <div className="flex items-center gap-3 min-w-0">
                          {/* Avatar */}
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs shrink-0 ${
                            isSelf 
                              ? 'bg-gradient-to-br from-amber-500 to-[#E86B21] text-slate-950 font-black' 
                              : 'bg-slate-800 text-white'
                          }`}>
                            {u.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                          </div>
                          
                          <div className="min-w-0">
                            <div className="flex items-center gap-1.5 flex-wrap">
                              <span className="font-extrabold text-xs text-white truncate max-w-[130px]">
                                {u.name}
                              </span>
                              {isSelf && (
                                <span className="text-[8px] bg-amber-500/10 border border-amber-500/30 text-amber-400 font-extrabold px-1.5 py-0.2 rounded uppercase tracking-widest">
                                  YOU
                                </span>
                              )}
                            </div>
                            <span className="block text-[10px] text-slate-400 mt-0.5">
                              {u.district || 'Pune'} District • {u.levelTitle}
                            </span>
                          </div>
                        </div>

                        <div className="text-right shrink-0">
                          <span className="block text-xs font-black text-amber-400 font-mono">
                            {u.xp} XP
                          </span>
                          <span className="text-[9px] bg-slate-800/80 text-slate-300 font-black px-1.5 py-0.5 rounded-md mt-1 block font-sans">
                            Lvl {u.level}
                          </span>
                        </div>
                      </div>

                      {/* Collapsible Details */}
                      {isExpanded && (
                        <div 
                          className="mt-3 pt-3 border-t border-slate-800/60 text-xs space-y-3.5"
                          onClick={(e) => e.stopPropagation()} // prevent toggle
                        >
                          {/* Detail Grid */}
                          <div className="grid grid-cols-2 gap-y-2.5 gap-x-3 bg-slate-950/40 p-2.5 rounded-xl border border-slate-850">
                            <div>
                              <span className="block text-[8px] text-slate-500 uppercase tracking-wider font-bold">Passport ID</span>
                              <span className="font-mono text-[10px] font-bold text-slate-200">
                                {u.referralCode || 'GUEST-ACCESS-ONLY'}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[8px] text-slate-500 uppercase tracking-wider font-bold">Mobile Number</span>
                              <span className="font-medium text-[10px] text-slate-200">
                                {u.mobile ? `+91 ${u.mobile}` : 'Not registered (Guest)'}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[8px] text-slate-500 uppercase tracking-wider font-bold">Age Segment</span>
                              <span className="font-medium text-[10px] text-slate-200">
                                {u.ageBand || 'Not Specified'}
                              </span>
                            </div>
                            <div>
                              <span className="block text-[8px] text-slate-500 uppercase tracking-wider font-bold">Sync Language</span>
                              <span className="font-medium text-[10px] text-slate-200 uppercase">
                                {u.language === 'mr' ? 'मराठी' : 'English'}
                              </span>
                            </div>
                            <div className="col-span-2">
                              <span className="block text-[8px] text-slate-500 uppercase tracking-wider font-bold">Nationality & Base State</span>
                              <span className="font-medium text-[10px] text-slate-200">
                                {u.state || 'Maharashtra'}, {u.country || 'India'}
                              </span>
                            </div>
                          </div>

                          {/* Passport Stamps Collection */}
                          <div>
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">Unlocked Passport Stamps</span>
                              <span className="text-[9px] text-amber-400 font-bold">{u.checkedInDestinations.length} Stamps</span>
                            </div>
                            {u.checkedInDestinations.length === 0 ? (
                              <p className="text-[10px] text-slate-500 italic">No heritage stamps unlocked yet.</p>
                            ) : (
                              <div className="flex flex-wrap gap-1.5">
                                {u.checkedInDestinations.map(destId => {
                                  const dest = destinations.find(d => d.id === destId);
                                  return (
                                    <div 
                                      key={destId} 
                                      onClick={() => {
                                        if (dest) {
                                          setUserLat(dest.lat + 0.001); // teleport near dest
                                          setUserLng(dest.lng + 0.001);
                                          addLog(`Simulated developer teleport warp near ${dest.name}.`, 'system');
                                        }
                                      }}
                                      className="text-[10px] bg-slate-950/80 border border-slate-800 text-slate-200 px-2.5 py-1 rounded-xl flex items-center gap-1.5 hover:border-amber-500/40 hover:bg-slate-900 transition"
                                      title="Click to warp simulator coordinates to this stamp landmark!"
                                    >
                                      <span>{dest?.stampMotif || '📍'}</span>
                                      <span className="font-bold">{dest?.name || destId}</span>
                                    </div>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                          {/* Merit Badges Earned */}
                          <div>
                            <div className="flex justify-between items-center mb-1.5">
                              <span className="text-[8px] text-slate-400 uppercase tracking-wider font-extrabold">Merit Badges Collection</span>
                              <span className="text-[9px] text-emerald-400 font-bold">{u.badges.length} Badges</span>
                            </div>
                            {u.badges.length === 0 ? (
                              <p className="text-[10px] text-slate-500 italic">No badges unlocked yet.</p>
                            ) : (
                              <div className="flex flex-wrap gap-1.5">
                                {u.badges.map(badge => {
                                  let badgeMotif = '🏅';
                                  if (badge === 'Sahyadri Climber') badgeMotif = '🧗‍♂️';
                                  if (badge === 'Heritage Protector') badgeMotif = '🛡️';
                                  if (badge === 'Wildlife Warrior') badgeMotif = '🦁';
                                  if (badge === 'Trivia Master') badgeMotif = '🎓';
                                  if (badge === 'Monsoon Rookie') badgeMotif = '🌧️';
                                  if (badge === 'Heritage Rookie') badgeMotif = '🏛️';

                                  return (
                                    <span 
                                      key={badge} 
                                      className="text-[9px] bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-extrabold px-2 py-0.5 rounded-lg flex items-center gap-1"
                                    >
                                      <span>{badgeMotif}</span>
                                      <span>{badge}</span>
                                    </span>
                                  );
                                })}
                              </div>
                            )}
                          </div>

                         
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
          </div>
        )}

        {/* TAB: QUIZ & PHOTO VERIFICATION */}
        {activeTab === 'quiz' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Header & Destination Selector for Quiz Management */}
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4 text-amber-500" />
                    <span>Destination Quiz Q/A Management</span>
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Create, modify, or delete questions linked to specific destinations</p>
                </div>

                <div className="flex items-center gap-2 w-full sm:w-auto">
                  <select
                    value={selectedQuizDestId}
                    onChange={(e) => {
                      setSelectedQuizDestId(e.target.value);
                      setIsAddingQuestion(false);
                      setEditingQuestionIndex(null);
                    }}
                    className="bg-slate-900 border border-slate-800 rounded-lg text-[10px] font-bold px-2 py-1.5 text-amber-400 focus:outline-none flex-1 sm:flex-none"
                  >
                    {destinations.map(d => (
                      <option key={d.id} value={d.id}>{d.name} ({d.district})</option>
                    ))}
                  </select>

                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingQuestion(true);
                      setEditingQuestionIndex(null);
                      setQQuestion('');
                      setQOpt0('');
                      setQOpt1('');
                      setQOpt2('');
                      setQOpt3('');
                      setQCorrect(0);
                      setQExplanation('');
                      setQXpReward(50);
                    }}
                    className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[9px] font-black px-2.5 py-1.5 rounded-lg transition shrink-0 cursor-pointer"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Question</span>
                  </button>
                </div>
              </div>

              {/* Add / Edit Question Form */}
              {(isAddingQuestion || editingQuestionIndex !== null) && (
                <div className="p-3 bg-slate-900/90 border border-amber-500/30 rounded-xl space-y-3 mt-2 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                      {editingQuestionIndex !== null ? 'Edit Question' : 'Insert New Destination Question'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingQuestion(false);
                        setEditingQuestionIndex(null);
                      }}
                      className="text-slate-500 hover:text-slate-300 text-[10px] font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div>
                      <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Question Text</label>
                      <input
                        type="text"
                        value={qQuestion}
                        onChange={(e) => setQQuestion(e.target.value)}
                        placeholder="e.g. What sweet treat is famous in Lonavala?"
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-[10px] text-white focus:border-amber-500 focus:outline-none"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Option 1</label>
                        <input
                          type="text"
                          value={qOpt0}
                          onChange={(e) => setQOpt0(e.target.value)}
                          placeholder="Option A"
                          className={`w-full bg-slate-950 border rounded-lg p-1.5 text-[10px] text-white focus:outline-none ${qCorrect === 0 ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Option 2</label>
                        <input
                          type="text"
                          value={qOpt1}
                          onChange={(e) => setQOpt1(e.target.value)}
                          placeholder="Option B"
                          className={`w-full bg-slate-950 border rounded-lg p-1.5 text-[10px] text-white focus:outline-none ${qCorrect === 1 ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Option 3</label>
                        <input
                          type="text"
                          value={qOpt2}
                          onChange={(e) => setQOpt2(e.target.value)}
                          placeholder="Option C"
                          className={`w-full bg-slate-950 border rounded-lg p-1.5 text-[10px] text-white focus:outline-none ${qCorrect === 2 ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800'}`}
                        />
                      </div>
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Option 4</label>
                        <input
                          type="text"
                          value={qOpt3}
                          onChange={(e) => setQOpt3(e.target.value)}
                          placeholder="Option D"
                          className={`w-full bg-slate-950 border rounded-lg p-1.5 text-[10px] text-white focus:outline-none ${qCorrect === 3 ? 'border-amber-500 bg-amber-500/5' : 'border-slate-800'}`}
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Correct Option Index</label>
                        <select
                          value={qCorrect}
                          onChange={(e) => setQCorrect(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-[10px] text-amber-400 font-bold focus:outline-none"
                        >
                          <option value={0}>Option 1 (A)</option>
                          <option value={1}>Option 2 (B)</option>
                          <option value={2}>Option 3 (C)</option>
                          <option value={3}>Option 4 (D)</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">XP Reward</label>
                        <input
                          type="number"
                          value={qXpReward}
                          onChange={(e) => setQXpReward(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-[10px] text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Explanation</label>
                      <input
                        type="text"
                        value={qExplanation}
                        onChange={(e) => setQExplanation(e.target.value)}
                        placeholder="Why this answer is correct..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2 text-[10px] text-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!qQuestion || !qOpt0 || !qOpt1) {
                          alert('Please enter at least a question and two options.');
                          return;
                        }

                        const newQuestionObj: QuizQuestion = {
                          question: qQuestion,
                          options: [qOpt0, qOpt1, qOpt2 || 'N/A', qOpt3 || 'N/A'],
                          correctAnswer: qCorrect,
                          explanation: qExplanation || 'Correct answer verified by tourism authority.'
                        };

                        setQuizzesList(prev => {
                          const existingQuizIndex = prev.findIndex(q => q.destinationId === selectedQuizDestId);
                          if (existingQuizIndex >= 0) {
                            const updated = [...prev];
                            const currentQuiz = updated[existingQuizIndex];
                            let newQuestions = [...currentQuiz.questions];

                            if (editingQuestionIndex !== null) {
                              newQuestions[editingQuestionIndex] = newQuestionObj;
                            } else {
                              newQuestions.push(newQuestionObj);
                            }

                            updated[existingQuizIndex] = {
                              ...currentQuiz,
                              questions: newQuestions,
                              xpReward: qXpReward
                            };
                            return updated;
                          } else {
                            // Create new quiz for destination
                            return [
                              ...prev,
                              {
                                id: `quiz_${selectedQuizDestId}_${Date.now()}`,
                                destinationId: selectedQuizDestId,
                                xpReward: qXpReward,
                                questions: [newQuestionObj]
                              }
                            ];
                          }
                        });

                        addLog(`Saved question for destination "${selectedQuizDestId}".`, 'success');
                        setIsAddingQuestion(false);
                        setEditingQuestionIndex(null);
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2 rounded-lg text-[10px] transition cursor-pointer mt-1"
                    >
                      Save Question to Destination Quiz
                    </button>
                  </div>
                </div>
              )}

              {/* Questions List for Selected Destination */}
              <div className="space-y-2 pt-1">
                {(() => {
                  const currentQuiz = quizzesList.find(q => q.destinationId === selectedQuizDestId);
                  const destObj = destinations.find(d => d.id === selectedQuizDestId);

                  if (!currentQuiz || currentQuiz.questions.length === 0) {
                    return (
                      <div className="p-4 bg-slate-900/40 border border-slate-800 rounded-xl text-center text-slate-500 text-[10px]">
                        No quiz questions exist for <span className="text-slate-300 font-bold">{destObj?.name}</span> yet. Click "+ Add Question" to create one!
                      </div>
                    );
                  }

                  return currentQuiz.questions.map((q, idx) => (
                    <div key={idx} className="p-3 bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                      <div className="flex justify-between items-start gap-2">
                        <div className="space-y-0.5">
                          <span className="text-[8px] font-bold text-amber-500 uppercase tracking-widest">Question #{idx + 1}</span>
                          <h4 className="text-[10px] font-bold text-white">{q.question}</h4>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingQuestionIndex(idx);
                              setIsAddingQuestion(false);
                              setQQuestion(q.question);
                              setQOpt0(q.options[0] || '');
                              setQOpt1(q.options[1] || '');
                              setQOpt2(q.options[2] || '');
                              setQOpt3(q.options[3] || '');
                              setQCorrect(q.correctAnswer);
                              setQExplanation(q.explanation);
                              setQXpReward(currentQuiz.xpReward);
                            }}
                            className="p-1 hover:bg-slate-800 rounded text-amber-400 transition cursor-pointer"
                            title="Edit Question"
                          >
                            <Edit className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Delete question #${idx + 1}?`)) {
                                setQuizzesList(prev => {
                                  return prev.map(quiz => {
                                    if (quiz.destinationId === selectedQuizDestId) {
                                      return {
                                        ...quiz,
                                        questions: quiz.questions.filter((_, i) => i !== idx)
                                      };
                                    }
                                    return quiz;
                                  });
                                });
                                addLog(`Deleted question #${idx + 1} for ${selectedQuizDestId}.`, 'warn');
                              }
                            }}
                            className="p-1 hover:bg-slate-800 rounded text-rose-400 transition cursor-pointer"
                            title="Delete Question"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-1.5 text-[9px]">
                        {q.options.map((opt, oIdx) => (
                          <div
                            key={oIdx}
                            className={`p-1.5 rounded-lg border flex items-center justify-between ${
                              oIdx === q.correctAnswer 
                                ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300 font-bold' 
                                : 'bg-slate-950 border-slate-800/80 text-slate-400'
                            }`}
                          >
                            <span className="truncate">{opt}</span>
                            {oIdx === q.correctAnswer && <CheckCircle className="w-3 h-3 text-emerald-400 shrink-0" />}
                          </div>
                        ))}
                      </div>

                      {q.explanation && (
                        <p className="text-[8px] text-slate-400 italic bg-slate-950 p-1.5 rounded border border-slate-850">
                          💡 <span className="font-bold">Explanation:</span> {q.explanation}
                        </p>
                      )}
                    </div>
                  ));
                })()}
              </div>
            </div>

            {/* USER UPLOADED DESTINATION PHOTO / SELFIE VERIFICATION TAB */}
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Camera className="w-4 h-4 text-cyan-400" />
                    <span>User Uploaded Destination Selfies & Verification</span>
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Display & verify user-submitted photos captured at destinations</p>
                </div>
                <span className="text-[8px] bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 px-2 py-0.5 rounded-full font-mono font-bold uppercase">
                  {selfieSubmissions.filter(s => s.status === 'pending').length} Pending Review
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {selfieSubmissions.map((sub) => (
                  <div key={sub.id} className="p-2.5 bg-slate-900 border border-slate-800 rounded-xl space-y-2 flex flex-col justify-between">
                    <div className="space-y-1.5">
                      <div className="relative rounded-lg overflow-hidden h-28 bg-slate-950 border border-slate-800">
                        <img src={sub.photoUrl} alt="User selfie" className="w-full h-full object-cover" />
                        <span className={`absolute top-1.5 right-1.5 px-1.5 py-0.5 rounded text-[7px] font-black uppercase tracking-wider ${
                          sub.status === 'verified' 
                            ? 'bg-emerald-500 text-slate-950' 
                            : sub.status === 'rejected' 
                            ? 'bg-rose-500 text-white' 
                            : 'bg-amber-500 text-slate-950'
                        }`}>
                          {sub.status}
                        </span>
                      </div>

                      <div>
                        <h4 className="text-[10px] font-black text-white">{sub.userName}</h4>
                        <span className="block text-[8px] text-amber-400 font-bold truncate">📍 {sub.destinationName}</span>
                        <span className="block text-[7px] text-slate-500 font-mono mt-0.5">{sub.submittedAt}</span>
                      </div>
                    </div>

                    {sub.status === 'pending' ? (
                      <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-800">
                        <button
                          type="button"
                          onClick={() => {
                            setSelfieSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, status: 'verified' } : s));
                            addLog(`Admin verified selfie for ${sub.userName} at ${sub.destinationName}! Awarded +50 Bonus XP.`, 'success');
                          }}
                          className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-[8px] font-black py-1 rounded transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <Check className="w-2.5 h-2.5 stroke-[3]" />
                          <span>Approve</span>
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            setSelfieSubmissions(prev => prev.map(s => s.id === sub.id ? { ...s, status: 'rejected' } : s));
                            addLog(`Admin rejected selfie for ${sub.userName}.`, 'warn');
                          }}
                          className="bg-rose-500/20 border border-rose-500/30 text-rose-400 hover:bg-rose-500/30 text-[8px] font-black py-1 rounded transition flex items-center justify-center gap-1 cursor-pointer"
                        >
                          <XCircle className="w-2.5 h-2.5" />
                          <span>Reject</span>
                        </button>
                      </div>
                    ) : (
                      <div className="text-center pt-1">
                        <span className={`text-[8px] font-mono font-bold ${sub.status === 'verified' ? 'text-emerald-400' : 'text-rose-400'}`}>
                          {sub.status === 'verified' ? '✓ VERIFIED (+50 XP AWARDED)' : '✕ REJECTED'}
                        </span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: MANAGE BADGES */}
        {activeTab === 'badges' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-3">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <h3 className="text-xs font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>Manage Merit Badges & Achievements</span>
                  </h3>
                  <p className="text-[9px] text-slate-400 mt-0.5">Create, modify, or delete official travel merit badges awarded to explorers</p>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setIsAddingBadge(true);
                    setEditingBadge(null);
                    setBadgeName('');
                    setBadgeNameMr('');
                    setBadgeDesc('');
                    setBadgeDescMr('');
                    setBadgeMotif('🏅');
                    setBadgeCategory('Heritage');
                    setBadgeXpReq(50);
                  }}
                  className="flex items-center gap-1 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[9px] font-black px-2.5 py-1.5 rounded-lg transition shrink-0 cursor-pointer"
                >
                  <Plus className="w-3 h-3" />
                  <span>Add New Badge</span>
                </button>
              </div>

              {/* Add / Edit Badge Form */}
              {(isAddingBadge || editingBadge !== null) && (
                <div className="p-3 bg-slate-900/90 border border-amber-500/30 rounded-xl space-y-3 mt-2 animate-fadeIn">
                  <div className="flex justify-between items-center border-b border-slate-800 pb-2">
                    <span className="text-[10px] font-black text-amber-400 uppercase tracking-wider">
                      {editingBadge ? 'Edit Badge Details' : 'Insert New Merit Badge'}
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        setIsAddingBadge(false);
                        setEditingBadge(null);
                      }}
                      className="text-slate-500 hover:text-slate-300 text-[10px] font-bold cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="space-y-2">
                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Badge Name (English)</label>
                        <input
                          type="text"
                          value={badgeName}
                          onChange={(e) => setBadgeName(e.target.value)}
                          placeholder="e.g. Fort Conqueror"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-[10px] text-white focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Badge Name (Marathi)</label>
                        <input
                          type="text"
                          value={badgeNameMr}
                          onChange={(e) => setBadgeNameMr(e.target.value)}
                          placeholder="उदा. किल्ले विजेता"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-[10px] text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Badge Motif (Emoji)</label>
                        <input
                          type="text"
                          value={badgeMotif}
                          onChange={(e) => setBadgeMotif(e.target.value)}
                          placeholder="🏅"
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-[10px] text-white text-center focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Category</label>
                        <select
                          value={badgeCategory}
                          onChange={(e) => setBadgeCategory(e.target.value)}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-[10px] text-white focus:outline-none"
                        >
                          <option value="Hill Station">Hill Station</option>
                          <option value="Heritage">Heritage</option>
                          <option value="Wildlife">Wildlife</option>
                          <option value="Adventure">Adventure</option>
                          <option value="Quiz">Quiz</option>
                          <option value="Social">Social</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">XP Required</label>
                        <input
                          type="number"
                          value={badgeXpReq}
                          onChange={(e) => setBadgeXpReq(Number(e.target.value))}
                          className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-[10px] text-white focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[8px] font-bold text-slate-400 uppercase mb-0.5">Description (English)</label>
                      <input
                        type="text"
                        value={badgeDesc}
                        onChange={(e) => setBadgeDesc(e.target.value)}
                        placeholder="Criteria to unlock this badge..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg p-1.5 text-[10px] text-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        if (!badgeName) {
                          alert('Please enter a badge name.');
                          return;
                        }

                        if (editingBadge) {
                          setBadgesList(prev => prev.map(b => b.id === editingBadge.id ? {
                            ...b,
                            name: badgeName,
                            nameMr: badgeNameMr,
                            description: badgeDesc,
                            descriptionMr: badgeDescMr,
                            motif: badgeMotif,
                            category: badgeCategory,
                            xpRequired: badgeXpReq
                          } : b));
                          addLog(`Updated badge "${badgeName}".`, 'success');
                        } else {
                          const newB: Badge = {
                            id: `badge_${Date.now()}`,
                            name: badgeName,
                            nameMr: badgeNameMr,
                            description: badgeDesc,
                            descriptionMr: badgeDescMr,
                            motif: badgeMotif,
                            category: badgeCategory,
                            xpRequired: badgeXpReq
                          };
                          setBadgesList(prev => [...prev, newB]);
                          addLog(`Added new badge "${badgeName}".`, 'success');
                        }

                        setIsAddingBadge(false);
                        setEditingBadge(null);
                      }}
                      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2 rounded-lg text-[10px] transition cursor-pointer mt-1"
                    >
                      {editingBadge ? 'Update Badge' : 'Save New Badge'}
                    </button>
                  </div>
                </div>
              )}

              {/* Badges List */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                {badgesList.map(b => (
                  <div key={b.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0">
                      <span className="text-2xl p-2 bg-slate-950 rounded-xl border border-slate-800 shrink-0">{b.motif}</span>
                      <div className="min-w-0">
                        <h4 className="text-[10px] font-black text-white truncate">{b.name}</h4>
                        <p className="text-[8px] text-slate-400 truncate mt-0.5">{b.description}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-[7px] font-bold text-amber-400 uppercase bg-amber-500/10 px-1.5 py-0.5 rounded">
                            {b.category}
                          </span>
                          <span className="text-[7px] font-mono text-cyan-400 font-bold">
                            {b.xpRequired} XP
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={() => {
                          setEditingBadge(b);
                          setIsAddingBadge(false);
                          setBadgeName(b.name);
                          setBadgeNameMr(b.nameMr || '');
                          setBadgeDesc(b.description);
                          setBadgeDescMr(b.descriptionMr || '');
                          setBadgeMotif(b.motif);
                          setBadgeCategory(b.category || 'Heritage');
                          setBadgeXpReq(b.xpRequired);
                        }}
                        className="p-1.5 hover:bg-slate-800 rounded-lg text-amber-400 transition cursor-pointer"
                        title="Edit Badge"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (confirm(`Delete badge "${b.name}"?`)) {
                            setBadgesList(prev => prev.filter(item => item.id !== b.id));
                            addLog(`Deleted badge "${b.name}".`, 'warn');
                          }
                        }}
                        className="p-1.5 hover:bg-slate-800 rounded-lg text-rose-400 transition cursor-pointer"
                        title="Delete Badge"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 5: GAMIFICATION ANALYTICS */}
        {activeTab === 'gamification' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="grid grid-cols-2 gap-2.5">
              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1">
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Total XP Allocated</span>
                <p className="text-base font-black text-white">{(1254000 + userXpEarned).toLocaleString()}</p>
                <span className="block text-[7px] text-slate-500 font-semibold">Live experience point ledger</span>
              </div>

              <div className="bg-slate-950 p-3 rounded-xl border border-slate-850 space-y-1">
                <span className="block text-[8px] font-bold text-slate-400 uppercase tracking-wider">Certificates Issued</span>
                <p className="text-base font-black text-amber-500">241</p>
                <span className="block text-[7px] text-emerald-400 font-bold">✓ Verifiable Cryptographic keys</span>
              </div>
            </div>

            {/* Levels distribution */}
            <div className="p-3.5 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
              <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider">Explorer Level Distribution</span>
              <div className="space-y-1.5 text-[10px]">
                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Level 1 - Heritage Scout</span>
                  <span className="text-slate-300">58% of explorers</span>
                </div>
                <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-amber-500" style={{ width: '58%' }} />
                </div>

                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Level 2 - Sahyadri Climber</span>
                  <span className="text-slate-300">32% of explorers</span>
                </div>
                <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-cyan-400" style={{ width: '32%' }} />
                </div>

                <div className="flex justify-between font-bold">
                  <span className="text-slate-400">Level 3+ - Maharashtra Legend</span>
                  <span className="text-slate-300">10% of explorers</span>
                </div>
                <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
                  <div className="h-full bg-emerald-400" style={{ width: '10%' }} />
                </div>
              </div>
            </div>

            {/* Badge Statistics */}
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-2">
              <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider">Merit Badge Claim Ratios</span>
              <div className="grid grid-cols-2 gap-2 text-[9px] font-medium text-slate-300 font-mono">
                <div className="bg-slate-900/60 p-2 rounded border border-slate-850/60 flex items-center justify-between">
                  <span>Monsoon Rookie 🧗‍♂️</span>
                  <span className="text-amber-500 font-bold">84%</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded border border-slate-850/60 flex items-center justify-between">
                  <span>Wildlife Warrior 🦁</span>
                  <span className="text-cyan-400 font-bold">34%</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded border border-slate-850/60 flex items-center justify-between">
                  <span>Heritage Protector 🛡️</span>
                  <span className="text-emerald-400 font-bold">28%</span>
                </div>
                <div className="bg-slate-900/60 p-2 rounded border border-slate-850/60 flex items-center justify-between">
                  <span>Trivia Master 🎓</span>
                  <span className="text-indigo-400 font-bold">12%</span>
                </div>
              </div>
            </div>

            {/* Top Leaderboard Monitoring */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden">
              <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-850 flex justify-between items-center">
                <span className="text-[8px] font-black uppercase text-slate-300 tracking-wider">Top 100 Leaderboard Status</span>
                <span className="text-[8px] text-slate-500 font-mono">Verified Players</span>
              </div>
              <div className="p-1">
                <table className="w-full text-[9px] text-left border-collapse">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-900">
                      <th className="p-2 font-bold uppercase">Rank</th>
                      <th className="p-2 font-bold uppercase">Explorer</th>
                      <th className="p-2 font-bold uppercase text-right">Level</th>
                      <th className="p-2 font-bold uppercase text-right">Total XP</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60 font-semibold font-mono">
                    <tr className="text-amber-400 hover:bg-slate-900/20">
                      <td className="p-2">#1</td>
                      <td className="p-2 font-bold text-slate-200">Aniket Patil 🌟</td>
                      <td className="p-2 text-right">Level 6</td>
                      <td className="p-2 text-right">1,620 XP</td>
                    </tr>
                    <tr className="text-cyan-400 hover:bg-slate-900/20">
                      <td className="p-2">#2</td>
                      <td className="p-2 font-bold text-slate-200">Shreya Deshmukh</td>
                      <td className="p-2 text-right">Level 5</td>
                      <td className="p-2 text-right">1,380 XP</td>
                    </tr>
                    <tr className="hover:bg-slate-900/20">
                      <td className="p-2 text-slate-400">#3</td>
                      <td className="p-2 font-bold text-slate-200">Rohan More</td>
                      <td className="p-2 text-right">Level 4</td>
                      <td className="p-2 text-right">1,150 XP</td>
                    </tr>
                    {profile && (
                      <tr className="bg-amber-500/10 text-amber-300 border-t border-amber-500/20">
                        <td className="p-2">#24</td>
                        <td className="p-2 font-bold">{profile.name} (YOU)</td>
                        <td className="p-2 text-right">Level {userLevel}</td>
                        <td className="p-2 text-right">{userXpEarned} XP</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: VIRTUAL PASSPORT */}
        {activeTab === 'passport' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Circuit Stamps Breakdown Table */}
            <div className="bg-slate-950 border border-slate-850 rounded-xl overflow-hidden">
              <div className="px-3 py-2 bg-slate-900/60 border-b border-slate-850 flex justify-between items-center">
                <span className="text-[8px] font-black uppercase text-slate-300 tracking-wider">Stamp Collection Breakdown by Circuit</span>
                <span className="text-[8px] text-amber-500 font-mono font-bold">CIRCUIT-BASED LEDGER</span>
              </div>
              <div className="p-1">
                <table className="w-full text-[9px] text-left border-collapse">
                  <thead>
                    <tr className="text-slate-500 border-b border-slate-900">
                      <th className="p-2 uppercase font-bold">Circuit Name</th>
                      <th className="p-2 uppercase font-bold text-center">Destinations</th>
                      <th className="p-2 uppercase font-bold text-center">User Progress</th>
                      <th className="p-2 uppercase font-bold text-right">Circuit Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-900/60 font-semibold font-mono">
                    {circuits.map(circuit => {
                      const checkedInCount = circuit.destinations.filter(id => profile?.checkedInDestinations.includes(id)).length;
                      const pct = Math.round((checkedInCount / (circuit.destinations.length || 1)) * 100);
                      const isStamped = pct === 100;

                      return (
                        <tr key={circuit.id} className="hover:bg-slate-900/20">
                          <td className="p-2 font-bold text-slate-200">
                            {circuit.name}
                            <span className="block text-[7px] text-slate-500 font-normal">{circuit.nameMr}</span>
                          </td>
                          <td className="p-2 text-center text-slate-400">{circuit.destinations.length} Spots</td>
                          <td className="p-2 text-center">
                            <div className="flex items-center gap-2 justify-center">
                              <div className="w-16 h-1.5 bg-slate-900 rounded-full overflow-hidden">
                                <div className="h-full bg-amber-500 rounded-full" style={{ width: `${pct}%` }} />
                              </div>
                              <span className="text-[8px] text-slate-300">{checkedInCount}/{circuit.destinations.length} ({pct}%)</span>
                            </div>
                          </td>
                          <td className="p-2 text-right">
                            {isStamped ? (
                              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 font-bold text-[8px] uppercase">
                                STAMP VERIFIED
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded-full bg-slate-900 text-slate-500 font-bold text-[8px] uppercase">
                                IN PROGRESS
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB: MANAGE LOCATIONS */}
        {activeTab === 'locations' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-850">
              <div className="relative max-w-xs flex-1">
                <Search className="w-3.5 h-3.5 text-slate-500 absolute left-3 top-2.5" />
                <input
                  type="text"
                  placeholder="Search locations..."
                  value={locationSearchQuery}
                  onChange={(e) => setLocationSearchQuery(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-9 pr-3 py-1.5 text-[10px] text-slate-100 placeholder-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>
              {!isAddingLocation && !editingLocation && (
                <button
                  onClick={() => {
                    setIsAddingLocation(true);
                    setEditingLocation(null);
                    // Reset form states
                    setLocName('');
                    setLocNameMr('');
                    setLocDistrict('Pune');
                    setLocCategory('hill_station');
                    setLocCircuits([]);
                    setLocGeofence(150);
                    setLocLat(18.5204);
                    setLocLng(73.8567);
                    setLocImageUrl('https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600&q=80');
                    setLocStamp('🧗‍♂️');
                    setLocDesc('');
                    setLocDescMr('');
                    setLocHistory('');
                    setLocHistoryMr('');
                    setLocCulture('');
                    setLocCultureMr('');
                    setLocFood('');
                    setLocFoodMr('');
                  }}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-[10px] flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Location</span>
                </button>
              )}
            </div>

            {/* Create or Edit Form */}
            {(isAddingLocation || editingLocation) ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const targetId = editingLocation ? editingLocation.id : locName.toLowerCase().replace(/[^a-z0-9]/g, '_');
                  if (!targetId) {
                    alert("Please enter a valid English name to auto-generate the Location ID.");
                    return;
                  }

                  const newLoc: Destination = {
                    id: targetId,
                    name: locName,
                    nameMr: locNameMr || locName,
                    description: locDesc,
                    descriptionMr: locDescMr || locDesc,
                    district: locDistrict,
                    lat: Number(locLat),
                    lng: Number(locLng),
                    geofenceRadius: Number(locGeofence),
                    category: locCategory,
                    imageUrl: locImageUrl,
                    stampMotif: locStamp,
                    history: locHistory,
                    historyMr: locHistoryMr || locHistory,
                    culture: locCulture,
                    cultureMr: locCultureMr || locCulture,
                    food: locFood,
                    foodMr: locFoodMr || locFood,
                    touristSpots: editingLocation ? (editingLocation.touristSpots || []) : []
                  };

                  let updatedDestinations: Destination[];
                  if (editingLocation) {
                    updatedDestinations = destinations.map(d => d.id === editingLocation.id ? newLoc : d);
                    addLog(`Updated location: ${locName}`, "success");
                  } else {
                    // Check duplicate ID
                    if (destinations.some(d => d.id === targetId)) {
                      alert(`A location with ID '${targetId}' already exists. Please use a unique name.`);
                      return;
                    }
                    updatedDestinations = [...destinations, newLoc];
                    addLog(`Added new location: ${locName}`, "success");
                  }

                  // Sync assigned circuits with circuits list
                  const updatedCircuits = circuits.map(c => {
                    const isSelected = locCircuits.includes(c.id);
                    const hasDest = c.destinations.includes(targetId);
                    if (isSelected && !hasDest) {
                      return { ...c, destinations: [...c.destinations, targetId] };
                    } else if (!isSelected && hasDest) {
                      return { ...c, destinations: c.destinations.filter(id => id !== targetId) };
                    }
                    return c;
                  });

                  onSaveTravelData(updatedDestinations, updatedCircuits);
                  setIsAddingLocation(false);
                  setEditingLocation(null);
                }}
                className="bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-4 animate-fadeIn"
              >
                <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                    {editingLocation ? `Edit Location: ${editingLocation.name}` : 'Add New Tourist Location'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingLocation(false);
                      setEditingLocation(null);
                    }}
                    className="text-[10px] text-slate-500 hover:text-slate-300 font-semibold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={locName}
                      onChange={(e) => setLocName(e.target.value)}
                      placeholder="e.g. Lonavala Hill Station"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Name (Marathi)</label>
                    <input
                      type="text"
                      value={locNameMr}
                      onChange={(e) => setLocNameMr(e.target.value)}
                      placeholder="उदा. लोणावळा हिल स्टेशन"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">District *</label>
                    <select
                      value={locDistrict}
                      onChange={(e) => setLocDistrict(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      {districts.map(dist => (
                        <option key={dist.id} value={dist.name}>{dist.name} ({dist.nameMr})</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Category *</label>
                    <select
                      value={locCategory}
                      onChange={(e) => setLocCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.id}>{cat.name}</option>
                      ))}
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Geofence Radius (m)</label>
                    <input
                      type="number"
                      required
                      value={locGeofence}
                      onChange={(e) => setLocGeofence(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                {/* Multiple Circuit Select Dropdown / Checkboxes */}
                <div className="space-y-1.5 border border-slate-850 p-3 rounded-xl bg-slate-900/40">
                  <div className="flex justify-between items-center">
                    <label className="text-[9px] font-black uppercase text-amber-500 tracking-wider">
                      Select Tourist Circuits (Multiple Circuit Selection)
                    </label>
                    <span className="text-[8px] font-mono text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                      {locCircuits.length} circuit{locCircuits.length !== 1 ? 's' : ''} selected
                    </span>
                  </div>
                  <p className="text-[8px] text-slate-400">
                    Select all tourist circuits that include or connect this destination:
                  </p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-1 max-h-36 overflow-y-auto custom-scrollbar">
                    {circuits.map(cir => {
                      const isChecked = locCircuits.includes(cir.id);
                      return (
                        <div
                          key={cir.id}
                          onClick={() => {
                            if (isChecked) {
                              setLocCircuits(locCircuits.filter(id => id !== cir.id));
                            } else {
                              setLocCircuits([...locCircuits, cir.id]);
                            }
                          }}
                          className={`flex items-center gap-2 p-2 rounded-lg border text-[10px] cursor-pointer transition select-none ${
                            isChecked
                              ? 'bg-amber-500/15 border-amber-500/60 text-white font-bold'
                              : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-slate-200'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isChecked}
                            readOnly
                            className="rounded text-amber-500 bg-slate-900 border-slate-800 focus:ring-0 cursor-pointer"
                          />
                          <div className="min-w-0 flex-1">
                            <span className="block truncate">{cir.name}</span>
                            <span className="block text-[8px] text-slate-500 truncate">{cir.nameMr}</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Latitude *</label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={locLat}
                      onChange={(e) => setLocLat(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Longitude *</label>
                    <input
                      type="number"
                      step="any"
                      required
                      value={locLng}
                      onChange={(e) => setLocLng(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Stamp Emoji *</label>
                    <input
                      type="text"
                      required
                      maxLength={4}
                      value={locStamp}
                      onChange={(e) => setLocStamp(e.target.value)}
                      placeholder="e.g. 🏯"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 text-center"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="text-[8px] font-black uppercase text-slate-400">Featured Image URL</label>
                  <input
                    type="text"
                    value={locImageUrl}
                    onChange={(e) => setLocImageUrl(e.target.value)}
                    placeholder="https://example.com/image.jpg"
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500"
                  />
                </div>

                {/* Tabbed Info Fields (English & Marathi description, history, culture, food) */}
                <div className="border border-slate-850 p-2.5 rounded-lg space-y-3 bg-slate-900/30">
                  <span className="text-[9px] font-bold text-amber-500 uppercase tracking-wider block">Description & Tourist Details</span>
                  
                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase text-slate-500">Brief Overview (English)</label>
                    <textarea
                      rows={2}
                      value={locDesc}
                      onChange={(e) => setLocDesc(e.target.value)}
                      placeholder="Describe the overall destination vibe..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[9px] text-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[8px] font-black uppercase text-slate-500">Brief Overview (Marathi)</label>
                    <textarea
                      rows={2}
                      value={locDescMr}
                      onChange={(e) => setLocDescMr(e.target.value)}
                      placeholder="मराठीत माहिती द्या..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[9px] text-slate-300 focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-3 gap-2">
                    <div>
                      <label className="text-[8px] font-black uppercase text-slate-500">History Details (English)</label>
                      <textarea
                        rows={2}
                        value={locHistory}
                        onChange={(e) => setLocHistory(e.target.value)}
                        placeholder="Historical origins..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[9px] text-slate-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-black uppercase text-slate-500">Culture Details (English)</label>
                      <textarea
                        rows={2}
                        value={locCulture}
                        onChange={(e) => setLocCulture(e.target.value)}
                        placeholder="Cultural aspects..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[9px] text-slate-300 focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-[8px] font-black uppercase text-slate-500">Food Specialties (English)</label>
                      <textarea
                        rows={2}
                        value={locFood}
                        onChange={(e) => setLocFood(e.target.value)}
                        placeholder="Local cuisine items..."
                        className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[9px] text-slate-300 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-850">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingLocation(false);
                      setEditingLocation(null);
                    }}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 font-extrabold rounded-lg text-[10px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-extrabold rounded-lg text-[10px] hover:from-amber-400 hover:to-orange-500 transition cursor-pointer"
                  >
                    {editingLocation ? 'Update Location' : 'Save Location'}
                  </button>
                </div>
              </form>
            ) : (
              /* Locations List */
              <div className="space-y-2">
                {destinations
                  .filter(d => 
                    d.name.toLowerCase().includes(locationSearchQuery.toLowerCase()) || 
                    d.district.toLowerCase().includes(locationSearchQuery.toLowerCase())
                  )
                  .map(dest => (
                    <div key={dest.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between gap-3 hover:border-slate-800 transition">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-center text-base shadow">
                          {dest.stampMotif}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5 flex-wrap">
                            <h5 className="font-bold text-white text-[11px]">{dest.name}</h5>
                            <span className="px-1.5 py-0.5 bg-amber-500/10 text-amber-500 text-[8px] font-black rounded uppercase">
                              {dest.district}
                            </span>
                            {circuits.filter(c => c.destinations.includes(dest.id)).map(c => (
                              <span key={c.id} className="px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[8px] font-bold rounded">
                                🔗 {c.name}
                              </span>
                            ))}
                          </div>
                          <p className="text-[9px] text-slate-500 mt-0.5 line-clamp-1">{dest.description}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 shrink-0">
                        <button
                          onClick={() => {
                            setEditingLocation(dest);
                            setIsAddingLocation(false);
                            // Populate states
                            setLocName(dest.name);
                            setLocNameMr(dest.nameMr);
                            setLocDistrict(dest.district);
                            setLocCategory(dest.category);
                            const assignedCircs = circuits.filter(c => c.destinations.includes(dest.id)).map(c => c.id);
                            setLocCircuits(assignedCircs);
                            setLocGeofence(dest.geofenceRadius);
                            setLocLat(dest.lat);
                            setLocLng(dest.lng);
                            setLocImageUrl(dest.imageUrl);
                            setLocStamp(dest.stampMotif);
                            setLocDesc(dest.description || '');
                            setLocDescMr(dest.descriptionMr || '');
                            setLocHistory(dest.history || '');
                            setLocHistoryMr(dest.historyMr || '');
                            setLocCulture(dest.culture || '');
                            setLocCultureMr(dest.cultureMr || '');
                            setLocFood(dest.food || '');
                            setLocFoodMr(dest.foodMr || '');
                          }}
                          className="p-1.5 bg-slate-900 hover:bg-slate-850 hover:text-amber-500 border border-slate-800 rounded-lg text-slate-400 transition cursor-pointer"
                          title="Edit Location"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm(`Are you sure you want to delete ${dest.name}? This will remove it from all circuits as well.`)) {
                              const updatedDestinations = destinations.filter(d => d.id !== dest.id);
                              // Remove from any circuits containing this destination ID
                              const updatedCircuits = circuits.map(c => ({
                                ...c,
                                destinations: c.destinations.filter(id => id !== dest.id)
                              }));
                              onSaveTravelData(updatedDestinations, updatedCircuits);
                              addLog(`Deleted location: ${dest.name}`, "warn");
                            }
                          }}
                          className="p-1.5 bg-slate-900 hover:bg-slate-850 hover:text-rose-500 border border-slate-800 rounded-lg text-slate-400 transition cursor-pointer"
                          title="Delete Location"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: MANAGE CIRCUITS */}
        {activeTab === 'circuits' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Action Bar */}
            <div className="flex justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-850">
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-wider">Tourist Circuits List</span>
              {!isAddingCircuit && !editingCircuit && (
                <button
                  onClick={() => {
                    setIsAddingCircuit(true);
                    setEditingCircuit(null);
                    // Reset form states
                    setCirId('');
                    setCirName('');
                    setCirNameMr('');
                    setCirDesc('');
                    setCirDescMr('');
                    setCirColor('bg-gradient-to-r from-amber-500 to-orange-600');
                    setCirAccentColor('border-amber-500');
                    setCirDestinations([]);
                  }}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-[10px] flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Circuit</span>
                </button>
              )}
            </div>

            {/* Create or Edit Form */}
            {(isAddingCircuit || editingCircuit) ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const targetId = editingCircuit ? editingCircuit.id : cirId.toLowerCase().replace(/[^a-z0-9]/g, '_');
                  if (!targetId) {
                    alert("Please enter a valid Circuit ID.");
                    return;
                  }

                  const newCir: Circuit = {
                    id: targetId,
                    name: cirName,
                    nameMr: cirNameMr || cirName,
                    description: cirDesc,
                    descriptionMr: cirDescMr || cirDesc,
                    color: cirColor,
                    accentColor: cirAccentColor,
                    destinations: editingCircuit ? editingCircuit.destinations : (cirDestinations || [])
                  };

                  let updatedCircuits: Circuit[];
                  if (editingCircuit) {
                    updatedCircuits = circuits.map(c => c.id === editingCircuit.id ? newCir : c);
                    addLog(`Updated circuit: ${cirName}`, "success");
                  } else {
                    // Check duplicate ID
                    if (circuits.some(c => c.id === targetId)) {
                      alert(`A circuit with ID '${targetId}' already exists. Please use a unique ID.`);
                      return;
                    }
                    updatedCircuits = [...circuits, newCir];
                    addLog(`Created new circuit: ${cirName}`, "success");
                  }

                  onSaveTravelData(destinations, updatedCircuits);
                  setIsAddingCircuit(false);
                  setEditingCircuit(null);
                }}
                className="bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-4 animate-fadeIn"
              >
                <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                    {editingCircuit ? `Edit Circuit: ${editingCircuit.name}` : 'Add New Tourist Circuit'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingCircuit(false);
                      setEditingCircuit(null);
                    }}
                    className="text-[10px] text-slate-500 hover:text-slate-300 font-semibold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                {!editingCircuit && (
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Circuit ID *</label>
                    <input
                      type="text"
                      required
                      value={cirId}
                      onChange={(e) => setCirId(e.target.value)}
                      placeholder="e.g. coastal_forts"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={cirName}
                      onChange={(e) => setCirName(e.target.value)}
                      placeholder="e.g. Coastal Forts Circuit"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Name (Marathi)</label>
                    <input
                      type="text"
                      value={cirNameMr}
                      onChange={(e) => setCirNameMr(e.target.value)}
                      placeholder="उदा. किनारी किल्ले सर्किट"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Tailwind Gradient Color Class</label>
                    <input
                      type="text"
                      required
                      value={cirColor}
                      onChange={(e) => setCirColor(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Tailwind Border Accent Class</label>
                    <input
                      type="text"
                      required
                      value={cirAccentColor}
                      onChange={(e) => setCirAccentColor(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Description (English)</label>
                    <textarea
                      rows={2}
                      value={cirDesc}
                      onChange={(e) => setCirDesc(e.target.value)}
                      placeholder="e.g. Tour historical ocean forts built along the Konkan line..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[9px] text-slate-300 focus:outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Description (Marathi)</label>
                    <textarea
                      rows={2}
                      value={cirDescMr}
                      onChange={(e) => setCirDescMr(e.target.value)}
                      placeholder="मराठीत माहिती द्या..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[9px] text-slate-300 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-850">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingCircuit(false);
                      setEditingCircuit(null);
                    }}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 font-extrabold rounded-lg text-[10px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-extrabold rounded-lg text-[10px] hover:from-amber-400 hover:to-orange-500 transition cursor-pointer"
                  >
                    {editingCircuit ? 'Update Circuit' : 'Save Circuit'}
                  </button>
                </div>
              </form>
            ) : (
              /* Circuits List */
              <div className="space-y-2">
                {circuits.map(cir => (
                  <div key={cir.id} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between gap-3 hover:border-slate-800 transition">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <h5 className="font-bold text-white text-[11px]">{cir.name}</h5>
                        <span className="px-1.5 py-0.5 bg-slate-900 border border-slate-800 text-slate-500 text-[8px] font-mono rounded">
                          {cir.id}
                        </span>
                      </div>
                      <p className="text-[9px] text-slate-500 line-clamp-1">{cir.description}</p>
                      
                      {/* Sub-list of connected location stamps */}
                      <div className="flex items-center gap-1 pt-1">
                        <span className="text-[8px] text-slate-600 font-semibold mr-1">STOPS:</span>
                        {cir.destinations.length === 0 ? (
                          <span className="text-[8px] text-slate-600 font-mono italic text-slate-700">none</span>
                        ) : (
                          cir.destinations.map(destId => {
                            const d = destinations.find(x => x.id === destId);
                            if (!d) return null;
                            return (
                              <span key={destId} className="text-[10px] text-slate-400" title={d.name}>
                                {d.stampMotif}
                              </span>
                            );
                          })
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => {
                          setEditingCircuit(cir);
                          setIsAddingCircuit(false);
                          // Populate states
                          setCirName(cir.name);
                          setCirNameMr(cir.nameMr);
                          setCirDesc(cir.description || '');
                          setCirDescMr(cir.descriptionMr || '');
                          setCirColor(cir.color);
                          setCirAccentColor(cir.accentColor);
                          setCirDestinations(cir.destinations);
                        }}
                        className="p-1.5 bg-slate-900 hover:bg-slate-850 hover:text-amber-500 border border-slate-800 rounded-lg text-slate-400 transition cursor-pointer"
                        title="Edit Circuit"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (confirm(`Are you sure you want to delete circuit '${cir.name}'? This won't delete the physical locations, only their connection structure.`)) {
                            const updatedCircuits = circuits.filter(c => c.id !== cir.id);
                            onSaveTravelData(destinations, updatedCircuits);
                            addLog(`Deleted circuit: ${cir.name}`, "warn");
                          }
                        }}
                        className="p-1.5 bg-slate-900 hover:bg-slate-850 hover:text-rose-500 border border-slate-800 rounded-lg text-slate-400 transition cursor-pointer"
                        title="Delete Circuit"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB: MANAGE POIS (POINTS OF INTEREST) */}
        {activeTab === 'pois' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Header / Action Bar */}
            <div className="flex flex-wrap justify-between items-center bg-slate-950 p-3 rounded-xl border border-slate-850 gap-2">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-500" />
                <span className="text-[10px] font-black uppercase text-slate-300 tracking-wider">
                  Manage Points of Interest (POIs)
                </span>
              </div>
              
              {!isAddingPoi && editingPoiIndex === null && (
                <button
                  onClick={() => {
                    setIsAddingPoi(true);
                    setEditingPoiIndex(null);
                    setEditingPoiDestId(null);
                    setPoiDestinationId(destinations.length > 0 ? destinations[0].id : '');
                    setPoiCategory('Photography Point');
                    setPoiCategoryMr('छायाचित्रण बिंदू');
                    setPoiName('');
                    setPoiNameMr('');
                    setPoiDesc('');
                    setPoiDescMr('');
                  }}
                  className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-[10px] flex items-center gap-1.5 transition active:scale-95 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add POI</span>
                </button>
              )}
            </div>

            {/* Create or Edit POI Form */}
            {(isAddingPoi || editingPoiIndex !== null) ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!poiDestinationId) {
                    alert("Please select a Destination for this POI.");
                    return;
                  }
                  if (!poiName.trim()) {
                    alert("Please enter a POI Name.");
                    return;
                  }

                  const newSpot: TouristSpot = {
                    name: poiName,
                    nameMr: poiNameMr || poiName,
                    category: poiCategory,
                    categoryMr: poiCategoryMr || poiCategory,
                    shortDescription: poiDesc,
                    shortDescriptionMr: poiDescMr || poiDesc
                  };

                  const updatedDestinations = destinations.map(d => {
                    if (d.id === poiDestinationId) {
                      const currentSpots = d.touristSpots ? [...d.touristSpots] : [];
                      if (editingPoiIndex !== null && editingPoiDestId === poiDestinationId) {
                        currentSpots[editingPoiIndex] = newSpot;
                      } else {
                        currentSpots.push(newSpot);
                      }
                      return { ...d, touristSpots: currentSpots };
                    }
                    if (editingPoiDestId && editingPoiDestId !== poiDestinationId && d.id === editingPoiDestId && editingPoiIndex !== null) {
                      const currentSpots = d.touristSpots ? [...d.touristSpots] : [];
                      currentSpots.splice(editingPoiIndex, 1);
                      return { ...d, touristSpots: currentSpots };
                    }
                    return d;
                  });

                  onSaveTravelData(updatedDestinations, circuits);
                  addLog(`${editingPoiIndex !== null ? 'Updated' : 'Created'} POI '${poiName}' for destination '${poiDestinationId}'`, "success");

                  setIsAddingPoi(false);
                  setEditingPoiIndex(null);
                  setEditingPoiDestId(null);
                }}
                className="bg-slate-950 border border-slate-850 rounded-xl p-4 space-y-4 animate-fadeIn"
              >
                <div className="flex justify-between items-center border-b border-slate-850 pb-2">
                  <h4 className="font-bold text-xs text-white uppercase tracking-wider">
                    {editingPoiIndex !== null ? 'Edit Point of Interest (POI)' : 'Add New Point of Interest (POI)'}
                  </h4>
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingPoi(false);
                      setEditingPoiIndex(null);
                      setEditingPoiDestId(null);
                    }}
                    className="text-[10px] text-slate-500 hover:text-slate-300 font-semibold uppercase cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {/* Destination Selection Dropdown */}
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-amber-500 tracking-wider block">
                      1. Select Destination *
                    </label>
                    <select
                      value={poiDestinationId}
                      onChange={(e) => setPoiDestinationId(e.target.value)}
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 cursor-pointer font-bold"
                    >
                      <option value="" disabled>-- Select Destination --</option>
                      {destinations.map(d => (
                        <option key={d.id} value={d.id}>
                          {d.stampMotif} {d.name} ({d.district})
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Category Selection Dropdown */}
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-amber-500 tracking-wider block">
                      2. Select Category *
                    </label>
                    <select
                      value={poiCategory}
                      onChange={(e) => {
                        const val = e.target.value;
                        setPoiCategory(val);
                        const foundCat = categories.find(c => c.name === val);
                        if (foundCat) setPoiCategoryMr(foundCat.nameMr);
                        else setPoiCategoryMr(val);
                      }}
                      required
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500 cursor-pointer font-bold"
                    >
                      <option value="" disabled>-- Select Category --</option>
                      {categories.map(cat => (
                        <option key={cat.id} value={cat.name}>{cat.name} ({cat.nameMr})</option>
                      ))}
                      <option value="Photography Point">Photography Point (छायाचित्रण बिंदू)</option>
                      <option value="Waterfall">Waterfall (धबधबा)</option>
                      <option value="Temple / Sacred">Temple / Sacred (मंदिर / धार्मिक ठिकाण)</option>
                      <option value="Fort / Heritage">Fort / Heritage (किल्ला / वारसा स्थल)</option>
                      <option value="Viewpoint">Viewpoint (व्ह्यू पॉइंट)</option>
                      <option value="Lake / Waterbody">Lake / Waterbody (तलाव / जलाशय)</option>
                      <option value="Cave">Cave (लेणी)</option>
                      <option value="Adventure Spot">Adventure Spot (साहसी ठिकाण)</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">POI Name (English) *</label>
                    <input
                      type="text"
                      required
                      value={poiName}
                      onChange={(e) => setPoiName(e.target.value)}
                      placeholder="e.g. Tiger Point / Bhushi Dam"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">POI Name (Marathi)</label>
                    <input
                      type="text"
                      value={poiNameMr}
                      onChange={(e) => setPoiNameMr(e.target.value)}
                      placeholder="उदा. टायगर पॉइंट / भुशी धरण"
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-[10px] text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Short Description (English)</label>
                    <textarea
                      rows={2}
                      value={poiDesc}
                      onChange={(e) => setPoiDesc(e.target.value)}
                      placeholder="e.g. A cliff top offering breathtaking panoramic valley views..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[9px] text-slate-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[8px] font-black uppercase text-slate-400">Short Description (Marathi)</label>
                    <textarea
                      rows={2}
                      value={poiDescMr}
                      onChange={(e) => setPoiDescMr(e.target.value)}
                      placeholder="मराठीत थोडक्यात माहिती..."
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg p-2 text-[9px] text-slate-300 focus:outline-none focus:border-amber-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-2 pt-2 border-t border-slate-850">
                  <button
                    type="button"
                    onClick={() => {
                      setIsAddingPoi(false);
                      setEditingPoiIndex(null);
                      setEditingPoiDestId(null);
                    }}
                    className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-850 border border-slate-800 text-slate-400 font-extrabold rounded-lg text-[10px] cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-gradient-to-r from-amber-500 to-orange-600 text-slate-950 font-extrabold rounded-lg text-[10px] hover:from-amber-400 hover:to-orange-500 transition cursor-pointer"
                  >
                    {editingPoiIndex !== null ? 'Update POI' : 'Save POI'}
                  </button>
                </div>
              </form>
            ) : (
              /* POIs List View with Filters */
              <div className="space-y-3">
                {/* Filters Bar */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-850">
                  <div className="relative">
                    <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2" />
                    <input
                      type="text"
                      placeholder="Search POIs..."
                      value={poiSearchQuery}
                      onChange={(e) => setPoiSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-2.5 py-1 text-[9px] text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <select
                      value={poiFilterDestId}
                      onChange={(e) => setPoiFilterDestId(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[9px] text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="All">All Destinations ({destinations.length})</option>
                      {destinations.map(d => (
                        <option key={d.id} value={d.id}>{d.stampMotif} {d.name}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <select
                      value={poiFilterCategory}
                      onChange={(e) => setPoiFilterCategory(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[9px] text-white focus:outline-none focus:border-amber-500 cursor-pointer"
                    >
                      <option value="All">All Categories</option>
                      {categories.map(c => (
                        <option key={c.id} value={c.name}>{c.name}</option>
                      ))}
                      <option value="Photography Point">Photography Point</option>
                      <option value="Waterfall">Waterfall</option>
                      <option value="Temple / Sacred">Temple / Sacred</option>
                      <option value="Fort / Heritage">Fort / Heritage</option>
                    </select>
                  </div>
                </div>

                {/* All POIs Flat List */}
                <div className="space-y-2">
                  {(() => {
                    const allPoiItems: { destId: string; destName: string; stampMotif: string; spot: TouristSpot; spotIndex: number }[] = [];
                    destinations.forEach(dest => {
                      if (poiFilterDestId !== 'All' && dest.id !== poiFilterDestId) return;
                      if (dest.touristSpots) {
                        dest.touristSpots.forEach((spot, idx) => {
                          if (poiFilterCategory !== 'All' && spot.category !== poiFilterCategory) return;
                          if (poiSearchQuery) {
                            const q = poiSearchQuery.toLowerCase();
                            const matches = spot.name.toLowerCase().includes(q) || spot.category.toLowerCase().includes(q) || (spot.shortDescription && spot.shortDescription.toLowerCase().includes(q));
                            if (!matches) return;
                          }
                          allPoiItems.push({
                            destId: dest.id,
                            destName: dest.name,
                            stampMotif: dest.stampMotif,
                            spot,
                            spotIndex: idx
                          });
                        });
                      }
                    });

                    if (allPoiItems.length === 0) {
                      return (
                        <div className="p-8 bg-slate-950 border border-slate-850 rounded-xl text-center space-y-2">
                          <Compass className="w-8 h-8 text-slate-600 mx-auto" />
                          <p className="text-[11px] font-bold text-slate-400">No Points of Interest (POIs) found.</p>
                          <p className="text-[9px] text-slate-600">Click "Add POI" above to assign sightseeing spots with category & destination dropdowns.</p>
                        </div>
                      );
                    }

                    return allPoiItems.map((item, key) => (
                      <div key={`${item.destId}_${item.spotIndex}_${key}`} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between gap-3 hover:border-slate-800 transition">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 flex-wrap">
                            <span className="text-[11px] font-black text-white">{item.spot.name}</span>
                            <span className="text-[9px] text-slate-400 font-semibold">({item.spot.nameMr})</span>
                            <span className="px-1.5 py-0.5 bg-amber-500/10 border border-amber-500/20 text-amber-400 text-[8px] font-extrabold rounded-md">
                              📍 Category: {item.spot.category}
                            </span>
                            <span className="px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-[8px] font-extrabold rounded-md flex items-center gap-1">
                              <span>{item.stampMotif}</span>
                              <span>Destination: {item.destName}</span>
                            </span>
                          </div>
                          <p className="text-[9px] text-slate-500 line-clamp-1">{item.spot.shortDescription || 'No description provided.'}</p>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => {
                              setIsAddingPoi(false);
                              setEditingPoiIndex(item.spotIndex);
                              setEditingPoiDestId(item.destId);
                              setPoiDestinationId(item.destId);
                              setPoiCategory(item.spot.category);
                              setPoiCategoryMr(item.spot.categoryMr || item.spot.category);
                              setPoiName(item.spot.name);
                              setPoiNameMr(item.spot.nameMr || item.spot.name);
                              setPoiDesc(item.spot.shortDescription || '');
                              setPoiDescMr(item.spot.shortDescriptionMr || '');
                            }}
                            className="p-1.5 bg-slate-900 hover:bg-slate-850 hover:text-amber-500 border border-slate-800 rounded-lg text-slate-400 transition cursor-pointer"
                            title="Edit POI"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Are you sure you want to delete POI '${item.spot.name}' from ${item.destName}?`)) {
                                const updatedDestinations = destinations.map(d => {
                                  if (d.id === item.destId && d.touristSpots) {
                                    const updatedSpots = [...d.touristSpots];
                                    updatedSpots.splice(item.spotIndex, 1);
                                    return { ...d, touristSpots: updatedSpots };
                                  }
                                  return d;
                                });
                                onSaveTravelData(updatedDestinations, circuits);
                                addLog(`Deleted POI '${item.spot.name}' from destination '${item.destName}'`, "warn");
                              }
                            }}
                            className="p-1.5 bg-slate-900 hover:bg-slate-850 hover:text-rose-500 border border-slate-850 rounded-lg text-slate-400 transition cursor-pointer"
                            title="Delete POI"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB: MANAGE DISTRICTS & CATEGORIES */}
        {activeTab === 'districts_categories' && (
          <div className="space-y-4 animate-fadeIn">
            {/* Split layout: Districts on Left, Categories on Right */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              
              {/* SECTION A: MANAGE DISTRICTS */}
              <div className="space-y-3 bg-slate-950/40 p-3 rounded-2xl border border-slate-850">
                <div className="flex justify-between items-center pb-2 border-b border-slate-850">
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-black uppercase text-white tracking-wider">Manage Districts</span>
                  </div>
                  {!isAddingDistrict && !editingDistrict && (
                    <button
                      onClick={() => {
                        setIsAddingDistrict(true);
                        setEditingDistrict(null);
                        setDistId('');
                        setDistName('');
                        setDistNameMr('');
                      }}
                      className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-md text-[9px] flex items-center gap-1 transition active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  )}
                </div>

                {/* District Form (Add or Edit) */}
                {(isAddingDistrict || editingDistrict) && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const targetId = editingDistrict ? editingDistrict.id : distId.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
                      if (!targetId) {
                        alert("Please enter a valid District ID.");
                        return;
                      }

                      const newDist: District = {
                        id: targetId,
                        name: distName.trim(),
                        nameMr: distNameMr.trim() || distName.trim()
                      };

                      let updatedDistricts: District[];
                      if (editingDistrict) {
                        updatedDistricts = districts.map(d => d.id === editingDistrict.id ? newDist : d);
                        addLog(`Updated district: ${distName}`, "success");
                      } else {
                        if (districts.some(d => d.id === targetId)) {
                          alert(`A district with ID '${targetId}' already exists.`);
                          return;
                        }
                        updatedDistricts = [...districts, newDist];
                        addLog(`Created new district: ${distName}`, "success");
                      }

                      onSaveTravelData(destinations, circuits, updatedDistricts, categories);
                      setIsAddingDistrict(false);
                      setEditingDistrict(null);
                    }}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-3 animate-fadeIn"
                  >
                    <div className="flex justify-between items-center pb-1 border-b border-slate-800">
                      <span className="text-[9px] font-black uppercase text-amber-400">
                        {editingDistrict ? `Edit: ${editingDistrict.name}` : 'New District'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingDistrict(false);
                          setEditingDistrict(null);
                        }}
                        className="text-[9px] text-slate-500 hover:text-slate-300 font-semibold uppercase cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    {!editingDistrict && (
                      <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-slate-400">District ID / Key *</label>
                        <input
                          type="text"
                          required
                          value={distId}
                          onChange={(e) => setDistId(e.target.value)}
                          placeholder="e.g. pune"
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400">Name (English) *</label>
                      <input
                        type="text"
                        required
                        value={distName}
                        onChange={(e) => setDistName(e.target.value)}
                        placeholder="e.g. Pune"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400">Name (Marathi)</label>
                      <input
                        type="text"
                        value={distNameMr}
                        onChange={(e) => setDistNameMr(e.target.value)}
                        placeholder="उदा. पुणे"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-[9px] transition"
                    >
                      {editingDistrict ? 'Update District' : 'Save District'}
                    </button>
                  </form>
                )}

                {/* District Search & List */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search districts..."
                      value={districtSearchQuery}
                      onChange={(e) => setDistrictSearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-[9px] text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
                    {districts
                      .filter(d => 
                        d.name.toLowerCase().includes(districtSearchQuery.toLowerCase()) || 
                        (d.nameMr && d.nameMr.includes(districtSearchQuery))
                      )
                      .map(d => (
                        <div key={d.id} className="p-2 bg-slate-950 border border-slate-850 rounded-lg flex items-center justify-between gap-2 hover:border-slate-800 transition">
                          <div>
                            <span className="font-bold text-white text-[10px]">{d.name}</span>
                            {d.nameMr && (
                              <span className="text-[9px] text-slate-400 ml-1.5 font-medium">({d.nameMr})</span>
                            )}
                            <div className="text-[7px] text-slate-600 font-mono mt-0.5">Key: {d.id}</div>
                          </div>

                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setEditingDistrict(d);
                                setIsAddingDistrict(false);
                                setDistName(d.name);
                                setDistNameMr(d.nameMr || '');
                              }}
                              className="p-1 hover:text-amber-500 text-slate-500 transition cursor-pointer"
                              title="Edit District"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete district ${d.name}? Locations in this district will keep their district name but won't be indexed in the district list.`)) {
                                  const updated = districts.filter(x => x.id !== d.id);
                                  onSaveTravelData(destinations, circuits, updated, categories);
                                  addLog(`Deleted district: ${d.name}`, "warn");
                                }
                              }}
                              className="p-1 hover:text-rose-500 text-slate-500 transition cursor-pointer"
                              title="Delete District"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

              {/* SECTION B: MANAGE CATEGORIES */}
              <div className="space-y-3 bg-slate-950/40 p-3 rounded-2xl border border-slate-850">
                <div className="flex justify-between items-center pb-2 border-b border-slate-850">
                  <div className="flex items-center gap-1.5">
                    <SlidersHorizontal className="w-3.5 h-3.5 text-amber-500" />
                    <span className="text-[10px] font-black uppercase text-white tracking-wider">Manage Categories</span>
                  </div>
                  {!isAddingCategory && !editingCategory && (
                    <button
                      onClick={() => {
                        setIsAddingCategory(true);
                        setEditingCategory(null);
                        setCatId('');
                        setCatName('');
                        setCatNameMr('');
                      }}
                      className="px-2 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-md text-[9px] flex items-center gap-1 transition active:scale-95 cursor-pointer"
                    >
                      <Plus className="w-3 h-3" />
                      <span>Add</span>
                    </button>
                  )}
                </div>

                {/* Category Form (Add or Edit) */}
                {(isAddingCategory || editingCategory) && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      const targetId = editingCategory ? editingCategory.id : catId.trim().toLowerCase().replace(/[^a-z0-9]/g, '_');
                      if (!targetId) {
                        alert("Please enter a valid Category ID.");
                        return;
                      }

                      const newCat: Category = {
                        id: targetId,
                        name: catName.trim(),
                        nameMr: catNameMr.trim() || catName.trim()
                      };

                      let updatedCategories: Category[];
                      if (editingCategory) {
                        updatedCategories = categories.map(c => c.id === editingCategory.id ? newCat : c);
                        addLog(`Updated category: ${catName}`, "success");
                      } else {
                        if (categories.some(c => c.id === targetId)) {
                          alert(`A category with ID '${targetId}' already exists.`);
                          return;
                        }
                        updatedCategories = [...categories, newCat];
                        addLog(`Created new category: ${catName}`, "success");
                      }

                      onSaveTravelData(destinations, circuits, districts, updatedCategories);
                      setIsAddingCategory(false);
                      setEditingCategory(null);
                    }}
                    className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-3 animate-fadeIn"
                  >
                    <div className="flex justify-between items-center pb-1 border-b border-slate-800">
                      <span className="text-[9px] font-black uppercase text-amber-400">
                        {editingCategory ? `Edit: ${editingCategory.name}` : 'New Category'}
                      </span>
                      <button
                        type="button"
                        onClick={() => {
                          setIsAddingCategory(false);
                          setEditingCategory(null);
                        }}
                        className="text-[9px] text-slate-500 hover:text-slate-300 font-semibold uppercase cursor-pointer"
                      >
                        Cancel
                      </button>
                    </div>

                    {!editingCategory && (
                      <div className="space-y-1">
                        <label className="text-[8px] font-black uppercase text-slate-400">Category ID / Key *</label>
                        <input
                          type="text"
                          required
                          value={catId}
                          onChange={(e) => setCatId(e.target.value)}
                          placeholder="e.g. coastal_beach"
                          className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none focus:border-amber-500 font-mono"
                        />
                      </div>
                    )}

                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400">Name (English) *</label>
                      <input
                        type="text"
                        required
                        value={catName}
                        onChange={(e) => setCatName(e.target.value)}
                        placeholder="e.g. Hill Station"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-[8px] font-black uppercase text-slate-400">Name (Marathi)</label>
                      <input
                        type="text"
                        value={catNameMr}
                        onChange={(e) => setCatNameMr(e.target.value)}
                        placeholder="उदा. थंड हवेचे ठिकाण"
                        className="w-full bg-slate-950 border border-slate-850 rounded-lg px-2 py-1 text-[10px] text-white focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-[9px] transition"
                    >
                      {editingCategory ? 'Update Category' : 'Save Category'}
                    </button>
                  </form>
                )}

                {/* Category Search & List */}
                <div className="space-y-2">
                  <div className="relative">
                    <Search className="w-3 h-3 text-slate-500 absolute left-2.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="Search categories..."
                      value={categorySearchQuery}
                      onChange={(e) => setCategorySearchQuery(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1 text-[9px] text-white focus:outline-none focus:border-amber-500"
                    />
                  </div>

                  <div className="space-y-1 max-h-80 overflow-y-auto custom-scrollbar">
                    {categories
                      .filter(c => 
                        c.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) || 
                        (c.nameMr && c.nameMr.includes(categorySearchQuery))
                      )
                      .map(c => (
                        <div key={c.id} className="p-2 bg-slate-950 border border-slate-850 rounded-lg flex items-center justify-between gap-2 hover:border-slate-800 transition">
                          <div>
                            <span className="font-bold text-white text-[10px]">{c.name}</span>
                            {c.nameMr && (
                              <span className="text-[9px] text-slate-400 ml-1.5 font-medium">({c.nameMr})</span>
                            )}
                            <div className="text-[7px] text-slate-600 font-mono mt-0.5">Key: {c.id}</div>
                          </div>

                          <div className="flex gap-1">
                            <button
                              onClick={() => {
                                setEditingCategory(c);
                                setIsAddingCategory(false);
                                setCatName(c.name);
                                setCatNameMr(c.nameMr || '');
                              }}
                              className="p-1 hover:text-amber-500 text-slate-500 transition cursor-pointer"
                              title="Edit Category"
                            >
                              <Edit className="w-3 h-3" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm(`Are you sure you want to delete category '${c.name}'? Locations mapped to this category ID will keep their category ID but won't look up a dynamic category name.`)) {
                                  const updated = categories.filter(x => x.id !== c.id);
                                  onSaveTravelData(destinations, circuits, districts, updated);
                                  addLog(`Deleted category: ${c.name}`, "warn");
                                }
                              }}
                              className="p-1 hover:text-rose-500 text-slate-500 transition cursor-pointer"
                              title="Delete Category"
                            >
                              <Trash2 className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* TAB 7: REPORTS EXPORTS */}
        {activeTab === 'reports' && (
          <div className="space-y-4 animate-fadeIn">
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl space-y-1.5">
              <span className="text-[8px] font-black uppercase text-slate-400 tracking-wider">Export Analytics Ledgers</span>
              <p className="text-[10px] text-slate-400 leading-normal">
                Generate high-integrity platform compliance reports containing anonymous user records, coordinates logs, and gamification audit lines.
              </p>
            </div>

            {/* Reports buttons lists */}
            <div className="space-y-2">
              {[
                { name: 'User Activity Report', desc: 'Active logins, sessions duration, language prefs & device segments.' },
                { name: 'GPS Check-ins Spatial Report', desc: 'Geofenced check-in triggers, physical coordinates mismatches.' },
                { name: 'Quiz Completion & Accuracy Report', desc: 'Trivia scores, questions correctness indexes.' },
                { name: 'Gamification Leaderboard & XP Audit', desc: 'Leaderboard standings, certificates SHA codes.' },
              ].map((rep, idx) => (
                <div key={idx} className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex items-center justify-between gap-3 hover:border-slate-800 transition">
                  <div>
                    <h5 className="font-bold text-slate-200 text-[10px]">{rep.name}</h5>
                    <p className="text-[9px] text-slate-500 leading-snug mt-0.5">{rep.desc}</p>
                  </div>
                  <div className="flex flex-col gap-1 shrink-0">
                    <button
                      onClick={() => handleExport('Excel', rep.name)}
                      className="px-2 py-1 bg-slate-900 hover:bg-slate-850 text-emerald-400 border border-slate-800 rounded-md text-[8px] font-black flex items-center gap-1 active:scale-95 transition"
                    >
                      <Download className="w-2.5 h-2.5" />
                      <span>EXCEL</span>
                    </button>
                    <button
                      onClick={() => handleExport('PDF', rep.name)}
                      className="px-2 py-1 bg-slate-900 hover:bg-slate-850 text-rose-400 border border-slate-800 rounded-md text-[8px] font-black flex items-center gap-1 active:scale-95 transition"
                    >
                      <Download className="w-2.5 h-2.5" />
                      <span>PDF</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Regulatory Compliance footer */}
            <div className="p-3 bg-slate-950 border border-slate-850 rounded-xl flex gap-2 items-start text-slate-500">
              <Clock className="w-4 h-4 text-slate-600 shrink-0 mt-0.5" />
              <div className="space-y-0.5">
                <span className="block text-[7px] font-black uppercase text-slate-400">Security Certificate</span>
                <p className="text-[8px] leading-normal font-mono">
                  All metrics streams strictly isolate personal identifiable information (PII). Encryption hash protocol: SHA-256.
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
