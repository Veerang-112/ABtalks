import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { LandingPage } from './components/LandingPage.jsx';
import { StudentDashboard } from './components/StudentDashboard.jsx';
import { ChallengeDay12 } from './components/ChallengeDay12.jsx';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('landing');
  const [transitionDir, setTransitionDir] = useState('push');
  
  // Dynamic API state
  const [stats, setStats] = useState(null);
  const [challenges, setChallenges] = useState([]);
  const [selectedChallengeDay, setSelectedChallengeDay] = useState(13);

  // Fetch initial API data on mount
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const statsRes = await fetch('/api/status');
      if (statsRes.ok) {
        const statsData = await statsRes.json();
        setStats(statsData);
      }
      
      const chalRes = await fetch('/api/challenges');
      if (chalRes.ok) {
        const chalData = await chalRes.json();
        setChallenges(chalData);
      }
    } catch (err) {
      console.error('Error fetching data from API server:', err);
    }
  };

  const navigateTo = (screen, direction = 'push') => {
    setTransitionDir(direction);
    setCurrentScreen(screen);
  };

  const handleStartTask = (day) => {
    setSelectedChallengeDay(day);
    navigateTo('challenge-day-12', 'push');
  };

  const handleGoToTask = (day) => {
    // If day is passed, set it, otherwise open today's challenge
    if (day) {
      setSelectedChallengeDay(day);
    } else {
      const pendingChal = challenges.find(c => c.status === 'pending') || { day: 13 };
      setSelectedChallengeDay(pendingChal.day);
    }
    navigateTo('challenge-day-12', 'none');
  };

  const handleChallengeSubmitted = (newStats) => {
    // Update stats directly from the submission response and refetch challenges
    setStats(newStats);
    fetchData();
  };

  const getVariants = () => {
    if (transitionDir === 'none') {
      return {
        initial: { opacity: 1, x: 0 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 1, x: 0 },
      };
    }
    if (transitionDir === 'push') {
      return {
        initial: { opacity: 0, x: '100%' },
        animate: { opacity: 1, x: '0%' },
        exit: { opacity: 0, x: '-20%' },
      };
    }
    // push_back
    return {
      initial: { opacity: 0, x: '-100%' },
      animate: { opacity: 1, x: '0%' },
      exit: { opacity: 0, x: '20%' },
    };
  };

  const variants = getVariants();
  const activeChallenge = challenges.find(c => c.day === selectedChallengeDay);

  return (
    <div className="relative min-h-screen overflow-x-hidden bg-background">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={currentScreen}
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={{ duration: transitionDir === 'none' ? 0 : 0.25, ease: 'easeInOut' }}
          className="w-full min-h-screen"
        >
          {currentScreen === 'landing' && (
            <LandingPage
              onStartChallenge={() => navigateTo('dashboard', 'push')}
              onCommitDay1={() => navigateTo('dashboard', 'push')}
            />
          )}

          {currentScreen === 'dashboard' && (
            <StudentDashboard
              stats={stats}
              challenges={challenges}
              onStartTask={handleStartTask}
              onGoToTask={handleGoToTask}
            />
          )}

          {currentScreen === 'challenge-day-12' && (
            <ChallengeDay12
              challenge={activeChallenge}
              onGoToDashboard={() => navigateTo('dashboard', 'none')}
              onSubmitChallenge={handleChallengeSubmitted}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
