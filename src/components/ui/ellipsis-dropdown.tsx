"use client";

import React, { useState } from 'react';

interface EllipsisDropdownProps {
  onOption1Click: () => void;
}

const EllipsisDropdown: React.FC<EllipsisDropdownProps> = ({ onOption1Click }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="flex items-center justify-center w-10 h-10 text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none"
          aria-label="more"
          onClick={handleClick}
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M6 10a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4zm6 0a2 2 0 110-4 2 2 0 010 4z"/>
          </svg>
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 w-48 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none">
          <div className="py-1">
            <button
              onClick={() => { onOption1Click(); handleClose(); }}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              View details
            </button>
            <button
              onClick={()=>{handleClose();}}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
            Copy
            </button>
            <button
              onClick={handleClose}
              className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            >
              Option 3
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EllipsisDropdown;