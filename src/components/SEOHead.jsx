import { Helmet } from 'react-helmet-async';

function SEOHead() {
  const title =
    'Aditya Chhipa | Full Stack Developer | React, Node.js, AWS & Cloud';

  const description =
    'Aditya Chhipa is a Full Stack Developer from Rajasthan specializing in React, Node.js, AWS, cloud architecture, scalable web applications, DevOps, and modern UI/UX development.';

  const url = 'https://adityachhipa.vercel.app';

  const image = 'https://adityachhipa.vercel.app/og-image.png';

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Aditya Chhipa',
    jobTitle: 'Full Stack Developer',
    url,
    image,
    sameAs: [
      'https://github.com/ADITYAchhipa',
      'https://www.linkedin.com/in/aditya-chhipa-ab8634265/',
    ],
    email: 'adichhipa2@gmail.com',

    knowsAbout: [
      'React',
      'Node.js',
      'AWS',
      'Java',
      'MERN Stack',
      'Cloud Computing',
      'DevOps',
      'Frontend Development',
      'Backend Development',
      'UI/UX Design',
    ],

    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Udaipur',
      addressRegion: 'Rajasthan',
      addressCountry: 'India',
    },
  };

  return (
    <Helmet>
      {/* Primary SEO */}
      <title>{title}</title>

      <meta name="description" content={description} />

      <meta
        name="keywords"
        content="Aditya Chhipa, Full Stack Developer, React Developer, Node.js Developer, AWS Developer, Cloud Architect, MERN Stack Developer, Java Developer, Rajasthan Developer, Portfolio"
      />

      <meta name="robots" content="index, follow" />

      <meta name="author" content="Aditya Chhipa" />

      <meta name="theme-color" content="#1481ee" />

      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />

      <meta property="og:description" content={description} />

      <meta property="og:image" content={image} />

      <meta property="og:url" content={url} />

      <meta property="og:type" content="website" />

      <meta property="og:site_name" content="Aditya Chhipa Portfolio" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />

      <meta name="twitter:title" content={title} />

      <meta name="twitter:description" content={description} />

      <meta name="twitter:image" content={image} />

      {/* Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify(jsonLd)}
      </script>
    </Helmet>
  );
}

export default SEOHead;