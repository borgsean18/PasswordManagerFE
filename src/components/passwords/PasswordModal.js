import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash, FaSync, FaCopy, FaCheck } from 'react-icons/fa';

function PasswordModal({ password, onClose, onSave, groups }) {
  const [editedPassword, setEditedPassword] = useState({ ...password });
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPassword(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    setLoading(true);
    await onSave(editedPassword);
    setLoading(false);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const generatePassword = () => {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = lowercase + uppercase + numbers + symbols;
    
    let newPassword = '';
    const length = 16; // Increased length for better security

    // Generate random password
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * allChars.length);
      newPassword += allChars[randomIndex];
    }

    // Ensure at least one lowercase, one uppercase, one number, and one symbol
    newPassword = ensurePasswordComplexity(newPassword, lowercase, uppercase, numbers, symbols);

    setEditedPassword(prev => ({ ...prev, password: newPassword }));
    setShowPassword(true); // Show the password when generated
  };

  const ensurePasswordComplexity = (password, lowercase, uppercase, numbers, symbols) => {
    let result = password;
    
    // Replace characters at random positions to ensure complexity requirements
    if (!/[a-z]/.test(result)) {
      const pos = Math.floor(Math.random() * result.length);
      result = result.substring(0, pos) + 
               lowercase[Math.floor(Math.random() * lowercase.length)] + 
               result.substring(pos + 1);
    }
    
    if (!/[A-Z]/.test(result)) {
      const pos = Math.floor(Math.random() * result.length);
      result = result.substring(0, pos) + 
               uppercase[Math.floor(Math.random() * uppercase.length)] + 
               result.substring(pos + 1);
    }
    
    if (!/[0-9]/.test(result)) {
      const pos = Math.floor(Math.random() * result.length);
      result = result.substring(0, pos) + 
               numbers[Math.floor(Math.random() * numbers.length)] + 
               result.substring(pos + 1);
    }
    
    if (!/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(result)) {
      const pos = Math.floor(Math.random() * result.length);
      result = result.substring(0, pos) + 
               symbols[Math.floor(Math.random() * symbols.length)] + 
               result.substring(pos + 1);
    }
    
    return result;
  };

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 1500); // Reset after 1.5 seconds
    });
  };

  const CopyButton = ({ text, field }) => (
    <button
      type="button"
      onClick={() => copyToClipboard(text, field)}
      className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded flex items-center justify-center transition duration-200"
      disabled={!text}
    >
      {copiedField === field ? (
        <FaCheck className="w-5 h-5 text-white-400" />
      ) : (
        <FaCopy className="w-5 h-5" />
      )}
    </button>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-zinc-800 p-6 rounded-lg w-full max-w-4xl border border-zinc-600">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold py-2">
            {editedPassword._id ? 'Edit Password' : 'Add New Password'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
        <form className="space-y-3" onSubmit={(e) => { e.preventDefault(); handleSave(); }}>
          <div>
            <label htmlFor="website" className="block font-semibold text-gray-300">Website:</label>
            <input
              type="text"
              id="website"
              name="website"
              value={editedPassword.website || ''}
              onChange={handleInputChange}
              className="w-full bg-zinc-700 text-gray-200 p-2 rounded"
              required
            />
          </div>
          <div className="flex flex-col md:flex-row md:space-x-3 space-y-3 md:space-y-0">
            <div className="flex-1">
              <label htmlFor="username" className="block font-semibold text-gray-300">Username:</label>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={editedPassword.username || ''}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-700 text-gray-200 p-2 rounded"
                  required
                />
                <CopyButton text={editedPassword.username} field="username" />
              </div>
            </div>
            <div className="flex-1">
              <label htmlFor="password" className="block font-semibold text-gray-300">Password:</label>
              <div className="flex items-center space-x-2">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={editedPassword.password || ''}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-700 text-gray-200 p-2 rounded"
                  required
                />
                <CopyButton text={editedPassword.password} field="password" />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded flex items-center justify-center transition duration-200"
                >
                  {showPassword ? <FaEyeSlash className="w-5 h-5" /> : <FaEye className="w-5 h-5" />}
                </button>
                <button
                  type="button"
                  onClick={generatePassword}
                  className="bg-blue-600 text-white hover:bg-blue-700 p-2 rounded flex items-center justify-center transition duration-200"
                >
                  <FaSync className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
          <div>
            <label htmlFor="group" className="block font-semibold text-gray-300">Group:</label>
            <select
              id="group"
              name="group"
              value={editedPassword.group || ''}
              onChange={handleInputChange}
              className="w-full bg-zinc-700 text-gray-200 p-2 rounded"
            >
              <option value="">No group</option>
              {groups.map((group) => (
                <option key={group.id} value={group.name}>
                  {group.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="note" className="block font-semibold text-gray-300">Note:</label>
            <textarea
              id="note"
              name="note"
              value={editedPassword.note || ''}
              onChange={handleInputChange}
              className="w-full bg-zinc-700 text-gray-200 p-2 rounded h-24 resize-none"
              placeholder="Add any additional notes here..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200 disabled:opacity-50 flex justify-center"
          >
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;