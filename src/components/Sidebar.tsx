import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Calendar, 
  Users, 
  FileText, 
  Clock, 
  MessageCircle, 
  Stethoscope, 
  AlertCircle 
} from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
  { icon: Calendar, label: 'Appointments', path: '/appointments' },
  { icon: Users, label: 'Patients', path: '/patients' },
  { icon: FileText, label: 'Records', path: '/records' },
  { icon: Clock, label: 'Schedule', path: '/schedule' },
  { icon: MessageCircle, label: 'Communication', path: '/communication' },
  { icon: Stethoscope, label: 'Clinical Tools', path: '/clinical-tools' },
  { icon: AlertCircle, label: 'Emergency', path: '/emergency' },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="bg-white w-64 min-h-screen border-r">
      <nav className="mt-5 px-2">
        {navItems.map((item) => (
          <Link
            key={item.label}
            to={item.path}
            className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md ${
              location.pathname === item.path
                ? 'bg-blue-50 text-blue-600'
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon
              className={`mr-3 h-5 w-5 ${
                location.pathname === item.path ? 'text-blue-500' : 'text-gray-400 group-hover:text-gray-500'
              }`}
            />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}