/**
 * Custom Document
 *
 * Customizes the HTML document structure
 * Sets language, charset, and font preconnections
 */

import { Head, Html, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Charset */}
        <meta charSet="utf-8" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />

        {/* Font Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="false"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;700&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
