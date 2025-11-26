import React from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Globe } from 'lucide-react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { PaperList } from './pages/PaperList';
import { ReviewPage } from './pages/ReviewPage';
import { Profile } from './pages/Profile';
import { Leaderboard } from './pages/Leaderboard';
import { MockService } from './services/mockStore';
import { Language } from './types';

function App() {
  const [lang, setLang] = React.useState<Language>(Language.EN);
  const [userPoints, setUserPoints] = React.useState(0);

  // Poll for points update (simulating real-time subscription)
  React.useEffect(() => {
    const interval = setInterval(() => {
      setUserPoints(MockService.getCurrentUser().points);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const toggleLang = () => {
    setLang(prev => prev === Language.EN ? Language.CN : Language.EN);
  };

  return (
    <Router>
      <Layout lang={lang} toggleLang={toggleLang} userPoints={userPoints}>
        <Routes>
          <Route path="/" element={<Home lang={lang} />} />
          <Route path="/papers" element={<PaperList lang={lang} />} />
          <Route path="/review/:id" element={<ReviewPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard lang={lang} />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;