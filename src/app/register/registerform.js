'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

function RegisterForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const apiUrl = '/api/register';

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        router.push('/dashboard');
      } else {
        console.error('Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-300">Name</label>
        <input
          type="text"
          id="name"
          value={formData.name}
          onChange={handleChange}
          className="w-full px-3 py-2 bg-zinc-800 border border-zinc-700 rounded-md focus:outline-none focus:ring focus:border-blue-300 text-white"
          required
        />
      </div>
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
        Register
      </button>
      
      <Link href="/login" className="block w-full text-center bg-zinc-700 text-white py-2 px-4 rounded-md hover:bg-zinc-600 focus:outline-none focus:ring focus:border-zinc-500">
        Already have an account? Login
      </Link>
    </form>
  );
}

export default RegisterForm;
