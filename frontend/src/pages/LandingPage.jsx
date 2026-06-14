import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import { Zap, ArrowRight, Check, Star } from 'lucide-react';
import Navbar from '../components/Navbar';
import { useTheme } from '../context/ThemeContext';
import clsx from 'clsx';

const FEATURES = [
  { icon: '🎙️', title: 'AI Transcription',      desc: 'Whisper AI transcribes every word with speaker detection and precise timestamps. 99% accuracy.'       },
  { icon: '✨', title: 'Smart Summaries',         desc: 'Gemini AI generates executive summaries, key decisions, and meeting outcomes in seconds.'            },
  { icon: '✅', title: 'Action Item Extraction',  desc: 'Automatically detects tasks, owners, and deadlines. Never miss a follow-up again.'                  },
  { icon: '🔍', title: 'Semantic Search',         desc: "Ask 'What did we decide about the API?' and instantly find the answer across all your meetings."    },
  { icon: '📊', title: 'Meeting Analytics',       desc: 'Track speaking time, participation, recurring blockers, and productivity trends over time.'          },
  { icon: '🔗', title: 'Notion & Jira Sync',      desc: 'Auto-push notes to Notion and create Jira tickets from action items with one click.'                },
  { icon: '🧠', title: 'Organizational Memory',   desc: 'MeetingMind builds institutional knowledge so your team never loses important context.'             },
  { icon: '👥', title: 'Team Accountability',     desc: 'Track overdue tasks, completion rates, and performance across your entire team.'                    },
  { icon: '🔒', title: 'Enterprise Security',     desc: 'JWT authentication, encrypted storage, and SOC 2 ready architecture.'                               },
];

const STEPS = [
  { n: '01', title: 'Upload recording',    desc: 'Drop in any MP3, WAV, or MP4 file from Zoom, Meet, Teams, or any platform.'         },
  { n: '02', title: 'AI processes it',     desc: 'Whisper transcribes. Gemini extracts insights, tasks, and decisions automatically.'  },
  { n: '03', title: 'Review insights',     desc: 'Get a clean dashboard with transcript, summary, action items, and key decisions.'    },
  { n: '04', title: 'Sync to your stack',  desc: 'Push notes to Notion and create Jira tickets — all automated.'                      },
];

const PLANS = [
  { name: 'Free',  price: '$0',  period: 'forever',    features: ['5 meetings/month', 'AI transcription', 'Basic summaries', 'Action items'], cta: 'Get started', highlight: false },
  { name: 'Pro',   price: '$12', period: '/month',      features: ['Unlimited meetings', 'Semantic search', 'Notion + Jira sync', 'Analytics', 'Priority support'], cta: 'Start free trial', highlight: true  },
  { name: 'Team',  price: '$39', period: '/month',      features: ['Everything in Pro', 'Up to 20 members', 'Team accountability', 'Admin dashboard', 'SSO'], cta: 'Contact sales', highlight: false },
];

const INTEGRATIONS = [
  { name: 'Notion', emoji: '📝' }, { name: 'Jira', emoji: '🎫' },
  { name: 'Slack',  emoji: '💬' }, { name: 'Zoom', emoji: '📹' },
  { name: 'Teams',  emoji: '🔵' }, { name: 'Meet', emoji: '🟢' },
];

function Section({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay, ease: 'easeOut' }}>
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={clsx('min-h-screen overflow-hidden', isDark ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text')}>
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 text-center overflow-hidden">
        {/* BG effects */}
        <div className={clsx('absolute inset-0 pointer-events-none', isDark ? 'bg-hero-dark' : 'bg-hero-light')} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-brand-600/8 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-32 left-1/4 w-56 h-56 bg-brand-500/6 rounded-full blur-2xl pointer-events-none animate-float" />
        <div className="absolute top-32 right-1/4 w-56 h-56 bg-accent-500/6 rounded-full blur-2xl pointer-events-none animate-float" style={{ animationDelay: '2s' }} />

        <div className="relative max-w-5xl mx-auto">
          {/* Badge */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-8"
          >
            <Zap size={13} className="text-brand-400" fill="currentColor" />
            <span className="text-brand-400 text-sm font-medium">AI-powered meeting intelligence</span>
            <span className="bg-brand-500/20 text-brand-300 text-xs px-2 py-0.5 rounded-full font-mono">v1.0</span>
          </motion.div>

          {/* Headline */}
          <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.08] mb-6 tracking-tight"
          >
            Stop taking notes.
            <br />
            <span className="gradient-text">Start taking action.</span>
          </motion.h1>

          <motion.p initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            className={clsx('text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed', isDark ? 'text-dark-muted' : 'text-light-muted')}
          >
            MeetingMind automatically transcribes, summarizes, and extracts action items from every meeting — then syncs everything to Notion and Jira.
          </motion.p>

          {/* CTAs */}
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link to="/signup" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 hover:opacity-90 text-white font-semibold px-8 py-3.5 rounded-xl shadow-glow hover:shadow-glow-lg transition-all text-base">
                Get started free <ArrowRight size={17} />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a href="#how-it-works" className={clsx('inline-flex items-center gap-2 border font-medium px-8 py-3.5 rounded-xl transition-all text-base', isDark ? 'border-dark-border text-dark-muted hover:text-dark-text hover:border-dark-muted' : 'border-light-border text-light-muted hover:text-light-text')}>
                See how it works
              </a>
            </motion.div>
          </motion.div>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
            className={clsx('text-sm', isDark ? 'text-dark-muted/60' : 'text-light-muted/60')}
          >
            No credit card required · Free forever plan · 5 minute setup
          </motion.p>

          {/* Social proof */}
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-2 mt-6"
          >
            <div className="flex -space-x-2">
              {['A','B','C','D','E'].map((l, i) => (
                <div key={l} className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-500 to-accent-500 border-2 border-dark-bg flex items-center justify-center text-white text-xs font-bold" style={{ zIndex: 5-i }}>
                  {l}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-1">
              {Array(5).fill(0).map((_, i) => <Star key={i} size={13} className="text-warning fill-warning" />)}
            </div>
            <span className={clsx('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>Loved by 1,000+ teams</span>
          </motion.div>
        </div>

        {/* Dashboard preview */}
        <motion.div initial={{ opacity: 0, y: 48 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
          className="relative max-w-5xl mx-auto mt-20"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-brand-500/15 via-accent-500/10 to-brand-500/15 rounded-3xl blur-xl" />
          <div className={clsx('relative rounded-2xl border overflow-hidden shadow-card-lg', isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border')}>
            {/* Window chrome */}
            <div className={clsx('flex items-center gap-2 px-5 py-3.5 border-b', isDark ? 'border-dark-border bg-dark-elevated' : 'border-light-border bg-light-secondary')}>
              <div className="w-3 h-3 rounded-full bg-danger/70" />
              <div className="w-3 h-3 rounded-full bg-warning/70" />
              <div className="w-3 h-3 rounded-full bg-success/70" />
              <div className={clsx('mx-auto text-xs font-mono', isDark ? 'text-dark-muted' : 'text-light-muted')}>app.meetingmind.ai — Dashboard</div>
            </div>
            {/* Dashboard UI */}
            <div className="p-6">
              <div className="grid grid-cols-4 gap-3 mb-5">
                {[['12', '🎙️', 'Meetings'], ['8', '✅', 'Action Items'], ['3', '🎯', 'Decisions'], ['95%', '⚡', 'Productivity']].map(([val, icon, label]) => (
                  <div key={label} className={clsx('rounded-xl p-4', isDark ? 'bg-dark-elevated' : 'bg-light-secondary')}>
                    <div className="text-lg mb-1">{icon}</div>
                    <div className={clsx('text-2xl font-bold', isDark ? 'text-dark-text' : 'text-light-text')}>{val}</div>
                    <div className={clsx('text-xs mt-0.5', isDark ? 'text-dark-muted' : 'text-light-muted')}>{label}</div>
                  </div>
                ))}
              </div>
              <div className={clsx('rounded-xl border p-4', isDark ? 'bg-dark-elevated border-dark-border' : 'bg-white border-light-border')}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span>🎙️</span>
                    <span className={clsx('text-sm font-semibold', isDark ? 'text-dark-text' : 'text-light-text')}>Product Standup — June 10, 2026</span>
                  </div>
                  <span className="text-success text-xs bg-success/10 border border-success/20 px-2.5 py-1 rounded-full font-medium">Ready</span>
                </div>
                <p className={clsx('text-xs leading-relaxed mb-3', isDark ? 'text-dark-muted' : 'text-light-muted')}>
                  The team agreed to prioritize the mobile app launch for Q3. Lakshay will complete the frontend by Friday. Design review scheduled for Monday morning...
                </p>
                <div className="flex gap-2">
                  <span className="text-xs bg-success/10 text-success border border-success/20 px-2.5 py-1 rounded-full">✅ 3 action items</span>
                  <span className="text-xs bg-brand-500/10 text-brand-400 border border-brand-500/20 px-2.5 py-1 rounded-full">🎯 2 decisions</span>
                  <span className="text-xs bg-warning/10 text-warning border border-warning/20 px-2.5 py-1 rounded-full">⚡ Productive</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className={clsx('py-24 px-4', isDark ? 'bg-dark-surface/30' : 'bg-light-secondary/50')}>
        <div className="max-w-7xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything your team needs</h2>
              <p className={clsx('text-lg max-w-2xl mx-auto', isDark ? 'text-dark-muted' : 'text-light-muted')}>From transcription to task tracking — one platform for complete meeting intelligence.</p>
            </div>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {FEATURES.map((f, i) => (
              <Section key={f.title} delay={i * 0.04}>
                <motion.div whileHover={{ y: -4, borderColor: 'rgba(59,130,246,0.4)' }}
                  className={clsx('rounded-2xl border p-6 transition-all group', isDark ? 'bg-dark-surface border-dark-border hover:shadow-card-lg' : 'bg-white border-light-border hover:shadow-card-lg')}
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                  <h3 className={clsx('font-semibold text-lg mb-2', isDark ? 'text-dark-text' : 'text-light-text')}>{f.title}</h3>
                  <p className={clsx('text-sm leading-relaxed', isDark ? 'text-dark-muted' : 'text-light-muted')}>{f.desc}</p>
                </motion.div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
              <p className={clsx('text-lg', isDark ? 'text-dark-muted' : 'text-light-muted')}>From upload to insights in under 2 minutes.</p>
            </div>
          </Section>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STEPS.map((s, i) => (
              <Section key={s.n} delay={i * 0.08}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-brand-600/10 border border-brand-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-brand-400 font-bold font-mono">{s.n}</span>
                  </div>
                  <h3 className={clsx('font-semibold mb-2', isDark ? 'text-dark-text' : 'text-light-text')}>{s.title}</h3>
                  <p className={clsx('text-sm leading-relaxed', isDark ? 'text-dark-muted' : 'text-light-muted')}>{s.desc}</p>
                </div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* Integrations */}
      <section className={clsx('py-24 px-4', isDark ? 'bg-dark-surface/30' : 'bg-light-secondary/50')}>
        <div className="max-w-4xl mx-auto text-center">
          <Section>
            <h2 className="text-3xl font-bold mb-4">Works with your stack</h2>
            <p className={clsx('text-lg mb-12', isDark ? 'text-dark-muted' : 'text-light-muted')}>Connect MeetingMind to the tools your team already uses.</p>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {INTEGRATIONS.map((int, i) => (
                <Section key={int.name} delay={i * 0.05}>
                  <motion.div whileHover={{ y: -4, scale: 1.05 }}
                    className={clsx('rounded-2xl border p-4 text-center transition-all', isDark ? 'bg-dark-surface border-dark-border' : 'bg-white border-light-border')}
                  >
                    <div className="text-3xl mb-2">{int.emoji}</div>
                    <p className={clsx('text-xs font-medium', isDark ? 'text-dark-muted' : 'text-light-muted')}>{int.name}</p>
                  </motion.div>
                </Section>
              ))}
            </div>
          </Section>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <Section>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className={clsx('text-lg', isDark ? 'text-dark-muted' : 'text-light-muted')}>Start free. Upgrade when you're ready.</p>
            </div>
          </Section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map((p, i) => (
              <Section key={p.name} delay={i * 0.08}>
                <motion.div whileHover={{ y: -4 }}
                  className={clsx('rounded-2xl border p-6 relative transition-all', p.highlight ? 'border-brand-500/50 shadow-glow' : isDark ? 'border-dark-border bg-dark-surface' : 'border-light-border bg-white')}
                  style={p.highlight ? { background: isDark ? 'linear-gradient(135deg, rgba(59,130,246,0.08), rgba(6,182,212,0.04))' : 'linear-gradient(135deg, rgba(37,99,235,0.04), rgba(6,182,212,0.02))' } : {}}
                >
                  {p.highlight && (
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-brand-600 to-brand-500 text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-glow">
                      Most popular
                    </div>
                  )}
                  <h3 className={clsx('font-bold text-xl mb-1', isDark ? 'text-dark-text' : 'text-light-text')}>{p.name}</h3>
                  <div className="flex items-baseline gap-0.5 mb-6">
                    <span className={clsx('text-4xl font-bold', isDark ? 'text-dark-text' : 'text-light-text')}>{p.price}</span>
                    <span className={clsx('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2.5 text-sm">
                        <Check size={15} className="text-success flex-shrink-0" />
                        <span className={isDark ? 'text-dark-muted' : 'text-light-muted'}>{feat}</span>
                      </li>
                    ))}
                  </ul>
                  <Link to="/signup"
                    className={clsx('block text-center py-3 rounded-xl font-semibold text-sm transition-all', p.highlight
                      ? 'bg-gradient-to-r from-brand-600 to-brand-500 text-white shadow-glow hover:opacity-90'
                      : isDark ? 'border border-dark-border text-dark-muted hover:text-dark-text hover:border-dark-muted' : 'border border-light-border text-light-muted hover:text-light-text'
                    )}
                  >
                    {p.cta}
                  </Link>
                </motion.div>
              </Section>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-4">
        <Section>
          <div className="max-w-3xl mx-auto text-center">
            <div className="absolute left-1/2 -translate-x-1/2 w-96 h-96 bg-brand-500/8 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 relative">Ready to transform your meetings?</h2>
            <p className={clsx('text-lg mb-8 relative', isDark ? 'text-dark-muted' : 'text-light-muted')}>Join 1,000+ teams using MeetingMind to turn conversations into action.</p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block relative">
              <Link to="/signup" className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-600 to-brand-500 text-white font-semibold px-8 py-4 rounded-xl shadow-glow hover:shadow-glow-lg transition-all text-base">
                Get started for free <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </Section>
      </section>

      {/* Footer */}
      <footer className={clsx('border-t py-10 px-4', isDark ? 'border-dark-border' : 'border-light-border')}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-gradient-to-br from-brand-600 to-accent-500 rounded-lg flex items-center justify-center">
              <Zap size={13} className="text-white" fill="white" />
            </div>
            <span className={clsx('font-bold', isDark ? 'text-dark-text' : 'text-light-text')}>MeetingMind</span>
          </div>
          <p className={clsx('text-sm', isDark ? 'text-dark-muted' : 'text-light-muted')}>© 2026 MeetingMind. Built with ❤️ using React & FastAPI.</p>
          <div className="flex gap-6">
            {[
              { label: 'Features', href: '#features' },
              { label: 'Pricing', href: '#pricing' },
              { label: 'Sign in', href: '/login' }
            ].map((item) => (
              <a
                 key={item.label}
                 href={item.href}
                className={clsx(
                  'text-sm transition-colors hover:text-brand-500',
                  isDark ? 'text-dark-muted' : 'text-light-muted'
                )}
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}