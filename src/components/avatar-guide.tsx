"use client"

import React from 'react';

const AvatarGuide = () => {
  const [showGuide, setShowGuide] = React.useState(false);
  const [tourStep, setTourStep] = React.useState(0);
  const [tourSteps, setTourSteps] = React.useState([
    { title: 'Step 1', message: 'This is the first step of the guide' },
    { title: 'Step 2', message: 'This is the second step of the guide' },
    { title: 'Step 3', message: 'This is the third step of the guide' },
  ]);

  return (
    <div className="fixed bottom-4 sm:bottom-8 left-4 sm:left-8 z-50">
      <div className="relative">
        <button
          onClick={() => setShowGuide(true)}
          className="w-12 h-12 sm:w-16 sm:h-16 rounded-full bg-blue-600 text-white
            flex items-center justify-center shadow-lg hover:shadow-xl
            transition-all duration-300 hover:scale-105"
        >
          <Bot className="w-6 h-6 sm:w-8 sm:h-8" />
        </button>

        {showGuide && (
          <div className="absolute bottom-full left-0 mb-4 w-64 sm:w-72
            bg-white rounded-lg shadow-xl p-4 sm:p-5 animate-in fade-in slide-in-from-bottom-5">
            <button
              onClick={() => setShowGuide(false)}
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
            
            <div className="flex items-start gap-3 sm:gap-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-blue-100 
                flex items-center justify-center flex-shrink-0">
                <Bot className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-semibold mb-1 sm:mb-2">
                  {tourSteps[tourStep].title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {tourSteps[tourStep].message}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AvatarGuide; 