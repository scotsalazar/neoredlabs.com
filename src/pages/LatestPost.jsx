import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import { fetchBusinessPost } from '../lib/api/businessPosts.js';

const LatestPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;

    const load = async () => {
      try {
        setLoading(true);
        setError('');
        const payload = await fetchBusinessPost(slug);
        if (!active) return;
        setPost(payload.post || null);
        if (!payload.post) {
          setError('Latest story not found.');
        }
      } catch (err) {
        if (!active) return;
        setError(err?.message || 'Unable to load this latest story right now.');
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
  }, [slug]);

  const paragraphs = post?.content
    ? post.content.split('\n\n').map((paragraph) => paragraph.trim()).filter(Boolean)
    : [];

  return (
    <Layout
      title={post ? `${post.title} | Latest | NeoLabs` : 'Latest Story | NeoLabs'}
      description={post?.summary || 'Read the latest NeoLabs client rollout story and operational case study.'}
    >
      <section className="bg-page">
        <div className="section-container py-20">
          {loading && <p className="text-base text-copy">Loading latest story...</p>}

          {!loading && error && !post && (
            <div className="max-w-2xl space-y-5">
              <p className="eyebrow">Latest</p>
              <h1 className="section-title">This story is not available.</h1>
              <p className="lede">{error}</p>
              <Link to="/latest" className="btn-secondary">Back to Latest</Link>
            </div>
          )}

          {!loading && post && (
            <article className="space-y-12">
              <div className="space-y-6">
                <Link to="/latest" className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">
                  Back to Latest
                </Link>
                <div className="max-w-4xl space-y-5">
                  <p className="eyebrow">{post.category}</p>
                  <h1 className="section-title">{post.title}</h1>
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-copy">{post.publishedAtLabel}</p>
                  <p className="max-w-3xl text-lg leading-8 text-copy sm:text-xl">{post.summary}</p>
                </div>
              </div>

              <div className="surface-panel overflow-hidden">
                <img src={post.imageUrl} alt={post.title} className="h-full w-full object-cover" />
              </div>

              <div className="mx-auto max-w-3xl space-y-6">
                {paragraphs.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)} className="text-base leading-8 text-copy sm:text-lg">
                    {paragraph}
                  </p>
                ))}
              </div>

              <div className="mx-auto flex max-w-3xl flex-col gap-6 rounded-[2rem] border border-line bg-panel p-8 lg:flex-row lg:items-center lg:justify-between lg:p-10">
                <div className="max-w-2xl space-y-3">
                  <p className="eyebrow">Need something similar?</p>
                  <h2 className="text-3xl font-semibold tracking-tight text-ink-strong">Tell us which workflow or operation you want to improve.</h2>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link to="/contact" className="btn-primary">Contact Us</Link>
                  <Link to="/latest" className="btn-secondary">More latest updates</Link>
                </div>
              </div>
            </article>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default LatestPost;
