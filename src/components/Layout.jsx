import React, { useEffect } from 'react';
import Navbar from './Navbar.jsx';
import Footer from './Footer.jsx';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

/**
 * Layout component wraps pages with consistent navigation and footer.
 * It also handles metadata generation for SEO and social sharing via
 * react-helmet.  The component resets scroll position on route
 * change to provide a more cohesive experience.
 */
const Layout = ({ title, description, image, children }) => {
  const location = useLocation();

  // Scroll to top when navigating to a new route.
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location.pathname]);

  // Build a full URL for canonical and Open Graph tags when running in the browser.
  const currentUrl =
    typeof window !== 'undefined'
      ? `${window.location.origin}${location.pathname}`
      : '';

  // Provide sensible defaults for meta tags.
  const metaTitle = title || 'Neo Labs | Modern AI Innovation & SaaS Engineering';
  const metaDescription =
    description ||
    'Neo Labs pioneers modern AI innovation and SaaS engineering through intelligent products, automation and digital transformation.';
  const metaImage = image || undefined;

  // Structured data describing the organisation for search engines.
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Neo Labs',
    url: currentUrl,
    logo: metaImage || '/favicon.svg',
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
        {/* Structured data JSON-LD */}
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