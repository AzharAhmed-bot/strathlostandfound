/* eslint-disable react/prop-types */

import { useState } from "react";


function FaqItem({ question, answer }) {
    const [isOpen, setIsOpen] = useState(false);
  
    return (
      <div className="border  border-gray-300  bg-opacity-80 rounded-md   mb-4">
        <div
          className="flex items-center justify-between px-4 py-3 cursor-pointer"
          onClick={() => setIsOpen(!isOpen)}
        >
          <div className="font-semibold text-lg">{question}</div>
          <div className="w-6 h-6 flex items-center justify-center rounded-full bg-gray-200">
            {isOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            )}
          </div>
        </div>
        {isOpen && (
          <div className="px-4 py-3 border-t border-gray-300">
            <p className="">{answer}</p>
          </div>
        )}
      </div>
    );
  }

  export default FaqItem