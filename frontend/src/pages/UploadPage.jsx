import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Sidebar from '../components/Sidebar';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import api from '../api/axios';
import toast from 'react-hot-toast';

const STEPS = ['Uploading', 'Transcribing', 'Analyzing', 'Generating insights', 'Complete'];

export default function UploadPage() {
  const [file,      setFile]      = useState(null);
  const [title,     setTitle]     = useState('');
  const [dragging,  setDragging]  = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress,  setProgress]  = useState(0);
  const [step,      setStep]      = useState(0);
  const fileRef = useRef();
  const navigate = useNavigate();

  const handleFile = (f) => {
    if (!f) return;
    if (!f.name.match(/\.(mp3|wav|mp4)$/i)) {
      toast.error('Only MP3, WAV, and MP4 files are supported');
      return;
    }
    setFile(f);
    if (!title) setTitle(f.name.replace(/\.[^/.]+$/, ''));
  };

  const handleSubmit = async () => {
    if (!file)  return toast.error('Please select a file');
    if (!title) return toast.error('Please enter a meeting title');

    const formData = new FormData();
    formData.append('file', file);
    formData.append('title', title);

    setUploading(true);
    setStep(0);

    try {
      const res = await api.post('/api/meetings/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        onUploadProgress: (e) => {
          const pct = Math.round((e.loaded * 100) / e.total);
          setProgress(pct);
          if (pct === 100) setStep(1);
        },
      });
      setStep(4);
      toast.success('Meeting uploaded! AI is analyzing it...');
      setTimeout(() => navigate(`/meetings/${res.data.id}`), 1000);
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Upload failed.');
      setUploading(false);
      setStep(0);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 text-white flex">
      <Sidebar />
      <main className="flex-1 ml-60 p-8">
        <div className="max-w-2xl mx-auto">

          <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <h1 className="text-2xl font-bold text-white mb-1">Upload meeting</h1>
            <p className="text-gray-400 text-sm">AI will transcribe and analyze your recording automatically.</p>
          </motion.div>

          {/* Upload form */}
          <AnimatePresence mode="wait">
            {!uploading ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                className="space-y-6"
              >
                {/* Title */}
                <Input
                  label="Meeting title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Product standup — June 10"
                  icon="📝"
                />

                {/* Drop zone */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">Audio / Video file</label>
                  <motion.div
                    whileHover={{ scale: 1.01 }}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={(e) => { e.preventDefault(); setDragging(false); handleFile(e.dataTransfer.files[0]); }}
                    onClick={() => fileRef.current.click()}
                    className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all ${
                      dragging
                        ? 'border-brand-500 bg-brand-500/5 scale-[1.01]'
                        : file
                        ? 'border-green-500/50 bg-green-500/5'
                        : 'border-gray-700 hover:border-gray-600 bg-gray-900/50'
                    }`}
                  >
                    <input ref={fileRef} type="file" accept=".mp3,.wav,.mp4" className="hidden" onChange={(e) => handleFile(e.target.files[0])} />
                    <AnimatePresence mode="wait">
                      {file ? (
                        <motion.div key="file" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                          <div className="text-4xl mb-3">✅</div>
                          <p className="text-white font-semibold">{file.name}</p>
                          <p className="text-gray-400 text-sm mt-1">{(file.size / 1024 / 1024).toFixed(1)} MB</p>
                          <button
                            onClick={(e) => { e.stopPropagation(); setFile(null); setTitle(''); }}
                            className="text-gray-500 hover:text-red-400 text-xs mt-3 underline transition-colors"
                          >
                            Remove file
                          </button>
                        </motion.div>
                      ) : (
                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                          <div className="text-4xl mb-3">🎙️</div>
                          <p className="text-white font-semibold mb-1">Drop your file here</p>
                          <p className="text-gray-400 text-sm">or click to browse · MP3, WAV, MP4</p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                <Button onClick={handleSubmit} disabled={!file} size="lg" className="w-full">
                  Upload & analyze with AI →
                </Button>

                {/* Info box */}
                <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
                  <p className="text-white text-sm font-medium mb-2">What happens next?</p>
                  <div className="space-y-1.5">
                    {STEPS.slice(0, 4).map((s, i) => (
                      <div key={s} className="flex items-center gap-2 text-gray-400 text-sm">
                        <span className="text-brand-400 text-xs font-mono">{i + 1}.</span> {s}
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ) : (
              /* Processing state */
              <motion.div
                key="processing"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-gray-900 border border-gray-800 rounded-2xl p-10 text-center"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  className="text-5xl mb-6 inline-block"
                >
                  ⚙️
                </motion.div>
                <h3 className="text-white font-bold text-xl mb-2">Processing your meeting</h3>
                <p className="text-gray-400 text-sm mb-8">AI is working on your recording...</p>

                {/* Progress steps */}
                <div className="space-y-3 text-left mb-8">
                  {STEPS.map((s, i) => (
                    <div key={s} className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0 transition-all ${
                        i < step  ? 'bg-green-500 text-white' :
                        i === step ? 'bg-brand-500 text-white animate-pulse' :
                        'bg-gray-800 text-gray-600'
                      }`}>
                        {i < step ? '✓' : i + 1}
                      </div>
                      <span className={`text-sm ${i <= step ? 'text-white' : 'text-gray-500'}`}>{s}</span>
                    </div>
                  ))}
                </div>

                {/* Progress bar */}
                <div className="w-full bg-gray-800 rounded-full h-2">
                  <motion.div
                    className="bg-gradient-to-r from-brand-500 to-purple-500 h-2 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
                <p className="text-gray-500 text-xs mt-2">{progress}% uploaded</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}