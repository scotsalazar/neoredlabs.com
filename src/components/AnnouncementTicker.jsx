import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DISMISS_KEY = 'iamtech_migration_notice_dismissed';
const MESSAGE =
  'NeoLabs (Neo RedLabs) is currently transitioning to IAMTECH. Our domain is still www.neoredlabs.com while the migration is in progress.';

const AnnouncementTicker = () => {
  const [dismissed, setDismissed] = useState(() => {
    if (typeof window === 'undefined') {
      return false;
    }

    return window.localStorage.getItem(DISMISS_KEY) === '1';
  });

  const handleDismiss = () => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(DISMISS_KEY, '1');
    }

    setDismissed(true);
  };

  if (dismissed) {
    return null;
  }

  const segment = (
    <>
      <span className="announcement-item text-sm font-semibold text-slate-50">{MESSAGE}</span>
      <span className="announcement-separator text-cyan-300/70" aria-hidden="true">
        •
      </span>
      <span className="announcement-item text-sm font-semibold text-slate-50">{MESSAGE}</span>
      <span className="announcement-separator text-cyan-300/70" aria-hidden="true">
        •
      </span>
    </>
  );

  return (
    <section
      role="region"
      aria-label="Site announcement"
      className="announcement-ticker relative z-40 min-h-[56px] border-y border-cyan-400/60 bg-slate-950/95 shadow-[0_0_20px_rgba(34,211,238,0.25)]"
    >
      <div className="section-container flex min-h-[56px] items-center gap-3 py-2">
        <span className="announcement-badge shrink-0 rounded-full border border-cyan-300/60 bg-cyan-400/10 px-2 py-1 text-[11px] font-bold uppercase tracking-wide text-cyan-200">
          ℹ️ Announcement
        </span>

        <div className="announcement-viewport min-w-0 flex-1 overflow-hidden">
          <div className="announcement-track flex items-center whitespace-nowrap">
            <div className="announcement-segment flex shrink-0 items-center gap-4">{segment}</div>
            <div className="announcement-segment flex shrink-0 items-center gap-4" aria-hidden="true">
              {segment}
            </div>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            to="/about"
            className="rounded-md border border-cyan-300/40 px-2.5 py-1 text-xs font-semibold text-cyan-100 transition hover:bg-cyan-300/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            Learn more
          </Link>
          <button
            type="button"
            onClick={handleDismiss}
            aria-label="Dismiss announcement"
            className="rounded-md border border-white/20 px-2 py-1 text-sm font-bold leading-none text-white transition hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
          >
            ×
          </button>
        </div>
      </div>
    </section>
  );
};

export default AnnouncementTicker;
