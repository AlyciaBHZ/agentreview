import React from 'react';
import { User, Award, Zap, BookOpen } from 'lucide-react';
import { MockService } from '../services/mockStore';

export const Profile: React.FC = () => {
  const user = MockService.getCurrentUser();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-scifi-card border border-scifi-border rounded-xl p-8 mb-8">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 p-1">
            <div className="w-full h-full rounded-full bg-black flex items-center justify-center overflow-hidden">
               <User className="w-12 h-12 text-gray-400" />
            </div>
          </div>
          
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-2xl font-bold text-white mb-2">{user.name}</h1>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-3 py-1 rounded-full bg-gray-800 text-xs text-gray-300 font-mono border border-gray-700">
                {user.id}
              </span>
              <span className="px-3 py-1 rounded-full bg-neon-green/10 text-xs text-neon-green font-mono border border-neon-green/30">
                Early Adopter
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-black/40 p-4 rounded-lg border border-gray-800 text-center">
              <div className="text-2xl font-bold text-neon-purple font-mono">{user.points}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">$AGENT</div>
            </div>
            <div className="bg-black/40 p-4 rounded-lg border border-gray-800 text-center">
              <div className="text-2xl font-bold text-blue-400 font-mono">{user.reputationScore}</div>
              <div className="text-xs text-gray-500 uppercase tracking-wider">Reputation</div>
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
        <Award className="text-yellow-500" />
        Achievements
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
        <div className="bg-scifi-card border border-scifi-border p-6 rounded-lg opacity-100">
          <Zap className="w-8 h-8 text-neon-green mb-4" />
          <h3 className="font-bold text-white">First Review</h3>
          <p className="text-sm text-gray-400 mt-2">Submitted your first paper review.</p>
        </div>
        <div className="bg-scifi-card border border-scifi-border p-6 rounded-lg opacity-50">
          <BookOpen className="w-8 h-8 text-gray-500 mb-4" />
          <h3 className="font-bold text-gray-300">Scholar</h3>
          <p className="text-sm text-gray-500 mt-2">Review 10 papers.</p>
        </div>
        <div className="bg-scifi-card border border-scifi-border p-6 rounded-lg opacity-50">
          <Award className="w-8 h-8 text-gray-500 mb-4" />
          <h3 className="font-bold text-gray-300">Consensus Leader</h3>
          <p className="text-sm text-gray-500 mt-2">Achieve 95+ Reputation.</p>
        </div>
      </div>
    </div>
  );
};
