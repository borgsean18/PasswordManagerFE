'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function LoginForm() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const apiUrl = '/api/login';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        // Save email and token to cookies
        Cookies.set('userEmail', formData.email, { expires: 7 });
        Cookies.set('authToken', data.token, { expires: 7 });
        router.push('/dashboard');
      } else {
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-300">Email</label>
        <input
          type="email"
          id="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-white"
          required
        />
      </div>
      <div className="mb-6">
        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-300">Password</label>
        <input
          type="password"
          id="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-white"
          required
        />
      </div>
      <button type="submit" className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300 mb-4">
        Login
      </button>
      
      <Link href="/register" className="block w-full text-center bg-zinc-700 text-white py-2 px-4 rounded-md hover:bg-zinc-600 focus:outline-none focus:ring focus:border-zinc-500">
        Don't have an account? Register
      </Link>
    </form>
  );
}

export default LoginForm;
