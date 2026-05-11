import { Helmet } from 'react-helmet-async';

function SEOHead() {
  const title = 'Aditya Chhipa | Full Stack Developer';
  const description =
    'Full Stack Developer based in Udaipur, Rajasthan specializing in web design, SEO optimization, and AWS services. Experienced in building modern web applications with React, Node.js, and cloud technologies.';
  const url = 'https://adityachhipa.com';
  const image = 'https://adityachhipa.com/og-image.png';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aditya Chhipa',
    jobTitle: 'Full Stack Developer',
    url,
    sameAs: [
      'https://github.com/adityachhipa',
      'https://linkedin.com/in/adityachhipa',
    ],
    email: 'adichhipa2@gmail.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Udaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'India',
    },
  };

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD Structured Data */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  );
}

export default SEOHead;
