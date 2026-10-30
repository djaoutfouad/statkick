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

const DEFAULT_OG_IMAGE = `${siteConfig.url}/images/hero-stadium.webp`;

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
  // Homepage uses trailing slash ('/'), all subpages have NO trailing slash
  const cleanPath = (canonicalPath || '').trim();
  let normalizedPath = cleanPath;
  if (!normalizedPath || normalizedPath === '/') {
    normalizedPath = '/';
  } else {
    if (!normalizedPath.startsWith('/')) {
      normalizedPath = `/${normalizedPath}`;
    }
    normalizedPath = normalizedPath.replace(/\/+$/, '');
  }

  const fullCanonical = `${siteConfig.url}${normalizedPath}`;

  const metaImage = image
    ? image.startsWith('http')
      ? image
      : `${siteConfig.url}${image.startsWith('/') ? image : `/${image}`}`
    : DEFAULT_OG_IMAGE;

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
