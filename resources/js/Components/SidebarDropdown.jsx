import React, { useState } from 'react';

const SidebarDropdown = ({ title, icon, children }) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <li>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-1 text-left focus:outline-none"
      >
        <div className="flex items-center">
          {icon && <span className="mr-2">{icon}</span>}
          <span>{title}</span>
        </div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 ${isDropdownOpen ? 'transform rotate-180' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
        </svg>
      </button>
      {isDropdownOpen && (
        <div
          onClick={toggleDropdown}
          className="h-full w-full bg-black opacity-30"
        />
      )}
      {isDropdownOpen && (
        <div className="w-full justify-center">
          <div className=" mt-2  w-48 bg-white border rounded-lg shadow-lg">
            {children}
          </div>
        </div>
      )}
    </li>
  );
};

export default SidebarDropdown;
