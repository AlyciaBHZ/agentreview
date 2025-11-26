import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Activity, Users, FileText } from 'lucide-react';
import { Language } from '../types';
import { MockService } from '../services/mockStore';

interface HomeProps {
  lang: Language;
}

export const Home: React.FC<HomeProps> = ({ lang }) => {
  const [stats, setStats] = React.useState({ papers: 0, reviews: 0 });

  React.useEffect(() => {
    MockService.getPapers().then(papers => {
      setStats({ 
        papers: papers.length, 
        reviews: papers.reduce((acc, p) => acc + p.reviewCount, 0) 
      });
    });
  }, []);

  const t = {
    title: lang === Language.EN ? "Reinventing Academic Publishing" : "AI时代，传统学术将被彻底重构",
    subtitle: lang === Language.EN 
      ? "Turn Andrew Ng's AI Agents Review into a global community consensus layer. This is the Bitcoin moment for DeSci."
      : "我们把吴恩达的AI Agents Review变成全球年轻人社区审稿+链上优先权的起点。这是DeSci的比特币时刻。",
    cta: lang === Language.EN ? "Start Reviewing" : "开始审稿",
    stat1: lang === Language.EN ? "Papers Indexed" : "收录论文",
    stat2: lang === Language.EN ? "Total Reviews" : "总审稿数",
    stat3: lang === Language.EN ? "Active Nodes" : "活跃节点",
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-neon-green/10 blur-[120px] rounded-full pointer-events-none" />

      {/* Hero */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center lg:pt-32">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-neon-blue/30 bg-neon-blue/5 text-neon-blue mb-8 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-neon-blue opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-neon-blue"></span>
          </span>
          <span className="text-xs font-mono font-medium tracking-wide uppercase">Genesis Block Live</span>
        </div>

        <h1 className="mx-auto max-w-4xl font-display text-5xl font-bold tracking-tight text-white sm:text-7xl mb-6">
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
            {t.title}
          </span>
        </h1>
        
        <p className="mx-auto max-w-2xl text-lg text-gray-400 mb-10 leading-relaxed">
          {t.subtitle}
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link 
            to="/papers" 
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-neon-green px-8 py-3 text-sm font-semibold text-black transition-all hover:bg-emerald-400 hover:shadow-[0_0_20px_rgba(0,255,157,0.4)]"
          >
            {t.cta}
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a 
            href="#" 
            className="inline-flex items-center justify-center gap-2 rounded-lg border border-gray-700 bg-black/50 px-8 py-3 text-sm font-semibold text-white transition-all hover:bg-gray-800"
          >
            Read Manifesto
          </a>
        </div>

        {/* Stats Grid */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3 border-t border-white/10 pt-10">
          <div className="flex flex-col items-center">
            <dt className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <FileText className="h-4 w-4 text-neon-purple" />
              {t.stat1}
            </dt>
            <dd className="mt-2 text-3xl font-bold tracking-tight text-white font-mono">{stats.papers}</dd>
          </div>
          <div className="flex flex-col items-center">
            <dt className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <Activity className="h-4 w-4 text-neon-green" />
              {t.stat2}
            </dt>
            <dd className="mt-2 text-3xl font-bold tracking-tight text-white font-mono">{stats.reviews}</dd>
          </div>
          <div className="flex flex-col items-center">
            <dt className="flex items-center gap-2 text-sm font-medium text-gray-400">
              <Users className="h-4 w-4 text-blue-400" />
              {t.stat3}
            </dt>
            <dd className="mt-2 text-3xl font-bold tracking-tight text-white font-mono">1,204</dd>
          </div>
        </div>
      </div>
    </div>
  );
};
