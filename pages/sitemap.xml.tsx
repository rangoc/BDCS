/**
 * Dynamic Sitemap Generator
 *
 * Generates an XML sitemap for search engines
 * Automatically includes all public pages with proper priorities and changefreq
 */

import { GetServerSideProps } from "next";

// Base URL
const BASE_URL = "https://www.bdcs.me";

// Sitemap entries with priorities and changefreq
const sitemapEntries = [
  {
    url: `${BASE_URL}/`,
    changefreq: "daily",
    priority: "1.0",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    url: `${BASE_URL}/about`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    url: `${BASE_URL}/why-choose-us`,
    changefreq: "monthly",
    priority: "0.8",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    url: `${BASE_URL}/our-team`,
    changefreq: "weekly",
    priority: "0.7",
    lastmod: new Date().toISOString().split("T")[0],
  },
  {
    url: `${BASE_URL}/contact`,
    changefreq: "monthly",
    priority: "0.9",
    lastmod: new Date().toISOString().split("T")[0],
  },
];

function generateSitemap(): string {
  const urls = sitemapEntries
    .map(
      (entry) => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`
    )
    .join("\n");

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>`;
}

/**
 * Sitemap page handler
 * Returns XML sitemap for search engines
 */
function Sitemap() {
  // This component should never render as we return XML directly
  return null;
}

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSitemap();

  res.setHeader("Content-Type", "text/xml");
  res.setHeader(
    "Cache-Control",
    "public, s-maxage=86400, stale-while-revalidate"
  );
  res.write(sitemap);
  res.end();

  return {
    props: {},
  };
};

export default Sitemap;
