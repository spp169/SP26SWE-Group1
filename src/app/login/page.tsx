'use client';
import React, { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Explicitly cast the target if you need to access form fields directly
    const target = e.currentTarget;

    setLoading(true);
    setError(null);

    // Validate email domain
    if (!email.endsWith('@scarletmail.rutgers.edu')) {
      setError('Please use your Rutgers Scarletmail email address.');
      setLoading(false);
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else {
      router.push('/chat'); // Redirect to the main chat hub upon success
    }
  };

  return (
    <main className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md p-8 border-2 border-slate-100 rounded-3xl shadow-2xl">
        <Link href="/" className="text-[#a30026] font-bold hover:underline">← Home</Link>
        
        <div className="flex flex-col items-center my-6">
          <Image src="/overlayicon.png" alt="Scarlet AI" width={80} height={80} />
          <h1 className="text-3xl font-black mt-4 text-slate-900">Welcome Back</h1>
          <p className="text-slate-500 text-sm">Sign in to your Rutgers Scarlet AI account</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <input 
            type="email" 
            placeholder="NetID@scarletmail.rutgers.edu" 
            className="w-full p-4 bg-white border-2 border-slate-300 text-slate-900 rounded-2xl focus:border-scarlet outline-none mb-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input 
            type="password" 
            placeholder="Password" 
            className="w-full p-4 bg-white border-2 border-slate-300 text-slate-900 rounded-2xl focus:border-scarlet outline-none mb-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
          {error && <p className="text-red-500 text-sm font-bold text-center">{error}</p>}

          <button 
            disabled={loading}
            className="w-full bg-[#cc0033] text-white py-4 rounded-2xl font-black text-lg hover:bg-[#990026] transition-all shadow-lg">
          
            {loading ? 'AUTHENTICATING...' : 'LOGIN'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account? <Link href="/signup" className="text-scarlet font-bold hover:underline">Sign Up</Link>
        </p>
      </div>
    </main>
  );
}