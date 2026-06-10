import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { MeetingCardSkeleton, StatCardSkeleton } from '../components/ui/Skeleton';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

const statusVariant = {
  ready:        'success',
  processing:   'warning',
  transcribing: 'info',
  uploading:    'default',
  failed:       'error',
};

function StatCard({ icon, label, value, color, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      className="bg-gray-900 border border-gray-800 hover:border-brand-500/30 rounded-2xl p-5 transition-all hover:shadow-card group"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-gray-400 text-sm font-medium">{label}</span>
        <span className="text-2xl group-hover:scale-110 transition-transform">{icon}</span>
      </div>
      <div className="text-3xl font-bold text-white">{value}</div>
    </motion.div>
  );
}

export default function Dashboard() {
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const [meetings,  setMeetings]  = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    api.get('/api/meetings/').then(res => {
      setMeetings(res.data);
    }).catch(console.error).finally(() => setLoading(false));
  }, []);

  const totalActionItems = meetings.reduce((acc, m) => acc + (m.action_items?.length || 0), 0);
  const totalDecisions   = meetings.reduce((acc, m) => acc + (m.decisions?.length    || 0), 0);
  const hoursaved        = meetings.length * 0.5;

  return (
    <div className="min-h-screen bg-surface-950 text-white flex">
      <Sidebar />

      <main className="flex-1 ml-60 p-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div>
            <h1 className="text-2xl font-bold text-white">
              Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 18 ? 'afternoon' : 'evening'},{' '}
              <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
            </h1>
            <p className="text-gray-400 text-sm mt-1">Here's your meeting intelligence overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar />
            <Button onClick={() => navigate('/upload')} icon="⬆️">
              Upload meeting
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? (
            Array(4).fill(0).map((_, i) => <StatCardSkeleton key={i} />)
          ) : (
            <>
              <StatCard icon="🎙️" label="Total meetings"  value={meetings.length}  delay={0.05} />
              <StatCard icon="✅" label="Action items"     value={totalActionItems}  delay={0.10} />
              <StatCard icon="🎯" label="Decisions made"   value={totalDecisions}    delay={0.15} />
              <StatCard icon="⏱️" label="Hours saved"      value={`${hoursaved}h`}  delay={0.20} />
            </>
          )}
        </div>

        {/* Recent meetings */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card>
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
              <h2 className="text-white font-semibold">Recent meetings</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/upload')}>
                + New meeting
              </Button>
            </div>

            {loading ? (
              Array(3).fill(0).map((_, i) => <MeetingCardSkeleton key={i} />)
            ) : meetings.length === 0 ? (
              <EmptyState
                icon="🎙️"
                title="No meetings yet"
                description="Upload your first meeting recording and let AI do the rest — transcription, summaries, and action items automatically."
                action={() => navigate('/upload')}
                actionLabel="Upload your first meeting"
              />
            ) : (
              <div className="divide-y divide-gray-800">
                {meetings.map((meeting, i) => (
                  <motion.div
                    key={meeting.id}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={`/meetings/${meeting.id}`}
                      className="flex items-center gap-4 px-6 py-4 hover:bg-gray-800/40 transition-colors group"
                    >
                      <div className="w-10 h-10 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-center text-lg flex-shrink-0 group-hover:scale-105 transition-transform">
                        🎙️
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white font-medium truncate group-hover:text-brand-400 transition-colors">
                          {meeting.title}
                        </p>
                        <p className="text-gray-500 text-xs mt-0.5">
                          {new Date(meeting.created_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric'
                          })}
                          {meeting.action_items?.length > 0 && ` · ${meeting.action_items.length} action items`}
                        </p>
                      </div>
                      <Badge variant={statusVariant[meeting.status] || 'default'}>
                        {meeting.status}
                      </Badge>
                      <span className="text-gray-600 group-hover:text-gray-400 transition-colors">→</span>
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