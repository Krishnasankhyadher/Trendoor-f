import React from 'react';

const Loading = ({ size = 40, color = 'text-indigo-600' }) => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <div 
          className={`animate-spin rounded-full h-${size} w-${size} border-4 border-t-transparent ${color} border-opacity-30`}
          style={{
            borderTopColor: 'transparent',
            borderRightColor: 'currentColor',
            borderBottomColor: 'currentColor',
            borderLeftColor: 'currentColor'
          }}
        ></div>
        <p className="text-gray-700 mt-4 text-sm font-medium">Please wait...</p>
      </div>
    </div>
  );
};

export default Loading;