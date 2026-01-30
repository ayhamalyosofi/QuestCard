
import React from 'react';

const Flashcard = ({ 
  question, 
  answer, 
  colorClass = 'bg-orange-600', 
  questionLevel, 
  categoryIconSvgPath, 
  isFlipped, 
  setIsFlipped,
}) => {
  const handleCardClick = () => {
    setIsFlipped(!isFlipped);
  };

  const getLevelColorClass = (level) => {
    switch (level) {
      case 'سهل': return 'bg-emerald-500/90 text-white';
      case 'متوسط': return 'bg-amber-500/90 text-white';
      case 'صعب': return 'bg-rose-500/90 text-white';
      default: return 'bg-slate-500/90 text-white';
    }
  };

  const levelColorClass = getLevelColorClass(questionLevel);

  const getFontSizeClass = (text) => {
    const length = text.length;
    // Optimized for mobile first
    if (length > 120) return 'text-sm sm:text-base md:text-lg';
    if (length > 85) return 'text-base sm:text-lg md:text-xl';
    if (length > 60) return 'text-lg sm:text-xl md:text-2xl';
    return 'text-xl sm:text-2xl md:text-3xl';
  };

  const activeText = isFlipped ? answer : question;
  const fontSizeClass = getFontSizeClass(activeText);

  return (
    <div className="flex flex-col items-center justify-center w-full px-2 sm:px-0">
      <div
        className={`
          relative w-full max-w-lg h-[22rem] sm:h-[26rem] cursor-pointer rounded-[2.5rem] sm:rounded-[3rem] 
          shadow-[0_15px_40px_rgba(0,0,0,0.15)] overflow-hidden transition-all duration-500 transform-gpu
          hover:scale-[1.01] active:scale-95 border-[6px] sm:border-[8px] border-white/50 backdrop-blur-sm
          ${colorClass}
        `}
        onClick={handleCardClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleCardClick();
          }
        }}
        tabIndex={0}
        role="button"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent pointer-events-none"></div>
        
        <div className="absolute top-6 right-6 sm:top-8 sm:right-8 z-20">
          {questionLevel && (
            <div className={`px-4 py-1 sm:px-5 sm:py-1.5 text-xs sm:text-sm font-black rounded-full shadow-lg backdrop-blur-md border border-white/30 uppercase tracking-widest ${levelColorClass}`}>
              {questionLevel}
            </div>
          )}
        </div>

        <div className="flex flex-col items-center justify-center h-full p-4 sm:p-8 text-center relative z-10"> {/* Adjusted padding */}
          <div className={`w-full transition-all duration-700 ease-out transform ${isFlipped ? 'scale-105' : 'scale-100'}`}>
            {!isFlipped ? (
              <div className="animate-pop flex flex-col items-center w-full">
                <h3 className={`text-white font-bold leading-relaxed sm:leading-[1.6] tracking-tight drop-shadow-xl px-2 text-balance ${fontSizeClass}`}>
                  {question}
                </h3>
              </div>
            ) : (
              <div className="animate-pop flex flex-col items-center w-full">
                <div className="text-3xl sm:text-4xl mb-4 sm:mb-6 drop-shadow-lg">✨</div>
                <h3 className={`text-white font-bold leading-relaxed sm:leading-[1.6] tracking-tight drop-shadow-xl px-2 text-balance ${fontSizeClass}`}>
                  {answer}
                </h3>
              </div>
            )}
          </div>

          <div className="absolute bottom-6 sm:bottom-8 left-0 right-0 flex justify-center z-20"> {/* Adjusted bottom */}
            {!isFlipped ? (
              <div className="bg-white/20 backdrop-blur-md border border-white/40 hover:bg-white/30 px-8 py-3.5 sm:px-10 sm:py-4 rounded-2xl sm:rounded-3xl shadow-md transition-all duration-300 group cursor-pointer">
                <div className="flex items-center gap-2 sm:gap-3">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <p className="text-white text-base sm:text-lg font-bold tracking-wide">اكشف الإجابة</p>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Flashcard;