import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';

export default function SearchBar() {
  const [query,   setQuery]   = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open,    setOpen]    = useState(false);
  const navigate = useNavigate();

  const handleSearch = async (e) => {
    const val = e.target.value;
    setQuery(val);
    if (val.length < 3) { setResults([]); setOpen(false); return; }

    setLoading(true);
    try {
      const res = await api.get(`/api/search/?q=${encodeURIComponent(val)}`);
      setResults(res.data.results || []);
      setOpen(true);
    } catch {
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">🔍</span>
        <input
          type="text"
          value={query}
          onChange={handleSearch}
          onFocus={() => results.length > 0 && setOpen(true)}
          placeholder="Search meetings... (e.g. 'deployment discussion')"
          className="w-full bg-gray-800 border border-gray-700 focus:border-indigo-500 rounded-xl pl-9 pr-4 py-2.5 text-white placeholder-gray-500 text-sm outline-none"
        />
        {loading && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 animate-spin">⚙️</span>
        )}
      </div>

      {/* Results dropdown */}
      {open && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden">
          {results.map((r) => (
            <button
              key={r.meeting_id}
              onClick={() => { navigate(`/meetings/${r.meeting_id}`); setOpen(false); setQuery(''); }}
              className="w-full text-left px-4 py-3 hover:bg-gray-800 transition-colors border-b border-gray-800 last:border-0"
            >
              <div className="flex items-center justify-between">
                <p className="text-white text-sm font-medium">{r.title}</p>
                <span className="text-indigo-400 text-xs">{(r.score * 100).toFixed(0)}% match</span>
              </div>
              <p className="text-gray-400 text-xs mt-1 truncate">{r.excerpt}</p>
            </button>
          ))}
        </div>
      )}

      {open && query.length >= 3 && results.length === 0 && !loading && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-gray-900 border border-gray-700 rounded-xl p-4 text-center">
          <p className="text-gray-400 text-sm">No meetings found for "{query}"</p>
        </div>
      )}
    </div>
  );
}