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

  // Reset scroll position on route change (needed because #__next is the
  // scroll container on mobile, so the browser doesn't auto-reset it)
  useEffect(() => {
    const nextEl = document.getElementById("__next");
    if (nextEl) nextEl.scrollTop = 0;
    window.scrollTo(0, 0);
  }, [asPath]);

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

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
