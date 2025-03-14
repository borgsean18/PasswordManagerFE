"use client"; 

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    const token = Cookies.get('authToken');
    if (!token) {
      setIsLoggedIn(false);
      return;
    }

    try {
      // Verify token with backend
      const response = await fetch(`${backendURL}/api/auth/verify`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        setIsLoggedIn(true);
        setUserName(data.user?.name || '');
      } else {
        // Token invalid, clear cookies
        handleSignOut(false);
      }
    } catch (error) {
      console.error('Error verifying authentication:', error);
      // Keep user logged in if it's just a connection error
    }
  };

  const handleSignOut = async (shouldCallApi = true) => {
    setLoading(true);
    
    if (shouldCallApi) {
      try {
        const token = Cookies.get('authToken');
        if (token) {
          // Call logout endpoint
          await fetch(`${backendURL}/api/auth/logout`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
    
    // Remove cookies and sign out
    Cookies.remove('authToken');
    Cookies.remove('userEmail');
    setIsLoggedIn(false);
    setUserName('');
    setLoading(false);
    router.push('/');
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
            <div className="flex items-center">
              {userName && (
                <span className="text-gray-300 mr-4">Hello, {userName}</span>
              )}
              <button
                onClick={() => handleSignOut(true)}
                disabled={loading}
                className="w-full px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
              >
                {loading ? 'Signing out...' : 'Sign Out'}
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className="w-full sm:w-auto mb-2 sm:mb-0 sm:mr-2">
                <button className="w-full px-4 py-2 bg-black border-2 border-white text-white rounded hover:bg-zinc-900">Login</button>
              </Link>
              <Link href="/register" className="w-full sm:w-auto">
                <button className="w-full px-4 py-2 bg-white text-black border-2 rounded hover:bg-gray-100">Register</button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;