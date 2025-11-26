import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Database, User, Menu, X, Globe, Zap } from 'lucide-react';
import { Language } from '../types';

interface LayoutProps {
  children: ReactNode;
  lang: Language;
  toggleLang: () => void;
  userPoints: number;
}

export const Layout: React.FC<LayoutProps> = ({ children, lang, toggleLang, userPoints }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path ? 'text-neon-green' : 'text-gray-400 hover:text-white';

  return (
    <div className="min-h-screen bg-scifi-bg text-gray-200 font-sans selection:bg-neon-green selection:text-black">
      {/* Navbar */}
      <nav className="sticky top-0 z-50 border-b border-scifi-border bg-scifi-bg/80 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm">
                <a 
                  href="https://lexaverse.dev" 
                  className="text-gray-400 hover:text-neon-green transition-colors font-medium"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  LEXAVERSE
                </a>
                <span className="text-gray-600">/</span>
                <Link to="/" className="flex items-center gap-2 group">
                  <div className="w-8 h-8 rounded bg-gradient-to-br from-neon-green to-blue-600 flex items-center justify-center">
                    <Database className="w-5 h-5 text-black" />
                  </div>
                  <span className="font-mono font-bold text-xl tracking-tighter text-white group-hover:text-neon-green transition-colors">
                    Agent<span className="text-neon-green">Review</span>
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/')}`}>
                  {lang === Language.EN ? 'Home' : '首页'}
                </Link>
                <Link to="/papers" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/papers')}`}>
                  {lang === Language.EN ? 'Papers' : '论文库'}
                </Link>
                <Link to="/leaderboard" className={`px-3 py-2 rounded-md text-sm font-medium transition-all ${isActive('/leaderboard')}`}>
                  {lang === Language.EN ? 'Leaderboard' : '排行榜'}
                </Link>
              </div>
            </div>

            <div className="hidden md:flex items-center gap-4">
              <button 
                onClick={toggleLang}
                className="p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Toggle Language"
              >
                <Globe className="w-5 h-5" />
              </button>
              
              <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-neon-purple/30 bg-neon-purple/10">
                <Zap className="w-4 h-4 text-neon-purple" fill="currentColor" />
                <span className="font-mono text-neon-purple text-sm font-bold">{userPoints} $AGENT</span>
              </div>

              <Link to="/profile" className="p-1 rounded-full bg-scifi-card border border-scifi-border hover:border-neon-green transition-all">
                 <User className="w-6 h-6 text-gray-400" />
              </Link>
            </div>

            <div className="-mr-2 flex md:hidden">
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-scifi-card border-b border-scifi-border">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Home</Link>
              <Link to="/papers" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Papers</Link>
              <Link to="/leaderboard" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">Leaderboard</Link>
              <Link to="/profile" onClick={() => setIsMenuOpen(false)} className="text-gray-300 hover:text-white block px-3 py-2 rounded-md text-base font-medium">My Profile</Link>
            </div>
          </div>
        )}
      </nav>

      <main>
        {children}
      </main>

      <footer className="bg-black border-t border-scifi-border mt-12 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <span className="text-neon-green font-mono font-bold text-lg">AgentReview</span>
            <p className="text-gray-500 text-sm mt-1">Decentralized Science for the AI Era.</p>
          </div>
          <div className="flex space-x-6 text-gray-400">
            <a href="#" className="hover:text-white">GitHub</a>
            <a href="#" className="hover:text-white">HuggingFace Dataset</a>
            <a href="#" className="hover:text-white">Twitter</a>
          </div>
        </div>
      </footer>
    </div>
  );
};
