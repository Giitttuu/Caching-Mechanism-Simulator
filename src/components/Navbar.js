import React from "react";

const Navbar = ({ activeTab, onTabChange }) => {
  return (
    <nav className="sticky top-0 z-50 bg-white shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Brand */}
          <div className="flex items-center">
            <h1 className="text-xl font-bold text-gray-800">Cache Simulator</h1>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-8">
            <button
              onClick={() => onTabChange("home")}
              className={`px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                activeTab === "home"
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onTabChange("simulator")}
              className={`px-4 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                activeTab === "simulator"
                  ? "bg-primary-100 text-primary-700"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              Simulator
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
