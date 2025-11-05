import { AnimatePresence } from "framer-motion";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { GlobalStyles } from "../lib/globalStyles";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SEO } from "../components/SEO";

export default function App({ Component, pageProps, router }: AppProps) {
  const { asPath } = useRouter();
  const routerInstance = useRouter();
  const url = `https://www.bdcs.me${asPath}`;

  /**
   * Scroll to top on route change
   * Ensures user always starts at top of new page
   */
  useEffect(() => {
    const handleRouteChange = () => {
      window.scrollTo(0, 0);
    };

    routerInstance.events.on("routeChangeComplete", handleRouteChange);

    return () => {
      routerInstance.events.off("routeChangeComplete", handleRouteChange);
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
