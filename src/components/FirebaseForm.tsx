'use client';

import React, { useState } from 'react';
import { db } from '../lib/firebase';
import { collection, addDoc, query, where, getDocs, serverTimestamp, Timestamp } from 'firebase/firestore';

interface EarlyAccessSignupData {
  firstName: string;
  email: string;
  signupDate: Date;
  timestamp: Timestamp;
  source: string;
}

export default function FirebaseForm() {
  const [firstName, setFirstName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [submissionState, setSubmissionState] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const isValidEmail = (emailToValidate: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(emailToValidate.trim());
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    
    setErrorMessage('');
    
    if (!firstName.trim()) {
      setSubmissionState('error');
      setErrorMessage('Please enter your first name');
      return;
    }

    const trimmedEmail = email.toLowerCase().trim();
    if (!isValidEmail(trimmedEmail)) {
      setSubmissionState('error');
      setErrorMessage('Please enter a valid email address');
      return;
    }

    setSubmissionState('submitting');

    try {
      if (!db) {
        throw new Error('Database connection failed. Please try again later.');
      }

      const emailQuery = query(
        collection(db, 'early-access-signups'), 
        where('email', '==', trimmedEmail)
      );
      
      const existingEmails = await getDocs(emailQuery);

      if (!existingEmails.empty) {
        setSubmissionState('error');
        setErrorMessage('This email is already registered');
        return;
      }

      const signupData: EarlyAccessSignupData = {
        firstName: firstName.trim(),
        email: trimmedEmail,
        signupDate: new Date(),
        timestamp: serverTimestamp() as Timestamp,
        source: 'coming-soon-page'
      };

      await addDoc(collection(db, 'vpcscs-early-access'), signupData);

      setSubmissionState('success');
      setFirstName('');
      setEmail('');
      setErrorMessage('');

      console.log('Early access signup successful:', {
        email: trimmedEmail,
        timestamp: new Date().toISOString()
      });

    } catch (err: unknown) {
      console.error('Submission error:', err);
      setSubmissionState('error');
      
      if (err instanceof Error) {
        setErrorMessage(err.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    }
  };

  if (submissionState === 'success') {
    return (
      <div className="bg-green-600 p-6 rounded-lg relative z-10">
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
