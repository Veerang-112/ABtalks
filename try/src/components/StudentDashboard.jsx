import React, { useState } from 'react';

export const StudentDashboard = ({
  stats,
  challenges,
  onStartTask,
  onGoToTask,
}) => {
  const [selectedSprint, setSelectedSprint] = useState('Current Sprint');

  // Find today's challenge (first pending one, or default to Day 13)
  const currentChallenge = challenges.find(c => c.status === 'pending') || 
                           challenges.find(c => c.day === 13) || 
                           challenges[0];

  // Filter history challenges (completed or missed)
  const historyChallenges = challenges.filter(c => c.status === 'completed' || c.status === 'missed');

  // Calculate progress percent based on 60 days
  const progressPercent = stats ? Math.round((stats.tasks_done / 60) * 100) : 20;

  return (
    <div className="bg-background text-on-background min-h-screen pb-[90px] md:pb-12 pt-[72px] selection:bg-primary selection:text-on-primary">
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

      <main className="max-w-7xl mx-auto px-container-margin md:px-gutter mt-gutter grid grid-cols-4 md:grid-cols-12 gap-gutter pb-safe">
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
              <div className="glass-card rounded-xl p-6 flex flex-col justify-between shadow-[0px_4px_20px_rgba(0,0,0,0.05)] relative overflow-hidden group h-full md:min-h-[320px]">
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                <div>
                  <div className="flex justify-between items-start mb-4">
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
                  <p className="font-body-md text-body-md text-on-surface-variant mb-6 max-w-lg">
                    {currentChallenge.description}
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 mt-auto">
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
              
              <div className="flex gap-4 overflow-x-auto pb-2 hide-scrollbar snap-x">
                {historyChallenges.map((chal) => (
                  <div key={chal.day} className="min-w-[240px] md:min-w-[280px] bg-surface-container-low border border-outline-variant rounded-lg p-4 snap-start shrink-0 flex flex-col">
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
                          <span className="material-symbols-outlined text-[12px]">close</span>Missed
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
            <div className="grid grid-cols-2 gap-gutter h-auto">
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
            </div>

            {/* Challenge Calendar Sidebar */}
            <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm flex-grow flex flex-col">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-body-md text-body-md font-semibold text-on-background">
                  Challenge Calendar
                </h3>
                <select
                  value={selectedSprint}
                  onChange={(e) => setSelectedSprint(e.target.value)}
                  className="bg-surface-container text-on-surface text-sm rounded border-none py-1 pl-2 pr-6 cursor-pointer"
                >
                  <option>Current Sprint</option>
                  <option>Last Sprint</option>
                </select>
              </div>
              <div className="grid grid-cols-7 gap-2 mb-2 text-center">
                <span className="font-label-caps text-[10px] text-on-surface-variant">M</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">T</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">W</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">T</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">F</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">S</span>
                <span className="font-label-caps text-[10px] text-on-surface-variant">S</span>
              </div>
              <div className="grid grid-cols-7 gap-2 flex-grow auto-rows-max">
                {challenges.slice(0, 21).map((chal) => {
                  let classes = "aspect-square rounded flex items-center justify-center transition-all duration-200 ";
                  let titleText = `Day ${chal.day}: ${chal.title} (${chal.status.toUpperCase()})`;
                  let icon = null;

                  if (chal.status === 'completed') {
                    classes += "bg-tertiary-fixed text-on-tertiary-fixed shadow-sm border border-tertiary-fixed-dim hover:scale-105 cursor-pointer";
                    icon = <span className="material-symbols-outlined text-[14px]">check</span>;
                  } else if (chal.status === 'missed') {
                    classes += "bg-error-container text-on-error-container border border-error/20 hover:scale-105 cursor-pointer";
                    icon = <span className="material-symbols-outlined text-[14px]">close</span>;
                  } else if (chal.status === 'pending') {
                    classes += "bg-secondary-container text-on-secondary shadow-[0px_0px_12px_rgba(253,118,26,0.5)] border-2 border-secondary animate-pulse hover:scale-105 cursor-pointer";
                    icon = <span className="material-symbols-outlined text-[14px]">pending</span>;
                  } else {
                    classes += "bg-surface-container border border-outline-variant/30";
                  }

                  return (
                    <div
                      key={chal.day}
                      className={classes}
                      title={titleText}
                      onClick={() => chal.status !== 'upcoming' && onStartTask(chal.day)}
                    >
                      {icon}
                    </div>
                  );
                })}
              </div>
              <div className="flex justify-between items-center mt-4 pt-4 border-t border-outline-variant/50 text-[10px] font-label-caps text-on-surface-variant">
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded bg-tertiary-fixed"></div>Done
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded bg-error-container"></div>Missed
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 rounded bg-secondary-container animate-pulse"></div>Today
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
