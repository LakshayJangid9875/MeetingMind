import { useState, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

const COLORS = ['#6366f1', '#8b5cf6', '#06b6d4', '#10b981', '#f59e0b'];

export default function AnalyticsPage() {
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    api.get('/api/meetings/').then(res => {
      setMeetings(res.data);
      setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const totalActionItems = meetings.reduce((acc, m) => acc + (m.action_items?.length || 0), 0);
  const totalDecisions   = meetings.reduce((acc, m) => acc + (m.decisions?.length    || 0), 0);
  const readyMeetings    = meetings.filter(m => m.status === 'ready').length;

  const meetingsByDate = meetings.slice(0, 7).map(m => ({
    name:  new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
    items: m.action_items?.length || 0,
  })).reverse();

  const moodData = [
    { name: 'Productive',   value: meetings.filter(m => m.meeting_mood === 'productive').length   || 1 },
    { name: 'Neutral',      value: meetings.filter(m => m.meeting_mood === 'neutral').length      || 1 },
    { name: 'Unproductive', value: meetings.filter(m => m.meeting_mood === 'unproductive').length || 0 },
  ];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white mb-1">Analytics</h1>
          <p className="text-gray-400 text-sm">Track your meeting productivity over time.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {[
            { icon: '🎙️', label: 'Total meetings',  value: meetings.length,   color: 'indigo' },
            { icon: '✅', label: 'Action items',     value: totalActionItems,  color: 'green'  },
            { icon: '🎯', label: 'Decisions made',   value: totalDecisions,    color: 'purple' },
            { icon: '⚡', label: 'Analyzed',         value: readyMeetings,     color: 'amber'  },
          ].map((s) => (
            <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-2xl p-5">
              <div className="text-2xl mb-2">{s.icon}</div>
              <div className="text-3xl font-bold text-white">{s.value}</div>
              <div className="text-gray-400 text-sm mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Action items per meeting */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">Action items per meeting</h2>
            {loading ? (
              <div className="h-48 flex items-center justify-center text-gray-500">Loading...</div>
            ) : (
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={meetingsByDate}>
                  <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <YAxis stroke="#6b7280" tick={{ fontSize: 12 }} />
                  <Tooltip
                    contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }}
                    labelStyle={{ color: '#fff' }}
                  />
                  <Bar dataKey="items" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Meeting mood */}
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
            <h2 className="text-white font-semibold mb-4">Meeting mood distribution</h2>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={moodData} cx="50%" cy="50%" outerRadius={80} dataKey="value" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {moodData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1f2937', border: '1px solid #374151', borderRadius: 8 }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent meetings table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl mt-6">
          <div className="px-6 py-4 border-b border-gray-800">
            <h2 className="text-white font-semibold">All meetings</h2>
          </div>
          <div className="divide-y divide-gray-800">
            {meetings.length === 0 ? (
              <div className="p-8 text-center text-gray-400">No meetings yet.</div>
            ) : meetings.map((m) => (
              <div key={m.id} className="flex items-center gap-4 px-6 py-4">
                <div className="flex-1">
                  <p className="text-white text-sm font-medium">{m.title}</p>
                  <p className="text-gray-400 text-xs">{new Date(m.created_at).toLocaleDateString()}</p>
                </div>
                <div className="flex gap-4 text-xs text-gray-400">
                  <span>✅ {m.action_items?.length || 0} tasks</span>
                  <span>🎯 {m.decisions?.length || 0} decisions</span>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${m.status === 'ready' ? 'bg-green-500/10 text-green-400' : 'bg-amber-500/10 text-amber-400'}`}>
                  {m.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}