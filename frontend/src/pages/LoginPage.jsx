import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { loginUser } from '../api/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  const { login } = useAuth();
  const navigate  = useNavigate();

  const validate = () => {
    const e = {};
    if (!email)    e.email    = 'Email is required';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      login(data.access_token, data.user);
      toast.success(`Welcome back, ${data.user.name}! 👋`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-surface-950 flex">
      {/* Left panel */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-brand-600/20 via-purple-900/20 to-surface-950 items-center justify-center p-12 relative overflow-hidden"
      >
        {/* Background decoration */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-purple-500/10 rounded-full blur-3xl" />

        <div className="relative text-center max-w-md">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-lg text-3xl">
            🧠
          </div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Turn meetings into <span className="gradient-text">action</span>
          </h2>
          <p className="text-gray-400 leading-relaxed">
            MeetingMind automatically transcribes, summarizes, and extracts action items from every meeting.
          </p>

          <div className="mt-8 space-y-3">
            {[
              '🎙️ Auto-transcription with Whisper AI',
              '✨ Smart summaries with Gemini AI',
              '✅ Action item extraction',
              '🔍 Semantic search across meetings',
            ].map((feat) => (
              <div key={feat} className="flex items-center gap-3 text-left bg-white/5 rounded-xl px-4 py-3">
                <span className="text-sm text-gray-300">{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right panel */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex-1 flex items-center justify-center px-6 py-12"
      >
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-6 lg:hidden">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-white font-semibold">MeetingMind</span>
            </Link>
            <h1 className="text-2xl font-bold text-white mb-1">Welcome back</h1>
            <p className="text-gray-400 text-sm">Sign in to your MeetingMind account</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                icon="📧"
                error={errors.email}
              />
              <Input
                label="Password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                error={errors.password}
              />
              <Button type="submit" loading={loading} className="w-full" size="lg">
                Sign in to MeetingMind
              </Button>
            </form>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-400 hover:text-brand-300 font-medium">
              Sign up for free
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}