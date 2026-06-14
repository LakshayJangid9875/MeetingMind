import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Upload, TrendingUp, Clock, Target, Mic } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import SearchBar from '../components/SearchBar';
import Badge from '../components/ui/Badge';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { MeetingCardSkeleton, StatCardSkeleton } from '../components/ui/Skeleton';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import api from '../api/axios';
import clsx from 'clsx';

const STATUS_VARIANT = { ready: 'success', processing: 'warning', transcribing: 'info', uploading: 'default', failed: 'danger' };

function StatCard({ icon: Icon, label, value, trend, color, delay }) {
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.3 }}
      whileHover={{ y: -2 }}
      className={clsx('rounded-2xl border p-5 transition-all group', isDark ? 'bg-dark-surface border-dark-border hover:border-brand-500/30' : 'bg-white border-light-border hover:border-brand-500/30 shadow-card hover:shadow-card-lg')}
    >
      <div className="flex items-center justify-between mb-4">
        <span className={clsx('text-sm font-medium', isDark ? 'text-dark-muted' : 'text-light-muted')}>{label}</span>
        <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={17} />
        </div>
      </div>
      <div className={clsx('text-3xl font-bold mb-1', isDark ? 'text-dark-text' : 'text-light-text')}>{value}</div>
      {trend && <p className="text-success text-xs font-medium flex items-center gap-1"><TrendingUp size={11} /> {trend}</p>}
    </motion.div>
  );
}

export default function Dashboard() {
  const { user }    = useAuth();
  const navigate    = useNavigate();
  const { theme }   = useTheme();
  const isDark      = theme === 'dark';
  const [meetings,  setMeetings]  = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    api.get('/api/meetings/').then(r => setMeetings(r.data)).catch(console.error).finally(() => setLoading(false));
  }, []);

  const hour = new Date().getHours();
  const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
  const totalTasks     = meetings.reduce((a, m) => a + (m.action_items?.length || 0), 0);
  const totalDecisions = meetings.reduce((a, m) => a + (m.decisions?.length    || 0), 0);

  return (
    <div className={clsx('min-h-screen flex', isDark ? 'bg-dark-bg' : 'bg-light-bg')}>
      <Sidebar />
      <main className="flex-1 ml-[72px] lg:ml-60 p-6 lg:p-8 transition-all duration-300">

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between mb-8 gap-4 flex-wrap">
          <div>
            <h1 className={clsx('text-2xl font-bold', isDark ? 'text-dark-text' : 'text-light-text')}>
              {greeting}, <span className="gradient-text">{user?.name?.split(' ')[0]}</span> 👋
            </h1>
            <p className={clsx('text-sm mt-1', isDark ? 'text-dark-muted' : 'text-light-muted')}>Here's your meeting intelligence overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <SearchBar />
            <Button onClick={() => navigate('/upload')} icon={<Upload size={15} />} size="md">
              Upload meeting
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {loading ? Array(4).fill(0).map((_, i) => <StatCardSkeleton key={i} />) : <>
            <StatCard icon={Mic}    label="Total meetings"  value={meetings.length}  color="bg-brand-500/10 text-brand-400"   trend={meetings.length > 0 ? 'Active' : null} delay={0.05} />
            <StatCard icon={Target} label="Action items"    value={totalTasks}       color="bg-success/10 text-success"       delay={0.10} />
            <StatCard icon={Target} label="Decisions made"  value={totalDecisions}   color="bg-accent-500/10 text-accent-400" delay={0.15} />
            <StatCard icon={Clock}  label="Hours saved"     value={`${(meetings.length * 0.5).toFixed(1)}h`} color="bg-warning/10 text-warning" delay={0.20} />
          </>}
        </div>

        {/* Recent meetings */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
          <div className={clsx('rounded-2xl border overflow-hidden', isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border shadow-card')}>
            <div className={clsx('flex items-center justify-between px-6 py-4 border-b', isDark ? 'border-dark-border' : 'border-light-border')}>
              <h2 className={clsx('font-semibold', isDark ? 'text-dark-text' : 'text-light-text')}>Recent meetings</h2>
              <Button variant="ghost" size="sm" onClick={() => navigate('/upload')}>+ New meeting</Button>
            </div>

            {loading ? Array(3).fill(0).map((_, i) => <MeetingCardSkeleton key={i} />) :
             meetings.length === 0 ? (
               <EmptyState
                 icon="🎙️" title="No meetings yet"
                 description="Upload your first meeting recording and let AI do the rest — transcription, summaries, and action items in minutes."
                 action={() => navigate('/upload')} actionLabel="Upload your first meeting"
               />
             ) : (
               <div className={clsx('divide-y', isDark ? 'divide-dark-border' : 'divide-light-border')}>
                 {meetings.map((m, i) => (
                   <motion.div key={m.id} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.04 }}>
                     <Link to={`/meetings/${m.id}`} className={clsx('flex items-center gap-4 px-6 py-4 transition-colors group', isDark ? 'hover:bg-dark-elevated' : 'hover:bg-light-secondary')}>
                       <div className="w-10 h-10 bg-brand-500/10 border border-brand-500/20 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                         <Mic size={17} className="text-brand-400" />
                       </div>
                       <div className="flex-1 min-w-0">
                         <p className={clsx('font-medium truncate group-hover:text-brand-500 transition-colors', isDark ? 'text-dark-text' : 'text-light-text')}>{m.title}</p>
                         <p className={clsx('text-xs mt-0.5', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                           {new Date(m.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                           {m.action_items?.length > 0 && ` · ${m.action_items.length} tasks`}
                         </p>
                       </div>
                       <Badge variant={STATUS_VARIANT[m.status] || 'default'} dot>{m.status}</Badge>
                       <span className={clsx('text-sm group-hover:text-brand-500 transition-colors', isDark ? 'text-dark-muted' : 'text-light-muted')}>→</span>
                     </Link>
                   </motion.div>
                 ))}
               </div>
             )
            }
          </div>
        </motion.div>
      </main>
    </div>
  );
}