import React from 'react';
import { 
  Users, 
  UserCheck, 
  Activity, 
  TrendingUp, 
  Clock, 
  AlertCircle 
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { motion } from 'framer-motion';

const stats = [
  { title: 'Total Patients', value: '14,284', change: '+12%', trend: 'up', icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
  { title: 'On ART Treatment', value: '12,850', change: '+8%', trend: 'up', icon: UserCheck, color: 'text-green-600', bg: 'bg-green-50' },
  { title: 'Viral Suppression', value: '94.2%', change: '+1.5%', trend: 'up', icon: Activity, color: 'text-purple-600', bg: 'bg-purple-50' },
  { title: 'Lost to Follow-up', value: '284', change: '-4%', trend: 'down', icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50' },
];

const chartData = [
  { month: 'Jan', patients: 1200, art: 1100 },
  { month: 'Feb', patients: 1400, art: 1250 },
  { month: 'Mar', patients: 1700, art: 1500 },
  { month: 'Apr', patients: 2100, art: 1800 },
  { month: 'May', patients: 2400, art: 2100 },
  { month: 'Jun', patients: 2800, art: 2400 },
];

const pieData = [
  { name: 'Active', value: 85, color: '#2563eb' },
  { name: 'On Break', value: 10, color: '#8b5cf6' },
  { name: 'Critical', value: 5, color: '#ef4444' },
];

const Dashboard = () => {
  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Health Management Dashboard</h1>
          <p className="text-slate-500">Real-time monitoring of HIV positive tracking across all facilities.</p>
        </div>
        <div className="flex items-center gap-2 text-sm bg-blue-50 text-blue-700 px-4 py-2 rounded-full font-medium">
          <AlertCircle className="h-4 w-4" />
          Update required for 12 patient records
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, idx) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                <stat.icon className="h-6 w-6" />
              </div>
              <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                stat.trend === 'up' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
              }`}>
                {stat.change}
              </span>
            </div>
            <div className="mt-4">
              <p className="text-sm font-medium text-slate-500">{stat.title}</p>
              <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-bold text-slate-900">Treatment Enrollment Growth</h3>
            <select className="text-sm border border-slate-200 rounded-lg px-2 py-1 outline-none">
              <option>Last 6 Months</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorPatients" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                />
                <Area type="monotone" dataKey="patients" stroke="#2563eb" strokeWidth={2} fillOpacity={1} fill="url(#colorPatients)" />
                <Area type="monotone" dataKey="art" stroke="#10b981" strokeWidth={2} fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Patient Status Distribution</h3>
          <div className="h-[250px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="mt-4 space-y-2">
            {pieData.map((item) => (
              <div key={item.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }}></div>
                  <span className="text-slate-600">{item.name}</span>
                </div>
                <span className="font-bold text-slate-900">{item.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Image Section */}
      <div className="relative h-64 rounded-3xl overflow-hidden shadow-xl">
        <img 
          src="https://storage.googleapis.com/dala-prod-public-storage/generated-images/51bf416c-ff91-4507-9657-ae6a0b1ffc9a/dashboard-overview-27c421fc-1775382520692.webp" 
          alt="Medical Dashboard" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 to-transparent flex flex-col justify-center px-12">
          <h2 className="text-3xl font-bold text-white max-w-md">Comprehensive Patient Care Tracking</h2>
          <p className="text-blue-100 mt-2 max-w-xs">Connecting healthcare facilities with data-driven insights for better outcomes.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;