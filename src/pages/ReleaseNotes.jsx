import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout.jsx';
import { fetchBusinessPost, fetchBusinessPosts } from '../lib/api/businessPosts.js';

const ReleaseNotes = () => {
  const [posts, setPosts] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        const payload = await fetchBusinessPosts();
        if (!active) return;
        const nextPosts = payload.posts || [];
        setPosts(nextPosts);
        if (nextPosts[0]?.slug) {
          const detail = await fetchBusinessPost(nextPosts[0].slug);
          if (active) {
            setFeatured(detail.post || nextPosts[0]);
          }
        }
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

  return (
    <Layout
      title="Business | NeoLabs"
      description="Follow NeoLabs business updates, releases, rollouts, and company transition notes."
    >
      <section className="bg-white">
        <div className="section-container py-20">
          <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div className="space-y-5">
              <p className="eyebrow">Business</p>
              <h1 className="section-title">Company updates, release notes, and operational milestones.</h1>
              <p className="lede">
                Business is where NeoLabs keeps historical updates about platform rollouts, reporting improvements, and company-level transition notes such as the IAM update.
              </p>
            </div>

            <div className="surface-panel overflow-hidden">
              <img
                src={featured?.imageUrl || '/illustrations/business-dashboard-rollout.svg'}
                alt={featured?.title || 'NeoLabs business updates'}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-100">
        <div className="section-container py-20">
          {loading && <p className="text-base text-slate-600">Loading business updates...</p>}
          {error && <p className="text-base text-red-500">{error}</p>}

          {!loading && !error && featured && (
            <article className="surface-panel overflow-hidden">
              <div className="grid gap-0 lg:grid-cols-[1.02fr_0.98fr]">
                <div className="p-8 lg:p-12">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Featured update</p>
                  <h2 className="mt-4 text-3xl font-semibold tracking-tight text-slate-950 sm:text-4xl">{featured.title}</h2>
                  <p className="mt-4 text-sm uppercase tracking-[0.18em] text-slate-500">{featured.category} / {featured.publishedAtLabel}</p>
                  <p className="mt-5 text-base leading-8 text-slate-600">{featured.summary}</p>
                  {featured.content && (
                    <div className="mt-6 space-y-4 text-sm leading-7 text-slate-600 sm:text-base">
                      {featured.content.split('\n\n').map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  )}
                </div>
                <div className="h-full">
                  <img src={featured.imageUrl} alt={featured.title} className="h-full w-full object-cover" />
                </div>
              </div>
            </article>
          )}

          {!loading && !error && posts.length > 1 && (
            <div className="mt-10 grid gap-6 lg:grid-cols-2">
              {posts.slice(1).map((post) => (
                <article key={post.id} className="surface-panel overflow-hidden">
                  <img src={post.imageUrl} alt={post.title} className="h-64 w-full object-cover" />
                  <div className="p-7">
                    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">{post.category}</p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-tight text-slate-950">{post.title}</h3>
                    <p className="mt-3 text-sm uppercase tracking-[0.18em] text-slate-500">{post.publishedAtLabel}</p>
                    <p className="mt-4 text-base leading-7 text-slate-600">{post.summary}</p>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default ReleaseNotes;
