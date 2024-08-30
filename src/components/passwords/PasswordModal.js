import React, { useState } from 'react';
import { FaTimes, FaEye, FaEyeSlash, FaSync, FaCopy, FaCheck } from 'react-icons/fa';

function PasswordModal({ password, onClose, onSave, groups }) {
  const [editedPassword, setEditedPassword] = useState({ ...password });
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPassword(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    onSave(editedPassword);
    onClose();
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const generatePassword = () => {
    // Implement password generation logic here
    const newPassword = "generatedPassword123!"; // Replace with actual generation
    setEditedPassword(prev => ({ ...prev, password: newPassword }));
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
          <h2 className="text-2xl font-bold py-2">Password Details</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-200">
            <FaTimes />
          </button>
        </div>
        <form className="space-y-3">
          <div>
            <label htmlFor="website" className="block font-semibold text-gray-300">Website:</label>
            <input
              type="text"
              id="website"
              name="website"
              value={editedPassword.website}
              onChange={handleInputChange}
              className="w-full bg-zinc-700 text-gray-200 p-2 rounded"
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
                  value={editedPassword.username}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-700 text-gray-200 p-2 rounded"
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
                  value={editedPassword.password}
                  onChange={handleInputChange}
                  className="w-full bg-zinc-700 text-gray-200 p-2 rounded"
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
                <option key={group.id} value={group.id}>
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
            type="button"
            onClick={handleSave}
            className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordModal;