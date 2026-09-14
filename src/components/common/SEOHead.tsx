import React from 'react';
import { Head } from 'vite-react-ssg';
import { siteConfig } from '../../config/site';

export interface SEOHeadProps {
  title: string;
  description: string;
  canonicalPath?: string;
  noindex?: boolean;
  structuredData?: Record<string, any> | Array<Record<string, any>>;
  image?: string;
  type?: string;
}

const DEFAULT_OG_IMAGE =
  'https://images.unsplash.com/photo-1522778119026-d647f0596c20?auto=format&fit=crop&w=1200&h=630&q=80';

export const SEOHead: React.FC<SEOHeadProps> = ({
  title,
  description,
  canonicalPath = '',
  noindex = false,
  structuredData,
  image,
  type = 'website',
}) => {
  const formattedTitle = title.includes(siteConfig.name) ? title : `${title} | ${siteConfig.name}`;

  // Robust path normalization:
  // Root page always ends with '/', inner pages never end with '/'
  const cleanPath = (canonicalPath || '').trim();
  let normalizedPath = cleanPath;
  if (!normalizedPath || normalizedPath === '/') {
    normalizedPath = '/';
  } else {
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = `/${normalizedPath}`;
    }
    if (normalizedPath.endsWith('/')) {
      normalizedPath = normalizedPath.slice(0, -1);
    }
  }

  const fullCanonical =
    normalizedPath === '/'
      ? `${siteConfig.url}/`
      : `${siteConfig.url}${normalizedPath}`;

  const metaImage = image || DEFAULT_OG_IMAGE;

  return (
    <Head>
      <title>{formattedTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={siteConfig.author} />
      <link rel="canonical" href={fullCanonical} />
      {noindex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta
          name="robots"
          content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
        />
      )}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={formattedTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:site_name" content={siteConfig.name} />
      <meta property="og:image" content={metaImage} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={formattedTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:image" content={metaImage} />
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Head>
  );
};
