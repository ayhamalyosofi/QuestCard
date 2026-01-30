import React from 'react';
import { CATEGORIES } from '../constants';

interface FullScoreboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  playerNames: string[];
  allCategoryPlayerScores: { [key: string]: { name: string; score: number }[] };
  categories: typeof CATEGORIES;
  winThreshold: number;
  selectedCategoryIdForGame: string | null;
}

const FullScoreboardModal: React.FC<FullScoreboardModalProps> = ({
  isOpen,
  onClose,
  playerNames,
  allCategoryPlayerScores,
  categories,
  winThreshold,
  selectedCategoryIdForGame,
}) => {
  const [selectedCategoryForScoreboard, setSelectedCategoryForScoreboard] = React.useState<string | null>(null);

  const hasAnyPlayerScoredOverall = React.useMemo(() => {
    if (Object.keys(allCategoryPlayerScores).length === 0 || playerNames.length === 0) return false;
    for (const categoryId in allCategoryPlayerScores) {
      if (allCategoryPlayerScores[categoryId].some(playerScore => playerScore.score > 0)) {
        return true;
      }
    }
    return false;
  }, [allCategoryPlayerScores, playerNames]);

  const displayableOptions = React.useMemo(() => {
    const options: { id: string; name: string; iconSvgPath?: string }[] = [];

    if (hasAnyPlayerScoredOverall) {
      options.push({ id: 'all', name: 'جميع التصنيفات' });
    }

    const filteredActualCategories = categories.filter(category => {
      const categoryScores = allCategoryPlayerScores[category.id];
      if (!categoryScores) return false;
      return categoryScores.some(playerScore => playerScore.score > 0);
    });

    options.push(...filteredActualCategories);
    return options;
  }, [categories, allCategoryPlayerScores, hasAnyPlayerScoredOverall]);

  React.useEffect(() => {
    if (isOpen) {
      if (selectedCategoryIdForGame && displayableOptions.some(opt => opt.id === selectedCategoryIdForGame)) {
        setSelectedCategoryForScoreboard(selectedCategoryIdForGame);
      } 
      else if (hasAnyPlayerScoredOverall) {
        setSelectedCategoryForScoreboard('all');
      } 
      else if (displayableOptions.length > 0) {
        setSelectedCategoryForScoreboard(displayableOptions[0].id);
      } 
      else {
        setSelectedCategoryForScoreboard(null);
      }
    }
  }, [isOpen, selectedCategoryIdForGame, displayableOptions, hasAnyPlayerScoredOverall]);

  if (!isOpen) return null;

  let scoresForSelectedCategory: { name: string; score: number }[] = [];

  if (selectedCategoryForScoreboard === 'all') {
    const aggregatedScores = new Map<string, number>();
    playerNames.forEach(name => aggregatedScores.set(name, 0));

    for (const categoryId in allCategoryPlayerScores) {
      allCategoryPlayerScores[categoryId].forEach(playerScore => {
        if (aggregatedScores.has(playerScore.name)) {
          aggregatedScores.set(playerScore.name, aggregatedScores.get(playerScore.name)! + playerScore.score);
        } else {
          aggregatedScores.set(playerScore.name, playerScore.score);
        }
      });
    }
    scoresForSelectedCategory = Array.from(aggregatedScores.entries()).map(([name, score]) => ({ name, score }));

  } else if (selectedCategoryForScoreboard) {
    scoresForSelectedCategory = allCategoryPlayerScores[selectedCategoryForScoreboard] || [];
  }

  const finalDisplayScores = playerNames.map(name => {
    const scoreEntry = scoresForSelectedCategory.find(s => s.name === name);
    return { name, score: scoreEntry ? scoreEntry.score : 0 };
  });

  finalDisplayScores.sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative bg-white rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-2xl border-2 sm:border-4 border-orange-200 w-full max-w-2xl max-h-[90vh] text-center animate-pop-up flex flex-col items-center">
        
        {/* Header Row - Fixed the overlap by using flex and better padding */}
        <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-gray-100">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95 group shadow-sm shrink-0"
          >
            <svg className="w-4 h-4 sm:w-5 sm:h-5 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm sm:text-base">رجوع</span>
          </button>

          <h2 className="text-xl sm:text-3xl font-black text-gray-900 flex-1 truncate px-2">
            لوحة النقاط 🏆
          </h2>

          <div className="w-16 sm:w-20 shrink-0"></div> {/* Spacer for symmetry */}
        </div>
        
        <div className="w-full mb-6">
          <p className="text-base sm:text-lg text-gray-600 font-bold">
            الهدف للفوز: <span className="font-extrabold text-orange-600">{winThreshold || '∞'}</span> نقطة
          </p>
        </div>

        <div className="w-full mb-8">
          <select
            id="categorySelector"
            className="w-full max-w-xs mx-auto p-3.5 rounded-2xl border-2 border-indigo-50 focus:outline-none focus:ring-4 focus:ring-indigo-100 bg-white text-gray-800 font-bold shadow-sm transition-all text-center cursor-pointer text-sm sm:text-base"
            value={selectedCategoryForScoreboard || ''}
            onChange={(e) => setSelectedCategoryForScoreboard(e.target.value)}
            disabled={displayableOptions.length === 0}
          >
            {displayableOptions.length === 0 ? (
                <option value="">لا توجد تصنيفات بنقاط</option>
            ) : (
                displayableOptions.map(category => (
                    <option key={category.id} value={category.id}>
                        {category.name}
                    </option>
                ))
            )}
          </select>
        </div>

        <div className="flex-1 w-full max-w-lg overflow-y-auto custom-scrollbar px-1 py-2">
          {finalDisplayScores.length > 0 ? (
            <div className="flex flex-col gap-3">
              {finalDisplayScores.map((score, index) => (
                <div 
                  key={score.name}
                  className={`flex justify-between items-center p-4 rounded-2xl transition-all duration-300 border-2 
                    ${index === 0 && score.score > 0 ? 'bg-indigo-50 border-indigo-200 scale-102 shadow-md' : 'bg-gray-50/50 border-gray-100'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full text-xs font-black ${index === 0 ? 'bg-yellow-400 text-white' : 'bg-gray-200 text-gray-500'}`}>
                      {index + 1}
                    </span>
                    <span className={`text-lg sm:text-xl font-black ${index === 0 ? 'text-indigo-900' : 'text-gray-700'}`}>
                      {score.name}
                    </span>
                  </div>
                  <span className={`text-2xl sm:text-3xl font-extrabold ${index === 0 ? 'text-indigo-600' : 'text-gray-400'}`}>
                    {score.score}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4 py-10 opacity-30">
              <span className="text-6xl">📊</span>
              <p className="text-lg font-bold">لا توجد نتائج لهذا التصنيف</p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-8 w-full max-w-xs px-10 py-4 bg-gray-900 text-white font-black rounded-2xl shadow-xl hover:bg-black transition-all active:scale-95"
        >
          فهمت! 👍
        </button>
      </div>
    </div>
  );
};

export default FullScoreboardModal;