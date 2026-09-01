import { Destination, Circuit, Challenge, Quiz, District, Category } from './types';

export const DESTINATIONS: Destination[] = [
  {
    id: 'lonavala',
    name: 'Lonavala',
    nameMr: 'लोणावळा',
    description: 'A beautiful viewpoint in the Sahyadri range, known for its deep valleys, cascading waterfalls during the monsoon, and mist-laden winds.',
    descriptionMr: 'सह्याद्री रांगेतील एक सुंदर दृश्य बिंदू, जो पावसाळ्यात खोल दऱ्या, कोसळणारे धबधबे आणि धुक्यासाठी ओळखला जातो.',
    district: 'Pune',
    lat: 18.7592,
    lng: 73.4071,
    geofenceRadius: 150,
    category: 'hill_station',
    imageUrl: 'https://images.unsplash.com/photo-1549488344-1f9b8d2bd1f3?auto=format&fit=crop&w=600&q=80',
    history: 'Tiger Point (also known as Tiger’s Leap) is named because the valley resembles a tiger leaping into the abyss. It was historically a strategic watching point for weather and troop movements in the Pune-Lonavala ghat region.',
    historyMr: 'वाघ पॉइंट (ज्याला टायगर्स लीप देखील म्हणतात) हे नाव पडले कारण दरीचा आकार खोल दरीत उडी मारणाऱ्या वाघासारखा दिसतो. ऐतिहासिकदृष्ट्या पुणे-लोणावळा घाट परिसरातील सैन्यांच्या हालचालींवर लक्ष ठेवण्यासाठी हा एक मोक्याचा पॉइंट होता.',
    culture: 'Local culture revolves around monsoon tourism. Famous for hot masala chai, roasted corn-on-the-cob (bhutta), and the famous Lonavala Chikki (sweet peanut brittle).',
    cultureMr: 'स्थानिक संस्कृती मुख्यत्वे पावसाळी पर्यटनाभोवती फिरते. गरमागरम मसाला चहा, भाजलेले कणीस (भुट्टा) आणि लोणावळ्याची प्रसिद्ध चिक्की (शेंगदाणा गुळाची चिक्की) यासाठी हे प्रसिद्ध आहे.',
    food: 'Lonavala Chikki, piping hot Onion Pakodas, and freshly roasted corn.',
    foodMr: 'लोणावळा चिक्की, गरमागरम कांदा भजी आणि ताजे भाजलेले कणीस.',
    stampMotif: '🧗‍♂️',
    bestTime: 'Monsoon season (June to September) for lush green valleys, rushing waterfalls, and dense fog.',
    bestTimeMr: 'पावसाळा (जून ते सप्टेंबर) - हिरवेगार डोंगर, वाहते धबधबे आणि दाट धुक्याचा अनुभव घेण्यासाठी सर्वोत्तम वेळ.',
    howToReach: 'By Road: About 85 km from Mumbai and 65 km from Pune via Mumbai-Pune Expressway. By Train: Lonavala Railway Station is well-connected.',
    howToReachMr: 'रस्त्याने: मुंबई-पुणे एक्सप्रेसवेने मुंबईपासून ८५ किमी आणि पुण्यापासून ६५ किमी. रेल्वेने: लोणावळा रेल्वे स्टेशन सर्व प्रमुख शहरांशी जोडलेले आहे.',
    sightseeingSpots: ['Bhushi Dam', 'Tiger Point', 'Karla & Bhaja Caves', 'Lohagad Fort', 'Ryewood Park'],
    sightseeingSpotsMr: ['भुशी धरण', 'वाघ पॉइंट (टायगर्स लीप)', 'कार्ला आणि भाजा लेणी', 'लोहगड किल्ला', 'रायवुड पार्क'],
    travelTips: 'The steps and cliffs can be extremely slippery during heavy rain. Drive carefully in dense fog and avoid standing too close to the edge.',
    travelTipsMr: 'मुसळधार पावसात पायऱ्या आणि कडे अत्यंत निसरडे असू शकतात. दाट धुक्यात काळजीपूर्वक गाडी चालवा आणि दरीच्या कडेला उभे राहणे टाळा.',
    touristSpots: [
      {
        name: 'Tiger Point',
        nameMr: 'टायगर पॉइंट',
        category: 'Photography Point',
        categoryMr: 'छायाचित्रण बिंदू',
        shortDescription: 'A spectacular cliff offering panoramic valley views, waterfalls, and wind-blown mist.',
        shortDescriptionMr: 'धबधबे, वारा आणि दाट धुक्याची नयनरम्य दृश्ये दाखवणारा एक प्रसिद्ध टेकडीचा कडा.'
      },
      {
        name: 'Bhushi Dam',
        nameMr: 'भुशी धरण',
        category: 'Waterfall',
        categoryMr: 'धबधबा',
        shortDescription: 'A popular masonry dam on the Indrayani River where water overflows over steps during heavy monsoons.',
        shortDescriptionMr: 'इंद्रायणी नदीवरील धरण जेथे पावसाळ्यात पायऱ्यांवरून पाणी वाहून धबधब्याचा आनंद मिळतो.'
      },
      {
        name: 'Karla & Bhaja Caves',
        nameMr: 'कार्ला आणि भाजा लेणी',
        category: 'Cave',
        categoryMr: 'लेणी',
        shortDescription: 'Ancient Buddhist rock-cut shrines featuring complex carvings and an majestic prayer hall.',
        shortDescriptionMr: 'भव्य चैत्यगृह आणि प्राचीन बौद्ध विहारांच्या कोरीव कामाचे उत्तम उदाहरण असलेल्या लेणी.'
      }
    ]
  },
  {
    id: 'mahabaleshwar',
    name: 'Mahabaleshwar',
    nameMr: 'महाबळेश्वर',
    description: 'Nestled in the Western Ghats, Mahabaleshwar is the land of strawberries, featuring lush evergreen forests, valleys, and colonial-era charm.',
    descriptionMr: 'पश्चिम घाटात वसलेले महाबळेश्वर हे स्ट्रॉबेरीचे माहेरघर आहे, जिथे सदाहरित जंगले, दऱ्या आणि ब्रिटीश काळातील वास्तुकला पाहायला मिळते.',
    district: 'Satara',
    lat: 17.9221,
    lng: 73.6586,
    geofenceRadius: 150,
    category: 'hill_station',
    imageUrl: 'https://images.unsplash.com/photo-1516257984-b1b4d707412e?auto=format&fit=crop&w=600&q=80',
    history: 'During the British Raj, Mahabaleshwar served as the summer capital of the Bombay Presidency. Mapro Garden was established in 1959 by Mr. Kishore Vora, pioneering fruit processing and agri-tourism in the region.',
    historyMr: 'ब्रिटिश राजवटीत महाबळेश्वर मुंबई प्रेसिडेन्सीची उन्हाळी राजधानी म्हणून कार्यरत होते. माप्रो गार्डनची स्थापना १९५९ मध्ये श्री. किशोर व्होरा यांनी फळ प्रक्रिया आणि कृषी-पर्यटनाला प्रोत्साहन देण्यासाठी केली.',
    culture: 'Known for its strawberry cultivation and warm hospitality. The annual Strawberry Festival celebrates harvest with fresh cream and berry picking.',
    cultureMr: 'स्ट्रॉबेरीची शेती आणि प्रेमळ आदरातिथ्यासाठी प्रसिद्ध. वार्षिक स्ट्रॉबेरी फेस्टिव्हलमध्ये फळे काढणीचा उत्सव ताजा स्ट्रॉबेरी-क्रीमसह साजरा केला जातो.',
    food: 'Fresh Strawberries with Cream, Mapro Woodfired Pizza, and Corn Pattice.',
    foodMr: 'ताजी स्ट्रॉबेरी विथ क्रीम, माप्रो वुडफायर्ड पिझ्झा आणि कॉर्न पॅटीस.',
    stampMotif: '🍓',
    bestTime: 'December to February for strawberry harvest, though lovely year-round.',
    bestTimeMr: 'डिसेंबर ते फेब्रुवारी (स्ट्रॉबेरी हंगामाचा काळ), तसे वर्षभर कधीही जाता येते.',
    howToReach: 'By Road: About 120 km from Pune and 260 km from Mumbai. Frequent buses are available from Pune and Mumbai.',
    howToReachMr: 'रस्त्याने: पुण्यापासून १२० किमी आणि मुंबईपासून २६० किमी.नेहमीच्या बसेस उपलब्ध आहेत.',
    sightseeingSpots: ['Mapro Garden', 'Arthur’s Seat', 'Venna Lake', 'Elephant’s Head Point', 'Kate’s Point'],
    sightseeingSpotsMr: ['माप्रो गार्डन', 'आर्थर सीट पॉइंट', 'वेण्णा तलाव', 'एलिफंट हेड पॉइंट', 'केट्स पॉइंट'],
    travelTips: 'Strawberry season peaks from December to March. Always carry a light jacket as evenings get cold.',
    travelTipsMr: 'स्ट्रॉबेरीचा हंगाम डिसेंबर ते मार्च दरम्यान असतो. संध्याकाळी थंडी वाजत असल्याने हलके जॅकेट सोबत ठेवा.',
    touristSpots: [
      {
        name: 'Mapro Garden',
        nameMr: 'माप्रो गार्डन',
        category: 'Village Tourism',
        categoryMr: 'ग्रामीण पर्यटन',
        shortDescription: 'Famous strawberry orchards and production house serving fresh strawberry cream and wood-fired pizzas.',
        shortDescriptionMr: 'स्ट्रॉबेरी बागा आणि ताजी स्ट्रॉबेरी क्रीम व उत्कृष्ट पिझ्झा मिळणारे प्रसिद्ध ठिकाण.'
      },
      {
        name: 'Arthur’s Seat',
        nameMr: 'आर्थर सीट',
        category: 'Hill Station',
        categoryMr: 'थंड हवेचे ठिकाण',
        shortDescription: 'Popularly known as the Queen of Points, offering breathtaking vistas of Savitri River and valleys.',
        shortDescriptionMr: 'मुसळधार खोऱ्यांचे आणि सावित्री नदीचे विलोभनीय दृश्य दाखवणारा "पॉइंट्सचा राजा".'
      },
      {
        name: 'Venna Lake',
        nameMr: 'वेण्णा तलाव',
        category: 'Lake',
        categoryMr: 'तलाव',
        shortDescription: 'A scenic lake surrounded by lush green trees, popular for rowboating and horse rides.',
        shortDescriptionMr: 'हिरव्यागार झाडींनी वेढलेला सुंदर तलाव जेथे नौकाविहार आणि घोडेस्वारी करता येते.'
      }
    ]
  },
  {
    id: 'matheran',
    name: 'Matheran',
    nameMr: 'माथेरान',
    description: 'Asia’s only automobile-free hill station, Matheran offers pristine tranquility, red soil pathways, and horse-back rides amidst dense trees.',
    descriptionMr: 'आशियातील एकमेव वाहनमुक्त थंड हवेचे ठिकाण, जिथे लाल मातीचे रस्ते, घनदाट झाडी आणि घोडेस्वारीचा आनंद घेता येतो.',
    district: 'Raigad',
    lat: 18.9856,
    lng: 73.2681,
    geofenceRadius: 120,
    category: 'hill_station',
    imageUrl: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=600&q=80',
    history: 'Discovered in 1850 by Hugh Poyntz Malet, the Collector of Thana. The Charlotte Lake has been the primary freshwater source for the hill station since the colonial era.',
    historyMr: '१८५० मध्ये ठाण्याचे जिल्हाधिकारी ह्युज पॉईंट्झ मॅलेट यांनी याचा शोध लावला. शार्लोट तलाव हा ब्रिटिश काळापासून माथेरानचा मुख्य गोड्या पाण्याचा स्त्रोत आहे.',
    culture: 'Strict eco-sensitive zoning preserves the ancient lifestyle of the local Katkari tribe. No vehicles are allowed, preserving the soundscape of rustling leaves.',
    cultureMr: 'अति-संवेदनशील पर्यावरण क्षेत्रामुळे स्थानिक कातकरी जमातीची जीवनशैली टिकून आहे. वाहनांना बंदी असल्यामुळे केवळ निसर्गाचा आवाज येथे घुमतो.',
    food: 'Kokum Sharbat, Village-style Pitla Bhakri, and local fudge.',
    foodMr: 'कोकम सरबत, गावठी स्टाईल पिठलं भाकरी आणि स्थानिक मावा फज.',
    stampMotif: '🐎',
    bestTime: 'October to May. Monsoon is gorgeous but pathways turn very muddy.',
    bestTimeMr: 'ऑक्टोबर ते मे. पावसाळ्यात निसर्ग अधिक फुलतो, परंतु मातीचे रस्ते चिखलमय होतात.',
    howToReach: 'By Road: Drive up to Dasturi Naka (100 km from Mumbai). Vehicles must be parked here; onwards journey by foot, horse, or hand-pulled rickshaw.',
    howToReachMr: 'रस्त्याने: दस्तुरी नाक्यापर्यंत गाडीने जा (मुंबईपासून १०० किमी). सर्व वाहने येथेच पार्क करावी लागतात.',
    sightseeingSpots: ['Charlotte Lake', 'Echo Point', 'Louisa Point', 'Panorama Point'],
    sightseeingSpotsMr: ['शार्लोट तलाव', 'इको पॉइंट', 'लुईसा पॉइंट', 'पॅनोरमा पॉइंट'],
    travelTips: 'Wear sturdy walking shoes as the pathways are entirely red clay and gravel. Watch out for local monkeys.',
    travelTipsMr: 'पायी चालण्यासाठी मजबूत शूज वापरा कारण येथील रस्ते लाल मातीचे आहेत. माकडांपासून खाणे सांभाळा.',
    touristSpots: [
      {
        name: 'Charlotte Lake',
        nameMr: 'शार्लोट तलाव',
        category: 'Lake',
        categoryMr: 'तलाव',
        shortDescription: 'The main freshwater source of Matheran, surrounded by dense forests and walking tracks.',
        shortDescriptionMr: 'घनदाट जंगलाने वेढलेला आणि शांत वातावरण असलेला माथेरानचा मुख्य पाण्याचा तलाव.'
      }
    ]
  },
  {
    id: 'alibaug',
    name: 'Alibaug',
    nameMr: 'अलिबाग',
    description: 'A popular coastal town famous for its historic sea forts, sandy beaches, coconut groves, and delicious coastal spicy seafood.',
    descriptionMr: 'ऐतिहासिक जलदुर्ग, सोनेरी वाळूचे किनारे, नारळी-सुपारीच्या बागा आणि चवदार कोकणी मासे जेवणासाठी प्रसिद्ध असलेले किनारपट्टीचे शहर.',
    district: 'Raigad',
    lat: 18.6584,
    lng: 72.8777,
    geofenceRadius: 150,
    category: 'beach',
    imageUrl: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80',
    history: 'Developed in the 17th century by Maratha Naval Chief Kanhoji Angre as a strategic naval base for military and trading operations.',
    historyMr: '१७ व्या शतकात मराठा आरमार प्रमुख सरखेल कान्होजी आंग्रे यांनी लष्करी आणि व्यापारी हालचालींसाठी विकसित केलेले एक महत्त्वाचे आरमार केंद्र.',
    culture: 'Deeply rooted in Konkani fishermen culture (Koli community) with grand celebrations of Narali Pournima and Ganesh Utsav.',
    cultureMr: 'कोकणी कोळी संस्कृतीमध्ये खोलवर रुजलेले, जेथे नारळी पौर्णिमा आणि गणेशोत्सव मोठ्या उत्साहात साजरा केला जातो.',
    food: 'Alibaug fish thali, Surmai fry, Solkadhi, and White Onion dishes.',
    foodMr: 'अलिबागची सुप्रसिद्ध फिश थाळी, कोळंबी मसाला, सोलकढी आणि प्रसिद्ध पांढरे कांदे.',
    stampMotif: '🏖️',
    bestTime: 'November to March for water sports and pleasant beach weather.',
    bestTimeMr: 'नोव्हेंबर ते मार्च - समुद्रकिनाऱ्यावर फिरण्यासाठी आणि जलक्रीडा प्रकारांसाठी उत्तम काळ.',
    touristSpots: [
      {
        name: 'Alibaug Beach',
        nameMr: 'अलिबाग बीच',
        category: 'Beach',
        categoryMr: 'समुद्रकिनारा',
        shortDescription: 'The main city beach with beautiful dark sand, horse carts, and views of Kolaba Fort.',
        shortDescriptionMr: 'काळ्या वाळूचा मुख्य किनारा, जेथून कुलाबा किल्ला स्पष्ट दिसतो आणि घोडागाडी फिरता येते.'
      },
      {
        name: 'Kolaba Fort',
        nameMr: 'कुलाबा किल्ला',
        category: 'Fort',
        categoryMr: 'किल्ला',
        shortDescription: 'A historic military sea fort built in the Arabian Sea, easily reachable during low tides.',
        shortDescriptionMr: 'अरबी समुद्रात बांधलेला ऐतिहासिक जलदुर्ग, ओहोटीच्या वेळी चालत किंवा बैलगाडीने जाता येते.'
      },
      {
        name: 'Varsoli Beach',
        nameMr: 'वरसोली बीच',
        category: 'Beach',
        categoryMr: 'समुद्रकिनारा',
        shortDescription: 'A quiet, clean beach known for its white sand, casuarina trees, and adventure water sports.',
        shortDescriptionMr: 'पांढरी वाळू, सुरुची झाडे आणि वॉटर स्पोर्ट्ससाठी प्रसिद्ध असलेला अत्यंत शांत समुद्रकिनारा.'
      }
    ]
  },
  {
    id: 'murud',
    name: 'Murud',
    nameMr: 'मुरुड',
    description: 'A serene coastal town in Raigad district, housing the unconquered marine fort of Janjira and wide, clean beaches.',
    descriptionMr: 'रायगड जिल्ह्यातील एक शांत किनारपट्टीचे शहर, जिथे अजिंक्य जंजिरा जलदुर्ग आणि लांब स्वच्छ किनारे पाहायला मिळतात.',
    district: 'Raigad',
    lat: 18.2721,
    lng: 72.9634,
    geofenceRadius: 150,
    category: 'beach',
    imageUrl: 'https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=600&q=80',
    history: 'Ruled by the Siddis of Janjira, who built the formidable island fortress in the late 15th century, successfully repelling British, Dutch, and Maratha attacks.',
    historyMr: 'जंजिऱ्याच्या सिद्दी शासकांनी १५ व्या शतकात हा अभेद्य जलदुर्ग बांधला. ब्रिटिश, डच आणि मराठ्यांच्या अनेक आक्रमणांनंतरही हा किल्ला अजिंक्य राहिला.',
    culture: 'An eclectic blend of Siddi, Muslim, and Konkani heritage reflected in local traditional architectures, foods, and folklore.',
    cultureMr: 'स्थानिक वास्तुशिल्प, पाककला आणि लोककथांमध्ये सिद्दी, मुस्लिम आणि कोकणी परंपरेचा सुरेख संगम पाहायला मिळतो.',
    food: 'Fish curry rice, Prawns masala, and sweet coconut-jaggery modaks.',
    foodMr: 'कोकणी पद्धतीचे मासे, कोळंबी फ्राय आणि ओल्या नारळाचे मोदक.',
    stampMotif: '🛡️',
    bestTime: 'October to February when sea waves are calm.',
    bestTimeMr: 'ऑक्टोबर ते फेब्रुवारी (या काळात अरबी समुद्र शांत असतो).',
    touristSpots: [
      {
        name: 'Murud Beach',
        nameMr: 'मुरुड बीच',
        category: 'Beach',
        categoryMr: 'समुद्रकिनारा',
        shortDescription: 'A vast stretch of silver sand ideal for watching sunset and swimming.',
        shortDescriptionMr: 'सूर्यास्त पाहण्यासाठी आणि पोहण्यासाठी योग्य असलेला मुरुडचा लांबच लांब रुपेरी वाळूचा किनारा.'
      },
      {
        name: 'Janjira Fort',
        nameMr: 'जंजिरा किल्ला',
        category: 'Fort',
        categoryMr: 'किल्ला',
        shortDescription: 'An unconquered 19-bastion sea fortress located on an island in the Arabian Sea.',
        shortDescriptionMr: 'अरबी समुद्रातील एका बेटावर वसलेला आणि १९ भक्कम बुरुज असलेला अजिंक्य सागरी किल्ला.'
      },
      {
        name: 'Garambi Falls',
        nameMr: 'गरंबी धबधबा',
        category: 'Waterfall',
        categoryMr: 'धबधबा',
        shortDescription: 'A gorgeous waterfall hidden inside dense forest ranges, roaring during heavy monsoons.',
        shortDescriptionMr: 'दाट जंगलाच्या कुशीत वसलेला आणि पावसाळ्यात वेगाने कोसळणारा देखणा धबधबा.'
      }
    ]
  },
  {
    id: 'ganpatipule',
    name: 'Ganpatipule',
    nameMr: 'गणपतीपुळे',
    description: 'A spectacular holy beach destination in Ratnagiri, famous for its 400-year-old self-manifested Ganesha temple on the coast.',
    descriptionMr: 'रत्नागिरीतील एक निसर्गरम्य आणि धार्मिक समुद्रकिनारा, जो किनारपट्टीवरील ४०० वर्षे जुन्या स्वयंभू गणेश मंदिरासाठी प्रसिद्ध आहे.',
    district: 'Ratnagiri',
    lat: 17.1500,
    lng: 73.2667,
    geofenceRadius: 150,
    category: 'beach',
    imageUrl: 'https://images.unsplash.com/photo-1590523277543-a94d2e4eb00b?auto=format&fit=crop&w=600&q=80',
    history: 'The temple deity is believed to be "Swayambhu" (self-manifested) and has been worshipped for over four centuries. The hill behind the temple is shaped like Lord Ganesha.',
    historyMr: 'येथील मूर्ती स्वयंभू मानली जाते आणि ४०० हून अधिक वर्षांपासून पूजली जाते. मंदिराच्या मागे असणाऱ्या टेकडीचा आकार भगवान गणेशासारखा आहे.',
    culture: 'Strong spiritual vibes where pilgrims perform circumambulation (pradakshina) around the entire hill. Celebrates Angarki Chaturthi with thousands of devotees.',
    cultureMr: 'भाविक संपूर्ण टेकडीला प्रदक्षिणा मारतात. अंगारकी चतुर्थी आणि गणेशोत्सवाला लाखो भाविक येथे येतात.',
    food: 'Ukadiche Modak, Mango juice (Aamras), and spicy Kokani thali.',
    foodMr: 'गरमागरम उकडीचे मोदक, हापूसचा आमरस आणि कोकणी पद्धतीचे जेवण.',
    stampMotif: '🛕',
    bestTime: 'November to February for cool ocean breeze.',
    bestTimeMr: 'नोव्हेंबर ते फेब्रुवारी (हवामान आल्हाददायक असते).',
    touristSpots: [
      {
        name: 'Ganpatipule Temple',
        nameMr: 'गणपतीपुळे मंदिर',
        category: 'Temple',
        categoryMr: 'मंदिर',
        shortDescription: 'A revered seaside temple housing a self-manifested idol of Lord Ganesha facing the West.',
        shortDescriptionMr: 'समुद्रकिनाऱ्यावर वसलेले आणि पश्चिमेकडे तोंड असलेली गणेशाची स्वयंभू मूर्ती असलेले जागृत देवस्थान.'
      },
      {
        name: 'Ganpatipule Beach',
        nameMr: 'गणपतीपुळे बीच',
        category: 'Beach',
        categoryMr: 'समुद्रकिनारा',
        shortDescription: 'A spotless, sandy beach running alongside the temple premises.',
        shortDescriptionMr: 'गणपती मंदिराला लागून असलेला अतिशय स्वच्छ, सुंदर आणि वालुकामय समुद्रकिनारा.'
      },
      {
        name: 'Prachin Konkan Museum',
        nameMr: 'प्राचीन कोकण संग्रहालय',
        category: 'Museum',
        categoryMr: 'संग्रहालय',
        shortDescription: 'An outdoor open-air life-size museum depicting ancient history and lifestyle of Konkan villages.',
        shortDescriptionMr: 'कोकणातील जुने राहणीमान आणि प्राचीन इतिहास दाखवणारे उघड्या मैदानावरील जिवंत संग्रहालय.'
      },
      {
        name: 'Aare Ware Beach',
        nameMr: 'आरे वारे बीच',
        category: 'Beach',
        categoryMr: 'समुद्रकिनारा',
        shortDescription: 'A panoramic twin beach offering marvelous views of sea meeting high mountain cliffs.',
        shortDescriptionMr: 'उंच कड्यावरून अरबी समुद्राचे आणि वळणदार रस्त्याचे अद्भूत दृश्य दाखवणारा दुहेरी किनारा.'
      }
    ]
  },
  {
    id: 'tarkarli',
    name: 'Tarkarli',
    nameMr: 'तारकर्ली',
    description: 'A coastal heaven in Sindhudurg, offering crystal-clear turquoise waters, white sands, and exciting marine scuba diving options.',
    descriptionMr: 'सिंधुदुर्गातील एक नयनरम्य किनारपट्टी, जी तिच्या नितळ पाण्यासाठी, पांढऱ्या वाळूसाठी आणि समुद्राखालील स्कूबा डायव्हिंगसाठी प्रसिद्ध आहे.',
    district: 'Sindhudurg',
    lat: 16.0333,
    lng: 73.4833,
    geofenceRadius: 150,
    category: 'beach',
    imageUrl: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=600&q=80',
    history: 'The nearby Malvan town is historic. Chhatrapati Shivaji Maharaj constructed the coastal marine fortress of Sindhudurg on Kurte Island in 1664 to counter foreign navy forces.',
    historyMr: 'शेजारील मालवण शहर ऐतिहासिक आहे. छत्रपती शिवाजी महाराज यांनी परकीय शक्तींना शह देण्यासाठी १६६४ मध्ये कुर्ते बेटावर सिंधुदुर्ग किल्ला बांधला.',
    culture: 'Traditional Malvani fisherman lifestyle, famous for Malvani dashavatar folk dramas performed at local temples.',
    cultureMr: 'पारंपरिक मालवणी कोळी जीवनशैली, स्थानिक मंदिरांमध्ये सादर होणारे "दशावतार" लोकनाट्य यासाठी हे प्रसिद्ध आहे.',
    food: 'Spicy Malvani Mutton, Kombdi Vade, Fish Thali, and Kokum Solkadhi.',
    foodMr: 'मालवणी पद्धतीचे कोंबडी वडे, तळलेले मासे, झणझणीत मटण आणि सोलकढी.',
    stampMotif: '🐠',
    bestTime: 'October to April when sea visibility is high for scuba.',
    bestTimeMr: 'ऑक्टोबर ते एप्रिल (स्कूबा डायव्हिंग करण्यासाठी समुद्रातील पाणी अतिशय स्वच्छ असते).',
    touristSpots: [
      {
        name: 'Tarkarli Beach',
        nameMr: 'तारकर्ली बीच',
        category: 'Beach',
        categoryMr: 'समुद्रकिनारा',
        shortDescription: 'Famed for its transparent blue-green water, white shoreline, and dolphin-spotting boat trips.',
        shortDescriptionMr: 'नितळ निळे पाणी, पांढरी वाळू आणि डॉल्फिन दाखवणाऱ्या बोटींच्या सफारीसाठी प्रसिद्ध असलेला किनारा.'
      },
      {
        name: 'Sindhudurg Fort',
        nameMr: 'सिंधुदुर्ग किल्ला',
        category: 'Fort',
        categoryMr: 'किल्ला',
        shortDescription: 'A colossal 17th-century sea fort constructed by Shivaji Maharaj, spanning over 48 acres in the ocean.',
        shortDescriptionMr: 'छत्रपती शिवाजी महाराजांनी समुद्रात बांधलेला ४८ एकरवरील भव्य आणि ऐतिहासिक जलदुर्ग.'
      },
      {
        name: 'Tsunami Island',
        nameMr: 'त्सुनामी बेट',
        category: 'Adventure Activity',
        categoryMr: 'साहसी खेळ',
        shortDescription: 'An active sand delta in Karli river backwaters popular for jet-skiing, parasailing, and bumper rides.',
        shortDescriptionMr: 'कर्ली नदीच्या खाडीत बनलेले वाळूचे छोटे बेट जेथे पॅरासेलिंग आणि वॉटर स्पोर्ट्स चालतात.'
      }
    ]
  },
  {
    id: 'raigad',
    name: 'Raigad Fort',
    nameMr: 'रायगड किल्ला',
    description: 'The legendary hill fortress and the grand coronation seat of Chhatrapati Shivaji Maharaj, surrounded by deep Sahyadri valleys.',
    descriptionMr: 'छत्रपती शिवाजी महाराजांच्या राज्याभिषेकाचे ऐतिहासिक ठिकाण असलेला आणि सह्याद्रीच्या खोल दऱ्यांनी वेढलेला अजिंक्य किल्ला.',
    district: 'Raigad',
    lat: 18.2347,
    lng: 73.4431,
    geofenceRadius: 200,
    category: 'heritage',
    imageUrl: 'https://images.unsplash.com/photo-1626264290740-02df5955b9e0?auto=format&fit=crop&w=600&q=80',
    history: 'Shivaji Maharaj captured Rairi in 1656, renamed it Raigad, and made it the royal capital of the sovereign Maratha Kingdom in 1674.',
    historyMr: 'शिवरायांनी १६५६ मध्ये रायरीचा किल्ला जिंकला, त्याचे नाव रायगड ठेवले आणि १६७४ मध्ये त्याला मराठा स्वराज्याची राजधानी घोषित केले.',
    culture: 'Revered as a sacred place of pride and inspiration. Hosts the annual Shivrajyabhishek Sohala festival celebrating coronation day.',
    cultureMr: 'मराठी अस्मिता आणि प्रेरणेचे पवित्र स्थान. येथे दरवर्षी "शिवराज्याभिषेक सोहळा" मोठ्या प्रमाणावर साजरा केला जातो.',
    food: 'Pithla Bhakri, Zhunka, hot Maharashtrian tea, and local wild berries.',
    foodMr: 'चमचमीत झुणका भाकरी, ठेचा, गरम चहा आणि रानमेवा (करवंदे).',
    stampMotif: '👑',
    bestTime: 'Monsoon (June-Sept) for misty clouds, or Winter (Oct-Feb) for hiking.',
    bestTimeMr: 'पावसाळा (ढगाळ हवामान आणि धबधब्यांसाठी) किंवा हिवाळा (ट्रेकिंगसाठी सर्वोत्तम).',
    touristSpots: [
      {
        name: 'Raigad Fort',
        nameMr: 'रायगड किल्ला',
        category: 'Fort',
        categoryMr: 'किल्ला',
        shortDescription: 'The majestic royal court (Raj Sadar) and the sacred Samadhi of Shivaji Maharaj.',
        shortDescriptionMr: 'शिवरायांची मुख्य राजसभा (राजसदरेची भव्य जागा) आणि छत्रपतींचे पवित्र समाधी स्थळ.'
      },
      {
        name: 'Takmak Tok',
        nameMr: 'टकमक टोक',
        category: 'Photography Point',
        categoryMr: 'छायाचित्रण बिंदू',
        shortDescription: 'A historic steep cliff-edge formerly used for executing prisoners, offering breathtaking valley views.',
        shortDescriptionMr: 'ऐतिहासिक काळातील गुन्हेगारांना शिक्षा देण्याची उंच कड्याची जागा, जिथून दरीचे विहंगम दृश्य दिसते.'
      }
    ]
  },
  {
    id: 'sinhagad',
    name: 'Sinhagad Fort',
    nameMr: 'सिंहगड किल्ला',
    description: 'A strategic hill fortress near Pune, famous for the heroic battle of Tanaji Malusare and delicious local pitla-bhakri.',
    descriptionMr: 'पुण्याजवळील एक ऐतिहासिक डोंगरी किल्ला, जो वीर तानाजी मालुसरे यांच्या पराक्रमासाठी आणि गरमागरम पिठलं-भाकरीसाठी प्रसिद्ध आहे.',
    district: 'Pune',
    lat: 18.3661,
    lng: 73.7558,
    geofenceRadius: 150,
    category: 'heritage',
    imageUrl: 'https://images.unsplash.com/photo-1626264290740-02df5955b9e0?auto=format&fit=crop&w=600&q=80',
    history: 'Known as Kondhana, it was renamed Sinhagad (Lion Fort) by Shivaji Maharaj after warrior Tanaji Malusare died winning it back in 1670.',
    historyMr: 'पूर्वी कोंढाणा म्हणून ओळखल्या जाणाऱ्या या किल्ल्यावर १६७० मध्ये तानाजी मालुसरे यांनी प्राणांची आहुती दिली. म्हणून शिवरायांनी याचे नाव सिंहगड ठेवले.',
    culture: 'A beloved weekend trekking destination for Pune citizens. Preserves Marathi war history and traditional lifestyle.',
    cultureMr: 'पुणेकरांचे आवडते वीकेंड ट्रेकिंगचे ठिकाण. येथे मराठ्यांचा लष्करी इतिहास आणि पारंपरिक संस्कृती पाहायला मिळते.',
    food: 'Matka curd (dahi), Pitla Bhakri with green chili thecha, and steamed kanda bhaji.',
    foodMr: 'मातीच्या मडक्यातील घट्ट दही, पिठलं भाकरी, झणझणीत ठेचा आणि कांदा भजी.',
    stampMotif: '🦁',
    bestTime: 'Monsoons for trekking through clouds.',
    bestTimeMr: 'पावसाळा (डोंगरात धुक्याची चादर आणि निसर्ग सौंदर्य पाहण्यासाठी).',
    touristSpots: [
      {
        name: 'Tanaji Malusare Samadhi',
        nameMr: 'तानाजी मालुसरे समाधी',
        category: 'Heritage Monument',
        categoryMr: 'ऐतिहासिक स्मारक',
        shortDescription: 'A memorial dedicated to the brave military commander who conquered the fort.',
        shortDescriptionMr: 'गड जिंकण्यासाठी प्राणांची बाजी लावणाऱ्या नरवीर तानाजी मालुसरे यांचे पवित्र स्मारक.'
      }
    ]
  },
  {
    id: 'shirdi',
    name: 'Shirdi',
    nameMr: 'शिर्डी',
    description: 'The peaceful divine home of the revered saint Sai Baba, attracting millions of spiritual seekers worldwide.',
    descriptionMr: 'पूजनीय संत साई बाबांचे पावन निवासस्थान, जे जगभरातील लाखो भाविकांना आकर्षित करते.',
    district: 'Ahmednagar',
    lat: 19.7667,
    lng: 74.4667,
    geofenceRadius: 150,
    category: 'pilgrimage',
    imageUrl: 'https://images.unsplash.com/photo-1597166160100-333e8b0933f3?auto=format&fit=crop&w=600&q=80',
    history: 'The 19th-century saint Sai Baba lived here in a local mosque called Dwarkamai, preaching self-realization, love, forgiveness, and charity.',
    historyMr: '१९ व्या शतकातील महान संत साई बाबा शिर्डीत एका जुन्या मशिदीत (द्वारकामाई) राहिले. त्यांनी "सबका मालिक एक" असा संदेश देत प्रेम आणि दानशूरतेची शिकवण दिली.',
    culture: 'Deeply spiritual atmosphere with non-stop chants of Sai Baba prayers. The temple runs one of India’s largest free community kitchens.',
    cultureMr: 'अत्यंत शांत आणि मंगलमय वातावरण जेथे साई नामाचा अखंड गजर सुरू असतो. येथील प्रसादालयात लाखो लोकांना मोफत महाप्रसाद दिला जातो.',
    food: 'Shirdi Sheera, Prasad Ladoo, and simple Maharashtrian thali.',
    foodMr: 'साईप्रसाद शिरा, सुप्रसिद्ध बुंदीचे लाडू आणि सात्विक जेवण.',
    stampMotif: '🕉️',
    bestTime: 'October to March when weather is pleasant.',
    bestTimeMr: 'ऑक्टोबर ते मार्च (हवामान प्रवासासाठी आल्हाददायक असते).',
    touristSpots: [
      {
        name: 'Sai Baba Temple',
        nameMr: 'साई बाबा समाधी मंदिर',
        category: 'Temple',
        categoryMr: 'मंदिर',
        shortDescription: 'The sacred Samadhi Temple housing the divine white marble statue of Sai Baba.',
        shortDescriptionMr: 'साई बाबांची समाधी आणि त्यांची संगमरवरी मूर्ती असलेली पवित्र व मुख्य वास्तू.'
      }
    ]
  },
  {
    id: 'trimbakeshwar',
    name: 'Trimbakeshwar',
    nameMr: 'त्र्यंबकेश्वर',
    description: 'An ancient holy town near Nashik, housing one of the twelve sacred Jyotirlingas and the source of the Godavari River.',
    descriptionMr: 'नाशिकजवळील एक अत्यंत प्राचीन आणि पवित्र तीर्थक्षेत्र, जेथे १२ ज्योतिर्लिंगांपैकी एक आणि गोदावरी नदीचे उगमस्थान आहे.',
    district: 'Nashik',
    lat: 19.9333,
    lng: 73.5333,
    geofenceRadius: 150,
    category: 'pilgrimage',
    imageUrl: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=600&q=80',
    history: 'The temple was built in the 18th century by Peshwa Balaji Baji Rao out of black basalt stone, representing classical Hemadpanthi temple architecture.',
    historyMr: 'त्र्यंबकेश्वर मंदिराची सध्याची भव्य वास्तू १८ व्या शतकात पेशवे नानासाहेब यांनी काळ्या पाषाणात हेमाडपंती शैलीत बांधली.',
    culture: 'Spiritual hub associated with sages and holy dips in Kushavarta pond, the symbolic origin of Godavari River.',
    cultureMr: 'कुशावर्त तीर्थावर स्नान करण्याचे महत्त्व आणि हिंदू धर्मातील विविध धार्मिक विधींसाठी हे प्रसिद्ध केंद्र आहे.',
    food: 'Nashik Misal Pav, Sabudana khichdi, and sweet pedhas.',
    foodMr: 'झणझणीत नाशिक मिसळ, साबुदाणा खिचडी आणि पेढे.',
    stampMotif: '🔱',
    bestTime: 'Winter months, and Shravan month for grand weekly walks (pheri).',
    bestTimeMr: 'हिवाळा आणि विशेषतः श्रावण महिना (फेरी मारण्यासाठी उत्तम काळ).',
    touristSpots: [
      {
        name: 'Trimbakeshwar Jyotirlinga Temple',
        nameMr: 'त्र्यंबकेश्वर ज्योतिर्लिंग मंदिर',
        category: 'Temple',
        categoryMr: 'मंदिर',
        shortDescription: 'An ancient temple built of black stone, famous for its unique three-faced linga representing Brahma, Vishnu, and Mahesh.',
        shortDescriptionMr: 'ब्रह्मा, विष्णू आणि महेश दर्शवणारे त्रिमुखी लिंग असलेले ऐतिहासिक काळ्या पाषाणातील मंदिर.'
      }
    ]
  },
  {
    id: 'ajanta',
    name: 'Ajanta Caves',
    nameMr: 'अजिंठा लेणी',
    description: 'World-renowned UNESCO World Heritage site featuring 30 rock-cut Buddhist cave monuments dating from the 2nd century BCE.',
    descriptionMr: 'युनेस्को जागतिक वारसा स्थळ असलेले अजिंठा, जिथे बौद्ध धर्माशी संबंधित ३० पाषाण कोरीव लेणी आढळतात.',
    district: 'Aurangabad',
    lat: 20.5519,
    lng: 75.7033,
    geofenceRadius: 200,
    category: 'heritage',
    imageUrl: 'https://images.unsplash.com/photo-1590050752117-238cb0fb12b1?auto=format&fit=crop&w=600&q=80',
    history: 'The caves were built in two phases, starting around 2nd Century BCE. They were accidentally rediscovered in 1819 by John Smith, a British cavalry officer, while hunting a tiger.',
    historyMr: 'या लेण्यांची निर्मिती दोन टप्प्यांत झाली. १८१९ मध्ये जॉन स्मिथ या ब्रिटिश अधिकाऱ्याला वाघाची शिकार करताना अचानक या लेण्यांचा शोध लागला.',
    culture: 'A masterpiece of Buddhist religious art, famous for beautiful murals, frescoes depicting Jataka tales, and serene statues of Lord Buddha.',
    cultureMr: 'बौद्ध धार्मिक कलेचे उत्कृष्ट उदाहरण, जे जातक कथांचे चित्रण करणारी सुंदर भित्तीचित्रे आणि भगवान बुद्धांच्या शांत मूर्तींसाठी जगप्रसिद्ध आहेत.',
    food: 'Marathwada Jowar Bhakri, Shengdana Chutney, and Baingan Masala.',
    foodMr: 'मराठवाडी ज्वारीची भाकरी, शेंगदाणा चटणी आणि झणझणीत वांग्याचं भरित.',
    stampMotif: '🛕',
    bestTime: 'November to March for pleasant temperatures. Monsoon makes the surrounding Waghora river valley exceptionally green.',
    bestTimeMr: 'नोव्हेंबर ते मार्च (थंड हवेचा काळ). पावसाळ्यात आजूबाजूचा वाघूर नदीचा परिसर अत्यंत हिरवागार आणि विलोभनीय दिसतो.',
    howToReach: 'By Air: Aurangabad Airport (100 km away). By Train: Aurangabad or Jalgaon Railway Station.',
    howToReachMr: 'विमानाने: औरंगाबाद विमानतळ (१०० किमी). रेल्वेने: औरंगाबाद किंवा जळगाव रेल्वे स्टेशन.',
    sightseeingSpots: ['Cave 1 (Padmapani Fresco)', 'Cave 26 (Reclining Buddha)', 'Ajanta Viewpoint'],
    sightseeingSpotsMr: ['लेणी क्र. १ (पद्मपाणी भित्तीचित्र)', 'लेणी क्र. २६ (महापरिनिर्वाण बुद्ध)', 'अजिंठा व्ह्यू पॉइंट'],
    travelTips: 'The caves are closed on Mondays! Flash photography is strictly prohibited inside the caves.',
    travelTipsMr: 'नोंद: अजिंठा लेणी सोमवारी बंद असतात! आत फ्लॅश फोटोग्राफीला सक्त मनाई आहे.',
    touristSpots: [
      {
        name: 'Cave 1 (Padmapani Fresco)',
        nameMr: 'लेणी क्र. १ (पद्मपाणी भित्तीचित्र)',
        category: 'Cave',
        categoryMr: 'लेणी',
        shortDescription: 'Contains the world-famous paintings of Avalokiteshvara Padmapani and Vajrapani.',
        shortDescriptionMr: 'जगातील सर्वात प्रसिद्ध पद्मपाणी आणि वज्रपाणी बोधिसत्त्वांचे भित्तीचित्र असलेली लेणी.'
      },
      {
        name: 'Cave 26 (Reclining Buddha)',
        nameMr: 'लेणी क्र. २६ (परिनिर्वाण बुद्ध)',
        category: 'Cave',
        categoryMr: 'लेणी',
        shortDescription: 'Features a colossal rock sculpture of the Mahaparinirvana (reclining) of Buddha.',
        shortDescriptionMr: 'भगवान बुद्धांच्या महापरिनिर्वाणाची (निद्रिस्त अवस्थेतील) भव्य कोरीव मूर्ती.'
      }
    ]
  },
  {
    id: 'ellora',
    name: 'Ellora Caves',
    nameMr: 'वेरूळ लेणी',
    description: 'An architectural marvel representing Hindu, Buddhist, and Jain cave temples carved out of the Charanandri hills, including the majestic Kailash Temple.',
    descriptionMr: 'हिंदू, बौद्ध आणि जैन धर्माचे प्रतीक असलेल्या चरणंद्री डोंगरातून कोरलेल्या भव्य लेण्या, ज्यामध्ये अद्वितीय कैलास मंदिराचा समावेश आहे.',
    district: 'Aurangabad',
    lat: 20.0258,
    lng: 75.1780,
    geofenceRadius: 200,
    category: 'heritage',
    imageUrl: 'https://images.unsplash.com/photo-1608958416754-0418382ba185?auto=format&fit=crop&w=600&q=80',
    history: 'Dating from 600 to 1000 CE, built during the Rashtrakuta and Yadava dynasties. Cave 16 (Kailash Temple) is the largest single monolithic rock excavation in the world.',
    historyMr: 'इसवी सन ६०० ते १००0 दरम्यान राष्ट्रकूट आणि यादव घराण्यांच्या काळात निर्मिती. लेणी १६ (कैलास मंदिर) हे जगातील सर्वात मोठे अखंड पाषाणात कोरलेले मंदिर आहे.',
    culture: 'Symbol of religious harmony with 34 caves dedicated to three major religions. It hosts the annual Ellora Ajanta Festival of classical music and dance.',
    cultureMr: '३४ लेण्यांच्या माध्यमातून तीन प्रमुख धर्मांचा मिलाफ दाखवणारी धार्मिक सलोख्याची जागा.',
    food: 'Aurangabadi Naan Qalia, Sheer Khurma, and Basundi.',
    foodMr: 'औरंगाबादी नान कालिया, शीर खुरमा आणि मलाईदार बासुंदी.',
    stampMotif: '🪨',
    bestTime: 'October to March when the climate is cool.',
    bestTimeMr: 'ऑक्टोबर ते मार्च. या काळात हवामान थंड असते.',
    howToReach: 'By Road: 30 km from Aurangabad city center.',
    howToReachMr: 'रस्त्याने: औरंगाबाद शहरापासून ३० किमी अंतरावर.',
    sightseeingSpots: ['Kailash Temple (Cave 16)', 'Buddhist Caves (Caves 1-12)', 'Jain Caves (Caves 30-34)'],
    sightseeingSpotsMr: ['कैलास मंदिर (लेणी १६)', 'बौद्ध लेणी (लेणी १-१२)', 'जैन लेणी (लेणी ३०-३४)'],
    travelTips: 'The caves are closed on Tuesdays! Give yourself at least 3 hours to explore.',
    travelTipsMr: 'नोंद: वेरूळ लेणी मंगळवारी बंद असतात! फिरण्यासाठी ३ तास वेळ सोबत ठेवा.',
    touristSpots: [
      {
        name: 'Kailash Temple (Cave 16)',
        nameMr: 'कैलास मंदिर (लेणी १६)',
        category: 'Temple',
        categoryMr: 'मंदिर',
        shortDescription: 'The worlds largest monolithic top-down excavation, carved out of a single mountain wall.',
        shortDescriptionMr: 'एकाच डोंगरातून वरून खाली कोरलेले जगातील सर्वात मोठे अखंड पाषाणातील मंदिर.'
      }
    ]
  },
  {
    id: 'shaniwar_wada',
    name: 'Shaniwar Wada',
    nameMr: 'शनिवार वाडा',
    description: 'The historic fortified seat of the Peshwas of the Maratha Empire, known for its massive teak gates and grand fountain courtyard in Pune.',
    descriptionMr: 'मराठा साम्राज्याच्या पेशव्यांचे ऐतिहासिक मुख्य ठिकाण, जे त्याच्या भव्य सागवान लाकडाच्या दरवाजांसाठी आणि कारंजांच्या आवारासाठी प्रसिद्ध आहे.',
    district: 'Pune',
    lat: 18.5192,
    lng: 73.8553,
    geofenceRadius: 80,
    category: 'heritage',
    imageUrl: 'https://images.unsplash.com/photo-1626264290740-02df5955b9e0?auto=format&fit=crop&w=600&q=80',
    history: 'Built in 1732 by Peshwa Baji Rao I. It was once a majestic seven-story stone castle, but was largely destroyed in an unexplained fire in 1828.',
    historyMr: '१७३२ मध्ये पेशवे पहिले बाजीराव यांनी बांधला. एकेकाळी हा भव्य सात मजली वाडा होता, जो १८२८ च्या भीषण आगीत नष्ट झाला.',
    culture: 'The center of Peshwa politics and Marathi theater. Today, the Light and Sound Show held here tells the glorious stories of Shivaji Maharaj.',
    cultureMr: 'पेशवाईचे राजकारण आणि मराठी रंगभूमीचे केंद्र.',
    food: 'Pune Misal Pav, Bakarwadi, and Mango Mastani.',
    foodMr: 'पुणेरी मिसळ पाव, चितळेंची बाकरवडी आणि मँगो मस्तानी.',
    stampMotif: '🏰',
    bestTime: 'Open all year. Evenings are best to enjoy the light show.',
    bestTimeMr: 'वर्षभर खुले. संध्याकाळची वेळ शो पाहण्यासाठी उत्तम आहे.',
    howToReach: 'Located in the heart of Pune city. Accessible via local city buses, auto-rickshaws, and Pune Metro.',
    howToReachMr: 'पुणे शहराच्या मध्यभागी (शनिवार पेठ) वसलेले आहे. रिक्षा किंवा मेट्रोने सहज पोहोचता येते.',
    sightseeingSpots: ['Delhi Gate', 'Hazari Karanje', 'Peshwa Baji Rao Statue'],
    sightseeingSpotsMr: ['दिल्ली दरवाजा', 'हजारी कारंजे', 'थोरले बाजीराव पेशवे पुतळा'],
    travelTips: 'The sound and light show is held daily in Marathi and English.',
    travelTipsMr: 'येथे रोज संध्याकाळी "लाईट अँड साऊंड शो" होतो.',
    touristSpots: [
      {
        name: 'Delhi Gate (Dilli Darwaza)',
        nameMr: 'दिल्ली दरवाजा',
        category: 'Heritage Monument',
        categoryMr: 'ऐतिहासिक स्मारक',
        shortDescription: 'The majestic main north-facing gateway of the fort, strong enough to repel elephant attacks.',
        shortDescriptionMr: 'शनिवार वाड्याचे मुख्य प्रवेशद्वार, हत्तींचे हल्ले रोखण्यासाठी ज्यावर लोखंडी खिळे लावलेले आहेत.'
      }
    ]
  },
  {
    id: 'tadoba',
    name: 'Tadoba National Park',
    nameMr: 'ताडोबा राष्ट्रीय उद्यान',
    description: 'Maharashtra’s oldest and largest national park, famously called the "Land of the Tiger" with excellent tiger sightings and rich biodiversity.',
    descriptionMr: 'महाराष्ट्रातील सर्वात जुने आणि मोठे राष्ट्रीय उद्यान, ज्याला "वाघांची भूमी" म्हटले जाते, जिथे वाघ आणि समृद्ध जैवविविधता पाहायला मिळते.',
    district: 'Chandrapur',
    lat: 20.2185,
    lng: 79.3032,
    geofenceRadius: 300,
    category: 'wildlife',
    imageUrl: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=600&q=80',
    history: 'Created in 1955. Named after the local deity "Taru" or "Tadoba" (a tribal chief who died in a legendary tiger encounter) worshipped by Gond tribals.',
    historyMr: '१९५५ मध्ये स्थापना झाली. स्थानिक गोंड जमातीने पुजलेले दैवत "तारू" किंवा "ताडोबा" याच्या नावावरून हे नाव देण्यात आले.',
    culture: 'Rich Gond tribal heritage. Local guides are experts in tracking tiger footprints (pugmarks) and deciphering deer warning alarm calls.',
    cultureMr: 'गोंड आदिवासी जमातीचा समृद्ध वारसा.',
    food: 'Varhadi Saoji Chicken, Pitla Bhakri, and local wild honey.',
    foodMr: 'झणझणीत वऱ्हाडी सावजी बेत, पिठलं भाकरी आणि जंगलातील मध.',
    stampMotif: '🐅',
    bestTime: 'October to June. Tiger sightings are highest in dry summer months (March to May) near water bodies.',
    bestTimeMr: 'ऑक्टोबर ते जून. उन्हाळ्यात (मार्च ते मे) वाघ पाहण्याची शक्यता सर्वात जास्त असते.',
    howToReach: 'By Train: Chandrapur Station (45 km away). By Air: Nagpur Airport (140 km away).',
    howToReachMr: 'रेल्वेने: चंद्रपूर रेल्वे स्टेशन (४५ किमी). विमानाने: नागपूर विमानतळ (१४० किमी).',
    sightseeingSpots: ['Tadoba Lake Safari', 'Moharli Gate zone', 'Kolara Gate zone'],
    sightseeingSpotsMr: ['ताडोबा तलाव सफारी', 'मोहुर्ली गेट झोन', 'कोलारा गेट झोन'],
    travelTips: 'Safaris book out 3-4 months in advance online! Maintain strict silence during safaris.',
    travelTipsMr: 'सफारीचे बुकिंग ३ ते ४ महिने आधीच ऑनलाईन करावे लागते! सफारी दरम्यान पूर्ण शांतता राखा.',
    touristSpots: [
      {
        name: 'Tadoba Lake',
        nameMr: 'ताडोबा तलाव',
        category: 'Wildlife Sanctuary',
        categoryMr: 'वन्यजीव अभयारण्य',
        shortDescription: 'A scenic lake located in the core forest area, a hotspot for crocodiles, migratory birds, and thirsty tigers.',
        shortDescriptionMr: 'गाभा जंगलात वसलेला सुंदर तलाव जेथे मगरी, पक्षी आणि तहानलेले वाघ पाणी पिण्यासाठी येतात.'
      }
    ]
  },
  {
    id: 'sanjay_gandhi',
    name: 'Sanjay Gandhi National Park',
    nameMr: 'संजय गांधी राष्ट्रीय उद्यान',
    description: 'A unique urban national park located within Mumbai city limits, featuring wild leopards, Kanheri Caves, and serene lakes.',
    descriptionMr: 'मुंबई शहराच्या मध्यभागी असलेले एक अनोखे राष्ट्रीय उद्यान, जिथे बिबट्यांचे दर्शन, कान्हेरी लेणी आणि सुंदर तलाव पाहायला मिळतात.',
    district: 'Mumbai Suburban',
    lat: 19.2215,
    lng: 72.9185,
    geofenceRadius: 150,
    category: 'wildlife',
    imageUrl: 'https://images.unsplash.com/photo-1615966689782-b49e5d03c24d?auto=format&fit=crop&w=600&q=80',
    history: 'Known as Borivali National Park before 1981. It encompasses Kanheri Caves (1st century BCE to 10th century CE) which were historic Buddhist learning centers.',
    historyMr: '१९८१ पूर्वी याला बोरीवली राष्ट्रीय उद्यान म्हटले जाई. उद्यानात बौद्ध विहाराचे ऐतिहासिक केंद्र राहिलेल्या कान्हेरी लेणी समाविष्ट आहेत.',
    culture: 'Serves as the lung of Mumbai. It coexists with Mumbai’s hyper-modern high-rises and is home to indigenous Warli tribals who paint beautiful murals.',
    cultureMr: 'मुंबईचे फुफ्फुस म्हणून ओळख जाते.',
    food: 'Mumbai Vada Pav, cutting chai, and fresh coconut water.',
    foodMr: 'मुंबईचा वडा पाव, कटिंग चहा आणि ओलं खोबरं पाणी.',
    stampMotif: '🐆',
    bestTime: 'October to April. Early mornings are peaceful and ideal for birdwatching and cycling.',
    bestTimeMr: 'ऑक्टोबर ते एप्रिल. पक्षीनिरीक्षण आणि सायकलिंगसाठी सकाळी लवकर जाणे फायदेशीर ठरते.',
    howToReach: 'Located in Borivali, Mumbai. Easy to reach via Western Railway.',
    howToReachMr: 'मुंबईतील बोरीवली येथे स्थित. बोरीवली स्टेशनवरून येथे येणे सोपे आहे.',
    sightseeingSpots: ['Kanheri Caves', 'Tiger & Lion Safari', 'Vihar Lake'],
    sightseeingSpotsMr: ['कान्हेरी लेणी', 'वाघ आणि सिंह सफारी', 'विहार तलाव'],
    travelTips: 'You can rent bicycles near the main entrance to ride to Kanheri Caves.',
    travelTipsMr: 'मुख्य प्रवेशद्वाराजवळ सायकली भाड्याने मिळतात, ज्याने तुम्ही लेण्यांपर्यंत जाऊ शकता.',
    touristSpots: [
      {
        name: 'Kanheri Caves',
        nameMr: 'कान्हेरी लेणी',
        category: 'Cave',
        categoryMr: 'लेणी',
        shortDescription: 'A colossal complex of 109 Buddhist caves carved out of black basalt rock hills.',
        shortDescriptionMr: 'काळ्या बेसॉल्ट डोंगरात कोरलेल्या १०९ बौद्ध गुहांचा एक प्राचीन आणि विस्तीर्ण समूह.'
      }
    ]
  },
  {
    id: 'melghat',
    name: 'Melghat Tiger Reserve',
    nameMr: 'मेळघाट व्याघ्र प्रकल्प',
    description: 'Located in the Satpura hill range, Melghat is a pristine jungle featuring deep ravines, teak forests, leopards, sloth bears, and tigers.',
    descriptionMr: 'सातपुडा पर्वत रांगेत वसलेले मेळघाट हे नितांत सुंदर जंगल असून येथे बिबट्या, अस्वल आणि वाघ आढळतात.',
    district: 'Amravati',
    lat: 21.4312,
    lng: 77.1235,
    geofenceRadius: 250,
    category: 'wildlife',
    imageUrl: 'https://images.unsplash.com/photo-1470240731273-7821a6eeb6bd?auto=format&fit=crop&w=600&q=80',
    history: 'Among the first 9 tiger reserves declared under Project Tiger in 1973-74. Tapi river flows along its northern boundary, defining historical trade paths.',
    historyMr: '१९७३-७४ मध्ये "प्रोजेक्ट टायगर" अंतर्गत घोषित केलेल्या पहिल्या ९ व्याघ्र प्रकल्पांपैकी एक.',
    culture: 'Home to the Korku tribe, famous for their herbal medicine knowledge, wood carvings, and beautiful bamboo craft products.',
    cultureMr: 'कोरकू आदिवासी जमातीचे निवासस्थान.',
    food: 'Amravati Orange burfi, Saonji mutton, and local Mahua drink.',
    foodMr: 'अमरावतीची संत्रा बर्फी, झणझणीत सावजी मटण आणि गावरान जेवण.',
    stampMotif: '🦅',
    bestTime: 'December to May. The landscape turns dry-deciduous making animal sightings very common.',
    bestTimeMr: 'डिसेंबर ते मे. या काळात प्राणी सहज दिसतात.',
    howToReach: 'By Road: About 110 km from Amravati. By Train: Badnera/Amravati Railway station.',
    howToReachMr: 'रस्त्याने: अमरावतीपासून सुमारे ११० किमी. रेल्वेने: बडनेरा रेल्वे स्टेशन.',
    sightseeingSpots: ['Chikhaldara', 'Semadoh', 'Kolkas'],
    sightseeingSpotsMr: ['चिखलदरा', 'सेमाडोह', 'कोलकास'],
    travelTips: 'Hiring a registered local tribal guide is mandatory for safari.',
    travelTipsMr: 'सफारीसाठी नोंदणीकृत स्थानिक आदिवासी गाईड घेणे सक्तीचे आहे.',
    touristSpots: [
      {
        name: 'Chikhaldara',
        nameMr: 'चिखलदरा',
        category: 'Hill Station',
        categoryMr: 'थंड हवेचे ठिकाण',
        shortDescription: 'The only coffee-growing hill station in Maharashtra, offering cool mountain breeze and spectacular valley views.',
        shortDescriptionMr: 'महाराष्ट्रातील एकमेव कॉफी उत्पादक थंड हवेचे ठिकाण, जिथे आल्हाददायक वातावरण आणि खोल दऱ्यांचे सुंदर दृश्य दिसते.'
      }
    ]
  },
  {
    id: 'nashik',
    name: 'Nashik',
    nameMr: 'नाशिक',
    description: 'The Wine Capital of India, nestled on the banks of Godavari river, offering premium vineyard tours, historic temples, and cool climates.',
    descriptionMr: 'भारताची वाईन राजधानी, जी गोदावरी नदीच्या काठावर वसलेली आहे. येथे द्राक्षांच्या बागांचे पर्यटन, प्राचीन मंदिरे आणि सुंदर हवामान पाहायला मिळते.',
    district: 'Nashik',
    lat: 19.9975,
    lng: 73.7898,
    geofenceRadius: 150,
    category: 'heritage',
    imageUrl: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=600&q=80',
    history: 'Historically significant as Panchavati, where Lord Rama stayed during exile. It is one of the four sacred cities hosting the Kumbh Mela.',
    historyMr: 'ऐतिहासिकदृष्ट्या पंचवटी म्हणून ओळखले जाते, जिथे प्रभू राम वनवासादरम्यान राहिले होते. येथे दर १२ वर्षांनी प्रसिद्ध सिंहस्थ कुंभमेळा भरतो.',
    culture: 'Deeply rooted in spiritual and agricultural traditions, combining grand grape harvests with classical temple rites.',
    cultureMr: 'कृषी आणि आध्यात्मिक परंपरांचे उत्तम मिश्रण असलेले समृद्ध शहर.',
    food: 'Nashik Misal Pav, fresh black grapes, and local vineyard specialties.',
    foodMr: 'नाशिकची चमचमीत मिसळ पाव, काळी द्राक्षे आणि पेढे.',
    stampMotif: '🍇',
    bestTime: 'October to March for pleasant temperatures and grape harvest.',
    bestTimeMr: 'ऑक्टोबर ते मार्च - द्राक्षांचा सुगीचा काळ आणि पर्यटनासाठी सर्वोत्तम वेळ.',
    touristSpots: [
      {
        name: 'Sula Vineyards',
        nameMr: 'सुला वाईनयार्ड्स',
        category: 'Village Tourism',
        categoryMr: 'कृषी पर्यटन',
        shortDescription: 'The pioneer of Indian wine tourism offering lush vineyard walks, tastings, and a beautiful resort scenery.',
        shortDescriptionMr: 'भारतातील कृषी आणि द्राक्ष बागेच्या पर्यटनाचे प्रणेते जेथे वाईन टेस्टिंग आणि फिरण्याचा आल्हाददायक आनंद मिळतो.'
      },
      {
        name: 'Panchavati',
        nameMr: 'पंचवटी',
        category: 'Temple',
        categoryMr: 'मंदिर',
        shortDescription: 'The sacred holy riverbank where Lord Rama, Sita, and Lakshmana spent years of their exile, housing Kalaram Temple.',
        shortDescriptionMr: 'प्रभू श्रीराम, सीता आणि लक्ष्मण वनवासादरम्यान राहिले होते ते पवित्र गोदावरी काठचे श्रद्धास्थान.'
      }
    ]
  }
];

export const CIRCUITS: Circuit[] = [
  {
    id: 'konkan',
    name: 'Konkan Coastal Circuit',
    nameMr: 'कोकण किनारपट्टी सर्किट',
    description: 'Journey through silver shores, coconut plantations, delicious seafood, and historic sea fortresses in the coastal Konkan region.',
    descriptionMr: 'कोकणच्या सोनेरी वाळूच्या किनाऱ्यांवरून, नारळी-सुपारीच्या बागांमधून फिरताना ऐतिहासिक जलदुर्ग आणि चवदार कोकणी जेवणाचा आस्वाद घ्या.',
    destinations: ['alibaug', 'murud', 'ganpatipule', 'tarkarli'],
    color: 'bg-cyan-500',
    accentColor: 'cyan',
    geography: 'Stretches along the narrow, fertile coastal strip of western India between the Sahyadri Hills and the Arabian Sea. It features sandy beaches, rocky cliffs, and estuarine creeks.',
    geographyMr: 'अरबी समुद्र आणि सह्याद्री पर्वत यांच्या दरम्यान असलेली ही चिंचोळी आणि सुपीक किनारपट्टी आहे. येथे वाळूचे किनारे, कातळ कडे आणि खाड्यांचे सुंदर जाळे पसरलेले आहे.',
    culture: 'Deeply connected with maritime traditions, Koli folk music/dance, coconut and mango harvesting festivals, and delicious Malvani seafood cuisine.',
    cultureMr: 'कोळी लोकगीते, पारंपरिक नृत्य, नारळ व आंबा काढणीचे सण आणि चवदार मालवणी खाद्यसंस्कृती या ऐतिहासिक किनारपट्टीच्या संस्कृतीचा मुख्य कणा आहेत.',
    history: 'Home to legendary sea fortresses like Murud-Janjira and Sindhudurg, serving as naval strongholds for the Maratha Empire and key ports in global trade networks.',
    historyMr: 'मुरुड-जंजिरा आणि सिंधुदुर्ग सारख्या अजिंक्य जलदुर्गांची भूमी, ज्यांनी मराठा नौदलाचे मुख्य तळ आणि जागतिक व्यापारी बंदरे म्हणून इतिहास गाजवला आहे.'
  },
  {
    id: 'forts',
    name: 'Fort Circuit',
    nameMr: 'किल्ले आणि दुर्ग सर्किट',
    description: 'Walk through the historical royal capitals, grand coronation sites, and formidable battlegrounds of the Maratha Empire.',
    descriptionMr: 'मराठा साम्राज्याची गौरवशाली राजधानी, भव्य राजसदा आणि पराक्रमी डोंगरी किल्ल्यांच्या थरारक इतिहासाचा अनुभव घ्या.',
    destinations: ['raigad', 'sinhagad'],
    color: 'bg-rose-500',
    accentColor: 'rose',
    geography: 'Perched on the rugged basaltic ridges of the Sahyadri range, where sheer cliffs and deep valleys provided formidable natural fortifications.',
    geographyMr: 'सह्याद्रीच्या खडकाळ आणि बेसाल्ट कड्यांच्या उंच सुळक्यांवर हे किल्ले वसलेले आहेत, जिथे खोल दऱ्या आणि कडे नैसर्गिक तटबंदी निर्माण करतात.',
    culture: 'A living heritage of devotion to Chhatrapati Shivaji Maharaj, traditional Gondhal/Powada songs praising warrior deeds, and festive celebration of Shiv Jayanti.',
    cultureMr: 'छत्रपती शिवाजी महाराजांच्या कर्तृत्वाचा जिवंत वारसा, वीररसयुक्त पोवाडे, पारंपरिक गोंधळ आणि शिवजयंतीचा भव्य लोकोत्सव येथे अनुभवता येतो.',
    history: 'The cradle of Swarajya (self-rule). These forts witnessed iconic battles, Royal coronations, and the rise of the sovereign Maratha Empire in the 17th century.',
    historyMr: 'स्वराज्याची पावन भूमी. या किल्ल्यांनी छत्रपती शिवाजी महाराजांचा राज्याभिषेक, महान लढाया आणि १७ व्या शतकात मराठा साम्राज्याच्या उदयाचा सुवर्णकाळ पाहिला आहे.'
  },
  {
    id: 'hill_stations',
    name: 'Hill Station Circuit',
    nameMr: 'सह्याद्री थंड हवेची ठिकाणे सर्किट',
    description: 'Escape into the misty mountains of the Western Ghats. Discover cool climates, strawberry fields, and eco-friendly pathways.',
    descriptionMr: 'पश्चिम घाटाच्या धुक्यात हरवलेल्या पर्वतांमध्ये फिरा. थंड हवामान, स्ट्रॉबेरीच्या शेती आणि पर्यावरणपूरक रस्त्यांचा आनंद घ्या.',
    destinations: ['lonavala', 'mahabaleshwar', 'matheran'],
    color: 'bg-emerald-500',
    accentColor: 'emerald',
    geography: 'High-altitude plateaus of the Western Ghats (Sahyadris), characterized by dense evergreen forests, cascading monsoonal waterfalls, and deep gorges.',
    geographyMr: 'सह्याद्री पर्वतरांगांमधील उंच पठारी भाग, जेथे घनदाट सदाहरित जंगले, पांढरेधोपट वाहणारे धबधबे आणि खोल दऱ्यांचे विलोभनीय दर्शन घडते.',
    culture: 'A relaxed, eco-friendly lifestyle blending tribal forest communities, famous local sweet treat "Chikki" making, and active outdoor hiking culture.',
    cultureMr: 'आदिवासी संस्कृती, प्रसिद्ध लोणावळ्याची चिक्की बनवण्याची कला आणि निसर्गात भटकंती व ट्रेकिंग करण्याची साहसी जीवनशैली येथे पाहायला मिळते.',
    history: 'Sanctuaries developed in the 19th century under colonial rule as summer retreats to escape heat, later becoming critical botanical and ecological zones.',
    historyMr: '१९ व्या शतकात ब्रिटिश काळात कडक उष्णतेपासून सुटका मिळवण्यासाठी थंड हवेची ठिकाणे म्हणून विकसित झालेली आणि आज पर्यावरणपूरक अभयारण्ये असलेली क्षेत्रे.'
  },
  {
    id: 'pilgrimage',
    name: 'Pilgrimage Circuit',
    nameMr: 'पवित्र तीर्थक्षेत्र आणि देवस्थान सर्किट',
    description: 'Embark on a spiritual journey to the divine shrines, self-manifested idols, and highly sacred Jyotirlingas of Maharashtra.',
    descriptionMr: 'महाराष्ट्रातील जागृत देवस्थाने, स्वयंभू मंदिरे आणि पवित्र कुशावर्त ज्योतिर्लिंगांच्या दर्शनाने मन प्रसन्न करा.',
    destinations: ['shirdi', 'trimbakeshwar', 'ganpatipule'],
    color: 'bg-amber-500',
    accentColor: 'amber',
    geography: 'Spread across sacred river valleys like Godavari and Krishna, as well as serene coastal temples nestled between quiet hills.',
    geographyMr: 'गोदावरी आणि कृष्णा यांसारख्या पवित्र नद्यांच्या खोऱ्यात, तसेच डोंगरांच्या कुशीत आणि शांत समुद्रकिनाऱ्यांवर वसलेली ही पावन तीर्थक्षेत्रे आहेत.',
    culture: 'The heart of Maharashtra\'s Varkari tradition, characterized by peaceful community prayers, devotional Abhang bhajan singing, and massive annual foot pilgrimages.',
    cultureMr: 'महाराष्ट्रातील वारकरी संप्रदायाचा गाभा, सामूहिक प्रार्थना, संतांचे पवित्र अभंग आणि आषाढी-कार्तिकी वारीच्या रूपाने लाखो भाविकांचे एकत्र येणे.',
    history: 'Dating back to medieval saints like Dnyaneshwar, Tukaram, and Sai Baba, these locations have fostered spiritual equality, social reform, and profound peace for centuries.',
    historyMr: 'संत ज्ञानेश्वर, संत तुकाराम आणि साईबाबांसारख्या थोर संतांच्या पदस्पर्शाने पावन झालेली ही ठिकाणे, ज्यांनी शतकानुशतके सामाजिक एकता व अध्यात्म टिकवून ठेवले आहे.'
  },
  {
    id: 'buddhist',
    name: 'Buddhist Circuit',
    nameMr: 'बौद्ध वारसा लेणी सर्किट',
    description: 'Explore the spectacular 2000-year-old rock-cut caves, beautifully painted murals, and ancient Buddhist prayer halls.',
    descriptionMr: 'दोन हजार वर्षे जुन्या कोरीव लेण्या, जातक कथांचे सुंदर भित्तीचित्र आणि प्राचीन बौद्ध प्रार्थनागृहांचा भव्य वारसा शोधा.',
    destinations: ['ajanta', 'ellora', 'sanjay_gandhi'],
    color: 'bg-indigo-500',
    accentColor: 'indigo',
    geography: 'Located on secluded volcanic rock hillsides, carved deep into river gorges (like the Waghur river bend in Ajanta) to guarantee peaceful meditation.',
    geographyMr: 'शांत आणि एकांत ठिकाणी असलेल्या ज्वालामुखीच्या काळ्या पाषाणात, वाघूर नदीच्या वळणावर (अजिंठा) कोरलेल्या या प्राचीन लेणी आहेत.',
    culture: 'Represents early Buddhist Monastic life, showcasing incredible rock-sculptures of Bodhisattvas, detailed Jataka tale paintings, and Hinayana/Mahayana stupas.',
    cultureMr: 'प्राचीन बौद्ध भिक्षूंचे जीवन दर्शवणारी, बोधिसत्वांच्या मूर्ती, जातक कथांवर आधारित अप्रतिम भित्तीचित्रे आणि हीनयान व महायान पंथांचे चैत्यगृह येथे आहेत.',
    history: 'Dating from 2nd century BCE to 6th century CE, patronized by dynasties like Satavahanas and Vakatakas, representing some of mankind\'s finest artistic accomplishments.',
    historyMr: 'इसवी सन पूर्व २ रे शतक ते इसवी सन ६ वे शतक दरम्यान सातवाहन आणि वाकाटक राजांच्या काळात कोरलेला हा मानवी शिल्पकलेचा जगप्रसिद्ध ठेवा आहे.'
  },
  {
    id: 'wildlife',
    name: 'Wildlife Circuit',
    nameMr: 'व्याघ्र आणि राष्ट्रीय उद्याने सर्किट',
    description: 'Venture into the heart of Central India’s dense forests. Track wild Bengal Tigers, leopards, and rich biodiversity in reserves.',
    descriptionMr: 'मध्य भारतातील घनदाट जंगलांच्या कुशीत शिरा. रॉयल बंगाल वाघ, बिबट्या आणि दुर्मिळ पक्षांना त्यांच्या नैसर्गिक अधिवासात पाहा.',
    destinations: ['tadoba', 'sanjay_gandhi', 'melghat'],
    color: 'bg-orange-500',
    accentColor: 'orange',
    geography: 'Vast deciduous teak forests, dry grasslands, and river basins in Central India and Eastern Vidarbha, offering rich water holes for animals.',
    geographyMr: 'पूर्व विदर्भातील पानगळीची सागवान जंगले, गवताळ कुरणे आणि विस्तीर्ण जलसाठे, जे वन्यजीवांना उत्तम नैसर्गिक अधिवास पुरवतात.',
    culture: 'Deep co-existence between forest-dwelling tribal communities (like Gond and Madia) and the wilderness, with high respect for wildlife protection.',
    cultureMr: 'गोंड आणि माडिया यांसारख्या आदिवासी जमातींचे जंगलाशी असलेले अतूट नाते, निसर्गपूजा आणि वन्यजीवांच्या रक्षणाची पारंपरिक लोकसंस्कृती.',
    history: 'Once former royal hunting grounds, these forests were declared Tiger Reserves and National Parks in the 20th century, becoming benchmarks in global conservation.',
    historyMr: 'पूर्वीच्या राजा-महाराजांची शिकारीची जंगले, जी पुढे २० व्या शतकात व्याघ्र प्रकल्प व राष्ट्रीय उद्याने म्हणून घोषित करण्यात आली आणि पर्यावरण संवर्धनाचे केंद्र बनली.'
  },
  {
    id: 'heritage',
    name: 'Heritage Circuit',
    nameMr: 'ऐतिहासिक वास्तू आणि वारसा सर्किट',
    description: 'Discover the grand architectural monuments, Peshwa palaces, rock excavations, and colonial landmarks.',
    descriptionMr: 'भव्य शनिवार वाडा, दगडी किल्ले आणि ब्रिटिश कालीन प्रसिद्ध वास्तूंच्या ऐतिहासिक वारशाचे साक्षीदार व्हा.',
    destinations: ['shaniwar_wada', 'ajanta', 'ellora'],
    color: 'bg-violet-500',
    accentColor: 'violet',
    geography: 'Centred around key urban and rural historical hubs in western and central Maharashtra, bridging the Deccan Plateau and ancient trade valleys.',
    geographyMr: 'मध्य आणि पश्चिम महाराष्ट्रातील महत्त्वाच्या ऐतिहासिक केंद्रांवर आधारित, जे दख्खनचे पठार आणि प्राचीन व्यापारी मार्गांना जोडते.',
    culture: 'A rich tapestry of classical performing arts, traditional handloom weaving (like Paithani sarees), Marathi literature, and grand Peshwai festivals.',
    cultureMr: 'शास्त्रीय कला, पारंपरिक पैठणी विणकाम, मराठी साहित्य आणि शनिवार वाड्यातील शनिवारच्या ऐतिहासिक संस्कृतीचा वैभवशाली मिलाफ.',
    history: 'Traces back through Satavahana, Rashtrakuta, Yadava, and Peshwa eras, showcasing grand stone monuments, palaces, and architectural shifts across dynasties.',
    historyMr: 'सातवाहन, राष्ट्रकूट, यादव आणि पेशवे यांच्या वैभवशाली कालखंडाचे पुरावे, भव्य वाडे, महाल आणि भव्य दगडी शिल्पांच्या स्वरूपात जतन केलेले आहेत.'
  },
  {
    id: 'beach',
    name: 'Beach Circuit',
    nameMr: 'समुद्रकिनारा पर्यटन सर्किट',
    description: 'Relax on the sun-kissed beaches, enjoy adventure water sports, and watch spectacular sunsets over the Arabian Sea.',
    descriptionMr: 'अरबी समुद्रातील निळेशार पाणी, साहसी जलक्रीडा प्रकार आणि मावळत्या सूर्याचे विलोभनीय दृश्य अनुभवण्यासाठी किनारे पालथे घाला.',
    destinations: ['alibaug', 'tarkarli', 'ganpatipule'],
    color: 'bg-teal-500',
    accentColor: 'teal',
    geography: 'Featuring pristine white and golden sands, shallow tide-pools along the Arabian Sea, and gorgeous backwaters bordered by dense palm groves.',
    geographyMr: 'अरबी समुद्राला लागून असलेले पांढऱ्या व सोनेरी वाळूचे सुंदर किनारे, स्वच्छ खाड्या आणि नारळी-सुपारीच्या गर्द बागांनी वेढलेली किनारपट्टी.',
    culture: 'Laidback coastal lifestyle ("Susegad" influence), traditional fish-drying, boat-building craft, and exciting beach festivals.',
    cultureMr: 'शांत आणि निवांत कोकणी जीवनशैली, मासे सुकवण्याची पारंपरिक कला, होड्या बांधण्याचे कौशल्य आणि चैतन्यमय समुद्रकिनारी जत्रा.',
    history: 'Centuries-old fishing villages that played key roles in defending trade channels and served as vital docking ports for ancient Greek, Roman, and Arab merchants.',
    historyMr: 'शतकानुशतके जुनी कोळी गावे, ज्यांनी सागरी व्यापाराचे रक्षण केले आणि ग्रीक, रोमन व अरब व्यापारी जहाजांसाठी महत्त्वाची बंदरे म्हणून काम केले.'
  },
  {
    id: 'wine',
    name: 'Wine Circuit',
    nameMr: 'द्राक्ष बागा आणि वाईनेरी सर्किट',
    description: 'Take premium winery tours, walk through rolling grape vineyards, and enjoy peaceful backwater lake resorts in Nashik.',
    descriptionMr: 'द्राक्षांच्या विस्तीर्ण बागांमध्ये फिरा, वाईन बनवण्याची प्रक्रिया जवळून पाहा आणि निसर्गरम्य धरणाच्या काठावरील रिसॉर्टचा आनंद घ्या.',
    destinations: ['nashik'],
    color: 'bg-purple-550',
    accentColor: 'purple',
    geography: 'Blessed with the unique microclimate of Nashik Valley—cool nights, warm sunny days, well-drained volcanic soil, and proximity to major reservoirs.',
    geographyMr: 'नाशिकच्या द्राक्ष खोऱ्यातील दख्खनचे विशिष्ट हवामान जे द्राक्ष शेतीसाठी उत्तम मानले जाते.',
    culture: 'A modern grape-harvesting culture combining European winemaking standards with local farming practices, hosting active annual grape crushing festivals.',
    cultureMr: 'युरोपियन वाईन बनवण्याच्या तंत्रज्ञानाचा स्थानिक शेतीशी मेळ, द्राक्ष तोडणीचा सण आणि द्राक्ष तुडवण्याचा (Grape Stomping) अनोखा उत्सव.',
    history: 'Nashik emerged as the Grape Capital of India, which later evolved into the Wine Capital of India in the late 1990s, triggering a massive agro-tourism boom.',
    historyMr: 'नाशिक हे प्रथम भारताचे "द्राक्षांचे शहर" म्हणून ओळखले गेले आणि पुढे १९९० च्या दशकात भारताची "वाईन कॅपिटल" म्हणून उदयास येऊन कृषी पर्यटनाचा नवा अध्याय सुरू झाला.'
  },
  {
    id: 'adventure',
    name: 'Adventure Circuit',
    nameMr: 'साहसी खेळ आणि ट्रेकिंग सर्किट',
    description: 'Challenge yourself with high mountain valley treks, parasailing over deltas, and rappelling on rocky steep cliffs.',
    descriptionMr: 'सह्याद्रीच्या उंच सुळक्यांवर ट्रेकिंग करणे, समुद्राच्या पाण्यात पॅरासेलिंग करणे आणि साहसी खेळांचा थरार अनुभवणे.',
    destinations: ['lonavala', 'tarkarli'],
    color: 'bg-blue-500',
    accentColor: 'blue',
    geography: 'Comprising sheer Sahyadri mountain walls, high rocky pinnacles, deep volcanic gorges, and wild ocean waves along the coast.',
    geographyMr: 'सह्याद्रीचे सरळ कडे, सुळके, खोल दऱ्या आणि कोकणच्या समुद्रातील उंच लाटा असा वैविध्यपूर्ण आणि आव्हानात्मक भौगोलिक प्रदेश.',
    culture: 'A thrilling culture of local trekkers, climbing clubs, and expert water sportsmen who possess deep knowledge of monsoonal winds and ocean currents.',
    cultureMr: 'स्थानिक ट्रेकर्स, गिर्यारोहक संस्था आणि जलक्रीडा तज्ज्ञांचे धाдसी आयुष्य, ज्यांना सह्याद्रीच्या वाऱ्यांची आणि समुद्राच्या प्रवाहांची अचूक माहिती आहे.',
    history: 'These steep terrains were strategically used by Chhatrapati Shivaji Maharaj\'s guerrilla army (Ganimi Kava) for mountain warfare, now transformed into world-class adventure zones.',
    historyMr: 'छत्रपती शिवाजी महाराजांनी आपल्या "गनिमी कावा" युद्धपद्धतीसाठी या खडतर भूगोलाचा वापर केला होता, जो आज जागतिक दर्जाचा साहसी पर्यटनाचा मार्ग बनला आहे.'
  },
  {
    id: 'cultural',
    name: 'Cultural Circuit',
    nameMr: 'पारंपरिक कला आणि संस्कृती सर्किट',
    description: 'Experience the unique festivals, Koli fisherman dances, Warli paintings, Gond folklore, and local folk theatres.',
    descriptionMr: 'महाराष्ट्राचे ढोल-ताशे, कोळी नृत्ये, वारली चित्रकला, गोंड आदिवासी लोककला आणि दशावतार नाटकांचा जिवंत वारसा अनुभवा.',
    destinations: ['shaniwar_wada', 'alibaug', 'ellora'],
    color: 'bg-pink-500',
    accentColor: 'pink',
    geography: 'Spans across the historical heartlands of Maharashtra, from rural heartlands with black soil fields to lively coastal ports.',
    geographyMr: 'महाराष्ट्राच्या ग्रामीण भागातील काळ्या कसदार मातीपासून ते गजबजलेल्या कोळी बंदरांपर्यंत पसरलेला सांस्कृतिक भूप्रदेश.',
    culture: 'The pure essence of Marathi art: Lavani folk dances, Gondhal spiritual songs, Warli tribal wall paintings, and spectacular Dashavatar dramas.',
    cultureMr: 'लावणी नृत्य, गोंधळी भजने, वारली चित्रकला आणि कोकणातील पारंपरिक दशावतार लोकनाट्य अशा मंतरलेल्या लोककलांचा अद्भुत खजिना.',
    history: 'Maharashtra\'s culture has been nurtured by ancient tribal art forms, royal patronage of Peshwas, and a rich legacy of folk artists who kept history alive.',
    historyMr: 'प्राचीन आदिवासी कला, पेशवेकालीन राजाश्रय आणि लोकशाहीर व कलाकारांच्या पिढ्यांनी महाराष्ट्राची ही गौरवशाली लोकसंस्कृती आजही जिवंत ठेवली आहे.'
  },
  {
    id: 'eco_tourism',
    name: 'Eco Tourism Circuit',
    nameMr: 'पर्यावरणपूरक निसर्ग पर्यटन सर्किट',
    description: 'Discover bio-diversity hotspots, green tranquil walks in automobile-free woods, and serene forest eco-resorts.',
    descriptionMr: 'वाहनमुक्त घनदाट जंगलातील शांतता, निसर्गरम्य तलाव आणि अति-संवेदनशील पर्यावरणपूरक निसर्ग सौंदर्यात मन शांत करा.',
    destinations: ['matheran', 'melghat', 'tadoba'],
    color: 'bg-lime-500',
    accentColor: 'lime',
    geography: 'Ultra-sensitive ecological biomes, pristine high-altitude forests (like Matheran), and dense flora sanctuaries with delicate endemic species.',
    geographyMr: 'अति-संवेदनशील पर्यावरण क्षेत्र, मथेरानसारखे प्रदूषणमुक्त उंच पठार आणि दुर्मिळ औषधी वनस्पती व प्राण्यांनी समृद्ध असलेले घनदाट अभयारण्य.',
    culture: 'Centred around strict ecological rules, plastic-free living, organic food sourcing, and honoring nature as a sacred deity.',
    cultureMr: 'प्लास्टिकमुक्त जीवनशैली, जैविक अन्नपदार्थ आणि निसर्गाला "देवराई" मानून त्याचे रक्षण करण्याची पर्यावरणपूरक लोकरूढी.',
    history: 'Pioneered by local activists to preserve ancient forests from rapid urbanization, creating strict vehicle-free zones and eco-sensitive preserves.',
    historyMr: 'शहरीकरणापासून जंगले वाचवण्यासाठी स्थानिक नागरिकांनी उभारलेले लढे, ज्यामुळे मथेरानसारखे संपूर्ण वाहनमुक्त क्षेत्र आणि अभयारण्ये अस्तित्वात आली.'
  }
];

export const STATIC_QUIZZES: Quiz[] = [
  {
    id: 'lonavala_quiz',
    destinationId: 'lonavala',
    xpReward: 50,
    questions: [
      {
        question: "Why is Lonavala's Tiger Point viewpoints also known as Tiger's Leap?",
        options: [
          "Tigers leap across the valley to hunt deer",
          "The shape of the valley resembles a leaping tiger",
          "It was founded by a British explorer named John Tiger",
          "A legendary tiger once leaped off the cliff to escape hunters"
        ],
        correctAnswer: 1,
        explanation: "The viewpoint is called Tiger's Leap because the valley shape looks exactly like a tiger taking a leap into the deep abyss."
      },
      {
        question: "What sweet treat is Lonavala globally famous for?",
        options: [
          "Modak",
          "Puran Poli",
          "Chikki",
          "Pedha"
        ],
        correctAnswer: 2,
        explanation: "Lonavala is world-famous for its 'Chikki', a hard, crunchy candy sweet made of roasted peanuts mixed with melted jaggery."
      }
    ]
  },
  {
    id: 'mahabaleshwar_quiz',
    destinationId: 'mahabaleshwar',
    xpReward: 50,
    questions: [
      {
        question: "Mahabaleshwar accounts for roughly 85% of India's production of which fruit?",
        options: [
          "Alphonso Mango",
          "Strawberry",
          "Oranges",
          "Grapes"
        ],
        correctAnswer: 1,
        explanation: "Mahabaleshwar is officially known as India’s Strawberry Capital, accounting for the vast majority of commercial strawberry production."
      }
    ]
  },
  {
    id: 'ajanta_quiz',
    destinationId: 'ajanta',
    xpReward: 50,
    questions: [
      {
        question: "How were the Ajanta Caves rediscovered in 1819?",
        options: [
          "During an archaeological excavation by the government",
          "By local farmers digging a well",
          "By a British officer, John Smith, hunting a tiger",
          "By Buddhist monks returning to the valley"
        ],
        correctAnswer: 2,
        explanation: "In 1819, John Smith, a British cavalry officer, accidentally spotted the caves while tiger hunting across the Waghora River ravine."
      }
    ]
  },
  {
    id: 'ellora_quiz',
    destinationId: 'ellora',
    xpReward: 50,
    questions: [
      {
        question: "Which cave at Ellora hosts the famous Kailash Temple, the largest rock-cut monolith in the world?",
        options: [
          "Cave 1",
          "Cave 10",
          "Cave 16",
          "Cave 34"
        ],
        correctAnswer: 2,
        explanation: "Cave 16 houses the Kailash Temple, carved top-down out of a single mountain wall over several decades."
      }
    ]
  },
  {
    id: 'tadoba_quiz',
    destinationId: 'tadoba',
    xpReward: 50,
    questions: [
      {
        question: "Who is the local Gond deity 'Taru' after whom Tadoba is named?",
        options: [
          "A legendary giant tiger",
          "A tribal chief who died in an encounter with a tiger",
          "The goddess of the deep forest",
          "The spirit of the Tadoba lake"
        ],
        correctAnswer: 1,
        explanation: "Tadoba is named after Taru, a brave Gond chief who was killed in a legendary duel with a tiger. He is worshipped by the local Gond tribes."
      }
    ]
  }
];

export const CHALLENGES: Challenge[] = [
  {
    id: 'daily_quiz',
    title: 'Daily Trivia Scout',
    titleMr: 'दैनिक ज्ञान शोधक',
    description: 'Complete 1 destination quiz successfully today to test your Maharashtra heritage knowledge.',
    descriptionMr: 'आज महाराष्ट्राच्या वारशाविषयी ज्ञान तपासण्यासाठी यशस्वीरित्या १ क्विझ पूर्ण करा.',
    xpReward: 20,
    progress: 0,
    target: 1,
    type: 'daily',
    isClaimed: false
  },
  {
    id: 'weekly_explorer',
    title: 'Sahyadri Expedition',
    titleMr: 'सह्याद्री मोहीम',
    description: 'Check-in to 2 destinations in the Hill Stations circuit to prove your physical exploration.',
    descriptionMr: 'थंड हवेची ठिकाणे सर्किटमधील कोणत्याही २ ठिकाणी चेक-इन करून प्रवासाचा पुरावा द्या.',
    xpReward: 100,
    progress: 0,
    target: 2,
    type: 'weekly',
    isClaimed: false
  }
];

export const DISTRICTS: District[] = [
  { id: 'pune', name: 'Pune', nameMr: 'पुणे' },
  { id: 'raigad', name: 'Raigad', nameMr: 'रायगड' },
  { id: 'aurangabad', name: 'Chh. Sambhajinagar', nameMr: 'छत्रपती संभाजीनगर' },
  { id: 'chandrapur', name: 'Chandrapur', nameMr: 'चंद्रपूर' },
  { id: 'mumbai', name: 'Mumbai', nameMr: 'मुंबई' },
  { id: 'ratnagiri', name: 'Ratnagiri', nameMr: 'रत्नागिरी' },
  { id: 'sindhudurg', name: 'Sindhudurg', nameMr: 'सिंधुदुर्ग' },
  { id: 'nashik', name: 'Nashik', nameMr: 'नाशिक' },
  { id: 'satara', name: 'Satara', nameMr: 'सातारा' },
  { id: 'nagpur', name: 'Nagpur', nameMr: 'नागपूर' }
];

export const CATEGORIES: Category[] = [
  { id: 'hill_station', name: 'Hill Station', nameMr: 'थंड हवेचे ठिकाण' },
  { id: 'heritage', name: 'Heritage / Historical', nameMr: 'ऐतिहासिक वारसा' },
  { id: 'wildlife', name: 'Wildlife Sanctuary', nameMr: 'वन्यजीव अभयारण्य' },
  { id: 'beach', name: 'Coastal / Beach', nameMr: 'समुद्रकिनारा' },
  { id: 'pilgrimage', name: 'Pilgrimage / Spiritual', nameMr: 'धार्मिक आणि आध्यात्मिक' },
  { id: 'adventure', name: 'Adventure Sport', nameMr: 'साहसी खेळ' }
];

