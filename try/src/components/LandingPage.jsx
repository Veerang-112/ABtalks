import React from 'react';

export const LandingPage = ({
  onStartChallenge,
  onCommitDay1,
}) => {
  return (
    <div className="bg-background text-on-background antialiased min-h-screen flex flex-col pt-[72px]">
      {/* Shared Component: TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface shadow-sm transition-all duration-200">
        <div className="flex justify-between items-center px-container-margin h-touch-target w-full border-b border-surface-container-low max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-primary font-bold">code</span>
            <span className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tighter">
              ABTalks
            </span>
          </div>
          <button
            aria-label="Notifications"
            className="w-touch-target h-touch-target flex items-center justify-center text-primary rounded-full hover:bg-surface-variant transition-colors active:scale-95 cursor-pointer"
          >
            <span className="material-symbols-outlined">notifications</span>
          </button>
        </div>
      </header>

      <main className="flex-grow pb-[90px]">
        {/* Hero Section */}
        <section className="px-container-margin py-8 md:py-16 text-center max-w-4xl mx-auto">
          <h1 className="font-display-lg-mobile text-display-lg-mobile md:font-display-lg md:text-display-lg text-on-surface mb-4">
            60 Days to a <span className="text-primary">Better Developer.</span>
          </h1>
          <p className="font-body-md text-body-md md:font-body-lg md:text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Build consistency, public streaks, and a portfolio that gets you hired. High-octane
            learning for those ready to commit.
          </p>
          <div className="relative rounded-xl overflow-hidden mb-8 shadow-sm group">
            <img
              alt="Student Coding"
              className="w-full h-64 md:h-[400px] object-cover transition-transform duration-700 group-hover:scale-105"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDubjM1SB0YVthaJM_lywUfJkSuDqYh1IHHT30aqk2sN-5qjITa2KpjsvNnu3WGorG8miIscTqZw4RTWVNKmExLeqlnhPz5LcFLb6cZzBoyGFWEGQFfEXM1yX5_LVbdMRshIRHx6UvlaHUXckSbAt9IaGmGB3k_z8ez85Bjozm4azP6wltkHZRoO2uEaG2TAz8m5CJiLlYOoRrCgHlFghqav91yHA2WAJy7xwOyA9oIEN3S7_utkebb"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/60 to-transparent"></div>
          </div>
          <button
            onClick={onStartChallenge}
            className="bg-primary text-on-primary font-headline-md text-headline-md-mobile px-8 py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 w-full md:w-auto h-touch-target flex items-center justify-center mx-auto gap-2 cursor-pointer"
          >
            Start the Challenge{' '}
            <span className="material-symbols-outlined">arrow_forward</span>
          </button>
        </section>

        {/* The 60-Day Promise */}
        <section className="bg-surface-container-low py-12 px-container-margin border-y border-surface-container">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <span className="font-label-caps text-label-caps text-secondary uppercase tracking-widest bg-secondary-fixed text-on-secondary-fixed px-3 py-1 rounded-full">
                The Blueprint
              </span>
              <h2 className="font-headline-md text-headline-md-mobile md:text-headline-md mt-4">
                The 60-Day Promise
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-surface rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container hover:shadow-[0px_8px_30px_rgba(37,99,235,0.15)] transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">construction</span>
                </div>
                <h3 className="font-headline-md text-headline-md-mobile mb-2">Build Daily</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Small, consistent commits build muscle memory. Write code every single day.
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container hover:shadow-[0px_8px_30px_rgba(37,99,235,0.15)] transition-shadow duration-300 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-secondary-container/20 rounded-bl-full -z-10"></div>
                <div className="w-12 h-12 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">local_fire_department</span>
                </div>
                <h3 className="font-headline-md text-headline-md-mobile mb-2">Commit Weekly</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Push substantial features and review peer code to elevate your standards.
                </p>
              </div>
              <div className="bg-surface rounded-xl p-6 shadow-[0px_4px_20px_rgba(0,0,0,0.05)] border border-surface-container hover:shadow-[0px_8px_30px_rgba(37,99,235,0.15)] transition-shadow duration-300">
                <div className="w-12 h-12 rounded-full bg-tertiary-container text-on-tertiary-container flex items-center justify-center mb-4">
                  <span className="material-symbols-outlined">visibility</span>
                </div>
                <h3 className="font-headline-md text-headline-md-mobile mb-2">Get Visible</h3>
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Build a public portfolio that acts as a beacon for top-tier recruiters.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Social Proof & Trust */}
        <section className="py-12 px-container-margin max-w-4xl mx-auto text-center">
          <div className="mb-12">
            <p className="font-headline-md text-headline-md-mobile text-on-surface mb-2">
              Join 5,000+ Indian students building the future.
            </p>
            <div className="flex justify-center -space-x-4 mt-6">
              <div className="w-12 h-12 rounded-full border-2 border-surface bg-surface-container-high flex items-center justify-center text-on-surface font-bold">
                A
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-surface bg-primary-container text-on-primary-container flex items-center justify-center font-bold">
                B
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-surface bg-secondary-container text-on-secondary-container flex items-center justify-center font-bold">
                C
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-surface bg-tertiary-container text-on-tertiary-container flex items-center justify-center font-bold">
                D
              </div>
              <div className="w-12 h-12 rounded-full border-2 border-surface bg-surface-variant text-on-surface-variant flex items-center justify-center font-bold">
                +5k
              </div>
            </div>
          </div>
          <div className="bg-surface-container rounded-xl p-8 flex flex-col md:flex-row items-center justify-center gap-6">
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-primary">verified</span>
              <span className="font-body-md text-body-md font-bold">Built for recruiters.</span>
            </div>
            <div className="hidden md:block w-px h-8 bg-outline-variant"></div>
            <div className="flex items-center gap-2 text-on-surface">
              <span className="material-symbols-outlined text-secondary">hub</span>
              <span className="font-body-md text-body-md font-bold">Verified by GitHub.</span>
            </div>
          </div>
        </section>

        {/* CTA Footer */}
        <section className="px-container-margin pb-12 pt-8 text-center">
          <button
            onClick={onCommitDay1}
            className="bg-secondary text-on-secondary font-headline-md text-headline-md-mobile px-8 py-4 rounded-xl shadow-lg hover:brightness-110 active:scale-95 transition-all duration-200 w-full md:w-auto h-touch-target flex items-center justify-center mx-auto gap-2 cursor-pointer"
          >
            Commit to Day 1
            <span className="material-symbols-outlined">rocket_launch</span>
          </button>
        </section>
      </main>
    </div>
  );
};
