"use client"

import Header from '@/components/Header';
import PasswordsTable from '@/components/passwords/PasswordsTable';
import StatisticsCard from '@/components/StatisticsCard';

import { FaUser, FaShieldAlt, FaExclamationTriangle, FaFolder } from 'react-icons/fa';

function DashboardPage() {
  return (
    <div className="bg-black">
      <Header />
      <div className="container my-5 mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-blue-600">Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatisticsCard title="Total Passwords" value="42" icon={<FaShieldAlt />} />
          <StatisticsCard title="Weak Passwords" value="5" icon={<FaExclamationTriangle />} color="text-yellow-500" />
          <StatisticsCard title="Shared Passwords" value="3" icon={<FaUser />} />
        </div>
        <PasswordsTable />
      </div>
    </div>
  );
}

export default DashboardPage;