import React from 'react';

const GooEffectLoader = () => {
  return (
    <div className="relative">
      <svg className="absolute w-0 h-0">
        <filter id="goo">
          <feGaussianBlur in="SourceGraphic" stdDeviation="12" />
          <feColorMatrix
            values="0 0 0 0 0 
                    0 0 0 0 0 
                    0 0 0 0 0 
                    0 0 0 48 -7"
          />
        </filter>
      </svg>
      <div className="w-48 h-12 relative overflow-hidden border-b-8 border-black filter-goo">
        <div className="w-88 h-72 bg-red-500 rounded-full absolute -left-8 -bottom-72 animate-wee1"></div>
        <div className="w-64 h-48 bg-cyan-400 rounded-full absolute -left-16 -bottom-48 animate-wee2"></div>
      </div>
    </div>
  );
};

export default GooEffectLoader;