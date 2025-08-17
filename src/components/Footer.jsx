import React from 'react';

function Footer() {
  return (
    <footer className="bg-indigo-600 text-white py-10">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-base sm:text-lg font-semibold mb-2">
          Made by Akirem Samuel
        </h2>
        <p className="text-xs sm:text-sm text-gray-300 mb-4 max-w-xl mx-auto">
          ScopeMate is a simple freelance project scoping tool built to help you quickly estimate cost, features, and delivery time for your clients.
        </p>
        <p className="text-xs text-gray-400">
          &copy; {new Date().getFullYear()} ScopeMate. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
