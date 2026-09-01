import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MapPin, 
  Search, 
  Calendar, 
  Car, 
  AlertTriangle, 
  Award, 
  Compass, 
  Sparkles, 
  ChevronRight, 
  ChevronLeft, 
  X, 
  Phone, 
  Mail, 
  Globe, 
  Info, 
  Heart, 
  BookMarked,
  Map as MapIcon,
  Tent,
  Anchor,
  Compass as CompassIcon,
  Flame,
  UtensilsCrossed,
  FileText,
  Clock,
  ExternalLink,
  MessageCircle,
  HelpCircle,
  PlayCircle,
  Camera,
  Layers
} from 'lucide-react';
import MaharashtraLogo from './MaharashtraLogo';
import { Destination } from '../types';

interface OfficialPortalProps {
  language: 'en' | 'mr';
  onLanguageChange: (lang: 'en' | 'mr') => void;
  onOpenCompanion: (destId?: string) => void;
  onNavigateToQuiz: (destId: string) => void;
}

// 24 Rotate Hero Background Image List (Requested in User Intent)
const HERO_BACKGROUND_SLIDES = [
  { name: 'Gateway of India', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Ajanta Caves', url: 'https://images.unsplash.com/photo-1608958416754-0418382ba185?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Ellora Caves', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Marine Drive', url: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Konkan Beach', url: 'https://images.unsplash.com/photo-1615966689782-b49e5d03c24d?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Mahabaleshwar', url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Matheran', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Lonavala', url: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Panchgani', url: 'https://images.unsplash.com/photo-1608958416754-0418382ba185?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Tadoba', url: 'https://images.unsplash.com/photo-1602491453977-1b416305010a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Pench', url: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Bhimashankar', url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Karnala', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Kaas Plateau', url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Sinhagad Fort', url: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Raigad Fort', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Shivneri', url: 'https://images.unsplash.com/photo-1608958416754-0418382ba185?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Shaniwar Wada', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Lonar Lake', url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Lavasa', url: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Malshej Ghat', url: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Ganpatipule', url: 'https://images.unsplash.com/photo-1615966689782-b49e5d03c24d?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Alibaug', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80' },
  { name: 'Harihareshwar', url: 'https://images.unsplash.com/photo-1615966689782-b49e5d03c24d?auto=format&fit=crop&w=1200&q=80' }
];

// Content destinations database mapped from brochure (Requested in User Intent)
const PORTAL_DESTINATIONS = [
  // Historical Monuments
  {
    id: 'ajanta',
    name: 'Ajanta Caves',
    nameMr: 'अजिंठा लेणी',
    category: 'Historical Monuments',
    district: 'Chhatrapati Sambhaji Nagar',
    districtKey: 'aurangabad',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1608958416754-0418382ba185?auto=format&fit=crop&w=600&q=80',
    description: 'Ancient rock-cut Buddhist temples featuring extraordinary frescoes and paintings depicting Jataka legends.',
    descriptionMr: 'पाषाणात कोरलेली बौद्ध मंदिरे, ज्यात जातक कथांचे विलोभनीय चित्रकाम आढळते.',
    history: 'Dating back to the 2nd century BCE, these caves showcase the pinnacle of ancient Indian rock-cut art and were rediscovered in 1819 by John Smith.',
    historyMr: 'इसवी सन पूर्व दुसऱ्या शतकातील या लेण्या प्राचीन भारतीय चित्रकलेचा कळस दर्शवतात, ज्याचा शोध १८१९ मध्ये जॉन स्मिथ यांनी लावला.',
    highlights: ['Cave 1 (Padmapani Mural)', 'Cave 26 (Reclining Buddha)', 'Serene Waghora River Gorge View'],
    highlightsMr: ['लेणी क्र. १ (पद्मपाणी चित्र)', 'लेणी क्र. २६ (महापरिनिर्वाण बुद्ध)', 'वाघूर नदी खोऱ्याचे मनोहारी दृश्य'],
    thingsToDo: ['Explore ancient frescoes', 'Climb to the primary viewpoint', 'Witness Buddhist prayer halls'],
    thingsToDoMr: ['प्राचीन भित्तीचित्रे पाहा', 'मुख्य व्ह्यू पॉईंटवर चढा', 'बौद्ध चैत्यगृहाला भेट द्या'],
    bestTime: 'November to March',
    bestTimeMr: 'नोव्हेंबर ते मार्च',
    nearbyAttractions: ['Ellora Caves', 'Bibi Ka Maqbara', 'Grishneshwar Temple'],
    nearbyAttractionsMr: ['वेरूळ लेणी', 'बिबी का मकबरा', 'घृष्णेश्वर ज्योतिर्लिंग मंदिर'],
    tips: 'Mondays are closed! Use soft lights and avoid flash photography inside.',
    tipsMr: 'सोमवारी बंद असते! आतमध्ये फ्लॅश फोटोग्राफी करण्यास बंदी आहे.',
    transport: '100 km from Chhatrapati Sambhaji Nagar. Daily state buses and cabs connect the site.',
    transportMr: 'छत्रपती संभाजीनगर पासून १०० किमी. राज्य परिवहन महामंडळाच्या बसेस उपलब्ध आहेत.',
    hotels: 'MTDC Resort Ajanta, Fardapur Hill Resort',
    restaurants: 'MTDC Restaurant, Harit Kranti Dhaba'
  },
  {
    id: 'ellora',
    name: 'Ellora Caves',
    nameMr: 'वेरूळ लेणी',
    category: 'Historical Monuments',
    district: 'Chhatrapati Sambhaji Nagar',
    districtKey: 'aurangabad',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
    description: 'An stunning assembly of 34 caves dedicated to Hindu, Buddhist, and Jain faiths, featuring the world-famous Kailasa Temple.',
    descriptionMr: 'हिंदू, बौद्ध आणि जैन धर्म परंपरा दर्शवणाऱ्या ३४ लेण्यांचा संग्रह, ज्यामध्ये जगप्रसिद्ध कैलास मंदिर समाविष्ट आहे.',
    history: 'Carved between the 6th and 10th centuries under Rashtrakuta patronage. The majestic Kailash Temple is hewn top-down from a single monolithic rock cliff.',
    historyMr: '६ व्या ते १० व्या शतकात राष्ट्रकूट राजांनी कोरले. महाकाय कैलास मंदिर एकाच अखंड खडकात वरून खाली अशा पद्धतीने कोरले गेले आहे.',
    highlights: ['Monolithic Kailash Temple (Cave 16)', 'Buddhist Vishvakarma Cave', 'Jain Indra Sabha'],
    highlightsMr: ['अखंड पाषाणातील कैलास मंदिर (लेणी १६)', 'बौद्ध विश्वकर्मा लेणी', 'जैन इंद्र सभा लेणी'],
    thingsToDo: ['Climb up Cave 16 cliffs', 'Admire complex rock sculptures', 'Attend the annual cultural festival'],
    thingsToDoMr: ['लेणी १६ च्या कड्यावर चढा', 'विविध कोरीव शिल्पकला पाहा', 'वार्षिक वेरूळ अजिंठा महोत्सवाला उपस्थित राहा'],
    bestTime: 'October to March',
    bestTimeMr: 'ऑक्टोबर ते मार्च',
    nearbyAttractions: ['Grishneshwar Jyotirlinga', 'Daulatabad Fort', 'Bibi Ka Maqbara'],
    nearbyAttractionsMr: ['घृष्णेश्वर ज्योतिर्लिंग', 'दौलताबाद किल्ला', 'बिबी का मकबरा'],
    tips: 'Tuesdays are closed! Give yourself at least 4 hours to explore.',
    tipsMr: 'मंगळवारी बंद असते! फिरण्यासाठी किमान ४ तास वेळ द्या.',
    transport: '30 km from Chhatrapati Sambhaji Nagar. Easy auto and bus connectivity.',
    transportMr: 'छत्रपती संभाजीनगर पासून ३० किमी. टॅक्सी किंवा रिक्षाने जाता येते.',
    hotels: 'Kailas Hotel Ellora, MTDC Resort Verul',
    restaurants: 'MTDC Food Plaza, Goli Vada Pav'
  },
  {
    id: 'gateway_of_india',
    name: 'Gateway of India',
    nameMr: 'गेटवे ऑफ इंडिया',
    category: 'Historical Monuments',
    district: 'Mumbai',
    districtKey: 'mumbai',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80',
    description: 'The monumental stone arch overlooking the Arabian Sea, representing the primary gateway and emblem of Mumbai.',
    descriptionMr: 'अरबी समुद्रासमोर उभा असलेला ऐतिहासिक दगडी कमानी दरवाजा, जो मुंबईचे मुख्य प्रतीक मानला जातो.',
    history: 'Built to commemorate the visit of King George V and Queen Mary in 1911. Designed by architect George Wittet in the Indo-Saracenic style.',
    historyMr: '१९११ मध्ये किंग जॉर्ज पाचवे आणि क्वीन मेरी यांच्या आगमनाप्रीत्यर्थ निर्मिती. जॉर्ज विटेट यांनी इंडो-सारसेनिक शैलीत याची आखणी केली.',
    highlights: ['Indo-Saracenic Architecture', 'Seafront Promenade', 'Ferry to Elephanta Caves'],
    highlightsMr: ['इंडो-सारसेनिक वास्तुकला', 'समुद्रकिनारी फिरण्याचा रस्ता', 'एलिफंटा लेणीसाठी बोट सेवा'],
    thingsToDo: ['Take a sunset ferry ride', 'Admire the view of Taj Mahal Palace Hotel', 'Enjoy street photography'],
    thingsToDoMr: ['सूर्यास्ताच्या वेळी बोट राईड घ्या', 'ताज हॉटेल वास्तूचे सौंदर्य पाहा', 'फोटोग्राफीचा आनंद घ्या'],
    bestTime: 'October to May',
    bestTimeMr: 'ऑक्टोबर ते मे',
    nearbyAttractions: ['Marine Drive', 'Elephanta Caves', 'Chhatrapati Shivaji Maharaj Terminus'],
    nearbyAttractionsMr: ['मरीन ड्राईव्ह', 'घारापुरी (एलिफंटा) लेणी', 'छत्रपती शिवाजी महाराज टर्मिनस'],
    tips: 'Evenings can be highly crowded. Watch for local street vendors.',
    tipsMr: 'संध्याकाळच्या वेळी गर्दी असते. स्थानिक खाद्यपदार्थांचा आस्वाद घ्या.',
    transport: 'Located in South Mumbai, near CSMT railway terminal.',
    transportMr: 'दक्षिण मुंबईत स्थित, छत्रपती शिवाजी महाराज टर्मिनस जवळ.',
    hotels: 'The Taj Mahal Palace, Abode Bombay',
    restaurants: 'Leopold Cafe, Cafe Mondegar'
  },
  {
    id: 'csmt',
    name: 'Chhatrapati Shivaji Maharaj Terminus (CSMT)',
    nameMr: 'छत्रपती शिवाजी महाराज टर्मिनस',
    category: 'Historical Monuments',
    district: 'Mumbai',
    districtKey: 'mumbai',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=600&q=80',
    description: 'UNESCO World Heritage railway station, displaying majestic Victorian Gothic architecture and classic Indian craftsmanship.',
    descriptionMr: 'युनेस्को जागतिक वारसा असलेले रेल्वे स्थानक, जे व्हिक्टोरियन गोथिक आणि पारंपारिक भारतीय कलाकुसरीचे प्रतीक आहे.',
    history: 'Designed by Frederick William Stevens and completed in 1887 to mark Queen Victoria Golden Jubilee. Serves as central rail headquarters.',
    historyMr: 'फ्रेडरिक विलीयम स्टीव्हन्स यांनी डिझाइन केले आणि १८८७ मध्ये राणी व्हिक्टोरियाच्या सुवर्णमहोत्सवानिमित्त बांधले गेले.',
    highlights: ['Victorian Gothic Spires and Domes', 'Historical Heritage Gallery', 'Grand Central Archway'],
    highlightsMr: ['व्हिक्टोरियन गोथिक कळस आणि घुमट', 'ऐतिहासिक वारसा दालन', 'मुख्य महाकाय कमान'],
    thingsToDo: ['Take a heritage gallery tour', 'Capture illuminated evening view', 'Observe local commuter life'],
    thingsToDoMr: ['वारसा दालनाचा फेरफटका घ्या', 'रात्रीची प्रकाशयोजना कॅमेऱ्यात कैद करा', 'मुंबईची लोकल धावपळ पाहा'],
    bestTime: 'Year-round',
    bestTimeMr: 'वर्षभर कधीही',
    nearbyAttractions: ['Gateway of India', 'Crawford Market', 'Oval Maidan'],
    nearbyAttractionsMr: ['गेटवे ऑफ इंडिया', 'क्रॉफर्ड मार्केट', 'ओव्हल मैदान'],
    tips: 'Best illuminated view after 7:30 PM. Avoid peak travel hours for casual sightseeing.',
    tipsMr: 'संध्याकाळी ७:३० नंतर रोषणाई अप्रतिम दिसते. गर्दीच्या वेळेत फिरणे टाळा.',
    transport: 'Central railway terminal connecting express and local suburban trains.',
    transportMr: 'मुंबई रेल्वेचे मध्यवर्ती केंद्र, लोकल्स आणि एक्सप्रेस गाड्यांचे जंक्शन.',
    hotels: 'InterContinental Marine Drive, Grand Hotel',
    restaurants: 'Pancham Puriwala, Britannia & Co.'
  },
  {
    id: 'elephanta',
    name: 'Elephanta Caves',
    nameMr: 'घारापुरी लेणी (Elephanta)',
    category: 'Historical Monuments',
    district: 'Raigad / Mumbai',
    districtKey: 'mumbai',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
    description: 'An island of rock-cut temples dedicated to Lord Shiva, featuring the iconic 7-meter high "Sadashiva" sculpture.',
    descriptionMr: 'भगवान शंकराला समर्पित घारापुरी बेटावरील दगडी लेणी, जिथे ७ मीटर उंचीचे "सदाशिव" शिल्प आहे.',
    history: 'Dating from the 5th to 6th centuries AD. The island was named Elephanta by Portuguese explorers who discovered a colossal stone elephant near the shore.',
    historyMr: '५ व्या ते ६ व्या शतकातील निर्मिती. किनाऱ्याजवळ हत्तीचे दगडी शिल्प सापडल्यामुळे पोर्तुगीजांनी याला "एलिफंटा" असे नाव दिले.',
    highlights: ['7-meter high Trimurti Sadashiva', 'Great Cave 1 architecture', 'Scenic Toy Train ride from ferry'],
    highlightsMr: ['७ मीटर महाकाय त्रिमूर्ती सदाशिव शिल्प', 'लेणी क्र. १ ची कोरीव रचना', 'बेटावरील लहान टॉय ट्रेन'],
    thingsToDo: ['Take a scenic ferry across Mumbai harbor', 'Explore the massive cave columns', 'Treasure-hunt on the island peak'],
    thingsToDoMr: ['अरबी समुद्रातून बोट सफर करा', 'महाकाय दगडी खांब पाहा', 'बेटावरील डोंगरावर चढाई करा'],
    bestTime: 'November to March',
    bestTimeMr: 'नोव्हेंबर ते मार्च',
    nearbyAttractions: ['Gateway of India', 'Colaba Causeway', 'Taj Mahal Palace Hotel'],
    nearbyAttractionsMr: ['गेटवे ऑफ इंडिया', 'कुलाबा कॉजवे', 'ताज पॅलेस हॉटेल'],
    tips: 'Ferries do not run during monsoon season (June to September). Watch out for cheeky monkeys on the steps!',
    tipsMr: 'पावसाळ्यात (जून ते सप्टेंबर) बोट सेवा बंद असते. वाटेतील माकडांपासून खाद्यपदार्थ वाचवा!',
    transport: 'Access via a 1-hour ferry ride from Gateway of India jetty.',
    transportMr: 'गेटवे ऑफ इंडियावरून बोटीने १ तासाचा प्रवास.',
    hotels: 'Taj Mahal Tower Mumbai, residency Hotel',
    restaurants: 'Local island shacks (serving Kokum Sharbat and fresh fish)'
  },
  {
    id: 'shaniwar_wada',
    name: 'Shaniwar Wada',
    nameMr: 'शनिवार वाडा',
    category: 'Historical Monuments',
    district: 'Pune',
    districtKey: 'pune',
    rating: 4.6,
    imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600&q=80',
    description: 'The historic fortified headquarters of the Peshwas of Pune, representing Maratha power and architectural heritage.',
    descriptionMr: 'पुण्यातील पेशव्यांचे ऐतिहासिक भुईकोट मुख्यालय, जे मराठा साम्राज्य आणि शौर्याचे प्रतीक आहे.',
    history: 'Built in 1732 by Peshwa Baji Rao I. The fort survived a mysterious devastating fire in 1828, leaving the grand stone plinths and massive walls.',
    historyMr: '१७३२ मध्ये पेशवे बाजीराव पहिले यांनी बांधला. १८२८ मधील एका भीषण आगीत हा वाडा जळून खाक झाला, आता केवळ दगडी पाया आणि भक्कम भिंती शिल्लक आहेत.',
    highlights: ['Massive Dilli Darwaza gates', 'Grand stone fountain courtyard', 'Peshwa History Light & Sound Show'],
    highlightsMr: ['महाकाय ' + 'दिल्ली दरवाजा', 'हजारी कारंजे यांचे अंगण', 'संध्याकाळचा ऐतिहासिक लाईट अँड साऊंड शो'],
    thingsToDo: ['Walk along the fortress walls', 'Attend Peshwa light and sound show', 'Eat local Pune street foods nearby'],
    thingsToDoMr: ['भक्कम कोटाच्या भिंतींवरून फिरा', 'लाईट अँड साऊंड शोचा आनंद घ्या', 'जवळच सुप्रसिद्ध पुणेरी खाद्यपदार्थ खा'],
    bestTime: 'October to March',
    bestTimeMr: 'ऑक्टोबर ते मार्च',
    nearbyAttractions: ['Dagdusheth Halwai Temple', 'Lal Mahal', 'Kelkar Museum'],
    nearbyAttractionsMr: ['श्रीमंत दगडूशेठ हलवाई गणपती', 'लाल महाल', 'केळकर संग्रहालय'],
    tips: 'Light and sound show runs in English and Marathi every evening. Tickets are cheap and sold near the main gate.',
    tipsMr: 'लाईट अँड साऊंड शोचे तिकीट वाड्याच्या मुख्य दरवाजाजवळ मिळते.',
    transport: 'Located in central Pune (Shaniwar Peth). Readily accessible by auto or city bus.',
    transportMr: 'पुणे शहराच्या मध्यभागी (शनिवार पेठ). रिक्षा आणि बसने सहज पोहोचता येते.',
    hotels: 'JW Marriott Pune, Shreyas Hotel',
    restaurants: 'Chitale Bandhu Bakharwadi, Shreyas dining Hall (Authentic Marathi Thali)'
  },

  // Hill Stations
  {
    id: 'mahabaleshwar',
    name: 'Mahabaleshwar',
    nameMr: 'महाबळेश्वर',
    category: 'Hill Stations',
    district: 'Satara',
    districtKey: 'satara',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80',
    description: 'The "Queen of Sahyadri", celebrated for sweet strawberry farms, beautiful cloud-kissed cliffs, and evergreen mist-covered forests.',
    descriptionMr: 'सह्याद्रीची राणी म्हणून ओळखले जाणारे थंड हवेचे ठिकाण, जे स्ट्रॉबेरी फार्म्स आणि खोल दऱ्यांसाठी प्रसिद्ध आहे.',
    history: 'Establishment as a hill station began in 1828 under Sir John Malcolm. It served as the summer capital of the Bombay Presidency during the British Raj.',
    historyMr: '१८२८ मध्ये ब्रिटिश काळात जॉन माल्कम यांनी थंड हवेचे ठिकाण म्हणून वसवले. ब्रिटिश राजवटीत ही उन्हाळी राजधानी होती.',
    highlights: ['Mapro Garden & Strawberry picking', 'Arthur Seat & Elephant Head points', 'Venna Lake Boating'],
    highlightsMr: ['माप्रो गार्डन आणि स्ट्रॉबेरी खरेदी', 'आर्थर सीट व एलिफंट हेड पॉईंट', 'वेण्णा तलावात बोटिंग'],
    thingsToDo: ['Eat fresh strawberry with cream', 'Row boats in Venna Lake', 'Watch breathtaking sunrise from Wilson Point'],
    thingsToDoMr: ['ताजी स्ट्रॉबेरी विथ क्रीम खा', 'वेण्णा तलावात बोट सफारी करा', 'विल्सन पॉईंटवरून सूर्योदय पाहा'],
    bestTime: 'Monsoon (lush greenery) & Winter (Strawberry harvest)',
    bestTimeMr: 'पावसाळा (हिरवेगार डोंगर) आणि हिवाळा (स्ट्रॉबेरी हंगाम)',
    nearbyAttractions: ['Panchgani', 'Pratapgad Fort', 'Kaas Plateau'],
    nearbyAttractionsMr: ['पाचगणी', 'प्रतापगड किल्ला', 'कास पठार (फुलांचे पठार)'],
    tips: 'Strawberry festival is hosted around Easter/March at Mapro Garden. Keep a jacket as nights are quite cool.',
    tipsMr: 'माप्रो गार्डनमध्ये दरवर्षी स्ट्रॉबेरी महोत्सव रंगतो. रात्री थंडी असल्याने उबदार कपडे सोबत ठेवा.',
    transport: '120 km from Pune and 260 km from Mumbai. Excellent road connectivity.',
    transportMr: 'पुण्यापासून १२० किमी आणि मुंबईपासून २६० किमी. रस्त्यांची उत्तम जोडणी.',
    hotels: 'Brightland Resort, MTDC Holiday Resort Mahabaleshwar',
    restaurants: 'Mapro Garden Restaurant, Bagicha Corner'
  },
  {
    id: 'lonavala',
    name: 'Lonavala',
    nameMr: 'लोणावळा',
    category: 'Hill Stations',
    district: 'Pune',
    districtKey: 'pune',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600&q=80',
    description: 'The Jewel of Sahyadri, famous for heavy monsoons, cascading waterfalls, Rajmachi trekking, and crispy peanut chikki candy.',
    descriptionMr: 'सह्याद्रीचा हिरा, जो कोसळणारे धबधबे, लोहगड-राजमची ट्रेक आणि प्रसिद्ध चिक्कीसाठी ओळखला जातो.',
    history: 'Discovered by Lord Elphinstone in 1811. Serves as a key mountain pass between Mumbai and Pune, with ancient Buddhist Karla and Bhaja caves nearby.',
    historyMr: '१८११ मध्ये लॉर्ड एल्फिन्स्टन यांनी शोध लावला. हे मुंबई आणि पुणे दरम्यानचे महत्त्वाचे घाट जोडणी केंद्र आहे.',
    highlights: ['Tiger Leap / Tiger Point views', 'Bhushi Dam overflow water play', 'Karla & Bhaja Caves'],
    highlightsMr: ['टायगर्स लीप (वाघ पॉइंट) दरी', 'भुशी धरण ओव्हरफ्लो वॉटर प्ले', 'प्राचीन कार्ला व भाजा लेणी'],
    thingsToDo: ['Trek to Lohagad or Rajmachi Forts', 'Savor sweet Lonavala Chikki', 'Stand inside monsoon rain-showers'],
    thingsToDoMr: ['लोहगड किंवा राजमची किल्ल्यावर ट्रेक करा', 'लोणावळा चिक्कीचा स्वाद घ्या', 'पावसाळी धबधब्यात चिंब भिजून घ्या'],
    bestTime: 'June to September (Monsoon)',
    bestTimeMr: 'जून ते सप्टेंबर (पावसाळा)',
    nearbyAttractions: ['Khandala', 'Pawna Lake camping', 'Imagicaa Theme Park'],
    nearbyAttractionsMr: ['खंडाळा', 'पवना तलाव कॅम्पिंग', 'इमॅजिका थीम पार्क'],
    tips: 'Weekends in monsoon are highly crowded. Drive slow due to dense foggy road conditions near ghats.',
    tipsMr: 'पावसाळ्यात विकेंडला प्रचंड गर्दी असते. धुक्यात घाट रस्त्यावर गाडी सावकाश चालवा.',
    transport: '65 km from Pune and 80 km from Mumbai via Expressway. Local train available from Pune.',
    transportMr: 'पुण्यापासून ६५ किमी आणि मुंबईपासून ८० किमी एक्सप्रेसवेने. पुणे लोकल जोडणी आहे.',
    hotels: 'Fariyas Resort, MTDC Karla Resort',
    restaurants: 'Cooper Fudge Shop, Golden Sun'
  },
  {
    id: 'matheran',
    name: 'Matheran',
    nameMr: 'माथेरान',
    category: 'Hill Stations',
    district: 'Raigad',
    districtKey: 'raigad',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
    description: 'A serene sanctuary and eco-sensitive zone, famous as Asia’s only vehicle-free forest hill station with red clay paths.',
    descriptionMr: 'पर्यावरण पूरक थंड हवेचे ठिकाण, जिथे वाहनांना बंदी असून केवळ पायी किंवा घोड्यावरून जाता येते.',
    history: 'Discovered in 1850 by Hugh Malet, Collector of Thana. Lord Elphinstone established the iconic Neral-Matheran mountain narrow-gauge toy railway.',
    historyMr: '१८५० मध्ये ठाण्याचे जिल्हाधिकारी ह्युज मॅलेट यांनी शोधले. एल्फिन्स्टन यांनी नेरळ-माथेरान टॉय ट्रेन सुरू केली.',
    highlights: ['Zero pollution automobile-free zone', 'Scenic Charlotte Lake', 'Panorama & Louisa view points'],
    highlightsMr: ['प्रदूषणमुक्त वाहनबंदी क्षेत्र', 'शांत शार्लोट तलाव', 'पॅनोरमा आणि लुईसा व्ह्यू पॉईंट'],
    thingsToDo: ['Ride the mountain Toy Train', 'Ride horses along red clay paths', 'Buy local handcrafted leather chappals'],
    thingsToDoMr: ['डोंगराळ टॉय ट्रेनने प्रवास करा', 'लाल मातीच्या रस्त्यांवर घोडेस्वारी करा', 'स्थानिक चामड्याच्या चपला खरेदी करा'],
    bestTime: 'October to May',
    bestTimeMr: 'ऑक्टोबर ते मे',
    nearbyAttractions: ['Neral Junction', 'Prabal Fort trek', 'Dasturi Naka'],
    nearbyAttractionsMr: ['नेरळ जंक्शन', 'प्रबळगड किल्ला ट्रेक', 'दस्तुरी नाका'],
    tips: 'Cars must stop at Dasturi Naka parking! From there, walk 2.5 km or hire a horse/hand-rickshaw to enter town.',
    tipsMr: 'वाहने दस्तुरी नाक्यावर पार्क करावी लागतात! तिथून पुढे पायी किंवा घोड्यावरून जावे.',
    transport: 'Drive to Dasturi Naka via Neral. Trains connect Mumbai to Neral Station.',
    transportMr: 'मुंबई किंवा पुण्यावरून नेरळ आणि पुढे दस्तुरी नाका गाडीने जावे.',
    hotels: 'The Verandah in the Forest, MTDC Resort Matheran',
    restaurants: 'Kokum shacks near Charlotte Lake, Diwadkars'
  },

  // Wildlife
  {
    id: 'tadoba',
    name: 'Tadoba Andhari Tiger Reserve',
    nameMr: 'ताडोबा अंधारी व्याघ्र प्रकल्प',
    category: 'Wildlife',
    district: 'Chandrapur',
    districtKey: 'chandrapur',
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1602491453977-1b416305010a?auto=format&fit=crop&w=600&q=80',
    description: 'The "Jewel of Vidarbha", famous as the oldest and largest national park in Maharashtra, featuring booming Royal Bengal Tiger sightings.',
    descriptionMr: 'विदर्भाचा हिरा, महाराष्ट्रातील सर्वात जुना आणि मोठा व्याघ्र प्रकल्प, जो वाघांच्या दर्शनासाठी ओळखला जातो.',
    history: 'Created as a national park in 1955. Merged with Andhari Wildlife Sanctuary in 1995 to form the extensive Project Tiger reserve.',
    historyMr: '१९५५ मध्ये राष्ट्रीय उद्यान म्हणून घोषित. १९९५ मध्ये अंधारी अभयारण्य यात मिळवून व्याघ्र प्रकल्प बनवण्यात आला.',
    highlights: ['High density of Royal Bengal Tigers', 'Open-top Gypsy Safari experience', 'Beautiful Tadoba Lake birds'],
    highlightsMr: ['रॉयल बंगाल वाघांची दाट संख्या', 'ओपन-टॉप जिप्सी सफारी अनुभव', 'ताडोबा तलावातील सुंदर पक्षीदर्शन'],
    thingsToDo: ['Book a deep forest Gypsy Safari', 'Spot panthers, sloths, and bisons', 'Stay at a premium eco-wilderness lodge'],
    thingsToDoMr: ['जंगलात जिप्सी सफारी बुक करा', 'चित्ते, अस्वल आणि गवे यांचे दर्शन घ्या', 'जंगलातील इको रिसॉर्टमध्ये मुक्काम करा'],
    bestTime: 'March to May (for tiger spotting near lakes) & October to February (pleasant weather)',
    bestTimeMr: 'मार्च ते मे (वाघांच्या दर्शनासाठी उत्तम) आणि ऑक्टोबर ते फेब्रुवारी (हवामान छान)',
    nearbyAttractions: ['Chandrapur Fort', 'Erai Dam', 'Bhadravati Jain Temple'],
    nearbyAttractionsMr: ['चंद्रपूर किल्ला', 'इरई धरण', 'भद्रावती जैन मंदिर'],
    tips: 'Safaris MUST be booked at least 2-3 months online in advance via mahabooking.com! Main gates are closed during monsoon rains (July-Sept).',
    tipsMr: 'सफारीचे बुकिंग २-३ महिने आधी ऑनलाईन करणे आवश्यक आहे! पावसाळ्यात मुख्य दरवाजे बंद असतात.',
    transport: '140 km from Nagpur Airport (Dr. Babasaheb Ambedkar Airport). 45 km from Chandrapur Railway station.',
    transportMr: 'नागपूर विमानतळापासून १४० किमी. चंद्रपूर रेल्वे स्टेशनपासून ४५ किमी.',
    hotels: 'MTDC Tadoba Jungle Resort, Irai Safari Retreat',
    restaurants: 'Jungle Lodge dining hall, Tiger Corridor'
  },
  {
    id: 'bhimashankar',
    name: 'Bhimashankar Wildlife Sanctuary',
    nameMr: 'भीमाशंकर अभयारण्य',
    category: 'Wildlife',
    district: 'Pune',
    districtKey: 'pune',
    rating: 4.7,
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=600&q=80',
    description: 'An eco-haven in the Western Ghats, home to the rare Shekru (giant flying squirrel) and a holy Jyotirlinga temple.',
    descriptionMr: 'पश्चिम घाटातील जैवविविधतेचे केंद्र, जे महाराष्ट्राचा राज्य प्राणी ' + 'शेकरू' + ' (उडणारी खार) आणि पवित्र ज्योतिर्लिंगाचे माहेरघर आहे.',
    history: 'Declared a wildlife sanctuary in 1984 to protect the endemic Shekru habitat. The temple dates to the 13th century and displays Nagara style stone carvings.',
    historyMr: '१९८४ मध्ये शेकरू प्राण्याच्या रक्षणासाठी अभयारण्य घोषित. भीमाशंकर मंदिर १३ व्या शतकातील असून नागर शैलीचे उत्तम उदाहरण आहे.',
    highlights: ['Shekru Giant Flying Squirrel', 'Ancient Bhimashankar Jyotirlinga', 'Gupta Bhimashankar waterfall trail'],
    highlightsMr: ['शेकरू (महाराष्ट्राचा राज्य प्राणी)', 'पवित्र भीमाशंकर ज्योतिर्लिंग मंदिर', 'गुप्त भीमाशंकर धबधबा आणि ट्रेक'],
    thingsToDo: ['Spot Shekru in evergreen canopies', 'Pray at the sacred Jyotirlinga Temple', 'Trek across dense Western Ghat trails'],
    thingsToDoMr: ['झाडांच्या शेंड्यावर शेकरू शोधा', 'पवित्र ज्योतिर्लिंग मंदिरात दर्शन घ्या', 'पश्चिम घाटातील घनदाट जंगलात ट्रेक करा'],
    bestTime: 'August to February',
    bestTimeMr: 'ऑगस्ट ते फेब्रुवारी',
    nearbyAttractions: ['Lonavala', 'Malshej Ghat', 'Shivneri Fort'],
    nearbyAttractionsMr: ['लोणावळा', 'माळशेज घाट', 'शिवनेरी किल्ला'],
    tips: 'Avoid plastic! Keep silence inside the core forest to observe Shekru, mostly active during early mornings.',
    tipsMr: 'प्लास्टिकचा वापर टाळा! जंगलात शांतता राखा, जेणेकरून शेकरू सहज पाहायला मिळेल.',
    transport: '120 km from Pune city center. Government buses are frequently available.',
    transportMr: 'पुण्यापासून १२० किमी. बस सेवा सहज उपलब्ध आहे.',
    hotels: 'MTDC Blue Mormon Resort, Bhimashankar Guest Houses',
    restaurants: 'Temple Bhojanalay, Local rural food stalls'
  },

  // Beaches
  {
    id: 'ganpatipule',
    name: 'Ganpatipule Beach',
    nameMr: 'गणपतीपुळे समुद्रकिनारा',
    category: 'Beaches',
    district: 'Ratnagiri',
    districtKey: 'ratnagiri',
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1615966689782-b49e5d03c24d?auto=format&fit=crop&w=600&q=80',
    description: 'A pristine Konkan beach with golden sand, green coconut trees, and the holy Swayambhu Ganesha Temple.',
    descriptionMr: 'सोनेरी वाळू, हिरवेगार नारळीचे बाग आणि पश्चिम समुद्राचे रक्षण करणारे स्वयंभू गणेश मंदिर असलेला किनारा.',
    history: 'The Ganesha temple is 400 years old. The Ganesha deity faces west, unlike other temples, protecting the Konkan coastline.',
    historyMr: 'येथील गणेश मंदिर ४०० वर्षे जुने आहे. इतर मंदिरांच्या उलट, येथील मूर्ती पश्चिमाभिमुख असून अरबी समुद्राकडे तोंड करून उभी आहे.',
    highlights: ['400-year-old Swayambhu Ganesha temple', 'Clean golden-sand beach line', 'Konkan Museum nearby'],
    highlightsMr: ['४०० वर्षे जुने स्वयंभू गणेश मंदिर', 'स्वच्छ सोनेरी वाळूचा अथांग समुद्रकिनारा', 'प्राचीन कोकण संस्कृतीचे प्रदर्शन करणारे संग्रहालय'],
    thingsToDo: ['Pray at Ganesha temple by the beach', 'Enjoy thrilling water sports', 'Watch glorious Konkan sunset'],
    thingsToDoMr: ['समुद्रकिनाऱ्यावरील गणेश मंदिरात दर्शन घ्या', 'विविध जलक्रीडा खेळांचा आनंद घ्या', 'कोकणातील विलोभनीय सूर्यास्त पाहा'],
    bestTime: 'November to February',
    bestTimeMr: 'नोव्हेंबर ते फेब्रुवारी',
    nearbyAttractions: ['Jaigad Fort', 'Ratnagiri city', 'Aarey Warey Beach'],
    nearbyAttractionsMr: ['जयगड किल्ला', 'रत्नागिरी शहर', 'आरे वारे समुद्रकिनारा'],
    tips: 'Always check flag warnings before swimming. Currents can get extremely strong near the temple point.',
    tipsMr: 'समुद्रात उतरण्यापूर्वी सुरक्षेचे फलक वाचा. मंदिर परिसरात पाणी खोल असते.',
    transport: '30 km from Ratnagiri Railway station (Konkan Railway line). Easily accessible by road.',
    transportMr: 'रत्नागिरी रेल्वे स्टेशनपासून ३० किमी (कोकण रेल्वे). गाडीने जाता येते.',
    hotels: 'MTDC Beach Resort Ganpatipule, Abhishek Beach Resort',
    restaurants: 'MTDC Tarang Restaurant (serving authentic Konkani Ukadiche Modak and Fish Thali)'
  }
];

// Content Experiences
const EXPERIENCES = [
  { id: 'heritage', title: 'UNESCO Heritage', icon: Award, count: 5, bg: 'from-amber-600/10 to-transparent' },
  { id: 'hill_station', title: 'Hill Stations', icon: CompassIcon, count: 10, bg: 'from-emerald-600/10 to-transparent' },
  { id: 'wildlife', title: 'Wildlife Safaris', icon: Flame, count: 8, bg: 'from-orange-600/10 to-transparent' },
  { id: 'beach', title: 'Prised Beaches', icon: Anchor, count: 12, bg: 'from-blue-600/10 to-transparent' },
  { id: 'pilgrimage', title: 'Spiritual Shrines', icon: MapIcon, count: 15, bg: 'from-red-600/10 to-transparent' },
  { id: 'adventure', title: 'Trekking & Adventure', icon: Tent, count: 9, bg: 'from-teal-600/10 to-transparent' }
];

// Traditional cuisine of Maharashtra (Requested in User Intent)
const TRADITIONAL_CUISINE = [
  { name: 'Puran Poli', nameMr: 'पुरणपोळी', url: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=400&q=80', desc: 'Delicious sweet wheat flatbread stuffed with sweet lentil and jaggery filling.', descMr: 'डाळ आणि गूळ भरून बनवलेली चवदार आणि गोड पारंपरिक महाराष्ट्रीयन चपाती.' },
  { name: 'Misal Pav', nameMr: 'मिसळपाव', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=400&q=80', desc: 'Zesty, spicy curry of sprouted lentils topped with crispy farsan and onion, served with soft bread.', descMr: 'मोड आलेल्या मटकीचा तिखट रस्सा, त्यावर शेव-फरसाण आणि कांदा, पावासोबत दिला जातो.' },
  { name: 'Ukadiche Modak', nameMr: 'उकडीचे मोदक', url: 'https://images.unsplash.com/photo-1615966689782-b49e5d03c24d?auto=format&fit=crop&w=400&q=80', desc: 'Divine steamed rice-flour dumplings stuffed with fresh grated coconut and sweet organic jaggery.', descMr: 'तांदळाच्या पिठात खोबरे आणि गूळ भरून वाफवलेला गणपती बाप्पाचा लाडका नैवेद्य.' },
  { name: 'Kombdi Vade', nameMr: 'कोंबडी वडे', url: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=400&q=80', desc: 'Saffron chicken curry paired with fluffy deep-fried multi-grain bread rings from Konkan.', descMr: 'कोकणातील सुप्रसिद्ध चिकन रस्सा आणि तळून फुगवलेले गरम वडे.' }
];

// Travel Packages (Requested in User Intent)
const TRAVEL_PACKAGES = [
  { id: 'weekend', title: 'Weekend Gateway', duration: '3 Days', price: '₹9,999 / $120', includes: ['Lonavala waterfalls', 'Lohagad Fort trek', 'Pawna Camping', 'Private Guide', 'Transport'], image: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=500&q=80', badge: 'Popular' },
  { id: 'heritage_5d', title: 'Ajanta Ellora Heritage', duration: '5 Days', price: '₹14,999 / $180', includes: ['Cave 16 Kailash Temple', 'Ajanta fresco tour', 'Bibi Ka Maqbara', 'MTDC Stay', 'Airport pick & drop'], image: 'https://images.unsplash.com/photo-1608958416754-0418382ba185?auto=format&fit=crop&w=500&q=80', badge: 'Best Seller' },
  { id: 'safari_5d', title: 'Tadoba Royal Tiger Safari', duration: '5 Days', price: '₹19,999 / $240', includes: ['3 Open Gypsy Safaris', 'Naturalist Guide', 'Luxury Eco-resort', 'All meals', 'Nagpur Rail transfers'], image: 'https://images.unsplash.com/photo-1602491453977-1b416305010a?auto=format&fit=crop&w=500&q=80', badge: 'Adventure' },
  { id: 'luxury_7d', title: 'Luxury Konkan Golden Coast', duration: '7 Days', price: '₹29,999 / $360', includes: ['Ganpatipule Ganesha temple', 'Tarkarli Scuba diving', 'Jaigad Fort cruise', 'Seafront luxury cottage', 'Solkadhi seafood tastings'], image: 'https://images.unsplash.com/photo-1615966689782-b49e5d03c24d?auto=format&fit=crop&w=500&q=80', badge: 'Luxury' }
];

// Frequently Asked Questions (Requested in User Intent)
const FAQS = [
  { q: 'Is it safe to visit Maharashtra hill stations during peak monsoon season?', a: 'Yes! Hill stations like Lonavala and Mahabaleshwar are absolutely beautiful and green during the monsoons (June to September). However, drive with caution, prepare for slippery steps, and follow all official weather guidelines and local road advisories.' },
  { q: 'How do I book online forest safaris for Tadoba tiger reserve?', a: 'Tadoba open jeep safaris should be booked 60 to 90 days in advance via our official online booking portal at mahabooking.com to guarantee slot availability.' },
  { q: 'What is the "Virtual Digital Passport" companion app?', a: 'It is a state-of-the-art interactive companion system. Travelers can geolocate near actual sites, complete historical quizzes, claim digital stamps, earn Experience Points (XP), and unlock official tourism merit badges!' },
  { q: 'How is the local public transport connectivity to UNESCO sites?', a: 'Both Ajanta and Ellora caves are excellently connected via air (Chhatrapati Sambhaji Nagar Airport) and frequent AC/non-AC luxury state transport buses running directly from Pune, Mumbai, and central city terminals.' }
];

// Pinterest-Style Gallery Items with category filtering (Requested in User Intent)
const GALLERY_ITEMS = [
  { id: 1, title: 'Gateway Sunset Arch', category: 'Heritage', url: 'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?auto=format&fit=crop&w=600&q=80', type: 'image' },
  { id: 2, title: 'Ajanta Cave 1 Padmapani', category: 'Heritage', url: 'https://images.unsplash.com/photo-1608958416754-0418382ba185?auto=format&fit=crop&w=600&q=80', type: 'image' },
  { id: 3, title: 'Tadoba Tigress Royal Stride', category: 'Wildlife', url: 'https://images.unsplash.com/photo-1602491453977-1b416305010a?auto=format&fit=crop&w=600&q=80', type: 'image' },
  { id: 4, title: 'Matheran Narrow-gauge Toy train', category: 'Hill Stations', url: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80', type: 'image' },
  { id: 5, title: 'Ganpatipule Golden Coastline', category: 'Beaches', url: 'https://images.unsplash.com/photo-1615966689782-b49e5d03c24d?auto=format&fit=crop&w=600&q=80', type: 'image' },
  { id: 6, title: 'Kailash Top-down Rock Carving', category: 'Heritage', url: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80', type: 'image' },
  { id: 7, title: 'Maharashtra Tourism Promotional Film', category: 'Video', url: 'https://images.unsplash.com/photo-1566552881560-0be862a7c445?auto=format&fit=crop&w=600&q=80', type: 'video' },
  { id: 8, title: '360° Virtual Tour: Shaniwar Wada Fort', category: '360° VR', url: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600&q=80', type: '360' }
];

export default function OfficialPortal({ language, onLanguageChange, onOpenCompanion, onNavigateToQuiz }: OfficialPortalProps) {
  // Hero slider active image state
  const [heroIndex, setHeroIndex] = useState(0);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [districtFilter, setDistrictFilter] = useState('All');
  
  // Selected destination modal details
  const [selectedDest, setSelectedDest] = useState<typeof PORTAL_DESTINATIONS[0] | null>(null);
  
  // Interactive booking states
  const [bookingTab, setBookingTab] = useState<'tour' | 'hotel' | 'guide' | 'safari' | 'adventure' | 'transport'>('tour');
  const [bookingForm, setBookingTabForm] = useState({
    name: '',
    phone: '',
    date: '',
    guests: '2',
    notes: '',
    hotelType: 'Luxury resort',
    transportType: 'SUV private cab'
  });
  const [isBooked, setIsBooked] = useState(false);

  // Inquiry form states
  const [inquiryForm, setInquiryForm] = useState({ name: '', email: '', message: '' });
  const [isInquirySent, setIsInquirySent] = useState(false);

  // Gallery active filters
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [lightboxItem, setLightboxItem] = useState<typeof GALLERY_ITEMS[0] | null>(null);

  // Auto rotate hero slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIndex(prev => (prev + 1) % HERO_BACKGROUND_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
    setTimeout(() => {
      setIsBooked(false);
      setBookingTabForm({ name: '', phone: '', date: '', guests: '2', notes: '', hotelType: 'Luxury resort', transportType: 'SUV private cab' });
    }, 4000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsInquirySent(true);
    setTimeout(() => {
      setIsInquirySent(false);
      setInquiryForm({ name: '', email: '', message: '' });
    }, 4000);
  };

  // Filtered destinations list
  const filteredDestinations = PORTAL_DESTINATIONS.filter(dest => {
    const matchQuery = 
      dest.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      dest.nameMr.includes(searchQuery) ||
      dest.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
      dest.category.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchCategory = categoryFilter === 'All' || dest.category === categoryFilter;
    const matchDistrict = districtFilter === 'All' || dest.districtKey === districtFilter;
    
    return matchQuery && matchCategory && matchDistrict;
  });

  return (
    <div className="flex-1 w-full bg-[#F8F3EA] text-slate-800 font-sans selection:bg-[#E86B21]/20 select-text overflow-y-auto">
      
      {/* 1. TOP HEADER & NAVBAR (Official Branding Style) */}
      <header className="sticky top-0 z-30 w-full bg-[#F8F3EA]/90 backdrop-blur-md border-b border-[#E86B21]/10 px-4 lg:px-8 py-3 flex items-center justify-between shadow-sm">
        <MaharashtraLogo size={42} />
        
        {/* Navigation Menu Links */}
        <nav className="hidden xl:flex items-center gap-6 text-xs font-bold text-[#503122] uppercase tracking-wider">
          <a href="#hero" className="hover:text-[#E86B21] transition">Home</a>
          <a href="#destinations" className="hover:text-[#E86B21] transition">Destinations</a>
          <a href="#experiences" className="hover:text-[#E86B21] transition">Experiences</a>
          <a href="#cuisine" className="hover:text-[#E86B21] transition">Cuisine</a>
          <a href="#booking" className="hover:text-[#E86B21] transition">Bookings</a>
          <a href="#packages" className="hover:text-[#E86B21] transition">Packages</a>
          <a href="#gallery" className="hover:text-[#E86B21] transition">Gallery</a>
          <a href="#contact" className="hover:text-[#E86B21] transition">Contact</a>
        </nav>

        {/* Action Controls & Language */}
        <div className="flex items-center gap-3">
          {/* Language Toggle */}
          <div className="bg-[#503122]/5 p-0.5 rounded-lg flex border border-[#503122]/10 text-[10px] font-black uppercase">
            <button 
              onClick={() => onLanguageChange('en')}
              className={`px-2.5 py-1 rounded-md transition ${language === 'en' ? 'bg-[#E86B21] text-white' : 'text-[#503122]'}`}
            >
              EN
            </button>
            <button 
              onClick={() => onLanguageChange('mr')}
              className={`px-2.5 py-1 rounded-md transition ${language === 'mr' ? 'bg-[#E86B21] text-white' : 'text-[#503122]'}`}
            >
              मराठी
            </button>
          </div>

          {/* Interactive Gamification Trigger button */}
          <button
            onClick={() => onOpenCompanion()}
            className="flex items-center gap-1.5 text-xs font-black tracking-wide uppercase px-4 py-2 rounded-xl text-white bg-gradient-to-r from-[#E86B21] to-[#C45512] hover:brightness-110 active:scale-95 transition shadow-md shadow-[#E86B21]/15 animate-pulse"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{language === 'mr' ? 'डिजिटल पासपोर्ट' : 'Passport App'}</span>
          </button>
        </div>
      </header>

      {/* 2. PARALLAX HERO SECTION (slideshow rotating background) */}
      <section id="hero" className="relative w-full h-[600px] flex items-center justify-center overflow-hidden">
        {/* Animated Slide Background */}
        <div className="absolute inset-0 bg-slate-950">
          <AnimatePresence mode="popLayout">
            <motion.div
              key={heroIndex}
              initial={{ scale: 1.15, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.5 }}
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: `url(${HERO_BACKGROUND_SLIDES[heroIndex].url})` }}
            />
          </AnimatePresence>
          {/* Saffron and dark brown gradient overlay to ensure text is fully readable */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#503122] via-slate-950/70 to-slate-950/40" />
          
          {/* Subtle Tribal Warli overlay lines on top left and bottom right */}
          <div className="absolute top-8 left-0 right-0 h-4 bg-repeat-x opacity-40" style={{ backgroundImage: 'radial-gradient(circle, #E86B21 2px, transparent 3px)', backgroundSize: '16px 16px' }} />
        </div>

        {/* Inner Content overlay */}
        <div className="relative z-10 w-full max-w-4xl mx-auto text-center px-4 flex flex-col items-center">
          <div className="bg-[#E86B21]/15 border border-[#E86B21]/30 backdrop-blur-md rounded-full px-4 py-1.5 mb-6 text-xs text-[#FDE68A] font-extrabold uppercase tracking-[0.25em] flex items-center gap-2">
            <Award className="w-3.5 h-3.5" />
            <span>OFFICIAL MAHARASHTRA GOVERNMENT PORTAL</span>
          </div>
          
          <h1 className="text-4xl md:text-7xl font-black text-white font-display leading-tight mb-4 tracking-tight">
            {language === 'mr' ? 'अनुभवा महाराष्ट्र' : 'Experience Maharashtra'}
          </h1>
          <p className="text-[#FDE68A] text-2xl md:text-4xl italic font-display font-medium mb-6 tracking-wide">
            {language === 'mr' ? 'जीवन: भव्य आणि अथांग' : 'Life Larger Than Life'}
          </p>
          <p className="text-slate-100 text-sm md:text-base max-w-2xl leading-relaxed mb-8 font-light">
            {language === 'mr' 
              ? 'युनेस्को जागतिक वारसा स्थळे, वन्यजीव अभयारण्ये, डोंगरदऱ्यांमधील थंड हवेची ठिकाणे, शांत समुद्रकिनारे, पवित्र मंदिरे आणि थरारक साहसांचा शोध घ्या.' 
              : 'Discover majestic UNESCO World Heritage Sites, raw untamed wildlife, evergreen hill stations, golden beaches, rich spiritual sanctuaries, and historical mountain forts.'}
          </p>

          {/* Call To Actions */}
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#destinations"
              className="px-8 py-3.5 text-xs font-black uppercase tracking-wider text-slate-950 bg-gradient-to-r from-[#FDE68A] to-[#E86B21] rounded-xl hover:brightness-110 shadow-lg shadow-[#E86B21]/20 transition-all transform active:scale-95"
            >
              {language === 'mr' ? 'पर्यटन स्थळे शोधा' : 'Explore Maharashtra'}
            </a>
            <a
              href="#booking"
              className="px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white border-2 border-white/30 bg-white/5 backdrop-blur-md rounded-xl hover:bg-white hover:text-[#503122] transition-all transform active:scale-95"
            >
              {language === 'mr' ? 'तिकीट व टूर बुक करा' : 'Book Your Trip'}
            </a>
            <a
              href="#gallery"
              className="px-8 py-3.5 text-xs font-black uppercase tracking-wider text-white border border-dashed border-white/20 rounded-xl hover:border-[#E86B21] hover:text-[#E86B21] transition-all"
            >
              {language === 'mr' ? 'व्हिडीओ गॅलरी' : 'Watch Promotional Film'}
            </a>
          </div>
        </div>

        {/* Small slide index bubble indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {HERO_BACKGROUND_SLIDES.slice(0, 8).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setHeroIndex(idx)}
              className={`w-2.5 h-2.5 rounded-full transition-all ${idx === heroIndex ? 'bg-[#E86B21] w-6' : 'bg-white/30'}`}
            />
          ))}
        </div>
      </section>

      {/* 3. DYNAMIC SEARCH & BENTO DESTINATION CATEGORIES SECTION */}
      <section id="destinations" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-black text-[#E86B21] uppercase tracking-[0.25em]">EXPLORE WORLD-CLASS MONUMENTS</span>
          <h2 className="text-3xl md:text-4xl font-black text-[#503122] font-display mt-2">
            {language === 'mr' ? 'पर्यटन स्थळे आणि आकर्षणे' : 'Find Your Next Adventure'}
          </h2>
          <div className="w-16 h-1 bg-[#E86B21] mx-auto mt-4 rounded-full" />
        </div>

        {/* Live Search Engine + Filters */}
        <div className="bg-white p-6 rounded-2xl shadow-md border border-[#E86B21]/10 mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:flex-1">
            <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={language === 'mr' ? 'शहर, जिल्हा, किंवा श्रेणी शोधा... (उदा. अजिंठा, वन्यजीव)' : 'Search by City, Category, Temple, Beach, Hill Station, UNESCO...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#F8F3EA]/30 border border-[#E86B21]/15 rounded-xl pl-12 pr-4 py-3 text-sm focus:outline-none focus:border-[#E86B21] focus:ring-1 focus:ring-[#E86B21]"
            />
          </div>

          <div className="flex gap-3 w-full md:w-auto">
            {/* Category Select Filter */}
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-[#F8F3EA] border border-[#E86B21]/15 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-[#E86B21]"
            >
              <option value="All">{language === 'mr' ? 'सर्व श्रेण्या' : 'All Categories'}</option>
              <option value="Historical Monuments">{language === 'mr' ? 'ऐतिहासिक वास्तू' : 'Historical Monuments'}</option>
              <option value="Hill Stations">{language === 'mr' ? 'थंड हवेची ठिकाणे' : 'Hill Stations'}</option>
              <option value="Wildlife">{language === 'mr' ? 'वन्यजीव आणि अभयारण्य' : 'Wildlife'}</option>
              <option value="Beaches">{language === 'mr' ? 'कोकण किनारे' : 'Beaches'}</option>
            </select>

            {/* District Select Filter */}
            <select
              value={districtFilter}
              onChange={(e) => setDistrictFilter(e.target.value)}
              className="bg-[#F8F3EA] border border-[#E86B21]/15 text-xs font-bold rounded-xl px-4 py-3 focus:outline-none focus:border-[#E86B21]"
            >
              <option value="All">{language === 'mr' ? 'सर्व जिल्हे' : 'All Districts'}</option>
              <option value="mumbai">Mumbai</option>
              <option value="pune">Pune</option>
              <option value="satara">Satara</option>
              <option value="aurangabad">Chhatrapati Sambhaji Nagar</option>
              <option value="chandrapur">Chandrapur</option>
              <option value="ratnagiri">Ratnagiri</option>
            </select>
          </div>
        </div>

        {/* Dynamic Destinations Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map(dest => (
            <motion.div
              key={dest.id}
              layout
              className="bg-white rounded-2xl overflow-hidden border border-[#503122]/10 shadow-sm hover:shadow-xl transition-all duration-300 group"
            >
              {/* Card Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={dest.imageUrl}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  alt={dest.name}
                  loading="lazy"
                />
                <span className="absolute top-4 left-4 bg-slate-950/80 text-white backdrop-blur-md text-[10px] font-extrabold uppercase px-3 py-1 rounded-full border border-white/10">
                  {dest.category}
                </span>
                
                {/* Rating badge */}
                <div className="absolute bottom-4 right-4 bg-white/95 text-[#503122] backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-bold flex items-center gap-1 shadow-md">
                  <span className="text-[#E86B21]">★</span>
                  <span>{dest.rating}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-5 flex flex-col justify-between h-[230px]">
                <div>
                  <div className="flex items-center gap-1 text-[11px] text-[#2D6A4F] font-bold uppercase tracking-wider mb-1">
                    <MapPin className="w-3.5 h-3.5 text-[#E86B21]" />
                    <span>{dest.district}</span>
                  </div>
                  <h3 className="text-lg font-bold text-[#503122] font-display line-clamp-1 mb-2">
                    {language === 'mr' ? dest.nameMr : dest.name}
                  </h3>
                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-3">
                    {language === 'mr' ? dest.descriptionMr : dest.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-left">
                    <span className="block text-[9px] font-black uppercase text-slate-400">{language === 'mr' ? 'सर्वोत्तम काळ' : 'Best Time'}</span>
                    <span className="text-[10px] font-bold text-[#503122] line-clamp-1">{language === 'mr' ? dest.bestTimeMr : dest.bestTime}</span>
                  </div>

                  <div className="flex gap-2">
                    {/* Open Companion applet */}
                    <button
                      onClick={() => onOpenCompanion(dest.id)}
                      className="p-2 rounded-lg bg-[#E86B21]/10 text-[#E86B21] hover:bg-[#E86B21] hover:text-white transition"
                      title={language === 'mr' ? 'पासपोर्टमध्ये उघडा' : 'Unlock Stamp in Passport'}
                    >
                      <Sparkles className="w-4 h-4" />
                    </button>
                    {/* View Details */}
                    <button
                      onClick={() => setSelectedDest(dest)}
                      className="px-4 py-2 bg-[#503122] hover:bg-[#E86B21] text-white text-xs font-bold rounded-lg transition"
                    >
                      {language === 'mr' ? 'पहा' : 'Explore'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
          
          {filteredDestinations.length === 0 && (
            <div className="col-span-full text-center py-16 bg-white border border-dashed border-[#E86B21]/20 rounded-2xl">
              <HelpCircle className="w-12 h-12 text-[#E86B21]/40 mx-auto mb-4" />
              <h4 className="text-base font-bold text-[#503122]">{language === 'mr' ? 'काहीही सापडले नाही' : 'No destinations found'}</h4>
              <p className="text-xs text-slate-400 mt-1">{language === 'mr' ? 'कृपया शोध संज्ञा किंवा जिल्हे तपासा.' : 'Try adjusting your search queries or category filters.'}</p>
            </div>
          )}
        </div>
      </section>

      {/* 4. EXPANSIVE "UNESCO HERITAGE" & "EXPERIENCES" BENTO SECTIONS */}
      <section id="experiences" className="bg-[#503122]/5 py-16 px-4 lg:px-8 border-y border-[#E86B21]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-black text-[#E86B21] uppercase tracking-[0.25em]">IMMERSE IN LOCAL CULTURE</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#503122] font-display mt-2">
              {language === 'mr' ? 'महाराष्ट्रातील समृद्ध अनुभव' : 'Travel Themes & Experiences'}
            </h2>
            <div className="w-16 h-1 bg-[#E86B21] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {EXPERIENCES.map(exp => {
              const IconComp = exp.icon;
              return (
                <div
                  key={exp.id}
                  onClick={() => setCategoryFilter(exp.title)}
                  className={`bg-white rounded-2xl p-5 border border-[#503122]/10 hover:border-[#E86B21] transition-all duration-300 shadow-sm cursor-pointer hover:-translate-y-1`}
                >
                  <div className="w-10 h-10 rounded-xl bg-[#E86B21]/10 flex items-center justify-center text-[#E86B21] mb-4">
                    <IconComp className="w-5 h-5" />
                  </div>
                  <h3 className="text-xs font-bold text-[#503122] uppercase tracking-wider">{exp.title}</h3>
                  <span className="text-[10px] text-slate-400 mt-1 block">{exp.count} {language === 'mr' ? 'स्थाने' : 'Premium spots'}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 5. CUISINE HIGHLIGHT SECTION */}
      <section id="cuisine" className="py-16 px-4 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5 text-left">
            <span className="text-xs font-black text-[#E86B21] uppercase tracking-[0.25em]">CULINARY ODYSSEY</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#503122] font-display mt-2">
              {language === 'mr' ? 'पारंपरिक महाराष्ट्रीयन खाद्यसंस्कृती' : 'Authentic Flavors'}
            </h2>
            <p className="text-slate-500 text-xs md:text-sm leading-relaxed mt-4 mb-6">
              {language === 'mr' 
                ? 'कोकणातील खोबरे-मसालेयुक्त मासे ते विदर्भातील अति-झणझणीत वऱ्हाडी रस्सा, आणि मुंबईचे सुप्रसिद्ध चटकेदार वडापाव व गोडधोड उकडीचे मोदक, महाराष्ट्राचे ताट नेहमीच वैविध्यपूर्ण असते.' 
                : 'From spicy Varhadi curries of Vidarbha to sweet steamed rice modaks offered to Lord Ganesha, or sea-fresh coconut fish stews of the Konkan coastline, Maharashtrian dishes represent a stunning depth of spice blends.'}
            </p>
            <div className="flex gap-4">
              <a href="#booking" className="px-6 py-2.5 text-xs font-bold bg-[#E86B21] text-white rounded-lg hover:bg-[#C45512] transition">
                {language === 'mr' ? 'खाद्य फेरफटका बुक करा' : 'Book Food Tour'}
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {TRADITIONAL_CUISINE.map((food, i) => (
              <div key={i} className="bg-white rounded-2xl overflow-hidden border border-[#503122]/10 shadow-sm flex items-center p-3 gap-4">
                <img src={food.url} className="w-16 h-16 rounded-xl object-cover" alt="" />
                <div>
                  <h3 className="text-sm font-bold text-[#503122] font-display">
                    {language === 'mr' ? food.nameMr : food.name}
                  </h3>
                  <p className="text-[10px] text-slate-500 line-clamp-2 mt-1 leading-snug">
                    {language === 'mr' ? food.descMr : food.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. TRAVEL PACKAGES ENGINE */}
      <section id="packages" className="bg-[#E86B21]/5 py-16 px-4 lg:px-8 border-y border-[#E86B21]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-black text-[#E86B21] uppercase tracking-[0.25em]">PLANNED ITINERARIES</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#503122] font-display mt-2">
              {language === 'mr' ? 'अधिकृत पर्यटन पॅकेजेस' : 'Curated Travel Packages'}
            </h2>
            <div className="w-16 h-1 bg-[#E86B21] mx-auto mt-4 rounded-full" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TRAVEL_PACKAGES.map(pkg => (
              <div key={pkg.id} className="bg-white rounded-2xl overflow-hidden border border-[#503122]/10 shadow-md hover:shadow-xl transition flex flex-col justify-between h-[420px]">
                <div className="relative h-44 overflow-hidden">
                  <img src={pkg.image} className="w-full h-full object-cover" alt="" />
                  <span className="absolute top-3 left-3 bg-[#E86B21] text-white text-[9px] font-black uppercase px-2.5 py-1 rounded-md">
                    {pkg.badge}
                  </span>
                </div>
                
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-center text-xs font-black text-slate-400 mb-1">
                      <span>{pkg.duration}</span>
                      <span className="text-[#2D6A4F]">{pkg.price}</span>
                    </div>
                    <h3 className="text-base font-bold text-[#503122] font-display mb-3">{pkg.title}</h3>
                    
                    <div className="space-y-1">
                      {pkg.includes.slice(0, 3).map((inc, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-[10px] text-slate-500 font-semibold">
                          <span className="text-[#2D6A4F]">✔</span>
                          <span>{inc}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setBookingTab('tour');
                      setBookingTabForm(prev => ({ ...prev, notes: `Interested in ${pkg.title} (${pkg.duration}) package` }));
                      const elem = document.getElementById('booking');
                      if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full py-2 bg-[#503122] hover:bg-[#E86B21] text-white font-bold text-xs rounded-xl transition mt-4"
                  >
                    {language === 'mr' ? 'पॅकेज बुक करा' : 'Book Package'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. REAL-TIME BOOKING ENGINE (Requested in User Intent) */}
      <section id="booking" className="py-16 px-4 lg:px-8 max-w-4xl mx-auto">
        <div className="bg-white rounded-3xl border border-[#E86B21]/15 shadow-xl overflow-hidden">
          {/* Header */}
          <div className="p-6 bg-gradient-to-r from-[#503122] to-[#E86B21] text-white text-center">
            <h2 className="text-2xl font-black font-display">{language === 'mr' ? 'झटपट बुकिंग केंद्र' : 'Instant MTDC Booking Centre'}</h2>
            <p className="text-[11px] text-[#FDE68A] uppercase font-bold tracking-widest mt-1">Government Approved Tourism Services</p>
          </div>

          {/* Form Tabs */}
          <div className="flex border-b border-slate-100 bg-[#F8F3EA]/30 text-xs font-bold uppercase tracking-wider text-[#503122]">
            {(['tour', 'hotel', 'guide', 'safari', 'adventure', 'transport'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setBookingTab(tab)}
                className={`flex-1 py-3.5 text-center transition border-b-2 ${bookingTab === tab ? 'border-[#E86B21] text-[#E86B21] bg-white' : 'border-transparent hover:text-[#E86B21]'}`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Form Panel */}
          <form onSubmit={handleBookingSubmit} className="p-6 space-y-4 text-left">
            {isBooked ? (
              <div className="text-center py-10 space-y-3">
                <div className="w-16 h-16 bg-[#2D6A4F]/10 border border-[#2D6A4F]/30 text-[#2D6A4F] rounded-full flex items-center justify-center mx-auto text-3xl">
                  ✔
                </div>
                <h3 className="text-lg font-black text-[#503122]">{language === 'mr' ? 'बुकिंग विनंती यशस्वी!' : 'Booking Request Sent Successfully!'}</h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Our MTDC Tourism desk is checking availability. You will receive an official booking confirmation SMS and Email within 15 minutes!
                </p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={bookingForm.name}
                      onChange={(e) => setBookingTabForm(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full bg-[#F8F3EA]/30 border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">10-Digit Mobile Number</label>
                    <input
                      type="tel"
                      required
                      pattern="[0-9]{10}"
                      value={bookingForm.phone}
                      onChange={(e) => setBookingTabForm(prev => ({ ...prev, phone: e.target.value }))}
                      className="w-full bg-[#F8F3EA]/30 border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Travel Date</label>
                    <input
                      type="date"
                      required
                      value={bookingForm.date}
                      onChange={(e) => setBookingTabForm(prev => ({ ...prev, date: e.target.value }))}
                      className="w-full bg-[#F8F3EA]/30 border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Total Guests</label>
                    <select
                      value={bookingForm.guests}
                      onChange={(e) => setBookingTabForm(prev => ({ ...prev, guests: e.target.value }))}
                      className="w-full bg-[#F8F3EA]/30 border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                    >
                      <option value="1">1 Person</option>
                      <option value="2">2 Persons</option>
                      <option value="4">4 Persons</option>
                      <option value="8">Group (8+)</option>
                    </select>
                  </div>
                  {bookingTab === 'hotel' ? (
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Hotel Category</label>
                      <select
                        value={bookingForm.hotelType}
                        onChange={(e) => setBookingTabForm(prev => ({ ...prev, hotelType: e.target.value }))}
                        className="w-full bg-[#F8F3EA]/30 border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                      >
                        <option value="Luxury resort">Premium MTDC Luxury Resort</option>
                        <option value="Standard lodge">Standard Cozy Lodge</option>
                        <option value="Tent House">Wilderness Tents</option>
                      </select>
                    </div>
                  ) : bookingTab === 'transport' ? (
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Transport Vehicle</label>
                      <select
                        value={bookingForm.transportType}
                        onChange={(e) => setBookingTabForm(prev => ({ ...prev, transportType: e.target.value }))}
                        className="w-full bg-[#F8F3EA]/30 border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                      >
                        <option value="SUV private cab">Premium SUV Cruiser</option>
                        <option value="Sedan private cab">Standard Sedan Coach</option>
                        <option value="Luxury Traveler">Mini Traveler Bus (Group)</option>
                      </select>
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Service Required</label>
                      <div className="w-full bg-[#F8F3EA] text-slate-500 font-bold border border-[#E86B21]/10 rounded-xl px-4 py-2.5 text-xs uppercase tracking-wider">
                        MTDC APPROVED
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-black uppercase text-slate-400 mb-1">Special requests or details</label>
                  <textarea
                    rows={2}
                    placeholder="Enter names of spots, specific guide languages or preferences..."
                    value={bookingForm.notes}
                    onChange={(e) => setBookingTabForm(prev => ({ ...prev, notes: e.target.value }))}
                    className="w-full bg-[#F8F3EA]/30 border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 text-xs font-black uppercase tracking-wider text-white bg-gradient-to-r from-[#E86B21] to-[#C45512] rounded-xl hover:brightness-110 shadow-md"
                >
                  {language === 'mr' ? 'बुकिंग विनंती सबमिट करा' : `Confirm Book ${bookingTab}`}
                </button>
              </>
            )}
          </form>
        </div>
      </section>

      {/* 8. PINTEREST-STYLE GALLERY WITH FILTER AND LIGHTBOX */}
      <section id="gallery" className="bg-[#503122]/5 py-16 px-4 lg:px-8 border-t border-[#E86B21]/10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-black text-[#E86B21] uppercase tracking-[0.25em]">VISUAL SPECTACLE</span>
            <h2 className="text-3xl md:text-4xl font-black text-[#503122] font-display mt-2">
              {language === 'mr' ? 'फोटो आणि व्हिडीओ गॅलरी' : 'Media & Heritage Gallery'}
            </h2>
            <div className="w-16 h-1 bg-[#E86B21] mx-auto mt-4 rounded-full" />
          </div>

          {/* Filter Categories */}
          <div className="flex flex-wrap gap-2 justify-center mb-8">
            {['All', 'Heritage', 'Wildlife', 'Hill Stations', 'Beaches', '360° VR', 'Video'].map(cat => (
              <button
                key={cat}
                onClick={() => setGalleryFilter(cat)}
                className={`px-4 py-2 text-xs font-black rounded-lg transition border ${galleryFilter === cat ? 'bg-[#E86B21] text-white border-[#E86B21]' : 'bg-white text-[#503122] border-slate-100 hover:border-[#E86B21]'}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Pinterest Columns Layout */}
          <div className="columns-1 sm:columns-2 lg:columns-4 gap-6 space-y-6">
            {GALLERY_ITEMS.filter(item => galleryFilter === 'All' || item.category === galleryFilter).map(item => (
              <div
                key={item.id}
                onClick={() => setLightboxItem(item)}
                className="break-inside-avoid bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm cursor-pointer group relative"
              >
                <img src={item.url} className="w-full object-cover group-hover:brightness-90 transition duration-300" alt="" />
                
                {/* Image labels inside overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 p-4 flex flex-col justify-end text-left">
                  <span className="text-[9px] font-black uppercase text-[#FDE68A]">{item.category}</span>
                  <h4 className="text-xs font-bold text-white mt-0.5 flex items-center gap-1.5">
                    {item.type === 'video' ? <PlayCircle className="w-3.5 h-3.5" /> : item.type === '360' ? <Camera className="w-3.5 h-3.5" /> : <Layers className="w-3.5 h-3.5" />}
                    <span>{item.title}</span>
                  </h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. FAQ ACCORDION SECTION */}
      <section className="py-16 px-4 lg:px-8 max-w-4xl mx-auto text-left">
        <div className="text-center max-w-xl mx-auto mb-12">
          <span className="text-xs font-black text-[#E86B21] uppercase tracking-[0.25em]">HAVE QUESTIONS?</span>
          <h2 className="text-3xl font-black text-[#503122] font-display mt-2">
            {language === 'mr' ? 'वारंवार विचारले जाणारे प्रश्न' : 'Travel FAQs'}
          </h2>
          <div className="w-16 h-1 bg-[#E86B21] mx-auto mt-4 rounded-full" />
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm">
              <h3 className="text-sm font-bold text-[#503122] flex items-start gap-2.5">
                <span className="text-[#E86B21] text-base">Q.</span>
                <span>{faq.q}</span>
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mt-2.5 pl-6 border-l-2 border-[#E86B21]/20">
                {faq.a}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 10. CONTACT, ENQUIRY FORM & MTDC OFFICIAL TOURISM OFFICES (Requested in User Intent) */}
      <section id="contact" className="bg-white py-16 px-4 lg:px-8 border-t border-[#E86B21]/15">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* MTDC Tourism Offices Listing */}
          <div className="lg:col-span-5 text-left space-y-6">
            <div>
              <span className="text-xs font-black text-[#E86B21] uppercase tracking-[0.25em]">OFFICIAL MTDC CONTACTS</span>
              <h2 className="text-3xl font-black text-[#503122] font-display mt-2">
                {language === 'mr' ? 'पर्यटन कार्यालये संपर्क' : 'Tourism Offices'}
              </h2>
              <p className="text-xs text-slate-500 mt-2">Get in touch directly with our official administrative representatives:</p>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-4 bg-[#F8F3EA]/40 border border-[#E86B21]/10 rounded-2xl space-y-1.5">
                <h4 className="font-extrabold text-[#503122] uppercase tracking-wider">🏢 HEAD OFFICE (MUMBAI)</h4>
                <p className="text-slate-500">Directorate of Tourism, Government of Maharashtra</p>
                <p className="text-[#503122] font-semibold flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#E86B21]" />022-69107600 / Konkan: 022-20876416</p>
                <p className="text-[#503122] font-semibold flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-[#E86B21]" />diot@maharashtratourism.gov.in</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-3 bg-[#F8F3EA]/20 border border-slate-100 rounded-xl space-y-1">
                  <h4 className="font-extrabold text-[#503122]">📍 PUNE DISTRICT</h4>
                  <p className="text-[11px] text-[#503122] font-semibold"><Phone className="w-3 h-3 text-[#E86B21] inline mr-1" />020-29900289</p>
                </div>
                <div className="p-3 bg-[#F8F3EA]/20 border border-slate-100 rounded-xl space-y-1">
                  <h4 className="font-extrabold text-[#503122]">📍 CHH. SAMBHAJI NAGAR</h4>
                  <p className="text-[11px] text-[#503122] font-semibold"><Phone className="w-3 h-3 text-[#E86B21] inline mr-1" />0240-2990457</p>
                </div>
                <div className="p-3 bg-[#F8F3EA]/20 border border-slate-100 rounded-xl space-y-1">
                  <h4 className="font-extrabold text-[#503122]">📍 NAGPUR DIVISION</h4>
                  <p className="text-[11px] text-[#503122] font-semibold"><Phone className="w-3 h-3 text-[#E86B21] inline mr-1" />0712-2533327</p>
                </div>
                <div className="p-3 bg-[#F8F3EA]/20 border border-slate-100 rounded-xl space-y-1">
                  <h4 className="font-extrabold text-[#503122]">📍 NASHIK DISTRICT</h4>
                  <p className="text-[11px] text-[#503122] font-semibold"><Phone className="w-3 h-3 text-[#E86B21] inline mr-1" />0253-2995464</p>
                </div>
              </div>
            </div>
          </div>

          {/* Inquiry Form */}
          <div className="lg:col-span-7 bg-[#F8F3EA]/30 border border-[#E86B21]/15 rounded-3xl p-6 lg:p-8">
            <h3 className="text-xl font-black text-[#503122] font-display text-left mb-2">{language === 'mr' ? 'थेट चौकशी अर्ज' : 'Official Portal Inquiry'}</h3>
            <p className="text-xs text-slate-500 text-left mb-6">Have questions regarding permits, tour approvals, or customized government packages? Send us a quick note:</p>

            <form onSubmit={handleInquirySubmit} className="space-y-4 text-left">
              {isInquirySent ? (
                <div className="text-center py-10 space-y-3">
                  <div className="w-12 h-12 bg-[#2D6A4F]/10 text-[#2D6A4F] rounded-full flex items-center justify-center mx-auto text-2xl font-bold">✓</div>
                  <h4 className="font-black text-[#503122]">{language === 'mr' ? 'चौकशी अर्ज यशस्वीपणे पाठवला!' : 'Inquiry Message Sent!'}</h4>
                  <p className="text-xs text-slate-400">Our tourism team will review your comments and contact you shortly.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Your Name</label>
                      <input
                        type="text"
                        required
                        value={inquiryForm.name}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full bg-white border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Email Address</label>
                      <input
                        type="email"
                        required
                        value={inquiryForm.email}
                        onChange={(e) => setInquiryForm(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full bg-white border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[9px] font-black uppercase text-slate-400 mb-1">Comments or Questions</label>
                    <textarea
                      rows={3}
                      required
                      value={inquiryForm.message}
                      onChange={(e) => setInquiryForm(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full bg-white border border-[#E86B21]/15 rounded-xl px-4 py-2.5 text-xs focus:outline-none focus:border-[#E86B21]"
                      placeholder="Ask anything about Maharashtra tour guidelines, passport check-ins, or hotel stays..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 text-xs font-black uppercase text-white bg-[#503122] hover:bg-[#E86B21] rounded-xl transition-all"
                  >
                    {language === 'mr' ? 'अर्ज सबमिट करा' : 'Submit Inquiry'}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      {/* 11. PERSISTENT FOOTER SECTION */}
      <footer className="bg-[#503122] text-[#F8F3EA] py-12 px-4 lg:px-8 border-t-4 border-[#E86B21]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8 items-center justify-between border-b border-[#F8F3EA]/10 pb-8 mb-8 text-left">
          
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🦁</span>
              <div>
                <h3 className="text-base font-black tracking-widest text-[#E86B21] uppercase leading-none font-sans">MAHARASHTRA TOURISM</h3>
                <span className="text-[10px] text-amber-300 font-bold uppercase tracking-wider block mt-1">DIRECTORATE OF GOVERNMENT OF MAHARASHTRA</span>
              </div>
            </div>
            <p className="text-xs text-[#F8F3EA]/70 max-w-sm leading-relaxed">
              Explore the boundless magic, UNESCO monuments, roaring tigers, misty hilltops, and golden sandy beaches of western India.
            </p>
          </div>

          <div className="flex flex-wrap gap-8 text-xs font-semibold text-[#F8F3EA]/80">
            <div className="space-y-2">
              <h4 className="font-extrabold text-white text-[10px] uppercase tracking-widest text-[#E86B21]">QUICK LINKS</h4>
              <a href="#destinations" className="block hover:text-white">Explore Destinations</a>
              <a href="#experiences" className="block hover:text-white">Experiences Index</a>
              <a href="#packages" className="block hover:text-white">Tour Packages</a>
              <a href="#contact" className="block hover:text-white">Tourism Offices</a>
            </div>
            <div className="space-y-2">
              <h4 className="font-extrabold text-white text-[10px] uppercase tracking-widest text-[#E86B21]">LEGAL ADVISORY</h4>
              <span className="block hover:text-white cursor-pointer">Privacy Policy</span>
              <span className="block hover:text-white cursor-pointer">Terms & Conditions</span>
              <span className="block hover:text-white cursor-pointer">MTDC Reservations</span>
              <span className="block hover:text-white cursor-pointer">Government Portal Policy</span>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-[10px] text-[#F8F3EA]/50 font-semibold font-mono">
          <span>© {new Date().getFullYear()} MAHARASHTRA TOURISM. ALL RIGHTS RESERVED. GOVERNMENT PORTAL PRE-ALPHA WRAPPER.</span>
          <span className="mt-2 sm:mt-0 uppercase tracking-widest text-amber-300/40">Mahanubhuti - Life Larger Than Life</span>
        </div>
      </footer>

      {/* 12. FLOATING DETAIL MODAL POPUP FOR EXPLORING */}
      <AnimatePresence>
        {selectedDest && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-[#F8F3EA] text-slate-800 rounded-3xl overflow-hidden border border-[#E86B21]/20 shadow-2xl max-w-2xl w-full max-h-[85vh] flex flex-col text-left"
            >
              {/* Image banner */}
              <div className="relative h-60 shrink-0">
                <img src={selectedDest.imageUrl} className="w-full h-full object-cover" alt="" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#503122]/90 via-transparent to-transparent" />
                <button
                  onClick={() => setSelectedDest(null)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950 transition"
                >
                  <X className="w-4 h-4" />
                </button>
                
                <div className="absolute bottom-4 left-6">
                  <span className="text-[10px] font-black uppercase text-[#FDE68A]">{selectedDest.category}</span>
                  <h3 className="text-2xl font-black text-white font-display mt-0.5">
                    {language === 'mr' ? selectedDest.nameMr : selectedDest.name}
                  </h3>
                </div>
              </div>

              {/* Scrollable details */}
              <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-600 leading-relaxed">
                <div>
                  <h4 className="font-black text-[#503122] uppercase tracking-wider mb-1.5">{language === 'mr' ? 'अवलोकन' : 'Overview'}</h4>
                  <p>{language === 'mr' ? selectedDest.descriptionMr : selectedDest.description}</p>
                </div>

                <div>
                  <h4 className="font-black text-[#503122] uppercase tracking-wider mb-1.5">{language === 'mr' ? 'इतिहास आणि महत्त्व' : 'History & Significance'}</h4>
                  <p>{language === 'mr' ? selectedDest.historyMr : selectedDest.history}</p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <h5 className="font-bold text-[#E86B21] flex items-center gap-1.5 mb-1">
                      <Calendar className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'सर्वोत्तम काळ' : 'Best Time to Visit'}</span>
                    </h5>
                    <p className="text-[11px]">{language === 'mr' ? selectedDest.bestTimeMr : selectedDest.bestTime}</p>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100">
                    <h5 className="font-bold text-[#E86B21] flex items-center gap-1.5 mb-1">
                      <Car className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'कसे पोहोचायचे' : 'How to Reach'}</span>
                    </h5>
                    <p className="text-[11px]">{language === 'mr' ? selectedDest.transportMr : selectedDest.transport}</p>
                  </div>
                </div>

                {selectedDest.highlights && (
                  <div>
                    <h4 className="font-black text-[#503122] uppercase tracking-wider mb-1.5">{language === 'mr' ? 'मुख्य आकर्षणे' : 'Highlights'}</h4>
                    <ul className="list-disc pl-5 space-y-1 text-slate-500">
                      {(language === 'mr' ? selectedDest.highlightsMr : selectedDest.highlights)?.map((hl, i) => (
                        <li key={i}>{hl}</li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedDest.tips && (
                  <div className="p-3 bg-amber-500/10 border border-amber-500/20 text-[#503122] rounded-xl flex items-start gap-2.5">
                    <AlertTriangle className="w-4 h-4 text-[#E86B21] shrink-0 mt-0.5" />
                    <div>
                      <h5 className="font-black text-xs text-[#E86B21]">{language === 'mr' ? 'प्रवास सल्ला आणि टिप्स' : 'Important Advisory'}</h5>
                      <p className="text-[11px] leading-snug mt-1">{language === 'mr' ? selectedDest.tipsMr : selectedDest.tips}</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="p-4 bg-slate-100/50 border-t border-slate-200 flex justify-between gap-3 shrink-0">
                <button
                  onClick={() => {
                    onOpenCompanion(selectedDest.id);
                    setSelectedDest(null);
                  }}
                  className="flex-1 py-2.5 bg-gradient-to-r from-[#E86B21] to-[#C45512] text-white font-black text-xs uppercase tracking-wider rounded-xl hover:brightness-110 transition flex items-center justify-center gap-1.5 shadow"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{language === 'mr' ? 'पासपोर्ट मध्ये तपासा' : 'Open in Companion App'}</span>
                </button>
                <button
                  onClick={() => setSelectedDest(null)}
                  className="px-6 py-2.5 bg-[#503122] hover:bg-[#E86B21] text-white font-bold text-xs rounded-xl transition"
                >
                  {language === 'mr' ? 'बंद करा' : 'Close'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lightbox Modal for Gallery */}
      <AnimatePresence>
        {lightboxItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxItem(null)}
            className="fixed inset-0 z-50 bg-slate-950/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-pointer"
          >
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden border border-white/10 shadow-2xl"
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-950/60 text-white hover:bg-slate-950 transition z-10"
              >
                <X className="w-4 h-4" />
              </button>
              
              <div className="relative aspect-video">
                <img src={lightboxItem.url} className="w-full h-full object-cover" alt="" />
                
                {lightboxItem.type === 'video' && (
                  <div className="absolute inset-0 bg-slate-950/40 flex items-center justify-center">
                    <PlayCircle className="w-20 h-20 text-white hover:scale-115 transition duration-300" />
                  </div>
                )}
                {lightboxItem.type === '360' && (
                  <div className="absolute inset-0 bg-slate-950/20 flex items-center justify-center">
                    <div className="bg-slate-950/60 backdrop-blur-sm px-4 py-2 rounded-full text-white text-xs font-black uppercase tracking-widest flex items-center gap-2">
                      <Camera className="w-4 h-4 text-[#E86B21]" />
                      <span>Interactive 360° Virtual Tour Preview</span>
                    </div>
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-slate-950 text-left">
                <span className="text-[10px] font-black uppercase text-[#E86B21]">{lightboxItem.category}</span>
                <h3 className="text-sm font-bold text-white mt-1">{lightboxItem.title}</h3>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
