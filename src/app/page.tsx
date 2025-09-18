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

        {/* Value Proposition Highlights */}
        <div className="mt-8 grid grid-cols-3 gap-4 text-sm text-gray-400 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-[#00B4FF] mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 1.414L10.586 9H7a1 1 0 100 2h3.586l-1.293 1.293a1 1 0 101.414 1.414l3-3a1 1 0 000-1.414z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-white">650+</span>
            </div>
            <p className="text-center">Step-by-Step Guides</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-[#00B4FF] mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
                <path fillRule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-white">28</span>
            </div>
            <p className="text-center">Problem Categories</p>
          </div>
          
          <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 border border-white/20 hover:bg-white/20 transition-all duration-300">
            <div className="flex items-center justify-center mb-2">
              <svg className="w-8 h-8 text-[#00B4FF] mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="font-semibold text-white">£100s</span>
            </div>
            <p className="text-center">Potential Savings</p>
          </div>
        </div>

        {/* Email Submission Section */}
        {submitted ? (
          <div className="bg-green-600 p-6 rounded-lg relative z-10">
            <p className="font-bold text-xl mb-2">Brilliant!</p>
            <p className="text-sm">
              You&apos;re amongst the first {Math.floor(Math.random() * 100) + 50} early supporters.
              We&apos;ll keep you updated on our launch progress.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
            <input 
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email for early access"
              className="w-full p-3 rounded bg-white/20 backdrop-blur-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#00B4FF] text-white placeholder-white/70"
              required
            />
            <button 
              type="submit" 
              className="w-full bg-[#00B4FF] p-3 rounded hover:bg-blue-600 transition font-semibold transform hover:scale-105 active:scale-95 duration-300"
            >
              Get Early Access
            </button>
          </form>
        )}

        {/* Privacy Notice */}
        <p className="mt-6 text-xs text-gray-300 relative z-10">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </div>
    </div>
  );
}
