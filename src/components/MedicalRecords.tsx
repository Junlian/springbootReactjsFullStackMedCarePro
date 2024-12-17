import React, { useState } from 'react';
import { 
  FileText, 
  Search, 
  Filter, 
  Plus,
  Download,
  Upload,
  Share2,
  Lock,
  AlertCircle,
  Clock
} from 'lucide-react';

interface MedicalRecord {
  id: string;
  patientId: string;
  patientName: string;
  type: RecordType;
  category: RecordCategory;
  date: string;
  status: RecordStatus;
  lastModified: string;
  accessLevel: AccessLevel;
  tags: string[];
}

type RecordType = 'Clinical Notes' | 'Lab Results' | 'Imaging' | 'Prescriptions' | 
                 'Procedures' | 'Vaccinations' | 'Allergies' | 'Medical History';
type RecordCategory = 'General' | 'Cardiology' | 'Neurology' | 'Orthopedics' | 'Pediatrics';
type RecordStatus = 'Active' | 'Archived' | 'Pending Review' | 'Confidential';
type AccessLevel = 'Full Access' | 'Limited' | 'Restricted' | 'Emergency Only';

const records: MedicalRecord[] = [
  {
    id: 'R001',
    patientId: 'P123',
    patientName: 'John Smith',
    type: 'Clinical Notes',
    category: 'Cardiology',
    date: '2024-03-15',
    status: 'Active',
    lastModified: '2 hours ago',
    accessLevel: 'Full Access',
    tags: ['Follow-up', 'Critical']
  }
];

const statusColors = {
  Active: 'bg-green-100 text-green-800',
  Archived: 'bg-gray-100 text-gray-800',
  'Pending Review': 'bg-yellow-100 text-yellow-800',
  Confidential: 'bg-red-100 text-red-800'
};

export default function MedicalRecords() {
  const [activeTab, setActiveTab] = useState<RecordType>('Clinical Notes');
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="p-6">
      {/* Records Navigation */}
      <div className="bg-white rounded-lg shadow mb-6">
        <div className="p-4 border-b border-gray-200">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-blue-500" />
              <h1 className="text-xl font-bold text-gray-900">Medical Records</h1>
            </div>
            <div className="flex space-x-2">
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                <Plus className="h-4 w-4 inline-block mr-2" />
                New Record
              </button>
            </div>
          </div>
        </div>

        {/* Search and Filter Bar */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search records..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <Filter className="h-5 w-5 inline-block mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Record Type Tabs */}
        <div className="px-4 border-b border-gray-200">
          <div className="flex space-x-4 overflow-x-auto">
            {[
              'Clinical Notes',
              'Lab Results',
              'Imaging',
              'Prescriptions',
              'Procedures',
              'Vaccinations'
            ].map((type) => (
              <button
                key={type}
                onClick={() => setActiveTab(type as RecordType)}
                className={`px-4 py-2 border-b-2 whitespace-nowrap ${
                  activeTab === type
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Records Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            {records.map((record) => (
              <div
                key={record.id}
                className="p-4 border-b border-gray-200 hover:bg-gray-50"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-medium text-gray-900">
                        {record.patientName}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs ${statusColors[record.status]}`}>
                        {record.status}
                      </span>
                    </div>
                    <div className="mt-1">
                      <span className="text-sm text-gray-500">
                        {record.type} - {record.category}
                      </span>
                    </div>
                    <div className="mt-2 flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-500">
                        Last modified {record.lastModified}
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Download className="h-4 w-4 text-gray-400" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded">
                      <Share2 className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions Panel */}
        <div>
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">Quick Actions</h2>
            </div>
            <div className="p-4 space-y-4">
              <button className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700">
                <Upload className="h-4 w-4 mr-2" />
                Upload Documents
              </button>
              <button className="w-full flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <Lock className="h-4 w-4 mr-2" />
                Access Controls
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 