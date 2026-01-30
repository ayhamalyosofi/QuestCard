
import React from 'react';
import { CATEGORIES } from '../constants';
import PlayerSetupModal from './PlayerSetupModal';

const ScoreboardButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-700 text-white font-black rounded-full shadow-lg transition-all active:scale-90 group hover:shadow-xl"
    >
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
      </svg>
      <span className="text-base">لوحة النقاط 🏆</span>
    </button>
  );
};

const CategorySelector = ({
  onSelectCategory,
  selectedCategoryId,
  numPlayers,
  playerNames,
  winThreshold,
  gameMode,
  setShowFullScoreboardModal,
  onBackToModeSelection,
  onSavePlayers,
  onClearAllCompetitionProgress,
}) => {
  const [showPlayersModal, setShowPlayersModal] = React.useState(false);

  const handleInternalSavePlayers = (newNumPlayers, newPlayerNames, newWinThreshold) => {
    onSavePlayers(newNumPlayers, newPlayerNames, newWinThreshold);
    setShowPlayersModal(false);
  };

  const isCompetitionMode = gameMode === 'competition';
  const hasPlayers = numPlayers > 0;

  React.useEffect(() => {
    if (isCompetitionMode && numPlayers === 0 && !showPlayersModal) {
      setShowPlayersModal(true);
    }
  }, [isCompetitionMode, numPlayers, showPlayersModal]);

  return (
    <div className="flex flex-col items-center justify-start p-4 sm:p-10 w-full font-cairo min-h-screen relative overflow-hidden bg-[#FFF9F0]">
      {/* Navbar Section */}
      <div className="w-full max-w-6xl flex items-center justify-between mb-8 sm:mb-12">
        <button
          onClick={onBackToModeSelection}
          className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-gray-100 text-gray-700 font-black rounded-2xl hover:bg-gray-100 transition-all active:scale-90 group shadow-sm z-30"
        >
          <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
          </svg>
          <span className="text-sm">رجوع</span>
        </button>

        <div className="flex items-center gap-2 sm:gap-4">
          {isCompetitionMode && (
            <>
              <button
                onClick={() => setShowPlayersModal(true)}
                className="flex items-center gap-2 px-5 py-2.5 bg-white border-2 border-indigo-100 text-indigo-700 font-black rounded-full shadow-sm hover:shadow-md transition-all active:scale-90"
              >
                <span className="text-sm">{numPlayers > 0 ? `${numPlayers} لاعبين` : 'اللاعبين'}</span>
              </button>
              {hasPlayers && <ScoreboardButton onClick={() => setShowFullScoreboardModal(true)} />}
            </>
          )}
        </div>
      </div>

      {/* Hero Header */}
      <div className="text-center mb-12 sm:mb-16 relative px-4 animate-fade-in">
        <h1 className="text-4xl sm:text-6xl font-black text-gray-900 mb-4 tracking-tight leading-tight">
          ماذا تريد أن تلعب؟ 🤔
        </h1>
        <p className="text-xl sm:text-2xl text-orange-600 font-black">اختر تصنيفاً وابدأ المتعة فوراً!</p>
      </div>

      {/* Grid Section - Matching the Image */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-10 w-full max-w-6xl mb-20 px-2 sm:px-0">
        {CATEGORIES.map(category => {
          const isSelected = selectedCategoryId === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onSelectCategory(category.id, category.colorClass, category.name)}
              className={`
                group relative w-full h-48 sm:h-72 rounded-[2.5rem] sm:rounded-[3.5rem] overflow-hidden
                transition-all duration-300 shadow-[0_15px_30px_rgba(0,0,0,0.1)]
                ${isSelected ? 'scale-[1.05] ring-8 ring-yellow-400 z-20 shadow-[0_25px_50px_rgba(0,0,0,0.2)]' : 'hover:scale-[1.03] active:scale-95'}
                flex items-center justify-center text-center
              `}
              style={{ backgroundColor: 'transparent' }}
            >
              {/* Vibrant Background Layer */}
              <div className={`absolute inset-0 z-0 ${category.colorClass}`}>
                <img 
                  src={category.imageUrl} 
                  className="w-full h-full object-cover opacity-20 mix-blend-overlay" 
                  alt="" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              </div>

              {/* Icon Box - Top Left (Matching Screenshot) */}
              <div className="absolute top-4 right-4 sm:top-8 sm:right-8 z-20 bg-white/20 backdrop-blur-md p-2.5 sm:p-4 rounded-2xl border border-white/30 shadow-lg group-hover:rotate-6 transition-transform">
                 <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                   <path d={category.iconSvgPath} />
                 </svg>
              </div>

              {/* Category Name & Bar (Matching Screenshot) */}
              <div className="relative z-10 flex flex-col items-center">
                <span className="block text-white text-3xl sm:text-5xl lg:text-6xl font-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.4)]">
                  {category.name}
                </span>
                <div className="w-12 sm:w-20 h-1.5 sm:h-2.5 bg-white/40 rounded-full mt-4 sm:mt-6 transition-all group-hover:w-24 sm:group-hover:w-32 group-hover:bg-white"></div>
              </div>

              {/* Selection Mark */}
              {isSelected && (
                <div className="absolute bottom-6 right-6 bg-yellow-400 text-white p-2 rounded-full shadow-lg z-30 animate-pop-up">
                  <svg className="w-5 h-5 sm:w-8 sm:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>

      {isCompetitionMode && (
        <PlayerSetupModal
          isOpen={showPlayersModal}
          onClose={() => setShowPlayersModal(false)}
          onSave={handleInternalSavePlayers}
          initialNumPlayers={numPlayers}
          initialPlayerNames={playerNames}
          initialWinThreshold={winThreshold}
          onExitAndBackToModeSelection={onBackToModeSelection}
          onClearAllProgress={onClearAllCompetitionProgress}
        />
      )}
    </div>
  );
};

export default CategorySelector;
