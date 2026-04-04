import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
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
          setError(err?.message || 'Unable to load latest updates right now.');
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
      title="Latest | NeoLabs"
      description="Follow the latest NeoLabs delivery stories, operational improvements, and client updates."
    >
      <section className="bg-page">
        <div className="section-container py-20">
          <div className="max-w-2xl space-y-5">
            <p className="eyebrow">Latest</p>
            <h1 className="section-title">Latest delivery stories, rollout updates, and operational milestones.</h1>
            <p className="lede">
              This page keeps a cleaner index of client rollout stories, operational improvements, and the latest updates tied to real delivery work.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-page-muted">
        <div className="section-container py-20">
          {loading && <p className="text-base text-copy">Loading latest updates...</p>}
          {error && <p className="text-base text-red-500">{error}</p>}

          {!loading && !error && featured && (
            <div className="grid gap-8 lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
              <article className="space-y-5">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Latest update</p>
                <h2 className="text-4xl font-semibold tracking-tight text-ink-strong sm:text-5xl">{featured.title}</h2>
                <p className="text-sm uppercase tracking-[0.18em] text-copy">{featured.category} | {featured.publishedAtLabel}</p>
                <p className="text-base leading-8 text-copy">{featured.summary}</p>
                <Link to={`/latest/${featured.slug}`} className="btn-primary">Read more</Link>
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
                <h2 className="section-title">Previous latest stories</h2>
              </div>

              <div className="mt-8 grid gap-6 lg:grid-cols-2">
                {archive.map((post) => (
                  <article key={post.id} className="rounded-[1.5rem] border border-line bg-panel p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">{post.category}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-ink-strong">{post.title}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.18em] text-copy">{post.publishedAtLabel}</p>
                    <p className="mt-4 text-base leading-7 text-copy">{post.summary}</p>
                    <div className="mt-6">
                      <Link to={`/latest/${post.slug}`} className="btn-secondary">Read more</Link>
                    </div>
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
