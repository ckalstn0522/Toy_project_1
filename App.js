import React, { useState, useEffect } from 'react';
import { Trophy, RotateCcw } from 'lucide-react';

const CoinFlipGame = () => {
  const [isFlipping, setIsFlipping] = useState(false);
  const [result, setResult] = useState(null); // 'front' or 'back'
  const [prediction, setPrediction] = useState(null);
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [message, setMessage] = useState('앞면 또는 뒷면을 선택하세요!');

  // 동전 던지기 실행
  const flipCoin = (selectedSide) => {
    if (isFlipping) return;

    setPrediction(selectedSide);
    setIsFlipping(true);
    setMessage('동전을 던지는 중...');

    // 1초 후 결과 도출 (애니메이션 효과를 위해 지연)
    setTimeout(() => {
      const sides = ['front', 'back'];
      const newResult = sides[Math.floor(Math.random() * sides.length)];
      
      setResult(newResult);
      setIsFlipping(false);

      if (selectedSide === newResult) {
        const newScore = score + 1;
        setScore(newScore);
        if (newScore > highScore) setHighScore(newScore);
        setMessage('정답입니다! 🎉');
      } else {
        setScore(0);
        setMessage('아쉽네요, 다시 도전해보세요!');
      }
    }, 1000);
  };

  const resetGame = () => {
    setScore(0);
    setResult(null);
    setPrediction(null);
    setMessage('앞면 또는 뒷면을 선택하세요!');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 p-4 font-sans text-slate-800">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl p-8 text-center">
        <h1 className="text-2xl font-bold mb-2">동전 맞추기 게임</h1>
        <p className="text-slate-500 mb-8">{message}</p>

        {/* 점수판 */}
        <div className="flex justify-around mb-10 bg-slate-100 p-4 rounded-2xl">
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">현재 연승</p>
            <p className="text-2xl font-bold text-blue-600">{score}</p>
          </div>
          <div className="border-r border-slate-200"></div>
          <div>
            <p className="text-xs text-slate-400 uppercase tracking-wider">최고 기록</p>
            <p className="text-2xl font-bold text-amber-500">{highScore}</p>
          </div>
        </div>

        {/* 동전 영역 */}
        <div className="relative h-48 flex items-center justify-center mb-12">
          <div className={`
            w-32 h-32 rounded-full border-8 border-amber-400 bg-amber-100
            flex items-center justify-center text-4xl shadow-lg transition-all duration-1000
            ${isFlipping ? 'animate-bounce' : ''}
            ${result === 'front' ? 'bg-amber-400' : result === 'back' ? 'bg-slate-300 border-slate-400' : ''}
          `}>
            {isFlipping ? '?' : result === 'front' ? '🥇' : result === 'back' ? '🥈' : '💰'}
          </div>
        </div>

        {/* 선택 버튼 */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          <button
            onClick={() => flipCoin('front')}
            disabled={isFlipping}
            className={`py-4 rounded-2xl font-bold transition-all ${
              prediction === 'front' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200'
            } disabled:opacity-50`}
          >
            앞면 선택
          </button>
          <button
            onClick={() => flipCoin('back')}
            disabled={isFlipping}
            className={`py-4 rounded-2xl font-bold transition-all ${
              prediction === 'back' ? 'bg-blue-600 text-white' : 'bg-slate-100 hover:bg-slate-200'
            } disabled:opacity-50`}
          >
            뒷면 선택
          </button>
        </div>

        <button 
          onClick={resetGame}
          className="flex items-center justify-center w-full text-slate-400 hover:text-slate-600 transition-colors"
        >
          <RotateCcw size={16} className="mr-2" />
          점수 초기화
        </button>
      </div>
      
      <footer className="mt-8 text-slate-400 text-sm">
        바이브코딩으로 제작된 MVP 모델
      </footer>
    </div>
  );
};

export default CoinFlipGame;