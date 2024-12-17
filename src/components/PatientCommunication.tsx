import React, { useState } from 'react';
import { 
  MessageCircle, 
  Clock, 
  Flag, 
  MoreVertical, 
  Paperclip,
  Search,
  Filter,
  AlertCircle
} from 'lucide-react';

interface Message {
  id: string;
  timestamp: string;
  from: {
    id: string;
    name: string;
  };
  type: MessageType;
  priority: Priority;
  status: 'Read' | 'Unread' | 'Archived' | 'Flagged';
  preview: string;
  followUpBy?: string;
}

type MessageType = 'General Inquiry' | 'Medication Question' | 'Appointment Request' | 
                  'Lab Results' | 'Prescription Renewal' | 'Emergency' | 'Administrative';
type Priority = 'Urgent' | 'High' | 'Normal' | 'Low' | 'FYI';

const messages: Message[] = [
  {
    id: 'M001',
    timestamp: '10:30 AM',
    from: { id: 'P123', name: 'John Smith' },
    type: 'Medication Question',
    priority: 'High',
    status: 'Unread',
    preview: 'Having side effects from the new medication...'
  },
  // Add more mock messages
];

const priorityColors = {
  Urgent: 'bg-red-100 text-red-800',
  High: 'bg-orange-100 text-orange-800',
  Normal: 'bg-blue-100 text-blue-800',
  Low: 'bg-green-100 text-green-800',
  FYI: 'bg-gray-100 text-gray-800'
};

export default function PatientCommunication() {
  const [activeTemplate, setActiveTemplate] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const stats = {
    unread: 12,
    followUp: 5,
    urgent: 3
  };

  return (
    <div className="p-6">
      {/* Message Status Bar */}
      <div className="bg-white rounded-lg shadow-lg mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <MessageCircle className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900">Messages Overview</h1>
            </div>
            <div className="flex space-x-4 text-sm">
              <span className="text-blue-600">Unread: {stats.unread}</span>
              <span className="text-orange-600">Follow-up: {stats.followUp}</span>
              <span className="text-red-600">Urgent: {stats.urgent}</span>
            </div>
          </div>
          <div className="mt-2 text-sm text-gray-600">
            Latest: Lab results ready (2m ago)
          </div>
        </div>

        {/* Filter Bar */}
        <div className="p-4 bg-gray-50 border-b border-gray-200">
          <div className="flex flex-wrap gap-4">
            <div className="flex-1 min-w-[200px]">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search messages..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option>All Messages</option>
              <option>Unread</option>
              <option>Flagged</option>
              <option>Archived</option>
            </select>
            <select className="border border-gray-300 rounded-md px-3 py-2 focus:ring-blue-500 focus:border-blue-500">
              <option>Sort by Date</option>
              <option>Sort by Priority</option>
              <option>Sort by Type</option>
            </select>
          </div>
        </div>

        {/* Message Grid */}
        <div className="divide-y divide-gray-200">
          {messages.map((message) => (
            <div key={message.id} className="p-4 hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">{message.timestamp}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${priorityColors[message.priority]}`}>
                      {message.priority}
                    </span>
                    {message.status === 'Unread' && (
                      <span className="text-xs bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
                        New
                      </span>
                    )}
                  </div>
                  <div className="mt-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">From: {message.from.name}</span>
                      <span className="text-xs text-gray-500">#{message.from.id}</span>
                    </div>
                    <div className="mt-1 text-sm text-gray-600">
                      <span className="font-medium">Type:</span> {message.type}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 line-clamp-2">{message.preview}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <Flag className="h-4 w-4 text-gray-400" />
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-full">
                    <MoreVertical className="h-4 w-4 text-gray-400" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Response Templates */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Response Templates</h2>
            </div>
            <div className="p-4">
              <div className="space-y-2">
                {[
                  'Appointment Confirmation',
                  'Prescription Instructions',
                  'Lab Result Notification',
                  'Follow-up Reminder',
                  'General Health Tips',
                  'Emergency Instructions'
                ].map((template) => (
                  <button
                    key={template}
                    onClick={() => setActiveTemplate(template)}
                    className={`w-full text-left px-4 py-2 rounded ${
                      activeTemplate === template
                        ? 'bg-blue-50 text-blue-700'
                        : 'hover:bg-gray-50 text-gray-700'
                    }`}
                  >
                    {template}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Communication Tools */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Communication Tools</h2>
          </div>
          <div className="p-4 space-y-4">
            <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              New Message
            </button>
            <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
              <Paperclip className="h-4 w-4 mr-2" />
              Attach Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 