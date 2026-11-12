import React from 'react';

export default function FlagIcon({ country, className = "w-16 h-10 shadow-sm rounded-md overflow-hidden inline-block border border-gray-200" }) {
  const code = (country || '').toLowerCase();

  switch (code) {
    case 'pakistan':
    case 'pk':
      return (
        <div className={className}>
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#01411C" />
            <rect width="225" height="600" fill="#FFFFFF" />
            {/* White Crescent */}
            <circle cx="560" cy="300" r="160" fill="#FFFFFF" />
            <circle cx="600" cy="265" r="145" fill="#01411C" />
            {/* White Star */}
            <polygon
              points="625,180 642,226 690,226 651,254 666,299 625,271 584,299 599,254 560,226 608,226"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      );

    case 'uae':
    case 'ae':
      return (
        <div className={className}>
          <svg viewBox="0 0 900 450" className="w-full h-full object-cover">
            <rect width="900" height="150" fill="#00732F" />
            <rect y="150" width="900" height="150" fill="#FFFFFF" />
            <rect y="300" width="900" height="150" fill="#000000" />
            <rect width="225" height="450" fill="#FF0000" />
          </svg>
        </div>
      );

    case 'ksa':
    case 'sa':
      return (
        <div className={className}>
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="600" fill="#006C35" />
            {/* Arabic Script & Sword representation */}
            <g fill="#FFFFFF" transform="translate(180, 160) scale(0.9)">
              <text x="280" y="90" textAnchor="middle" fontSize="62" fontFamily="Arial, sans-serif" fontWeight="bold">
                لا إله إلا الله محمد رسول الله
              </text>
              {/* Sword */}
              <path d="M 60 170 L 500 170 L 515 163 L 530 170 L 515 177 L 500 170 Z" fill="#FFFFFF" />
              <rect x="50" y="155" width="14" height="30" rx="3" fill="#FFFFFF" />
              <path d="M 40 170 L 15 155 L 15 185 Z" fill="#FFFFFF" />
            </g>
          </svg>
        </div>
      );

    case 'iraq':
    case 'iq':
      return (
        <div className={className}>
          <svg viewBox="0 0 900 600" className="w-full h-full object-cover">
            <rect width="900" height="200" fill="#CE1126" />
            <rect y="200" width="900" height="200" fill="#FFFFFF" />
            <rect y="400" width="900" height="200" fill="#000000" />
            <text x="450" y="325" textAnchor="middle" fill="#007A3D" fontSize="68" fontFamily="Arial, sans-serif" fontWeight="bold">
              الله أكبر
            </text>
          </svg>
        </div>
      );

    case 'qatar':
    case 'qa':
      return (
        <div className={className}>
          <svg viewBox="0 0 900 500" className="w-full h-full object-cover">
            <rect width="900" height="500" fill="#8D1B3D" />
            {/* White serrated band (9 teeth) */}
            <path
              d="M 0 0 L 260 0 
                 L 310 27.7 L 260 55.5 
                 L 310 83.3 L 260 111.1 
                 L 310 138.8 L 260 166.6 
                 L 310 194.4 L 260 222.2 
                 L 310 250 L 260 277.7 
                 L 310 305.5 L 260 333.3 
                 L 310 361.1 L 260 388.8 
                 L 310 416.6 L 260 444.4 
                 L 310 472.2 L 260 500 
                 L 0 500 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      );

    case 'kuwait':
    case 'kw':
      return (
        <div className={className}>
          <svg viewBox="0 0 900 450" className="w-full h-full object-cover">
            <rect width="900" height="150" fill="#007A3D" />
            <rect y="150" width="900" height="150" fill="#FFFFFF" />
            <rect y="300" width="900" height="150" fill="#CE1126" />
            {/* Black Trapezoid at hoist */}
            <polygon points="0,0 250,150 250,300 0,450" fill="#000000" />
          </svg>
        </div>
      );

    case 'oman':
    case 'om':
      return (
        <div className={className}>
          <svg viewBox="0 0 900 450" className="w-full h-full object-cover">
            <rect width="900" height="150" fill="#FFFFFF" />
            <rect y="150" width="900" height="150" fill="#DB161B" />
            <rect y="300" width="900" height="150" fill="#008000" />
            {/* Red hoist band */}
            <rect width="250" height="450" fill="#DB161B" />
            {/* National emblem simplified */}
            <g fill="#FFFFFF" transform="translate(60, 25) scale(0.6)">
              <circle cx="100" cy="90" r="18" fill="none" stroke="#FFFFFF" strokeWidth="6" />
              <path d="M 60 40 L 140 140 M 140 40 L 60 140" stroke="#FFFFFF" strokeWidth="10" strokeLinecap="round" />
              <path d="M 100 25 L 100 155" stroke="#FFFFFF" strokeWidth="8" />
            </g>
          </svg>
        </div>
      );

    case 'bahrain':
    case 'bh':
      return (
        <div className={className}>
          <svg viewBox="0 0 900 540" className="w-full h-full object-cover">
            <rect width="900" height="540" fill="#CE1126" />
            {/* White serrated band (5 points) */}
            <path
              d="M 0 0 L 260 0 
                 L 330 54 L 260 108 
                 L 330 162 L 260 216 
                 L 330 270 L 260 324 
                 L 330 378 L 260 432 
                 L 330 486 L 260 540 
                 L 0 540 Z"
              fill="#FFFFFF"
            />
          </svg>
        </div>
      );

    case 'usa':
    case 'us':
      return (
        <div className={className}>
          <svg viewBox="0 0 900 474" className="w-full h-full object-cover">
            {/* 13 Stripes */}
            <rect width="900" height="474" fill="#B22234" />
            <rect y="36.4" width="900" height="36.4" fill="#FFFFFF" />
            <rect y="109.2" width="900" height="36.4" fill="#FFFFFF" />
            <rect y="182" width="900" height="36.4" fill="#FFFFFF" />
            <rect y="254.8" width="900" height="36.4" fill="#FFFFFF" />
            <rect y="327.6" width="900" height="36.4" fill="#FFFFFF" />
            <rect y="400.4" width="900" height="36.4" fill="#FFFFFF" />
            {/* Blue canton */}
            <rect width="360" height="255" fill="#3C3B6E" />
            {/* Simplified 9 star dots in grid */}
            <g fill="#FFFFFF">
              {[50, 115, 180, 245, 310].map(x => (
                <React.Fragment key={x}>
                  <circle cx={x} cy="40" r="8" />
                  <circle cx={x} cy="100" r="8" />
                  <circle cx={x} cy="160" r="8" />
                  <circle cx={x} cy="220" r="8" />
                </React.Fragment>
              ))}
            </g>
          </svg>
        </div>
      );

    default:
      return (
        <div className={`${className} bg-gray-100 flex items-center justify-center font-bold text-xs text-gray-500`}>
          {country}
        </div>
      );
  }
}
