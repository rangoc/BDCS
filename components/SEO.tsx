import Head from "next/head";

interface ISEOProps {
  title?: string;
  description?: string;
  ogImgUrl?: string;
  ogUrl?: string;
}

export function SEO({
  title = "BDCS | BD Corporate Services d.o.o. Podgorica",
  description = "Strive for quality",
  ogUrl = "https://www.bdcs.me",
  ogImgUrl = "https://www.bdcs.me/logo.png",
}: ISEOProps) {
  return (
    <Head>
      <title key="title">{title}</title>
      <meta key="description" name="description" content={description} />
      <meta key="og:type" property="og:type" content="website" />
      <meta key="og:title" property="og:title" content={title} />
      <meta
        key="og:description"
        property="og:description"
        content={description}
      />
      <meta key="og:image" property="og:image" content={ogImgUrl} />
      <meta key="og:url" property="og:url" content={ogUrl} />
      <meta
        key="twitter:card"
        property="twitter:card"
        content="summary_large_image"
      />
    </Head>
  );
}
