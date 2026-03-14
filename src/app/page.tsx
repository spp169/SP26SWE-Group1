import Image from 'next/image';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950 flex flex-col items-center justify-center p-4">
      {/* 1. Header - Using TRANSPARENT PNG for no white box */}
      <div className="mb-10 text-center flex flex-col items-center">
        <div className="relative w-80 h-80 mb-2">
          <Image 
            src="/landingicon.png" 
            alt="Scarlet AI Logo" 
            fill 
            className="object-contain"
            priority
          />
        </div>
        
        <p className="text-slate-600 dark:text-slate-400 mt-2 font-semibold">
          The official AI interface for the Rutgers community.
        </p>
      </div>

      {/* 2. The Preview Box - Higher Contrast for Testing Team Demo */}
      <div className="w-full max-w-3xl bg-slate-50 dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl mb-10 p-8 relative">
        <div className="flex flex-col space-y-6">
          {/* User Message */}
          <div className="bg-blue-600 text-white dark:bg-blue-400 dark:text-slate-900 self-end p-4 rounded-2xl rounded-tr-none text-sm font-medium max-w-[80%] shadow-md">
        What is Software Engineering and will AI be taking over?
          </div>
           
           {/* AI Response Area */}
           <div className="flex items-start gap-4">
             {/* The Animated Avatar */}
             <div className="relative flex-shrink-0 w-12 h-12 bg-white dark:bg-slate-800 rounded-full shadow-inner border border-slate-200 dark:border-slate-700 flex items-center justify-center">
               {/* SPINNING RING */}
               <div className="absolute inset-0 rounded-full border-4 border-t-scarlet border-transparent animate-spin"></div>
               
               {/* THE ACTUAL ICON IN THE CIRCLE */}
               <div className="relative w-8 h-8">
                 <Image 
                   src="/overlayicon.png" 
                   alt="AI Avatar" 
                   fill
                   className="object-contain p-1"
                 />
               </div>
             </div>

             {/* Response Text */}
             <div className="bg-white dark:bg-slate-800 self-start p-5 rounded-2xl rounded-tl-none text-sm border border-slate-200 dark:border-slate-700 shadow-sm w-full max-w-[70%]">
               <div className="flex gap-1 mb-2">
                 <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></div>
                 <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                 <div className="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:0.4s]"></div>
               </div>
               <span className="text-slate-900 dark:text-slate-100 font-medium">Analyzing prompt and generating response...</span>
             </div>
           </div>
        </div>
      </div>

      {/* 3. High-Contrast Buttons - Essential for Acceptancy Tests */}
      <div className="flex flex-col gap-4 w-full max-w-md">
  {/* Primary Login Button: Red by default, Darker Red on hover, White text */}
  <Link 
    href="/login" 
    className="w-full bg-[#cc0033] text-white text-center py-5 rounded-2xl font-black text-xl hover:bg-[#990026] transition-all shadow-xl active:scale-95 border-b-4 border-red-900"
  >
    LOGIN WITH SCARLETMAIL
  </Link>

  <div className="flex gap-4 w-full">
    {/* Secondary Action: SIGN UP */}
    <Link 
      href="/signup" 
      className="flex-1 bg-white border-2 border-[#cc0033] text-[#cc0033] text-center py-4 rounded-2xl font-black text-lg hover:bg-red-50 transition-all shadow-lg active:scale-95 border-b-4 border-red-100"
    >
      CREATE ACCOUNT
    </Link>

    {/* Secondary Action: GUEST */}
    <Link 
      href="/chat" 
      className="flex-1 bg-slate-900 text-white text-center py-4 rounded-2xl font-black text-lg hover:bg-black transition-all shadow-lg active:scale-95 border-b-4 border-slate-700"
    >
      GUEST ACCESS
    </Link>
  </div>
</div>

      <p className="mt-10 text-xs text-slate-500 font-bold uppercase tracking-widest">
        Rutgers University Restricted Access
      </p>
    </main>
  );
}