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

type JsonLdObject = Record<string, unknown>;

interface StructuredDataProps {
  data: JsonLdObject | JsonLdObject[];
}

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Structured Data component for JSON-LD markup
 */
export function StructuredData({ data }: StructuredDataProps) {
  const jsonLd: JsonLdObject[] = Array.isArray(data) ? data : [data];

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
