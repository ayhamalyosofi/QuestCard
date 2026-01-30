import React from 'react';

interface LiveScoreboardProps {
  playerScores: { name: string; score: number }[];
  currentPlayerIndex: number;
}

const LiveScoreboard: React.FC<LiveScoreboardProps> = ({ playerScores, currentPlayerIndex }) => {
  if (!playerScores || playerScores.length === 0) return null;

  const rankedPlayers = [...playerScores]
    .map((p, idx) => ({ ...p, originalIndex: idx }))
    .sort((a, b) => b.score - a.score);

  return (
    <div className="fixed bottom-3 left-0 right-0 z-40 w-full px-3 sm:px-4 animate-fade-in-up">
      <div className="max-w-xl mx-auto bg-white/95 backdrop-blur-xl border border-indigo-50 shadow-2xl rounded-2xl sm:rounded-[2rem] p-2 sm:p-3 flex items-center gap-2 overflow-x-auto hide-scrollbar">
        <div className="flex items-center gap-1.5 px-2 py-1 shrink-0 border-l border-gray-100">
          <span className="text-lg">📊</span>
        </div>
        
        <div className="flex items-center gap-2 py-1">
          {rankedPlayers.map((player, rank) => (
            <div 
              key={player.name}
              className={`
                flex items-center gap-1.5 px-3 py-1.5 rounded-xl transition-all duration-500 shrink-0
                ${player.originalIndex === currentPlayerIndex ? 'bg-indigo-600 text-white shadow-md animate-float-soft' : 'bg-gray-50 text-gray-600'}
                ${rank === 0 ? 'border border-yellow-300' : 'border border-transparent'}
              `}
            >
              <span className={`font-black text-[10px] ${player.originalIndex === currentPlayerIndex ? 'text-white/70' : 'text-gray-400'}`}>#{rank + 1}</span>
              <span className="font-bold text-xs sm:text-sm whitespace-nowrap">{player.name}</span>
              <span className={`font-black text-xs px-1.5 py-0.5 rounded ${player.originalIndex === currentPlayerIndex ? 'bg-white/20' : 'bg-indigo-50 text-indigo-600'}`}>
                {player.score}
              </span>
              {rank === 0 && <span className="text-xs">👑</span>}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LiveScoreboard;