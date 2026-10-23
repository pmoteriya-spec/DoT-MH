import React, { useState } from 'react';
import { motion } from 'motion/react';
import { X, Star, CheckCircle, Sparkles, MessageSquare, ShieldCheck } from 'lucide-react';
import { Review } from '../types';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceId: string;
  serviceTitle: string;
  userName: string;
  onReviewSubmitted: (newReview: Review) => void;
}

const RATING_LABELS = ['Select a rating', 'Poor experience', 'Fair experience', 'Good service', 'Very good experience', 'Outstanding & exceptional!'];
const POPULAR_TAGS = ['Safe & Punctual', 'Expert Scholar', 'Family Friendly', 'Thrilling Adventure', 'Authentic Heritage', 'Well Organised', 'Eco-Conscious'];

export default function ReviewModal({
  isOpen,
  onClose,
  serviceId,
  serviceTitle,
  userName,
  onReviewSubmitted
}: ReviewModalProps) {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [selectedTag, setSelectedTag] = useState('Safe & Punctual');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!comment.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      const newReview: Review = {
        id: `rev_${Date.now()}`,
        serviceId,
        userName: `${userName} (Verified Traveler)`,
        rating,
        comment: comment.trim(),
        date: 'Just now',
        tag: selectedTag,
        helpfulCount: 0,
        verifiedBooking: true
      };

      onReviewSubmitted(newReview);
      setIsSubmitting(false);
      onClose();
    }, 600);
  };

  const activeStarCount = hoverRating || rating;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/85 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="w-full max-w-md bg-[#18130E] border border-amber-500/30 rounded-2xl shadow-2xl overflow-hidden flex flex-col"
      >
        {/* Header */}
        <div className="p-3.5 bg-[#201913] border-b border-[#2D231A] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <h3 className="text-xs font-black text-white uppercase tracking-wider">
              Rate & Review Service
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-4 space-y-4 text-xs">
          <div>
            <span className="text-[9px] uppercase font-bold text-amber-400 tracking-wider block">Service</span>
            <h4 className="text-sm font-bold text-white mt-0.5">{serviceTitle}</h4>
          </div>

          {/* Star selector */}
          <div className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex flex-col items-center text-center space-y-2">
            <span className="text-[10px] text-slate-400 font-medium">Tap stars to rate your experience</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  type="button"
                  key={star}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-125 focus:outline-none cursor-pointer"
                >
                  <Star
                    className={`w-7 h-7 transition-colors ${
                      star <= activeStarCount
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-700'
                    }`}
                  />
                </button>
              ))}
            </div>
            <span className="text-xs font-bold text-amber-400">
              {RATING_LABELS[activeStarCount] || ''}
            </span>
          </div>

          {/* Experience Tags */}
          <div>
            <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1.5">
              Highlight Key Experience
            </label>
            <div className="flex flex-wrap gap-1.5">
              {POPULAR_TAGS.map((tag) => (
                <button
                  key={tag}
                  type="button"
                  onClick={() => setSelectedTag(tag)}
                  className={`px-2.5 py-1 rounded-lg text-[9px] font-bold transition cursor-pointer ${
                    selectedTag === tag
                      ? 'bg-amber-500 text-slate-950 shadow-sm'
                      : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Comment input */}
          <div>
            <label className="text-[9px] uppercase font-bold text-slate-400 block mb-1">
              Your Review & Advice for Travelers
            </label>
            <textarea
              required
              rows={3}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share details of the vehicle condition, guide insights, or overall experience..."
              className="w-full bg-slate-900 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:outline-none focus:border-amber-500 resize-none leading-relaxed"
            />
          </div>

          <div className="flex items-center gap-2 p-2 bg-slate-900/50 rounded-lg text-[9px] text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Posting publicly as <b>{userName}</b> with Verified Traveler badge.</span>
          </div>

          {/* Footer Submit */}
          <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 text-slate-400 hover:text-white font-bold cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting || !comment.trim()}
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black rounded-xl transition active:scale-95 shadow-lg flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              <span>{isSubmitting ? 'Posting Review...' : 'Submit Review'}</span>
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
