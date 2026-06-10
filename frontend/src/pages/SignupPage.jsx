import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { registerUser } from '../api/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import toast from 'react-hot-toast';

export default function SignupPage() {
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});

  const { login } = useAuth();
  const navigate  = useNavigate();

  const validate = () => {
    const e = {};
    if (!name || name.length < 2)    e.name     = 'Name must be at least 2 characters';
    if (!email)                       e.email    = 'Email is required';
    if (!password || password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      login(data.access_token, data.user);
      toast.success(`Welcome to MeetingMind, ${data.user.name}! 🎉`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Signup failed. Please try again.');
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
        className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-purple-900/20 via-brand-600/20 to-surface-950 items-center justify-center p-12 relative overflow-hidden"
      >
        <div className="absolute top-20 right-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-48 h-48 bg-brand-500/10 rounded-full blur-3xl" />

        <div className="relative text-center max-w-md">
          <div className="text-5xl mb-6">🚀</div>
          <h2 className="text-3xl font-bold text-white mb-4">
            Start your <span className="gradient-text">free account</span>
          </h2>
          <p className="text-gray-400 leading-relaxed mb-8">
            Join teams using MeetingMind to turn conversations into action items, decisions, and insights.
          </p>

          <div className="grid grid-cols-2 gap-3">
            {[
              { icon: '🎙️', label: 'AI Transcription' },
              { icon: '✨', label: 'Smart Summaries'   },
              { icon: '✅', label: 'Action Items'       },
              { icon: '📊', label: 'Analytics'          },
            ].map((f) => (
              <div key={f.label} className="bg-white/5 border border-white/10 rounded-xl p-3 text-center">
                <div className="text-2xl mb-1">{f.icon}</div>
                <p className="text-gray-300 text-xs font-medium">{f.label}</p>
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
            <h1 className="text-2xl font-bold text-white mb-1">Create your account</h1>
            <p className="text-gray-400 text-sm">Free forever — no credit card required</p>
          </div>

          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8">
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input
                label="Full name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Lakshay Jangid"
                icon="👤"
                error={errors.name}
              />
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
                placeholder="Min. 6 characters"
                error={errors.password}
              />
              <Button type="submit" loading={loading} className="w-full" size="lg">
                Create free account →
              </Button>
              <p className="text-gray-500 text-xs text-center">
                By signing up you agree to our Terms of Service
              </p>
            </form>
          </div>

          <p className="text-center text-gray-500 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-400 hover:text-brand-300 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}