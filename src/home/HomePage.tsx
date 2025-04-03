"use client";
import React, { useState, useEffect } from 'react';

const HomePage = () => {
  const [pressedKey, setPressedKey] = useState<string | null>(null);
  const [displayText, setDisplayText] = useState<string>("Enter your agent name:");
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [agentName, setAgentName] = useState<string>("");
  const [missionStarted, setMissionStarted] = useState<boolean>(false);
  const [planePosition, setPlanePosition] = useState<number>(-100);
  const [showMissionText, setShowMissionText] = useState<boolean>(false);

  // Create alphabet keys array
  const alphabet = "QWERTYUIOPASDFGHJKLZXCVBNM".split("");

  // Group keys by keyboard rows
  const keyboardRows = [
    alphabet.slice(0, 10),  // QWERTYUIOP
    alphabet.slice(10, 19), // ASDFGHJKL
    alphabet.slice(19, 26)  // ZXCVBNM
  ];

  const handleKeyPress = (key: string) => {
    setPressedKey(key);

    if (key === "Enter") {
      if (!missionStarted && agentName.length > 0) {
        setMissionStarted(true);
        setDisplayText("");

        // Start plane animation
        const screenWidth = 640; // 40rem = 640px
        const animationDuration = 3000; // 3 seconds
        const fps = 60;
        const steps = animationDuration / (1000 / fps);
        const stepSize = (screenWidth + 100) / steps;
        let position = -100;

        const animationInterval = setInterval(() => {
          position += stepSize;
          setPlanePosition(position);

          if (position > screenWidth) {
            clearInterval(animationInterval);
            setShowMissionText(true);

            window.location.href = "/0armaan025";


          }


        }, 1000 / fps);
      }
    } else if (!missionStarted) {
      setAgentName(prev => key === "Backspace" ? prev.slice(0, -1) : prev + key);
      setDisplayText("Enter your agent name: " + (key === "Backspace" ? agentName.slice(0, -1) : agentName + key));
    }

    // Reset after animation
    setTimeout(() => {
      setPressedKey(null);
    }, 150);
  };

  // Add keyboard event listener for physical keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();

      if (alphabet.includes(key)) {
        setPressedKey(key);
        if (!missionStarted) {
          setAgentName(prev => prev + key);
          setDisplayText("Enter your agent name: " + (agentName + key));
        }

        setTimeout(() => {
          setPressedKey(null);
        }, 150);
      } else if (e.key === "Enter") {
        setPressedKey("Enter");
        if (!missionStarted && agentName.length > 0) {
          setMissionStarted(true);
          setDisplayText("");

          // Start plane animation
          const screenWidth = 640; // 40rem = 640px
          const animationDuration = 3000; // 3 seconds
          const fps = 60;
          const steps = animationDuration / (1000 / fps);
          const stepSize = (screenWidth + 100) / steps;
          let position = -100;

          const animationInterval = setInterval(() => {
            position += stepSize;
            setPlanePosition(position);

            if (position > screenWidth) {
              clearInterval(animationInterval);
              setShowMissionText(true);
            }
          }, 1000 / fps);
        }

        setTimeout(() => {
          setPressedKey(null);
        }, 150);
      } else if (e.key === "Backspace") {
        if (!missionStarted && agentName.length > 0) {
          setAgentName(prev => prev.slice(0, -1));
          setDisplayText("Enter your agent name: " + agentName.slice(0, -1));
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [alphabet, agentName, missionStarted]);

  const renderKey = (key: string, type: string = "normal", width: string = "w-10") => {
    const isPressed = pressedKey === key;
    const isHovered = hoveredKey === key;

    const baseClasses = "key py-2 mx-1 my-1 flex rounded-md h-10 flex-col justify-center items-center shadow-md border border-gray-400 cursor-pointer transition-all duration-100";

    let classes = `${baseClasses} ${width}`;

    if (isPressed) {
      classes += " transform translate-y-1 bg-gray-400 shadow-sm";
    } else if (isHovered) {
      classes += " bg-gray-300 shadow-lg";
    } else if (type === "special") {
      classes += " bg-gray-300";
    } else {
      classes += " bg-gray-200";
    }

    return (
      <div
        key={key}
        className={classes}
        onClick={() => handleKeyPress(key)}
        onMouseEnter={() => setHoveredKey(key)}
        onMouseLeave={() => setHoveredKey(null)}
      >
        {key}
      </div>
    );
  };

  return (
    <div className="homePage min-h-screen bg-gray-800 flex flex-col justify-center items-center">
      {/* Monitor Section */}
      <div className="totalBase flex flex-col justify-center items-center">
        <div className="monitor w-[40rem] max-w-lg h-56 flex flex-col justify-center items-center bg-gray-800 border-2 border-black rounded-t-lg relative">
          <div className="displayScreen w-full h-full bg-black border-2 border-gray-700 rounded-lg flex justify-center items-center relative overflow-hidden">
            {missionStarted ? (
              <>
                {/* Airplane Animation */}
                <div
                  className="absolute transition-all duration-100"
                  style={{ left: `${planePosition}px`, top: '40%' }}
                >
                  <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M60 15C60 15 45 5 30 5C15 5 0 15 0 15C0 15 15 25 30 25C45 25 60 15 60 15Z" fill="#3B82F6" />
                    <path d="M30 25L35 30H25L30 25Z" fill="#3B82F6" />
                    <path d="M30 5L35 0H25L30 5Z" fill="#3B82F6" />
                    <circle cx="30" cy="15" r="5" fill="white" />
                  </svg>
                </div>

                {/* Clouds */}
                <div className="absolute left-20 top-10">
                  <svg width="40" height="20" viewBox="0 0 40 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 15C4.477 15 0 11.866 0 8C0 4.134 4.477 1 10 1C12.5 1 14.5 1.5 16 2.5C17.5 0.5 20 0 22.5 0C27.5 0 31.5 2.5 32.5 6C37 6.5 40 9 40 12C40 16 35.523 20 30 20C25 20 20 17.5 15 17.5C13 17.5 11.5 16.5 10 15Z" fill="white" />
                  </svg>
                </div>
                <div className="absolute right-40 top-5">
                  <svg width="50" height="25" viewBox="0 0 50 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12.5 18.75C5.596 18.75 0 14.832 0 10C0 5.168 5.596 1.25 12.5 1.25C15.625 1.25 18.125 1.875 20 3.125C21.875 0.625 25 0 28.125 0C34.375 0 39.375 3.125 40.625 7.5C46.25 8.125 50 11.25 50 15C50 20 44.404 25 37.5 25C31.25 25 25 21.875 18.75 21.875C16.25 21.875 14.375 20.625 12.5 18.75Z" fill="white" />
                  </svg>
                </div>

                {/* Mission Text */}
                {showMissionText && (
                  <div className="text-green-500 text-xl font-mono text-center">
                    <p className="mb-2">MISSION ACTIVATED</p>
                    <p>AGENT {agentName} DEPLOYED</p>
                  </div>
                )}
              </>
            ) : (
              <span className="text-green-500 text-xl font-mono">{displayText}</span>
            )}
          </div>
        </div>

        {/* Stand */}
        <div className="stand h-16 w-8 bg-gray-300 relative rounded-t-lg flex justify-center items-end">
          <div className="neck h-12 w-4 bg-gray-400 rounded-t-lg"></div>
        </div>

        {/* Base of Stand */}
        <div className="standBase w-24 h-4 bg-gray-500 rounded-lg shadow-lg"></div>
      </div>

      {/* Desk Area */}
      <div className="desk flex justify-center items-start space-x-4 mt-8 w-full max-w-3xl">
        {/* Keyboard on the left */}
        <div className="keyboardContainer flex flex-col justify-center items-center">
          <div className="keyboard w-full max-w-2xl shadow-lg shadow-black bg-gray-100 border-4 border-gray-300 p-4 rounded-lg">
            {/* Row 1: QWERTYUIOP */}
            <div className="row flex flex-row justify-center">
              {keyboardRows[0].map(letter => renderKey(letter))}
            </div>

            {/* Row 2: ASDFGHJKL */}
            <div className="row flex flex-row justify-center ml-4">
              {keyboardRows[1].map(letter => renderKey(letter))}
            </div>

            {/* Row 3: ZXCVBNM + Enter */}
            <div className="row flex flex-row justify-center">
              {keyboardRows[2].map(letter => renderKey(letter))}
              {renderKey("Enter", "special", "w-24")}
            </div>
          </div>
        </div>

        {/* Mouse Pad on the right */}
        <div className="mousePad w-48 h-40 bg-gray-600 rounded-lg shadow-md flex justify-center items-center p-4">
          {/* Mouse */}
          <div className="mouse w-16 h-24 bg-white rounded-3xl shadow-lg flex flex-col">
            <div className="mouseButtons flex w-full h-8 mt-1">
              <div className="leftButton w-1/2 h-full border-r border-gray-200 rounded-tl-3xl"></div>
              <div className="rightButton w-1/2 h-full rounded-tr-3xl"></div>
            </div>
            <div className="scrollWheel w-4 h-4 bg-gray-300 rounded-full mx-auto mt-1"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;