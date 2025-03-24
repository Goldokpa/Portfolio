import React from 'react';

const Background = () => {
  return (
    <div className="background-container">
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 800 600" 
        preserveAspectRatio="xMidYMid slice"
        className="background-svg"
      >
        {/* Background gradient reminiscent of Windows 98 default blue desktop */}
        <defs>
          <linearGradient id="windowsGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style={{stopColor: "#0078D4", stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: "#87CEEB", stopOpacity: 1}} />
          </linearGradient>
          
          {/* Subtle diagonal lines for texture */}
          <pattern id="diagonalLines" patternUnits="userSpaceOnUse" width="10" height="10">
            <path d="M-1,1 l2,-2 M0,10 l10,-10 M9,11 l2,-2" style={{stroke: "#4169E1", strokeWidth: 1}} />
          </pattern>
        </defs>
        
        {/* Background */}
        <rect width="800" height="600" fill="url(#windowsGradient)"/>
        
        {/* Texture overlay */}
        <rect width="800" height="600" fill="url(#diagonalLines)" opacity="0.1"/>
        
        {/* Stylized Windows logo */}
        <g transform="translate(350,250) scale(3)">
          <rect x="-30" y="-30" width="60" height="60" fill="none"/>
          <rect x="-25" y="-25" width="25" height="25" fill="#FFFFFF"/>
          <rect x="0" y="-25" width="25" height="25" fill="#F0A30A"/>
          <rect x="-25" y="0" width="25" height="25" fill="#1BA1E2"/>
          <rect x="0" y="0" width="25" height="25" fill="#60A917"/>
        </g>
      </svg>
    </div>
  );
};

export default Background;
