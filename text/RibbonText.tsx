import React, { useState, useEffect } from 'react';

const FloatingRibbonText = () => {
  const [text, setText] = useState('Award Winning');
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(prev => !prev);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Floating Ribbon Text Animation</h1>
      <div className="relative">
        <style>{`
          @keyframes float {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            25% { transform: translateY(-10px) rotate(-2deg); }
            50% { transform: translateY(-5px) rotate(2deg); }
            75% { transform: translateY(-10px) rotate(-2deg); }
          }
          @keyframes wave {
            0%, 100% { transform: translateX(0) skewX(0deg); }
            50% { transform: translateX(5px) skewX(10deg); }
          }
          .animate-float {
            animation: float 3s ease-in-out infinite;
            display: inline-block;
          }
          .ribbon-wave span {
            display: inline-block;
            animation: wave 3s ease-in-out infinite;
            animation-delay: calc(var(--i) * 0.1s);
          }
        `}</style>
        <div
          className={`text-6xl font-bold text-white transition-all duration-1000 ease-in-out transform ${
            isAnimating ? 'animate-float' : ''
          } ribbon-wave`}
          style={{
            textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          }}
        >
          {text.split('').map((char, index) => (
            <span key={index} style={{ '--i': index } as React.CSSProperties}>
              {char}
            </span>
          ))}
        </div>
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center">
          <div className="w-full h-1 bg-white opacity-50"></div>
        </div>
      </div>
      <div className="mt-8">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="px-4 py-2 rounded-lg border border-white text-white bg-transparent focus:outline-none focus:ring-2 focus:ring-white"
          placeholder="Enter your text"
        />
      </div>
    </div>
  );
};

export default FloatingRibbonText;
