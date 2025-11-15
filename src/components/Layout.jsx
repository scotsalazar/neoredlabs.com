import React, { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

/**
 * Layout component wraps pages with navigation, footer and metadata.
 *
 * It also resets scroll position on route change and defines sensible
 * default meta tags for search engines and social sharing.  A
 * structured data schema describing the organisation is injected into
 * the page via JSON‑LD.
 */
const Layout = ({ title, description, image, children }) => {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Build canonical URL when in browser
  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${location.pathname}`
      : '';

  // Defaults for meta tags
  const metaTitle = title || 'NeoLabs | Intelligent SaaS & Automation Solutions';
  const metaDescription =
    description ||
    'NeoLabs delivers intelligent automation, AI‑powered SaaS solutions and digital transformation services.';
  const metaImage = image || undefined;

  // JSON‑LD organisation schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'NeoLabs',
    url: currentUrl,
    logo: '/favicon.png',
    description: metaDescription,
    contactPoint: [
      {
        '@type': 'ContactPoint',
        email: 'info@neolabs.com',
        contactType: 'customer support'
      }
    ]
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
        {/* Structured data JSON‑LD */}
        <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      </Helmet>
      <div className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;