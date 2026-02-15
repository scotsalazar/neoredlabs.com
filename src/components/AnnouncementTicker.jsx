import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const ANNOUNCEMENTS = [
  'NeoLabs (Neo RedLabs) is currently transitioning to IAM Technology Inc.',
  'While the migration to IAM Tech is on going, our domain for now will be www.neoredlabs.com until further notice',
  'Currently hiring Junior Developers and Junior DEVOPS, please apply and send your CV to www.neoredlabs.com/careers',
];

const AnnouncementTicker = () => {
  const [dismissed, setDismissed] = useState(false);

  const handleDismiss = () => setDismissed(true);

  if (dismissed) {
    return null;
  }

  const segment = (
    <>
      {ANNOUNCEMENTS.map((message, index) => (
        <React.Fragment key={`${message}-${index}`}>
          <span className="announcement-item text-sm font-semibold text-slate-50">{message}</span>
          <span className="announcement-separator text-cyan-300/70" aria-hidden="true">
            •{'\u00A0'}
          </span>
        </React.Fragment>
      ))}
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
