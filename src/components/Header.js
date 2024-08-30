"use client"; 

import { useState, useEffect } from 'react';
import Link from 'next/link';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is logged in
    // This is a placeholder - replace with your actual authentication check
    const checkLoginStatus = () => {
      // Example: check for a token in localStorage
      const token = localStorage.getItem('authToken');
      setIsLoggedIn(!!token);
    };

    checkLoginStatus();
  }, []);

  const handleSignOut = () => {
    // Implement your sign out logic here
    // For example:
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    // Redirect to home page or refresh the page
  };

  return (
    <header className="bg-black border-b border-zinc-600 z-10">
      <div className="container mx-auto p-4 flex flex-col sm:flex-row sm:justify-between items-center">
        <div className="flex items-center mb-2 sm:mb-0">
          <Link href="/">
            <h1 className="text-3xl font-bold text-blue-600">Passwords Plz</h1>
          </Link>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-auto">
          {isLoggedIn ? (
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </button>
          ) : (
            <>
              <Link href="/login" className="w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2">
                <button className="w-full px-4 py-2 bg-black border-2 border-white text-white rounded">Login</button>
              </Link>
              <Link href="/register" className="w-full sm:w-auto">
                <button className="w-full px-4 py-2 bg-white text-black border-2 rounded">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;