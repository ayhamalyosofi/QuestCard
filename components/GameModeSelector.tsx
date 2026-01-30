
import React from 'react';

const GameModeSelector = ({ onSelectMode, onBack }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen w-full overflow-hidden bg-[#FDFCFB]">
      <button
        onClick={onBack}
        className="absolute top-6 right-6 flex items-center gap-2 px-6 py-2.5 bg-gray-200 text-gray-700 font-bold rounded-2xl hover:bg-gray-300 transition-all active:scale-95 group shadow-sm z-20"
        aria-label="العودة للشاشة الرئيسية"
      >
        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
        </svg>
        <span>رجوع</span>
      </button>

      <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-blue-300 rounded-full blur-3xl opacity-30 animate-float-slow"></div>
      <div className="absolute bottom-1/3 right-1/4 w-40 h-40 bg-purple-300 rounded-full blur-3xl opacity-30 animate-float-slow delay-500"></div>

      <div className="relative z-10 w-full max-w-2xl px-6">
        <div className="bg-white/70 backdrop-blur-lg border-[6px] border-white p-10 sm:p-16 rounded-[5rem] shadow-[0_40px_80px_-20px_rgba(100,0,200,0.15)] text-center transform transition-all border-dashed">
          
          <h1 className="text-5xl sm:text-6xl font-black text-gray-900 mb-8 tracking-tight leading-tight drop-shadow-sm">
            اختر وضع اللعب <span className="text-purple-600">🕹️</span>
          </h1>
          
          <p className="text-xl sm:text-2xl text-gray-600 mb-12 font-bold leading-relaxed">
            استمتع بالأسئلة وحدك أو تنافس مع أصدقائك!
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <button
              onClick={() => onSelectMode('free')}
              className="group relative inline-flex items-center justify-center px-10 sm:px-12 py-5 sm:py-6 bg-blue-500 text-white text-2xl sm:text-3xl font-black rounded-full shadow-[0_12px_0_0_#2563eb] active:shadow-none active:translate-y-[8px] transition-all duration-100 hover:bg-blue-400"
              aria-label="ابدأ اللعب الحر بدون نقاط"
            >
              <span className="relative flex items-center gap-3">
                ابدأ اللعب الحر 🚀
              </span>
            </button>
            <button
              onClick={() => onSelectMode('competition')}
              className="group relative inline-flex items-center justify-center px-10 sm:px-12 py-5 sm:py-6 bg-orange-500 text-white text-2xl sm:text-3xl font-black rounded-full shadow-[0_12px_0_0_#c2410c] active:shadow-none active:translate-y-[8px] transition-all duration-100 hover:bg-orange-400"
              aria-label="ابدأ المنافسة بنظام النقاط"
            >
              <span className="relative flex items-center gap-3">
                ابدأ المنافسة 🏆
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameModeSelector;
