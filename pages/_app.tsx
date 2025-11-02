import type { AppProps } from "next/app";
import { useEffect } from "react";
import { GlobalStyles } from "../lib/globalStyles";
import { AnimatePresence } from "framer-motion";
import { useRouter } from "next/router";

import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { SEO } from "../components/SEO";

export default function App({ Component, pageProps, router }: AppProps) {
  const { asPath } = useRouter();
  const routerInstance = useRouter();
  const url = `https://bdcs.me${asPath}`;

  /**
   * Scroll to top on route change
   * Ensures user always starts at top of new page
   */
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo({ top: 0, behavior: 'instant' });
    };

    routerInstance.events.on('routeChangeComplete', handleRouteChange);
    
    return () => {
      routerInstance.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [routerInstance.events]);

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
