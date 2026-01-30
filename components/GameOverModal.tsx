import React from 'react';

interface GameOverModalProps {
  isOpen: boolean;
  winnerName: string | null;
  onReplay: () => void;
  onReturnToMainMenu: () => void;
  onContinue?: () => void;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ isOpen, winnerName, onReplay, onReturnToMainMenu, onContinue }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-70 backdrop-blur-lg animate-fade-in">
      <div className="relative bg-gradient-to-br from-white to-indigo-50 rounded-[3rem] p-8 sm:p-12 shadow-2xl border-4 border-indigo-200 max-w-lg w-full text-center animate-pop-up flex flex-col items-center overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-orange-400 via-pink-500 to-purple-600"></div>
        <div className="text-8xl mb-6 animate-bounce">🏆</div>

        <h2 className="text-4xl sm:text-5xl font-black text-gray-900 mb-4 leading-tight">
          كفو يا <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-purple-600">{winnerName}!</span>
        </h2>
        
        <p className="text-xl text-gray-600 font-bold mb-10 leading-relaxed">
          لقد حققت الهدف بنجاح وأثبتّ جدارتك في هذا التحدي! 🥳
        </p>

        <div className="flex flex-col gap-4 w-full">
          <button
            onClick={onReplay}
            className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-indigo-600 to-blue-700 text-white font-black rounded-3xl shadow-lg hover:shadow-xl hover:scale-105 transition-all active:scale-95 group"
          >
            <span>لعبة جديدة (تصفير)</span>
            <svg className="w-6 h-6 group-hover:rotate-180 transition-transform duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>

          {onContinue && (
            <button
              onClick={onContinue}
              className="w-full flex items-center justify-center gap-3 px-8 py-5 bg-white border-2 border-emerald-500 text-emerald-600 font-black rounded-3xl shadow-sm hover:bg-emerald-50 transition-all active:scale-95 group"
            >
              <span>استكمال اللعب (تحديد باقي المراكز)</span>
              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
              </svg>
            </button>
          )}

          <button
            onClick={onReturnToMainMenu}
            className="w-full flex items-center justify-center gap-3 px-8 py-4 bg-gray-100 text-gray-500 font-bold rounded-2xl hover:bg-gray-200 transition-all active:scale-95"
          >
            <span>العودة للتصنيفات</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameOverModal;