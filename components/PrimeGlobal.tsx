/**
 * PrimeGlobal membership components
 *
 *  PrimeGlobalStatsNote — "Independent member of" line under the stats
 *    (home + about)
 *  PrimeGlobalAssociationBand — dark section with PrimeGlobal's association figures,
 *    between Services and Partners on the home page
 *
 * Logo: official PrimeGlobal logo (public/partners/PrimeGlobalLogo.png).
 * PrimeGlobalLogoLight.png is the same file with white lettering for dark
 * backgrounds; the swirl keeps its colours.
 */

import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import styled from "styled-components";

import {
  colors,
  mediaQueries,
  spacing,
  typography,
} from "../lib/theme";

import logoDark from "../public/partners/PrimeGlobalLogo.png";
import logoLight from "../public/partners/PrimeGlobalLogoLight.png";

// ============================================================================
// FACTS (PrimeGlobal Annual Impact Report 2024/25, IAB World Survey 2025)
// ============================================================================

export const PRIMEGLOBAL = {
  name: "PrimeGlobal",
  url: "https://www.primeglobal.net",
  figures: [
    { value: "316", label: "Member Firms" },
    { value: "120", label: "Countries" },
    { value: "53,000+", label: "Professionals" },
    { value: "3rd", label: "Largest Association Worldwide" },
  ],
};

// ============================================================================
// LOGO
// ============================================================================

/** Official logo; `light` swaps in the white-lettering file for dark backgrounds. */
export function PrimeGlobalLogo({
  height,
  tone = "dark",
}: {
  height: number;
  tone?: "light" | "dark";
}) {
  const src = tone === "light" ? logoLight : logoDark;
  return (
    <Image
      src={src}
      alt="PrimeGlobal"
      height={height}
      width={Math.round((height * src.width) / src.height)}
      style={{ display: "block" }}
    />
  );
}

// ============================================================================
// STATS NOTE
// ============================================================================

/**
 * Standalone line under the stats row: the stats stay pure numbers and
 * the membership reads as a statement, not a metric.
 */
export function PrimeGlobalStatsNote() {
  return (
    <Note
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: 0.5 }}
    >
      <NoteRule aria-hidden="true" />
      <NoteLink href={PRIMEGLOBAL.url} target="_blank" rel="noopener noreferrer">
        <NoteLabel>Independent member of</NoteLabel>
        <PrimeGlobalLogo height={28} />
      </NoteLink>
    </Note>
  );
}

const Note = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[8]};
  margin-top: ${spacing[20]};

  @media ${mediaQueries.mobileAndDown} {
    margin-top: ${spacing[12]};
  }
`;

const NoteRule = styled.span`
  width: 64px;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    ${colors.complimentary.main},
    transparent
  );
`;

const NoteLink = styled.a`
  display: flex;
  align-items: center;
  gap: ${spacing[5]};
  text-decoration: none;

  @media ${mediaQueries.mobileAndDown} {
    flex-direction: column;
    gap: ${spacing[3]};
  }
`;

const NoteLabel = styled.span`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.neutral.gray500};
`;

// ============================================================================
// ASSOCIATION BAND
// ============================================================================

const bandFade = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94] },
  }),
};

export function PrimeGlobalAssociationBand() {
  return (
    <Band aria-label="PrimeGlobal membership">
      <BandGoldLine aria-hidden="true" />
      <BandInner
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <BandIntro variants={bandFade} custom={0}>
          <BandLogo>
            <PrimeGlobalLogo height={36} tone="light" />
          </BandLogo>
          <BandLabel>Global Association</BandLabel>
          <BandTitle>
            A local team, backed by a global association.
          </BandTitle>
          <BandText>
            BD Corporate Services is an independent member of{" "}
            <strong>{PRIMEGLOBAL.name}</strong>, the
            association of advisory and accounting firms. Through it we work
            alongside peer firms worldwide and share knowledge, standards and
            referrals across borders.
          </BandText>
        </BandIntro>

        <BandFigures>
          {PRIMEGLOBAL.figures.map((f, i) => (
            <BandFigure key={f.label} variants={bandFade} custom={i + 1}>
              <BandValue>{f.value}</BandValue>
              <BandFigureLabel>{f.label}</BandFigureLabel>
            </BandFigure>
          ))}
        </BandFigures>
      </BandInner>
      <BandSource>
        PrimeGlobal association figures, Annual Impact Report 2024/25 · IAB World
        Survey 2025
      </BandSource>
    </Band>
  );
}

const Band = styled.section`
  position: relative;
  padding: ${spacing[24]} 0 ${spacing[10]};
  background: linear-gradient(
    180deg,
    ${colors.primary.darker} 0%,
    ${colors.primary.main} 55%,
    ${colors.primary.dark} 100%
  );
  color: ${colors.neutral.white};
  overflow: hidden;

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[16]} 0 ${spacing[8]};
  }
`;

const BandGoldLine = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent,
    ${colors.complimentary.main},
    ${colors.complimentary.light},
    ${colors.complimentary.main},
    transparent
  );
`;

const BandInner = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${spacing[6]};
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[16]};
  align-items: center;

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[12]};
  }
`;

const BandIntro = styled(motion.div)``;

const BandLogo = styled.div`
  margin-bottom: ${spacing[8]};
`;

const BandLabel = styled.span`
  display: block;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.complimentary.main};
  margin-bottom: ${spacing[4]};
`;

const BandTitle = styled.h2`
  font-family: ${typography.fontFamily.heading};
  font-size: ${typography.fontSize["4xl"]};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  color: ${colors.neutral.white};
  margin: 0 0 ${spacing[6]};

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["3xl"]};
  }
`;

const BandText = styled.p`
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.neutral.gray300};
  margin: 0;
  max-width: 520px;

  strong {
    color: ${colors.neutral.white};
  }
`;

const BandFigures = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  border-top: 1px solid rgba(174, 151, 81, 0.25);
  border-left: 1px solid rgba(174, 151, 81, 0.25);
`;

const BandFigure = styled(motion.div)`
  padding: ${spacing[8]} ${spacing[6]};
  border-right: 1px solid rgba(174, 151, 81, 0.25);
  border-bottom: 1px solid rgba(174, 151, 81, 0.25);

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[6]} ${spacing[4]};
  }
`;

const BandValue = styled.span`
  display: block;
  font-family: ${typography.fontFamily.heading};
  font-size: ${typography.fontSize["5xl"]};
  font-weight: ${typography.fontWeight.bold};
  line-height: ${typography.lineHeight.none};
  letter-spacing: ${typography.letterSpacing.tight};

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["3xl"]};
  }
`;

const BandFigureLabel = styled.span`
  display: block;
  margin-top: ${spacing[3]};
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.complimentary.light};
`;

const BandSource = styled.p`
  max-width: 1200px;
  margin: ${spacing[12]} auto 0;
  padding: 0 ${spacing[6]};
  font-size: ${typography.fontSize.xs};
  color: ${colors.neutral.gray500};
`;
