import React from 'react';
import { motion } from 'framer-motion';

const DogIllustration = ({ isDarkMode }) => {
  return (
    <div className="relative w-full h-96 flex items-center justify-center">
      {/* Background Circle */}
      <motion.div
        className={`absolute w-80 h-80 rounded-full ${
          isDarkMode ? 'bg-gray-700' : 'bg-gradient-to-br from-blue-100 to-purple-100'
        }`}
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      
      {/* Main Dog */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
      >
        <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-lg">
          {/* Dog Body */}
          <motion.ellipse
            cx="100" cy="140" rx="45" ry="35"
            fill="#8B4513"
            animate={{ scaleY: [1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Dog Head */}
          <motion.circle
            cx="100" cy="80" r="40"
            fill="#D2691E"
            animate={{ y: [0, -2, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Ears */}
          <motion.ellipse
            cx="75" cy="60" rx="15" ry="25"
            fill="#8B4513"
            transform="rotate(-30 75 60)"
            animate={{ rotate: [-30, -25, -30] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.ellipse
            cx="125" cy="60" rx="15" ry="25"
            fill="#8B4513"
            transform="rotate(30 125 60)"
            animate={{ rotate: [30, 25, 30] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Eyes */}
          <circle cx="90" cy="75" r="6" fill="#000" />
          <circle cx="110" cy="75" r="6" fill="#000" />
          <circle cx="92" cy="73" r="2" fill="#FFF" />
          <circle cx="112" cy="73" r="2" fill="#FFF" />
          
          {/* Nose */}
          <ellipse cx="100" cy="88" rx="4" ry="3" fill="#000" />
          
          {/* Mouth */}
          <motion.path
            d="M 95 95 Q 100 100 105 95"
            stroke="#000"
            strokeWidth="2"
            fill="none"
            animate={{ d: ["M 95 95 Q 100 100 105 95", "M 95 95 Q 100 102 105 95", "M 95 95 Q 100 100 105 95"] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Tail */}
          <motion.path
            d="M 140 130 Q 160 120 155 100"
            stroke="#8B4513"
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            animate={{ d: ["M 140 130 Q 160 120 155 100", "M 140 130 Q 165 115 160 95", "M 140 130 Q 160 120 155 100"] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          />
          
          {/* Legs */}
          <rect x="70" y="170" width="8" height="20" fill="#8B4513" rx="4" />
          <rect x="85" y="170" width="8" height="20" fill="#8B4513" rx="4" />
          <rect x="107" y="170" width="8" height="20" fill="#8B4513" rx="4" />
          <rect x="122" y="170" width="8" height="20" fill="#8B4513" rx="4" />
          
          {/* Paws */}
          <ellipse cx="74" cy="192" rx="6" ry="4" fill="#000" />
          <ellipse cx="89" cy="192" rx="6" ry="4" fill="#000" />
          <ellipse cx="111" cy="192" rx="6" ry="4" fill="#000" />
          <ellipse cx="126" cy="192" rx="6" ry="4" fill="#000" />
        </svg>
      </motion.div>
      
      {/* Floating Dogs */}
      <motion.div
        className="absolute top-10 left-10"
        animate={{ y: [0, -10, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80">
          <circle cx="40" cy="40" r="25" fill="#FFD700" />
          <circle cx="35" cy="35" r="3" fill="#000" />
          <circle cx="45" cy="35" r="3" fill="#000" />
          <ellipse cx="40" cy="42" rx="2" ry="1.5" fill="#000" />
          <ellipse cx="30" cy="25" rx="8" ry="12" fill="#DAA520" transform="rotate(-20 30 25)" />
          <ellipse cx="50" cy="25" rx="8" ry="12" fill="#DAA520" transform="rotate(20 50 25)" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute top-20 right-10"
        animate={{ y: [0, -8, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70">
          <circle cx="35" cy="35" r="20" fill="#8B4513" />
          <circle cx="32" cy="32" r="2" fill="#000" />
          <circle cx="38" cy="32" r="2" fill="#000" />
          <ellipse cx="35" cy="38" rx="1.5" ry="1" fill="#000" />
          <ellipse cx="28" cy="22" rx="6" ry="10" fill="#654321" transform="rotate(-15 28 22)" />
          <ellipse cx="42" cy="22" rx="6" ry="10" fill="#654321" transform="rotate(15 42 22)" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-10 left-20"
        animate={{ y: [0, -6, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60">
          <circle cx="30" cy="30" r="18" fill="#FF6B6B" />
          <circle cx="27" cy="27" r="2" fill="#000" />
          <circle cx="33" cy="27" r="2" fill="#000" />
          <ellipse cx="30" cy="32" rx="1" ry="0.8" fill="#000" />
          <ellipse cx="24" cy="18" rx="5" ry="8" fill="#E55555" transform="rotate(-10 24 18)" />
          <ellipse cx="36" cy="18" rx="5" ry="8" fill="#E55555" transform="rotate(10 36 18)" />
        </svg>
      </motion.div>
      
      {/* Floating Hearts */}
      <motion.div
        className="absolute top-5 right-5"
        animate={{ y: [0, -15, 0], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30">
          <path d="M15 25 C15 25 5 18 5 12 C5 8 8 5 12 5 C13 5 15 7 15 7 C15 7 17 5 18 5 C22 5 25 8 25 12 C25 18 15 25 15 25 Z" fill="#FF69B4" />
        </svg>
      </motion.div>
      
      <motion.div
        className="absolute bottom-5 right-20"
        animate={{ y: [0, -10, 0], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      >
        <svg width="25" height="25" viewBox="0 0 25 25">
          <path d="M12.5 20 C12.5 20 4 15 4 10 C4 7 6.5 4 10 4 C11 4 12.5 6 12.5 6 C12.5 6 14 4 15 4 C18.5 4 21 7 21 10 C21 15 12.5 20 12.5 20 Z" fill="#FFB6C1" />
        </svg>
      </motion.div>
    </div>
  );
};

export default DogIllustration;