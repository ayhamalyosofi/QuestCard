import React from 'react';

const PlayerSetupModal = ({
  isOpen,
  onClose,
  onSave,
  initialNumPlayers,
  initialPlayerNames,
  initialWinThreshold,
  onExitAndBackToModeSelection,
  onClearAllProgress,
}) => {
  const [currentPlayerNames, setCurrentPlayerNames] = React.useState(initialPlayerNames);
  // Using 0 as a flag for "Unlimited"
  const [currentWinThreshold, setCurrentWinThreshold] = React.useState(initialWinThreshold === null ? 0 : initialWinThreshold);
  const [isValid, setIsValid] = React.useState(false);

  const intervalRef = React.useRef(null);
  const timeoutRef = React.useRef(null);

  React.useEffect(() => {
    if (isOpen) {
      if (initialPlayerNames.length === 0 && initialNumPlayers === 0) {
        setCurrentPlayerNames(['']);
      } else {
        const namesToDisplay = initialPlayerNames.length > 0 ? initialPlayerNames : Array(initialNumPlayers || 1).fill('');
        setCurrentPlayerNames(namesToDisplay);
      }
      setCurrentWinThreshold(initialWinThreshold === null ? 0 : initialWinThreshold);
    }
  }, [isOpen, initialPlayerNames, initialNumPlayers, initialWinThreshold]);

  React.useEffect(() => {
    const numPlayers = currentPlayerNames.filter(name => name.trim() !== '').length;
    const allNamesFilled = numPlayers === 0 || currentPlayerNames.every(name => name.trim() !== '');
    const validNumPlayers = numPlayers >= 0 && numPlayers <= 10;
    // 0 means unlimited, or between 5 and 100
    const validWinThreshold = currentWinThreshold === 0 || (currentWinThreshold >= 5 && currentWinThreshold <= 100);
    
    setIsValid(allNamesFilled && validNumPlayers && validWinThreshold);
  }, [currentPlayerNames, currentWinThreshold]);

  const handlePlayerNameChange = (index, e) => {
    const newNames = [...currentPlayerNames];
    newNames[index] = e.target.value;
    setCurrentPlayerNames(newNames);
  };

  const handleAddPlayer = () => {
    if (currentPlayerNames.length < 10) {
      setCurrentPlayerNames(prevNames => [...prevNames, '']);
    }
  };

  const handleRemovePlayer = (indexToRemove) => {
    if (currentPlayerNames.length > 0) {
      setCurrentPlayerNames(prevNames => prevNames.filter((_, index) => index !== indexToRemove));
    }
  };

  const handleWinThresholdIncrement = React.useCallback(() => {
    setCurrentWinThreshold(prev => {
        if (prev === 0) return 5;
        return Math.min(100, prev + 1);
    });
  }, []);

  const handleWinThresholdDecrement = React.useCallback(() => {
    setCurrentWinThreshold(prev => {
        if (prev <= 5) return 0; // Go to unlimited if below 5
        return prev - 1;
    });
  }, []);

  const startPressing = React.useCallback((type) => {
      if (type === 'plus') {
          handleWinThresholdIncrement();
      } else {
          handleWinThresholdDecrement();
      }

      timeoutRef.current = setTimeout(() => {
          intervalRef.current = setInterval(() => {
              if (type === 'plus') {
                  handleWinThresholdIncrement();
              } else {
                  handleWinThresholdDecrement();
              }
          }, 100);
      }, 300);
  }, [handleWinThresholdIncrement, handleWinThresholdDecrement]);

  const stopPressing = React.useCallback(() => {
      if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
      }
      if (intervalRef.current) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;
      }
  }, []);

  React.useEffect(() => {
      return () => {
          if (timeoutRef.current) {
              clearTimeout(timeoutRef.current);
          }
          if (intervalRef.current) {
              clearInterval(intervalRef.current);
          }
      };
  }, []);

  const handleSave = () => {
    if (isValid) {
      const namesToSave = currentPlayerNames.filter(name => name.trim() !== '');
      // Save 0 as null or 0 for unlimited
      onSave(namesToSave.length, namesToSave, currentWinThreshold === 0 ? null : currentWinThreshold);
    }
  };

  if (!isOpen) return null;

  const currentTotalPlayerInputs = currentPlayerNames.length;
  const canAddPlayer = currentTotalPlayerInputs < 10;
  const canRemovePlayer = currentTotalPlayerInputs > 0;
  const areAllCurrentNamesFilled = currentPlayerNames.every(name => name.trim() !== '');
  const showFillNamesWarning = currentTotalPlayerInputs > 0 && !areAllCurrentNamesFilled;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-md animate-fade-in">
      <div className="relative bg-gradient-to-br from-white to-gray-50 backdrop-blur-xl rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-2xl border-2 sm:border-4 border-orange-200 max-w-xl w-full max-h-[90vh] overflow-y-auto hide-scrollbar text-center animate-pop-up flex flex-col items-center">
        
        <div className="w-full mb-6">
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2 leading-tight">إعدادات المنافسة 🎮</h2>
          <p className="text-gray-500 font-bold text-sm">حدد اللاعبين وهدف الفوز</p>
        </div>
        
        <div className="w-full mb-6 bg-orange-50/50 p-4 sm:p-6 rounded-3xl border border-orange-100">
          <label htmlFor="winThreshold" className="block text-lg font-bold text-gray-800 mb-3 text-center">
            نقاط الوصول للفوز:
          </label>
          <div className="flex items-center justify-center gap-4 sm:gap-6">
            <button
              onMouseDown={() => startPressing('minus')}
              onMouseUp={stopPressing}
              onMouseLeave={stopPressing}
              onTouchStart={() => startPressing('minus')}
              onTouchEnd={stopPressing}
              className="p-3 rounded-full bg-orange-200 text-orange-700 hover:bg-orange-300 transition-all active:scale-90 shadow-sm text-2xl font-black w-12 h-12 flex items-center justify-center"
            >
              -
            </button>
            
            <div className="flex flex-col items-center min-w-[100px]">
                <span className={`text-4xl sm:text-5xl font-black transition-colors ${currentWinThreshold === 0 ? 'text-indigo-600' : 'text-orange-600'}`}>
                    {currentWinThreshold === 0 ? '∞' : currentWinThreshold}
                </span>
                <span className="text-[10px] sm:text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">
                    {currentWinThreshold === 0 ? 'لعب بلا نهاية' : 'نقطة للفوز'}
                </span>
            </div>

            <button
              onMouseDown={() => startPressing('plus')}
              onMouseUp={stopPressing}
              onMouseLeave={stopPressing}
              onTouchStart={() => startPressing('plus')}
              onTouchEnd={stopPressing}
              disabled={currentWinThreshold >= 100}
              className={`p-3 rounded-full text-orange-700 transition-all active:scale-90 shadow-sm text-2xl font-black w-12 h-12 flex items-center justify-center
                          ${currentWinThreshold < 100 ? 'bg-orange-200 hover:bg-orange-300' : 'bg-gray-200 cursor-not-allowed opacity-50'}`}
            >
              +
            </button>
          </div>
        </div>

        <h3 className="text-xl font-bold text-gray-800 mb-3">أسماء اللاعبين</h3>

        <div className="grid grid-cols-1 gap-2.5 mb-5 w-full">
          {currentPlayerNames.map((name, index) => (
            <div key={index} className="flex items-center gap-2 group">
              <input
                type="text"
                placeholder={`اللاعب ${index + 1}`}
                value={name}
                onChange={(e) => handlePlayerNameChange(index, e)}
                className="flex-1 p-3.5 sm:p-4 rounded-xl border-2 border-blue-50 focus:outline-none focus:ring-4 focus:ring-blue-200 bg-white text-gray-800 font-bold shadow-sm transition-all text-right text-sm sm:text-base"
              />
              <button
                onClick={() => handleRemovePlayer(index)}
                disabled={!canRemovePlayer}
                className={`p-3 rounded-xl text-white transition-all active:scale-90 shadow-sm ${canRemovePlayer ? 'bg-rose-400 hover:bg-rose-500' : 'bg-gray-200 opacity-50'}`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        {canAddPlayer && (
          <button
            onClick={handleAddPlayer}
            className="flex items-center justify-center gap-2 px-6 py-2.5 mb-6 bg-blue-50 text-blue-600 font-bold rounded-xl hover:bg-blue-100 transition-all active:scale-95 border border-blue-200 border-dashed text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M12 4v16m8-8H4" />
            </svg>
            <span>إضافة لاعب ({currentTotalPlayerInputs}/10)</span>
          </button>
        )}
        
        {showFillNamesWarning && (
          <p className="text-red-500 text-xs mb-4 font-bold">الرجاء إدخال أسماء جميع اللاعبين!</p>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3 w-full pt-2 border-t border-gray-100">
          <div className="flex gap-2 flex-1">
            <button
              onClick={onClearAllProgress}
              className="flex-1 px-4 py-3 bg-red-50 text-red-600 text-sm font-bold rounded-xl hover:bg-red-100 transition-all active:scale-95"
            >
              تصفير 🗑️
            </button>
            <button
              onClick={onExitAndBackToModeSelection}
              className="flex-1 px-4 py-3 bg-gray-100 text-gray-600 text-sm font-bold rounded-xl hover:bg-gray-200 transition-all active:scale-95"
            >
              الرجوع
            </button>
          </div>
          <button
            onClick={handleSave}
            disabled={!isValid}
            className={`flex-[1.5] px-8 py-3.5 text-white font-black rounded-xl shadow-lg transition-all text-base
              ${isValid ? 'bg-indigo-600 hover:bg-indigo-700 scale-100 active:scale-95' : 'bg-gray-300 cursor-not-allowed opacity-50'}`}
          >
            حفظ واستمرار ✅
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlayerSetupModal;