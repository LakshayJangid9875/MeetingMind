import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Zap, User, Mail, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { registerUser } from '../api/auth';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import ThemeToggle from '../components/ThemeToggle';
import toast from 'react-hot-toast';
import clsx from 'clsx';

export default function SignupPage() {
  const [name,     setName]     = useState('');
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
    if (!name || name.length < 2)         e.name     = 'Name must be at least 2 characters';
    if (!email)                            e.email    = 'Email is required';
    if (!password || password.length < 6) e.password = 'Password must be at least 6 characters';
    setErrors(e);
    return !Object.keys(e).length;
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      const data = await registerUser(name, email, password);
      login(data.access_token, data.user);
      toast.success(`Welcome to MeetingMind, ${data.user.name}! 🎉`);
      navigate('/dashboard');
    } catch (err) {
      toast.error(err.response?.data?.detail || 'Signup failed. Please try again.');
    } finally { setLoading(false); }
  };

  return (
    <div className={clsx('min-h-screen flex', isDark ? 'bg-dark-bg' : 'bg-light-bg')}>
      {/* Left */}
      <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}
        className="hidden lg:flex lg:w-1/2 relative overflow-hidden items-center justify-center p-12"
        style={{ background: isDark ? 'linear-gradient(135deg, #0F172A, #1E293B)' : 'linear-gradient(135deg, #EFF6FF, #F8FAFC)' }}
      >
        <div className="absolute top-20 right-20 w-72 h-72 bg-accent-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-20 w-56 h-56 bg-brand-500/8 rounded-full blur-2xl" />
        <div className="relative text-center max-w-md z-10">
          <div className="text-6xl mb-6 animate-float">🚀</div>
          <h2 className={clsx('text-3xl font-bold mb-4', isDark ? 'text-dark-text' : 'text-light-text')}>
            Start your <span className="gradient-text">free account</span> today
          </h2>
          <p className={clsx('leading-relaxed mb-8', isDark ? 'text-dark-muted' : 'text-light-muted')}>
            Join teams using MeetingMind to turn conversations into action items, decisions, and searchable knowledge.
          </p>
          <div className="grid grid-cols-2 gap-3">
            {[['🎙️','AI Transcription'],['✨','Smart Summaries'],['✅','Action Items'],['📊','Analytics']].map(([i, l]) => (
              <div key={l} className={clsx('rounded-xl border p-3 text-center', isDark ? 'bg-dark-elevated border-dark-border' : 'bg-white border-light-border')}>
                <div className="text-2xl mb-1">{i}</div>
                <p className={clsx('text-xs font-medium', isDark ? 'text-dark-muted' : 'text-light-muted')}>{l}</p>
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
            <h1 className={clsx('text-2xl font-bold mb-1', isDark ? 'text-dark-text' : 'text-light-text')}>Create your account</h1>
            <p className={clsx('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>Free forever — no credit card required</p>
          </div>

          <div className={clsx('rounded-2xl border p-8', isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border shadow-card')}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <Input label="Full name" type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Lakshay Jangid" icon={<User size={15} />} error={errors.name} required />
              <Input label="Email address" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" icon={<Mail size={15} />} error={errors.email} required />
              <Input label="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Min. 6 characters" error={errors.password} required />
              <Button type="submit" loading={loading} fullWidth size="lg" variant="gradient" iconRight={<ArrowRight size={16} />}>
                Create free account
              </Button>
              <p className={clsx('text-xs text-center', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                By signing up you agree to our Terms of Service and Privacy Policy.
              </p>
            </form>
          </div>

          <p className={clsx('text-center text-sm mt-6', isDark ? 'text-dark-muted' : 'text-light-muted')}>
            Already have an account?{' '}
            <Link to="/login" className="text-brand-500 hover:text-brand-400 font-semibold">Sign in</Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}