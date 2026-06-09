import SearchBar from '../components/SearchBar';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';

export default function Dashboard() {
  const { user } = useAuth();
  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading]   = useState(true);

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        const res = await api.get('/api/meetings/');
        setMeetings(res.data);
      } catch (err) {
        console.error('Failed to fetch meetings:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMeetings();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />

      {/* Main content */}
      <main className="flex-1 ml-60 p-8">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
  <div>
    <h1 className="text-2xl font-bold text-white">
      Welcome back, {user?.name?.split(' ')[0]} 👋
    </h1>
    <p className="text-gray-400 text-sm mt-1">
      Here's what's happening with your meetings.
    </p>
  </div>
  <div className="flex items-center gap-3">
    <SearchBar />
    <Link
      to="/upload"
      className="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2.5 rounded-xl transition-colors text-sm whitespace-nowrap"
    >
      <span>⬆️</span> Upload
    </Link>
  </div>
</div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard icon="🎙️" label="Total meetings"    value={meetings.length}  color="indigo" />
          <StatCard icon="✅" label="Action items"       value="0"                color="green"  />
          <StatCard icon="🎯" label="Decisions made"     value="0"                color="purple" />
          <StatCard icon="⏱️" label="Hours saved"        value="0"                color="amber"  />
        </div>

        {/* Recent meetings */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-800">
            <h2 className="text-white font-semibold">Recent meetings</h2>
            <Link to="/upload" className="text-indigo-400 hover:text-indigo-300 text-sm">
              + New meeting
            </Link>
          </div>

          {loading ? (
            /* Skeleton loader */
            <div className="p-6 space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-800 rounded-xl" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-800 rounded w-1/3" />
                    <div className="h-3 bg-gray-800 rounded w-1/4" />
                  </div>
                </div>
              ))}
            </div>
          ) : meetings.length === 0 ? (
            /* Empty state */
            <div className="flex flex-col items-center justify-center py-16 px-6 text-center">
              <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center mb-4 text-3xl">
                🎙️
              </div>
              <h3 className="text-white font-semibold mb-2">No meetings yet</h3>
              <p className="text-gray-400 text-sm mb-6 max-w-xs">
                Upload your first meeting recording and let AI do the rest.
              </p>
              <Link
                to="/upload"
                className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium px-4 py-2 rounded-xl text-sm transition-colors"
              >
                Upload your first meeting
              </Link>
            </div>
          ) : (
            /* Meetings list */
            <div className="divide-y divide-gray-800">
              {meetings.map((meeting) => (
                <Link
                  key={meeting.id}
                  to={`/meetings/${meeting.id}`}
                  className="flex items-center gap-4 px-6 py-4 hover:bg-gray-800/50 transition-colors"
                >
                  <div className="w-10 h-10 bg-indigo-500/10 rounded-xl flex items-center justify-center text-lg flex-shrink-0">
                    🎙️
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium truncate">{meeting.title}</p>
                    <p className="text-gray-400 text-xs mt-0.5">
                      {new Date(meeting.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                    meeting.status === 'ready'
                      ? 'bg-green-500/10 text-green-400'
                      : 'bg-amber-500/10 text-amber-400'
                  }`}>
                    {meeting.status}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}