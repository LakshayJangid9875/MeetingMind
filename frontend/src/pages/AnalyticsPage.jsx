import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { Skeleton } from '../components/ui/Skeleton';
import api from '../api/axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, CartesianGrid
} from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload?.length) {
    return (
      <div className="bg-gray-900 border border-gray-700 rounded-xl px-3 py-2 text-sm">
        <p className="text-gray-400 mb-1">{label}</p>
        <p className="text-white font-medium">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

export default function AnalyticsPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading,  setLoading]  = useState(true);

  useEffect(() => {
    api.get('/api/meetings/').then(res => setMeetings(res.data))
      .catch(console.error).finally(() => setLoading(false));
  }, []);

  const totalActionItems = meetings.reduce((acc, m) => acc + (m.action_items?.length || 0), 0);
  const totalDecisions   = meetings.reduce((acc, m) => acc + (m.decisions?.length    || 0), 0);
  const readyMeetings    = meetings.filter(m => m.status === 'ready').length;

  const barData = meetings.slice(0, 7).map(m => ({
    name:  new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    tasks: m.action_items?.length || 0,
    decisions: m.decisions?.length || 0,
  })).reverse();

  const moodData = [
    { name: 'Productive',   value: meetings.filter(m => m.meeting_mood === 'productive').length   || 1 },
    { name: 'Neutral',      value: meetings.filter(m => m.meeting_mood === 'neutral').length      || 1 },
    { name: 'Unproductive', value: meetings.filter(m => m.meeting_mood === 'unproductive').length || 0 },
  ];

  const stats = [
    { icon: '🎙️', label: 'Total meetings',  value: meetings.length,  color: 'text-brand-400'  },
    { icon: '✅', label: 'Action items',     value: totalActionItems,  color: 'text-green-400'  },
    { icon: '🎯', label: 'Decisions made',   value: totalDecisions,    color: 'text-purple-400' },
    { icon: '⚡', label: 'Analyzed',         value: readyMeetings,     color: 'text-cyan-400'   },
  ];

  return (
    <div className="min-h-screen bg-surface-950 text-white flex">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">

        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
          <p className="text-gray-400 text-sm">Track your meeting productivity and insights over time.</p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-28 rounded-2xl" />) :
            stats.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-gray-900 border border-gray-800 hover:border-brand-500/20 rounded-2xl p-5 transition-all"
              >
                <div className="text-2xl mb-3">{s.icon}</div>
                <div className={`text-3xl font-bold ${s.color}`}>{s.value}</div>
                <div className="text-gray-400 text-sm mt-1">{s.label}</div>
              </motion.div>
            ))
          }
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

          {/* Bar chart */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="p-6">
              <h2 className="text-white font-semibold mb-6">Tasks & decisions per meeting</h2>
              {loading ? <Skeleton className="h-48" /> : (
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={barData} barGap={4}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#1f2937" vertical={false} />
                    <XAxis dataKey="name" stroke="#4b5563" tick={{ fontSize: 11, fill: '#6b7280' }} />
                    <YAxis stroke="#4b5563" tick={{ fontSize: 11, fill: '#6b7280' }} />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="tasks"     name="Tasks"     fill="#6366f1" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="decisions" name="Decisions" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              )}
            </Card>
          </motion.div>

          {/* Pie chart */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="p-6">
              <h2 className="text-white font-semibold mb-6">Meeting mood distribution</h2>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={moodData}
                    cx="50%" cy="50%"
                    outerRadius={80}
                    innerRadius={40}
                    dataKey="value"
                    paddingAngle={3}
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    labelLine={false}
                  >
                    {moodData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        </div>

        {/* Meetings table */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-white font-semibold">All meetings</h2>
              <span className="text-gray-500 text-sm">{meetings.length} total</span>
            </div>
            {loading ? (
              <div className="p-4 space-y-3">
                {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-12 rounded-xl" />)}
              </div>
            ) : meetings.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">No meetings yet.</div>
            ) : (
              <div className="divide-y divide-gray-800">
                {meetings.map((m, i) => (
                  <motion.div
                    key={m.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.03 }}
                  >
                    <Link
                      to={`/meetings/${m.id}`}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-gray-800/40 transition-colors group"
                    >
                      <div className="w-8 h-8 bg-brand-500/10 rounded-lg flex items-center justify-center text-sm flex-shrink-0">🎙️</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate group-hover:text-brand-400 transition-colors">{m.title}</p>
                        <p className="text-gray-500 text-xs">{new Date(m.created_at).toLocaleDateString()}</p>
                      </div>
                      <div className="flex gap-3 text-xs text-gray-400">
                        <span>✅ {m.action_items?.length || 0}</span>
                        <span>🎯 {m.decisions?.length || 0}</span>
                      </div>
                      <Badge variant={m.status === 'ready' ? 'success' : 'warning'}>{m.status}</Badge>
                    </Link>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>
      </main>
    </div>
  );
}