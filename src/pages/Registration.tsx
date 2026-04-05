import React from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ClipboardPlus, Info } from 'lucide-react';
import PatientEntryForm from '@/components/PatientEntryForm';

const Registration = ({ onBack }: { onBack: () => void }) => {
  const bgUrl = "https://storage.googleapis.com/dala-prod-public-storage/generated-images/51bf416c-ff91-4507-9657-ae6a0b1ffc9a/registration-bg-8cd38994-1775384055612.webp";

  return (
    <div className="min-h-full flex flex-col max-w-7xl mx-auto">
      <div 
        className="h-48 md:h-64 relative overflow-hidden rounded-3xl mb-8"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-blue-900/60 backdrop-blur-[2px]" />
        <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 text-white">
          <button 
            onClick={onBack}
            className="flex items-center gap-2 text-white/80 hover:text-white mb-4 transition-colors w-fit group"
          >
            <ChevronLeft className="h-5 w-5 group-hover:-translate-x-1 transition-transform" />
            <span className="font-medium text-sm">Back to Registry</span>
          </button>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="bg-white/20 p-2 rounded-xl backdrop-blur-md border border-white/20">
                <ClipboardPlus className="h-6 w-6" />
              </div>
              <h1 className="text-3xl font-extrabold tracking-tight">Client Registration</h1>
            </div>
            <p className="text-blue-50/90 max-w-xl text-sm md:text-base leading-relaxed">
              Enroll new clients into the system by transcribing details from the physical testing register.
            </p>
          </motion.div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mb-12">
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-200/50 p-6 md:p-8"
          >
            <PatientEntryForm onCancel={onBack} />
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="bg-blue-50 border border-blue-100 rounded-2xl p-6"
          >
            <div className="flex items-center gap-2 text-blue-700 mb-3">
              <Info className="h-5 w-5" />
              <h4 className="font-bold text-sm">Required Information</h4>
            </div>
            <ul className="text-xs text-blue-700/80 space-y-2 list-disc pl-4">
              <li>Ensure "Unique ART Number" matches official records</li>
              <li>"Date Tested" must be prior to "ART Enrollment Date"</li>
              <li>"HTC Provider" is mandatory for regional reporting</li>
              <li>Provide clear remarks for any declined enrollments</li>
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-slate-50 border border-slate-200 rounded-2xl p-6"
          >
            <h4 className="font-bold text-sm text-slate-800 mb-3">Recent Activity</h4>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-3">
                  <div className="h-8 w-8 rounded-full bg-slate-200 flex-shrink-0" />
                  <div className="space-y-1">
                    <div className="h-3 w-24 bg-slate-200 rounded" />
                    <div className="h-2 w-16 bg-slate-100 rounded" />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Registration;