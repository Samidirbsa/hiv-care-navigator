import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Filter, 
  MoreVertical, 
  UserPlus,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  FileText
} from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

const initialPatients = [
  { id: '1', name: 'John Doe', age: 35, gender: 'Male', status: 'Active', artStartDate: '2023-01-15', viralLoad: 20, lastVisit: '2024-03-10' },
  { id: '2', name: 'Sarah Wilson', age: 28, gender: 'Female', status: 'Active', artStartDate: '2022-06-20', viralLoad: 15, lastVisit: '2024-03-05' },
  { id: '3', name: 'Michael Chen', age: 45, gender: 'Male', status: 'Inactive', artStartDate: '2021-11-12', viralLoad: 450, lastVisit: '2023-12-15' },
  { id: '4', name: 'Emma Davis', age: 31, gender: 'Female', status: 'Active', artStartDate: '2023-08-05', viralLoad: 0, lastVisit: '2024-02-28' },
  { id: '5', name: 'Robert Taylor', age: 52, gender: 'Male', status: 'Lost to Follow-up', artStartDate: '2020-03-15', viralLoad: 1200, lastVisit: '2023-08-10' },
];

const Patients = ({ onRegisterClick }: { onRegisterClick?: () => void }) => {
  const [patients, setPatients] = useState(initialPatients);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = patients.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 max-w-7xl mx-auto pb-10">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Patient Registry</h1>
          <p className="text-slate-500">Manage and track patient treatment journeys securely.</p>
        </div>
        <button 
          onClick={onRegisterClick}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 shadow-lg shadow-blue-500/20 transition-all active:scale-95"
        >
          <UserPlus className="h-5 w-5" />
          Enroll New Client
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {/* Table Filters */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="relative w-full md:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Filter by name or ID..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <Filter className="h-4 w-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors">
              <FileText className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 border-b border-slate-100">
              <tr>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Patient Name</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">ART Start</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Viral Load</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Last Visit</th>
                <th className="px-6 py-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredPatients.map((patient, idx) => (
                <motion.tr 
                  key={patient.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="hover:bg-slate-50 transition-colors group"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600">
                        {patient.name.charAt(0)}
                      </div>
                      <div>
                        <div className="font-semibold text-slate-900">{patient.name}</div>
                        <div className="text-xs text-slate-500">{patient.age}y \u2022 {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      patient.status === 'Active' ? 'bg-green-100 text-green-700' : 
                      patient.status === 'Inactive' ? 'bg-slate-100 text-slate-700' : 'bg-red-100 text-red-700'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${
                        patient.status === 'Active' ? 'bg-green-600' : 
                        patient.status === 'Inactive' ? 'bg-slate-600' : 'bg-red-600'
                      }`}></span>
                      {patient.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-600 font-medium">
                    {patient.artStartDate}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-slate-100 h-1.5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${patient.viralLoad < 100 ? 'bg-green-500' : 'bg-amber-500'}`} 
                          style={{ width: `${Math.min(100, (patient.viralLoad / 1000) * 100)}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium text-slate-700">{patient.viralLoad} copies/mL</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500">
                    {patient.lastVisit}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all">
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients;