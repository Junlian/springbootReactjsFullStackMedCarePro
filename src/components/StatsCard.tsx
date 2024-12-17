import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

export default function StatsCard({ title, value, change, icon }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-5 hover:shadow-lg transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-sm">{title}</p>
          <h3 className="text-2xl font-bold mt-1">{value}</h3>
        </div>
        <div className="text-blue-500">{icon}</div>
      </div>
      <div className="mt-4 flex items-center">
        <span className={`text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? '↑' : '↓'} {Math.abs(change)}% from yesterday
        </span>
      </div>
      <a href="#" className="text-blue-600 text-sm mt-3 inline-block hover:text-blue-800">
        View Details →
      </a>
    </div>
  );
}