'use client';

import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  Timestamp 
} from 'firebase/firestore';

interface SignupData {
  firstName: string;
  email: string;
  timestamp: Timestamp;
  source: string;
  ipAddress?: string;
}

export default function FirebaseForm() {
  const [firstName, setFirstName] = useState('');
  const [email, setEmail] = useState('');
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const getClientIpAddress = async (): Promise<string> => {
    try {
      const response = await fetch('https://api.ipify.org?format=json');
      const data = await response.json();
      return data.ip;
    } catch {
      return 'Unknown';
    }
  };

  const isValidEmail = (emailToValidate: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailToValidate.trim());
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmissionState('submitting');
    setErrorMessage('');

    // Validate first name
    if (!firstName.trim()) {
      setSubmissionState('error');
      setErrorMessage('Please enter your first name');
      return;
    }

    // Validate email
    const trimmedEmail = email.trim().toLowerCase();
    if (!isValidEmail(trimmedEmail)) {
      setSubmissionState('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    try {
      const ipAddress = await getClientIpAddress();

      const signupData: SignupData = {
        firstName: firstName.trim(),
        email: trimmedEmail,
        timestamp: serverTimestamp() as Timestamp,
        source: 'landing-page',
        ipAddress
      };

      console.log('Attempting to add document with data:', signupData);

      try {
        const docRef = await addDoc(collection(db, 'signups'), signupData);
        console.log('Document written with ID:', docRef.id);
        
        setSubmissionState('success');
        setFirstName('');
        setEmail('');
      } catch (addError: any) {
        console.error('Detailed add document error:', {
          name: addError.name,
          message: addError.message,
          code: addError.code,
          fullError: addError
        });
        
        setSubmissionState('error');
        setErrorMessage('Failed to submit. Please try again.');
      }
    } catch (error) {
      console.error('Submission process error:', error);
      setSubmissionState('error');
      setErrorMessage('An unexpected error occurred.');
    }
  };

  if (submissionState === 'success') {
    return (
      <div className="bg-green-600 p-6 rounded-lg relative z-10 text-white">
        <p className="font-bold text-xl mb-2">Brilliant!</p>
        <p className="text-sm">
          You&apos;re amongst the first {Math.floor(Math.random() * 100) + 50} early supporters.
          We&apos;ll keep you updated on our launch progress.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 relative z-10">
      {submissionState === 'error' && (
        <div className="text-red-400 bg-red-900/20 p-3 rounded-lg border border-red-500/30">
          {errorMessage || 'Please check your submission and try again.'}
        </div>
      )}
      
      <input 
        type="text"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
        placeholder="Your first name"
        className="w-full p-3 rounded bg-white/20 backdrop-blur-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#00B4FF] text-white placeholder-white/70"
        required
        disabled={submissionState === 'submitting'}
        autoComplete="given-name"
      />
      
      <input 
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Enter your email for early access"
        className="w-full p-3 rounded bg-white/20 backdrop-blur-lg border border-white/30 focus:outline-none focus:ring-2 focus:ring-[#00B4FF] text-white placeholder-white/70"
        required
        disabled={submissionState === 'submitting'}
        autoComplete="email"
      />
      
      <button 
        type="submit" 
        disabled={submissionState === 'submitting'}
        className="w-full bg-[#00B4FF] p-3 rounded hover:bg-blue-600 transition font-semibold transform hover:scale-105 active:scale-95 duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submissionState === 'submitting' ? 'Submitting...' : 'Get Early Access'}
      </button>
    </form>
  );
}
