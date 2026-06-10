import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useInView } from 'framer-motion';
import Navbar from '../components/Navbar';

const features = [
  { icon: "🎙️", title: "AI Transcription",       desc: "Whisper AI transcribes every word with speaker detection and precise timestamps." },
  { icon: "✨", title: "Smart Summaries",          desc: "Gemini AI generates concise summaries, key decisions, and meeting outcomes instantly." },
  { icon: "✅", title: "Action Item Extraction",   desc: "Automatically detects tasks, deadlines, and owners. No manual notes needed." },
  { icon: "🔍", title: "Semantic Search",          desc: "Ask 'What did we decide about the API?' and get instant answers from past meetings." },
  { icon: "📊", title: "Meeting Analytics",        desc: "Track speaking time, participation, recurring blockers, and productivity over time." },
  { icon: "🔗", title: "Notion & Jira Sync",       desc: "Push notes to Notion and create Jira tickets from action items in one click." },
  { icon: "🧠", title: "Organizational Memory",    desc: "MeetingMind remembers every meeting so your team never loses institutional knowledge." },
  { icon: "👥", title: "Team Accountability",      desc: "Track overdue tasks, pending items, and completion rates across your entire team." },
  { icon: "🔒", title: "Secure & Private",         desc: "Enterprise-grade security with JWT authentication and encrypted data storage." },
];

const steps = [
  { step: "01", title: "Upload your meeting",  desc: "Drop in an MP3, WAV, or MP4 file from any video call platform." },
  { step: "02", title: "AI processes it",       desc: "Whisper transcribes the audio. Gemini extracts summaries and action items." },
  { step: "03", title: "Review insights",       desc: "Get a clean dashboard with transcript, summary, tasks, and decisions." },
  { step: "04", title: "Sync to your tools",    desc: "Push notes to Notion and tasks to Jira automatically." },
];

const plans = [
  {
    name: "Free", price: "$0", period: "forever",
    features: ["5 meetings/month", "AI transcription", "Basic summaries", "Action item extraction"],
    cta: "Get started", highlighted: false,
  },
  {
    name: "Pro", price: "$12", period: "per month",
    features: ["Unlimited meetings", "Semantic search", "Notion & Jira sync", "Meeting analytics", "Priority support"],
    cta: "Start free trial", highlighted: true,
  },
  {
    name: "Team", price: "$39", period: "per month",
    features: ["Everything in Pro", "Up to 10 members", "Team accountability", "Shared workspace", "Admin dashboard"],
    cta: "Contact us", highlighted: false,
  },
];

function FadeInSection({ children, delay = 0 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-80px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
}

export default function LandingPage() {
  return (
    <div className="bg-surface-950 text-white min-h-screen overflow-hidden">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-24 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-hero-gradient opacity-60 pointer-events-none" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-20 left-1/4 w-48 h-48 bg-purple-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute top-20 right-1/4 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 bg-brand-500/10 border border-brand-500/20 rounded-full px-4 py-1.5 mb-8"
          >
            <span className="w-2 h-2 bg-brand-400 rounded-full animate-pulse" />
            <span className="text-brand-300 text-sm font-medium">AI-powered meeting intelligence platform</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] mb-6 tracking-tight"
          >
            Stop taking notes.
            <br />
            <span className="gradient-text">Start taking action.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            MeetingMind automatically transcribes your meetings, extracts action items,
            and syncs with Notion and Jira — so your team spends less time on notes
            and more time on work that matters.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4"
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                to="/signup"
                className="inline-flex items-center gap-2 bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-glow hover:shadow-glow-lg transition-all text-base"
              >
                Get started for free →
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <a
                href="#how-it-works"
                className="inline-flex items-center gap-2 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-8 py-3.5 rounded-xl transition-all text-base"
              >
                See how it works
              </a>
            </motion.div>
          </motion.div>
          <p className="text-gray-600 text-sm">No credit card required · Free forever plan available</p>
        </div>

        {/* Mock dashboard */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="relative max-w-5xl mx-auto mt-16"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-brand-500/20 via-purple-500/20 to-cyan-500/20 rounded-3xl blur-lg" />
          <div className="relative bg-gray-900 border border-gray-700/60 rounded-2xl p-6 text-left shadow-2xl">
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-4 text-gray-500 text-sm font-mono">MeetingMind — Dashboard</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-5">
              {[["12", "Meetings this month", "🎙️"], ["8", "Action items", "✅"], ["3", "Decisions made", "🎯"]].map(([num, label, icon]) => (
                <div key={label} className="bg-gray-800/60 border border-gray-700/40 rounded-xl p-4">
                  <div className="text-lg mb-1">{icon}</div>
                  <div className="text-2xl font-bold text-white">{num}</div>
                  <div className="text-gray-400 text-xs mt-0.5">{label}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-800/60 border border-gray-700/40 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">🎙️</span>
                  <span className="text-white text-sm font-medium">Product Standup — June 10</span>
                </div>
                <span className="text-green-400 text-xs bg-green-500/10 border border-green-500/20 px-2 py-1 rounded-full">Ready</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                The team discussed the Q3 roadmap and agreed to prioritize the mobile app launch.
                Lakshay will complete the frontend by Friday. Design review scheduled for Monday...
              </p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs bg-green-500/10 text-green-400 border border-green-500/20 px-2 py-1 rounded-full">✅ 3 action items</span>
                <span className="text-xs bg-purple-500/10 text-purple-400 border border-purple-500/20 px-2 py-1 rounded-full">🎯 2 decisions</span>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section id="features" className="py-24 px-4">
        <div className="max-w-7xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything your team needs</h2>
              <p className="text-gray-400 text-lg max-w-2xl mx-auto">From transcription to task tracking — MeetingMind handles the entire meeting workflow.</p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => (
              <FadeInSection key={f.title} delay={i * 0.05}>
                <motion.div
                  whileHover={{ y: -4, borderColor: 'rgba(99,102,241,0.4)' }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 transition-all hover:shadow-card group"
                >
                  <div className="text-3xl mb-4 group-hover:scale-110 transition-transform inline-block">{f.icon}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{f.desc}</p>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-24 px-4 bg-gray-900/30">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
              <p className="text-gray-400 text-lg">From upload to insights in under 2 minutes.</p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <FadeInSection key={s.step} delay={i * 0.1}>
                <div className="text-center">
                  <div className="w-14 h-14 bg-brand-500/10 border border-brand-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <span className="text-brand-400 font-bold">{s.step}</span>
                  </div>
                  <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-24 px-4">
        <div className="max-w-5xl mx-auto">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
              <p className="text-gray-400 text-lg">Start free. Upgrade when your team is ready.</p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p, i) => (
              <FadeInSection key={p.name} delay={i * 0.1}>
                <motion.div
                  whileHover={{ y: -4 }}
                  className={`rounded-2xl p-6 border relative transition-all ${
                    p.highlighted
                      ? 'bg-brand-500/10 border-brand-500/40 shadow-glow'
                      : 'bg-gray-900 border-gray-800 hover:border-gray-700'
                  }`}
                >
                  {p.highlighted && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-brand-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Most popular
                    </div>
                  )}
                  <h3 className="text-white font-bold text-xl mb-1">{p.name}</h3>
                  <div className="flex items-baseline gap-1 mb-6">
                    <span className="text-3xl font-bold text-white">{p.price}</span>
                    <span className="text-gray-400 text-sm">/{p.period}</span>
                  </div>
                  <ul className="space-y-3 mb-6">
                    {p.features.map((feat) => (
                      <li key={feat} className="flex items-center gap-2 text-gray-300 text-sm">
                        <span className="text-brand-400">✓</span> {feat}
                      </li>
                    ))}
                  </ul>
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Link
                      to="/signup"
                      className={`block text-center py-2.5 rounded-xl font-medium text-sm transition-all ${
                        p.highlighted
                          ? 'bg-brand-500 hover:bg-brand-600 text-white shadow-glow'
                          : 'border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white'
                      }`}
                    >
                      {p.cta}
                    </Link>
                  </motion.div>
                </motion.div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-radial from-brand-500/5 to-transparent pointer-events-none" />
        <FadeInSection>
          <div className="max-w-2xl mx-auto relative">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to make your meetings count?</h2>
            <p className="text-gray-400 text-lg mb-8">Join teams using MeetingMind to turn conversations into action.</p>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="inline-block">
              <Link to="/signup" className="bg-brand-500 hover:bg-brand-600 text-white font-semibold px-8 py-3.5 rounded-xl shadow-glow hover:shadow-glow-lg transition-all">
                Get started for free →
              </Link>
            </motion.div>
          </div>
        </FadeInSection>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-brand-500 to-purple-600 rounded-md flex items-center justify-center">
              <span className="text-white font-bold text-xs">M</span>
            </div>
            <span className="text-white font-semibold">MeetingMind</span>
          </div>
          <p className="text-gray-600 text-sm">© 2026 MeetingMind. Built with ❤️ using React & FastAPI.</p>
          <div className="flex gap-6">
            <a href="#features"    className="text-gray-500 hover:text-white text-sm transition-colors">Features</a>
            <a href="#pricing"     className="text-gray-500 hover:text-white text-sm transition-colors">Pricing</a>
            <Link to="/login"      className="text-gray-500 hover:text-white text-sm transition-colors">Login</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}