import type { AppProps } from "next/app";
import { GlobalStyles } from "../lib/globalStyles";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";

export default function App({ Component, pageProps, router }: AppProps) {
  const { asPath } = useRouter();
  const url = `https://bdcs.me${asPath}`;
  return (
    <>
      <GlobalStyles />
      <SEO />
      <Header />
      <AnimatePresence
        mode="wait"
        initial={false}
        onExitComplete={() => window.scrollTo(0, 0)}
      >
        <Component {...pageProps} canonical={url} />
      </AnimatePresence>
      <Footer />
    </>
  );
}
