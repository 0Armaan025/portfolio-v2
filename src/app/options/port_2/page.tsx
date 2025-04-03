"use client";
import React, { useState, useEffect, useRef } from 'react';


type Props = {}; // Empty interface kept for future expansion

const MangaPortStyle = (props: Props) => { // eslint-disable-line @typescript-eslint/no-unused-vars
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5); // Set this to your actual page count
  const [isMobile, setIsMobile] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const [laptopBooted, setLaptopBooted] = useState(false);
  const [projectsLoaded, setProjectsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check if device is mobile
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);
    
    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  // Special laptop interaction sequence for page 4
  useEffect(() => {
    if (currentPage === 4) {
      // OS loading sequence
      const bootTimer = setTimeout(() => {
        setLaptopBooted(true);
        
        // Projects loading sequence
        const projectsTimer = setTimeout(() => {
          setProjectsLoaded(true);
        }, 1500);
        
        return () => clearTimeout(projectsTimer);
      }, 2000);
      
      return () => {
        clearTimeout(bootTimer);
        setLaptopBooted(false);
        setProjectsLoaded(false);
      };
    }
  }, [currentPage]);

  // Improved scroll handler with debounce
  useEffect(() => {
    if (isMobile) return;

    const handleScroll = (event: WheelEvent) => {
      event.preventDefault();
      
      if (isAnimating) return;
      
      // Clear any existing timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      
      // Set a timeout to debounce scroll events
      scrollTimeoutRef.current = setTimeout(() => {
        if (event.deltaY > 0 && currentPage < totalPages) {
          // Scroll down - go to next page in manga (right to left reading)
          turnPage(true);
        } else if (event.deltaY < 0 && currentPage > 1) {
          // Scroll up - go to previous page
          turnPage(false);
        }
      }, 50);
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleScroll, { passive: false });
    }

    return () => {
      if (container) {
        container.removeEventListener('wheel', handleScroll);
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
    };
  }, [isMobile, totalPages, currentPage, isAnimating]);

  // Function for page turning animation
  const turnPage = (goForward: boolean) => {
    setIsAnimating(true);
    
    // Update page after a slight delay to allow animation to start
    setTimeout(() => {
      if (goForward) {
        setCurrentPage((prev) => Math.min(prev + 1, totalPages));
      } else {
        setCurrentPage((prev) => Math.max(prev - 1, 1));
      }
      
      // End animation after transition completes
      setTimeout(() => {
        setIsAnimating(false);
      }, 500);
    }, 100);
  };

  // Function to navigate to previous page (right side in manga)
  const goToPreviousPage = () => {
    if (currentPage > 1 && !isAnimating) {
      turnPage(false);
    }
  };

  // Function to navigate to next page (left side in manga)
  const goToNextPage = () => {
    if (currentPage < totalPages && !isAnimating) {
      turnPage(true);
    }
  };

  // Interactive Laptop Component
  const LaptopComponent = () => {
    // Various project icons for display
    const projectIcons = [
      { 
        icon: "🚀", 
        name: "Launch", 
        color: "bg-blue-500" 
      },
      { 
        icon: "🎮", 
        name: "Game", 
        color: "bg-purple-500" 
      },
      { 
        icon: "📊", 
        name: "Analytics", 
        color: "bg-green-500" 
      },
      { 
        icon: "🎨", 
        name: "Design", 
        color: "bg-yellow-500" 
      },
      { 
        icon: "🔍", 
        name: "Search", 
        color: "bg-red-500" 
      }
    ];

    return (
      <div className="flex flex-col items-center">
        {/* Laptop container */}
        <div className="w-64 mx-auto perspective-1000">
          {/* Screen part */}
          <div className="relative bg-gray-800 rounded-t-lg p-1 shadow-lg transform-gpu">
            {/* Screen content */}
            <div className="bg-gray-900 h-40 w-full overflow-hidden rounded">
              {/* Screen display area */}
              <div className="w-full h-full bg-black flex items-center justify-center text-white p-2">
                {!laptopBooted ? (
                  // OS Loading screen
                  <div className="flex flex-col items-center">
                    <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-2"></div>
                    <div className="text-xs text-center">System loading...</div>
                  </div>
                ) : !projectsLoaded ? (
                  // Projects loading screen
                  <div className="flex flex-col items-center">
                    <div className="text-xs mb-2">Loading Projects</div>
                    <div className="w-full bg-gray-700 rounded-full h-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                ) : (
                  // Projects display
                  <div className="grid grid-cols-3 gap-1 w-full h-full p-1">
                    {projectIcons.map((project, index) => (
                      <button 
                        key={index}
                        className={`${project.color} hover:opacity-80 rounded p-1 flex flex-col items-center justify-center transition-all transform hover:scale-105`}
                      >
                        <div className="text-lg">{project.icon}</div>
                        <div className="text-xs mt-1">{project.name}</div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            
            {/* Webcam */}
            <div className="absolute top-1 left-1/2 transform -translate-x-1/2 w-2 h-2 rounded-full bg-gray-900">
              <div className="w-1 h-1 rounded-full bg-gray-800 absolute inset-1/4"></div>
            </div>
          </div>
          
          {/* Hinge */}
          <div className="h-1 bg-gradient-to-b from-gray-700 to-gray-800 shadow-inner"></div>
          
          {/* Keyboard part */}
          <div className="bg-gray-700 rounded-b-lg p-2 shadow-lg">
            {/* Keyboard area */}
            <div className="grid grid-cols-10 gap-0.5">
              {Array(40).fill(0).map((_, index) => (
                <div 
                  key={index}
                  className="bg-gray-600 rounded h-1.5 transition-colors hover:bg-gray-500"
                ></div>
              ))}
            </div>
            
            {/* Touchpad */}
            <div className="mt-2 mx-auto w-16 h-8 bg-gray-600 rounded"></div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div 
      ref={containerRef} 
      className="flex flex-col items-center justify-center min-h-screen bg-white text-gray-800"
    >
      <div className="w-full max-w-lg mx-auto relative">
        {/* Page count indicator */}
        <div className="absolute top-2 left-2 bg-gray-100 px-3 py-1 rounded-md text-sm shadow-md z-10">
          Page {currentPage} / {totalPages}
        </div>
        
        {/* Manga page display container */}
        <div className="relative w-full overflow-hidden h-96 flex items-center justify-center">
          {currentPage === 4 ? (
            // Special laptop display for page 4
            <div className="h-full w-full flex items-center justify-center">
              <LaptopComponent />
            </div>
          ) : (
            // Regular manga page display
            <div 
              className={`relative transform transition-all duration-500 ease-in-out ${
                isAnimating ? (currentPage > 1 ? 'translate-x-16 opacity-0' : '-translate-x-16 opacity-0') : ''
              }`}
            >
              <img 
                src={`/page_${currentPage}.png`} 
                alt={`Manga page ${currentPage}`}
                className="h-96 w-auto object-contain shadow-md"
              />
              
              {/* Page flip effect overlay */}
              <div className={`absolute inset-0 ${
                isAnimating ? 'bg-gradient-to-l from-black/10 to-transparent' : ''
              } pointer-events-none`}></div>
            </div>
          )}
        </div>
        
        {/* Navigation buttons - optimized placement */}
        <div className="flex justify-between mt-4 px-4">
          {/* Left button (next page in manga) */}
          <button 
            onClick={goToNextPage}
            disabled={currentPage >= totalPages || isAnimating}
            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-30 p-3 rounded-full transition-all shadow-md"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Right button (previous page in manga) */}
          <button 
            onClick={goToPreviousPage}
            disabled={currentPage <= 1 || isAnimating}
            className="bg-gray-200 hover:bg-gray-300 disabled:opacity-30 p-3 rounded-full transition-all shadow-md"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
        
        {/* Page 4 special instructions */}
        {currentPage === 4 && (
          <div className="text-center mt-4 text-sm text-blue-500 font-medium">
            {!laptopBooted ? "Laptop booting up..." : !projectsLoaded ? "Projects loading..." : "Click on projects to interact!"}
          </div>
        )}
        
        {/* Navigation instructions */}
        <div className="text-center mt-2 text-sm text-gray-500">
          {isMobile ? 
            "Use the buttons to navigate between pages" : 
            "Scroll up/down or use the buttons to navigate"
          }
        </div>
      </div>
    </div>
  );
};

export default MangaPortStyle;