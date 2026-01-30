
import React from 'react';
import CategorySelector from './components/CategorySelector';
import Flashcard from './components/Flashcard';
import IntroScreen from './components/IntroScreen';
import GameModeSelector from './components/GameModeSelector';
import GameOverModal from './components/GameOverModal';
import FullScoreboardModal from './components/FullScoreboardModal';
import LiveScoreboard from './components/LiveScoreboard';
import { SAMPLE_QUESTIONS } from './data/questions';
import { CATEGORIES } from './constants';

function shuffleArray(array: any[]) {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
}

const App = () => {
  const [showIntroScreen, setShowIntroScreen] = React.useState(true);
  const [showGameModeSelector, setShowGameModeSelector] = React.useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<string | null>(null);
  const [selectedCategoryColor, setSelectedCategoryColor] = React.useState('bg-orange-600');
  const [selectedCategoryName, setSelectedCategoryName] = React.useState('');
  const [selectedCategoryIconSvgPath, setSelectedCategoryIconSvgPath] = React.useState<string | undefined>(undefined);
  const [questions, setQuestions] = React.useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = React.useState(0);
  const [isCardFlipped, setIsCardFlipped] = React.useState(false);
  
  const [selectedDifficulty, setSelectedDifficulty] = React.useState('all'); // 'all' for عشوائي
  const [showDifficultyOptions, setShowDifficultyOptions] = React.useState(false); // New state for dropdown
  const [gameMode, setGameMode] = React.useState<'none' | 'free' | 'competition'>('none');

  const [numPlayers, setNumPlayers] = React.useState(0);
  const [playerNames, setPlayerNames] = React.useState<string[]>([]);
  const [playerScores, setPlayerScores] = React.useState<{ name: string; score: number }[]>([]);
  const [currentPlayerIndex, setCurrentPlayerIndex] = React.useState(0);
  const [winThreshold, setWinThreshold] = React.useState<number | null>(5);
  const [winnerName, setWinnerName] = React.useState<string | null>(null);
  const [showGameOverModal, setShowGameOverModal] = React.useState(false);

  const [allCategoryPlayerScores, setAllCategoryPlayerScores] = React.useState<{ [key: string]: { name: string; score: number }[] }>({});
  const [showFullScoreboardModal, setShowFullScoreboardModal] = React.useState(false);

  React.useEffect(() => {
    const savedPlayerNames = localStorage.getItem('playerNames');
    if (savedPlayerNames) {
      const loadedNames = JSON.parse(savedPlayerNames);
      setPlayerNames(loadedNames);
      setNumPlayers(loadedNames.length);
    }

    const savedWinThreshold = localStorage.getItem('winThreshold');
    if (savedWinThreshold) {
      const val = savedWinThreshold === 'null' ? null : parseInt(savedWinThreshold, 10);
      setWinThreshold(val);
    }

    const savedAllCategoryScores = localStorage.getItem('allCategoryPlayerScores');
    if (savedAllCategoryScores) {
      const loadedScores = JSON.parse(savedAllCategoryScores);
      setAllCategoryPlayerScores(loadedScores);
    }
  }, []);

  const loadQuestions = React.useCallback((categoryId: string, difficulty: string = 'all') => {
    const questionsForCategory = SAMPLE_QUESTIONS[categoryId] || [];
    let filteredQuestions = questionsForCategory;
    if (difficulty !== 'all') {
      filteredQuestions = questionsForCategory.filter(q => q.level === difficulty);
    }
    const shuffledQuestions = shuffleArray(filteredQuestions);
    setQuestions(shuffledQuestions);
    setCurrentQuestionIndex(0);
    setIsCardFlipped(false);
  }, []);

  const handleSelectCategory = (categoryId: string, colorClass: string, name: string) => {
    setSelectedCategoryId(categoryId);
    setSelectedCategoryColor(colorClass);
    setSelectedCategoryName(name);
    const category = CATEGORIES.find(cat => cat.id === categoryId);
    setSelectedCategoryIconSvgPath(category?.iconSvgPath);
    loadQuestions(categoryId, selectedDifficulty);

    if (gameMode === 'competition') {
        const existingCategoryScores = allCategoryPlayerScores[categoryId] || [];
        const updatedPlayerScoresForCategory = playerNames.map(name => {
            const existingScore = existingCategoryScores.find(p => p.name === name);
            return { name, score: existingScore ? existingScore.score : 0 };
        });
        setPlayerScores(updatedPlayerScoresForCategory);
    }
  };

  const advanceTurnAndQuestion = React.useCallback(() => {
    setIsCardFlipped(false);
    setCurrentQuestionIndex(prevIndex => (prevIndex + 1) % (questions.length || 1));
    if (gameMode === 'competition' && playerNames.length > 0) {
      setCurrentPlayerIndex(prevIndex => (prevIndex + 1) % playerNames.length);
    }
  }, [playerNames.length, questions.length, gameMode]);

  const goToPreviousQuestion = React.useCallback(() => {
    setIsCardFlipped(false);
    setCurrentQuestionIndex(prevIndex => (prevIndex - 1 + questions.length) % (questions.length || 1));
    if (gameMode === 'competition' && playerNames.length > 0) {
      setCurrentPlayerIndex(prevIndex => (prevIndex - 1 + playerNames.length) % playerNames.length);
    }
  }, [playerNames.length, questions.length, gameMode]);

  const handleAnswerCorrect = React.useCallback(() => {
    if (gameMode === 'competition' && selectedCategoryId) {
        const currentQuestion = questions[currentQuestionIndex];
        let pointsToAdd = 1;
        if (currentQuestion) {
          switch (currentQuestion.level) {
            case 'سهل': pointsToAdd = 1; break;
            case 'متوسط': pointsToAdd = 2; break;
            case 'صعب': pointsToAdd = 3; break;
          }
        }

        const newScores = [...playerScores];
        if (newScores[currentPlayerIndex]) {
            newScores[currentPlayerIndex].score += pointsToAdd;
            setPlayerScores(newScores);
            
            const updatedAllScores = { ...allCategoryPlayerScores, [selectedCategoryId]: newScores };
            setAllCategoryPlayerScores(updatedAllScores);
            localStorage.setItem('allCategoryPlayerScores', JSON.stringify(updatedAllScores));

            if (winThreshold && newScores[currentPlayerIndex].score >= winThreshold) {
                setWinnerName(newScores[currentPlayerIndex].name);
                setShowGameOverModal(true);
            }
        }
    }
    advanceTurnAndQuestion();
  }, [currentPlayerIndex, winThreshold, advanceTurnAndQuestion, questions, currentQuestionIndex, selectedCategoryId, gameMode, playerScores, allCategoryPlayerScores]);

  const resetToCategories = () => {
    setSelectedCategoryId(null);
    setCurrentQuestionIndex(0);
    setIsCardFlipped(false);
  };

  // Difficulty options for the selector
  const DIFFICULTY_OPTIONS = [
    { id: 'all', name: 'عشوائي', colorClass: 'bg-gray-500/90 text-white' },
    { id: 'سهل', name: 'سهل', colorClass: 'bg-emerald-500/90 text-white' },
    { id: 'متوسط', name: 'متوسط', colorClass: 'bg-amber-500/90 text-white' },
    { id: 'صعب', name: 'صعب', colorClass: 'bg-rose-500/90 text-white' },
  ];

  const handleDifficultySelect = React.useCallback((difficultyId: string) => {
      setSelectedDifficulty(difficultyId);
      if (selectedCategoryId) {
        loadQuestions(selectedCategoryId, difficultyId);
      }
      setShowDifficultyOptions(false);
  }, [loadQuestions, selectedCategoryId]);

  const selectedDifficultyObj = DIFFICULTY_OPTIONS.find(opt => opt.id === selectedDifficulty);


  const currentQuestion = questions[currentQuestionIndex];
  const isScoringMode = gameMode === 'competition';

  return (
    <div className="w-full min-h-screen flex flex-col bg-[#FFF9F0] font-cairo overflow-x-hidden relative">
      {showIntroScreen ? (
        <IntroScreen onStart={() => { setShowIntroScreen(false); setShowGameModeSelector(true); }} />
      ) : showGameModeSelector ? (
        <GameModeSelector 
          onSelectMode={(mode) => { setGameMode(mode); setShowGameModeSelector(false); }} 
          onBack={() => { setShowGameModeSelector(false); setShowIntroScreen(true); }} 
        />
      ) : selectedCategoryId === null ? (
        <CategorySelector
          onSelectCategory={handleSelectCategory}
          selectedCategoryId={selectedCategoryId}
          numPlayers={numPlayers}
          playerNames={playerNames}
          winThreshold={winThreshold}
          gameMode={gameMode}
          onBackToModeSelection={() => setShowGameModeSelector(true)}
          onSavePlayers={(n, names, t) => { setNumPlayers(n); setPlayerNames(names); setWinThreshold(t); localStorage.setItem('playerNames', JSON.stringify(names)); }}
          setShowFullScoreboardModal={setShowFullScoreboardModal}
          onClearAllCompetitionProgress={() => { setPlayerNames([]); setPlayerScores([]); }}
        />
      ) : (
        <div className="flex-1 flex flex-col p-4 sm:p-10 w-full max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-4 sm:mb-6"> {/* Reduced mb */}
            <button onClick={resetToCategories} className="px-5 py-2.5 bg-white border-2 border-gray-100 text-gray-700 font-bold rounded-2xl hover:bg-gray-50 transition-all active:scale-95 shadow-sm">
               ← رجوع
            </button>
            <div className="text-center">
              <h2 className="text-2xl font-black text-gray-900">{selectedCategoryName}</h2>
              <p className="text-gray-500 font-bold text-sm">البطاقة {currentQuestionIndex + 1} من {questions.length}</p>
            </div>
            <div className="w-20"></div>
          </div>

          {/* Difficulty Selector - New Section */}
          <div className="relative w-max mx-auto mb-3 z-30"> {/* Reduced mb */}
            {/* Current Difficulty Display / Toggle Button */}
            <button
              onClick={() => setShowDifficultyOptions(prev => !prev)}
              className={`px-4 py-1.5 text-xs sm:px-5 sm:py-2 sm:text-sm font-black rounded-full shadow-lg backdrop-blur-md border border-white/30 uppercase tracking-widest cursor-pointer transition-all active:scale-95 flex items-center gap-2 ${selectedDifficultyObj?.colorClass}`}
            >
              <span>{selectedDifficultyObj?.name}</span>
              <svg className={`w-4 h-4 transition-transform duration-200 ${showDifficultyOptions ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" /></svg>
            </button>

            {/* Dropdown Options */}
            {showDifficultyOptions && (
              <div className="absolute top-full mt-2 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-lg border border-gray-200 rounded-xl shadow-xl p-2 flex flex-col gap-1 min-w-[140px]">
                {DIFFICULTY_OPTIONS.map((option) => (
                  option.id !== selectedDifficulty && ( // Only show unselected options
                    <button
                      key={option.id}
                      onClick={() => handleDifficultySelect(option.id)}
                      className="w-full text-right px-4 py-2 text-sm font-bold rounded-lg transition-colors hover:bg-gray-100 text-gray-700"
                    >
                      {option.name}
                    </button>
                  )
                ))}
              </div>
            )}
          </div>


          <div className="flex-1 flex items-center justify-center mb-4"> {/* Reduced mb */}
            {currentQuestion && (
              <Flashcard
                question={currentQuestion.question}
                answer={currentQuestion.answer}
                colorClass={selectedCategoryColor}
                questionLevel={currentQuestion.level}
                categoryIconSvgPath={selectedCategoryIconSvgPath}
                isFlipped={isCardFlipped}
                setIsFlipped={setIsCardFlipped}
              />
            )}
          </div>

          {/* Controls - Updated layout and styling based on user request and image */}
          <div className="flex flex-col gap-2 mb-6"> {/* Reduced gap and mb */}
            {/* Row 1: Previous and Next/Correct buttons */}
            <div className="flex justify-center items-stretch sm:items-center gap-2 w-full"> {/* Reduced gap */}
              {/* Next/Correct Button (larger, blue from image) */}
              <button 
                onClick={handleAnswerCorrect}
                className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-6 py-4 bg-blue-600 text-white font-black rounded-[2rem] shadow-[0_8px_15px_rgba(59,130,246,0.3)] hover:bg-blue-500 hover:-translate-y-0.5 transition-all active:translate-y-0.5 active:shadow-none max-w-[240px] text-xl"
              >
                <span>السؤال التالي</span>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={4} d="M13 5l7 7-7 7M5 5l7 7-7 7" /></svg>
              </button>

              {/* Previous Question Button (smaller, next to Next/Correct) */}
              <button 
                onClick={goToPreviousQuestion}
                className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-3 bg-white border-4 border-gray-200 text-gray-600 font-black rounded-2xl hover:border-gray-300 hover:bg-gray-50 transition-all active:scale-90 shadow-md text-sm"
              >
                <span>السابق</span>
              </button>
            </div>

            {/* Row 2: Shuffle Button (below, white with purple icon from image) */}
            <div className="flex justify-center w-full">
              <button 
                onClick={() => loadQuestions(selectedCategoryId, selectedDifficulty)}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-4 bg-white border-4 border-purple-100 text-gray-900 font-black rounded-2xl hover:bg-purple-50 transition-all active:scale-90 shadow-sm max-w-[300px] text-lg"
              >
                <span>خلط الأسئلة</span>
                <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
              </button>
            </div>
          </div>

          {isScoringMode && (
            <LiveScoreboard playerScores={playerScores} currentPlayerIndex={currentPlayerIndex} />
          )}

          <GameOverModal 
            isOpen={showGameOverModal} 
            winnerName={winnerName} 
            onReplay={() => { setPlayerScores(playerNames.map(n => ({name: n, score: 0}))); setShowGameOverModal(false); }} 
            onReturnToMainMenu={resetToCategories} 
          />
          
          <FullScoreboardModal
            isOpen={showFullScoreboardModal}
            onClose={() => setShowFullScoreboardModal(false)}
            playerNames={playerNames}
            allCategoryPlayerScores={allCategoryPlayerScores}
            categories={CATEGORIES}
            winThreshold={winThreshold || 0}
            selectedCategoryIdForGame={selectedCategoryId}
          />
        </div>
      )}
    </div>
  );
};

export default App;