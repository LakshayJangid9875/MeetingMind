import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { loginUser } from '../api/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ThemeToggle';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export default function LoginPage() {
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [loading,  setLoading]  = useState(false);
  const [errors,   setErrors]   = useState({});
  const { login } = useAuth();
  const navigate  = useNavigate();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const validate = () => {
    const e = {};
    if (!email)    e.email    = 'Email is required';
    if (!password) e.password = 'Password is required';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      login(data.access_token, data.user);
      toast.success(`Welcome back, ${data.user.name}! 👋`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Invalid credentials');
    } finally { setLoading(false); }
  };

  return (
    <div className={clsx('min-h-screen flex', isDark ? 'bg-dark-bg' : 'bg-light-bg')}>
      {/* Left */}
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
        style={{ background: isDark ? 'linear-gradient(135deg, #0F172A, #1E293B)' : 'linear-gradient(135deg, #EFF6FF, #F8FAFC)' }}
      >
        <div className="absolute top-20 left-20 w-72 h-72 bg-brand-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-56 h-56 bg-accent-500/8 rounded-full blur-2xl" />
        <div className="relative text-center max-w-md z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-brand-600 to-accent-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-glow-lg">
            <Zap size={28} className="text-white" fill="white" />
          </div>
          <h2 className={clsx('text-3xl font-bold mb-4', isDark ? 'text-dark-text' : 'text-light-text')}>
            Transform your <span className="gradient-text">meeting culture</span>
          </h2>
          <p className={clsx('leading-relaxed mb-8', isDark ? 'text-dark-muted' : 'text-light-muted')}>
            MeetingMind automatically transcribes, summarizes, and turns every meeting into structured, searchable knowledge.
          </p>
          <div className="space-y-3">
            {['🎙️ Auto-transcription with 99% accuracy', '✨ AI summaries in seconds', '✅ Automatic action item extraction', '🔍 Semantic search across all meetings'].map((f) => (
              <div key={f} className={clsx('flex items-center gap-3 text-left rounded-xl px-4 py-3', isDark ? 'bg-dark-elevated border border-dark-border' : 'bg-white border border-light-border')}>
                <span className={clsx('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>{f}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Right */}
      <motion.div initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        className="flex-1 flex items-center justify-center px-6 py-12 relative"
      >
        <div className="absolute top-4 right-4"><ThemeToggle /></div>
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-2 mb-8 lg:hidden">
              <div className="w-8 h-8 bg-gradient-to-br from-brand-600 to-accent-500 rounded-lg flex items-center justify-center"><Zap size={15} className="text-white" fill="white" /></div>
              <span className={clsx('font-bold', isDark ? 'text-dark-text' : 'text-light-text')}>MeetingMind</span>
            </Link>
            <h1 className={clsx('text-2xl font-bold mb-1', isDark ? 'text-dark-text' : 'text-light-text')}>Welcome back</h1>
            <p className={clsx('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>Sign in to your MeetingMind account</p>
          </div>

          <div className={clsx('rounded-2xl border p-8', isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border shadow-card')}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" icon={<Mail size={15} />} error={errors.email} required />
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" error={errors.password} required />
              <Button type="submit" loading={loading} fullWidth size="lg" variant="gradient" iconRight={<ArrowRight size={16} />}>
                Sign in to MeetingMind
              </Button>
            </form>
          </div>

          <p className={clsx('text-center text-sm mt-6', isDark ? 'text-dark-muted' : 'text-light-muted')}>
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-500 hover:text-brand-400 font-semibold">Sign up free</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}