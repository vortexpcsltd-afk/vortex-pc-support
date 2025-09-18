'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ComingSoonPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [animatedText, setAnimatedText] = useState('');
  const [typingComplete, setTypingComplete] = useState(false);

  // Typing animation effect
  useEffect(() => {
    const fullText = "Diagnose. Repair. Save.";
    let currentText = '';
    let index = 0;

    const typingInterval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setAnimatedText(currentText);
        index++;
      } else {
        clearInterval(typingInterval);
        setTimeout(() => setTypingComplete(true), 500);
      }
    }, 100);

    return () => clearInterval(typingInterval);
  }, []);

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!isValidEmail(email)) {
      alert('Please enter a valid email address');
      return;
    }

    console.log('Submitted email:', email);
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-[#1a2980] to-[#26D0CE] animate-gradient-x text-white flex items-center justify-center p-4">
      <div className="max-w-lg w-full text-center relative">
        {/* Floating Elements */}
        <div className="absolute -top-10 -left-10 opacity-20">
          <svg 
            className="w-32 h-32 text-[#00B4FF] animate-pulse" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
          </svg>
        </div>

        <div className="absolute -bottom-10 -right-10 opacity-20">
          <svg 
            className="w-32 h-32 text-[#00B4FF] animate-spin" 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
          </svg>
        </div>

        {/* Logo Section */}
        <div className="mb-8 flex justify-center relative z-10">
          <Image 
            src="/vortexpcsupport-logo-light.png" 
            alt="Vortex PC Support Logo" 
            width={300}
            height={120}
            priority
            className="filter brightness-110 transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Animated Headline */}
        <h1 className="text-4xl font-bold mb-4 text-[#00B4FF] relative z-10">
          {animatedText}
          {!typingComplete && <span className="animate-blink">|</span>}
        </h1>

        {/* Subheading */}
        <p className="mb-6 text-gray-200 text-lg leading-relaxed relative z-10">
          The UK&apos;s most comprehensive PC troubleshooting platform. Follow our expert guides 
          to diagnose and repair your computer problems yourself&mdash;potentially saving hundreds 
          of pounds in repair costs.
        </p>

        {/* Rest of the component remains the same */}
        {/* ... */}
      </div>
    </div>
  );
}
