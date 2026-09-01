import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";
import fs from "fs";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Durable File-Based JSON State Persistence Store for Cross-Device / Cross-Browser Syncing
const PROFILES_FILE = path.join(process.cwd(), "profiles_db.json");
const TRAVEL_DATA_FILE = path.join(process.cwd(), "travel_data_db.json");

import { DESTINATIONS, CIRCUITS, DISTRICTS, CATEGORIES } from "./src/data";

function readTravelDataFromDisk() {
  try {
    if (fs.existsSync(TRAVEL_DATA_FILE)) {
      const data = fs.readFileSync(TRAVEL_DATA_FILE, "utf-8");
      const parsed = JSON.parse(data || "{}");
      if (!parsed.destinations) parsed.destinations = DESTINATIONS;
      if (!parsed.circuits) parsed.circuits = CIRCUITS;
      if (!parsed.districts) parsed.districts = DISTRICTS;
      if (!parsed.categories) parsed.categories = CATEGORIES;
      return parsed;
    } else {
      const initial = { destinations: DESTINATIONS, circuits: CIRCUITS, districts: DISTRICTS, categories: CATEGORIES };
      fs.writeFileSync(TRAVEL_DATA_FILE, JSON.stringify(initial, null, 2), "utf-8");
      return initial;
    }
  } catch (err) {
    console.error("Error reading travel data from disk:", err);
  }
  return { destinations: DESTINATIONS, circuits: CIRCUITS, districts: DISTRICTS, categories: CATEGORIES };
}

function writeTravelDataToDisk(data: any) {
  try {
    fs.writeFileSync(TRAVEL_DATA_FILE, JSON.stringify(data, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing travel data to disk:", err);
  }
}

const INITIAL_PROFILES = {
  "9876543210": {
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
  "9123456789": {
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
  "8888777766": {
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
};

function readProfilesFromDisk(): Record<string, any> {
  try {
    if (fs.existsSync(PROFILES_FILE)) {
      const data = fs.readFileSync(PROFILES_FILE, "utf-8");
      return JSON.parse(data || "{}");
    } else {
      fs.writeFileSync(PROFILES_FILE, JSON.stringify(INITIAL_PROFILES, null, 2), "utf-8");
      return INITIAL_PROFILES;
    }
  } catch (err) {
    console.error("Error reading profiles from disk:", err);
  }
  return {};
}

function writeProfilesToDisk(profiles: Record<string, any>) {
  try {
    fs.writeFileSync(PROFILES_FILE, JSON.stringify(profiles, null, 2), "utf-8");
  } catch (err) {
    console.error("Error writing profiles to disk:", err);
  }
}

// Lazy initialization of Gemini client
let ai: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "MY_GEMINI_API_KEY") {
    console.warn("GEMINI_API_KEY environment variable is not defined or is default placeholder.");
    return null;
  }
  if (!ai) {
    ai = new GoogleGenAI({
      apiKey,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return ai;
}

// API Routes FIRST

// 1. Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", geminiActive: !!process.env.GEMINI_API_KEY });
});

// Profile database sync routes for cross-browser, cross-device support
app.get("/api/profiles", (req, res) => {
  const profiles = readProfilesFromDisk();
  res.json({ success: true, profiles: Object.values(profiles) });
});

app.get("/api/profile/:mobile", (req, res) => {
  const { mobile } = req.params;
  const profiles = readProfilesFromDisk();
  const profile = profiles[mobile];
  if (profile) {
    res.json({ success: true, profile });
  } else {
    res.status(404).json({ success: false, message: "Passport profile not found" });
  }
});

app.post("/api/profile/save", (req, res) => {
  const profile = req.body;
  if (!profile || !profile.mobile) {
    return res.status(400).json({ success: false, message: "Invalid profile data or mobile missing" });
  }
  const profiles = readProfilesFromDisk();
  profiles[profile.mobile] = profile;
  writeProfilesToDisk(profiles);
  res.json({ success: true, message: "Profile synchronized with database" });
});

// Travel Data CRUD Routes
app.get("/api/travel-data", (req, res) => {
  const data = readTravelDataFromDisk();
  res.json({ success: true, ...data });
});

app.post("/api/travel-data/save", (req, res) => {
  const { destinations, circuits, districts, categories } = req.body;
  if (!destinations || !circuits) {
    return res.status(400).json({ success: false, message: "Invalid travel data structure" });
  }
  const current = readTravelDataFromDisk();
  const newData = {
    destinations,
    circuits,
    districts: districts || current.districts || DISTRICTS,
    categories: categories || current.categories || CATEGORIES
  };
  writeTravelDataToDisk(newData);
  res.json({ success: true, message: "Travel data synchronized successfully" });
});

// 2. AI Travel Guide Chat Route
app.post("/api/gemini/chat", async (req, res) => {
  const { message, destinationName, chatHistory, language } = req.body;
  const gemini = getGeminiClient();

  if (!gemini) {
    // Graceful fallback with beautiful local simulated guide response
    const mockResponsesEn: Record<string, string> = {
      lonavala: "Hello explorer! Welcome to Lonavala's Tiger Point. Since your API key is not connected yet, I'm running in offline mode. Tiger Point offers jaw-dropping valley views, and during monsoon, the waterfalls are spectacular. Don't forget to try the hot corn bhutta and famous peanut chikki!",
      mahabaleshwar: "Welcome to Mahabaleshwar! Mapro Garden is absolute heaven for strawberry lovers. If you visit in winter or early spring, you can see strawberries being picked fresh. Ask me anything about the local viewpoints!",
      default: "Welcome, fellow traveller! I am your Maharashtra Tourism AI Guide. Feel free to explore our Circuits, take local quizzes, or perform a GPS check-in to stamp your Digital Passport!"
    };
    const mockResponsesMr: Record<string, string> = {
      lonavala: "नमस्कार पर्यटका! लोणावळ्याच्या वाघ पॉईंटवर तुमचे स्वागत आहे. टायगर पॉईंटवरून दरीचे विहंगम दृश्य दिसते आणि पावसाळ्यात येथील धबधबे पाहण्यासारखे असतात. गरम मक्याचे कणीस आणि चिक्की नक्की खा!",
      mahabaleshwar: "महाबळेश्वरमध्ये तुमचे स्वागत आहे! माप्रो गार्डन हे स्ट्रॉबेरी प्रेमींसाठी स्वर्ग आहे. हिवाळ्यात ताजी स्ट्रॉबेरी काढताना पाहता येते. येथील इतर प्रेक्षणीय स्थळांबद्दल मला काहीही विचारा!",
      default: "नमस्कार! मी तुमचा महाराष्ट्र पर्यटन एआय मार्गदर्शक आहे. आमच्या विविध सर्किट्सचा शोध घ्या, क्विझ सोडवा आणि डिजिटल पासपोर्ट स्टॅम्प करण्यासाठी जीपीएस चेक-इन करा!"
    };

    const destKey = destinationName ? destinationName.toLowerCase() : "default";
    const guideName = language === 'mr' ? destKey : destKey;
    const responseText = language === 'mr' 
      ? (mockResponsesMr[destKey] || mockResponsesMr.default)
      : (mockResponsesEn[destKey] || mockResponsesEn.default);

    return res.json({ text: responseText, isOffline: true });
  }

  try {
    const systemPromptEn = `You are a friendly, highly knowledgeable official AI Tour Guide for the Maharashtra Tourism Department.
You are assisting a tourist visiting: "${destinationName || 'Maharashtra'}".
Keep your answers brief, engaging, and highly descriptive. Mention historical significance, cultural context, local food specialties, and travel tips.
Answer strictly in English.`;

    const systemPromptMr = `तुम्ही महाराष्ट्र पर्यटन विभागाचे अधिकृत, अत्यंत माहितीगार आणि स्नेही एआय टूर मार्गदर्शक (AI Tour Guide) आहात.
तुम्ही सध्या "${destinationName || 'महाराष्ट्र'}" या ठिकाणी भेट देणाऱ्या पर्यटकाला मदत करत आहात.
तुमची उत्तरे थोडक्यात, आकर्षक आणि रंजक ठेवा. ऐतिहासिक महत्त्व, स्थानिक खाद्यपदार्थ आणि प्रवासाच्या टिप्स सांगा.
तुमचे उत्तर पूर्णपणे मराठीत (Devanagari script) असावे.`;

    const chatInput = [
      ...(chatHistory || []).map((h: any) => ({
        role: h.role === 'user' ? 'user' : 'model',
        parts: [{ text: h.text }]
      })),
      { role: 'user', parts: [{ text: message }] }
    ];

    const contents = chatInput.map(item => ({
      role: item.role,
      parts: item.parts
    }));

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents,
      config: {
        systemInstruction: language === 'mr' ? systemPromptMr : systemPromptEn,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text || "I'm having a bit of trouble understanding, could you try again?", isOffline: false });
  } catch (error: any) {
    console.error("Gemini Chat Error:", error);
    res.status(500).json({ error: error.message || "Failed to contact AI Guide." });
  }
});

// 3. AI Quiz Generation Route
app.post("/api/gemini/quiz", async (req, res) => {
  const { destinationName, language } = req.body;
  const gemini = getGeminiClient();

  if (!gemini) {
    // Return local fallback quiz questions if no API key is active
    const fallbackQuizzes: Record<string, any[]> = {
      lonavala: [
        {
          question: language === 'mr' ? "लोणावळ्यातील कोणत्या घाटात ऐतिहासिकदृष्ट्या मोठे युद्ध झाले होते?" : "Which famous ghat is located near Lonavala?",
          options: language === 'mr' ? ["बोर घाट", "कसारा घाट", "ताम्हिणी घाट", "आंबा घाट"] : ["Bhor Ghat", "Kasara Ghat", "Tamhini Ghat", "Amba Ghat"],
          correctAnswer: 0,
          explanation: language === 'mr' ? "बोर घाट (खंडाळा घाट) हा मुंबई आणि पुणे दरम्यानचा ऐतिहासिक आणि मोक्याचा डोंगराळ मार्ग आहे." : "Bhor Ghat connects Pune and Mumbai and is historically one of the most vital trade routes."
        }
      ],
      mahabaleshwar: [
        {
          question: language === 'mr' ? "महाबळेश्वरमधून कोणत्या प्रसिद्ध नदीचा उगम होतो?" : "Which famous major river originates from Mahabaleshwar?",
          options: language === 'mr' ? ["गोदावरी", "कृष्णा", "तापी", "भीमा"] : ["Godavari", "Krishna", "Tapi", "Bhima"],
          correctAnswer: 1,
          explanation: language === 'mr' ? "कृष्णा नदीचा उगम महाबळेश्वरमधील पंचगंगा मंदिरातून होतो." : "The Krishna River originates at Mahabaleshwar in Maharashtra's Sahyadri hills."
        }
      ],
      default: [
        {
          question: language === 'mr' ? "महाराष्ट्राची अधिकृत राजधानी कोणती आहे?" : "What is the capital city of Maharashtra?",
          options: language === 'mr' ? ["पुणे", "मुंबई", "नागपूर", "नाशिक"] : ["Pune", "Mumbai", "Nagpur", "Nashik"],
          correctAnswer: 1,
          explanation: language === 'mr' ? "मुंबई ही महाराष्ट्र राज्याची राजधानी असून ती देशाची आर्थिक राजधानी देखील आहे." : "Mumbai is the official capital city of Maharashtra and the financial center of India."
        }
      ]
    };

    const destKey = destinationName ? destinationName.toLowerCase() : "default";
    const questions = fallbackQuizzes[destKey] || fallbackQuizzes.default;
    return res.json({ questions, isOffline: true });
  }

  try {
    const promptEn = `Generate exactly 3 multiple choice questions for a tourism quiz about "${destinationName}" in Maharashtra, India.
Make them interesting, covering historical significance, geography, or special local foods.
Each question must have exactly 4 choices and exactly 1 correct answer (specified as index 0-3 in the options array).
Return in English.`;

    const promptMr = `महाराष्ट्रातील "${destinationName}" या पर्यटन स्थळाबद्दल अचूक ३ बहुपर्यायी प्रश्न (MCQs) तयार करा.
प्रश्न मनोरंजक असावेत, ज्यामध्ये इतिहास, भूगोल किंवा स्थानिक खाद्य वैशिष्ट्ये कव्हर केली जातील.
प्रत्येक प्रश्नाला अचूक ४ पर्याय असावेत आणि बरोबर उत्तर 'options' ॲरेमधील ० ते ३ इंडेक्स दरम्यान असावे.
तुमचे प्रश्न, पर्याय आणि स्पष्टीकरण पूर्णपणे मराठीत (Devanagari script) असावे.`;

    const response = await gemini.models.generateContent({
      model: "gemini-3.5-flash",
      contents: language === 'mr' ? promptMr : promptEn,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            questions: {
              type: Type.ARRAY,
              description: "Array of quiz questions",
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING, description: "The quiz question text." },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: "Exactly four multiple-choice options."
                  },
                  correctAnswer: {
                    type: Type.INTEGER,
                    description: "Index of the correct answer (0, 1, 2, or 3)."
                  },
                  explanation: {
                    type: Type.STRING,
                    description: "An educational explanation of the correct answer."
                  }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["questions"]
        }
      }
    });

    if (response.text) {
      const result = JSON.parse(response.text);
      res.json({ questions: result.questions, isOffline: false });
    } else {
      throw new Error("Empty response from Gemini.");
    }
  } catch (error: any) {
    console.error("Gemini Quiz Error:", error);
    res.status(500).json({ error: error.message || "Failed to generate dynamic quiz." });
  }
});

// Vite / static file serving
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
