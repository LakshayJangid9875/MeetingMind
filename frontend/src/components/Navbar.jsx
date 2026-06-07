import { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-950/80 backdrop-blur-md border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-white font-semibold text-lg">MeetingMind</span>
          </Link>

          {/* Desktop nav links */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-400 hover:text-white text-sm transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white text-sm transition-colors">How it works</a>
            <a href="#pricing" className="text-gray-400 hover:text-white text-sm transition-colors">Pricing</a>
          </div>

          {/* CTA buttons */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="text-gray-400 hover:text-white text-sm transition-colors">
              Sign in
            </Link>
            <Link to="/signup" className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors">
              Get started free
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-gray-400 hover:text-white"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {menuOpen
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              }
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden py-4 border-t border-gray-800 flex flex-col gap-4">
            <a href="#features" className="text-gray-400 hover:text-white text-sm">Features</a>
            <a href="#how-it-works" className="text-gray-400 hover:text-white text-sm">How it works</a>
            <a href="#pricing" className="text-gray-400 hover:text-white text-sm">Pricing</a>
            <Link to="/login" className="text-gray-400 hover:text-white text-sm">Sign in</Link>
            <Link to="/signup" className="bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-lg text-center">
              Get started free
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}