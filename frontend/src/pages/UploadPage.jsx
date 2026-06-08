import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import api from '../api/axios';
import toast from 'react-hot-toast';

export default function UploadPage() {
  const [file, setFile]         = useState(null);
  const [title, setTitle]       = useState('');
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileRef = useRef();
  const navigate = useNavigate();

  const ACCEPTED = ['audio/mpeg', 'audio/wav', 'video/mp4', 'audio/mp3'];

  const handleFile = (f) => {
    if (!f) return;
    if (!ACCEPTED.includes(f.type) && !f.name.match(/\.(mp3|wav|mp4)$/i)) {
      toast.error('Only MP3, WAV, and MP4 files are supported');
      return;
    }
    setFile(f);
    if (!title) setTitle(f.name.replace(/\.[^/.]+$/, ''));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  const handleSubmit = async () => {
    if (!file)  return toast.error('Please select a file');
    if (!title) return toast.error('Please enter a meeting title');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    setUploading(true);
    try {
      const res = await api.post('/api/meetings/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          setProgress(Math.round((e.loaded * 100) / e.total));
        },
      });
      toast.success('Meeting uploaded! AI is processing it...');
      navigate(`/meetings/${res.data.id}`);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Upload failed. Please try again.');
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex">
      <Sidebar />

      <main className="flex-1 ml-60 p-8">
        <div className="max-w-2xl mx-auto">

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Upload meeting</h1>
            <p className="text-gray-400 text-sm">
              Upload an audio or video recording and AI will transcribe and analyze it.
            </p>
          </div>

          {/* Meeting title */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-300 mb-1.5">
              Meeting title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Product standup — June 8"
              className="w-full bg-gray-900 border border-gray-700 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 rounded-xl px-4 py-3 text-white placeholder-gray-500 text-sm outline-none transition-colors"
            />
          </div>

          {/* Drop zone */}
          <div
            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileRef.current.click()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-colors ${
              dragging
                ? 'border-indigo-500 bg-indigo-500/5'
                : file
                ? 'border-green-500/50 bg-green-500/5'
                : 'border-gray-700 hover:border-gray-600 bg-gray-900'
            }`}
          >
            <input
              ref={fileRef}
              type="file"
              accept=".mp3,.wav,.mp4"
              className="hidden"
              onChange={(e) => handleFile(e.target.files[0])}
            />

            {file ? (
              <div>
                <div className="text-4xl mb-3">✅</div>
                <p className="text-white font-medium">{file.name}</p>
                <p className="text-gray-400 text-sm mt-1">
                  {(file.size / 1024 / 1024).toFixed(1)} MB
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); setFile(null); setTitle(''); }}
                  className="text-gray-500 hover:text-gray-300 text-xs mt-3 underline"
                >
                  Remove file
                </button>
              </div>
            ) : (
              <div>
                <div className="text-4xl mb-3">🎙️</div>
                <p className="text-white font-medium mb-1">
                  Drop your file here or click to browse
                </p>
                <p className="text-gray-400 text-sm">Supports MP3, WAV, MP4</p>
              </div>
            )}
          </div>

          {/* Progress bar */}
          {uploading && (
            <div className="mt-4">
              <div className="flex justify-between text-xs text-gray-400 mb-1">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-800 rounded-full h-2">
                <div
                  className="bg-indigo-500 h-2 rounded-full transition-all"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          )}

          {/* Submit button */}
          <button
            onClick={handleSubmit}
            disabled={uploading || !file}
            className="w-full mt-6 bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold py-3 rounded-xl transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload & analyze with AI →'}
          </button>

          {/* Info */}
          <div className="mt-6 bg-gray-900 border border-gray-800 rounded-xl p-4">
            <h3 className="text-white text-sm font-medium mb-2">What happens next?</h3>
            <ul className="space-y-1.5 text-gray-400 text-sm">
              <li className="flex items-center gap-2"><span className="text-indigo-400">1.</span> Whisper AI transcribes your audio</li>
              <li className="flex items-center gap-2"><span className="text-indigo-400">2.</span> Gemini AI generates a summary</li>
              <li className="flex items-center gap-2"><span className="text-indigo-400">3.</span> Action items and decisions are extracted</li>
              <li className="flex items-center gap-2"><span className="text-indigo-400">4.</span> Results appear in your dashboard</li>
            </ul>
          </div>

        </div>
      </main>
    </div>
  );
}