/**
 * SEO Component
 *
 * Comprehensive SEO meta tags for better search engine discoverability
 * Includes: canonical URLs, robots, viewport, Open Graph, Twitter Cards
 */

import Head from "next/head";

interface ISEOProps {
  title?: string;
  description?: string;
  ogImgUrl?: string;
  ogUrl?: string;
  /** Canonical URL - defaults to ogUrl if not provided */
  canonicalUrl?: string;
  /** Robots directive - defaults to "index, follow" */
  robots?: string;
  /** Page language - defaults to "en" */
  lang?: string;
}

export function SEO({
  title = "BDCS | BD Corporate Services d.o.o. Podgorica",
  description = "Strive for quality",
  ogUrl = "https://www.bdcs.me",
  ogImgUrl = "https://www.bdcs.me/logo.png",
  canonicalUrl,
  robots = "index, follow",
  lang = "en",
}: ISEOProps) {
  // Use canonicalUrl if provided, otherwise fallback to ogUrl
  const canonical = canonicalUrl || ogUrl;

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="author" name="author" content="BD Corporate Services d.o.o." />
      <meta key="robots" name="robots" content={robots} />
      <meta key="language" name="language" content={lang} />

      {/* Canonical URL */}
      <link key="canonical" rel="canonical" href={canonical} />

      {/* Viewport - Essential for mobile SEO */}
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />

      {/* Theme Color for Mobile Browsers */}
      <meta key="theme-color" name="theme-color" content="#1A1849" />

      {/* Open Graph / Facebook */}
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:url" property="og:url" content={ogUrl} />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:image" property="og:image" content={ogImgUrl} />
      <meta
        key="og:site_name"
        property="og:site_name"
        content="BD Corporate Services"
      />
      <meta
        key="og:locale"
        property="og:locale"
        content={lang === "en" ? "en_US" : lang}
      />

      {/* Twitter Card */}
      <meta
        key="twitter:card"
        name="twitter:card"
        content="summary_large_image"
      />
      <meta key="twitter:title" name="twitter:title" content={title} />
      <meta
        key="twitter:description"
        name="twitter:description"
        content={description}
      />
      <meta key="twitter:image" name="twitter:image" content={ogImgUrl} />
    </Head>
  );
}
