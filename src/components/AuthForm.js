'use client';

import { useState } from 'react';
import Link from 'next/link';
// import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function AuthForm({ type }) {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log(formData);

    if (type === 'login') {
      const result = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result.error) {
        setError(result.error);
      } else {
        router.push('/dashboard');
      }
    } else {
      // Handle registration
      // ... existing registration logic ...
      // After successful registration:
      router.push('/dashboard');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {type === 'register' && (
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
      )}
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
        {type === 'register' ? 'Register' : 'Login'}
      </button>
      
      <Link href={type === 'register' ? '/login' : '/register'} className="block w-full text-center bg-zinc-700 text-white py-2 px-4 rounded-md hover:bg-zinc-600 focus:outline-none focus:ring focus:border-zinc-500">
        {type === 'register' ? 'Already have an account? Login' : 'Don\'t have an account? Register'}
      </Link>
    </form>
  );
}

export default AuthForm;
