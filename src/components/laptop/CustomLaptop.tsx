import React, { useState, useEffect, useRef } from 'react';

const CustomLaptop = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedKey, setHighlightedKey] = useState('');
  const keyboardRef = useRef(null);

  // Toggle laptop open/closed
  const toggleLaptop = () => {
    setIsOpen(!isOpen);
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e:any) => {
      if (isOpen) {
        const key = e.key.toLowerCase();
        setHighlightedKey(key);
      }
    };

    const handleKeyUp = () => {
      setHighlightedKey('');
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen]);

  // Keys layout
  const keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['z', 'x', 'c', 'v', 'b', 'n', 'm']
  ];

  // Determine if key should be highlighted
  const isKeyHighlighted = (key:any) => {
    return key === highlightedKey;
  };

  return (
    <div className="flex items-center justify-center w-full h-96 pt-32">
      <div 
        className="relative w-96"
        style={{ 
          perspective: '1500px',
          height: '300px'
        }}
      >
        {/* MacBook Base - This stays fixed */}
        <div 
          className="absolute w-full bg-gray-200 rounded-b-lg shadow-lg"
          style={{ 
            height: '20px',
            bottom: '0',
            zIndex: 1,
            transformStyle: 'preserve-3d'
          }}
        >
          {/* Base top surface */}
          <div className="absolute w-full bg-gray-300 rounded-t" style={{ height: '1px', top: '0' }}></div>
          
          {/* Base sides for 3D effect */}
          <div className="absolute w-full bg-gray-400" style={{ height: '20px', transformOrigin: 'top', transform: 'rotateX(-90deg)' }}></div>
        </div>

        {/* Keyboard Deck - Visible only when open */}
        {isOpen && (
          <div 
            className="absolute w-full bg-gray-800 rounded-t-lg shadow-lg"
            style={{ 
              height: '120px',
              bottom: '20px',
              zIndex: 2,
              transformStyle: 'preserve-3d'
            }}
          >
            {/* Keyboard area */}
            <div 
              ref={keyboardRef}
              className="w-full h-full p-3 flex flex-col justify-center items-center"
            >
              {/* Trackpad */}
              <div className="w-32 h-12 bg-gray-700 rounded-lg mb-3"></div>
              
              {/* Keyboard */}
              <div className="w-full mx-auto">
                {keyboardRows.map((row, rowIndex) => (
                  <div key={rowIndex} className="flex justify-center mb-1">
                    {row.map((key) => (
                      <div
                        key={key}
                        className={`w-6 h-6 mx-0.5 flex items-center justify-center rounded text-xs ${
                          isKeyHighlighted(key) 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-700 text-gray-300'
                        } hover:bg-gray-600 transition-colors`}
                      >
                        {key}
                      </div>
                    ))}
                  </div>
                ))}
                {/* Enter key */}
                <div className="flex justify-end mt-1 mr-2">
                  <div 
                    className={`w-16 h-6 flex items-center justify-center rounded text-xs ${
                      isKeyHighlighted('enter') 
                        ? 'bg-blue-500 text-white' 
                        : 'bg-gray-700 text-gray-300'
                    } hover:bg-gray-600 transition-colors`}
                  >
                    enter
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Screen - This rotates */}
        <div 
          className="absolute w-full bg-gray-300 rounded-t-lg shadow-lg cursor-pointer"
          style={{ 
            height: '140px',
            bottom: isOpen ? '140px' : '20px',
            transform: isOpen ? 'rotateX(-80deg)' : 'rotateX(0)',
            transformOrigin: 'bottom',
            transition: 'all 0.7s ease-in-out',
            zIndex: 3,
            transformStyle: 'preserve-3d'
          }}
          onClick={toggleLaptop}
        >
          {/* Screen border */}
          <div className="w-full h-full bg-gray-800 m-auto border-8 border-gray-300 flex items-center justify-center">
            {!isOpen ? (
              // Closed state - Apple logo
              <div className="w-12 h-12 rounded-full bg-transparent relative">
                <svg viewBox="0 0 24 24" className="w-12 h-12 text-gray-200 opacity-70">
                  <path 
                    fill="currentColor" 
                    d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" 
                  />
                </svg>
                <div className="absolute bottom-0 w-full h-1/3 bg-gradient-to-t from-blue-400 to-transparent opacity-50 animate-pulse"></div>
              </div>
            ) : (
              // Open state - Screen content
              <div className="w-full h-full bg-gradient-to-b from-blue-800 to-blue-900 flex flex-col items-center justify-center">
                <div className="text-white text-lg font-bold mb-2">MacBook</div>
                {highlightedKey && (
                  <div className="text-4xl font-bold text-white animate-bounce">
                    {highlightedKey === 'enter' ? '↵' : highlightedKey}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Back of screen - visible when open */}
        {isOpen && (
          <div 
            className="absolute w-full bg-gray-400 rounded-t-lg"
            style={{ 
              height: '140px',
              bottom: '140px',
              transform: 'rotateX(-80deg) translateZ(-2px)',
              transformOrigin: 'bottom',
              zIndex: 2
            }}
          >
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-gray-500">
                  <path 
                    fill="currentColor" 
                    d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" 
                  />
                </svg>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomLaptop;