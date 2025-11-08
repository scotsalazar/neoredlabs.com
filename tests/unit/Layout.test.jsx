import { render } from '@testing-library/react';
import Layout from '../../src/components/Layout.jsx';

describe('Layout component', () => {
  it('injects SEO meta tags into the head', () => {
    const title = 'Test Page Title';
    const description = 'A test description for SEO tags.';
    const image = '/test-image.png';
    render(
      <Layout title={title} description={description} image={image}>
        <div>Content</div>
      </Layout>
    );
    // Document title
    expect(document.title).toBe(title);
    // Open Graph tags
    const ogTitle = document.querySelector('meta[property="og:title"]');
    const ogDescription = document.querySelector('meta[property="og:description"]');
    const ogImage = document.querySelector('meta[property="og:image"]');
    expect(ogTitle).not.toBeNull();
    expect(ogTitle?.getAttribute('content')).toBe(title);
    expect(ogDescription?.getAttribute('content')).toBe(description);
    expect(ogImage?.getAttribute('content')).toBe(image);
    // Twitter card
    const twitterCard = document.querySelector('meta[name="twitter:card"]');
    expect(twitterCard).not.toBeNull();
    expect(twitterCard?.getAttribute('content')).toBe('summary_large_image');
  });
});