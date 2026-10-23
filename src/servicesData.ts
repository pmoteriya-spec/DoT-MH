import { CarService, GuideService, ActivityService, Artisan, PermitApplication, Booking, Review } from './types';

export const INITIAL_CARS: CarService[] = [
  {
    id: 'car_innova_crysta',
    name: 'Sahyadri Ghats Innova Crysta SUV',
    nameMr: 'सह्याद्री घाट इनोव्हा क्रिस्टा एसयूव्ही',
    category: 'suv',
    vehicleModel: 'Toyota Innova Crysta 2.4 VX',
    capacity: 7,
    luggageCount: 5,
    ac: true,
    basePrice: 3800,
    priceUnit: 'per day (300 km included)',
    districtsCovered: ['pune', 'satara', 'raigad', 'mumbai'],
    driverName: 'Santosh Shinde',
    driverPhone: '+91 98224 81920',
    driverRating: 4.9,
    reviewCount: 142,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    features: ['Sahyadri Ghats Hill Expert Driver', 'Dual Climate AC', 'Hill-Hold Safety', 'Complimentary Bottled Water', 'Dashcam Installed'],
    featuresMr: ['घाट रस्त्यांचा निष्णात चालक', 'ड्युअल एसी', 'डोंगर चढाव सुरक्षा', 'मोफत मिनरल वॉटर', 'डॅशकॅम सुरक्षा'],
    available: true,
    reviews: [
      {
        id: 'rev_c1',
        serviceId: 'car_innova_crysta',
        userName: 'Vikram Joshi (Pune)',
        rating: 5,
        comment: 'Santosh drove us through dense fog at Amboli Ghat and Mahabaleshwar with extreme care. Vehicle was super clean and comfortable for all 6 of us!',
        date: '14 Oct 2026',
        tag: 'Safe & Punctual',
        helpfulCount: 18,
        verifiedBooking: true
      },
      {
        id: 'rev_c2',
        serviceId: 'car_innova_crysta',
        userName: 'Meera Deshmukh (Mumbai)',
        rating: 5,
        comment: 'Outstanding service for our family trip to Kaas Plateau. Highly recommend this Innova for senior citizens!',
        date: '02 Oct 2026',
        tag: 'Family Friendly',
        helpfulCount: 9,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'car_dzire_express',
    name: 'Mumbai-Pune Expressway Sedan',
    nameMr: 'मुंबई-पुणे एक्सप्रेसवे सेडान',
    category: 'sedan',
    vehicleModel: 'Maruti Suzuki Swift Dzire ZXi',
    capacity: 4,
    luggageCount: 3,
    ac: true,
    basePrice: 2200,
    priceUnit: 'per day (250 km included)',
    districtsCovered: ['pune', 'mumbai', 'raigad'],
    driverName: 'Ganesh Jadhav',
    driverPhone: '+91 98500 12847',
    driverRating: 4.8,
    reviewCount: 98,
    rating: 4.8,
    imageUrl: 'https://images.unsplash.com/photo-1550355291-bbee04a92027?auto=format&fit=crop&w=800&q=80',
    features: ['Expressway Fastag Active', 'Clean Chilled AC', 'USB Fast Charging', 'MTDC Tourism ID Badge'],
    featuresMr: ['फास्टॅग सुसज्ज', 'उत्तम एसी', 'फास्ट चार्जिंग', 'एमटीडीसी ओळखपत्र'],
    available: true,
    reviews: [
      {
        id: 'rev_c3',
        serviceId: 'car_dzire_express',
        userName: 'Rahul K. (Navi Mumbai)',
        rating: 5,
        comment: 'Punctual pickup at Dadar station, smooth ride to Lonavala and Karla caves.',
        date: '18 Oct 2026',
        tag: 'On Time',
        helpfulCount: 12,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'car_nexon_ev',
    name: 'Western Ghats Eco Electric Cab',
    nameMr: 'सह्याद्री इको इलेक्ट्रिक कॅब',
    category: 'ev',
    vehicleModel: 'Tata Nexon EV Long Range',
    capacity: 4,
    luggageCount: 3,
    ac: true,
    basePrice: 2600,
    priceUnit: 'per day (200 km included)',
    districtsCovered: ['pune', 'satara', 'mumbai'],
    driverName: 'Anita Patil',
    driverPhone: '+91 94220 54199',
    driverRating: 4.9,
    reviewCount: 76,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80',
    features: ['100% Zero Emission Green Travel', 'Silent Cabin', 'Fast Charging Priority', 'Verified Woman Driver'],
    featuresMr: ['शून्य प्रदूषण हरित प्रवास', 'शांत व आरामदायी', 'फास्ट चार्जिंग', 'प्रमाणित महिला चालक'],
    available: true,
    reviews: [
      {
        id: 'rev_c4',
        serviceId: 'car_nexon_ev',
        userName: 'Pooja Sawant (Thane)',
        rating: 5,
        comment: 'Anita is an inspiring driver! Silent EV drive through the hills felt serene and responsible.',
        date: '08 Oct 2026',
        tag: 'Eco-Friendly',
        helpfulCount: 22,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'car_konkan_suv',
    name: 'Konkan Coastal 4x4 Trail Cab',
    nameMr: 'कोकण सागरी ४x४ ट्रेल कॅब',
    category: 'suv',
    vehicleModel: 'Mahindra Scorpio-N 4WD',
    capacity: 6,
    luggageCount: 4,
    ac: true,
    basePrice: 4200,
    priceUnit: 'per day (300 km included)',
    districtsCovered: ['ratnagiri', 'sindhudurg', 'raigad'],
    driverName: 'Mandar Sawant',
    driverPhone: '+91 98231 66201',
    driverRating: 4.9,
    reviewCount: 110,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80',
    features: ['Beach Sand & Rough Terrain 4x4', 'Roof Carrier Rack', 'Local Konkani Seafood Expert', 'First Aid & Tool Kit'],
    featuresMr: ['वाळू आणि खडकाळ रस्त्यांसाठी ४x४', 'रूफ कॅरिअर', 'स्थानिक कोकणी मार्गदर्शक', 'प्रथमोपचार पेटी'],
    available: true,
    reviews: [
      {
        id: 'rev_c5',
        serviceId: 'car_konkan_suv',
        userName: 'Sanjay More (Kolhapur)',
        rating: 5,
        comment: 'Mandar took us to hidden virgin beaches around Malvan and Sindhudurg. Fantastic vehicle handling!',
        date: '11 Oct 2026',
        tag: 'Off-Road Pro',
        helpfulCount: 14,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'car_tempo_traveller',
    name: 'Maharashtra Heritage Tourist Tempo',
    nameMr: 'महाराष्ट्र हेरिटेज पर्यटक टेम्पो ट्रॅव्हलर',
    category: 'tempo',
    vehicleModel: 'Force Urbania / Tempo Traveller 17-Seater',
    capacity: 17,
    luggageCount: 15,
    ac: true,
    basePrice: 6500,
    priceUnit: 'per day (350 km included)',
    districtsCovered: ['aurangabad', 'nashik', 'pune', 'nagpur', 'chandrapur'],
    driverName: 'Rahul More & Co-Driver',
    driverPhone: '+91 98811 74432',
    driverRating: 4.95,
    reviewCount: 84,
    rating: 4.9,
    imageUrl: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=800&q=80',
    features: ['Reclining Pushback Seats', 'Individual AC Vents', 'PA Sound System for Guide', 'Luggage Boot Space'],
    featuresMr: ['पुशबॅक सीट्स', 'वैयक्तिक एसी व्हेंट्स', 'माईक व साऊंड सिस्टीम', 'मोठी लगेज जागा'],
    available: true,
    reviews: [
      {
        id: 'rev_c6',
        serviceId: 'car_tempo_traveller',
        userName: 'College History Tour (Aurangabad)',
        rating: 5,
        comment: 'Booked for Ajanta and Ellora 3-day excursion. Superb legroom and very courteous crew.',
        date: '05 Oct 2026',
        tag: 'Group Travel',
        helpfulCount: 16,
        verifiedBooking: true
      }
    ]
  }
];

export const INITIAL_GUIDES: GuideService[] = [
  {
    id: 'guide_aniruddha',
    name: 'Prof. Aniruddha Kulkarni',
    nameMr: 'प्रा. अनिरुद्ध कुलकर्णी',
    specialization: 'Maratha Forts Architecture & Military History',
    specializationMr: 'मराठा दुर्ग स्थापत्य आणि शिवकालीन इतिहास',
    districts: ['pune', 'raigad', 'satara'],
    destinationsCovered: ['raigad', 'lonavala', 'mahabaleshwar'],
    languages: ['Marathi', 'Hindi', 'English'],
    experienceYears: 16,
    pricePerDay: 2500,
    pricePerHalfDay: 1500,
    mtdcCertified: true,
    licenseNumber: 'MTDC-GUIDE-PUN-0891',
    rating: 4.96,
    reviewCount: 230,
    imageUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    bio: 'Author of 3 books on Sahyadri bastions. Specialized in Shivaji Maharaj naval tactics, secret water harvesting cisterns, and bastion defence design.',
    bioMr: 'सह्याद्रीतील गडकिल्ल्यांवर ३ पुस्तकांचे लेखक. शिवकालीन युद्धतंत्र, जलव्यवस्थापन आणि दुर्ग स्थापत्य शास्त्रातील विशेष तज्ज्ञ.',
    badges: ['MTDC Gold Certified', 'Sahyadri Historian', 'First-Aid Certified'],
    available: true,
    reviews: [
      {
        id: 'rev_g1',
        serviceId: 'guide_aniruddha',
        userName: 'Aditya Ranade (Mumbai)',
        rating: 5,
        comment: 'Listening to Prof. Kulkarni narrate the coronation at Raigad Fort brought goosebumps! Every rock had a story.',
        date: '15 Oct 2026',
        tag: 'Inspirational',
        helpfulCount: 34,
        verifiedBooking: true
      },
      {
        id: 'rev_g2',
        serviceId: 'guide_aniruddha',
        userName: 'Dr. Smita Rao (Bengaluru)',
        rating: 5,
        comment: 'Incredible depth of historical knowledge. He pointed out architectural secrets we would never have seen on our own.',
        date: '04 Oct 2026',
        tag: 'Expert Scholar',
        helpfulCount: 19,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'guide_vandana',
    name: 'Dr. Vandana Patil',
    nameMr: 'डॉ. वंदना पाटील',
    specialization: 'UNESCO Ajanta & Ellora Buddhist Art & Iconography',
    specializationMr: 'युनेस्को अजिंठा-वेरूळ बौद्ध कला आणि शिल्पकला',
    districts: ['aurangabad'],
    destinationsCovered: ['ajanta', 'ellora'],
    languages: ['English', 'Marathi', 'Hindi', 'German', 'Japanese'],
    experienceYears: 19,
    pricePerDay: 3200,
    pricePerHalfDay: 1800,
    mtdcCertified: true,
    licenseNumber: 'MTDC-GUIDE-AUR-0144',
    rating: 4.98,
    reviewCount: 312,
    imageUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    bio: 'Doctorate in Ancient Indian History & Rock-Cut Architecture. Decodes Jataka tales, natural pigment techniques, and Kailasa Temple engineering.',
    bioMr: 'प्राचीन भारतीय इतिहास आणि शैलोत्कीर्ण लेण्यांमध्ये डॉक्टरेट. जातक कथा, नैसर्गिक रंग आणि कैलास मंदिराच्या भव्य रचनेचे अभ्यासक.',
    badges: ['UNESCO Accredited', 'Multilingual Speaker', 'Archaeologist Scholar'],
    available: true,
    reviews: [
      {
        id: 'rev_g3',
        serviceId: 'guide_vandana',
        userName: 'Hans Mueller (Frankfurt)',
        rating: 5,
        comment: 'Dr. Vandana explained the frescoes of Ajanta in fluent German and breathtaking clarity. Cave 1 Padmapani narration was magical!',
        date: '12 Oct 2026',
        tag: 'World-Class',
        helpfulCount: 41,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'guide_sunil',
    name: 'Sunil Wankhede',
    nameMr: 'सुनील वानखेडे',
    specialization: 'Tiger Tracking, Avian Ecology & Wildlife Ethology',
    specializationMr: 'वाघ मागोवा, पक्षीशास्त्र आणि जंगल परिसंस्था',
    districts: ['chandrapur', 'nagpur'],
    destinationsCovered: ['tadoba', 'melghat'],
    languages: ['Marathi', 'Hindi', 'English'],
    experienceYears: 14,
    pricePerDay: 2200,
    pricePerHalfDay: 1400,
    mtdcCertified: true,
    licenseNumber: 'MTDC-GUIDE-CHND-0711',
    rating: 4.92,
    reviewCount: 188,
    imageUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    bio: 'Born in Vidarbha forests. Reads pugmarks, alarm calls of Spotted Deer and Langurs with precision. 90%+ tiger sighting record on morning safaris.',
    bioMr: 'विदर्भाच्या जंगलातील अनुभवी वाटाड्या. प्राण्यांच्या पाऊलखुणा आणि धोक्याच्या हाका ओळखण्यात तरबेज. सफारी दरम्यान उत्तम वाघ दर्शनाची नोंद.',
    badges: ['Senior Forest Naturalist', 'Birding Maestro', 'Jungle Tracker'],
    available: true,
    reviews: [
      {
        id: 'rev_g4',
        serviceId: 'guide_sunil',
        userName: 'Girish K. (Nagpur)',
        rating: 5,
        comment: 'Sunil heard a single deer alarm call and took our gypsy near Telia lake. Within 5 minutes, Tigress Maya walked right beside our jeep!',
        date: '17 Oct 2026',
        tag: 'Tiger Whisperer',
        helpfulCount: 28,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'guide_prathamesh',
    name: 'Prathamesh Kelkar',
    nameMr: 'प्रथमेश केळकर',
    specialization: 'Konkan Coastal Ecology, Sea Forts & Coral Habitats',
    specializationMr: 'कोकण सागरी पर्यावरण, जलदुर्ग आणि प्रवाळ',
    districts: ['sindhudurg', 'ratnagiri'],
    destinationsCovered: ['tarkarli', 'sindhudurg'],
    languages: ['Marathi', 'English', 'Hindi'],
    experienceYears: 10,
    pricePerDay: 1900,
    pricePerHalfDay: 1100,
    mtdcCertified: true,
    licenseNumber: 'MTDC-GUIDE-SIND-0422',
    rating: 4.88,
    reviewCount: 115,
    imageUrl: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=600&q=80',
    bio: 'Scuba diver and maritime historian. Conducts Sindhudurg Fort sea wall explorations and Konkan marine biodiversity tours.',
    bioMr: 'स्कुबा डायव्हर आणि सागरी इतिहास अभ्यासक. सिंधुदुर्ग जलदुर्गाची गुप्त बंदरे आणि सागरी जीवांची माहिती देणारे मार्गदर्शक.',
    badges: ['Scuba PADI Certified', 'Marine Biologist', 'Sea Fort Specialist'],
    available: true,
    reviews: [
      {
        id: 'rev_g5',
        serviceId: 'guide_prathamesh',
        userName: 'Tanvi Shah (Ahmedabad)',
        rating: 5,
        comment: 'Prathamesh made the boat ride to Sindhudurg Fort unforgettable. He showed us the original palm imprint of Shivaji Maharaj inside the temple!',
        date: '09 Oct 2026',
        tag: 'Passionate',
        helpfulCount: 15,
        verifiedBooking: true
      }
    ]
  }
];

export const INITIAL_ACTIVITIES: ActivityService[] = [
  {
    id: 'act_tarkarli_scuba',
    title: 'Tarkarli Coral Reef Scuba Diving & Snorkeling',
    titleMr: 'तारकर्ली प्रवाळ स्कुबा डायव्हिंग आणि स्नॉर्कलिंग',
    category: 'water_sports',
    district: 'Sindhudurg',
    locationName: 'Tarkarli Beach & Sindhudurg Fort Reef',
    destinationId: 'tarkarli',
    duration: '3.5 Hours',
    durationMr: '३.५ तास',
    pricePerPerson: 2200,
    rating: 4.92,
    reviewCount: 284,
    imageUrl: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80',
    description: 'Explore vibrant living corals, clownfish, turtles, and underwater volcanic rock formations off the historic Sindhudurg coast with PADI certified dive masters.',
    descriptionMr: 'सिंधुदुर्गाच्या ऐतिहासिक किनाऱ्यावर जिवंत प्रवाळ, रंगीबेरंगी मासे आणि समुद्राखालील सृष्टीचा अनुभव PADI प्रमाणित प्रशिक्षकांसह घ्या.',
    includedItems: ['PADI Certified Dive Master', 'All Scuba Gear & Wetsuit', 'Underwater 4K Video & Photos', 'Speedboat Transfer', 'Insurance Cover'],
    includedItemsMr: ['प्रमाणित डायव्ह मास्टर', 'सर्व स्कुबा उपकरणे', '४के अंडरवॉटर व्हिडिओ व फोटो', 'स्पीडबोट प्रवास', 'विमा संरक्षण'],
    safetyCertifications: ['PADI Dive Centre Verified', 'ISO 24803 Recreational Diving Standard'],
    timings: ['07:30 AM - Morning Calm Reef', '10:30 AM - Crystal Sun Dip', '02:00 PM - Afternoon Coral Walk'],
    available: true,
    reviews: [
      {
        id: 'rev_a1',
        serviceId: 'act_tarkarli_scuba',
        userName: 'Aakash Verma (Pune)',
        rating: 5,
        comment: 'Never knew Maharashtra had such pristine coral beds! The instructors were patient with first-timers like me. 4K video was delivered instantly.',
        date: '16 Oct 2026',
        tag: 'Breathtaking',
        helpfulCount: 39,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'act_kamshet_paragliding',
    title: 'Kamshet Sahyadri Tandem Paragliding',
    titleMr: 'कामशेत सह्याद्री टँडम पॅराग्लायडिंग',
    category: 'air_adventure',
    district: 'Pune',
    locationName: 'Tower Hill / Shinde Wadi, Kamshet (near Lonavala)',
    destinationId: 'lonavala',
    duration: '1.5 Hours (15 min free thermal flight)',
    durationMr: '१.५ तास (१५ मिनिटे हवेत उड्डाण)',
    pricePerPerson: 2800,
    rating: 4.95,
    reviewCount: 340,
    imageUrl: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    description: 'Soar like an eagle above the Pavana Lake reservoir and Sahyadri valleys. Flown with licensed national champion pilots with dual reserve parachutes.',
    descriptionMr: 'पवना धरण आणि सह्याद्रीच्या दऱ्यांवर पक्ष्याप्रमाणे भरारी घ्या. राष्ट्रीय चॅम्पियन वैमानिकांसोबत सुरक्षित टँडम फ्लाईट.',
    includedItems: ['National Champion Tandem Pilot', 'GoPro Wide-Angle Video & Stills', 'Reserve Parachute & Safety Helmet', 'Ghat Hill Transport to Takeoff Point'],
    includedItemsMr: ['अनुभवी वैमानिक', 'गोप्रो व्हिडिओ व फोटो', 'सुरक्षा पॅराशूट व हेल्मेट', 'टेकऑफ पॉईंटपर्यंत जीप प्रवास'],
    safetyCertifications: ['Aero Club of India (ACI) Certified', 'DGCA Sport Aviation Compliant'],
    timings: ['08:00 AM - Smooth Morning Ridge Lift', '03:30 PM - Sunset Golden Thermal Hour'],
    available: true,
    reviews: [
      {
        id: 'rev_a2',
        serviceId: 'act_kamshet_paragliding',
        userName: 'Neha Singhania (Mumbai)',
        rating: 5,
        comment: 'Floating over Pavana lake at sunset was pure bliss! Smooth takeoff and gentle landing. Worth every rupee!',
        date: '13 Oct 2026',
        tag: 'Bucket List Check',
        helpfulCount: 45,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'act_kolad_rafting',
    title: 'Kundalika River Grade-3 White Water Rafting',
    titleMr: 'कुंडलिका नदी ग्रेड-३ व्हाईट वॉटर राफ्टिंग',
    category: 'adventure',
    district: 'Raigad',
    locationName: 'Sutarwadi / Kolad, Kundalika River',
    destinationId: 'raigad',
    duration: '3.5 Hours (12 km river stretch)',
    durationMr: '३.५ तास (१२ किमी जलप्रवाह)',
    pricePerPerson: 1750,
    rating: 4.88,
    reviewCount: 420,
    imageUrl: 'https://images.unsplash.com/photo-1530866495561-507c9faab2ed?auto=format&fit=crop&w=800&q=80',
    description: 'The only round-the-year white water rafting destination in India, powered by dam water release. Tackle 10 furious rapids including Hilary Fall & Morning Surprise.',
    descriptionMr: 'भारतातील वर्षभर सुरू असलेले एकमेव राफ्टिंग ठिकाण. धरणातून सोडल्या जाणाऱ्या पाण्यावर १० साहसी रॅपिड्सचा थरार.',
    includedItems: ['Raft & Professional River Guide', 'US Coast Guard Approved Lifejackets', 'Safety Helmet & Paddle', 'Return Shuttle from Finish Point'],
    includedItemsMr: ['राफ्ट आणि व्यावसायिक नदी मार्गदर्शक', 'सुरक्षा लाईफ जॅकेट', 'हेल्मेट आणि वल्हवणे', 'परतीचा शटल प्रवास'],
    safetyCertifications: ['Indian Rafting Foundation Certified', 'Rescue Kayaker Backed'],
    timings: ['08:15 AM - Main Water Surge (Dam Release Batch)'],
    available: true,
    reviews: [
      {
        id: 'rev_a3',
        serviceId: 'act_kolad_rafting',
        userName: 'Rohan Salunkhe (Pune)',
        rating: 5,
        comment: 'Heart-pounding rapids! Our guide Vinod gave clear commands. The body surfing section at the end was so relaxing.',
        date: '10 Oct 2026',
        tag: 'Adrenaline Rush',
        helpfulCount: 26,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'act_sula_wine_tour',
    title: 'Sula Vineyards Estate & Heritage Wine Tasting',
    titleMr: 'सुला वाईनयार्ड्स द्राक्ष मळा व वाईन चाखणे',
    category: 'agro_culinary',
    district: 'Nashik',
    locationName: 'Govardhan Village, Nashik (Wine Capital of India)',
    destinationId: 'nashik',
    duration: '2 Hours',
    durationMr: '२ तास',
    pricePerPerson: 1200,
    rating: 4.91,
    reviewCount: 510,
    imageUrl: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
    description: 'Stroll through sun-drenched vineyards, discover oak barrel aging cellars, and savor 6 award-winning Maharashtra wines paired with artisanal cheeses.',
    descriptionMr: 'नाशिकच्या द्राक्ष बागांची सफर, ओक लाकडी बॅरल्समध्ये वाईन बनवण्याची कला आणि ६ उत्कृष्ट वाईनची चव चाखण्याचा अनुभव.',
    includedItems: ['Sommelier Guided Cellar Tour', '6 Wine Varietals Tasting Flight', 'Artisanal Cheese & Cracker Platter', 'Sula Commemorative Wine Glass Gift'],
    includedItemsMr: ['सोमेलियर मार्गदर्शित सफर', '६ प्रकारच्या वाईन्सची चाचणी', 'चीज आणि स्नॅक्स प्लॅटर', 'स्मृतिचिन्ह वाईन ग्लास भेट'],
    safetyCertifications: ['FSSAI Food Safety Certified', 'Certified Wine Sommelier Led'],
    timings: ['11:30 AM', '02:30 PM', '04:30 PM Sunset Flight'],
    available: true,
    reviews: [
      {
        id: 'rev_a4',
        serviceId: 'act_sula_wine_tour',
        userName: 'Priyanka Ghosh (Mumbai)',
        rating: 5,
        comment: 'Classy and educational. The Dindori Reserve Shiraz was exceptional. Beautiful sunset over Gangapur dam reservoir.',
        date: '07 Oct 2026',
        tag: 'Sophisticated',
        helpfulCount: 31,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'act_tadoba_safari',
    title: 'Tadoba Core Zone Morning Open Gypsy Safari',
    titleMr: 'ताडोबा कोर झोन सकाळची खुली जिप्सी सफारी',
    category: 'wildlife_safari',
    district: 'Chandrapur',
    locationName: 'Moharli / Kolara Gate, Tadoba Tiger Reserve',
    destinationId: 'tadoba',
    duration: '4 Hours',
    durationMr: '४ तास',
    pricePerPerson: 1500,
    rating: 4.96,
    reviewCount: 390,
    imageUrl: 'https://images.unsplash.com/photo-1575550959106-5a7defe28b56?auto=format&fit=crop&w=800&q=80',
    description: 'Venture into the heart of Tadoba-Andhari National Park in a dedicated 4x4 open safari gypsy accompanied by a senior forest ranger and tracker.',
    descriptionMr: 'ताडोबा-अंधारी व्याघ्र प्रकल्पाच्या गाभ्यात खुल्या ४x४ जिप्सीमधून सफारी. ज्येष्ठ वनपाल आणि ट्रॅकर यांच्यासह वाघ व बिबट्या दर्शन.',
    includedItems: ['Exclusive 4x4 Safari Gypsy', 'Forest Dept Certified Naturalist', 'Binoculars on Request', 'Forest Entry Permit & Camera Fee Included'],
    includedItemsMr: ['४x४ खुली जिप्सी', 'प्रमाणित वन वाटाड्या', 'बायनोक्युलर्स', 'प्रवेश परवाना व कॅमेरा फी समाविष्ट'],
    safetyCertifications: ['NTCA & Maharashtra Forest Dept Approved'],
    timings: ['06:00 AM - 10:00 AM (Prime Predator Prowl)'],
    available: true,
    reviews: [
      {
        id: 'rev_a5',
        serviceId: 'act_tadoba_safari',
        userName: 'Gautam Iyer (Chennai)',
        rating: 5,
        comment: 'We saw the magnificent tiger Choti Tara crossing right before our Gypsy! Outstanding organization by the forest department.',
        date: '14 Oct 2026',
        tag: 'Unforgettable',
        helpfulCount: 52,
        verifiedBooking: true
      }
    ]
  }
];

export const INITIAL_ARTISANS: Artisan[] = [
  {
    id: 'art_warli_ramesh',
    name: 'Ramesh Hengadi',
    nameMr: 'रमेश हेंगडी',
    craftType: 'Warli Tribal Painting',
    craftTypeMr: 'वारली आदिवासी चित्रकला',
    village: 'Bapgaon, Dahanu',
    district: 'Palghar',
    experienceYears: 26,
    giTagCertified: true,
    artisanCardNo: 'MH-GI-WARLI-0089',
    bio: 'Preserving the 3000-year-old indigenous sacred painting tradition using natural rice flour paste, red geru clay, and bamboo brushes. Recipient of Maharashtra State Handicraft Award.',
    bioMr: 'तांदळाचे पीठ, गेरू माती आणि बांबूच्या काडीने ३००० वर्षे जुनी वारली चित्रकला जपणारे ज्येष्ठ कलाकार. महाराष्ट्र राज्य हस्तकला पुरस्कार विजेते.',
    rating: 4.97,
    reviewCount: 168,
    imageUrl: 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?auto=format&fit=crop&w=600&q=80',
    workshopPrice: 650,
    workshopDuration: '2 Hours Live Masterclass',
    isVerified: true,
    catalog: [
      {
        id: 'cat_warli_1',
        title: 'Tarpa Dance Harvest Canvas (18x24")',
        titleMr: 'तारपा नृत्य कापडी चित्र',
        price: 3200,
        imageUrl: 'https://images.unsplash.com/photo-1582561424760-0321d75e81fa?auto=format&fit=crop&w=600&q=80',
        description: 'Authentic handmade mud-cloth canvas depicting community harvest celebrations under the moon.'
      },
      {
        id: 'cat_warli_2',
        title: 'Lagna Chowk Sacred Wedding Scroll',
        titleMr: 'लग्न चौक मांगलिक चित्र',
        price: 2400,
        imageUrl: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=600&q=80',
        description: 'Traditional auspicious wedding blessing motifs painted using rice paste and botanical dyes.'
      }
    ],
    reviews: [
      {
        id: 'rev_art1',
        serviceId: 'art_warli_ramesh',
        userName: 'Kavita Menon (Mumbai)',
        rating: 5,
        comment: 'Attended the 2-hour Warli workshop. Ramesh ji patiently taught us geometric tribal philosophy. Beautiful memory to take home!',
        date: '14 Oct 2026',
        tag: 'Authentic Master',
        helpfulCount: 22,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'art_paithani_lata',
    name: 'Lata Eknath Gaikwad',
    nameMr: 'लता एकनाथ गायकवाड',
    craftType: 'Paithani Silk Handloom Weaving',
    craftTypeMr: 'पैठणी रेशीम हातमाग विणकाम',
    village: 'Paithan Old Town',
    district: 'Chhatrapati Sambhajinagar',
    experienceYears: 29,
    giTagCertified: true,
    artisanCardNo: 'MH-GI-PAITHANI-0142',
    bio: 'Heritage master weaver weaving real silver zari, peacock (Mor), and parrot motifs on traditional pit-looms. Each royal Paithani takes up to 4 months of meticulous handcrafting.',
    bioMr: 'अस्सल चांदीची जरी आणि मोराची नक्षी हाताने विणणाऱ्या पारंपरिक पैठणी विणकर. एका पैठणीला ४ महिन्यांचा अखंड रियाज लागतो.',
    rating: 4.98,
    reviewCount: 215,
    imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
    workshopPrice: 850,
    workshopDuration: '2.5 Hours Handloom Weaving Experience',
    isVerified: true,
    catalog: [
      {
        id: 'cat_pai_1',
        title: 'Pure Silk Brocade Paithani Dupatta (Peacock Pallu)',
        titleMr: 'शुद्ध रेशमी पैठणी दुपट्टा',
        price: 6800,
        imageUrl: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=600&q=80',
        description: 'Woven with natural mulberry silk, pure zari border, and multi-colored peacock pallu motif.'
      },
      {
        id: 'cat_pai_2',
        title: 'Traditional Paithani Wall Hanging Scroll',
        titleMr: 'पारंपरिक पैठणी वॉल हँगिंग',
        price: 2900,
        imageUrl: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&w=600&q=80',
        description: 'Intricately framed zari motif of royal Peshwa era textiles.'
      }
    ],
    reviews: [
      {
        id: 'rev_art2',
        serviceId: 'art_paithani_lata',
        userName: 'Sharanya Nair (Kochi)',
        rating: 5,
        comment: 'Lata tai gave us a firsthand experience on the wooden loom. The craftsmanship and patience involved is awe-inspiring!',
        date: '08 Oct 2026',
        tag: 'Royal Heritage',
        helpfulCount: 30,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'art_kolhapuri_santosh',
    name: 'Santosh Kambale',
    nameMr: 'संतोष कांबळे',
    craftType: 'Authentic Kolhapuri Chappals',
    craftTypeMr: 'अस्सल कोल्हापुरी चप्पल',
    village: 'Subhash Nagar, Kolhapur',
    district: 'Kolhapur',
    experienceYears: 22,
    giTagCertified: true,
    artisanCardNo: 'MH-GI-KOLHAPURI-0419',
    bio: 'Fourth-generation leather craftsman crafting 100% vegetable-tanned, hand-stitched traditional Kolhapuri footwear using natural babool bark extracts and beeswax.',
    bioMr: 'चौथ्या पिढीतील कारागीर. बाभळीची साल आणि मेणाच्या नैसर्गिक प्रक्रियेतून १००% हाताने शिवलेली अस्सल कोल्हापुरी चप्पल बनवणारे.',
    rating: 4.93,
    reviewCount: 194,
    imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
    workshopPrice: 750,
    workshopDuration: '2 Hours Leather Crafting Workshop',
    isVerified: true,
    catalog: [
      {
        id: 'cat_kol_1',
        title: 'Hand-Braided Shahu Royal Kolhapuri (Brown)',
        titleMr: 'शाहू राजेशाही कोल्हापुरी चप्पल',
        price: 1850,
        imageUrl: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=600&q=80',
        description: 'Signature hand-plaited leather chords, anti-skid vegetable cured sole with natural squeak.'
      },
      {
        id: 'cat_kol_2',
        title: 'Modern T-Strap Soft Kolhapuri Sandal',
        titleMr: 'टी-पट्टा मऊ कोल्हापुरी सँडल',
        price: 1450,
        imageUrl: 'https://images.unsplash.com/photo-1560343090-f0409e92791a?auto=format&fit=crop&w=600&q=80',
        description: 'Contemporary comfort cushioned footbed blended with traditional tooling.'
      }
    ],
    reviews: [
      {
        id: 'rev_art3',
        serviceId: 'art_kolhapuri_santosh',
        userName: 'Amitabh Sen (Kolkata)',
        rating: 5,
        comment: 'Bought two pairs directly from Santosh. Genuine leather, fits like a glove after breaking in. Incredible quality!',
        date: '03 Oct 2026',
        tag: 'Durable & Stylish',
        helpfulCount: 17,
        verifiedBooking: true
      }
    ]
  },
  {
    id: 'art_sawantwadi_toys',
    name: 'Vishwanath Kanekar',
    nameMr: 'विश्वनाथ काणेकर',
    craftType: 'Sawantwadi Lacquer Wooden Toys',
    craftTypeMr: 'सावंतवाडी लाखेची लाकडी खेळणी',
    village: 'Chitari Galli, Sawantwadi',
    district: 'Sindhudurg',
    experienceYears: 32,
    giTagCertified: true,
    artisanCardNo: 'MH-GI-SAWANTWADI-0021',
    bio: 'Crafting non-toxic turned wooden toys, lacquer fruits, and historic Ganjifa playing cards patronized by the royal Bhonsles of Sawantwadi since the 18th century.',
    bioMr: 'सावंतवाडीच्या भोसले राजघराण्याने पोसलेली लाकडी खेळणी आणि गंजीफा पत्त्यांचे ज्येष्ठ कारागीर. नैसर्गिक रंगांचा वापर.',
    rating: 4.89,
    reviewCount: 140,
    imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
    workshopPrice: 600,
    workshopDuration: '2 Hours Wooden Turning & Lacquering',
    isVerified: true,
    catalog: [
      {
        id: 'cat_saw_1',
        title: 'Handmade Lacquered Wooden Fruit Basket (12 Pcs)',
        titleMr: 'लाखेची लाकडी फळांची टोपली',
        price: 1600,
        imageUrl: 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?auto=format&fit=crop&w=600&q=80',
        description: 'Vibrant, realistic mangoes, bananas, and apples handcrafted on pedal-turning wood lathes.'
      }
    ],
    reviews: [
      {
        id: 'rev_art4',
        serviceId: 'art_sawantwadi_toys',
        userName: 'Shalini K. (Goa)',
        rating: 5,
        comment: 'My kids loved seeing how wooden cylinders turn into shiny spinning tops and toys. Zero chemical paints!',
        date: '01 Oct 2026',
        tag: 'Eco-Friendly Toys',
        helpfulCount: 11,
        verifiedBooking: true
      }
    ]
  }
];

export const INITIAL_PERMIT_APPLICATIONS: PermitApplication[] = [
  {
    id: 'PMT-KAAS-2026-904',
    permitType: 'kaas_pass',
    title: 'Kaas Plateau Biosphere Daily E-Pass',
    titleMr: 'कास पठार जैवविविधता दैनिक ई-पास',
    applicantName: 'Vikram Patel',
    applicantMobile: '+91 98220 11984',
    aadhaarOrId: 'XXXX-XXXX-4819',
    district: 'Satara',
    destinationName: 'Kaas Plateau Valley of Flowers',
    visitDate: '2026-10-24',
    visitorsCount: 2,
    feePaid: 300,
    status: 'approved',
    appliedAt: '2026-10-18',
    qrCodeToken: 'KAAS-VAL-PASS-904'
  },
  {
    id: 'PMT-TAD-2026-551',
    permitType: 'tadoba_safari',
    title: 'Tadoba-Andhari Tiger Reserve Safari Permit',
    titleMr: 'ताडोबा-अंधारी सफारी वन प्रवेश पास',
    applicantName: 'Sneha Deshpande',
    applicantMobile: '+91 97654 32109',
    aadhaarOrId: 'XXXX-XXXX-8921',
    district: 'Chandrapur',
    destinationName: 'Tadoba Moharli Gate',
    visitDate: '2026-10-27',
    visitorsCount: 4,
    feePaid: 1000,
    status: 'approved',
    appliedAt: '2026-10-19',
    qrCodeToken: 'TADOBA-CORE-PASS-551'
  }
];

export const INITIAL_BOOKINGS: Booking[] = [
  {
    id: 'BK-MH-78192',
    serviceType: 'car',
    serviceId: 'car_innova_crysta',
    serviceTitle: 'Sahyadri Ghats Innova Crysta SUV',
    serviceImage: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80',
    providerName: 'Driver: Santosh Shinde (+91 98224 81920)',
    date: '2026-10-22',
    slotOrDuration: 'Full Day (08:00 AM Pickup)',
    guestCount: 4,
    totalAmount: 3800,
    discountXp: 100,
    finalPaidAmount: 3700,
    paymentMethod: 'upi',
    paymentId: 'UPI-AXIS-9823149',
    bookingStatus: 'confirmed',
    bookedAt: '2026-10-19 14:32',
    qrCodeToken: 'MH-BOOKING-78192-CONFIRMED',
    notes: 'Pickup from Pune Railway Station Gate 1'
  },
  {
    id: 'BK-MH-44210',
    serviceType: 'activity',
    serviceId: 'act_kamshet_paragliding',
    serviceTitle: 'Kamshet Sahyadri Tandem Paragliding',
    serviceImage: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    providerName: 'Sahyadri Aero Club Instructors',
    date: '2026-10-25',
    slotOrDuration: '03:30 PM - Sunset Golden Thermal Hour',
    guestCount: 2,
    totalAmount: 5600,
    discountXp: 200,
    finalPaidAmount: 5400,
    paymentMethod: 'card',
    paymentId: 'CARD-HDFC-66381',
    bookingStatus: 'confirmed',
    bookedAt: '2026-10-18 10:15',
    qrCodeToken: 'MH-BOOKING-44210-CONFIRMED',
    notes: 'GoPro footage included'
  }
];
