import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Link } from 'react-router-dom';

const strengths = [
  {
    label: 'Built around your workflow',
    description: 'The system fits your users, approvals, and day-to-day operations.',
  },
  {
    label: 'Connected to your stack',
    description: 'We work with the tools you already use instead of forcing a reset.',
  },
  {
    label: 'Visibility that stays live',
    description: 'Dashboards and alerts keep teams closer to what is happening.',
  }
];

const impactSlides = [
  {
    id: 'budget',
    eyebrow: 'Revenue Efficiency',
    title: 'Increase revenue and free up your budget.',
    description: 'Eliminate manual work and redirect operating spend into sales, delivery, and growth capacity.',
    stat: '42%',
    statLabel: 'fewer manual touchpoints',
    signals: [
      { label: 'Cost drag', value: 24 },
      { label: 'Team capacity', value: 71 },
      { label: 'Revenue focus', value: 86 }
    ]
  },
  {
    id: 'channels',
    eyebrow: 'Modernization',
    title: 'Upgrade your business with modern tech.',
    description: 'Connect your current stack, streamline approvals, and unlock new growth channels without forcing a reset.',
    stat: '+3',
    statLabel: 'new digital channels activated',
    signals: [
      { label: 'Connected apps', value: 82 },
      { label: 'Workflow speed', value: 64 },
      { label: 'Channel reach', value: 88 }
    ]
  },
  {
    id: 'competitive',
    eyebrow: 'Competitive Pressure',
    title: 'Stay competitive - digitize your business.',
    description: 'Digitized operators respond faster, monitor better, and move before manual teams even spot the problem.',
    stat: '24/7',
    statLabel: 'operational visibility',
    signals: [
      { label: 'Response time', value: 84 },
      { label: 'Live reporting', value: 92 },
      { label: 'Decision clarity', value: 75 }
    ]
  },
  {
    id: 'capture',
    eyebrow: 'Revenue Capture',
    title: 'Stop missing revenue. Capture every sales opportunity.',
    description: 'Automate follow-up, lead routing, and handoffs so every serious buyer gets a faster path to action.',
    stat: '+31%',
    statLabel: 'more leads captured',
    signals: [
      { label: 'Lead routing', value: 89 },
      { label: 'Follow-up speed', value: 77 },
      { label: 'Close momentum', value: 83 }
    ]
  }
];

const SLIDE_INTERVAL_SECONDS = 4.2;

const Hero = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      return undefined;
    }

    const intervalId = window.setInterval(() => {
      setActiveSlide((currentSlide) => (currentSlide + 1) % impactSlides.length);
    }, SLIDE_INTERVAL_SECONDS * 1000);

    return () => window.clearInterval(intervalId);
  }, [shouldReduceMotion]);

  const currentSlide = impactSlides[activeSlide];

  return (
    <section className="bg-hero-surface overflow-hidden">
      <div className="section-container grid gap-12 py-14 lg:grid-cols-[0.92fr_1.08fr] lg:items-center lg:py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.65, ease: 'easeOut' }}
          className="max-w-2xl space-y-8"
        >
          <div className="space-y-5">
            <span className="eyebrow">NeoLabs</span>
            <p className="text-sm font-semibold uppercase tracking-[0.26em] text-primary">
              Personalized modern apps
            </p>
            <h1 className="text-ink-strong font-display text-5xl font-semibold leading-[0.95] tracking-tight sm:text-6xl lg:text-[5.35rem]">
              Modern apps built fast and shaped around your operations.
            </h1>
            <p className="max-w-xl text-lg leading-8 text-copy">
              We help businesses build modern applications, connect existing tools, and apply AI-powered automation for clearer, more efficient operations.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <Link to="/contact" className="btn-primary">
              Schedule a consultation
            </Link>
            <Link to="/pricing" className="btn-secondary">
              View pricing
            </Link>
          </div>

          <div className="grid gap-4 border-t border-line pt-6 sm:grid-cols-3">
            {strengths.map((item) => (
              <div key={item.label} className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-ink-strong">{item.label}</p>
                <p className="text-sm leading-6 text-copy">{item.description}</p>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.1 }}
          className="relative"
        >
          <div className="surface-panel bg-ink-surface relative min-h-[33rem] overflow-hidden">
            <img
              src="/illustrations/hero-ph-software.svg"
              alt="NeoLabs planning and shipping modern operational software"
              className="absolute inset-0 h-full w-full object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_18%,rgba(60,183,171,0.22),transparent_24%),linear-gradient(180deg,rgba(7,15,24,0.18),rgba(7,15,24,0.76))]" />
            <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(15,23,36,0.06)_0%,rgba(15,23,36,0.26)_48%,rgba(15,23,36,0.72)_100%)]" />

            <svg
              className="pointer-events-none absolute inset-0 h-full w-full opacity-80"
              viewBox="0 0 700 560"
              fill="none"
              preserveAspectRatio="none"
              aria-hidden="true"
            >
              <motion.path
                key={currentSlide.id}
                d="M118 166C182 190 255 224 334 255C414 286 492 300 576 260"
                stroke="rgba(101, 226, 214, 0.65)"
                strokeWidth="2.2"
                strokeDasharray="5 8"
                initial={{ pathLength: 0.2, opacity: 0.15 }}
                animate={{ pathLength: 1, opacity: 0.9 }}
                transition={{ duration: shouldReduceMotion ? 0.01 : 1.2, ease: 'easeOut' }}
              />
              <motion.circle
                cx="118"
                cy="166"
                r="9"
                fill="rgba(190, 255, 248, 0.92)"
                animate={{ scale: [1, 1.18, 1] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.circle
                cx="334"
                cy="255"
                r="7"
                fill="rgba(101, 226, 214, 0.92)"
                animate={{ scale: [1, 1.3, 1] }}
                transition={{ duration: 2.1, repeat: Infinity, ease: 'easeInOut', delay: 0.35 }}
              />
              <motion.circle
                cx="576"
                cy="260"
                r="10"
                fill="rgba(101, 226, 214, 0.96)"
                animate={{ scale: [1, 1.16, 1] }}
                transition={{ duration: 2.7, repeat: Infinity, ease: 'easeInOut', delay: 0.7 }}
              />
            </svg>

            <div className="absolute left-6 top-6 z-10 max-w-[12rem] rounded-[1.35rem] border border-white/10 bg-[rgba(6,14,22,0.72)] px-4 py-4 text-white shadow-[0_18px_40px_rgba(5,10,18,0.45)] backdrop-blur-md">
              <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/55">Signal deck</p>
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide.eyebrow}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: shouldReduceMotion ? 0.01 : 0.35, ease: 'easeOut' }}
                  className="mt-3 space-y-2"
                >
                  <p className="text-lg font-semibold leading-tight text-white">{currentSlide.eyebrow}</p>
                  <p className="text-sm leading-6 text-white/62">One business outcome at a time, presented like a live boardroom signal.</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="absolute right-6 top-6 z-10 w-[13rem] rounded-[1.5rem] border border-white/10 bg-[rgba(6,14,22,0.72)] px-4 py-4 text-white shadow-[0_18px_40px_rgba(5,10,18,0.45)] backdrop-blur-md">
              <div className="flex items-center justify-between text-[10px] font-semibold uppercase tracking-[0.18em] text-white/58">
                <span>Live impact</span>
                <span>Auto</span>
              </div>
              <div className="mt-4 flex items-end gap-2">
                {currentSlide.signals.map((signal) => (
                  <div key={signal.label} className="flex flex-1 flex-col items-center gap-2">
                    <motion.div
                      className="w-full rounded-full bg-gradient-to-t from-emerald-400 via-teal-300 to-cyan-200 shadow-[0_0_22px_rgba(91,236,220,0.28)]"
                      initial={{ height: 18 }}
                      animate={{ height: `${Math.max(signal.value, 14)}px` }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.6, ease: 'easeOut' }}
                    />
                    <span className="text-[9px] uppercase tracking-[0.16em] text-white/42">{signal.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="absolute inset-x-4 bottom-4 z-10 sm:inset-x-6 sm:bottom-6">
              <div className="overflow-hidden rounded-[1.8rem] border border-white/10 bg-[rgba(7,15,24,0.84)] px-5 py-5 text-white shadow-[0_28px_70px_rgba(5,10,18,0.48)] backdrop-blur-xl sm:px-6 sm:py-6">
                <div className="flex items-center justify-between gap-4">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/58">Operations impact</p>
                  <p className="text-xs uppercase tracking-[0.18em] text-emerald-200/75">
                    {String(activeSlide + 1).padStart(2, '0')} / {String(impactSlides.length).padStart(2, '0')}
                  </p>
                </div>

                <div className="mt-4 grid gap-2 sm:grid-cols-4">
                  {impactSlides.map((slide, index) => (
                    <button
                      key={slide.id}
                      type="button"
                      onClick={() => setActiveSlide(index)}
                      className="group rounded-full focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-300/60"
                      aria-label={`Show slide ${index + 1}: ${slide.title}`}
                      aria-pressed={index === activeSlide}
                    >
                      <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                        {index < activeSlide && <div className="h-full w-full rounded-full bg-emerald-300" />}
                        {index === activeSlide && (
                          <motion.div
                            key={activeSlide}
                            className="h-full rounded-full bg-gradient-to-r from-emerald-200 via-teal-300 to-cyan-200"
                            initial={{ width: shouldReduceMotion ? '100%' : '0%' }}
                            animate={{ width: '100%' }}
                            transition={{ duration: shouldReduceMotion ? 0.01 : SLIDE_INTERVAL_SECONDS, ease: 'linear' }}
                          />
                        )}
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_11rem] lg:items-end">
                  <div className="min-h-[11rem]">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={currentSlide.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: shouldReduceMotion ? 0.01 : 0.38, ease: 'easeOut' }}
                        className="space-y-4"
                      >
                        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-emerald-200/80">
                          {currentSlide.eyebrow}
                        </p>
                        <h2 className="max-w-2xl text-3xl font-semibold leading-[1.04] tracking-tight text-white sm:text-[2.35rem]">
                          {currentSlide.title}
                        </h2>
                        <p className="max-w-2xl text-base leading-7 text-white/68 sm:text-lg">
                          {currentSlide.description}
                        </p>
                      </motion.div>
                    </AnimatePresence>
                  </div>

                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`${currentSlide.id}-stat`}
                      initial={{ opacity: 0, y: 18 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -18 }}
                      transition={{ duration: shouldReduceMotion ? 0.01 : 0.42, ease: 'easeOut' }}
                      className="rounded-[1.5rem] border border-white/10 bg-white/[0.04] px-5 py-5 text-right shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    >
                      <p className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/46">Projected lift</p>
                      <p className="mt-3 text-4xl font-semibold tracking-tight text-emerald-200">{currentSlide.stat}</p>
                      <p className="mt-2 text-sm leading-6 text-white/58">{currentSlide.statLabel}</p>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
