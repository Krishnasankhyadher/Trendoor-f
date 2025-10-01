import React from 'react';

const Loading = () => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm bg-white/30 flex items-center justify-center z-50">
      <div className="flex flex-col items-center">
        <img
          src='/Logo.png'
          alt="Loading..."
          className="animate-pulse hover:animate-none"
          style={{ 
            width: '80px', // Default mobile size
            height: '80px',
            animation: 'zoomInOut 2s infinite ease-in-out'
          }}
        />
        <p className="text-gray-700 mt-4 text-lg font-medium">Please wait...</p>
      </div>
    </div>
  );
};

export default Loading;
