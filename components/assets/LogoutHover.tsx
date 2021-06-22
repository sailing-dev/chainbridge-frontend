import React from 'react';

interface LogoutHoverProps {
  className?: string;
}

const LogoutHover: React.FC<LogoutHoverProps> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="11"
    height="14" 
    viewBox="0 0 11 14"
  >
	  <g clipPath="url(#clip0)">
      <path d="M11.0001 7.98257C11.0001 6.17597 10.1116 4.49542 8.60971 3.48709C8.41933 3.36104 8.14433 3.40306 8.0174 3.59212C7.89048 3.78118 7.93279 4.05427 8.12317 4.18032C10.2386 5.62979 10.7886 8.50775 9.32894 10.6084C7.86933 12.7091 4.9924 13.2343 2.87702 11.8058C0.761636 10.3774 0.211636 7.4784 1.67125 5.37771C1.98856 4.91556 2.41164 4.49542 2.87702 4.18032C3.0674 4.05427 3.10971 3.78118 2.98279 3.59212C2.85587 3.40306 2.60202 3.36104 2.41164 3.48709C-0.105672 5.18865 -0.761441 8.57077 0.973174 11.0706C2.70779 13.5704 6.11356 14.2006 8.60971 12.4991C10.1116 11.4697 11.0001 9.78917 11.0001 7.98257Z" fill="url(#paint0_linear)"/>
      <path d="M3.21541 2.47882C3.27887 2.62587 3.42695 2.7309 3.59618 2.7309H5.07695V8.82292H5.9231V2.7309H7.40387C7.5731 2.7309 7.72118 2.62587 7.78464 2.47882C7.82695 2.4158 7.82695 2.37378 7.82695 2.31076C7.82695 2.20573 7.78464 2.10069 7.70002 2.01667L5.79618 0.126042C5.62695 -0.0420139 5.3731 -0.0420139 5.20387 0.126042L3.30002 2.01667C3.1731 2.14271 3.13079 2.31076 3.21541 2.47882Z" fill="url(#paint1_linear)"/>
    </g>
    <defs>
      <linearGradient id="paint0_linear" x1="0.00219711" y1="8.55198" x2="10.9894" y2="8.55198" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF7F05"/>
        <stop offset="1" stopColor="#FF204B"/>
      </linearGradient>
      <linearGradient id="paint1_linear" x1="3.17139" y1="4.51465" x2="7.82241" y2="4.51465" gradientUnits="userSpaceOnUse">
        <stop stopColor="#FF7F05"/>
        <stop offset="1" stopColor="#FF204B"/>
      </linearGradient>
      <clipPath id="clip0">
        <rect width="11" height="13.4444" fill="white"/>
      </clipPath>
    </defs>
  </svg>
);

export default LogoutHover;
