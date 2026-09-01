export interface TouristSpot {
  name: string;
  nameMr?: string;
  category: string;
  categoryMr?: string;
  shortDescription: string;
  shortDescriptionMr?: string;
}

export interface Destination {
  id: string;
  name: string;
  nameMr: string; // Marathi name
  description: string;
  descriptionMr: string;
  district: string;
  lat: number;
  lng: number;
  geofenceRadius: number; // in meters
  category: 'hill_station' | 'heritage' | 'wildlife' | 'beach' | 'pilgrimage' | 'adventure' | string;
  imageUrl: string;
  history: string;
  historyMr: string;
  culture: string;
  cultureMr: string;
  food: string;
  foodMr: string;
  stampMotif: string; // Emoji or SVG description
  bestTime?: string;
  bestTimeMr?: string;
  howToReach?: string;
  howToReachMr?: string;
  sightseeingSpots?: string[];
  sightseeingSpotsMr?: string[];
  travelTips?: string;
  travelTipsMr?: string;
  touristSpots?: TouristSpot[];
}

export interface Circuit {
  id: string;
  name: string;
  nameMr: string;
  description: string;
  descriptionMr: string;
  destinations: string[]; // destination IDs
  color: string;
  accentColor: string;
  geography?: string;
  geographyMr?: string;
  culture?: string;
  cultureMr?: string;
  history?: string;
  historyMr?: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number; // Index in options
  explanation: string;
}

export interface Quiz {
  id: string;
  destinationId: string;
  questions: QuizQuestion[];
  xpReward: number;
}

export interface UserProfile {
  name: string;
  mobile: string;
  language: 'en' | 'mr';
  ageBand: string;
  country?: string;
  state?: string;
  district: string; // Already exists!
  xp: number;
  level: number;
  levelTitle: string;
  checkedInDestinations: string[]; // destination IDs with stamps
  badges: string[]; // badge IDs
  referralCode: string;
  invitedCode?: string;
}

export interface Challenge {
  id: string;
  title: string;
  titleMr: string;
  description: string;
  descriptionMr: string;
  xpReward: number;
  progress: number;
  target: number;
  type: 'daily' | 'weekly';
  isClaimed: boolean;
}

export interface AppNotification {
  id: string;
  title: string;
  body: string;
  timestamp: string;
  read: boolean;
  type: 'alert' | 'tip' | 'achievement' | 'nearby';
  destinationId?: string;
}

export interface District {
  id: string;
  name: string;
  nameMr?: string;
}

export interface Category {
  id: string;
  name: string;
  nameMr?: string;
}

export interface Badge {
  id: string;
  name: string;
  nameMr?: string;
  description: string;
  descriptionMr?: string;
  destinationId?: string;
  category?: string;
  motif: string;
  xpRequired: number;
}

export interface SelfieSubmission {
  id: string;
  userId: string;
  userName: string;
  destinationId: string;
  destinationName: string;
  photoUrl: string;
  submittedAt: string;
  status: 'pending' | 'verified' | 'rejected';
}


