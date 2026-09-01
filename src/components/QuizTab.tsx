import React, { useState, useEffect } from 'react';
import { Destination, QuizQuestion, UserProfile } from '../types';
import { DESTINATIONS, STATIC_QUIZZES } from '../data';
import { Trophy, HelpCircle, ArrowLeft, ArrowRight, RefreshCw, CheckCircle, AlertCircle, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface QuizTabProps {
  profile: UserProfile;
  language: 'en' | 'mr';
  onQuizSuccess: (xpEarned: number) => void;
  selectedDestinationId: string | null;
  destinations?: Destination[];
}

export default function QuizTab({ profile, language, onQuizSuccess, selectedDestinationId, destinations }: QuizTabProps) {
  const destinationsList = destinations || DESTINATIONS;

  const [selectedDest, setSelectedDest] = useState<Destination | null>(
    selectedDestinationId ? (destinationsList.find(d => d.id === selectedDestinationId) || null) : null
  );

  const [quizQuestions, setQuizQuestions] = useState<QuizQuestion[]>([]);
  const [isQuizLoading, setIsQuizLoading] = useState(false);

  // Active quiz gameplay states
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState<number>(-1);
  const [selectedAnswerIdx, setSelectedAnswerIdx] = useState<number | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);

  // Timed quiz timer
  const [timeLeft, setTimeLeft] = useState(20);
  const [timerInterval, setTimerInterval] = useState<NodeJS.Timeout | null>(null);

  // Load static quiz
  const handleStartStaticQuiz = () => {
    if (!selectedDest) return;
    const staticQuiz = STATIC_QUIZZES.find(q => q.destinationId === selectedDest.id);
    if (staticQuiz) {
      setQuizQuestions(staticQuiz.questions);
      startQuiz(staticQuiz.questions);
    } else {
      // Fallback if no static quiz exists for this specific destination
      const genericQuestions = STATIC_QUIZZES[0].questions; // default to first
      setQuizQuestions(genericQuestions);
      startQuiz(genericQuestions);
    }
  };

  const startQuiz = (questions: QuizQuestion[]) => {
    setCurrentQuestionIdx(0);
    setSelectedAnswerIdx(null);
    setIsAnswerSubmitted(false);
    setScore(0);
    setQuizFinished(false);
    setTimeLeft(20);
  };

  // Handle Question Countdown Timer (M07 Timed Quiz Mode)
  useEffect(() => {
    if (currentQuestionIdx >= 0 && !quizFinished && !isAnswerSubmitted) {
      const interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Auto mark incorrect on timeout (UC-03)
            clearInterval(interval);
            setIsAnswerSubmitted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [currentQuestionIdx, quizFinished, isAnswerSubmitted]);

  const handleSelectOption = (idx: number) => {
    if (isAnswerSubmitted) return;
    setSelectedAnswerIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedAnswerIdx === null || isAnswerSubmitted) return;
    setIsAnswerSubmitted(true);

    const isCorrect = selectedAnswerIdx === quizQuestions[currentQuestionIdx].correctAnswer;
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNextQuestion = () => {
    setIsAnswerSubmitted(false);
    setSelectedAnswerIdx(null);
    setTimeLeft(20);

    if (currentQuestionIdx < quizQuestions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    } else {
      // Quiz finished
      setQuizFinished(true);
      const passThreshold = Math.ceil(quizQuestions.length * 0.7);
      const isPass = score >= passThreshold;
      if (isPass) {
        onQuizSuccess(50); // Earn 50 XP
      }
    }
  };

  const handleExitQuiz = () => {
    setCurrentQuestionIdx(-1);
    setQuizFinished(false);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-transparent text-slate-100 overflow-hidden relative">
      {/* 1. Destination Selection Screen */}
      {currentQuestionIdx === -1 && (
        <div className="flex-1 flex flex-col justify-between h-full p-4 overflow-y-auto">
          <div className="space-y-4">
            <h2 className="text-lg font-bold text-white mb-2">
              {language === 'mr' ? 'ऐतिहासिक आणि वारसा खेळ' : 'Heritage Quizzes'}
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              {language === 'mr' ? 'महाराष्ट्राच्या सुंदर किल्ल्यांबद्दल, विहारांबद्दल आणि समृद्ध वन्यजीवांबद्दलच्या ज्ञानाची परीक्षा घ्या!' : 'Choose a destination from our circuits to unlock special knowledge-games. Completing a quiz earns XP to level up!'}
            </p>

            {/* Destination Selection dropdown */}
            <div className="space-y-1.5">
              <label className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                {language === 'mr' ? 'पर्यटन स्थळ निवडा' : 'Select Destination'}
              </label>
              <select
                value={selectedDest?.id || ''}
                onChange={(e) => {
                  const d = destinationsList.find(dest => dest.id === e.target.value);
                  setSelectedDest(d || null);
                }}
                className="w-full bg-slate-800 border border-slate-700/60 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-500"
              >
                <option value="">{language === 'mr' ? '-- निवडा --' : '-- Choose destination --'}</option>
                {destinationsList.map(dest => (
                  <option key={dest.id} value={dest.id} className="bg-slate-900 text-slate-100">
                    {language === 'mr' ? dest.nameMr : dest.name}
                  </option>
                ))}
              </select>
            </div>

            {selectedDest && (
              <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-2xl space-y-4">
                <div className="flex gap-3">
                  <img src={selectedDest.imageUrl} className="w-14 h-14 rounded-xl object-cover" alt="" />
                  <div>
                    <h4 className="text-xs font-bold text-white">
                      {language === 'mr' ? selectedDest.nameMr : selectedDest.name}
                    </h4>
                    <p className="text-[10px] text-slate-400 mt-1">
                      {selectedDest.district} District
                    </p>
                  </div>
                </div>

                <div className="mt-2 pt-2 border-t border-slate-800/80">
                  <button
                    onClick={handleStartStaticQuiz}
                    className="w-full bg-amber-500 hover:bg-amber-600 text-slate-950 py-2.5 px-3 rounded-xl text-xs font-extrabold transition active:scale-95 flex items-center justify-center gap-1.5 shadow-md shadow-amber-950/10 cursor-pointer"
                  >
                    <Trophy className="w-3.5 h-3.5" />
                    <span>{language === 'mr' ? 'क्विझ सुरू करा' : 'Start Quiz'}</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Banner of Quiz rules */}
          <div className="p-3 bg-slate-950/30 border border-slate-800/80 rounded-xl flex gap-3.5 items-center">
            <Trophy className="w-8 h-8 text-amber-500" />
            <div className="text-[10px] text-slate-400 leading-snug">
              <strong className="text-white block mb-0.5">Rules & Verification:</strong>
              Each quiz has a 20-second timer per question. You must get at least 70% of the questions correct to pass and claim XP rewards.
            </div>
          </div>
        </div>
      )}

      {/* 2. Loading State */}
      {isQuizLoading && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-6 h-full">
          <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-full mb-6">
            <Sparkles className="w-10 h-10 text-amber-400 animate-pulse" />
          </div>
          <h3 className="text-base font-bold text-white mb-2">Generating AI Quiz</h3>
          <p className="text-xs text-slate-400 max-w-[200px] leading-relaxed">
            Gemini is reading historical records of {selectedDest?.name} to write custom quiz questions for you...
          </p>
          <div className="w-24 h-1 bg-slate-800 rounded-full overflow-hidden mt-6">
            <div className="h-full bg-amber-500 animate-pulse w-2/3"></div>
          </div>
        </div>
      )}

      {/* 3. Quiz Gameplay Screen */}
      {currentQuestionIdx >= 0 && !quizFinished && !isQuizLoading && (
        <div className="flex-1 flex flex-col justify-between h-full p-4 overflow-y-auto">
          {/* Quiz Header Progress & Timer */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <button onClick={handleExitQuiz} className="p-1.5 rounded-full bg-slate-800/80 text-slate-400 hover:text-white">
                <ArrowLeft className="w-3.5 h-3.5" />
              </button>
              <div className="text-center">
                <span className="text-xs font-bold text-slate-300">
                  Question {currentQuestionIdx + 1}/{quizQuestions.length}
                </span>
              </div>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${timeLeft <= 5 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'bg-slate-800 text-slate-300'}`}>
                {timeLeft}
              </div>
            </div>

            {/* Time progress bar */}
            <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden mb-5">
              <div 
                className={`h-full transition-all duration-1000 ${timeLeft <= 5 ? 'bg-rose-500' : 'bg-amber-500'}`} 
                style={{ width: `${(timeLeft / 20) * 100}%` }}
              />
            </div>

            {/* Question Text */}
            <h3 className="text-sm font-bold text-white leading-relaxed mb-6">
              {quizQuestions[currentQuestionIdx].question}
            </h3>

            {/* Options */}
            <div className="space-y-2.5">
              {quizQuestions[currentQuestionIdx].options.map((option, idx) => {
                const isSelected = selectedAnswerIdx === idx;
                const isCorrectAnswer = quizQuestions[currentQuestionIdx].correctAnswer === idx;
                
                let optionStyle = "bg-slate-800/40 border-slate-700/60 text-slate-300";
                if (isSelected && !isAnswerSubmitted) {
                  optionStyle = "bg-amber-500/10 border-amber-500 text-amber-400 font-semibold";
                } else if (isAnswerSubmitted) {
                  if (isCorrectAnswer) {
                    optionStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-400 font-semibold";
                  } else if (isSelected) {
                    optionStyle = "bg-rose-500/10 border-rose-500 text-rose-400 font-semibold";
                  } else {
                    optionStyle = "bg-slate-800/20 border-slate-800 text-slate-600";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-3.5 rounded-xl border text-xs leading-normal transition flex justify-between items-center ${optionStyle}`}
                  >
                    <span>{option}</span>
                    {isAnswerSubmitted && isCorrectAnswer && (
                      <span className="text-emerald-400 text-xs">✓</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Explanation & Action button */}
          <div className="mt-6 space-y-3">
            {isAnswerSubmitted && (
              <div className="p-3 bg-slate-950/40 border border-slate-800/80 rounded-xl text-[10px] text-slate-300 leading-relaxed flex gap-2">
                {selectedAnswerIdx === quizQuestions[currentQuestionIdx].correctAnswer ? (
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <div>
                  <strong className="text-white block mb-0.5">
                    {selectedAnswerIdx === quizQuestions[currentQuestionIdx].correctAnswer ? 'Correct!' : 'Incorrect / Timeout'}
                  </strong>
                  {quizQuestions[currentQuestionIdx].explanation}
                </div>
              </div>
            )}

            {!isAnswerSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedAnswerIdx === null}
                className="w-full bg-amber-500 text-slate-950 disabled:bg-slate-800 disabled:text-slate-500 font-bold py-3 rounded-xl text-xs active:scale-95 transition"
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNextQuestion}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-slate-950 font-bold py-3 rounded-xl text-xs active:scale-95 transition flex items-center justify-center gap-1"
              >
                <span>{currentQuestionIdx === quizQuestions.length - 1 ? 'Finish Quiz' : 'Next Question'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      )}

      {/* 4. Quiz Results Screen */}
      {quizFinished && (
        <div className="flex-1 flex flex-col justify-between h-full p-4 text-center overflow-y-auto">
          <div className="my-auto space-y-6">
            <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-2">
              <Trophy className="w-10 h-10 text-amber-500" />
            </div>

            <div>
              <h3 className="text-lg font-bold text-white mb-2">Quiz Finished!</h3>
              <p className="text-xs text-slate-300">
                You scored: <strong className="text-amber-400">{score}/{quizQuestions.length}</strong> questions correct.
              </p>
            </div>

            {/* Pass/Fail message, matching UC-03 */}
            {score >= Math.ceil(quizQuestions.length * 0.7) ? (
              <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-xl max-w-[280px] mx-auto space-y-1">
                <h4 className="text-xs font-bold text-emerald-400">Congratulations! You Passed!</h4>
                <p className="text-[10px] text-slate-300 leading-snug">
                  You successfully met the pass threshold. You earned <strong className="text-amber-400">+50 XP</strong>!
                </p>
              </div>
            ) : (
              <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl max-w-[280px] mx-auto space-y-1">
                <h4 className="text-xs font-bold text-rose-400">Quiz Failed</h4>
                <p className="text-[10px] text-slate-300 leading-snug">
                  You need at least 70% correct answers to pass. Try again to claim your experience rewards!
                </p>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-2 mt-6">
            <button
              onClick={() => startQuiz(quizQuestions)}
              className="bg-slate-800 hover:bg-slate-750 text-slate-200 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 active:scale-95 border border-slate-700/60"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Retry</span>
            </button>
            <button
              onClick={handleExitQuiz}
              className="bg-amber-500 text-slate-950 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-1 active:scale-95 shadow-md shadow-amber-950/10"
            >
              <span>Back to Selection</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
