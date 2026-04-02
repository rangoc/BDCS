import Lenis from "lenis";
import "lenis/dist/lenis.css";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import { useEffect } from "react";
import "../styles/fonts.css";
import { GlobalStyles } from "../lib/globalStyles";

import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { SEO } from "../components/SEO";

export default function App({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();
  const url = `https://www.bdcs.me${asPath}`;

  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.15,
      wheelMultiplier: 0.5,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, [asPath]);

  return (
    <>
      <GlobalStyles />
      <SEO />
      <Header />
      <Component {...pageProps} canonical={url} />
      <Footer />
    </>
  );
}
