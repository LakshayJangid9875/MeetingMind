import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const features = [
  {
    icon: "🎙️",
    title: "AI Transcription",
    description: "Whisper AI transcribes every word with speaker detection and timestamps. Never miss a detail again."
  },
  {
    icon: "✨",
    title: "Smart Summaries",
    description: "Gemini AI generates concise summaries, key decisions, and meeting outcomes automatically."
  },
  {
    icon: "✅",
    title: "Action Item Extraction",
    description: "Automatically detects tasks, deadlines, and who is responsible. No manual notes needed."
  },
  {
    icon: "🔍",
    title: "Semantic Search",
    description: "Ask questions like 'What did we decide about the API?' and get instant answers from past meetings."
  },
  {
    icon: "📊",
    title: "Meeting Analytics",
    description: "Track speaking time, participation, recurring blockers, and meeting productivity over time."
  },
  {
    icon: "🔗",
    title: "Notion & Jira Sync",
    description: "Push meeting notes to Notion and create Jira tickets from action items in one click."
  },
  {
    icon: "🧠",
    title: "Organizational Memory",
    description: "MeetingMind remembers every meeting so your team never loses institutional knowledge."
  },
  {
    icon: "👥",
    title: "Team Accountability",
    description: "Track overdue tasks, pending action items, and completion rates across your entire team."
  },
  {
    icon: "🔒",
    title: "Secure & Private",
    description: "Enterprise-grade security with JWT authentication and encrypted data storage."
  },
];

const steps = [
  { step: "01", title: "Upload your meeting", desc: "Drop in an MP3, WAV, or MP4 file from any video call platform." },
  { step: "02", title: "AI processes it", desc: "Whisper transcribes the audio. Gemini extracts summaries and action items." },
  { step: "03", title: "Review insights", desc: "Get a clean dashboard with transcript, summary, tasks, and decisions." },
  { step: "04", title: "Sync to your tools", desc: "Push notes to Notion and tasks to Jira automatically." },
];

const plans = [
  {
    name: "Free",
    price: "$0",
    period: "forever",
    features: ["5 meetings/month", "AI transcription", "Basic summaries", "Action item extraction"],
    cta: "Get started",
    highlighted: false,
  },
  {
    name: "Pro",
    price: "$12",
    period: "per month",
    features: ["Unlimited meetings", "Semantic search", "Notion & Jira sync", "Meeting analytics", "Priority support"],
    cta: "Start free trial",
    highlighted: true,
  },
  {
    name: "Team",
    price: "$39",
    period: "per month",
    features: ["Everything in Pro", "Up to 10 members", "Team accountability", "Shared workspace", "Admin dashboard"],
    cta: "Contact us",
    highlighted: false,
  },
];

export default function LandingPage() {
  return (
    <div className="bg-gray-950 text-white min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 bg-indigo-400 rounded-full animate-pulse" />
            <span className="text-indigo-300 text-sm font-medium">AI-powered meeting intelligence</span>
          </div>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight mb-6">
            Stop taking notes.
            <br />
            <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
              Start taking action.
            </span>
          </h1>

          <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            MeetingMind automatically transcribes your meetings, extracts action items,
            and syncs with Notion and Jira — so your team spends less time on notes
            and more time on work that matters.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/signup"
              className="w-full sm:w-auto bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              Get started for free →
            </Link>
            <a
              href="#how-it-works"
              className="w-full sm:w-auto border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white font-medium px-8 py-3.5 rounded-xl transition-colors text-base"
            >
              See how it works
            </a>
          </div>

          <p className="text-gray-600 text-sm mt-6">No credit card required · Free forever plan available</p>
        </div>

        {/* Mock dashboard preview */}
        <div className="relative max-w-5xl mx-auto mt-16">
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6 text-left shadow-2xl">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500" />
              <div className="w-3 h-3 rounded-full bg-yellow-500" />
              <div className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-4 text-gray-500 text-sm">MeetingMind Dashboard</span>
            </div>
            <div className="grid grid-cols-3 gap-4 mb-4">
              {[["12", "Meetings this month"], ["8", "Action items"], ["3", "Decisions made"]].map(([num, label]) => (
                <div key={label} className="bg-gray-800 rounded-xl p-4">
                  <div className="text-2xl font-bold text-white">{num}</div>
                  <div className="text-gray-400 text-xs mt-1">{label}</div>
                </div>
              ))}
            </div>
            <div className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between mb-3">
                <span className="text-white text-sm font-medium">Latest meeting — Product Standup</span>
                <span className="text-indigo-400 text-xs bg-indigo-500/10 px-2 py-1 rounded-full">Ready</span>
              </div>
              <p className="text-gray-400 text-xs leading-relaxed">
                The team discussed the Q3 roadmap and agreed to prioritize the mobile app launch.
                Lakshay will complete the frontend by Friday. Design review scheduled for Monday...
              </p>
              <div className="flex gap-2 mt-3">
                <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded-full">✅ 3 action items</span>
                <span className="text-xs bg-purple-500/10 text-purple-400 px-2 py-1 rounded-full">🎯 2 decisions</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Everything your team needs</h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              From transcription to task tracking — MeetingMind handles the entire meeting workflow.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="bg-gray-900 border border-gray-800 hover:border-indigo-500/50 rounded-2xl p-6 transition-colors group"
              >
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="text-white font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="py-20 px-4 bg-gray-900/50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">How it works</h2>
            <p className="text-gray-400 text-lg">From upload to insights in under 2 minutes.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s) => (
              <div key={s.step} className="text-center">
                <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-indigo-400 font-bold text-sm">{s.step}</span>
                </div>
                <h3 className="text-white font-semibold mb-2">{s.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Simple, transparent pricing</h2>
            <p className="text-gray-400 text-lg">Start free. Upgrade when your team is ready.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {plans.map((p) => (
              <div
                key={p.name}
                className={`rounded-2xl p-6 border ${
                  p.highlighted
                    ? 'bg-indigo-500/10 border-indigo-500/50 relative'
                    : 'bg-gray-900 border-gray-800'
                }`}
              >
                {p.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-indigo-500 text-white text-xs font-semibold px-3 py-1 rounded-full">
                    Most popular
                  </div>
                )}
                <h3 className="text-white font-bold text-xl mb-1">{p.name}</h3>
                <div className="flex items-baseline gap-1 mb-1">
                  <span className="text-3xl font-bold text-white">{p.price}</span>
                  <span className="text-gray-400 text-sm">/{p.period}</span>
                </div>
                <ul className="space-y-3 my-6">
                  {p.features.map((feat) => (
                    <li key={feat} className="flex items-center gap-2 text-gray-300 text-sm">
                      <span className="text-indigo-400">✓</span> {feat}
                    </li>
                  ))}
                </ul>
                <Link
                  to="/signup"
                  className={`block text-center py-2.5 rounded-xl font-medium text-sm transition-colors ${
                    p.highlighted
                      ? 'bg-indigo-500 hover:bg-indigo-600 text-white'
                      : 'border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white'
                  }`}
                >
                  {p.cta}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-20 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">
            Ready to make your meetings count?
          </h2>
          <p className="text-gray-400 text-lg mb-8">
            Join teams using MeetingMind to turn conversations into action.
          </p>
          <Link
            to="/signup"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white font-semibold px-8 py-3.5 rounded-xl transition-colors"
          >
            Get started for free →
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <div className="w-6 h-6 bg-indigo-500 rounded-md flex items-center justify-center">
            <span className="text-white font-bold text-xs">M</span>
          </div>
          <span className="text-white font-semibold">MeetingMind</span>
        </div>
        <p className="text-gray-600 text-sm">© 2026 MeetingMind. Built with ❤️ using React & FastAPI.</p>
      </footer>
    </div>
  );
}