import React from 'react';

const IntroScreen = ({ onStart }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#FFF9F0]">
      {/* Background Decorative Blobs */}
      <div className="absolute top-10 left-10 w-24 h-24 bg-yellow-300 rounded-full blur-2xl opacity-40 animate-pulse"></div>
      <div className="absolute top-1/4 right-10 w-32 h-32 bg-pink-300 rounded-full blur-3xl opacity-40 animate-float-slow"></div>
      <div className="absolute bottom-10 left-1/4 w-40 h-40 bg-blue-300 rounded-full blur-3xl opacity-40 animate-float-soft"></div>
      
      <div className="absolute top-[12%] left-[15%] text-5xl sm:text-6xl pointer-events-none opacity-30 animate-bounce">🎮</div>
      <div className="absolute top-[8%] right-[20%] text-4xl sm:text-5xl pointer-events-none opacity-30 animate-pulse-subtle">✨</div>
      <div className="absolute bottom-[25%] left-[8%] text-4xl sm:text-5xl pointer-events-none opacity-30 animate-wiggle">🥳</div>
      <div className="absolute bottom-[20%] right-[12%] text-5xl sm:text-6xl pointer-events-none opacity-30 animate-float-soft">💡</div>

      <div className="relative z-10 w-full max-w-2xl px-4 sm:px-6">
        <div className="bg-white/80 backdrop-blur-xl border-[4px] sm:border-[6px] border-white p-8 sm:p-16 rounded-[4rem] sm:rounded-[5rem] shadow-[0_40px_80px_-20px_rgba(255,140,0,0.15)] text-center transform transition-all border-dashed relative overflow-hidden">
          
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent pointer-events-none"></div>

          <div className="inline-block mb-4 sm:mb-6 transform hover:rotate-12 transition-transform duration-300 animate-pulse-subtle relative z-10">
            <div className="text-7xl sm:text-8xl mb-2 drop-shadow-lg">🃏</div>
          </div>

          <h1 className="text-4xl sm:text-7xl font-black text-gray-900 mb-4 sm:mb-6 tracking-tight leading-tight relative z-10">
            مرحباً بك في <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600">لعبة البطاقات!</span>
          </h1>
          
          <p className="text-lg sm:text-2xl text-gray-600 mb-8 sm:mb-12 font-bold leading-relaxed relative z-10 px-2">
            استعد للضحك، التحدي، ومعرفة الكثير من الأشياء الرهيبة مع أصحابك! 🎉
          </p>

          <div className="relative z-10 flex flex-col items-center">
            <button
              onClick={onStart}
              className="group relative inline-flex items-center justify-center px-12 py-4 sm:px-16 sm:py-6 bg-orange-500 text-2xl sm:text-3xl font-black text-white rounded-full shadow-[0_12px_0_0_#c2410c] active:shadow-none active:translate-y-[10px] transition-all duration-100 hover:bg-orange-400"
            >
              <span className="relative flex items-center gap-3">
                هيا نلعب! 🚀
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Improved Footer - Better Spacing for Mobile */}
      <footer className="absolute bottom-4 sm:bottom-6 left-0 right-0 z-20 flex justify-center px-4 animate-fade-in">
        <a 
          href="https://www.instagram.com/ayham.alyosofi?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex items-center gap-2.5 px-5 py-2 bg-white/40 hover:bg-white/60 rounded-full backdrop-blur-md border border-white/50 shadow-sm transition-all cursor-pointer group no-underline active:scale-95"
        >
          <div className="p-1.5 bg-gray-900/5 rounded-full group-hover:bg-orange-100 transition-colors">
            <svg className="w-4 h-4 text-gray-600 group-hover:text-orange-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
          </div>
          <span className="text-[10px] sm:text-xs font-bold text-gray-500 tracking-wide uppercase">
            Designed by <span className="text-gray-900 font-black group-hover:text-orange-600 transition-colors">Ayham Alyosofi</span>
          </span>
          <span className="text-base opacity-40 group-hover:opacity-100 transition-all group-hover:scale-125 transform-gpu">📸</span>
        </a>
      </footer>
    </div>
  );
};

export default IntroScreen;