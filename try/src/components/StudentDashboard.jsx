import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';

export const StudentDashboard = ({
  stats,
  challenges,
  onStartTask,
  onGoToTask,
}) => {
  const [selectedSprint, setSelectedSprint] = useState('Current Sprint');

  // Find the active challenge to show: pending first, then incomplete, then fallback
  const currentChallenge = challenges.find(c => c.status === 'pending') ||
                           challenges.find(c => c.status === 'incomplete') ||
                           challenges.find(c => c.day === 13) ||
                           challenges[0];

  // Filter history challenges (completed or incomplete) and show latest days first
  const historyChallenges = challenges
    .filter(c => c.status === 'completed' || c.status === 'incomplete')
    .sort((a, b) => b.day - a.day);

  const todayChallenge = currentChallenge;
  const todayDay = todayChallenge?.day;

  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const calendarDay = currentDate.getDate();
  const monthName = currentDate.toLocaleString('default', { month: 'long' });
  const firstWeekdayIndex = new Date(currentYear, currentMonth, 1).getDay();
  const firstWeekdayOffset = (firstWeekdayIndex + 6) % 7;
  const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

  const calendarCells = useMemo(() => {
    const cells = [];
    for (let i = 0; i < firstWeekdayOffset + daysInMonth; i += 1) {
      if (i < firstWeekdayOffset) {
        cells.push({ date: null, challenge: null });
      } else {
        const date = i - firstWeekdayOffset + 1;
        const challenge = challenges.find(c => c.day === date);
        cells.push({ date, challenge });
      }
    }
    return cells;
  }, [challenges, daysInMonth, firstWeekdayOffset]);

  const progressPercent = stats ? Math.round((stats.tasks_done / 60) * 100) : 20;

  return (
    <div className="bg-background text-on-background min-h-screen pb-[150px] md:pb-[120px] pt-[72px] selection:bg-primary selection:text-on-primary">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface shadow-sm border-b border-surface-container-low">
        <div className="flex justify-between items-center px-container-margin h-touch-target w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary font-bold">code</span>
            <span className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tighter">
              ABTalks
            </span>
          </div>
          <button
            aria-label="Notifications"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-all duration-200 active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined text-primary" data-icon="notifications">
              notifications
            </span>
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-container-margin md:px-gutter mt-gutter grid grid-cols-4 md:grid-cols-12 gap-gutter pb-[120px] pb-safe">
        {/* Welcome Section */}
        <section className="col-span-4 md:col-span-12 flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4 mt-4">
          <div>
            <p className="font-body-md text-body-md text-on-surface-variant mb-1">
              Welcome back, Developer
            </p>
            <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-background">
              {stats?.streak || 0} Day Streak! 🔥
            </h1>
          </div>
          <div className="bg-surface-container-high px-4 py-2 rounded-full inline-flex items-center gap-2 self-start md:self-auto border border-outline-variant shadow-sm">
            <span
              className="material-symbols-outlined text-secondary-container text-sm"
              data-icon="local_fire_department"
            >
              local_fire_department
            </span>
            <span className="font-label-caps text-label-caps text-on-surface">Top 5% this week</span>
          </div>
        </section>

        {/* Bento Grid Layout */}
        <div className="col-span-4 md:col-span-12 grid grid-cols-4 md:grid-cols-12 gap-gutter">
          {/* Left Column: Main Task + Challenge Scroller */}
          <div className="col-span-4 md:col-span-8 flex flex-col gap-gutter">
            {/* Today's Task (Main Feature) */}
            {currentChallenge && (
              <div className="glass-card rounded-xl p-5 flex flex-col justify-between shadow-[0px_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden group md:min-h-[240px]">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="font-label-caps text-label-caps text-primary bg-primary-fixed px-3 py-1 rounded-full">
                      DAY {currentChallenge.day} - TODAY'S CHALLENGE
                    </span>
                    <div className="flex items-center gap-1 text-secondary-container">
                      <span className="material-symbols-outlined text-sm" data-icon="bolt">
                        bolt
                      </span>
                      <span className="font-label-caps text-label-caps">{currentChallenge.xp} XP</span>
                    </div>
                  </div>
                  <h2 className="font-headline-md text-headline-md-mobile md:font-headline-md md:text-headline-md text-on-background mb-2">
                    {currentChallenge.title}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mb-4 max-w-lg">
                    {currentChallenge.description}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                  <button
                    onClick={() => onStartTask(currentChallenge.day)}
                    className="bg-secondary-container hover:brightness-110 text-on-secondary font-label-caps text-label-caps px-6 h-touch-target rounded-lg flex-1 sm:flex-none flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 shadow-[0px_4px_12px_rgba(253,118,26,0.3)] cursor-pointer"
                  >
                    <span className="material-symbols-outlined text-lg" data-icon="play_arrow">
                      play_arrow
                    </span>
                    START TASK
                  </button>
                  <button 
                    onClick={() => onStartTask(currentChallenge.day)}
                    className="bg-surface-container border border-outline-variant hover:bg-surface-variant text-on-surface font-label-caps text-label-caps px-6 h-touch-target rounded-lg flex-1 sm:flex-none flex items-center justify-center transition-all duration-200 cursor-pointer"
                  >
                    VIEW RESOURCES
                  </button>
                </div>
              </div>
            )}

            {/* Challenge History Scroller */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-body-md text-body-md font-semibold text-on-background">
                  Challenge History
                </h3>
                <div className="flex gap-2">
                  <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-sm">chevron_left</span>
                  </button>
                  <button className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center text-on-surface hover:bg-surface-variant transition-colors cursor-pointer">
                    <span className="material-symbols-outlined text-sm">chevron_right</span>
                  </button>
                </div>
              </div>
              
              <div className="flex flex-col gap-4 overflow-y-auto max-h-[460px] pr-2 hide-scrollbar">
                {historyChallenges.map((chal) => (
                  <div key={chal.day} className="w-full bg-surface-container-low border border-outline-variant rounded-lg p-4 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                      <span className="font-label-caps text-label-caps text-on-surface-variant">
                        Day {chal.day}
                      </span>
                      {chal.status === 'completed' ? (
                        <span className="bg-tertiary-container/20 text-tertiary font-label-caps text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">check</span>Completed
                        </span>
                      ) : (
                        <span className="bg-error-container text-error font-label-caps text-[10px] px-2 py-0.5 rounded-full flex items-center gap-1">
                          <span className="material-symbols-outlined text-[12px]">close</span>Incomplete
                        </span>
                      )}
                    </div>
                    <h4 className="font-body-md font-semibold text-on-background mb-1 line-clamp-1">
                      {chal.title}
                    </h4>
                    <p className="text-sm text-on-surface-variant line-clamp-2 mb-3 flex-grow">
                      {chal.description}
                    </p>
                    <button
                      onClick={() => onStartTask(chal.day)}
                      className="text-primary font-label-caps text-label-caps text-left hover:underline self-start cursor-pointer"
                    >
                      {chal.status === 'completed' ? 'Review Code' : 'Try Again'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Progress & Stats & Calendar */}
          <div className="col-span-4 md:col-span-4 flex flex-col gap-gutter">
            {/* Overall Progress */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex flex-col justify-center h-auto">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-body-md text-body-md font-semibold text-on-background">
                  Sprint Progress
                </h3>
                <span className="font-label-caps text-label-caps text-primary">{progressPercent}%</span>
              </div>
              <div className="w-full bg-surface-container h-3 rounded-full overflow-hidden mb-2">
                <div 
                  className="progress-bar-gradient h-full rounded-full transition-all duration-500 shadow-[0px_0px_10px_rgba(0,74,198,0.5)]"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <p className="font-label-caps text-label-caps text-on-surface-variant text-right">
                Day {stats?.tasks_done || 0} / 60
              </p>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-gutter h-auto">
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-center shadow-sm">
                <span className="material-symbols-outlined text-primary mb-2" data-icon="commit">
                  commit
                </span>
                <span className="font-display-lg-mobile text-display-lg-mobile text-on-background block leading-none mb-1">
                  {stats?.total_commits || 0}
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  Total Commits
                </span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-center shadow-sm">
                <span className="material-symbols-outlined text-tertiary mb-2" data-icon="task_alt">
                  task_alt
                </span>
                <span className="font-display-lg-mobile text-display-lg-mobile text-on-background block leading-none mb-1">
                  {stats?.tasks_done || 0}
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  Tasks Done
                </span>
              </div>
              <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-4 flex flex-col justify-center shadow-sm">
                <span className="material-symbols-outlined text-secondary-container mb-2" data-icon="auto_graph">
                  auto_graph
                </span>
                <span className="font-display-lg-mobile text-display-lg-mobile text-on-background block leading-none mb-1">
                  {stats?.streak || 0}
                </span>
                <span className="font-label-caps text-label-caps text-on-surface-variant">
                  Current Streak
                </span>
              </div>
            </div>

            {/* Challenge Calendar Sidebar */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-3xl p-6 shadow-sm flex-grow flex flex-col">
              <div className="flex flex-col gap-3 mb-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-body-md text-body-md font-semibold text-on-background">
                      Challenge Calendar
                    </h3>
                    <p className="text-sm text-on-surface-variant">
                      Sprint 1 — next 21 days
                    </p>
                  </div>
                  <button
                    onClick={() => onGoToTask(todayDay)}
                    className="rounded-full bg-primary px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-on-primary shadow-sm hover:bg-primary-focus transition-colors"
                  >
                    Today
                  </button>
                </div>
                <div className="rounded-3xl border border-surface-container bg-surface p-3">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <p className="text-sm font-semibold text-on-surface">{monthName}</p>
                      <p className="text-xs text-on-surface-variant">{currentYear}</p>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-[10px] uppercase tracking-[0.2em] font-semibold text-on-surface-variant">
                      <span className="text-center leading-none">Mon</span>
                      <span className="text-center leading-none">Tue</span>
                      <span className="text-center leading-none">Wed</span>
                      <span className="text-center leading-none">Thu</span>
                      <span className="text-center leading-none">Fri</span>
                      <span className="text-center leading-none">Sat</span>
                      <span className="text-center leading-none">Sun</span>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {calendarCells.map(({ date, challenge }, index) => {
                      const status = challenge?.status;
                      const isToday = date === calendarDay;
                      const isCompleted = status === 'completed';
                      const isPending = status === 'pending';
                      const isIncomplete = status === 'incomplete';
                      const tileStyles = date
                        ? challenge
                          ? isCompleted
                            ? 'bg-tertiary-fixed text-on-tertiary-fixed border-tertiary-fixed'
                            : isPending
                            ? 'bg-secondary-container text-on-secondary border-secondary'
                            : isIncomplete
                            ? 'bg-error-container text-on-error-container border-error/20'
                            : 'bg-surface-container text-on-surface-variant border-surface-container'
                          : 'bg-surface-container text-on-surface-variant border-surface-container'
                        : 'bg-transparent border-transparent';

                      const label = date ? `${date}` : '';
                      const caption = date
                        ? challenge
                          ? isCompleted
                            ? 'Done'
                            : isPending
                            ? isToday
                              ? 'Today'
                              : 'Pending'
                            : isIncomplete
                            ? 'Incomplete'
                            : 'Upcoming'
                          : 'No task'
                        : '';

                      return date ? (
                        challenge ? (
                          <Link
                            key={`${date}-${index}`}
                            to={`/challenge/${date}`}
                            className={`aspect-square rounded-2xl border p-3 text-[11px] font-semibold transition-all duration-200 ${tileStyles} ${
                              isPending && isToday ? 'ring-2 ring-primary/40 shadow-lg' : 'hover:-translate-y-0.5 hover:shadow-md'
                            }`}
                            title={`Day ${date}: ${challenge?.title || 'No task'}`}
                          >
                            <div className="flex h-full flex-col items-center justify-center gap-1 text-center leading-none">
                              <span className="text-[10px] uppercase tracking-[0.18em] opacity-90">
                                {caption}
                              </span>
                              <span className="text-base font-bold leading-none">{label}</span>
                            </div>
                          </Link>
                        ) : (
                          <div
                            key={`${date}-${index}`}
                            className={`aspect-square rounded-2xl border p-3 text-[11px] font-semibold transition-all duration-200 ${tileStyles}`}
                            title={`Day ${date}: No task`}
                          >
                            <div className="flex h-full flex-col items-center justify-center gap-1 text-center leading-none">
                              <span className="text-[10px] uppercase tracking-[0.18em] opacity-90">
                                {caption}
                              </span>
                              <span className="text-base font-bold leading-none">{label}</span>
                            </div>
                          </div>
                        )
                      ) : (
                        <div
                          key={`empty-${index}`}
                          className="aspect-square rounded-2xl border border-transparent bg-transparent"
                        />
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-[10px] uppercase tracking-[0.24em] text-on-surface-variant">
                <div className="inline-flex items-center gap-2 rounded-full bg-tertiary-fixed/10 px-3 py-2 text-tertiary-fixed">
                  <span className="w-2 h-2 rounded-full bg-tertiary-fixed" />
                  Done
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-error-container/10 px-3 py-2 text-error-container">
                  <span className="w-2 h-2 rounded-full bg-error-container" />
                  Incomplete
                </div>
                <div className="inline-flex items-center gap-2 rounded-full bg-secondary-container/10 px-3 py-2 text-secondary-container">
                  <span className="w-2 h-2 rounded-full bg-secondary-container" />
                  Pending
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Navigation shell */}
      <nav className="fixed bottom-0 left-0 w-full flex justify-around items-center h-[72px] px-base pb-safe bg-surface shadow-[0px_-4px_20px_rgba(0,0,0,0.05)] rounded-t-xl z-50 bg-surface-container">
        {/* Active: Dashboard */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center bg-primary-container text-on-primary-container rounded-full px-6 py-2 transition-transform duration-300 active:scale-90"
        >
          <span className="material-symbols-outlined mb-1" data-icon="dashboard">
            dashboard
          </span>
          <span className="font-label-caps text-label-caps">Dashboard</span>
        </a>
        {/* Inactive: Tasks (Navigates to Challenge Day 12/13 per spec: //nav//span[@data-icon='assignment']/parent::a) */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onGoToTask();
          }}
          className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:text-primary transition-colors transition-transform duration-300 active:scale-90 cursor-pointer"
        >
          <span className="material-symbols-outlined mb-1" data-icon="assignment">
            assignment
          </span>
          <span className="font-label-caps text-label-caps">Tasks</span>
        </a>
        {/* Inactive: Profile */}
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className="flex flex-col items-center justify-center text-on-surface-variant px-6 py-2 hover:text-primary transition-colors transition-transform duration-300 active:scale-90"
        >
          <span className="material-symbols-outlined mb-1" data-icon="person">
            person
          </span>
          <span className="font-label-caps text-label-caps">Profile</span>
        </a>
      </nav>
    </div>
  );
};