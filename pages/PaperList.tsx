import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, Star, MessageSquare } from 'lucide-react';
import { MockService } from '../services/mockStore';
import { Paper, Language } from '../types';

interface PaperListProps {
  lang: Language;
}

export const PaperList: React.FC<PaperListProps> = ({ lang }) => {
  const [papers, setPapers] = React.useState<Paper[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [searchTerm, setSearchTerm] = React.useState('');

  React.useEffect(() => {
    MockService.getPapers().then(data => {
      setPapers(data);
      setLoading(false);
    });
  }, []);

  const filteredPapers = papers.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.abstract.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">
            {lang === Language.EN ? 'Latest Research' : '最新论文'}
          </h2>
          <p className="text-gray-400">
            {lang === Language.EN ? 'Review papers, earn points, shape the future of AI.' : '审阅论文，赚取积分，塑造AI未来。'}
          </p>
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-scifi-card border border-scifi-border rounded-lg pl-10 pr-4 py-2 text-sm text-white focus:ring-1 focus:ring-neon-green focus:border-neon-green outline-none"
            />
          </div>
          <button className="px-3 py-2 bg-scifi-card border border-scifi-border rounded-lg text-gray-300 hover:text-white">
            <Filter className="w-4 h-4" />
          </button>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1,2,3].map(i => (
            <div key={i} className="h-40 bg-scifi-card/50 rounded-xl animate-pulse" />
          ))}
        </div>
      ) : (
        <div className="grid gap-6">
          {filteredPapers.map((paper) => (
            <div key={paper.id} className="group relative bg-scifi-card border border-scifi-border rounded-xl p-6 transition-all hover:border-neon-green/50 hover:shadow-[0_0_15px_rgba(0,255,157,0.1)]">
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 rounded text-xs font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                      {paper.category}
                    </span>
                    <span className="text-xs text-gray-500 font-mono">{paper.publishedDate}</span>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-neon-green transition-colors">
                    <Link to={`/review/${paper.id}`}>
                      {paper.title}
                    </Link>
                  </h3>
                  <div className="text-sm text-gray-400 mb-4 line-clamp-2">
                    {paper.abstract}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                     <span>By {paper.authors.join(', ')}</span>
                  </div>
                </div>

                <div className="flex md:flex-col items-center justify-center gap-4 md:gap-2 border-t md:border-t-0 md:border-l border-scifi-border pt-4 md:pt-0 md:pl-6 min-w-[120px]">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-neon-green font-bold text-lg">
                      <Star className="w-5 h-5 fill-current" />
                      {paper.avgScore}
                    </div>
                    <div className="text-xs text-gray-500">Avg Score</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 text-white font-bold text-lg">
                      <MessageSquare className="w-5 h-5" />
                      {paper.reviewCount}
                    </div>
                    <div className="text-xs text-gray-500">Reviews</div>
                  </div>
                  <Link 
                    to={`/review/${paper.id}`}
                    className="mt-2 px-4 py-2 bg-white text-black text-sm font-bold rounded hover:bg-neon-green transition-colors w-full text-center"
                  >
                    Review
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
