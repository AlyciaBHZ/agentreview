import React from 'react';
import { Trophy, Medal, Crown, TrendingUp, Users, Activity } from 'lucide-react';
import { MockService } from '../services/mockStore';
import { User, Language } from '../types';

interface LeaderboardProps {
  lang: Language;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ lang }) => {
  const [users, setUsers] = React.useState<User[]>([]);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    MockService.getLeaderboard().then(data => {
      setUsers(data);
      setLoading(false);
    });
  }, []);

  const topThree = users.slice(0, 3);
  const restUsers = users.slice(3);

  const getRankIcon = (index: number) => {
    switch(index) {
      case 0: return <Crown className="w-6 h-6 text-yellow-400 fill-yellow-400/20" />;
      case 1: return <Medal className="w-6 h-6 text-gray-300 fill-gray-300/20" />;
      case 2: return <Medal className="w-6 h-6 text-amber-600 fill-amber-600/20" />;
      default: return <span className="font-mono text-gray-500">#{index + 1}</span>;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
          {lang === Language.EN ? 'Network Consensus' : '网络共识排行榜'}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          {lang === Language.EN 
            ? 'Top nodes contributing to the AI Agents knowledge graph. Earn $AGENT by providing high-quality reviews.' 
            : '为AI Agents知识图谱做出贡献的顶级节点。通过提供高质量的评论赚取 $AGENT。'}
        </p>

        {/* Stats Summary */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
          <div className="bg-scifi-card border border-scifi-border p-6 rounded-xl relative overflow-hidden group hover:border-neon-green/30 transition-all">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Users size={64} />
            </div>
            <div className="text-sm text-gray-500 font-mono mb-1">Active Nodes</div>
            <div className="text-3xl font-bold text-white">1,204</div>
            <div className="text-xs text-neon-green flex items-center gap-1 mt-2">
              <TrendingUp size={12} /> +12% this week
            </div>
          </div>
          <div className="bg-scifi-card border border-scifi-border p-6 rounded-xl relative overflow-hidden group hover:border-neon-purple/30 transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Activity size={64} />
            </div>
            <div className="text-sm text-gray-500 font-mono mb-1">Total Consensus</div>
            <div className="text-3xl font-bold text-white">85.4k</div>
             <div className="text-xs text-neon-purple flex items-center gap-1 mt-2">
              Reviews processed
            </div>
          </div>
          <div className="bg-scifi-card border border-scifi-border p-6 rounded-xl relative overflow-hidden group hover:border-blue-500/30 transition-all">
             <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Trophy size={64} />
            </div>
            <div className="text-sm text-gray-500 font-mono mb-1">$AGENT Distributed</div>
            <div className="text-3xl font-bold text-white">4.2M</div>
            <div className="text-xs text-blue-400 flex items-center gap-1 mt-2">
              Incentive Pool
            </div>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="space-y-4">
            {[1,2,3,4,5].map(i => <div key={i} className="h-16 bg-scifi-card/50 rounded-xl animate-pulse" />)}
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {/* Top 3 Cards (Mobile/Tablet stacked, Desktop grid) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8 items-end">
            {/* 2nd Place */}
            {topThree[1] && (
               <div className="order-2 md:order-1 bg-scifi-card border border-scifi-border p-6 rounded-xl flex flex-col items-center relative hover:border-gray-400 transition-all">
                <div className="absolute -top-4 w-8 h-8 rounded-full bg-gray-700 border-2 border-gray-500 flex items-center justify-center text-white font-bold text-sm">2</div>
                <img src={topThree[1].avatar} alt={topThree[1].name} className="w-20 h-20 rounded-full border-2 border-gray-500 mb-4 bg-gray-800" />
                <h3 className="text-lg font-bold text-white truncate w-full text-center">{topThree[1].name}</h3>
                <div className="text-neon-green font-mono font-bold mt-1">{topThree[1].points} pts</div>
                <div className="text-xs text-gray-500 mt-2">{topThree[1].reviews.length} Reviews</div>
              </div>
            )}
            
            {/* 1st Place */}
             {topThree[0] && (
               <div className="order-1 md:order-2 bg-gradient-to-b from-scifi-card to-black border border-yellow-500/50 p-8 rounded-xl flex flex-col items-center relative shadow-[0_0_30px_rgba(234,179,8,0.1)] transform md:-translate-y-4">
                <div className="absolute -top-5 w-10 h-10 rounded-full bg-yellow-500 border-2 border-yellow-300 flex items-center justify-center text-black font-bold">1</div>
                <Crown className="w-8 h-8 text-yellow-400 absolute top-4 right-4 opacity-50" />
                <img src={topThree[0].avatar} alt={topThree[0].name} className="w-24 h-24 rounded-full border-4 border-yellow-500 mb-4 bg-gray-800" />
                <h3 className="text-xl font-bold text-white truncate w-full text-center">{topThree[0].name}</h3>
                <div className="text-yellow-400 font-mono font-bold mt-1 text-lg">{topThree[0].points} pts</div>
                <div className="text-sm text-gray-500 mt-2">{topThree[0].reviews.length} Reviews • {topThree[0].reputationScore}% Rep</div>
              </div>
            )}

            {/* 3rd Place */}
            {topThree[2] && (
               <div className="order-3 bg-scifi-card border border-scifi-border p-6 rounded-xl flex flex-col items-center relative hover:border-amber-700 transition-all">
                <div className="absolute -top-4 w-8 h-8 rounded-full bg-amber-900 border-2 border-amber-700 flex items-center justify-center text-white font-bold text-sm">3</div>
                <img src={topThree[2].avatar} alt={topThree[2].name} className="w-20 h-20 rounded-full border-2 border-amber-700 mb-4 bg-gray-800" />
                <h3 className="text-lg font-bold text-white truncate w-full text-center">{topThree[2].name}</h3>
                <div className="text-neon-green font-mono font-bold mt-1">{topThree[2].points} pts</div>
                 <div className="text-xs text-gray-500 mt-2">{topThree[2].reviews.length} Reviews</div>
              </div>
            )}
          </div>

          {/* List for rest */}
          <div className="bg-scifi-card border border-scifi-border rounded-xl overflow-hidden">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-scifi-border bg-black/40 text-xs uppercase tracking-wider text-gray-500">
                  <th className="p-4 font-medium text-center w-16">Rank</th>
                  <th className="p-4 font-medium">Reviewer</th>
                  <th className="p-4 font-medium text-right">Reputation</th>
                  <th className="p-4 font-medium text-right">Reviews</th>
                  <th className="p-4 font-medium text-right">Points</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-scifi-border">
                {restUsers.map((user, index) => (
                  <tr key={user.id} className="hover:bg-white/5 transition-colors">
                    <td className="p-4 text-center">
                      <div className="font-mono text-gray-500">#{index + 4}</div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <img src={user.avatar} alt="" className="w-8 h-8 rounded-full bg-gray-800" />
                        <span className="font-medium text-gray-200">{user.name}</span>
                        {user.id === 'u1' && <span className="text-xs bg-neon-green/10 text-neon-green px-1.5 py-0.5 rounded border border-neon-green/20">YOU</span>}
                      </div>
                    </td>
                    <td className="p-4 text-right font-mono text-gray-400">{user.reputationScore}%</td>
                    <td className="p-4 text-right font-mono text-gray-400">{user.reviews.length}</td>
                    <td className="p-4 text-right font-mono font-bold text-neon-green">{user.points}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};