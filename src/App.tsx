import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Calendar, Users, FileText, MessageCircle } from 'lucide-react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import PatientOverview from './components/PatientOverview';
import StatsCard from './components/StatsCard';
import ActivityFeed from './components/ActivityFeed';
import ClinicalTools from './components/ClinicalTools';
import ErrorBoundary from './components/ErrorBoundary';
import EmergencyResponse from './components/EmergencyResponse';
import PatientCommunication from './components/PatientCommunication';
import DoctorSchedule from './components/DoctorSchedule';
import MedicalRecords from './components/MedicalRecords';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Header />
        
        <div className="flex">
          <Sidebar />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={
                <div className="p-8">
                  <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                      <h1 className="text-2xl font-semibold text-gray-900">Welcome, Dr. Smith</h1>
                      <p className="mt-1 text-gray-500">Here's what's happening today</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                      <StatsCard
                        title="Appointments Today"
                        value={12}
                        change={20}
                        icon={<Calendar className="h-6 w-6" />}
                      />
                      <StatsCard
                        title="Active Patients"
                        value={45}
                        change={5}
                        icon={<Users className="h-6 w-6" />}
                      />
                      <StatsCard
                        title="Pending Reports"
                        value={8}
                        change={-10}
                        icon={<FileText className="h-6 w-6" />}
                      />
                      <StatsCard
                        title="Unread Messages"
                        value={3}
                        change={0}
                        icon={<MessageCircle className="h-6 w-6" />}
                      />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      <div className="lg:col-span-2">
                        <img
                          src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=2000&q=80"
                          alt="Medical Dashboard"
                          className="w-full h-48 object-cover rounded-lg shadow-md mb-8"
                        />
                      </div>
                      <div className="lg:col-span-1">
                        <ActivityFeed />
                      </div>
                    </div>
                  </div>
                </div>
              } />
              <Route path="/patients" element={<PatientOverview />} />
              <Route path="/clinical-tools" element={
                <ErrorBoundary>
                  <ClinicalTools />
                </ErrorBoundary>
              } />
              <Route path="/emergency" element={
                <ErrorBoundary>
                  <EmergencyResponse />
                </ErrorBoundary>
              } />
              <Route path="/communication" element={
                <ErrorBoundary>
                  <PatientCommunication />
                </ErrorBoundary>
              } />
              <Route path="/schedule" element={
                <ErrorBoundary>
                  <DoctorSchedule />
                </ErrorBoundary>
              } />
              <Route path="/records" element={
                <ErrorBoundary>
                  <MedicalRecords />
                </ErrorBoundary>
              } />
              {/* Add more routes as needed */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;