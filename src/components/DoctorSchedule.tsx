import React, { useState } from 'react';
import { 
  Clock, 
  Calendar, 
  User, 
  MapPin, 
  AlertCircle, 
  MoreVertical,
  Plus,
  Settings,
  Calendar as CalendarIcon
} from 'lucide-react';

interface Appointment {
  id: string;
  startTime: string;
  endTime: string;
  patient: {
    id: string;
    name: string;
    contactNumber?: string;
  };
  type: ConsultationType;
  room: {
    number: string;
    floor?: string;
    wing?: string;
  };
  status: AppointmentStatus;
  notes?: string;
  equipment?: string[];
}

type ConsultationType = 'New Patient' | 'Follow-up' | 'Emergency' | 'Telemedicine' | 'Procedure' | 'Review';
type AppointmentStatus = 'Confirmed' | 'In Progress' | 'Completed' | 'Cancelled' | 'No Show';
type ViewType = 'Day' | 'Week' | 'Month';

const appointments: Appointment[] = [
  {
    id: 'A001',
    startTime: '10:30 AM',
    endTime: '11:00 AM',
    patient: {
      id: 'P123',
      name: 'Sarah Johnson',
      contactNumber: '555-0123'
    },
    type: 'Follow-up',
    room: {
      number: '305',
      floor: '3rd',
      wing: 'East'
    },
    status: 'Confirmed',
    notes: 'Post-surgery check',
    equipment: ['ECG Machine']
  }
];

const statusColors = {
  Available: 'bg-green-100 text-green-800',
  Booked: 'bg-blue-100 text-blue-800',
  'In Progress': 'bg-orange-100 text-orange-800',
  Break: 'bg-gray-100 text-gray-800',
  Emergency: 'bg-red-100 text-red-800',
  Buffer: 'bg-gray-50 text-gray-600'
};

export default function DoctorSchedule() {
  const [activeView, setActiveView] = useState<ViewType>('Day');
  const [selectedDate, setSelectedDate] = useState(new Date());

  const stats = {
    availableHours: 4,
    bookedHours: 6,
    nextAppointment: 'Sarah Johnson - 10:30 AM'
  };

  return (
    <div className="p-6">
      {/* Schedule Header */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Clock className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900">Schedule Overview</h1>
            </div>
            <div className="flex space-x-4 text-sm">
              <span className="text-green-600">Available: {stats.availableHours}hrs</span>
              <span className="text-blue-600">Booked: {stats.bookedHours}hrs</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Next: {stats.nextAppointment}
          </div>
        </div>

        {/* View Controls */}
        <div className="p-4 flex justify-between items-center border-b border-gray-200">
          <div className="flex space-x-2">
            {(['Day', 'Week', 'Month'] as ViewType[]).map((view) => (
              <button
                key={view}
                onClick={() => setActiveView(view)}
                className={`px-4 py-2 rounded ${
                  activeView === view
                    ? 'bg-blue-50 text-blue-700'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                {view}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-50 rounded">
              <Plus className="h-5 w-5 text-gray-400" />
            </button>
            <button className="p-2 hover:bg-gray-50 rounded">
              <Settings className="h-5 w-5 text-gray-400" />
            </button>
          </div>
        </div>
      </div>

      {/* Schedule Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3">
          <div className="bg-white rounded-lg shadow">
            {appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="p-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {appointment.startTime} - {appointment.endTime}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        statusColors[appointment.status === 'In Progress' ? 'In Progress' : 'Booked']
                      }`}>
                        {appointment.status}
                      </span>
                    </div>
                    <div className="mt-2">
                      <div className="flex items-center space-x-2">
                        <User className="h-4 w-4 text-gray-400" />
                        <span className="text-sm font-medium">{appointment.patient.name}</span>
                      </div>
                      <div className="mt-1 flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-sm text-gray-600">Room {appointment.room.number}</span>
                      </div>
                      {appointment.notes && (
                        <p className="mt-1 text-sm text-gray-600">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                  <button className="p-2 hover:bg-gray-100 rounded">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Availability Controls */}
        <div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Availability</h2>
            </div>
            <div className="p-4 space-y-4">
              <select className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500">
                <option>Available</option>
                <option>In Consultation</option>
                <option>Break</option>
                <option>Out of Office</option>
              </select>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Plus className="h-4 w-4 mr-2" />
                Add Break Time
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <CalendarIcon className="h-4 w-4 mr-2" />
                Block Time Slot
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 