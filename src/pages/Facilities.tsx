import React, { useState } from 'react';
import { 
  MapPin, 
  Building, 
  Users, 
  ArrowUpRight, 
  Globe, 
  Phone,
  CheckCircle2,
  Clock,
  Plus
} from 'lucide-react';
import { motion } from 'framer-motion';

const initialFacilities = [
  { id: '1', name: 'Central General Hospital', location: 'Downtown Metro', patients: 4250, staff: 120, type: 'Public', status: 'Optimal' },
  { id: '2', name: 'St. Mary Wellness Center', location: 'North District', patients: 1840, staff: 45, type: 'Private', status: 'Optimal' },
  { id: '3', name: 'Hope Community Clinic', location: 'East Side', patients: 850, staff: 12, type: 'NGO', status: 'Strained' },
  { id: '4', name: 'Riverside Health Unit', location: 'West Valley', patients: 2100, staff: 38, type: 'Public', status: 'Optimal' },
  { id: '5', name: 'Zion Specialty Care', location: 'South End', patients: 540, staff: 24, type: 'Private', status: 'Optimal' },
];

const Facilities = () => {
  const [facilities] = useState(initialFacilities);

  return (
    <div className="space-y-8 max-w-7xl mx-auto pb-10">
      {/* Header Image Header */}
      <div className="relative h-48 rounded-3xl overflow-hidden group">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/51bf416c-ff91-4507-9657-ae6a0b1ffc9a/facility-header-ae760b9d-1775382521235.webp" 
          alt="Facility Header"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/40 flex items-end p-8">
          <div>
            <h1 className="text-3xl font-bold text-white">Healthcare Facilities</h1>
            <p className="text-white/80">Managing 24 connected locations across the network.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <Building className="h-6 w-6 text-blue-600" />
            <div>
              <div className="text-sm text-slate-500 font-medium">Active Sites</div>
              <div className="text-xl font-bold">24 Locations</div>
            </div>
          </div>
          <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-3">
            <Users className="h-6 w-6 text-green-600" />
            <div>
              <div className="text-sm text-slate-500 font-medium">Total Staff</div>
              <div className="text-xl font-bold">1,482 Personnel</div>
            </div>
          </div>
        </div>
        <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-medium flex items-center gap-2 hover:bg-slate-800 transition-all active:scale-95 shadow-lg">
          <Plus className="h-5 w-5" />
          Add Facility
        </button>
      </div>

      {/* Facility Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {facilities.map((facility, idx) => (
          <motion.div
            key={facility.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            whileHover={{ y: -5 }}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all"
          >
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-2xl ${
                  facility.type === 'Public' ? 'bg-blue-50 text-blue-600' : 
                  facility.type === 'Private' ? 'bg-purple-50 text-purple-600' : 'bg-emerald-50 text-emerald-600'
                }`}>
                  <Building className="h-6 w-6" />
                </div>
                <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                  facility.status === 'Optimal' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                }`}>
                  {facility.status}
                </span>
              </div>
              
              <h3 className="text-xl font-bold text-slate-900">{facility.name}</h3>
              <div className="flex items-center gap-1 text-slate-500 text-sm mt-1 mb-6">
                <MapPin className="h-3.5 w-3.5" />
                {facility.location}
              </div>

              <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Patients</div>
                  <div className="text-lg font-bold text-slate-800">{facility.patients.toLocaleString()}</div>
                </div>
                <div>
                  <div className="text-xs text-slate-400 font-bold uppercase">Staff</div>
                  <div className="text-lg font-bold text-slate-800">{facility.staff}</div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="flex -space-x-2">
                  {[1,2,3].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-200 flex items-center justify-center text-[10px] font-bold">
                      {String.fromCharCode(64 + i + idx)}
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] font-bold text-blue-600">
                    +12
                  </div>
                </div>
                <button className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:underline">
                  View Details
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Support Section */}
      <div className="bg-slate-900 rounded-3xl p-8 text-white flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="space-y-4 max-w-xl text-center md:text-left">
          <h2 className="text-2xl font-bold">Need assistance with facility integration?</h2>
          <p className="text-slate-400">Our technical support team is available 24/7 to help you set up new clinics and sync data from existing systems.</p>
          <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              API Documentation
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Secure Data Sync
            </div>
            <div className="flex items-center gap-2 text-sm font-medium">
              <CheckCircle2 className="h-4 w-4 text-green-400" />
              Multi-region Support
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-3 min-w-[200px]">
          <button className="w-full bg-white text-slate-900 py-3 rounded-xl font-bold hover:bg-slate-100 transition-colors">
            Contact Support
          </button>
          <button className="w-full bg-slate-800 text-white py-3 rounded-xl font-bold hover:bg-slate-700 transition-colors">
            View Knowledge Base
          </button>
        </div>
      </div>
    </div>
  );
};

export default Facilities;