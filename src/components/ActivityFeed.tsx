import React from 'react';
import { Calendar, User, FileText, MessageCircle, Bell } from 'lucide-react';

const activities = [
  {
    id: 1,
    type: 'appointment',
    content: 'New appointment scheduled with Sarah Johnson',
    time: '10 minutes ago',
    icon: Calendar,
  },
  {
    id: 2,
    type: 'patient',
    content: 'New patient registration: Michael Brown',
    time: '30 minutes ago',
    icon: User,
  },
  {
    id: 3,
    type: 'record',
    content: 'Updated medical records for Patient #12345',
    time: '1 hour ago',
    icon: FileText,
  },
  {
    id: 4,
    type: 'message',
    content: 'New message from Dr. Williams regarding consultation',
    time: '2 hours ago',
    icon: MessageCircle,
  },
  {
    id: 5,
    type: 'alert',
    content: 'System maintenance scheduled for tonight',
    time: '3 hours ago',
    icon: Bell,
  },
];

export default function ActivityFeed() {
  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h2 className="text-lg font-semibold">Recent Activity</h2>
      </div>
      <div className="divide-y">
        {activities.map((activity) => (
          <div key={activity.id} className="p-4 hover:bg-gray-50">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <activity.icon className="h-5 w-5 text-gray-400" />
              </div>
              <div className="ml-3 flex-1">
                <p className="text-sm text-gray-800">{activity.content}</p>
                <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}