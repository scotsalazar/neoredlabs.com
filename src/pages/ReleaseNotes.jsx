import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import { fetchBusinessPosts } from '../lib/api/businessPosts.js';

const ReleaseNotes = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const payload = await fetchBusinessPosts();
        if (!active) return;
        setPosts(payload.posts || []);
      } catch (err) {
        if (active) {
          setError(err?.message || 'Unable to load business updates right now.');
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    load();
    return () => {
      active = false;
    };
  }, []);

  const featured = posts[0];
  const archive = posts.slice(1);

  return (
    <Layout
      title="Business | NeoLabs"
      description="Follow NeoLabs business updates, release notes, and company milestones."
    >
      <section className="bg-white">
        <div className="section-container py-20">
          <div className="max-w-2xl space-y-5">
            <p className="eyebrow">Business</p>
            <h1 className="section-title">Updates, releases, and company milestones.</h1>
            <p className="lede">
              This page keeps a clean record of rollout updates, reporting improvements, and company-level notes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f4ee]">
        <div className="section-container py-20">
          {loading && <p className="text-base text-slate-600">Loading business updates...</p>}
          {error && <p className="text-base text-red-500">{error}</p>}

          {!loading && !error && featured && (
            <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <article className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Latest update</p>
                <h2 className="text-4xl font-semibold tracking-tight text-slate-950 sm:text-5xl">{featured.title}</h2>
                <p className="text-sm uppercase tracking-[0.18em] text-slate-500">{featured.category} | {featured.publishedAtLabel}</p>
                <p className="text-base leading-8 text-slate-600">{featured.summary}</p>
                {featured.content && (
                  <div className="space-y-4 text-base leading-8 text-slate-600">
                    {featured.content.split('\n\n').map((paragraph) => (
                      <p key={paragraph}>{paragraph}</p>
                    ))}
                  </div>
                )}
              </article>

              <div className="surface-panel overflow-hidden">
                <img
                  src={featured.imageUrl}
                  alt={featured.title}
                  className="h-full w-full object-cover"
                />
              </div>
            </div>
          )}

          {!loading && !error && archive.length > 0 && (
            <div className="mt-16">
              <div className="max-w-2xl space-y-4">
                <p className="eyebrow">Archive</p>
                <h2 className="section-title">Previous updates</h2>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {archive.map((post) => (
                  <article key={post.id} className="rounded-[1.5rem] border border-slate-200 bg-white p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{post.title}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.18em] text-slate-500">{post.publishedAtLabel}</p>
                    <p className="mt-4 text-base leading-7 text-slate-600">{post.summary}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ReleaseNotes;
