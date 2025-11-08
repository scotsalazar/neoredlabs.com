import React, { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

const Layout = ({ title, description, image, children }) => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Derive full URL for canonical and Open Graph tags when running in browser
  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${location.pathname}`
      : '';
  const metaTitle = title || 'Neo Redlabs';
  const metaDescription = description ||
    'Neo Redlabs pioneers innovation through research, development, and digital transformation.';
  const metaImage = image || undefined;

  // Structured data for organisation
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Neo Redlabs',
    url: currentUrl,
    logo: metaImage || '/favicon.svg',
    description: metaDescription
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        {/* Open Graph tags */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        {metaImage && <meta property="og:image" content={metaImage} />}
        {currentUrl && <meta property="og:url" content={currentUrl} />}
        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {metaImage && <meta name="twitter:image" content={metaImage} />}
        {/* Canonical link */}
        {currentUrl && <link rel="canonical" href={currentUrl} />}
        {/* Structured data JSON-LD */}
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1 page-transition">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
