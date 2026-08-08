import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const ChallengeDay12 = ({
  challenge,
  onSubmitChallenge,
}) => {
  const navigate = useNavigate();

  const goBack = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/dashboard');
    }
  };
  const [githubRepo, setGithubRepo] = useState('');
  const [linkedInPost, setLinkedInPost] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [earnedXp, setEarnedXp] = useState(0);

  const currentDate = new Date();
  const isToday = challenge?.day === currentDate.getDate();
  const isCompleted = challenge?.status === 'completed';
  const isBlocked = challenge?.status === 'incomplete';

  // Set initial submission fields based on previous structured submission or starter template
  useEffect(() => {
    if (challenge) {
      if (challenge.submitted_code) {
        try {
          const parsed = JSON.parse(challenge.submitted_code);
          setGithubRepo(parsed.githubRepo || '');
          setLinkedInPost(parsed.linkedinPost || '');
        } catch (err) {
          setGithubRepo('');
          setLinkedInPost('');
        }
      } else {
        setGithubRepo('');
        setLinkedInPost('');
      }
    }
  }, [challenge]);

  if (!challenge) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background text-on-background">
        <div className="text-center">
          <p className="text-lg">No challenge selected.</p>
          <button
            onClick={onGoToDashboard}
            className="mt-4 bg-primary text-on-primary px-4 py-2 rounded-lg cursor-pointer"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleSubmit = async () => {
    const githubValue = githubRepo.trim();
    const linkedInValue = linkedInPost.trim();
    const githubValid = /^https:\/\/github\.com\/[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+\/?$/i.test(githubValue);
    const linkedInValid = !linkedInValue || /^https:\/\/www\.linkedin\.com\/.+/i.test(linkedInValue);

    if (!githubValue) {
      alert('GitHub repository URL is required.');
      return;
    }

    if (!githubValid) {
      alert('Please enter a complete GitHub repository URL in the form https://github.com/username/repo.');
      return;
    }

    if (!linkedInValid) {
      alert('If provided, the LinkedIn post link must start with https://www.linkedin.com/.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          day: challenge.day,
          code: JSON.stringify({ githubRepo, linkedInPost }),
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setEarnedXp(challenge.xp);
        setShowSuccessModal(true);
        // Let the parent know we submitted successfully to refresh data
        if (onSubmitChallenge) {
          onSubmitChallenge(data.stats);
        }
      } else {
        alert('Failed to submit challenge. Please try again.');
      }
    } catch (err) {
      console.error(err);
      alert('Error submitting challenge. Is the server running?');
    } finally {
      setIsSubmitting(false);
    }
  };

  const editorDisabled = challenge.status === 'completed' || isBlocked;
  const submitButtonLabel = challenge.status === 'completed'
    ? 'ALREADY SUBMITTED'
    : isBlocked
      ? 'CHALLENGE CLOSED'
      : isSubmitting
        ? 'SUBMITTING...'
        : 'SUBMIT CODE';

  return (
    <div className="bg-background text-on-background min-h-screen pb-12 pt-[72px]">
      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface shadow-sm border-b border-surface-container-low">
        <div className="flex justify-between items-center px-container-margin h-touch-target w-full max-w-7xl mx-auto">
          <div className="flex items-center gap-4">
            <button
              onClick={goBack}
              className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-surface-variant transition-all duration-200 active:scale-95 cursor-pointer"
              aria-label="Go back"
            >
              <span className="material-symbols-outlined text-primary">arrow_back</span>
            </button>
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-primary font-bold">code</span>
              <span className="font-display-lg-mobile text-display-lg-mobile text-primary tracking-tighter">
                ABTalks Workspace
              </span>
            </div>
          </div>
          <span className="font-label-caps text-label-caps text-on-surface-variant bg-surface-container px-3 py-1 rounded-full">
            Day {challenge.day}
          </span>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-container-margin md:px-gutter mt-gutter grid grid-cols-1 lg:grid-cols-12 gap-gutter">
        {/* Left Column: Challenge Description */}
        <section className="lg:col-span-5 flex flex-col gap-6">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl p-6 shadow-sm">
            <div className="flex justify-between items-center mb-4">
              <span className="font-label-caps text-label-caps text-primary bg-primary-fixed px-3 py-1 rounded-full">
                DAY {challenge.day} - {challenge.difficulty.toUpperCase()}
              </span>
              <div className="flex items-center gap-1 text-secondary-container">
                <span className="material-symbols-outlined text-sm" data-icon="bolt">
                  bolt
                </span>
                <span className="font-label-caps text-label-caps">{challenge.xp} XP</span>
              </div>
            </div>

            <h1 className="font-headline-md text-headline-md-mobile text-on-background mb-4">
              {challenge.title}
            </h1>
            {isCompleted ? (
              <div className="mb-4 rounded-2xl bg-tertiary-fixed/10 border border-tertiary-fixed p-4 text-sm text-tertiary-fixed">
                This task has already been submitted. You can review your code or go back to the dashboard.
              </div>
            ) : isBlocked ? (
              <div className="mb-4 rounded-2xl bg-error-container/10 border border-error-container p-4 text-sm text-error-container">
                This challenge was not completed on time and is now closed. Review the instructions, but submissions are blocked.
              </div>
            ) : isToday ? (
              <div className="mb-4 rounded-2xl bg-secondary-container/10 border border-secondary p-4 text-sm text-secondary-container">
                Today's challenge is still open. Submit your code before the end of the day.
              </div>
            ) : null}
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              {challenge.description}
            </p>

            {challenge.instructions && (
              <div className="border-t border-outline-variant pt-4">
                <h3 className="font-body-md font-semibold text-on-background mb-2">Instructions:</h3>
                <ol className="list-decimal pl-5 space-y-2 text-sm text-on-surface-variant">
                  {challenge.instructions.split('\n').map((line, idx) => (
                    <li key={idx}>{line.replace(/^\d+\.\s*/, '')}</li>
                  ))}
                </ol>
              </div>
            )}
          </div>

          <div className="bg-surface-container-low border border-outline-variant rounded-xl p-6">
            <h3 className="font-body-md font-semibold text-on-background mb-2">Tips & Tricks</h3>
            <p className="text-sm text-on-surface-variant">
              Make sure to test your code layout across different screen sizes. Flexbox properties like{' '}
              <code className="font-mono bg-surface-container px-1 py-0.5 rounded text-primary">flex-wrap</code> and{' '}
              <code className="font-mono bg-surface-container px-1 py-0.5 rounded text-primary">justify-content</code> are key to making navigation menus look professional on both desktop and mobile devices.
            </p>
          </div>
        </section>

        {/* Right Column: Code Editor */}
        <section className="lg:col-span-7 flex flex-col gap-4">
          <div className="bg-surface-container-lowest border border-outline-variant rounded-xl overflow-hidden shadow-sm flex flex-col min-h-[360px]">
            {/* Editor Tab Bar */}
            <div className="bg-surface-container-low px-4 py-2 border-b border-outline-variant flex justify-between items-center">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-error"></span>
                <span className="w-3 h-3 rounded-full bg-secondary-container"></span>
                <span className="w-3 h-3 rounded-full bg-tertiary-container"></span>
                <span className="text-xs font-mono text-on-surface-variant ml-2">workspace.html</span>
              </div>
              <span className="text-xs font-mono text-primary font-bold">EDIT MODE</span>
            </div>

            <div className="flex flex-col gap-4 p-6">
              <div>
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                  GitHub Repository URL <span className="text-error">*</span>
                </label>
                <input
                  type="url"
                  value={githubRepo}
                  onChange={(e) => setGithubRepo(e.target.value)}
                  disabled={editorDisabled}
                  placeholder="https://github.com/your-account/your-repo"
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-background outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-60 disabled:cursor-not-allowed"
                />
                <p className="text-[11px] text-on-surface-variant mt-2">Required. Must be a GitHub repository URL.</p>
              </div>
              <div className="flex-1">
                <label className="font-label-caps text-label-caps text-on-surface-variant mb-2 block">
                  LinkedIn Post Link <span className="text-on-surface-variant">(optional)</span>
                </label>
                <input
                  type="url"
                  value={linkedInPost}
                  onChange={(e) => setLinkedInPost(e.target.value)}
                  disabled={editorDisabled}
                  placeholder="https://www.linkedin.com/posts/your-post"
                  className="w-full rounded-2xl border border-outline-variant bg-surface-container-lowest px-4 py-3 text-sm text-on-background outline-none transition-all duration-200 focus:border-primary focus:ring-2 focus:ring-primary/10 disabled:opacity-60 disabled:cursor-not-allowed"
                />
              </div>
            </div>

            {/* Editor Footer Actions */}
            <div className="bg-surface-container-low px-6 py-4 border-t border-outline-variant flex justify-between items-center">
              <button
                onClick={() => {
                  setGithubRepo('');
                  setLinkedInPost('');
                }}
                className="text-sm font-label-caps text-on-surface-variant hover:text-primary transition-colors cursor-pointer"
                disabled={editorDisabled}
              >
                CLEAR FIELDS
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || editorDisabled}
                className="bg-primary hover:brightness-110 text-on-primary font-label-caps text-label-caps px-8 h-touch-target rounded-lg flex items-center justify-center gap-2 transition-all duration-200 active:scale-95 cursor-pointer shadow-[0px_4px_12px_rgba(0,74,198,0.25)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitButtonLabel === 'SUBMITTING...' ? (
                  <span>SUBMITTING...</span>
                ) : submitButtonLabel === 'ALREADY SUBMITTED' ? (
                  <span>ALREADY SUBMITTED</span>
                ) : (
                  <>
                    <span>SUBMIT CODE</span>
                    <span className="material-symbols-outlined text-lg">publish</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </section>
      </main>

      {/* Success Modal Celebration */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-inverse-surface/60 backdrop-blur-sm p-4">
          <div className="bg-surface rounded-2xl max-w-md w-full p-8 shadow-2xl border border-surface-container-high text-center animate-bounce-short">
            <div className="w-20 h-20 bg-tertiary-container text-on-tertiary-container rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-tertiary-container/30">
              <span className="material-symbols-outlined text-4xl">check_circle</span>
            </div>
            
            <h2 className="font-display-lg-mobile text-display-lg-mobile text-on-background mb-2">
              Challenge Completed!
            </h2>
            <p className="font-body-md text-body-md text-on-surface-variant mb-6">
              Fantastic job! You've successfully committed the code for Day {challenge.day}.
            </p>

            <div className="bg-surface-container-low rounded-xl p-4 mb-6 grid grid-cols-2 gap-4 border border-outline-variant">
              <div>
                <span className="block font-label-caps text-[10px] text-on-surface-variant">EARNED XP</span>
                <span className="text-2xl font-bold text-secondary-container flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-lg">bolt</span>+{earnedXp} XP
                </span>
              </div>
              <div>
                <span className="block font-label-caps text-[10px] text-on-surface-variant">NEW STREAK</span>
                <span className="text-2xl font-bold text-primary flex items-center justify-center gap-1">
                  <span className="material-symbols-outlined text-lg">local_fire_department</span>
                  {challenge.status === 'completed' ? 'Keep Going' : 'Streak Up!'}
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                onGoToDashboard();
              }}
              className="bg-primary hover:brightness-110 text-on-primary font-label-caps text-label-caps w-full h-touch-target rounded-xl flex items-center justify-center transition-all duration-200 active:scale-95 shadow-[0px_4px_12px_rgba(0,74,198,0.3)] cursor-pointer"
            >
              CONTINUE TO DASHBOARD
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
