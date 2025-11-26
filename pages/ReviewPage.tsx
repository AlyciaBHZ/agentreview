import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Star, ArrowLeft, Bot, Sparkles, Send } from 'lucide-react';
import { MockService } from '../services/mockStore';
import { GeminiService } from '../services/geminiService';
import { Paper, Review } from '../types';

export const ReviewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [paper, setPaper] = React.useState<Paper | null>(null);
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [loading, setLoading] = React.useState(true);
  const [rating, setRating] = React.useState(0);
  const [comment, setComment] = React.useState('');
  const [submitting, setSubmitting] = React.useState(false);
  const [submitted, setSubmitted] = React.useState(false);
  
  // AI Analysis State
  const [aiAnalysis, setAiAnalysis] = React.useState('');
  const [analyzing, setAnalyzing] = React.useState(false);

  React.useEffect(() => {
    if (id) {
      MockService.getPaperById(id).then(p => {
        setPaper(p || null);
        setLoading(false);
      });
      MockService.getReviewsByPaperId(id).then(setReviews);
    }
  }, [id]);

  const handleAnalyze = async () => {
    if (!paper) return;
    setAnalyzing(true);
    const result = await GeminiService.analyzePaper(paper);
    setAiAnalysis(result);
    setAnalyzing(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!paper || !comment || rating === 0) return;

    setSubmitting(true);
    const newReview = await MockService.submitReview({
      paperId: paper.id,
      userId: 'current-user',
      userName: 'DeSci_Researcher',
      score: rating,
      comment
    });

    setReviews([newReview, ...reviews]);
    setSubmitting(false);
    setSubmitted(true);
    setComment('');
    setRating(0);
    
    // Reset success message after 3s
    setTimeout(() => setSubmitted(false), 3000);
  };

  if (loading) return <div className="p-12 text-center text-gray-500 font-mono animate-pulse">Loading neural data...</div>;
  if (!paper) return <div className="p-12 text-center text-red-500">Paper not found in decentralized index.</div>;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/papers" className="inline-flex items-center text-sm text-gray-400 hover:text-neon-green mb-8">
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Papers
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column: Paper Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-scifi-card border border-scifi-border p-8 rounded-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
               <Bot size={120} />
             </div>
            <h1 className="text-3xl font-bold text-white mb-4 leading-tight">{paper.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-gray-400 mb-6 font-mono">
              <span className="text-neon-blue">{paper.category}</span>
              <span>•</span>
              <span>{paper.publishedDate}</span>
              <span>•</span>
              <a href={paper.hfUrl || "#"} target="_blank" rel="noreferrer" className="text-neon-green hover:underline">
                View on Hugging Face
              </a>
            </div>
            
            <div className="prose prose-invert max-w-none">
              <h3 className="text-lg font-bold text-white mb-2">Abstract</h3>
              <p className="text-gray-300 leading-relaxed">{paper.abstract}</p>
            </div>

            {/* AI Analysis Section */}
            <div className="mt-8 pt-6 border-t border-dashed border-gray-700">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-neon-purple flex items-center gap-2">
                  <Sparkles className="w-5 h-5" />
                  Gemini Agent Analysis
                </h3>
                {!aiAnalysis && (
                  <button 
                    onClick={handleAnalyze}
                    disabled={analyzing}
                    className="px-4 py-1.5 bg-neon-purple/20 text-neon-purple border border-neon-purple/50 rounded-full text-sm hover:bg-neon-purple/30 transition-all disabled:opacity-50"
                  >
                    {analyzing ? 'Processing...' : 'Generate Analysis'}
                  </button>
                )}
              </div>
              
              {aiAnalysis && (
                <div className="bg-black/40 rounded-lg p-4 font-mono text-sm text-gray-300 border-l-2 border-neon-purple animate-fade-in whitespace-pre-line">
                  {aiAnalysis}
                </div>
              )}
            </div>
          </div>

          {/* Reviews List */}
          <div>
            <h3 className="text-xl font-bold text-white mb-6">Community Consensus ({reviews.length})</h3>
            <div className="space-y-4">
              {reviews.map(review => (
                <div key={review.id} className="bg-scifi-card border border-scifi-border p-6 rounded-lg">
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold">
                        {review.userName.charAt(0)}
                      </div>
                      <span className="font-medium text-white text-sm">{review.userName}</span>
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{new Date(review.timestamp).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center gap-1 text-neon-green mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className={`w-3 h-3 ${i < review.score ? 'fill-current' : 'text-gray-700'}`} />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Review Form */}
        <div className="lg:col-span-1">
          <div className="sticky top-24">
            <div className="bg-scifi-card border border-scifi-border rounded-xl p-6 shadow-xl">
              <h3 className="text-lg font-bold text-white mb-4">Submit Review</h3>
              
              {submitted ? (
                <div className="text-center py-8 animate-pulse">
                  <div className="w-16 h-16 bg-neon-green/20 text-neon-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <Sparkles className="w-8 h-8" />
                  </div>
                  <h4 className="text-xl font-bold text-white mb-2">Review Recorded</h4>
                  <p className="text-neon-green">+10 $AGENT Points</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Rating</label>
                    <div className="flex gap-2">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setRating(s)}
                          className={`w-8 h-8 rounded flex items-center justify-center transition-all ${
                            rating >= s ? 'bg-neon-green text-black font-bold' : 'bg-gray-800 text-gray-500 hover:bg-gray-700'
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Analysis</label>
                    <textarea
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      rows={6}
                      className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 text-sm text-white focus:border-neon-green outline-none resize-none"
                      placeholder="Share your critique on methodology, agentic capabilities, or novelty..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting || rating === 0}
                    className="w-full bg-white text-black font-bold py-3 rounded-lg hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {submitting ? 'Encrypting...' : 'Submit Review'}
                    <Send className="w-4 h-4" />
                  </button>
                  
                  <p className="mt-4 text-xs text-center text-gray-500">
                    By submitting, you agree to the DeSci Community Consensus Protocol.
                  </p>
                </form>
              )}
            </div>
            
            <div className="mt-6 p-4 rounded-lg bg-neon-blue/5 border border-neon-blue/20">
              <h4 className="text-sm font-bold text-neon-blue mb-1">Incentive Mechanism</h4>
              <p className="text-xs text-gray-400">
                Quality reviews are eligible for the $AGENT Airdrop. Reputation score boosts your weight in the network.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
