import React, { useState, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import { LandingPage } from './components/LandingPage.jsx';
import { StudentDashboard } from './components/StudentDashboard.jsx';
import { ChallengeDay12 } from './components/ChallengeDay12.jsx';

function ChallengeDayRoute({ challenges, onSubmitChallenge }) {
  const { day } = useParams();
  const navigate = useNavigate();
  const challengeDay = Number(day);
  const challenge = challenges.find((item) => item.day === challengeDay);

  if (!challenge) {
    return <Navigate to="dashboard" replace />;
  }

  return (
    <ChallengeDay12
      challenge={challenge}
      onGoToDashboard={() => navigate('dashboard')}
      onSubmitChallenge={onSubmitChallenge}
    />
  );
}

function AppRoutes({ stats, challenges, onSubmitChallenge }) {
  const navigate = useNavigate();

  const handleStartTask = (day) => {
    navigate(`challenge/${day}`);
  };

  const handleGoToTask = (day) => {
    const nextChallenge = day
      ? challenges.find((c) => c.day === day)
      : challenges.find((c) => c.status === 'pending') || challenges[0];

    const targetDay = nextChallenge?.day || 1;
    navigate(`challenge/${targetDay}`);
  };

  return (
    <Routes>
      <Route
        path="/"
        element={
          <LandingPage
            onStartChallenge={() => navigate('dashboard')}
            onCommitDay1={() => navigate('dashboard')}
          />
        }
      />
      <Route
        path="dashboard"
        element={
          <StudentDashboard
            stats={stats}
            challenges={challenges}
            onStartTask={handleStartTask}
            onGoToTask={handleGoToTask}
          />
        }
      />
      <Route
        path="challenge/:day"
        element={
          <ChallengeDayRoute
            challenges={challenges}
            onSubmitChallenge={onSubmitChallenge}
          />
        }
      />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default function App() {
  const [stats, setStats] = useState(null);
  const [challenges, setChallenges] = useState([]);

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

  const handleChallengeSubmitted = (newStats) => {
    setStats(newStats);
    fetchData();
  };

  return (
    <HashRouter>
      <div className="relative min-h-screen overflow-x-hidden bg-background">
        <AppRoutes
          stats={stats}
          challenges={challenges}
          onSubmitChallenge={handleChallengeSubmitted}
        />
      </div>
    </HashRouter>
  );
}
