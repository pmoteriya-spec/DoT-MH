import React from 'react';
// @ts-ignore
import officialLogoUrl from '../assets/images/maharashtra_tourism_logo_1783946457126.jpg';

interface MaharashtraLogoProps {
  className?: string;
  size?: number;
  textColor?: string;
  light?: boolean;
  hideText?: boolean;
  layout?: 'horizontal' | 'vertical';
}

export default function MaharashtraLogo({ className = '', size = 50, textColor, light = false, hideText = false, layout = 'vertical' }: MaharashtraLogoProps) {
  // Saffron/orange theme color matching official logo
  const titleColor = textColor || (light ? '#FFFFFF' : '#E86B21');

  // We crop the emblem from the official high-quality logo image to get the exact graphic (top 72% of the image)
  const emblem = (
    <div 
      className="relative overflow-hidden rounded-lg bg-white flex items-center justify-center shrink-0 shadow-sm border border-amber-500/15"
      style={{ 
        width: `${size}px`, 
        height: `${size * 0.72}px` // precise ratio to crop out the text from the image itself
      }}
    >
      <img
        src={officialLogoUrl}
        alt="Maharashtra Tourism Emblem"
        referrerPolicy="no-referrer"
        className="absolute object-cover object-top"
        style={{
          width: `${size}px`,
          height: `${size}px`,
          top: 0,
          left: 0
        }}
      />
    </div>
  );

  if (hideText) {
    return (
      <div className={`inline-flex items-center justify-center shrink-0 ${className}`}>
        {emblem}
      </div>
    );
  }

  // If hideText is false, we render the crisp, official emblem with responsive, beautiful HTML text
  return (
    <div className={`flex ${layout === 'horizontal' ? 'flex-row items-center gap-3' : 'flex-col items-center justify-center text-center gap-2'} select-none ${className}`}>
      {emblem}
      
      <div className={`flex flex-col ${layout === 'horizontal' ? 'items-start text-left' : 'items-center text-center mt-1'}`}>
        <span 
          className="font-extrabold tracking-[0.25em] uppercase leading-tight"
          style={{ 
            fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
            color: titleColor,
            fontSize: layout === 'horizontal' ? `${Math.max(8, size * 0.28)}px` : `${Math.max(9, size * 0.14)}px`
          }}
        >
          MAHARASHTRA
        </span>
        <span 
          className="font-bold tracking-[0.42em] uppercase leading-none mt-0.5"
          style={{ 
            fontFamily: "'Playfair Display', 'Cinzel', 'Georgia', serif",
            color: titleColor,
            fontSize: layout === 'horizontal' ? `${Math.max(7, size * 0.24)}px` : `${Math.max(8, size * 0.11)}px`
          }}
        >
          TOURISM
        </span>
      </div>
    </div>
  );
}
