import React from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-blue-950">
      <div className="w-full max-w-md p-8">
        <h1 className="mb-8 text-3xl font-bold text-center text-gray-800 dark:text-white">
          Choose an Option
        </h1>
        
        <div className="flex flex-col gap-4">
          <button className="p-4 transition-all bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 group">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Option 1
              </span>
              <svg 
                className="w-6 h-6 text-gray-400 transition-transform group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
          
          <button className="p-4 transition-all bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 group">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Option 2
              </span>
              <svg 
                className="w-6 h-6 text-gray-400 transition-transform group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
          
          <button className="p-4 transition-all bg-white rounded-lg shadow-md hover:shadow-lg dark:bg-gray-800 group">
            <div className="flex items-center justify-between">
              <span className="text-xl font-medium text-gray-800 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                Option 3
              </span>
              <svg 
                className="w-6 h-6 text-gray-400 transition-transform group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}