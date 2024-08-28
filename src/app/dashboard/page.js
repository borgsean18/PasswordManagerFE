import React from 'react';
import Header from '@/components/Header';
import { FaUser, FaShieldAlt, FaExclamationTriangle } from 'react-icons/fa';

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 bg-black">
      <h1 className="text-3xl font-bold mb-6 text-blue-600">Password Manager Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <DashboardCard title="Total Passwords" value="42" icon={<FaShieldAlt />} />
        <DashboardCard title="Weak Passwords" value="5" icon={<FaExclamationTriangle />} color="text-yellow-500" />
        <DashboardCard title="Shared Passwords" value="3" icon={<FaUser />} />
      </div>
    </div>
  );
}

function DashboardCard({ title, value, icon, color = "text-blue-600" }) {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 flex items-center">
      <div className={`text-4xl ${color} mr-4`}>{icon}</div>
      <div>
        <h2 className="text-lg font-semibold mb-1 text-gray-700">{title}</h2>
        <p className={`text-3xl font-bold ${color}`}>{value}</p>
      </div>
    </div>
  );
}
