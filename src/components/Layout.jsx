import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';

const Layout = ({ title, description, image, children }) => {
  const location = useLocation();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${location.pathname}`
      : '';

  const metaTitle = title || 'NeoLabs | Philippine App Development Company';
  const metaDescription =
    description ||
    'NeoLabs builds modern business apps, automation, and AI-enabled systems for Philippine SMEs, scaling companies, and enterprise operations.';
  const metaImage = image || undefined;

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NeoLabs',
    url: currentUrl,
    logo: '/favicon.png',
    description: metaDescription,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Makati City',
      addressRegion: 'Metro Manila',
      addressCountry: 'PH'
    },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'info@neolabs.com',
        contactType: 'sales'
      }
    ]
  };

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>
        {metaDescription && <meta name="description" content={metaDescription} />}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />
        {metaImage && <meta property="og:image" content={metaImage} />}
        {currentUrl && <meta property="og:url" content={currentUrl} />}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metaTitle} />
        <meta name="twitter:description" content={metaDescription} />
        {metaImage && <meta name="twitter:image" content={metaImage} />}
        {currentUrl && <link rel="canonical" href={currentUrl} />}
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>

      <div className="min-h-screen bg-transparent text-slate-900">
        <Navbar />
        <div className="h-24 shrink-0 sm:h-28" aria-hidden />
        <main>{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
