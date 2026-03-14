'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';
import LogoutButton from '@/components/LogoutButton'; 

export default function ChatHub() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  // Check if user is logged in on page load
  useEffect(() => {
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) setUserEmail(user.email ?? null);
    };
    getUser();
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsGenerating(true);

    // Placeholder for LLM logic
    setTimeout(() => {
      const aiResponse = { role: 'assistant', content: "This is a placeholder response from Scarlet AI. We will connect Gemini/Ollama in Iteration 2!" };
      setMessages(prev => [...prev, aiResponse]);
      setIsGenerating(false);
    }, 2000);
  };

  return (
    <div className="flex h-screen bg-white text-slate-900">
      {/* 1. Sidebar - History & Branding */}
      {/* relative z-50 ensures this sidebar stays above the main chat window depth */}
      <aside className="w-64 bg-slate-50 border-r border-slate-200 flex flex-col p-4 hidden md:flex relative z-50">
        <Link href="/" className="flex items-center gap-2 mb-8 hover:opacity-80 transition-opacity">
          <Image src="/overlayicon.png" alt="Logo" width={32} height={32} />
          <span className="font-black text-xl tracking-tight">SCARLET <span className="text-scarlet">AI</span></span>
        </Link>
        
        <button className="w-full py-3 mb-6 border-2 border-dashed border-slate-300 rounded-xl text-slate-500 font-bold hover:border-scarlet hover:text-scarlet transition-all">
          + New Chat
        </button>

        <div className="flex-1 overflow-y-auto">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Recent History</p>
          {userEmail ? (
            <div className="text-sm text-slate-500 italic">No recent chats found.</div>
          ) : (
            <div className="bg-amber-50 p-3 rounded-lg border border-amber-100 text-xs text-amber-700">
              Log in to save your chat history and sync across devices.
            </div>
          )}
        </div>

        {/* Auth Section at bottom */}
<div className="mt-auto pt-4 border-t border-slate-200 flex flex-col items-center">
  {userEmail ? (
    <LogoutButton />
  ) : (
    <Link 
      href="/login" 
      className="text-scarlet font-bold block text-center w-full p-3 hover:bg-red-50 rounded-xl transition-all"
    >
      Login
    </Link>
  )}
</div>
      </aside>

      {/* 2. Main Chat Area */}
      <main className="flex-1 flex flex-col relative z-10">
        {/* Messages Display */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {messages.length === 0 && (
            <div className="h-full flex flex-col items-center justify-center text-center opacity-20">
               <Image src="/overlayicon.png" alt="Logo" width={100} height={100} />
               <h2 className="text-2xl font-black mt-4">How can I help you, Scarlet Knight?</h2>
            </div>
          )}
          
          {messages.map((msg, i) => (
            <div key={i} className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.role === 'assistant' && (
                <div className="w-8 h-8 rounded-full border border-slate-200 flex-shrink-0 flex items-center justify-center bg-white">
                  <Image src="/overlayicon.png" alt="AI" width={20} height={20} />
                </div>
              )}

              <div className={`max-w-[75%] p-4 rounded-2xl shadow-sm font-medium ${
                msg.role === 'user' 
                  ? 'bg-[#cc0033] text-white rounded-tr-none' 
                  : 'bg-slate-100 text-slate-900 border border-slate-200 rounded-tl-none'
              }`}>
                {msg.content}
              </div>
            </div>
          ))}

          {isGenerating && (
            <div className="flex items-start gap-3">
               <div className="relative w-10 h-10">
                 <div className="absolute inset-0 rounded-full border-2 border-t-scarlet border-transparent animate-spin"></div>
                 <Image src="/overlayicon.png" alt="AI" width={40} height={40} className="p-1.5" />
               </div>
               <div className="bg-slate-100 p-4 rounded-2xl rounded-tl-none animate-pulse text-slate-400 italic text-sm">
                 Thinking...
               </div>
            </div>
          )}
        </div>

        {/* 3. Input Bar */}
        <div className="p-6 bg-white border-t border-slate-100">
          <form onSubmit={handleSendMessage} className="max-w-4xl mx-auto relative">
            <input 
              type="text" 
              placeholder="Ask Scarlet AI anything..."
              className="w-full p-5 pr-20 bg-slate-50 border-2 border-slate-300 text-slate-900 rounded-2xl focus:border-scarlet outline-none transition-all placeholder:text-slate-400 font-medium"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button 
              type="submit"
              className="absolute right-3 top-3 bottom-3 bg-[#cc0033] text-white px-5 rounded-xl font-bold hover:bg-[#990026] transition-all flex items-center justify-center gap-2 shadow-md active:scale-95"
            >
              <span className="hidden sm:inline text-sm uppercase tracking-wider">Send</span>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
              </svg>
            </button>
          </form>
          <p className="text-[10px] text-center text-slate-500 mt-4 font-bold uppercase tracking-[0.2em]">
            Official Interface • Rutgers Software Engineering
          </p>
        </div>
      </main>
    </div>
  );
}