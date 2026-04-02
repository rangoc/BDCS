/**
 * Home Page — Redesigned
 *
 * Premium, vertically-flowing layout inspired by Apple's design language.
 * Sections: dark hero, light stats bar, blockquote intro, numbered services,
 * elegant partners grid, dark footer CTA.
 *
 * Uses scroll-triggered stagger animations via framer-motion useInView.
 * All design tokens from lib/theme.ts — no new dependencies.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useRef } from "react";
import styled from "styled-components";

import { InteractiveTexture } from "../components/InteractiveTexture";
import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";
import { StructuredData } from "../components/StructuredData";
import {
  borderRadius,
  colors,
  mediaQueries,
  shadows,
  spacing,
  transitions,
  typography,
} from "../lib/theme";

import introImage from "../public/assets/hero-home.webp";
import confinantLogo from "../public/partners/ConfinantLogo.webp";
import metisLogo from "../public/partners/MetisAuditLogo.webp";
import moosLogo from "../public/partners/MoosAccountantsLogo.png";
import srlLogo from "../public/partners/SrlAccountatsLogo.webp";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  }),
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.15, delayChildren: 0.2 },
  },
};

const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
};

// ============================================================================
// LAYOUT
// ============================================================================

const PageWrapper = styled(motion.main)`
  width: 100%;
  overflow-x: hidden;
  font-family: ${typography.fontFamily.primary};
  color: ${colors.secondary.main};
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  /* Pull up behind the fixed header so the dark hero is full-bleed */
  margin-top: -112px;

  @media (max-width: 768px) {
    margin-top: -96px;
  }

  @media (max-width: 550px) {
    margin-top: -72px;
  }
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing[6]};

  @media ${mediaQueries.mobileAndDown} {
    padding: 0 ${spacing[4]};
  }
`;

// ============================================================================
// HERO SECTION
// ============================================================================

const HeroSection = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  background: linear-gradient(
    160deg,
    ${colors.primary.darker} 0%,
    ${colors.primary.main} 40%,
    ${colors.primary.dark} 70%,
    ${colors.primary.darker} 100%
  );
  overflow: hidden;
`;

const HeroOverlay = styled.div`
  position: absolute;
  inset: 0;
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
  pointer-events: none;
`;

const HeroContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  /* Extra top padding to clear the fixed header (112px desktop) */
  padding: calc(112px + ${spacing[16]}) ${spacing[6]} ${spacing[24]};

  @media (max-width: 768px) {
    padding: calc(96px + ${spacing[12]}) ${spacing[6]} ${spacing[20]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[10]} ${spacing[4]} ${spacing[16]};
  }
`;

const HeroLabel = styled(motion.span)`
  display: inline-block;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.complimentary.main};
  margin-bottom: ${spacing[6]};
`;

const HeroTitle = styled(motion.h1)`
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(
    ${typography.fontSize["4xl"]},
    6vw,
    ${typography.fontSize["7xl"]}
  );
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.neutral.white};
  margin: 0 0 ${spacing[4]};
  max-width: 14ch;
`;

const GoldAccentLine = styled(motion.div)`
  width: 64px;
  height: 2px;
  background: linear-gradient(
    90deg,
    ${colors.complimentary.main},
    ${colors.accent.main}
  );
  margin-bottom: ${spacing[6]};
`;

const HeroTagline = styled(motion.p)`
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.light};
  letter-spacing: ${typography.letterSpacing.wide};
  color: ${colors.complimentary.light};
  margin: 0 0 ${spacing[8]};
  font-style: italic;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.xl};
  }
`;

const HeroDescription = styled(motion.p)`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.normal};
  line-height: ${typography.lineHeight.relaxed};
  color: rgba(255, 255, 255, 0.7);
  max-width: 540px;
  margin: 0 0 ${spacing[10]};

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.base};
  }
`;

const HeroCTAGroup = styled(motion.div)`
  display: flex;
  gap: ${spacing[4]};
  flex-wrap: wrap;

  a {
    width: 200px;
    justify-content: center;
  }
`;

const CTAPrimary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[4]} ${spacing[8]};
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
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  transition: box-shadow 0.15s ease, filter 0.15s ease;
  min-height: 44px;
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

const CTASecondary = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[4]} ${spacing[8]};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  letter-spacing: ${typography.letterSpacing.wider};
  text-transform: uppercase;
  text-decoration: none;
  color: ${colors.neutral.white};
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  transition: ${transitions.default};
  min-height: 44px;
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover {
      border-color: ${colors.complimentary.main};
      color: ${colors.complimentary.light};
      background: rgba(174, 151, 81, 0.05);
    }
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent.main};
    outline-offset: 3px;
  }
`;

const HeroVerticalText = styled.div`
  position: absolute;
  right: ${spacing[8]};
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  transform-origin: center;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: rgba(174, 151, 81, 0.3);
  white-space: nowrap;

  @media ${mediaQueries.tabletAndDown} {
    display: none;
  }
`;

// ============================================================================
// STATS TRUST BAR (light)
// ============================================================================

const StatsSection = styled.section`
  padding: ${spacing[40]} ${spacing[8]};
  background: ${colors.neutral.gray50};
  border-top: 1px solid ${colors.neutral.gray200};

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
// INTRO / BLOCKQUOTE SECTION
// ============================================================================

const IntroSection = styled.section`
  position: relative;
  min-height: 70vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media ${mediaQueries.tabletAndDown} {
    min-height: 60vh;
  }

  @media ${mediaQueries.mobileAndDown} {
    min-height: 50vh;
  }
`;

const IntroImageBg = styled.div`
  position: absolute;
  inset: 0;

  img {
    object-position: center 20% !important;
  }
`;

const IntroOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(
    180deg,
    rgba(10, 8, 25, 0.7) 0%,
    rgba(10, 8, 25, 0.8) 100%
  );
`;

const IntroContent = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
  max-width: 1200px;
  padding: ${spacing[12]} ${spacing[6]};

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[10]} ${spacing[4]};
  }
`;

const IntroLabel = styled(motion.span)`
  display: block;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.complimentary.main};
  margin-bottom: ${spacing[3]};
`;

const IntroGoldLine = styled(motion.div)`
  width: 60px;
  height: 2px;
  background: ${colors.complimentary.main};
  margin-bottom: ${spacing[8]};
`;

const IntroBlockquote = styled(motion.blockquote)`
  margin: 0;
  padding: 0;
`;

const IntroText = styled.p`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.light};
  line-height: ${typography.lineHeight.loose};
  color: ${colors.neutral.gray300};
  margin: 0;
  max-width: 700px;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.lg};
  }
`;

// ============================================================================
// SERVICES SECTION
// ============================================================================

const ServicesSection = styled.section`
  background: linear-gradient(
    180deg,
    ${colors.neutral.gray50} 0%,
    ${colors.neutral.white} 100%
  );
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: ${spacing[16]} 0;
  position: relative;

  @media ${mediaQueries.tabletAndDown} {
    min-height: 80vh;
  }

  @media ${mediaQueries.mobileAndDown} {
    min-height: auto;
    padding: ${spacing[12]} 0;
  }
`;

const SectionHeader = styled.div`
  margin-bottom: ${spacing[16]};

  @media ${mediaQueries.mobileAndDown} {
    margin-bottom: ${spacing[10]};
  }
`;

const SectionLabel = styled(motion.span)`
  display: block;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.complimentary.dark};
  margin-bottom: ${spacing[4]};
`;

const SectionTitle = styled(motion.h2)`
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(
    ${typography.fontSize["3xl"]},
    4vw,
    ${typography.fontSize["5xl"]}
  );
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.primary.main};
  margin: 0;
`;

const ServicesList = styled(motion.div)`
  display: flex;
  flex-direction: column;
`;

const ServiceRow = styled(motion.div)`
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${spacing[6]};
  padding: ${spacing[10]} 0;
  align-items: start;

  &:not(:first-child) {
    border-top: 1px solid ${colors.neutral.gray200};
  }

  @media ${mediaQueries.tabletAndDown} {
    gap: ${spacing[4]};
    padding: ${spacing[8]} 0;
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[6]} 0;
  }
`;

const ServiceNumber = styled.span`
  font-family: ${typography.fontFamily.heading};
  font-size: ${typography.fontSize["4xl"]};
  font-weight: ${typography.fontWeight.bold};
  line-height: 1;
  padding-top: 0.05em;
  background: linear-gradient(
    180deg,
    ${colors.complimentary.lightest} 0%,
    rgba(174, 151, 81, 0.1) 100%
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  user-select: none;

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize["3xl"]};
  }
`;

const ServiceContent = styled.div``;

const ServiceIcon = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: ${borderRadius.lg};
  background: linear-gradient(
    135deg,
    rgba(174, 151, 81, 0.08) 0%,
    rgba(174, 151, 81, 0.02) 100%
  );
  border: 1px solid rgba(174, 151, 81, 0.12);
  margin-bottom: ${spacing[4]};
  color: ${colors.complimentary.dark};
`;

const ServiceTitle = styled.h3`
  font-family: ${typography.fontFamily.heading};
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.semibold};
  line-height: ${typography.lineHeight.snug};
  color: ${colors.primary.main};
  margin: 0 0 ${spacing[3]};
`;

const ServiceDescription = styled.p`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.normal};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.neutral.gray600};
  margin: 0;
  max-width: 520px;
`;

// ============================================================================
// PARTNERS SECTION
// ============================================================================

const PartnersSection = styled.section`
  background: ${colors.neutral.white};
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: ${spacing[16]} 0;
  position: relative;

  &::before,
  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    height: 1px;
    background: linear-gradient(
      90deg,
      transparent,
      ${colors.neutral.gray200},
      transparent
    );
  }

  &::before {
    top: 0;
  }

  &::after {
    bottom: 0;
  }

  @media ${mediaQueries.tabletAndDown} {
    min-height: 80vh;
  }

  @media ${mediaQueries.mobileAndDown} {
    min-height: auto;
    padding: ${spacing[12]} 0;
  }
`;

const PartnersGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0;
  margin-top: ${spacing[12]};

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: repeat(2, 1fr);
  }

  @media ${mediaQueries.mobileAndDown} {
    grid-template-columns: 1fr;
  }
`;

const PartnerCard = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${spacing[10]} ${spacing[6]};
  position: relative;
  transition: ${transitions.default};

  &:not(:last-child)::after {
    content: "";
    position: absolute;
    right: 0;
    top: 20%;
    height: 60%;
    width: 1px;
    background: ${colors.neutral.gray200};

    @media ${mediaQueries.tabletAndDown} {
      display: none;
    }
  }

  @media (hover: hover) {
    &:hover {
      background: rgba(174, 151, 81, 0.02);
    }
  }
`;

const PartnerLogoWrapper = styled.div`
  width: 140px;
  height: 56px;
  position: relative;

  img {
    object-fit: contain !important;
    filter: grayscale(100%) opacity(0.5);
    transition: filter 0.4s ease;
  }

  @media (hover: hover) {
    ${PartnerCard}:hover & img {
      filter: grayscale(0%) opacity(1);
    }
  }

  @media ${mediaQueries.mobileAndDown} {
    img {
      filter: grayscale(0%) opacity(0.8);
    }
  }
`;

const PartnerName = styled.span`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  letter-spacing: ${typography.letterSpacing.wide};
  text-transform: uppercase;
  color: ${colors.neutral.gray400};
  margin-top: ${spacing[4]};
  transition: ${transitions.default};

  ${PartnerCard}:hover & {
    color: ${colors.complimentary.dark};
  }
`;

// ============================================================================
// FOOTER CTA
// ============================================================================

const PartnersCTADivider = styled.div`
  height: 1px;
  background: ${colors.neutral.gray200};
  margin-top: ${spacing[12]};
`;

const PartnersCTARow = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${spacing[6]};
  padding: ${spacing[10]} 0 0;

  @media ${mediaQueries.tabletAndDown} {
    flex-direction: column;
    text-align: center;
  }
`;

const PartnersCTAText = styled.div``;

const PartnersCTATitle = styled.h2`
  font-family: ${typography.fontFamily.heading};
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  color: ${colors.primary.main};
  margin: 0 0 ${spacing[2]};
`;

const PartnersCTASubtext = styled.p`
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral.gray500};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0;
  max-width: 400px;
`;

const PartnersCTAButton = styled(motion.a)`
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
// ICON COMPONENTS
// ============================================================================

function AuditIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
      <rect x="9" y="3" width="6" height="4" rx="1" />
      <path d="M9 14l2 2 4-4" />
    </svg>
  );
}

function AccountingIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <path d="M4 10h16" />
      <path d="M10 4v16" />
    </svg>
  );
}

function StandardsIcon() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  );
}

function ArrowRight() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 8h10M9 4l4 4-4 4" />
    </svg>
  );
}

const serviceIcons: Record<string, React.FC> = {
  audit: AuditIcon,
  accounting: AccountingIcon,
  standards: StandardsIcon,
};

// ============================================================================
// DATA
// ============================================================================

const services = [
  {
    title: "Audit Support",
    description:
      "Comprehensive audit assistance with experienced professionals from Big 4 backgrounds.",
    icon: "audit",
  },
  {
    title: "Accounting Outsourcing",
    description:
      "Flexible accounting teams ready to handle your financial operations efficiently.",
    icon: "accounting",
  },
  {
    title: "IFRS & Dutch GAAP",
    description:
      "Deep expertise in international and Dutch accounting standards.",
    icon: "standards",
  },
];

const stats = [
  { value: "10+", label: "Years of Experience" },
  { value: "Big 4", label: "Alumni Team" },
  { value: "100%", label: "Client Satisfaction" },
  { value: "2", label: "Office Locations" },
];

const partners = [
  { name: "Moos Accountants", logo: moosLogo, alt: "Moos Accountants" },
  { name: "Adviesgroep\u201888", logo: srlLogo, alt: "Adviesgroep\u201888" },
  { name: "Confinant", logo: confinantLogo, alt: "Confinant" },
  { name: "Metis Audit", logo: metisLogo, alt: "Metis Audit" },
];

// ============================================================================
// COMPONENT
// ============================================================================

export default function Home() {
  const heroSectionRef = useRef<HTMLElement>(null);


  // Structured data
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "AccountingService",
    name: "BD Corporate Services d.o.o.",
    alternateName: "BDCS",
    url: "https://www.bdcs.me",
    logo: "https://www.bdcs.me/logo.webp",
    image: "https://www.bdcs.me/og/og-home.png",
    description:
      "Professional audit and accounting outsourcing firm with experienced staff from Big 4 firms. We deliver quality, competitive pricing, and personalized attention.",
    address: [
      {
        "@type": "PostalAddress",
        addressCountry: "ME",
        addressLocality: "Podgorica",
        addressRegion: "Montenegro",
      },
      {
        "@type": "PostalAddress",
        addressCountry: "BA",
        addressLocality: "Sarajevo",
        addressRegion: "Bosnia and Herzegovina",
      },
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "info@bdcs.me",
      telephone: "+382-68-811-727",
    },
    areaServed: ["ME", "BA", "NL"],
    serviceType: [
      "Audit Services",
      "Accounting Outsourcing",
      "IFRS Advisory",
      "Dutch GAAP Advisory",
    ],
    priceRange: "$$",
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
    <PageWrapper
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <SEO
        title="BDCS | BD Corporate Services"
        description="Professional audit and accounting outsourcing firm with experienced staff from Big 4 firms. We deliver quality, competitive pricing, and personalized attention."
        canonicalUrl="https://www.bdcs.me"
        ogUrl="https://www.bdcs.me"
        ogImgUrl="https://www.bdcs.me/og/og-home.png"
      />
      <StructuredData data={[organizationSchema, websiteSchema]} />

      {/* ─── Hero ─── */}
      <HeroSection ref={heroSectionRef} role="banner" aria-label="Hero">
        <HeroOverlay />
        <InteractiveTexture parentRef={heroSectionRef} />
        <HeroContent>
          <HeroLabel
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Audit &amp; Accounting Excellence
          </HeroLabel>

          <HeroTitle
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.2,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            BD Corporate Services
          </HeroTitle>

          <GoldAccentLine
            initial={{ width: 0, opacity: 0 }}
            whileInView={{ width: 64, opacity: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          />

          <HeroTagline
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Strive for quality
          </HeroTagline>

          <HeroDescription
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.7 }}
          >
            Professional audit and accounting outsourcing firm consisting of
            highly dedicated experienced staff with expertise gained at Big 4
            firms.
          </HeroDescription>

          <HeroCTAGroup
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.9 }}
          >
            <Link href="/contact" passHref legacyBehavior>
              <CTAPrimary>
                Get in Touch
              </CTAPrimary>
            </Link>
            <Link href="/why-choose-us" passHref legacyBehavior>
              <CTASecondary>Why Choose Us</CTASecondary>
            </Link>
          </HeroCTAGroup>
        </HeroContent>

      </HeroSection>

      {/* ─── Stats ─── */}
      <StatsSection aria-label="Key statistics">
        <StatsInner
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-200px" }}
          variants={staggerContainer}
        >
          {stats.map((stat, i) => (
            <React.Fragment key={stat.label}>
              {i > 0 && <StatDivider />}
              <StatItem variants={fadeUp} custom={i}>
                <StatValue aria-label={`${stat.value} ${stat.label}`}>
                  {stat.value}
                </StatValue>
                <StatLabel>{stat.label}</StatLabel>
              </StatItem>
            </React.Fragment>
          ))}
        </StatsInner>
      </StatsSection>

      {/* ─── Intro / Blockquote ─── */}
      <IntroSection aria-label="About us">
        <IntroImageBg>
          <Image
            src={introImage}
            alt="BDCS team members collaborating"
            fill
            style={{ objectFit: "cover", objectPosition: "center 30%" }}
            quality={90}
          />
        </IntroImageBg>
        <IntroOverlay />
        <IntroContent>
          <IntroLabel
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            Who We Are
          </IntroLabel>
          <IntroGoldLine
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ transformOrigin: "left" }}
          />
          <IntroBlockquote
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <IntroText>
              Operating from our offices in Podgorica, Montenegro, and
              Sarajevo, Bosnia and Herzegovina, we offer a flexible hybrid
              team from junior to manager level, ready to respond to various
              audit tasks at your request. With extensive experience in Dutch
              GAAP and IFRS, we ensure our clients receive exceptional
              support.
            </IntroText>
          </IntroBlockquote>
        </IntroContent>
      </IntroSection>

      {/* ─── Services ─── */}
      <ServicesSection aria-label="Our services">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-300px" }}
            variants={staggerContainer}
          >
            <SectionHeader>
              <SectionLabel variants={fadeUp} custom={0}>
                Our Services
              </SectionLabel>
              <IntroGoldLine
                variants={fadeUp}
                custom={0.5}
                style={{ transformOrigin: "left" }}
              />
              <SectionTitle variants={fadeUp} custom={1}>
                Expertise You Can Trust
              </SectionTitle>
            </SectionHeader>

            <ServicesList variants={staggerContainer}>
              {services.map((service, i) => {
                const num = String(i + 1).padStart(2, "0");
                return (
                  <ServiceRow key={service.title} custom={i} variants={fadeUp}>
                    <ServiceNumber aria-hidden="true">{num}</ServiceNumber>
                    <ServiceContent>
                      <ServiceTitle>{service.title}</ServiceTitle>
                      <ServiceDescription>
                        {service.description}
                      </ServiceDescription>
                    </ServiceContent>
                  </ServiceRow>
                );
              })}
            </ServicesList>
          </motion.div>
        </Container>
      </ServicesSection>

      {/* ─── Partners ─── */}
      <PartnersSection aria-label="Our partners">
        <Container>
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-300px" }}
            variants={staggerContainer}
          >
            <SectionHeader>
              <SectionLabel variants={fadeUp} custom={0}>
                Trusted Partners
              </SectionLabel>
              <IntroGoldLine
                variants={fadeUp}
                custom={0.5}
                style={{ transformOrigin: "left" }}
              />
              <SectionTitle variants={fadeUp} custom={1}>
                Who We Work With
              </SectionTitle>
            </SectionHeader>

            <PartnersGrid variants={staggerContainer}>
              {partners.map((partner, i) => (
                <PartnerCard key={partner.name} custom={i} variants={fadeUp}>
                  <PartnerLogoWrapper>
                    <Image
                      src={partner.logo}
                      alt={`${partner.alt} logo`}
                      fill
                      style={{ objectFit: "contain" }}
                      loading="lazy"
                    />
                  </PartnerLogoWrapper>
                  <PartnerName>{partner.name}</PartnerName>
                </PartnerCard>
              ))}
            </PartnersGrid>

            {/* Inline CTA at bottom of Partners */}
            <PartnersCTADivider />
            <PartnersCTARow variants={fadeUp} custom={2}>
              <PartnersCTAText>
                <PartnersCTATitle>
                  Ready to Elevate Your Operations?
                </PartnersCTATitle>
                <PartnersCTASubtext>
                  Partner with a team whose expertise was forged at the highest
                  levels of the profession.
                </PartnersCTASubtext>
              </PartnersCTAText>
              <Link href="/contact" passHref legacyBehavior>
                <PartnersCTAButton>
                  Get in Touch
                </PartnersCTAButton>
              </Link>
            </PartnersCTARow>
          </motion.div>
        </Container>
      </PartnersSection>
    </PageWrapper>
  );
}
