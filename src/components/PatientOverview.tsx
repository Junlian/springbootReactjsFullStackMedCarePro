import React from 'react';
import { Filter, Search, MoreVertical, AlertCircle } from 'lucide-react';

interface Patient {
  id: string;
  name: string;
  age: number;
  lastVisit: string;
  status: 'Active' | 'New' | 'Follow-up' | 'Critical' | 'Inactive' | 'Awaiting Tests';
  alerts: string[];
  nextVisit: string;
}

const patients: Patient[] = [
  {
    id: 'P001',
    name: 'John Smith',
    age: 45,
    lastVisit: 'Mar 12',
    status: 'Active',
    alerts: ['Allergies', 'Diabetes'],
    nextVisit: 'Mar 20'
  },
  // Add more mock patients here
];

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  New: 'bg-blue-100 text-blue-800',
  'Follow-up': 'bg-orange-100 text-orange-800',
  Critical: 'bg-red-100 text-red-800',
  Inactive: 'bg-gray-100 text-gray-800',
  'Awaiting Tests': 'bg-yellow-100 text-yellow-800'
};

export default function PatientOverview() {
  return (
    <div className="p-6">
      {/* Statistics Header */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">New Patients</div>
          <div className="text-2xl font-bold">12</div>
          <div className="text-xs text-green-500">↑ 15% from last week</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Active Patients</div>
          <div className="text-2xl font-bold">45</div>
          <div className="text-xs text-green-500">↑ 8% from last week</div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow">
          <div className="text-sm text-gray-500">Follow-ups</div>
          <div className="text-2xl font-bold">28</div>
          <div className="text-xs text-orange-500">↓ 3% from last week</div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-4">
            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>All Departments</option>
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
              </select>
              <Filter className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
            <div className="relative">
              <select className="appearance-none bg-gray-50 border border-gray-300 rounded-md pl-3 pr-8 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500">
                <option>All Status</option>
                <option>Active</option>
                <option>New</option>
                <option>Follow-up</option>
              </select>
              <Filter className="absolute right-2 top-2.5 h-4 w-4 text-gray-400" />
            </div>
          </div>
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search patients..."
              className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>
      </div>

      {/* Patient Grid */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="divide-y divide-gray-200">
          {patients.map((patient) => (
            <div key={patient.id} className="p-4 hover:bg-gray-50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                    {patient.name.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="text-sm font-medium">{patient.name}</h3>
                      <span className="text-xs text-gray-500">#{patient.id}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-1">
                      <span className="text-xs text-gray-500">{patient.age} yrs</span>
                      <span className="text-xs text-gray-500">Last: {patient.lastVisit}</span>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${statusColors[patient.status]}`}>
                        {patient.status}
                      </span>
                    </div>
                  </div>
                </div>
                <button className="p-2 hover:bg-gray-100 rounded-full">
                  <MoreVertical className="h-5 w-5 text-gray-400" />
                </button>
              </div>
              {patient.alerts.length > 0 && (
                <div className="mt-2 flex items-center space-x-2">
                  <AlertCircle className="h-4 w-4 text-amber-500" />
                  <span className="text-xs text-gray-600">
                    Alerts: {patient.alerts.join(', ')}
                  </span>
                </div>
              )}
              <div className="mt-2 text-xs text-gray-500">
                Next Visit: {patient.nextVisit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 