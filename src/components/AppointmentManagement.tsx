import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  User, 
  MapPin, 
  AlertCircle,
  MoreVertical,
  Filter,
  Printer,
  Download,
  Bell
} from 'lucide-react';

interface Appointment {
  id: string;
  time: Date;
  patient: {
    id: string;
    name: string;
    photo: string;
    alerts: string[];
  };
  type: AppointmentType;
  status: AppointmentStatus;
  duration: number;
  room: string;
  provider: string;
  notes: string;
}

type AppointmentType = 'Regular Checkup' | 'Follow-up' | 'Emergency' | 
                      'Specialist Consultation' | 'Virtual Visit' | 'Lab Work' | 'Procedure';
type AppointmentStatus = 'Scheduled' | 'Checked In' | 'In Progress' | 
                        'Completed' | 'Cancelled' | 'No Show';

const statusColors = {
  Scheduled: 'bg-blue-100 text-blue-800',
  'Checked In': 'bg-yellow-100 text-yellow-800',
  'In Progress': 'bg-orange-100 text-orange-800',
  Completed: 'bg-green-100 text-green-800',
  Cancelled: 'bg-gray-100 text-gray-800',
  'No Show': 'bg-red-100 text-red-800'
};

export default function AppointmentManagement() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [activeFilter, setActiveFilter] = useState<AppointmentStatus | 'All'>('All');

  return (
    <div className="p-6">
      {/* Status Bar */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <Calendar className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900">Today's Schedule: {selectedDate.toLocaleDateString()}</h1>
            </div>
            <div className="flex space-x-2">
              <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <Filter className="h-5 w-5" />
              </button>
              <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <Printer className="h-5 w-5" />
              </button>
              <button className="px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-md">
                <Download className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Status Tabs */}
          <div className="mt-4 flex space-x-4">
            {['Upcoming', 'In Progress', 'Complete'].map((status) => (
              <button
                key={status}
                className={`px-4 py-2 rounded-md text-sm font-medium ${
                  status === 'Upcoming' ? 'bg-blue-100 text-blue-800' :
                  status === 'In Progress' ? 'bg-orange-100 text-orange-800' :
                  'bg-green-100 text-green-800'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Appointment Cards */}
      <div className="grid gap-6">
        {/* Sample Appointment Card */}
        <div className="bg-white rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex items-center space-x-4">
                <Clock className="h-5 w-5 text-gray-400" />
                <div>
                  <div className="text-lg font-medium text-gray-900">09:30 AM</div>
                  <div className="text-sm text-gray-500">30 mins</div>
                </div>
              </div>
              <button className="p-2 hover:bg-gray-100 rounded">
                <MoreVertical className="h-4 w-4 text-gray-400" />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <User className="h-4 w-4 text-gray-400" />
                  <span className="text-sm font-medium">John Smith</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">ID: P123456</div>
              </div>
              <div>
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  <span className="text-sm">Room 203</span>
                </div>
                <div className="mt-1 text-sm text-gray-500">Follow-up</div>
              </div>
            </div>

            <div className="mt-4 flex space-x-2">
              <button className="flex-1 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                Start
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                Reschedule
              </button>
              <button className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-50">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 