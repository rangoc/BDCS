/**
 * Structured Data Component
 *
 * Adds JSON-LD structured data for better search engine understanding
 * Supports Organization, WebSite, and BreadcrumbList schemas
 */

import Head from "next/head";

// ============================================================================
// TYPES
// ============================================================================

interface OrganizationSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  logo?: string;
  description?: string;
  address?: {
    "@type": string;
    addressCountry: string;
    addressLocality: string;
    addressRegion?: string;
  };
  contactPoint?: {
    "@type": string;
    contactType: string;
    email: string;
  };
}

interface WebSiteSchema {
  "@context": string;
  "@type": string;
  name: string;
  url: string;
  description?: string;
}

interface BreadcrumbListSchema {
  "@context": string;
  "@type": string;
  itemListElement: Array<{
    "@type": string;
    position: number;
    name: string;
    item: string;
  }>;
}

type StructuredData = OrganizationSchema | WebSiteSchema | BreadcrumbListSchema;

interface StructuredDataProps {
  data: StructuredData | StructuredData[];
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Structured Data component for JSON-LD markup
 */
export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd = Array.isArray(data) ? data : [data];

  return (
    <Head>
      {jsonLd.map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </Head>
  );
}
