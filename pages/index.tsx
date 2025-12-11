/**
 * Home Page
 *
 * Landing page with split-screen hero, company intro, and partners section
 * Features scroll-triggered animations and modern layout
 */

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styled from "styled-components";

import { Button } from "../components/Button";
import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";
import { StructuredData } from "../components/StructuredData";
import { textStaggerContainer, textStaggerLine } from "../lib/animations";
import {
  borderRadius,
  colors,
  mediaQueries,
  shadows,
  spacing,
  typography,
} from "../lib/theme";

import carousel1 from "../public/assets/carousel1.webp";
import carousel2 from "../public/assets/carousel2.webp";
import carousel3 from "../public/assets/carousel3.webp";
import carousel4 from "../public/assets/carousel4.webp";
import adviesLogo from "../public/partners/AdviesGroep88Logo.png";
import confinantLogo from "../public/partners/ConfinantLogo.webp";
import moosLogo from "../public/partners/MoosAccountantsLogo.png";

// ============================================================================
// HERO SECTION - Split Screen
// ============================================================================

/**
 * Hero container - split screen layout
 */
const HeroSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[12]};
  align-items: center;
  min-height: calc(100vh - 200px);
  margin-bottom: ${spacing[20]};

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[8]};
    min-height: auto;
  }
`;

/**
 * Hero content (left side)
 */
const HeroContent = styled(motion.div)`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};

  @media ${mediaQueries.mobileAndDown} {
    text-align: center;
  }
`;

/**
 * Hero title
 */
const HeroTitle = styled(motion.h1)`
  font-size: ${typography.fontSize["6xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  line-height: ${typography.lineHeight.tight};
  margin: 0;

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize["5xl"]};
  }

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["4xl"]};
  }
`;

/**
 * Hero subtitle/tagline
 */
const HeroSubtitle = styled(motion.h2)`
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.light};
  color: ${colors.accent.main};
  letter-spacing: ${typography.letterSpacing.wide};
  margin: 0;

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize.xl};
  }
`;

/**
 * Hero description
 */
const HeroDescription = styled(motion.p)`
  font-size: ${typography.fontSize.lg};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.secondary.lighter};
  margin: ${spacing[4]} 0;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.base};
  }
`;

/**
 * Hero CTA buttons
 */
const HeroCTA = styled(motion.div)`
  display: flex;
  gap: ${spacing[4]};
  margin-top: ${spacing[4]};

  /* Make buttons equal width */
  > a {
    flex: 1;
    max-width: 200px;
  }

  @media ${mediaQueries.mobileAndDown} {
    flex-direction: column;
    align-items: center;

    > a {
      width: 100%;
      max-width: 280px;
    }
  }
`;

/**
 * Hero image container (right side)
 * Aspect ratio maintains space for absolutely positioned images
 */
const HeroImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: ${borderRadius["3xl"]};
  overflow: hidden;
  box-shadow: ${shadows.xl};

  @media ${mediaQueries.tabletAndDown} {
    order: -1;
  }
`;

/**
 * Individual carousel image wrapper
 * Absolute positioning for smooth crossfade overlay
 */
const CarouselImage = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

// ============================================================================
// INTRO SECTION
// ============================================================================

/**
 * Intro section with centered content
 */
const IntroSection = styled.section`
  max-width: 900px;
  margin: 0 auto ${spacing[20]};
  text-align: center;

  @media ${mediaQueries.tabletAndDown} {
    margin: 0;
    text-align: left;
  }

  @media ${mediaQueries.mobileAndDown} {
    text-align: center;
  }
`;

/**
 * Intro text
 */
const IntroText = styled.p`
  font-size: ${typography.fontSize.xl};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.secondary.lighter};

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize.lg};
  }
`;

// ============================================================================
// PARTNERS SECTION
// ============================================================================

/**
 * Partners section with gray background
 */
const PartnersSection = styled.section`
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  width: 100vw;
  background-color: ${colors.neutral.gray50};
  padding: ${spacing[20]} ${spacing[8]};
  margin-top: ${spacing[20]};

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[12]} ${spacing[4]};
  }
`;

/**
 * Partners content container
 */
const PartnersContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  text-align: center;
`;

/**
 * Partners title
 */
const PartnersTitle = styled.h2`
  font-size: ${typography.fontSize["4xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  margin-bottom: ${spacing[12]};

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize["3xl"]};
  }
`;

/**
 * Partners grid with load-in animation
 * Responsive column layout with proper breakpoints
 */
const PartnersGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing[8]};
  align-items: center;
  max-width: 900px;
  margin: 0 auto;

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[6]};
    max-width: 600px;
  }

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 1fr;
    max-width: 350px;
  }
`;

/**
 * Individual partner card
 * Fixed aspect ratio with max-width constraint
 */
const PartnerCard = styled(motion.div)`
  background-color: ${colors.complimentary.lightest};
  padding: ${spacing[8]};
  border-radius: ${borderRadius["2xl"]};
  box-shadow: ${shadows.base};
  transition: all 0.3s ease-out;
  aspect-ratio: 1;
  width: 100%;
  max-width: 300px;
  height: 140px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    box-shadow: ${shadows.lg};
    transform: translateY(-4px);
  }

  @media ${mediaQueries.tabletAndDown} {
    max-width: 280px;
    padding: ${spacing[6]};
  }
`;

/**
 * Partner logo wrapper
 * Fixed dimensions with proper Next.js Image support
 */
const PartnerLogo = styled.div`
  width: 220px;
  height: 220px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;

  /* Next.js Image wrapper */
  > span {
    position: relative !important;
    width: 100% !important;
    height: 100% !important;
  }

  img {
    object-fit: contain !important;
  }

  @media ${mediaQueries.mobileAndDown} {
    width: 150px;
    height: 150px;
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

export default function Home() {
  // Hero carousel images
  const heroImages = [
    { src: carousel1, alt: "Professional team collaboration" },
    { src: carousel2, alt: "Expert audit services" },
    { src: carousel3, alt: "Quality and excellence" },
    { src: carousel4, alt: "Dedicated professional team" },
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  /**
   * Auto-cycle through images every 5 seconds
   */
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 3500);

    return () => clearInterval(interval);
  }, []);

  // Structured data for Organization and WebSite
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "BD Corporate Services d.o.o. Podgorica",
    url: "https://www.bdcs.me",
    logo: "https://www.bdcs.me/logo.webp",
    description:
      "Professional audit and accounting outsourcing firm with experienced staff from Big 4 firms. We deliver quality, competitive pricing, and personalized attention.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ME",
      addressLocality: "Podgorica",
      addressRegion: "Montenegro",
    },
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "info@bdcs.me",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "BD Corporate Services",
    url: "https://www.bdcs.me",
    description:
      "Professional audit and accounting outsourcing firm with experienced staff from Big 4 firms.",
  };

  return (
    <Layout noBottomPadding>
      <SEO
        title="Home | BD Corporate Services d.o.o. Podgorica"
        description="Professional audit and accounting outsourcing firm with experienced staff from Big 4 firms. We deliver quality, competitive pricing, and personalized attention."
        canonicalUrl="https://www.bdcs.me"
        ogUrl="https://www.bdcs.me"
        ogImgUrl="https://www.bdcs.me/logo.webp"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      {/* Hero Section - Split Screen */}
      <HeroSection>
        {/* Left side - Content */}
        <HeroContent
          variants={textStaggerContainer}
          initial="hidden"
          animate="visible"
        >
          <HeroTitle variants={textStaggerLine}>
            BD Corporate Services
          </HeroTitle>
          <HeroSubtitle variants={textStaggerLine}>
            Strive for quality
          </HeroSubtitle>
          <HeroDescription variants={textStaggerLine}>
            Professional audit and accounting outsourcing firm consisting of
            highly dedicated experienced staff with expertise gained at Big 4
            firms.
          </HeroDescription>
          <HeroCTA variants={textStaggerLine}>
            <Link href="/contact" passHref legacyBehavior>
              <Button as="a" variant="accent" size="large">
                Get in Touch
              </Button>
            </Link>
            <Link href="/why-choose-us" passHref legacyBehavior>
              <Button as="a" variant="outline" size="large">
                Why Choose Us
              </Button>
            </Link>
          </HeroCTA>
        </HeroContent>

        {/* Right side - Auto-cycling Images */}
        <HeroImageWrapper>
          <AnimatePresence initial={false}>
            <CarouselImage
              key={currentImageIndex}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: "easeInOut" }}
            >
              <Image
                src={heroImages[currentImageIndex].src}
                alt={heroImages[currentImageIndex].alt}
                layout="responsive"
                quality={100}
                priority={true}
              />
            </CarouselImage>
          </AnimatePresence>
        </HeroImageWrapper>
      </HeroSection>

      {/* Intro Section */}
      <IntroSection>
        <IntroText>
          Operating from our offices in Podgorica, Montenegro, and Sarajevo,
          Bosnia and Herzegovina, we offer a flexible hybrid team from junior to
          manager level, ready to respond to various audit tasks at your
          request. With extensive experience in Dutch GAAP and IFRS, we ensure
          our clients receive exceptional support.
        </IntroText>
      </IntroSection>

      {/* Partners Section */}
      <PartnersSection>
        <PartnersContent>
          <PartnersTitle>Our Partners</PartnersTitle>

          <PartnersGrid
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <PartnerCard>
              <PartnerLogo>
                <Image
                  src={moosLogo}
                  alt="Moos Accountants"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </PartnerLogo>
            </PartnerCard>

            <PartnerCard>
              <PartnerLogo>
                <Image
                  src={adviesLogo}
                  alt="AdviesGroep88"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </PartnerLogo>
            </PartnerCard>

            <PartnerCard>
              <PartnerLogo>
                <Image
                  src={confinantLogo}
                  alt="Confinant"
                  layout="fill"
                  objectFit="contain"
                  quality={100}
                />
              </PartnerLogo>
            </PartnerCard>
          </PartnersGrid>
        </PartnersContent>
      </PartnersSection>
    </Layout>
  );
}
