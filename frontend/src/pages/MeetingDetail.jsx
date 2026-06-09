import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';

export default function MeetingDetail() {
  const { id } = useParams();
  const [meeting, setMeeting] = useState(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab]         = useState('summary');

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get(`/api/meetings/${id}`);
        setMeeting(res.data);
        if (res.data.status !== 'ready') {
          // Poll every 3 seconds until ready
          const interval = setInterval(async () => {
            const r = await api.get(`/api/meetings/${id}`);
            setMeeting(r.data);
            if (r.data.status === 'ready' || r.data.status === 'failed') {
              clearInterval(interval);
            }
          }, 3000);
          return () => clearInterval(interval);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [id]);

  if (loading) return (
    <div className="min-h-screen bg-gray-950 flex">
      <Sidebar />
      <main className="flex-1 ml-60 flex items-center justify-center">
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse">🧠</div>
          <p className="text-white font-medium">Loading meeting...</p>
        </div>
      </main>
    </div>
  );

  const statusColors = {
    ready:        'bg-green-500/10 text-green-400',
    processing:   'bg-amber-500/10 text-amber-400',
    transcribing: 'bg-blue-500/10 text-blue-400',
    uploading:    'bg-gray-500/10 text-gray-400',
    failed:       'bg-red-500/10 text-red-400',
  };

  const tabs = ['summary', 'transcript', 'action items', 'decisions'];

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />

      <main className="flex-1 ml-60 p-8">

        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Link to="/dashboard" className="text-gray-400 hover:text-white text-sm">
            ← Dashboard
          </Link>
        </div>

        <div className="flex items-start justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-white mb-2">{meeting?.title}</h1>
            <div className="flex items-center gap-3">
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusColors[meeting?.status]}`}>
                {meeting?.status}
              </span>
              <span className="text-gray-400 text-sm">
                {new Date(meeting?.created_at).toLocaleDateString('en-US', {
                  weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
                })}
              </span>
            </div>
          </div>
        </div>

        {/* Processing state */}
        {meeting?.status !== 'ready' && meeting?.status !== 'failed' && (
          <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-6 mb-6 flex items-center gap-4">
            <div className="text-3xl animate-spin">⚙️</div>
            <div>
              <p className="text-amber-400 font-medium">AI is processing your meeting...</p>
              <p className="text-amber-400/70 text-sm mt-1">
                This usually takes 1-3 minutes. Page updates automatically.
              </p>
            </div>
          </div>
        )}

        {meeting?.status === 'ready' && (
          <>
            {/* Stats row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
              {[
                { icon: '✅', label: 'Action items', value: meeting.action_items?.length || 0 },
                { icon: '🎯', label: 'Decisions',    value: meeting.decisions?.length    || 0 },
                { icon: '💡', label: 'Key points',   value: meeting.key_points?.length   || 0 },
                { icon: '👥', label: 'Participants', value: meeting.participants?.length  || 0 },
              ].map((s) => (
                <div key={s.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <div className="text-xl mb-1">{s.icon}</div>
                  <div className="text-2xl font-bold text-white">{s.value}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Tabs */}
            <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-xl p-1 mb-6 w-fit">
              {tabs.map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
                    tab === t
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            {/* Tab content */}
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">

              {/* Summary tab */}
              {tab === 'summary' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-white font-semibold mb-3">Summary</h3>
                    <p className="text-gray-300 leading-relaxed">{meeting.summary}</p>
                  </div>
                  {meeting.key_points?.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold mb-3">Key points</h3>
                      <ul className="space-y-2">
                        {meeting.key_points.map((p, i) => (
                          <li key={i} className="flex items-start gap-2 text-gray-300 text-sm">
                            <span className="text-indigo-400 mt-0.5">•</span> {p}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {meeting.participants?.length > 0 && (
                    <div>
                      <h3 className="text-white font-semibold mb-3">Participants</h3>
                      <div className="flex flex-wrap gap-2">
                        {meeting.participants.map((p, i) => (
                          <span key={i} className="bg-indigo-500/10 text-indigo-300 text-sm px-3 py-1 rounded-full">
                            {p}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Transcript tab */}
              {tab === 'transcript' && (
                <div>
                  <h3 className="text-white font-semibold mb-3">Full transcript</h3>
                  <div className="bg-gray-800 rounded-xl p-4 max-h-96 overflow-y-auto">
                    {meeting.transcript_timestamped
                      ? meeting.transcript_timestamped.split('\n').map((line, i) => (
                          <p key={i} className="text-gray-300 text-sm mb-2 leading-relaxed">{line}</p>
                        ))
                      : <p className="text-gray-300 text-sm leading-relaxed">{meeting.transcript}</p>
                    }
                  </div>
                </div>
              )}

              {/* Action items tab */}
              {tab === 'action items' && (
                <div>
                  <h3 className="text-white font-semibold mb-4">Action items</h3>
                  {meeting.action_items?.length === 0 ? (
                    <p className="text-gray-400 text-sm">No action items found in this meeting.</p>
                  ) : (
                    <div className="space-y-3">
                      {meeting.action_items?.map((item, i) => (
                        <div key={i} className="bg-gray-800 rounded-xl p-4">
                          <div className="flex items-start justify-between gap-4">
                            <p className="text-white text-sm font-medium">{item.task}</p>
                            <span className={`text-xs px-2 py-1 rounded-full flex-shrink-0 ${
                              item.priority === 'high'   ? 'bg-red-500/10 text-red-400' :
                              item.priority === 'medium' ? 'bg-amber-500/10 text-amber-400' :
                              'bg-green-500/10 text-green-400'
                            }`}>
                              {item.priority}
                            </span>
                          </div>
                          <div className="flex gap-4 mt-2 text-xs text-gray-400">
                            <span>👤 {item.assigned_to}</span>
                            <span>📅 {item.deadline}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Decisions tab */}
              {tab === 'decisions' && (
                <div>
                  <h3 className="text-white font-semibold mb-4">Decisions made</h3>
                  {meeting.decisions?.length === 0 ? (
                    <p className="text-gray-400 text-sm">No decisions recorded in this meeting.</p>
                  ) : (
                    <ul className="space-y-3">
                      {meeting.decisions?.map((d, i) => (
                        <li key={i} className="flex items-start gap-3 bg-gray-800 rounded-xl p-4">
                          <span className="text-green-400 text-lg">✓</span>
                          <p className="text-gray-300 text-sm">{d}</p>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

            </div>
          </>
        )}
      </main>
    </div>
  );
}