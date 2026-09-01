import React, { useState, useEffect, useRef } from 'react';
import { Destination, UserProfile } from '../types';
import { Camera, Puzzle, RefreshCw, Download, Image as ImageIcon, Check, Play, User, Sparkles, Trophy, Landmark, HelpCircle, ArrowRight, Video, FileImage, RotateCcw, Eye } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface DestinationInteractiveHubProps {
  destination: Destination;
  profile: UserProfile;
  language: 'en' | 'mr';
  onNavigateToQuiz: (destId: string) => void;
}

type ActivityTab = 'quiz' | 'puzzle' | 'selfie';

export default function DestinationInteractiveHub({
  destination,
  profile,
  language,
  onNavigateToQuiz,
}: DestinationInteractiveHubProps) {
  const [activeTab, setActiveTab] = useState<ActivityTab>('quiz');

  // --- JIGSAW PUZZLE STATE ---
  const [puzzlePieces, setPuzzlePieces] = useState<number[]>([]);
  const [selectedPiece, setSelectedPiece] = useState<number | null>(null);
  const [puzzleMoves, setPuzzleMoves] = useState(0);
  const [puzzleSolved, setPuzzleSolved] = useState(false);
  const [showPuzzlePreview, setShowPuzzlePreview] = useState(false);

  // Initialize/Reset Puzzle
  const initPuzzle = () => {
    // 3x3 grid = 9 pieces (0 to 8)
    const pieces = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    // Shuffle pieces until they are not in perfect order
    let shuffled = [...pieces];
    do {
      shuffled = [...pieces].sort(() => Math.random() - 0.5);
    } while (shuffled.every((val, idx) => val === idx));

    setPuzzlePieces(shuffled);
    setSelectedPiece(null);
    setPuzzleMoves(0);
    setPuzzleSolved(false);
    setShowPuzzlePreview(false);
  };

  useEffect(() => {
    initPuzzle();
  }, [destination.id]);

  const handlePieceClick = (index: number) => {
    if (puzzleSolved) return;

    if (selectedPiece === null) {
      setSelectedPiece(index);
    } else if (selectedPiece === index) {
      setSelectedPiece(null);
    } else {
      // Swap pieces
      const newPieces = [...puzzlePieces];
      const temp = newPieces[selectedPiece];
      newPieces[selectedPiece] = newPieces[index];
      newPieces[index] = temp;

      setPuzzlePieces(newPieces);
      setSelectedPiece(null);
      setPuzzleMoves((prev) => prev + 1);

      // Check if solved
      const isCorrect = newPieces.every((val, idx) => val === idx);
      if (isCorrect) {
        setPuzzleSolved(true);
      }
    }
  };

  // --- SOUVENIR SELFIE STATE ---
  const [selfieImg, setSelfieImg] = useState<string | null>(null);
  const [cameraActive, setCameraActive] = useState(false);
  const [frameLayout, setFrameLayout] = useState<'polaroid' | 'postcard' | 'badge'>('polaroid');
  const [frameColor, setFrameColor] = useState<string>('#E86B21'); // Sunset orange default
  const [greetingText, setGreetingText] = useState<string>('Greetings!');
  const [stickerMotif, setStickerMotif] = useState<string>(destination.stampMotif || '🚩');
  const [showSaveSuccess, setShowSaveSuccess] = useState(false);
  const [cameraError, setCameraError] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Default greeting suggestions based on destination
  useEffect(() => {
    const defaultGreeting = language === 'mr' 
      ? `मी ${destination.nameMr || destination.name} सर केले!` 
      : `Explored ${destination.name}!`;
    setGreetingText(defaultGreeting);
    setStickerMotif(destination.stampMotif || '🚩');
    setSelfieImg(null);
    stopCamera();
  }, [destination.id, language]);

  // Clean up camera stream on unmount
  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  const startCamera = async () => {
    setCameraError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: 'user', width: 480, height: 480 },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
      setCameraActive(true);
    } catch (err: any) {
      console.error("Camera access error:", err);
      setCameraError(
        language === 'mr'
          ? 'कॅमेरा सुरू करता आला नाही. कृपया परवानगी द्या किंवा फोटो अपलोड पर्याय वापरा.'
          : 'Could not access device camera. Please grant permission or use the photo upload option instead.'
      );
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const video = videoRef.current;
      const canvas = document.createElement('canvas');
      canvas.width = 480;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        // Flip horizontally to act as a mirror
        ctx.translate(canvas.width, 0);
        ctx.scale(-1, 1);
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL('image/png');
        setSelfieImg(dataUrl);
        stopCamera();
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setSelfieImg(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const resetSelfie = () => {
    setSelfieImg(null);
    stopCamera();
    setCameraError(null);
  };

  // Compile Card and Download
  const handleDownloadCard = () => {
    const canvas = canvasRef.current || document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 800;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill background with dark slate matching theme
    ctx.fillStyle = '#0B1329';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Set up helper to draw layout
    const drawContent = () => {
      // 1. Draw frame border
      ctx.lineWidth = 16;
      ctx.strokeStyle = frameColor;
      ctx.strokeRect(20, 20, 760, 760);

      // Load selfie image
      const selfieImage = new Image();
      selfieImage.onload = () => {
        // Load destination cover image
        const destImage = new Image();
        destImage.crossOrigin = 'anonymous'; // request CORS access
        
        const onDestLoaded = () => {
          if (frameLayout === 'polaroid') {
            // Layout: Classic Polaroid style
            // Destination photo at the top half
            ctx.drawImage(destImage, 40, 40, 720, 340);
            
            // White divider
            ctx.fillStyle = '#FFFFFF';
            ctx.fillRect(40, 380, 720, 10);

            // User selfie at bottom center inside photo frame
            ctx.save();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 8;
            ctx.strokeRect(220, 410, 360, 280);
            ctx.drawImage(selfieImage, 224, 414, 352, 272);
            ctx.restore();

            // Caption Text
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 28px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText(greetingText, 400, 740);

            // Stamp sticker
            ctx.font = '60px sans-serif';
            ctx.fillText(stickerMotif, 120, 680);
          } else if (frameLayout === 'postcard') {
            // Layout: Postcard Style
            // Destination photo takes full background
            ctx.drawImage(destImage, 40, 40, 720, 720);

            // Semi-transparent overlay for legibility
            ctx.fillStyle = 'rgba(15, 23, 42, 0.45)';
            ctx.fillRect(40, 40, 720, 720);

            // Stamp sticker
            ctx.fillStyle = '#FFFFFF';
            ctx.font = '72px sans-serif';
            ctx.fillText(stickerMotif, 670, 130);

            // User Selfie on bottom-right
            ctx.save();
            ctx.lineWidth = 8;
            ctx.strokeStyle = '#FFFFFF';
            ctx.strokeRect(480, 420, 260, 260);
            ctx.drawImage(selfieImage, 484, 424, 252, 252);
            ctx.restore();

            // Giant title at top-left
            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 36px sans-serif';
            ctx.textAlign = 'left';
            ctx.fillText(destination.name.toUpperCase(), 80, 120);

            // Caption Greeting
            ctx.fillStyle = '#E86B21';
            ctx.font = 'bold 24px sans-serif';
            ctx.fillText(greetingText, 80, 160);

            // Decorative lines
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.moveTo(80, 500);
            ctx.lineTo(440, 500);
            ctx.moveTo(80, 550);
            ctx.lineTo(440, 550);
            ctx.stroke();
          } else {
            // Layout: Explorer Badge
            // Selfie takes full center, destination photo is in a corner stamp
            ctx.drawImage(selfieImage, 40, 40, 720, 720);

            // Corner destination thumbnail as a stamp
            ctx.save();
            ctx.strokeStyle = '#FFFFFF';
            ctx.lineWidth = 6;
            ctx.strokeRect(60, 60, 180, 140);
            ctx.drawImage(destImage, 63, 63, 174, 134);
            ctx.restore();

            // Explored Gold Badge background ribbon
            ctx.fillStyle = '#0F172A';
            ctx.fillRect(40, 640, 720, 120);

            // Text Banner
            ctx.fillStyle = '#FFD700'; // Gold
            ctx.font = 'black 32px sans-serif';
            ctx.textAlign = 'center';
            ctx.fillText("🌟 MAHARASHTRA STATE TRAVELER 🌟", 400, 690);

            ctx.fillStyle = '#FFFFFF';
            ctx.font = 'bold 22px sans-serif';
            ctx.fillText(`${greetingText} • ${destination.district} District`, 400, 725);
          }

          // Trigger File Download
          const fileUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = fileUrl;
          downloadLink.download = `Maharashtra_Travels_${destination.id}_Selfie.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          setShowSaveSuccess(true);
          setTimeout(() => setShowSaveSuccess(false), 3000);
        };

        const onDestFailed = () => {
          // If the image fails to load due to CORS, draw a beautiful placeholder and proceed without crashing
          console.warn("Destination image failed to load with CORS. Drawing solid color fallback.");
          
          // Generate a sunset styled linear gradient
          const gradient = ctx.createLinearGradient(40, 40, 760, 760);
          gradient.addColorStop(0, '#E86B21');
          gradient.addColorStop(1, '#0F172A');
          ctx.fillStyle = gradient;
          ctx.fillRect(40, 40, 720, 720);

          // Draw name of destination large
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 36px sans-serif';
          ctx.textAlign = 'center';
          ctx.fillText(destination.name, 400, 200);
          ctx.fillText("MAHARASHTRA", 400, 150);

          // Now assemble selfie
          ctx.save();
          ctx.strokeStyle = '#FFFFFF';
          ctx.lineWidth = 8;
          ctx.strokeRect(200, 280, 400, 400);
          ctx.drawImage(selfieImage, 204, 284, 392, 392);
          ctx.restore();

          // Greetings
          ctx.fillStyle = '#FFFFFF';
          ctx.font = 'bold 24px sans-serif';
          ctx.fillText(greetingText, 400, 720);
          ctx.fillText(stickerMotif, 400, 755);

          // Trigger File Download
          const fileUrl = canvas.toDataURL('image/png');
          const downloadLink = document.createElement('a');
          downloadLink.href = fileUrl;
          downloadLink.download = `Maharashtra_Travels_${destination.id}_Selfie.png`;
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);

          setShowSaveSuccess(true);
          setTimeout(() => setShowSaveSuccess(false), 3000);
        };

        // Try loading destination image
        destImage.onload = onDestLoaded;
        destImage.onerror = onDestFailed;
        destImage.src = destination.imageUrl;
      };
      selfieImage.src = selfieImg || '';
    };

    drawContent();
  };

  const frameOptions = [
    { id: 'polaroid', label: language === 'mr' ? 'पोलेरॉइड' : 'Polaroid Frame', desc: 'Classic vintage snapshot' },
    { id: 'postcard', label: language === 'mr' ? 'पोस्टकार्ड' : 'Postcard overlay', desc: 'Full-cover holiday letter' },
    { id: 'badge', label: language === 'mr' ? 'प्रमाणपत्र' : 'Explorer Badge', desc: 'State official stamp' }
  ] as const;

  const colorOptions = [
    { name: 'Sunset Orange', value: '#E86B21' },
    { name: 'Ocean Teal', value: '#06B6D4' },
    { name: 'Royal Gold', value: '#EAB308' },
    { name: 'Crimson Red', value: '#EF4444' },
    { name: 'Forest Green', value: '#10B981' },
    { name: 'Midnight Violet', value: '#8B5CF6' }
  ];

  return (
    <div className="bg-slate-900/40 border border-slate-850 rounded-2xl overflow-hidden shadow-md">
      {/* Tab Selectors */}
      <div className="flex bg-slate-950 p-1 border-b border-slate-900 gap-1">
        <button
          onClick={() => setActiveTab('quiz')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
            activeTab === 'quiz'
              ? 'bg-[#E86B21]/15 text-[#E86B21] border border-[#E86B21]/20 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Landmark className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'क्विझ खेळ' : '1. Take Quiz'}</span>
        </button>

        <button
          onClick={() => setActiveTab('puzzle')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
            activeTab === 'puzzle'
              ? 'bg-[#E86B21]/15 text-[#E86B21] border border-[#E86B21]/20 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Puzzle className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'कोडे सोडा' : '2. Photo Puzzle'}</span>
        </button>

        <button
          onClick={() => setActiveTab('selfie')}
          className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition ${
            activeTab === 'selfie'
              ? 'bg-[#E86B21]/15 text-[#E86B21] border border-[#E86B21]/20 shadow-sm'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Camera className="w-3.5 h-3.5" />
          <span>{language === 'mr' ? 'सेल्फी बनवा' : '3. Souvenir Selfie'}</span>
        </button>
      </div>

      {/* Tab Panels */}
      <div className="p-4.5">
        <AnimatePresence mode="wait">
          {/* TAB 1: QUIZ DETAIL PORTAL */}
          {activeTab === 'quiz' && (
            <motion.div
              key="quiz-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              <div className="bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/10 p-4 rounded-xl flex items-start gap-3">
                <div className="p-2 bg-[#E86B21]/10 rounded-lg shrink-0">
                  <Trophy className="w-5 h-5 text-amber-400" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-xs font-black text-white uppercase tracking-wider">
                    {language === 'mr' ? 'ऐतिहासिक व सांस्कृतिक क्विझ' : 'Knowledge & Trivia Challenge'}
                  </h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-relaxed font-medium">
                    {language === 'mr'
                      ? 'या पर्यटन स्थळाविषयी तुमच्या ज्ञानाची परीक्षा घ्या! सर्व प्रश्नांची अचूक उत्तरे द्या आणि तुमच्या डिजिटल पासपोर्टसाठी आकर्षक मोहर/स्टॅम्प मिळवा.'
                      : 'Test your local knowledge with 4 engaging historical questions! Score perfectly to unlock the exclusive stamp and gain massive explorer XP.'}
                  </p>
                </div>
              </div>

              {/* Requirements & Reward Summary */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-950/55 border border-slate-850 p-3 rounded-xl text-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                    {language === 'mr' ? 'बक्षीस' : 'REWARD'}
                  </span>
                  <span className="text-sm font-black text-amber-400 block mt-1">
                    {destination.stampMotif} {language === 'mr' ? 'विशेष स्टॅम्प' : 'Digital Stamp'}
                  </span>
                </div>
                <div className="bg-slate-950/55 border border-slate-850 p-3 rounded-xl text-center">
                  <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest block">
                    {language === 'mr' ? 'अनुभव गुण' : 'COMPLETION BONUS'}
                  </span>
                  <span className="text-sm font-black text-emerald-400 block mt-1">
                    +100 XP
                  </span>
                </div>
              </div>

              <button
                onClick={() => onNavigateToQuiz(destination.id)}
                className="w-full bg-[#E86B21] hover:bg-[#C45512] text-white font-extrabold py-3.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 active:scale-95 transition cursor-pointer shadow-sm uppercase tracking-wider"
              >
                <Landmark className="w-4 h-4" />
                <span>{language === 'mr' ? 'आताच क्विझ खेळा' : 'Play Trivia Quiz Now'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </motion.div>
          )}

          {/* TAB 2: JIGSAW PUZZLE MINI GAME */}
          {activeTab === 'puzzle' && (
            <motion.div
              key="puzzle-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Info Header */}
              <div className="flex justify-between items-center bg-slate-950/50 p-3 rounded-xl border border-slate-850/80">
                <div>
                  <h4 className="text-[11px] font-black text-white uppercase tracking-wider flex items-center gap-1.5">
                    <Puzzle className="w-3.5 h-3.5 text-[#E86B21]" />
                    <span>{language === 'mr' ? 'पर्यटन कोडे' : 'Photo Jigsaw Puzzle'}</span>
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5 font-medium">
                    {language === 'mr' ? 'तुकड्यांवर क्लिक करून अदलाबदल करा व मूळ चित्र जुळवा' : 'Click to select and swap tiles to solve the view'}
                  </p>
                </div>
                
                <div className="text-right shrink-0">
                  <span className="text-[9px] font-black bg-slate-900 border border-slate-800 px-2 py-1 rounded text-slate-300">
                    {language === 'mr' ? `${puzzleMoves} हालचाली` : `${puzzleMoves} Moves`}
                  </span>
                </div>
              </div>

              {/* Puzzle Stage Area */}
              <div className="relative mx-auto max-w-[280px] aspect-square rounded-xl overflow-hidden border-2 border-slate-800 shadow-xl bg-slate-950">
                {!puzzleSolved ? (
                  <div className="grid grid-cols-3 grid-rows-3 h-full w-full gap-0.5">
                    {puzzlePieces.map((pieceVal, idx) => {
                      // Calculate row/col positions for the sliced background position
                      // Column = pieceVal % 3, Row = Math.floor(pieceVal / 3)
                      const col = pieceVal % 3;
                      const row = Math.floor(pieceVal / 3);
                      // Percentage mapping for background-position: 0%, 50%, 100%
                      const posX = col * 50;
                      const posY = row * 50;

                      const isSelected = selectedPiece === idx;

                      return (
                        <div
                          key={idx}
                          onClick={() => handlePieceClick(idx)}
                          style={{
                            backgroundImage: `url(${destination.imageUrl})`,
                            backgroundSize: '300% 300%',
                            backgroundPosition: `${posX}% ${posY}%`,
                          }}
                          className={`w-full h-full cursor-pointer transition-all duration-200 relative group ${
                            isSelected 
                              ? 'ring-4 ring-amber-400 ring-inset scale-[0.96] z-10 shadow-lg brightness-110' 
                              : 'hover:brightness-105 hover:scale-[0.98]'
                          }`}
                        >
                          {/* Sieve Grid Help/Coordinates */}
                          <span className="absolute bottom-1 right-1 text-[8px] font-bold text-white/30 bg-black/45 px-1 rounded">
                            {idx + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 bg-slate-950/90 backdrop-blur-sm z-20 border border-emerald-500/20"
                  >
                    <div className="w-14 h-14 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 mb-3 shadow-inner animate-bounce">
                      <Sparkles className="w-8 h-8" />
                    </div>
                    <h5 className="text-sm font-black text-white uppercase tracking-wider">
                      {language === 'mr' ? 'कोडे यशस्वीरित्या सोडवले!' : 'Excellent, Puzzle Completed!'}
                    </h5>
                    <p className="text-[11px] text-emerald-400 mt-1 font-bold">
                      🏆 +50 XP {language === 'mr' ? 'मिळाले!' : 'Earned!'}
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1.5 max-w-[200px] leading-relaxed">
                      {language === 'mr' 
                        ? `तुम्ही हे चित्र केवळ ${puzzleMoves} हालचालींमध्ये पूर्ण केले.` 
                        : `You reconstituted the destination beautifully in only ${puzzleMoves} moves.`}
                    </p>

                    <button
                      onClick={initPuzzle}
                      className="mt-4 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-200 hover:text-white font-extrabold px-4 py-2 rounded-xl text-[10px] flex items-center gap-1.5 transition active:scale-95 cursor-pointer uppercase tracking-wider"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'पुन्हा खेळा' : 'Play Again'}</span>
                    </button>
                  </motion.div>
                )}

                {/* Show Preview Overlay */}
                {showPuzzlePreview && !puzzleSolved && (
                  <div className="absolute inset-0 z-10 animate-fade-in pointer-events-none">
                    <img src={destination.imageUrl} className="w-full h-full object-cover opacity-85" alt="" />
                    <div className="absolute inset-0 bg-black/35 flex items-center justify-center">
                      <span className="text-[10px] font-black text-white bg-slate-950/80 px-2.5 py-1 rounded-full uppercase tracking-wider border border-slate-800">
                        {language === 'mr' ? 'मूळ चित्र पूर्वदृश्य' : 'Full Image View'}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {/* Action Buttons for Puzzle */}
              {!puzzleSolved && (
                <div className="flex gap-2 justify-center">
                  <button
                    onMouseDown={() => setShowPuzzlePreview(true)}
                    onMouseUp={() => setShowPuzzlePreview(false)}
                    onMouseLeave={() => setShowPuzzlePreview(false)}
                    onTouchStart={() => setShowPuzzlePreview(true)}
                    onTouchEnd={() => setShowPuzzlePreview(false)}
                    className="bg-slate-950/70 border border-slate-850 hover:bg-slate-900 text-slate-300 font-bold px-3 py-2 rounded-xl text-[10px] flex items-center gap-1 transition active:scale-95 select-none cursor-pointer"
                  >
                    <Eye className="w-3.5 h-3.5 text-slate-400" />
                    <span>{language === 'mr' ? 'दाबा व धरा (मूळ चित्र)' : 'Hold to Peek Picture'}</span>
                  </button>

                  <button
                    onClick={initPuzzle}
                    className="bg-slate-950/70 border border-slate-850 hover:bg-slate-900 text-slate-300 font-bold px-3 py-2 rounded-xl text-[10px] flex items-center gap-1 transition active:scale-95 cursor-pointer"
                  >
                    <RefreshCw className="w-3.5 h-3.5 text-slate-400" />
                    <span>{language === 'mr' ? 'पुनर्संरचना करा' : 'Shuffle Board'}</span>
                  </button>
                </div>
              )}
            </motion.div>
          )}

          {/* TAB 3: SOUVENIR SELFIE DESIGN & CARD GENERATION */}
          {activeTab === 'selfie' && (
            <motion.div
              key="selfie-tab"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="space-y-4"
            >
              {/* Capture or Upload State */}
              {!selfieImg ? (
                <div className="space-y-3">
                  <div className="bg-slate-950/30 border border-slate-850 rounded-xl p-4 text-center space-y-3">
                    <div className="mx-auto w-10 h-10 rounded-full bg-[#E86B21]/10 flex items-center justify-center text-[#E86B21] mb-1">
                      <Camera className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-white uppercase tracking-wider">
                        {language === 'mr' ? 'तुमचा सोवेनिर प्रवास कार्ड बनवा' : 'Create Custom Travel Postcard'}
                      </h4>
                      <p className="text-[11px] text-slate-400 mt-1 max-w-sm mx-auto leading-normal font-medium">
                        {language === 'mr'
                          ? 'कॅमेरा वापरून स्वतःचा सेल्फी घ्या किंवा गॅलरीमधून अपलोड करा आणि या पर्यटन स्थळाच्या चित्रासोबत जोडून संस्मरणीय कार्ड बनवा!'
                          : 'Snap a live selfie or upload your profile picture to generate a themed travel postcard. Frame it, apply local stamps, and download as a memory!'}
                      </p>
                    </div>

                    {cameraActive && (
                      <div className="relative mx-auto w-56 aspect-square rounded-xl overflow-hidden border-2 border-slate-800 bg-black mt-2 shadow-inner">
                        <video
                          ref={videoRef}
                          autoPlay
                          playsInline
                          className="w-full h-full object-cover scale-x-[-1]"
                        />
                        <button
                          onClick={capturePhoto}
                          className="absolute bottom-2.5 left-1/2 -translate-x-1/2 bg-[#E86B21] text-white p-2 rounded-full hover:scale-105 active:scale-95 shadow-md transition cursor-pointer"
                        >
                          <Check className="w-5 h-5 font-black" />
                        </button>
                      </div>
                    )}

                    {cameraError && (
                      <p className="text-[10px] text-rose-400 bg-rose-950/20 border border-rose-900/30 px-3 py-1.5 rounded-lg max-w-xs mx-auto leading-relaxed">
                        {cameraError}
                      </p>
                    )}

                    {/* Camera Control Buttons */}
                    <div className="flex justify-center gap-2 flex-wrap pt-1">
                      {!cameraActive ? (
                        <button
                          onClick={startCamera}
                          className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-200 font-extrabold px-3.5 py-2 rounded-xl text-[10px] flex items-center gap-1.5 transition active:scale-[0.97] cursor-pointer uppercase tracking-wider"
                        >
                          <Video className="w-3.5 h-3.5 text-[#E86B21]" />
                          <span>{language === 'mr' ? 'कॅमेरा सुरू करा' : 'Use Live Camera'}</span>
                        </button>
                      ) : (
                        <button
                          onClick={stopCamera}
                          className="bg-rose-950/30 border border-rose-900/30 text-rose-400 font-extrabold px-3.5 py-2 rounded-xl text-[10px] flex items-center gap-1.5 transition active:scale-[0.97] cursor-pointer uppercase tracking-wider"
                        >
                          <span>{language === 'mr' ? 'कॅमेरा थांबवा' : 'Turn Off Camera'}</span>
                        </button>
                      )}

                      {/* File Upload Hidden Input */}
                      <label className="bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-200 font-extrabold px-3.5 py-2 rounded-xl text-[10px] flex items-center gap-1.5 transition active:scale-[0.97] cursor-pointer uppercase tracking-wider">
                        <FileImage className="w-3.5 h-3.5 text-[#E86B21]" />
                        <span>{language === 'mr' ? 'गॅलरीमधून अपलोड' : 'Upload Portrait'}</span>
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleFileUpload}
                          className="hidden"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* On Screen Live Postcard Preview */}
                  <div className="space-y-1.5">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest pl-1 block">
                      {language === 'mr' ? 'कार्डचे थेट स्वरूप' : 'Live Digital Card Preview'}
                    </span>

                    <div 
                      style={{ borderColor: frameColor }}
                      className="mx-auto max-w-[280px] aspect-square rounded-2xl overflow-hidden relative border-4 shadow-2xl transition-all duration-300 flex flex-col"
                    >
                      {/* Polaroid Layout */}
                      {frameLayout === 'polaroid' && (
                        <div className="bg-slate-950 h-full flex flex-col p-2.5">
                          {/* Top Destination Pic */}
                          <div className="h-28 w-full rounded-lg overflow-hidden border border-slate-900 relative">
                            <img src={destination.imageUrl} className="w-full h-full object-cover" alt="" />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 to-transparent p-1">
                              <p className="text-[8px] font-extrabold text-white tracking-wide uppercase text-center">
                                {language === 'mr' ? destination.nameMr : destination.name}
                              </p>
                            </div>
                          </div>

                          {/* White gap bar */}
                          <div className="h-1 bg-slate-800 my-1 rounded" />

                          {/* Center User Selfie */}
                          <div className="flex-1 relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900 flex items-center justify-center">
                            <img src={selfieImg} className="w-full h-full object-cover" alt="Selfie" />
                            <span className="absolute bottom-1 right-1 text-2xl drop-shadow-md animate-pulse">
                              {stickerMotif}
                            </span>
                          </div>

                          {/* Bottom Caption and Stamp */}
                          <div className="mt-1.5 text-center px-1">
                            <p className="text-[10px] font-black text-white tracking-wide truncate">
                              {greetingText}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Postcard Layout */}
                      {frameLayout === 'postcard' && (
                        <div className="w-full h-full relative">
                          {/* Full cover destination pic */}
                          <img src={destination.imageUrl} className="absolute inset-0 w-full h-full object-cover" alt="" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                          {/* Floating user selfie picture stamp */}
                          <div className="absolute bottom-2.5 right-2.5 w-18 h-18 rounded-lg overflow-hidden border-2 border-white shadow-xl rotate-3">
                            <img src={selfieImg} className="w-full h-full object-cover" alt="Selfie" />
                          </div>

                          {/* Stamp decoration */}
                          <div className="absolute top-2.5 right-2.5 text-2xl drop-shadow-md">
                            {stickerMotif}
                          </div>

                          {/* Texts */}
                          <div className="absolute bottom-3 left-3 right-22">
                            <h5 className="text-[11px] font-black text-white tracking-widest uppercase truncate leading-none">
                              {language === 'mr' ? destination.nameMr : destination.name}
                            </h5>
                            <p className="text-[9px] font-bold text-[#E86B21] mt-0.5 leading-tight line-clamp-2 italic">
                              {greetingText}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Badge Layout */}
                      {frameLayout === 'badge' && (
                        <div className="w-full h-full relative flex flex-col justify-end">
                          {/* Full cover user portrait */}
                          <img src={selfieImg} className="absolute inset-0 w-full h-full object-cover" alt="Selfie" />
                          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                          {/* Floating circular dest logo */}
                          <div className="absolute top-2.5 left-2.5 w-12 h-12 rounded-full overflow-hidden border border-white shadow-md">
                            <img src={destination.imageUrl} className="w-full h-full object-cover" alt="" />
                          </div>

                          {/* Floating Stamp */}
                          <div className="absolute top-2 right-2 text-2xl bg-black/60 p-1 rounded-full w-9 h-9 flex items-center justify-center border border-slate-800">
                            {stickerMotif}
                          </div>

                          {/* Golden exploration badge banner at the bottom */}
                          <div className="p-2.5 bg-slate-950/90 text-center border-t border-slate-850/60 z-10">
                            <span className="text-[8px] font-black text-amber-400 tracking-widest uppercase block mb-0.5">
                              🌟 MAHARASHTRA TRAVELS 🌟
                            </span>
                            <p className="text-[10px] font-extrabold text-white truncate leading-snug">
                              {greetingText}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Settings Configuration Area */}
                  <div className="bg-slate-950/50 rounded-xl p-3 border border-slate-850 space-y-3">
                    {/* Frame Selector */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-0.5">
                        {language === 'mr' ? '१. डिझाईन किंवा फ्रेम निवडा' : '1. Select Postcard Template'}
                      </label>
                      <div className="grid grid-cols-3 gap-1.5">
                        {frameOptions.map((opt) => (
                          <button
                            key={opt.id}
                            onClick={() => setFrameLayout(opt.id)}
                            className={`p-2 rounded-lg border text-center transition ${
                              frameLayout === opt.id
                                ? 'bg-[#E86B21]/15 text-[#E86B21] border-[#E86B21]/50'
                                : 'bg-slate-900/60 text-slate-400 border-slate-850 hover:bg-slate-900 hover:text-slate-200'
                            }`}
                          >
                            <span className="text-[10px] font-black block leading-none">{opt.label}</span>
                            <span className="text-[7px] text-slate-500 block mt-1 font-semibold leading-tight line-clamp-1">
                              {opt.desc}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Accent Color Picker */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-0.5">
                        {language === 'mr' ? '२. फ्रेमचा रंग निवडा' : '2. Frame Accent Color'}
                      </label>
                      <div className="flex gap-2 flex-wrap">
                        {colorOptions.map((col) => (
                          <button
                            key={col.value}
                            onClick={() => setFrameColor(col.value)}
                            style={{ backgroundColor: col.value }}
                            className={`w-6 h-6 rounded-full border-2 transition transform active:scale-90 ${
                              frameColor === col.value ? 'border-white scale-110 shadow-lg ring-1 ring-slate-400' : 'border-transparent hover:scale-105'
                            }`}
                            title={col.name}
                          />
                        ))}
                      </div>
                    </div>

                    {/* Message Customization */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-0.5">
                        {language === 'mr' ? '३. संदेश संपादित करा' : '3. Edit Greetings Text'}
                      </label>
                      <input
                        type="text"
                        value={greetingText}
                        onChange={(e) => setGreetingText(e.target.value)}
                        maxLength={40}
                        className="w-full bg-slate-950 border border-slate-850 hover:border-slate-800 text-xs text-white rounded-lg px-2.5 py-1.5 focus:outline-none focus:border-[#E86B21]/60 font-semibold"
                        placeholder="Type greetings message..."
                      />
                    </div>

                    {/* Sticker/Icon Customizer */}
                    <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest block pl-0.5">
                        {language === 'mr' ? '४. स्टॅम्प चिन्ह निवडा' : '4. Pick Postmark Stamp Symbol'}
                      </label>
                      <div className="flex gap-2.5 text-base bg-slate-900/60 p-1.5 rounded-lg border border-slate-850 justify-between">
                        {['🚩', '🏰', '🏔️', '🐚', '🛕', '🐯', '🍇', '🌊'].map((sticker) => (
                          <button
                            key={sticker}
                            onClick={() => setStickerMotif(sticker)}
                            className={`w-7 h-7 flex items-center justify-center rounded transition transform active:scale-90 ${
                              stickerMotif === sticker ? 'bg-[#E86B21]/20 border border-[#E86B21]/50 text-xl' : 'hover:bg-slate-950 hover:scale-105'
                            }`}
                          >
                            {sticker}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Actions for Selfie */}
                  <div className="flex gap-2">
                    <button
                      onClick={resetSelfie}
                      className="flex-1 bg-slate-900 border border-slate-800 hover:bg-slate-850 text-slate-350 hover:text-white font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'नवीन फोटो घ्या' : 'Retake / Reset'}</span>
                    </button>

                    <button
                      onClick={handleDownloadCard}
                      className="flex-[2] bg-[#E86B21] hover:bg-[#C45512] text-white font-extrabold py-3 rounded-xl text-xs flex items-center justify-center gap-1.5 active:scale-95 transition cursor-pointer shadow-sm uppercase tracking-wider"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'mr' ? 'गॅलरीमध्ये सेव्ह करा' : 'Download Postcard'}</span>
                    </button>
                  </div>

                  {/* Success notification */}
                  <AnimatePresence>
                    {showSaveSuccess && (
                      <motion.p
                        initial={{ opacity: 0, y: 5 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -5 }}
                        className="text-[10px] text-center text-emerald-400 font-bold bg-emerald-950/20 border border-emerald-900/30 p-2 rounded-lg"
                      >
                        ✅ {language === 'mr' ? 'प्रवास सोवेनिर यशस्वीरित्या डाऊनलोड झाला!' : 'Souvenir card compiled and downloaded successfully!'}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Invisible Canvas for programmatical postcard rendering */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  );
}
