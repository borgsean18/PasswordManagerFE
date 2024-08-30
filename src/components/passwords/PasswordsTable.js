import React, { useState, useMemo } from 'react';
import { FaEye, FaEyeSlash, FaSort, FaSearch, FaFile, FaPlus, FaLock, FaExclamationTriangle } from 'react-icons/fa';
import PasswordModal from './PasswordModal';

function PasswordsTable() {
    const [visiblePasswords, setVisiblePasswords] = useState({});
    const [sortBy, setSortBy] = useState('website');
    const [sortOrder, setSortOrder] = useState('asc');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedPassword, setSelectedPassword] = useState(null);
    const [groups, setGroups] = useState([
        { id: 1, name: 'Personal' },
        { id: 2, name: 'Work' },
        { id: 3, name: 'Finance' },
    ]);

    const passwords = [
      { id: 1, website: 'example.com', username: 'user1', password: 'password123', group: 'Personal',  },
      { id: 2, website: 'secure-site.com', username: 'user2', password: 'strongPass!', group: 'Work' },
      { id: 3, website: 'social-media.com', username: 'user3', password: 'soci', group: 'Personal' },
      { id: 4, website: 'bank.com', username: 'user4', password: 'bankPass456', group: 'Finance' },
    ];

    const filteredAndSortedPasswords = useMemo(() => {
        return [...passwords]
            .filter(item => 
                item.website.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
                item.group.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .sort((a, b) => {
                if (a[sortBy] < b[sortBy]) return sortOrder === 'asc' ? -1 : 1;
                if (a[sortBy] > b[sortBy]) return sortOrder === 'asc' ? 1 : -1;
                return 0;
            });
    }, [passwords, searchTerm, sortBy, sortOrder]);

    const handleSort = (column) => {
        if (column !== 'password') {
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
            id: Date.now(), // Temporary ID, should be replaced with a proper ID generation method
            website: '',
            username: '',
            password: '',
            group: ''
        };
        setSelectedPassword(newPassword);
    };

    const handleSavePassword = (editedPassword) => {
        if (passwords.find(p => p.id === editedPassword.id)) {
            // Update existing password
            const updatedPasswords = passwords.map(p => 
                p.id === editedPassword.id ? editedPassword : p
            );
            // You would typically update your state or send this to an API
            console.log('Updated passwords:', updatedPasswords);
        } else {
            // Add new password
            const newPasswords = [...passwords, editedPassword];
            // You would typically update your state or send this to an API
            console.log('New password added:', newPasswords);
        }
    };

    const isWeakPassword = (password) => {
        return password.length < 8;
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
        <div className="overflow-x-auto">
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
                <tr key={item.id} className="border-b border-zinc-700">
                  <td className="p-3 text-gray-300">{item.group || '-'}</td>
                  <td className="p-3 text-gray-300">{item.website}</td>
                  <td className="p-3 text-gray-300">{item.username}</td>
                  <td className="p-3 text-gray-300">
                    <div className="flex items-center">
                      {visiblePasswords[item.id] ? item.password : '••••••••'}
                      {isWeakPassword(item.password) && (
                        <FaExclamationTriangle className="ml-2 text-yellow-500" title="Weak password" />
                      )}
                    </div>
                  </td>
                  <td className="p-3 text-gray-300">
                    <div className="flex space-x-2">
                      <button
                        onClick={() => togglePasswordVisibility(item.id)}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        {visiblePasswords[item.id] ? <FaEyeSlash /> : <FaEye />}
                      </button>
                      <button
                        onClick={() => openPasswordModal(item)}
                        className="text-blue-500 hover:text-blue-600 transition-colors"
                      >
                        <FaFile />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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