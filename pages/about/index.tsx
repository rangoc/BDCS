/**
 * About Us Page — Redesigned
 *
 * Immersive image hero (bottom-left editorial text), spacious stats bar,
 * full-viewport MVV sections with editorial numbering (01/02/03),
 * and dark closing section with italic tagline.
 *
 * Uses scroll-triggered animations via framer-motion useInView.
 * All design tokens from lib/theme.ts — no new dependencies.
 */

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

import { SEO } from "../../components/SEO";
import { StructuredData } from "../../components/StructuredData";
import {
  colors,
  typography,
  spacing,
  mediaQueries,
  shadows,
  transitions,
} from "../../lib/theme";
import about from "../../public/assets/hero-about.webp";

// ============================================================================
// DATA
// ============================================================================

const STATS = [
  { value: "10+", label: "Years Experience" },
  { value: "Big 4", label: "Alumni Team" },
  { value: "50+", label: "Clients Served" },
  { value: "2", label: "Office Locations" },
];

// ============================================================================
// ANIMATION HELPERS
// ============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

// ============================================================================
// PAGE WRAPPER
// ============================================================================

const PageWrapper = styled(motion.main)`
  width: 100%;
  overflow-x: hidden;
  font-family: ${typography.fontFamily.primary};

  /* Negate #__next padding-top so hero sits flush under the fixed header */
  margin-top: -112px;

  @media (max-width: 768px) {
    margin-top: -96px;
  }

  @media (max-width: 550px) {
    margin-top: -72px;
  }
`;

// ============================================================================
// HERO SECTION — Immersive image background, bottom-left editorial text
// ============================================================================

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background: ${colors.primary.darker};

  @media ${mediaQueries.mobileAndDown} {
    min-height: 500px;
    height: 100svh;
  }
`;

const HeroImageWrapper = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(10, 8, 25, 0.55) 0%,
    rgba(10, 8, 25, 0.65) 40%,
    rgba(10, 8, 25, 0.82) 75%,
    rgba(10, 8, 25, 0.94) 100%
  );
`;

const HeroGoldGlow = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  pointer-events: none;
  background: radial-gradient(
      ellipse 60% 50% at 70% 60%,
      rgba(174, 151, 81, 0.06) 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse 40% 40% at 20% 30%,
      rgba(174, 151, 81, 0.03) 0%,
      transparent 60%
    );
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 3;
  padding: 0 ${spacing[12]} ${spacing[12]};
  max-width: 1200px;

  @media ${mediaQueries.tabletAndDown} {
    padding: 0 ${spacing[8]} ${spacing[10]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: 0 ${spacing[6]} ${spacing[8]};
  }
`;

const HeroHeading = styled(motion.h1)`
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(2.5rem, 5.5vw, ${typography.fontSize["7xl"]});
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.neutral.white};
  margin: 0 0 ${spacing[6]} 0;
  max-width: 700px;
`;

const HeroGoldLine = styled(motion.div)`
  width: 80px;
  height: 2px;
  background: ${colors.complimentary.main};
  margin-bottom: ${spacing[5]};
  transform-origin: left center;
`;

const HeroTagline = styled(motion.p)`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.light};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.neutral.gray300};
  margin: 0;
  max-width: 520px;
  letter-spacing: ${typography.letterSpacing.wide};
`;

// ============================================================================
// STATS SECTION — Large values with gold dividers
// ============================================================================

const StatsSection = styled.section`
  padding: ${spacing[40]} ${spacing[8]};
  background: ${colors.neutral.white};

  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[24]} ${spacing[6]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[20]} ${spacing[4]};
  }
`;

const StatsInner = styled(motion.div)`
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: center;

  @media ${mediaQueries.tabletAndDown} {
    flex-wrap: wrap;
    gap: ${spacing[12]};
  }
`;

const StatDivider = styled.div`
  width: 1px;
  height: 80px;
  background: linear-gradient(
    180deg,
    transparent,
    ${colors.complimentary.main},
    transparent
  );
  flex-shrink: 0;

  @media ${mediaQueries.tabletAndDown} {
    display: none;
  }
`;

const StatItem = styled(motion.div)`
  flex: 1;
  text-align: center;
  padding: 0 ${spacing[10]};

  @media ${mediaQueries.tabletAndDown} {
    flex: 0 0 40%;
    padding: 0 ${spacing[4]};
  }

  @media ${mediaQueries.mobileAndDown} {
    flex: 0 0 100%;
  }
`;

const StatValue = styled.span`
  display: block;
  font-family: ${typography.fontFamily.heading};
  font-size: ${typography.fontSize["6xl"]};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.none};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.primary.main};

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize["5xl"]};
  }

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["4xl"]};
  }
`;

const StatLabel = styled.span`
  display: block;
  margin-top: ${spacing[4]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.neutral.gray500};
`;

// ============================================================================
// MVV SECTIONS — Dark with watermark titles
// ============================================================================

const MVV_CONTENT = [
  {
    title: "Mission",
    lead: "High quality services that go beyond cost reductions",
    body: "BDCS ensures time efficiency and reduced overheads, resulting in our clients' ability to have a greater focus on other areas of their business.",
    values: null,
  },
  {
    title: "Vision",
    lead: "A center of excellence in accounting and audit",
    body: "We aim to be recognized as one of the top outsourcing companies through commitment to excellence, integrity and responsiveness.",
    values: null,
  },
  {
    title: "Values",
    lead: "Values",
    body: "More than words on paper.",
    values: ["Quality", "Teamwork", "Respect", "Excellence", "Integrity"],
  },
];

const MVVSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.neutral.white};
  overflow: hidden;
  padding: ${spacing[16]} 0;

  @media ${mediaQueries.tabletAndDown} {
    min-height: 80vh;
    padding: ${spacing[16]} 0;
    align-items: stretch;
  }

  @media ${mediaQueries.mobileAndDown} {
    min-height: 70vh;
    padding: ${spacing[12]} 0;
  }
`;

const MVVGoldGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 50% 60% at 25% 50%,
    rgba(174, 151, 81, 0.04) 0%,
    transparent 70%
  );
`;

const MVVDivider = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 1100px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${colors.complimentary.lighter} 30%,
    ${colors.complimentary.main} 50%,
    ${colors.complimentary.lighter} 70%,
    transparent 100%
  );
  opacity: 0.3;
  z-index: 2;
`;

const QuoteSection = styled.section`
  position: relative;
  min-height: 50vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: ${colors.neutral.white};
  padding: ${spacing[24]} ${spacing[8]};

  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[16]} ${spacing[6]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[12]} ${spacing[4]};
  }
`;

const MVVQuote = styled(motion.p)`
  position: relative;
  z-index: 1;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.light};
  font-style: italic;
  line-height: ${typography.lineHeight.relaxed};
  letter-spacing: ${typography.letterSpacing.wide};
  color: ${colors.primary.main};
  text-align: center;
  max-width: 680px;
  margin: 0 auto ${spacing[24]};

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize.xl};
    margin-bottom: ${spacing[16]};
  }

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.lg};
    margin-bottom: ${spacing[12]};
  }
`;

const MVVQuoteGoldLine = styled(motion.div)`
  width: 60px;
  height: 2px;
  background: ${colors.complimentary.main};
  margin: 0 auto ${spacing[8]};
  position: relative;
  z-index: 1;
`;

/** Two-column grid: title left, content right */
const MVVGrid = styled(motion.div)`
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${spacing[12]};
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing[8]};
  align-items: center;

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[4]};
    padding: 0 ${spacing[6]};
    margin: 0;
  }

  @media ${mediaQueries.mobileAndDown} {
    gap: ${spacing[3]};
    padding: 0 ${spacing[4]};
  }
`;

const MVVTitleColumn = styled.div`
  @media ${mediaQueries.tabletAndDown} {
    width: 100%;
  }
`;

const MVVTitle = styled.span`
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(${typography.fontSize["4xl"]}, 7vw, 7rem);
  font-weight: ${typography.fontWeight.bold};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.tight};
  line-height: 0.9;
  color: ${colors.primary.main};
  opacity: 0.07;
  user-select: none;

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize["4xl"]};
    opacity: 0.08;
  }
`;

const MVVContentColumn = styled.div`
  padding-top: ${spacing[4]};
  max-width: 560px;

  @media ${mediaQueries.tabletAndDown} {
    padding-top: ${spacing[2]};
    max-width: 100%;
  }
`;

const MVVLead = styled.h3`
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(${typography.fontSize.xl}, 2.5vw, ${typography.fontSize["3xl"]});
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.primary.main};
  margin: 0 0 ${spacing[5]};
`;

const MVVBody = styled.p`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.normal};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.neutral.gray600};
  margin: 0;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.base};
  }
`;

const MVVValuesRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0;
  margin-bottom: ${spacing[5]};
`;

const MVVValueWord = styled.span`
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(${typography.fontSize["2xl"]}, 3vw, ${typography.fontSize["4xl"]});
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  letter-spacing: ${typography.letterSpacing.tight};
  line-height: ${typography.lineHeight.tight};
`;

const MVVValueDot = styled.span`
  display: inline-block;
  font-size: clamp(${typography.fontSize["2xl"]}, 3vw, ${typography.fontSize["4xl"]});
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.complimentary.main};
  margin: 0 ${spacing[3]};
  line-height: ${typography.lineHeight.tight};
`;

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function MVVBlock({
  section,
  index,
}: {
  section: (typeof MVV_CONTENT)[number];
  index: number;
}) {
  return (
    <MVVSection>
      <MVVDivider />
      <MVVGoldGlow />

      <MVVGrid
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        <MVVTitleColumn>
          <MVVTitle>{section.title}</MVVTitle>
        </MVVTitleColumn>

        <MVVContentColumn>
          {section.values ? (
            <>
              <MVVValuesRow>
                {section.values.map((value, i) => (
                  <React.Fragment key={value}>
                    {i > 0 && <MVVValueDot>·</MVVValueDot>}
                    <MVVValueWord>{value}</MVVValueWord>
                  </React.Fragment>
                ))}
              </MVVValuesRow>
              {section.body && <MVVBody>{section.body}</MVVBody>}
            </>
          ) : (
            <>
              <MVVLead>{section.lead}</MVVLead>
              {section.body && <MVVBody>{section.body}</MVVBody>}
            </>
          )}
        </MVVContentColumn>
      </MVVGrid>
    </MVVSection>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function About() {
  return (
    <>
      <SEO
        title="About Us | BDCS - BD Corporate Services"
        description="BDCS explores and realizes opportunities with the provision of high quality in accounting and audit services that go beyond cost reductions."
        canonicalUrl="https://www.bdcs.me/about"
        ogUrl="https://www.bdcs.me/about"
        ogImgUrl="https://www.bdcs.me/og/og-about.png"
      />
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bdcs.me" },
              { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.bdcs.me/about" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "About Us",
            url: "https://www.bdcs.me/about",
            description: "BDCS explores and realizes opportunities with the provision of high quality in accounting and audit services that go beyond cost reductions.",
            isPartOf: { "@type": "WebSite", url: "https://www.bdcs.me" },
          },
        ]}
      />
      <PageWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Hero — Immersive image background */}
        <HeroSection>
          <HeroImageWrapper>
            <Image
              src={about}
              alt="BD Corporate Services team"
              fill
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
              quality={90}
              priority
            />
          </HeroImageWrapper>
          <HeroOverlay />
          <HeroGoldGlow />

          <HeroContent>
            <HeroHeading
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              About BD Corporate Services
            </HeroHeading>

            <HeroGoldLine
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.25, 0.46, 0.45, 0.94],
              }}
            />

            <HeroTagline
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
            >
              Premium accounting and audit outsourcing, delivered by Big 4
              alumni.
            </HeroTagline>
          </HeroContent>
        </HeroSection>

        {/* Stats */}
        <StatsSection>
          <StatsInner
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {STATS.map((stat, i) => (
              <React.Fragment key={stat.label}>
                {i > 0 && <StatDivider />}
                <StatItem variants={fadeUp}>
                  <StatValue>{stat.value}</StatValue>
                  <StatLabel>{stat.label}</StatLabel>
                </StatItem>
              </React.Fragment>
            ))}
          </StatsInner>
        </StatsSection>

        {/* Quote */}
        <QuoteSection>
          <MVVQuoteGoldLine
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          />
          <MVVQuote
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            &ldquo;Excellence in every detail — from audit precision to
            partnership trust, we deliver beyond expectations.&rdquo;
          </MVVQuote>
        </QuoteSection>

        {/* Mission / Vision / Values */}
        {MVV_CONTENT.map((section, i) => (
          <MVVBlock key={section.title} section={section} index={i} />
        ))}
      </PageWrapper>
    </>
  );
}
