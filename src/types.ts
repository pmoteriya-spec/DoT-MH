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

export interface Review {
  id: string;
  serviceId: string;
  userName: string;
  rating: number; // 1 to 5
  comment: string;
  date: string;
  tag?: string;
  helpfulCount: number;
  userPhoto?: string;
  verifiedBooking: boolean;
}

export interface CarService {
  id: string;
  name: string;
  nameMr: string;
  category: 'sedan' | 'suv' | 'ev' | 'tempo' | 'vintage';
  vehicleModel: string;
  capacity: number;
  luggageCount: number;
  ac: boolean;
  basePrice: number;
  priceUnit: string; // 'per day' | 'per km' | 'circuit pkg'
  districtsCovered: string[];
  driverName: string;
  driverPhone: string;
  driverRating: number;
  reviewCount: number;
  rating: number;
  imageUrl: string;
  features: string[];
  featuresMr?: string[];
  reviews: Review[];
  available: boolean;
}

export interface GuideService {
  id: string;
  name: string;
  nameMr: string;
  specialization: string;
  specializationMr: string;
  districts: string[];
  destinationsCovered: string[];
  languages: string[];
  experienceYears: number;
  pricePerDay: number;
  pricePerHalfDay: number;
  mtdcCertified: boolean;
  licenseNumber: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  bio: string;
  bioMr: string;
  badges: string[];
  reviews: Review[];
  available: boolean;
}

export interface ActivityService {
  id: string;
  title: string;
  titleMr: string;
  category: 'water_sports' | 'adventure' | 'wildlife_safari' | 'heritage_walk' | 'agro_culinary' | 'air_adventure';
  district: string;
  locationName: string;
  destinationId?: string;
  duration: string;
  durationMr?: string;
  pricePerPerson: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  description: string;
  descriptionMr: string;
  includedItems: string[];
  includedItemsMr?: string[];
  safetyCertifications: string[];
  timings: string[];
  reviews: Review[];
  available: boolean;
}

export interface ArtisanCatalogItem {
  id: string;
  title: string;
  titleMr?: string;
  price: number;
  imageUrl: string;
  description: string;
}

export interface Artisan {
  id: string;
  name: string;
  nameMr: string;
  craftType: string;
  craftTypeMr: string;
  village: string;
  district: string;
  experienceYears: number;
  giTagCertified: boolean;
  artisanCardNo: string;
  bio: string;
  bioMr: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  workshopPrice: number;
  workshopDuration: string;
  catalog: ArtisanCatalogItem[];
  reviews: Review[];
  isVerified: boolean;
}

export interface ArtisanRegistration {
  id: string;
  artisanName: string;
  craftType: string;
  district: string;
  village: string;
  phone: string;
  email?: string;
  experienceYears: number;
  artisanCardNo?: string;
  sampleDescription: string;
  workshopOffered: boolean;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
}

export interface PermitApplication {
  id: string;
  permitType: 'kaas_pass' | 'tadoba_safari' | 'raigad_ropeway' | 'homestay_reg' | 'temple_vip';
  title: string;
  titleMr?: string;
  applicantName: string;
  applicantMobile: string;
  aadhaarOrId: string;
  district: string;
  destinationName: string;
  visitDate: string;
  visitorsCount: number;
  feePaid: number;
  status: 'pending' | 'approved' | 'rejected';
  appliedAt: string;
  qrCodeToken: string;
}

export interface Booking {
  id: string;
  serviceType: 'car' | 'guide' | 'activity' | 'artisan_workshop' | 'permit' | 'artisan_product';
  serviceId: string;
  serviceTitle: string;
  serviceImage?: string;
  providerName: string;
  date: string;
  slotOrDuration?: string;
  guestCount: number;
  totalAmount: number;
  discountXp: number;
  finalPaidAmount: number;
  paymentMethod: 'upi' | 'card' | 'netbanking' | 'wallet';
  paymentId: string;
  bookingStatus: 'confirmed' | 'cancelled' | 'completed';
  bookedAt: string;
  qrCodeToken: string;
  notes?: string;
}
export interface DriverRegistration {
  id: string; // e.g. MH-CAB-2026-4821
  driverName: string;
  phone: string;
  licenseNo: string;
  rtoBadgeNo: string;
  vehicleModel: string;
  vehicleCategory: 'sedan' | 'suv' | 'ev' | 'tempo' | '4x4';
  vehiclePlateNo: string;
  capacity: number;
  ac: boolean;
  districtsCovered: string[];
  basePrice: number;
  priceUnit: string;
  experienceYears: number;
  ghatExpert: boolean;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
}

export interface GuideRegistration {
  id: string; // e.g. MH-GD-2026-7319
  guideName: string;
  phone: string;
  email?: string;
  licenseNo: string;
  specialization: string;
  districts: string[];
  languages: string[];
  experienceYears: number;
  pricePerDay: number;
  bio: string;
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
  adminNotes?: string;
}
