import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Badge from '../components/ui/Badge';
import Card from '../components/ui/Card';
import { Skeleton } from '../components/ui/Skeleton';
import api from '../api/axios';
import toast from 'react-hot-toast';

const statusVariant = {
  ready:        'success',
  processing:   'warning',
  transcribing: 'info',
  uploading:    'default',
  failed:       'error',
};

const TABS = ['Summary', 'Transcript', 'Action Items', 'Decisions'];

export default function MeetingDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab,     setTab]     = useState('Summary');
  const [search,  setSearch]  = useState('');

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        const res = await api.get(`/api/meetings/${id}`);
        setMeeting(res.data);
        if (!['ready', 'failed'].includes(res.data.status)) {
          const interval = setInterval(async () => {
            const r = await api.get(`/api/meetings/${id}`);
            setMeeting(r.data);
            if (['ready', 'failed'].includes(r.data.status)) clearInterval(interval);
          }, 3000);
          return () => clearInterval(interval);
        }
      } catch { navigate('/dashboard'); }
      finally { setLoading(false); }
    };
    fetchMeeting();
  }, [id, navigate]);

  const copyText = (text) => {
    navigator.clipboard.writeText(text);
    toast.success('Copied to clipboard!');
  };

  if (loading) return (
    <div className="min-h-screen bg-surface-950 flex">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="space-y-4">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-32" />
          <div className="grid grid-cols-4 gap-4 mt-6">
            {Array(4).fill(0).map((_, i) => <Skeleton key={i} className="h-24 rounded-2xl" />)}
          </div>
          <Skeleton className="h-64 rounded-2xl mt-4" />
        </div>
      </main>
    </div>
  );

  const filteredTranscript = search
    ? meeting?.transcript?.split('\n').filter(l => l.toLowerCase().includes(search.toLowerCase()))
    : meeting?.transcript_timestamped?.split('\n') || [meeting?.transcript];

  return (
    <div className="min-h-screen bg-surface-950 text-white flex">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">

        {/* Breadcrumb */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 mb-6 text-sm">
          <Link to="/dashboard" className="text-gray-500 hover:text-white transition-colors">Dashboard</Link>
          <span className="text-gray-700">→</span>
          <span className="text-gray-300 truncate max-w-xs">{meeting?.title}</span>
        </motion.div>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{meeting?.title}</h1>
            <div className="flex items-center gap-3 flex-wrap">
              <Badge variant={statusVariant[meeting?.status] || 'default'}>
                {meeting?.status}
              </Badge>
              <span className="text-gray-500 text-sm">
                {new Date(meeting?.created_at).toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
              {meeting?.meeting_mood && (
                <Badge variant={meeting.meeting_mood === 'productive' ? 'success' : 'default'}>
                  {meeting.meeting_mood === 'productive' ? '⚡' : '😐'} {meeting.meeting_mood}
                </Badge>
              )}
            </div>
          </div>
          <button
            onClick={() => copyText(meeting?.summary || '')}
            className="flex items-center gap-2 text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-3 py-2 rounded-xl text-sm transition-all"
          >
            📋 Copy summary
          </button>
        </motion.div>

        {/* Processing banner */}
        {!['ready', 'failed'].includes(meeting?.status) && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 mb-6 flex items-center gap-3"
          >
            <motion.span animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: 'linear' }} className="text-2xl">⚙️</motion.span>
            <div>
              <p className="text-amber-400 font-medium text-sm">AI is processing your meeting...</p>
              <p className="text-amber-400/60 text-xs">This usually takes 1-3 minutes. Page updates automatically.</p>
            </div>
          </motion.div>
        )}

        {meeting?.status === 'failed' && (
          <div className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6">
            <p className="text-red-400 font-medium text-sm">❌ Processing failed. Please try uploading again.</p>
          </div>
        )}

        {meeting?.status === 'ready' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { icon: '✅', label: 'Action items',  value: meeting.action_items?.length  || 0, color: 'text-green-400'  },
                { icon: '🎯', label: 'Decisions',      value: meeting.decisions?.length     || 0, color: 'text-purple-400' },
                { icon: '💡', label: 'Key points',     value: meeting.key_points?.length    || 0, color: 'text-brand-400'  },
                { icon: '👥', label: 'Participants',   value: meeting.participants?.length   || 0, color: 'text-cyan-400'   },
              ].map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-4 hover:border-brand-500/20 transition-colors"
                >
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
                  <div className="text-gray-500 text-xs mt-0.5">{s.label}</div>
                </motion.div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1 mb-6 w-fit">
              {TABS.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    tab === t ? 'text-white' : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === t && (
                    <motion.div
                      layoutId="tabBg"
                      className="absolute inset-0 bg-brand-500 rounded-lg"
                      transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                  <span className="relative">{t}</span>
                </button>
              ))}
            </div>

            {/* Tab content */}
            <AnimatePresence mode="wait">
              <motion.div
                key={tab}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6">

                  {/* Summary */}
                  {tab === 'Summary' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-white font-semibold mb-3 flex items-center gap-2">
                          <span>✨</span> Summary
                        </h3>
                        <p className="text-gray-300 leading-relaxed bg-gray-800/50 rounded-xl p-4">{meeting.summary}</p>
                      </div>
                      {meeting.key_points?.length > 0 && (
                        <div>
                          <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><span>💡</span> Key points</h3>
                          <ul className="space-y-2">
                            {meeting.key_points.map((p, i) => (
                              <motion.li
                                key={i}
                                initial={{ opacity: 0, x: -8 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                                className="flex items-start gap-3 text-gray-300 text-sm bg-gray-800/30 rounded-xl p-3"
                              >
                                <span className="text-brand-400 mt-0.5 flex-shrink-0">•</span> {p}
                              </motion.li>
                            ))}
                          </ul>
                        </div>
                      )}
                      {meeting.participants?.length > 0 && (
                        <div>
                          <h3 className="text-white font-semibold mb-3 flex items-center gap-2"><span>👥</span> Participants</h3>
                          <div className="flex flex-wrap gap-2">
                            {meeting.participants.map((p, i) => (
                              <span key={i} className="bg-brand-500/10 border border-brand-500/20 text-brand-300 text-sm px-3 py-1.5 rounded-full">
                                {p}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Transcript */}
                  {tab === 'Transcript' && (
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-white font-semibold flex items-center gap-2"><span>📝</span> Full transcript</h3>
                        <div className="flex gap-2">
                          <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search transcript..."
                            className="bg-gray-800 border border-gray-700 focus:border-brand-500 rounded-xl px-3 py-1.5 text-white placeholder-gray-500 text-sm outline-none w-48"
                          />
                          <button
                            onClick={() => copyText(meeting.transcript || '')}
                            className="text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-3 py-1.5 rounded-xl text-sm transition-all"
                          >
                            📋 Copy
                          </button>
                        </div>
                      </div>
                      <div className="bg-gray-800/50 rounded-xl p-4 max-h-96 overflow-y-auto space-y-2">
                        {filteredTranscript?.map((line, i) => line && (
                          <p
                            key={i}
                            className={`text-sm leading-relaxed ${
                              search && line.toLowerCase().includes(search.toLowerCase())
                                ? 'text-white bg-brand-500/20 rounded-lg px-2 py-0.5'
                                : 'text-gray-300'
                            }`}
                          >
                            {line}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Action Items */}
                  {tab === 'Action Items' && (
                    <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><span>✅</span> Action items</h3>
                      {!meeting.action_items?.length ? (
                        <p className="text-gray-400 text-sm text-center py-8">No action items found in this meeting.</p>
                      ) : (
                        <div className="space-y-3">
                          {meeting.action_items.map((item, i) => (
                            <motion.div
                              key={i}
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="bg-gray-800/50 border border-gray-700/50 hover:border-brand-500/20 rounded-xl p-4 transition-all"
                            >
                              <div className="flex items-start justify-between gap-4">
                                <p className="text-white text-sm font-medium leading-relaxed">{item.task}</p>
                                <Badge variant={item.priority === 'high' ? 'error' : item.priority === 'medium' ? 'warning' : 'success'}>
                                  {item.priority}
                                </Badge>
                              </div>
                              <div className="flex gap-4 mt-2.5 text-xs text-gray-400">
                                <span className="flex items-center gap-1">👤 {item.assigned_to}</span>
                                <span className="flex items-center gap-1">📅 {item.deadline}</span>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Decisions */}
                  {tab === 'Decisions' && (
                    <div>
                      <h3 className="text-white font-semibold mb-4 flex items-center gap-2"><span>🎯</span> Decisions made</h3>
                      {!meeting.decisions?.length ? (
                        <p className="text-gray-400 text-sm text-center py-8">No decisions recorded in this meeting.</p>
                      ) : (
                        <ul className="space-y-3">
                          {meeting.decisions.map((d, i) => (
                            <motion.li
                              key={i}
                              initial={{ opacity: 0, x: -8 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ delay: i * 0.05 }}
                              className="flex items-start gap-3 bg-green-500/5 border border-green-500/20 rounded-xl p-4"
                            >
                              <span className="text-green-400 text-lg flex-shrink-0">✓</span>
                              <p className="text-gray-300 text-sm leading-relaxed">{d}</p>
                            </motion.li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}

                </Card>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        )}
      </main>
    </div>
  );
}