import React from 'react';

const Logo = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    version="1.0"
    width="300"
    height="auto"
    viewBox="64 105 211 40"
    preserveAspectRatio="xMidYMid meet"
    {...props}
  >
    <defs>
      <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fa71cd" />
        <stop offset="100%" stopColor="#9b59b6" />
      </linearGradient>
      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#f9d423" />
        <stop offset="100%" stopColor="#f83600" />
      </linearGradient>
      {/* Add other gradients as needed, renamed with unique IDs */}
    </defs>

    <g fill="url(#grad1)" transform="translate(66,107)">
      {/* Example path using gradient */}
      <path d="M4.26-35.11L4.55-35.11Q7.22-35.11 8.59-32.14L8.59-32.14Q8.81-31.39 8.81-30.70L8.81-30.70L8.81-24.14Q28.15-34.20 29.92-34.96L29.92-34.96Q30.43-35.11 30.90-35.11L30.90-35.11L31.39-35.11Q34.20-35.11 35.43-31.88L35.43-31.88Q35.50-31.48 35.50-31.24L35.50-31.24L35.50-30.28Q35.50-27.98 32.37-26.49L32.37-26.49Q15.23-17.58 15.11-17.58L15.11-17.58L15.11-17.53Q33.03-8.35 33.96-7.74L33.96-7.74Q35.50-6.19 35.50-4.82L35.50-4.82L35.50-3.87Q35.50-1.64 32.78-0.27L32.78-0.27Q32.07 0 31.51 0L31.51 0L30.75 0Q29.67 0 24.95-2.62L24.95-2.62L8.81-10.97L8.81-4.41Q8.81-1.30 5.53-0.15L5.53-0.15Q4.99 0 4.55 0L4.55 0L4.41 0Q1.15 0 0.07-3.45L0.07-3.45Q0-3.72 0-3.99L0-3.99L0-31.12Q0-33.20 2.37-34.62L2.37-34.62Q3.33-35.11 4.26-35.11Z" />
      {/* Add other paths similarly */}
    </g>
  </svg>
);

export default Logo;

