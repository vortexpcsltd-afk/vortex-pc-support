'use client';

import React from 'react';
import dynamic from 'next/dynamic';
import Image from 'next/image';

const FirebaseForm = dynamic(() => import('../components/FirebaseForm'), {
  ssr: false,
  loading: () => (
    <div className="text-white text-center">
      Loading form...
    </div>
  )
});

export default function ComingSoonPage() {
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

        <h1 className="text-4xl font-bold mb-4 text-[#00B4FF] relative z-10">
          Diagnose. Repair. Save.
        </h1>

        <p className="mb-6 text-gray-200 text-lg leading-relaxed relative z-10">
          The UK&apos;s most comprehensive PC troubleshooting platform. Follow our expert guides 
          to diagnose and repair your computer problems yourself&mdash;potentially saving hundreds 
          of pounds in repair costs.
        </p>

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

        <FirebaseForm />

        <p className="mt-6 text-xs text-gray-300 relative z-10">
          We respect your privacy. Unsubscribe at any time.
        </p>

        {/* Version and Copyright */}
        <div className="absolute bottom-4 left-0 right-0 text-center text-xs text-gray-400 opacity-70">
          <p>
            &copy; {new Date().getFullYear()} Vortex PC Support Ltd. 
            All rights reserved. 
            <br />
            Version: v1.001 
            <br />
            Last Updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
}
