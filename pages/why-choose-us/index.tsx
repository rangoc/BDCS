/**
 * Why Choose Us Page — Redesigned
 *
 * Immersive image hero with dark overlay and gold glows,
 * alternating left/right editorial advantage blocks on a dark
 * gradient background with cross-hatch texture, gold dividers,
 * and a light closing strip.
 *
 * Uses scroll-triggered animations via framer-motion useInView.
 * All design tokens from lib/theme.ts — no new dependencies.
 */

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

import Link from "next/link";
import { SEO } from "../../components/SEO";
import { StructuredData } from "../../components/StructuredData";
import { WHY_CHOOSE_US } from "../../lib/constants";
import {
  colors,
  typography,
  spacing,
  mediaQueries,
  borderRadius,
  transitions,
} from "../../lib/theme";
import heroImg from "../../public/assets/hero-why-choose-us.webp";

// ============================================================================
// DATA
// ============================================================================

const ADVANTAGES = WHY_CHOOSE_US.map((item, i) => ({
  number: String(i + 1).padStart(2, "0"),
  title: item.title,
  description: item.description,
}));

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
// HERO SECTION — Immersive image, dark overlay, gold glows
// ============================================================================

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  height: 100svh;
  min-height: 600px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
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
  background: radial-gradient(
      ellipse 60% 50% at 20% 80%,
      rgba(174, 151, 81, 0.15) 0%,
      transparent 70%
    ),
    radial-gradient(
      ellipse 50% 40% at 80% 20%,
      rgba(174, 151, 81, 0.1) 0%,
      transparent 70%
    ),
    linear-gradient(
      180deg,
      rgba(10, 8, 25, 0.55) 0%,
      rgba(26, 24, 73, 0.7) 50%,
      rgba(10, 8, 25, 0.85) 100%
    );

`;

const HeroContent = styled(motion.div)`
  position: relative;
  z-index: 2;
  max-width: 1200px;
  width: 100%;
  padding: ${spacing[16]} ${spacing[8]} ${spacing[16]};

  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[12]} ${spacing[6]} ${spacing[12]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[10]} ${spacing[4]} ${spacing[10]};
  }
`;

const HeroGoldLine = styled(motion.div)`
  width: 64px;
  height: 3px;
  background: linear-gradient(
    90deg,
    ${colors.complimentary.main},
    ${colors.complimentary.light}
  );
  margin-bottom: ${spacing[6]};
  border-radius: ${borderRadius.full};
  transform-origin: left center;
`;

const HeroHeading = styled(motion.h1)`
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(2.5rem, 5.5vw, ${typography.fontSize["7xl"]});
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral.white};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  margin: 0 0 ${spacing[6]} 0;
  max-width: 700px;
`;

const HeroTagline = styled(motion.p)`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.normal};
  color: rgba(255, 255, 255, 0.7);
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
  max-width: 520px;
`;

// ============================================================================
// ADVANTAGES — Dark background with alternating editorial blocks
// ============================================================================

const AdvantagesWrapper = styled.section`
  position: relative;
  background: linear-gradient(
    180deg,
    ${colors.primary.darker} 0%,
    ${colors.primary.main} 50%,
    ${colors.primary.dark} 100%
  );
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L40 40M40 0L0 40' stroke='%23FFFFFF' stroke-width='0.5' opacity='0.025'/%3E%3C/svg%3E");
    background-repeat: repeat;
    pointer-events: none;
  }
`;

const AdvantageBlock = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${spacing[16]} ${spacing[8]};

  @media ${mediaQueries.tabletAndDown} {
    min-height: 80vh;
    padding: ${spacing[16]} ${spacing[6]};
  }

  @media ${mediaQueries.mobileAndDown} {
    min-height: 70vh;
    padding: ${spacing[12]} ${spacing[4]};
  }
`;

const AdvantageInner = styled(motion.div)<{ $reversed: boolean }>`
  max-width: 1100px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: ${({ $reversed }) =>
    $reversed ? "40fr 60fr" : "60fr 40fr"};
  gap: ${spacing[12]};
  align-items: center;

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[6]};
  }
`;

const NumberTitleColumn = styled(motion.div)<{ $reversed: boolean }>`
  position: relative;
  order: ${({ $reversed }) => ($reversed ? 2 : 1)};

  @media ${mediaQueries.tabletAndDown} {
    order: 1;
  }
`;

const DescriptionColumn = styled(motion.div)<{ $reversed: boolean }>`
  order: ${({ $reversed }) => ($reversed ? 1 : 2)};

  @media ${mediaQueries.tabletAndDown} {
    order: 2;
  }
`;

const BigNumber = styled.span`
  display: block;
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(${typography.fontSize["5xl"]}, 10vw, 8rem);
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.none};
  color: ${colors.complimentary.main};
  opacity: 0.12;
  user-select: none;
  pointer-events: none;
  position: absolute;
  top: -${spacing[6]};
  left: 0;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["5xl"]};
    top: -${spacing[4]};
  }
`;

const AdvantageTitle = styled.h2`
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(
    ${typography.fontSize["2xl"]},
    3vw,
    ${typography.fontSize["4xl"]}
  );
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.neutral.white};
  margin: 0;
  padding-top: ${spacing[8]};
  position: relative;
  z-index: 1;

  @media ${mediaQueries.mobileAndDown} {
    padding-top: ${spacing[6]};
  }
`;

const AdvantageDescription = styled.p`
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.normal};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.neutral.gray300};
  margin: 0;
  max-width: 480px;

  @media ${mediaQueries.tabletAndDown} {
    max-width: 100%;
  }

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.base};
  }
`;

const SectionDivider = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1100px;
  height: 1px;
  margin: 0 auto;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${colors.complimentary.lighter} 30%,
    ${colors.complimentary.main} 50%,
    ${colors.complimentary.lighter} 70%,
    transparent 100%
  );
  opacity: 0.3;
`;

// ============================================================================
// CLOSING STRIP
// ============================================================================

const ClosingStrip = styled.section`
  background: ${colors.neutral.white};
  padding: ${spacing[16]} ${spacing[8]};

  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[12]} ${spacing[6]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[10]} ${spacing[4]};
  }
`;

const ClosingInner = styled.div`
  max-width: 1100px;
  margin: 0 auto;
`;

const ClosingRow = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[6]};

  @media ${mediaQueries.tabletAndDown} {
    flex-direction: column;
    text-align: center;
  }
`;

const ClosingText = styled.div``;

const ClosingTitle = styled(motion.h2)`
  font-family: ${typography.fontFamily.heading};
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  color: ${colors.primary.main};
  margin: 0 0 ${spacing[2]};
`;

const ClosingSubtext = styled(motion.p)`
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral.gray500};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
  max-width: 400px;
`;

const CTAButton = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.wider};
  text-transform: uppercase;
  text-decoration: none;
  color: ${colors.primary.darker};
  background: linear-gradient(
    135deg,
    ${colors.complimentary.main} 0%,
    ${colors.complimentary.light} 100%
  );
  padding: ${spacing[3]} ${spacing[8]};
  border-radius: ${borderRadius.sm};
  min-height: 44px;
  cursor: pointer;
  transition: box-shadow 0.15s ease, filter 0.15s ease;

  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover {
      filter: brightness(1.1);
      box-shadow: 0 2px 10px rgba(174, 151, 81, 0.15);
    }
  }

  &:active {
    filter: brightness(0.95);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent.main};
    outline-offset: 3px;
  }
`;

// ============================================================================
// SUB-COMPONENTS
// ============================================================================

function AdvantageRow({
  advantage,
  index,
}: {
  advantage: { number: string; title: string; description: string };
  index: number;
}) {
  const isEven = index % 2 !== 0;

  return (
    <>
      {index > 0 && (
        <SectionDivider
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ transformOrigin: "center" }}
        />
      )}
      <AdvantageBlock>
        <AdvantageInner
          $reversed={isEven}
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <NumberTitleColumn $reversed={isEven} variants={fadeUp}>
            <BigNumber aria-hidden="true">{advantage.number}</BigNumber>
            <AdvantageTitle>{advantage.title}</AdvantageTitle>
          </NumberTitleColumn>

          <DescriptionColumn $reversed={isEven} variants={fadeUp}>
            <AdvantageDescription>
              {advantage.description}
            </AdvantageDescription>
          </DescriptionColumn>
        </AdvantageInner>
      </AdvantageBlock>
    </>
  );
}

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function WhyChooseUs() {
  return (
    <>
      <SEO
        title="Why Choose Us | BDCS - BD Corporate Services"
        description="Professional approach. Competitive pricing. Personalised attention. National standards."
        canonicalUrl="https://www.bdcs.me/why-choose-us"
        ogUrl="https://www.bdcs.me/why-choose-us"
        ogImgUrl="https://www.bdcs.me/og/og-why-choose-us.png"
      />
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bdcs.me" },
              { "@type": "ListItem", position: 2, name: "Why Choose Us", item: "https://www.bdcs.me/why-choose-us" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Why Choose Us",
            url: "https://www.bdcs.me/why-choose-us",
            description: "Professional approach. Competitive pricing. Personalised attention. National standards.",
            isPartOf: { "@type": "WebSite", url: "https://www.bdcs.me" },
          },
        ]}
      />
      <PageWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Hero */}
        <HeroSection>
          <HeroImageWrapper>
            <Image
              src={heroImg}
              alt="Why choose BD Corporate Services"
              fill
              style={{ objectFit: "cover", objectPosition: "center 20%" }}
              quality={90}
              priority
            />
          </HeroImageWrapper>
          <HeroOverlay />

          <HeroContent
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <HeroHeading variants={fadeUp}>
              Why Choose BD Corporate Services
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
            <HeroTagline variants={fadeUp} transition={{ delay: 0.3 }}>
              Discover why leading businesses trust us with their accounting and
              audit needs.
            </HeroTagline>
          </HeroContent>
        </HeroSection>

        {/* Advantages — alternating blocks on dark background */}
        <AdvantagesWrapper>
          {ADVANTAGES.map((advantage, i) => (
            <AdvantageRow
              key={advantage.number}
              advantage={advantage}
              index={i}
            />
          ))}
        </AdvantagesWrapper>

        {/* Closing strip */}
        <ClosingStrip>
          <ClosingInner>
            <ClosingRow
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <ClosingText>
                <ClosingTitle>
                  Ready to Elevate Your Operations?
                </ClosingTitle>
                <ClosingSubtext>
                  Partner with a team whose expertise was forged at the highest
                  levels of the profession.
                </ClosingSubtext>
              </ClosingText>
              <Link href="/contact" passHref legacyBehavior>
                <CTAButton>
                  Get in Touch
                </CTAButton>
              </Link>
            </ClosingRow>
          </ClosingInner>
        </ClosingStrip>
      </PageWrapper>
    </>
  );
}
