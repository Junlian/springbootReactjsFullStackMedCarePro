import React, { useState } from 'react';
import { 
  Activity, 
  Pill, 
  FileText, 
  TestTube, 
  FileCheck, 
  Camera, 
  Stethoscope,
  MoreVertical,
  AlertCircle
} from 'lucide-react';

interface ClinicalAction {
  id: string;
  time: string;
  action: string;
  patient: {
    id: string;
    name: string;
  };
  status: 'Completed' | 'Pending' | 'In Progress' | 'Error';
  provider: string;
  values?: string;
  error?: string;
}

const recentActions: ClinicalAction[] = [
  {
    id: 'A001',
    time: '10:30 AM',
    action: 'Blood Pressure Reading',
    patient: { id: 'P123456', name: 'John Smith' },
    status: 'Completed',
    provider: 'Dr. Sarah',
    values: '120/80 mmHg'
  },
  {
    id: 'A002',
    time: '11:15 AM',
    action: 'Blood Sugar Test',
    patient: { id: 'P123457', name: 'Mary Johnson' },
    status: 'Pending',
    provider: 'Dr. Michael',
    values: '140 mg/dL'
  },
  {
    id: 'A003',
    time: '11:45 AM',
    action: 'ECG Recording',
    patient: { id: 'P123458', name: 'Robert Davis' },
    status: 'In Progress',
    provider: 'Dr. Sarah'
  }
];

interface ToolButton {
  icon: any;
  label: string;
  color: string;
  onClick: () => void;
}

const toolButtons = [
  { 
    icon: Activity, 
    label: 'Vitals', 
    color: 'text-blue-500',
    onClick: () => console.log('Vitals clicked')
  },
  { icon: Pill, label: 'Prescribe', color: 'text-green-500' },
  { icon: FileText, label: 'Notes', color: 'text-purple-500' },
  { icon: TestTube, label: 'Lab Orders', color: 'text-amber-500' },
  { icon: FileCheck, label: 'Templates', color: 'text-indigo-500' },
  { icon: Camera, label: 'Imaging', color: 'text-rose-500' },
  { icon: Stethoscope, label: 'Procedures', color: 'text-cyan-500' },
];

const statusColors = {
  Completed: 'text-green-600',
  Pending: 'text-amber-600',
  'In Progress': 'text-blue-600',
  Error: 'text-red-600'
};

export default function ClinicalTools() {
  const [activeCalculator, setActiveCalculator] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [calculatorLoading, setCalculatorLoading] = useState(false);

  const handleCalculatorClick = async (calc: string) => {
    setCalculatorLoading(true);
    try {
      setActiveCalculator(calc);
      // Add calculator loading logic here
    } finally {
      setCalculatorLoading(false);
    }
  };

  // Add loading indicator
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500" />
      </div>
    );
  }

  return (
    <div className="p-6">
      {/* Quick Access Toolbar */}
      <div className="bg-white p-4 rounded-lg shadow mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Frequently Used Tools</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2 sm:gap-4">
          {toolButtons.map((tool) => (
            <button
              key={tool.label}
              aria-label={tool.label}
              onClick={tool.onClick}
              className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <tool.icon className={`h-6 w-6 ${tool.color} mb-2`} />
              <span className="text-sm text-gray-600">{tool.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Clinical Actions */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold text-gray-900">Recent Clinical Actions</h2>
            </div>
            <div className="divide-y divide-gray-200">
              {recentActions.map((action) => (
                <div key={action.id} className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">{action.time}</span>
                        <h3 className="text-sm font-medium text-gray-900">{action.action}</h3>
                      </div>
                      <div className="mt-1">
                        <span className="text-xs text-gray-500">
                          Patient: {action.patient.name} (ID: {action.patient.id})
                        </span>
                      </div>
                      <div className="mt-1 flex items-center space-x-2">
                        <span className={`text-xs ${statusColors[action.status]}`}>
                          Status: {action.status}
                        </span>
                        {action.values && (
                          <span className="text-xs font-medium text-gray-900">
                            Values: {action.values}
                          </span>
                        )}
                      </div>
                    </div>
                    <button className="p-1 hover:bg-gray-50 rounded">
                      <MoreVertical className="h-4 w-4 text-gray-400" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Medical Calculator Panel */}
        <div className="bg-white rounded-lg shadow md:static fixed bottom-0 left-0 right-0 md:w-auto w-full md:h-auto max-h-[50vh] md:max-h-none overflow-y-auto">
          <div className="p-4 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Medical Calculators</h2>
          </div>
          <div className="p-4">
            <div className="space-y-2">
              {[
                'BMI Calculator',
                'Creatinine Clearance',
                'Drug Dosing',
                'Body Surface Area',
                'Pregnancy Calculator',
                'Glasgow Coma Scale',
                'Wells Score'
              ].map((calc) => (
                <button
                  key={calc}
                  onClick={() => setActiveCalculator(calc)}
                  className={`w-full text-left px-4 py-2 rounded ${
                    activeCalculator === calc
                      ? 'bg-blue-50 text-blue-700'
                      : 'hover:bg-gray-50 text-gray-700'
                  }`}
                >
                  {calc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Patient Safety Alerts */}
      <div 
        className="mt-6 bg-amber-50 border border-amber-200 rounded-lg p-4"
        role="alert"
        aria-live="polite"
      >
        <div className="flex items-center space-x-2">
          <AlertCircle className="h-5 w-5 text-amber-500" aria-hidden="true" />
          <h3 className="text-sm font-medium text-amber-800">Active Safety Alerts</h3>
        </div>
        <div className="mt-2 text-sm text-amber-700">
          <ul role="list">
            <li>• Drug interaction warning: Aspirin + Warfarin</li>
            <li>• Critical lab value pending review</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 