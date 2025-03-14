import React, { useState, useMemo, useEffect } from 'react';
import { FaEye, FaEyeSlash, FaSort, FaSearch, FaFile, FaPlus, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import PasswordModal from './PasswordModal';
import Cookies from 'js-cookie';

const backendURL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001';

function PasswordsTable() {
    const [visiblePasswords, setVisiblePasswords] = useState({});
    const [sortBy, setSortBy] = useState('website');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [passwords, setPasswords] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [groups, setGroups] = useState([
        { id: 1, name: 'Personal' },
        { id: 2, name: 'Work' },
        { id: 3, name: 'Finance' },
    ]);

    // Load passwords from API on component mount
    useEffect(() => {
        fetchPasswords();
    }, []);

    const fetchPasswords = async () => {
        setLoading(true);
        setError('');
        
        try {
            const token = Cookies.get('authToken');
            if (!token) {
                setError('Authentication required');
                setLoading(false);
                return;
            }
            
            const response = await fetch(`${backendURL}/api/passwords`, {
                method: 'GET',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                const data = await response.json();
                setPasswords(data.passwords || []);
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to load passwords');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error('Error fetching passwords:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredAndSortedPasswords = useMemo(() => {
        return [...passwords]
            .filter(item => 
                item.website?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.username?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.group?.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
    }, [passwords, searchTerm, sortBy, sortOrder]);

    const handleSort = (column) => {
        if (column !== 'password' && column !== 'actions') {
            if (sortBy === column) {
                setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
            } else {
                setSortBy(column);
                setSortOrder('asc');
            }
        }
    };

    const togglePasswordVisibility = (id) => {
        setVisiblePasswords(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const openPasswordModal = (password) => {
        setSelectedPassword(password);
    };

    const closePasswordModal = () => {
        setSelectedPassword(null);
    };

    const openNewPasswordModal = () => {
        const newPassword = {
            website: '',
            username: '',
            password: '',
            group: '',
            note: ''
        };
        setSelectedPassword(newPassword);
    };

    const handleSavePassword = async (editedPassword) => {
        const token = Cookies.get('authToken');
        if (!token) {
            setError('Authentication required');
            return;
        }
        
        try {
            let response;
            
            if (editedPassword._id) {
                // Update existing password
                response = await fetch(`${backendURL}/api/passwords/${editedPassword._id}`, {
                    method: 'PUT',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedPassword),
                });
            } else {
                // Create new password
                response = await fetch(`${backendURL}/api/passwords`, {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(editedPassword),
                });
            }
            
            if (response.ok) {
                // Refresh passwords list
                fetchPasswords();
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to save password');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error('Error saving password:', err);
        }
    };

    const handleDeletePassword = async (id) => {
        if (!confirm('Are you sure you want to delete this password?')) {
            return;
        }
        
        const token = Cookies.get('authToken');
        if (!token) {
            setError('Authentication required');
            return;
        }
        
        try {
            const response = await fetch(`${backendURL}/api/passwords/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            
            if (response.ok) {
                // Refresh passwords list
                fetchPasswords();
            } else {
                const errorData = await response.json();
                setError(errorData.message || 'Failed to delete password');
            }
        } catch (err) {
            setError('Error connecting to server');
            console.error('Error deleting password:', err);
        }
    };

    const isWeakPassword = (password) => {
        return password?.length < 8;
    };

    return (
      <div className="mt-8 w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-blue-600 flex items-center">
            <FaLock className="mr-2 text-blue-500" /> Passwords
          </h2>
          <button
            onClick={openNewPasswordModal}
            className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded flex items-center"
          >
            <FaPlus className="mr-2" /> New Password
          </button>
        </div>
        
        {error && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-25 border border-red-500 rounded text-red-100">
            {error}
            <button 
              className="ml-2 underline" 
              onClick={() => {
                setError('');
                fetchPasswords();
              }}
            >
              Retry
            </button>
          </div>
        )}
        
        <div className="mb-4 relative">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full p-2 pl-10 bg-zinc-800 text-gray-300 border border-zinc-700 rounded-md focus:outline-none focus:border-blue-500"
          />
          <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
        </div>
        
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
            <p className="mt-2 text-gray-400">Loading passwords...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            {passwords.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <p>No passwords found. Click "New Password" to add one.</p>
              </div>
            ) : (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-zinc-800">
                    {['Group', 'Website', 'Username', 'Password', 'Actions'].map((column) => (
                      <th 
                        key={column.toLowerCase()} 
                        className={`p-3 text-gray-300 ${column !== 'Password' && column !== 'Actions' ? 'cursor-pointer' : ''}`}
                        onClick={() => handleSort(column.toLowerCase())}
                      >
                        <div className="flex items-center">
                          {column}
                          {sortBy === column.toLowerCase() && column !== 'Password' && column !== 'Actions' && (
                            <FaSort className="ml-1" />
                          )}
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedPasswords.map((item) => (
                    <tr key={item._id} className="border-b border-zinc-700">
                      <td className="p-3 text-gray-300">{item.group || '-'}</td>
                      <td className="p-3 text-gray-300">{item.website}</td>
                      <td className="p-3 text-gray-300">{item.username}</td>
                      <td className="p-3 text-gray-300">
                        <div className="flex items-center">
                          {visiblePasswords[item._id] ? item.password : '••••••••'}
                          {isWeakPassword(item.password) && (
                            <FaExclamationTriangle className="ml-2 text-yellow-500" title="Weak password" />
                          )}
                        </div>
                      </td>
                      <td className="p-3 text-gray-300">
                        <div className="flex space-x-2">
                          <button
                            onClick={() => togglePasswordVisibility(item._id)}
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            {visiblePasswords[item._id] ? <FaEyeSlash /> : <FaEye />}
                          </button>
                          <button
                            onClick={() => openPasswordModal(item)}
                            className="text-blue-500 hover:text-blue-600 transition-colors"
                          >
                            <FaFile />
                          </button>
                          <button
                            onClick={() => handleDeletePassword(item._id)}
                            className="text-red-500 hover:text-red-600 transition-colors"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}
        
        {selectedPassword && (
          <PasswordModal
            password={selectedPassword}
            onClose={closePasswordModal}
            onSave={handleSavePassword}
            groups={groups}
          />
        )}
      </div>
    );
  }

export default PasswordsTable;