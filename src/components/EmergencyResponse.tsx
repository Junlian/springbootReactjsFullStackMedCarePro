import React, { useState } from 'react';
import { 
  AlertTriangle, 
  Clock, 
  Users, 
  Radio, 
  Siren, 
  MoreVertical,
  MapPin,
  Timer
} from 'lucide-react';

interface EmergencyIncident {
  id: string;
  time: string;
  type: EmergencyType;
  location: string;
  patient?: {
    id: string;
    name: string;
  };
  status: 'Critical' | 'Active' | 'Pending' | 'In Progress' | 'Resolved' | 'Under Review';
  responseTeam: string;
  eta?: string;
}

type EmergencyType = 'Code Blue' | 'Code Red' | 'Code Black' | 'Code Grey' | 'Code Pink' | 'Rapid Response' | 'Mass Casualty';

const emergencyIncidents: EmergencyIncident[] = [
  {
    id: 'E001',
    time: '10:30 AM',
    type: 'Code Blue',
    location: 'ICU Room 401',
    patient: { id: 'P123456', name: 'John Smith' },
    status: 'Critical',
    responseTeam: 'Team A',
    eta: '2 minutes'
  },
  // Add more mock incidents
];

const statusColors = {
  Critical: 'bg-red-100 text-red-800 animate-pulse',
  Active: 'bg-red-100 text-red-800',
  Pending: 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-orange-100 text-orange-800',
  Resolved: 'bg-green-100 text-green-800',
  'Under Review': 'bg-blue-100 text-blue-800'
};

export default function EmergencyResponse() {
  const [activeProtocol, setActiveProtocol] = useState<string | null>(null);

  const stats = {
    active: 3,
    pending: 2,
    critical: 1
  };

  return (
    <div className="p-6">
      {/* Alert Status Bar */}
      <div className="bg-red-600 text-white p-4 rounded-lg shadow-lg mb-6">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Siren className="h-6 w-6" />
            <h1 className="text-xl font-bold">CRITICAL ALERTS</h1>
          </div>
          <div className="flex space-x-4 text-sm">
            <span>Active: {stats.active}</span>
            <span>Pending: {stats.pending}</span>
            <span>Critical: {stats.critical}</span>
          </div>
        </div>
        <div className="mt-2 text-sm">
          Latest: Code Blue - Room 401
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Emergency Queue */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Emergency Queue</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {emergencyIncidents.map((incident) => (
                <div key={incident.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{incident.time}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[incident.status]}`}>
                          {incident.status}
                        </span>
                      </div>
                      <h3 className="mt-1 text-sm font-medium text-gray-900">{incident.type}</h3>
                      <div className="mt-1 space-y-1">
                        <div className="flex items-center text-xs text-gray-500">
                          <MapPin className="h-4 w-4 mr-1" />
                          {incident.location}
                        </div>
                        {incident.patient && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Users className="h-4 w-4 mr-1" />
                            Patient: {incident.patient.name} (ID: {incident.patient.id})
                          </div>
                        )}
                        <div className="flex items-center text-xs text-gray-500">
                          <Users className="h-4 w-4 mr-1" />
                          {incident.responseTeam}
                        </div>
                        {incident.eta && (
                          <div className="flex items-center text-xs text-gray-500">
                            <Timer className="h-4 w-4 mr-1" />
                            ETA: {incident.eta}
                          </div>
                        )}
                      </div>
                    </div>
                    <button className="p-2 hover:bg-gray-50 rounded">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Response Protocols */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Quick Response Protocols</h2>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {[
                'Code Blue Protocol',
                'Fire Emergency Protocol',
                'Security Emergency Protocol',
                'Rapid Response Protocol',
                'Mass Casualty Protocol',
                'Evacuation Protocol'
              ].map((protocol) => (
                <button
                  key={protocol}
                  onClick={() => setActiveProtocol(protocol)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeProtocol === protocol
                      ? 'bg-red-50 text-red-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {protocol}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Communication Tools */}
      <div className="mt-6 bg-white rounded-lg shadow p-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Emergency Communication</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
            <option>All Teams</option>
            <option>Response Team A</option>
            <option>Response Team B</option>
          </select>
          <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-red-500 focus:ring-red-500">
            <option>Critical Priority</option>
            <option>High Priority</option>
            <option>Medium Priority</option>
          </select>
          <div className="flex space-x-2">
            <button className="flex-1 bg-red-100 text-red-700 px-4 py-2 rounded hover:bg-red-200">
              <Radio className="h-4 w-4 inline-block mr-2" />
              Broadcast
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 