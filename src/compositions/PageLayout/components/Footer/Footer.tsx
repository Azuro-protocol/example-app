import React from 'react';

export default function Footer() {
  return (
    <footer className="flex items-center justify-between p-4 sm:p-6">
      {/* Left side placeholder */}
      <div className="flex items-center gap-3">
        {/* You can put logo or navigation links here */}
        <span>© 2025 Your Company</span>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        className="
          inline-flex items-center gap-2 
          px-4 py-2 rounded-lg 
          bg-blue-600 text-white 
          font-semibold text-sm 
          focus:outline-none focus:ring-4 focus:ring-blue-300
          transition-colors duration-200
          hover:bg-blue-700
        "
      >
        {/* Logo wrapper */}
        <span className="inline-flex items-center justify-center w-6 h-6 flex-shrink-0">
          {/* Replace with your SVG logo */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-full h-full"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </span>

        {/* Button text */}
        <span>Call to Action</span>
      </button>
    </footer>
  );
}
