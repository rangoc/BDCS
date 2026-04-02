/**
 * Our Team Page — Redesigned (Variant B: Image Overlay)
 *
 * Immersive dark hero, full-bleed image cards with gradient overlay,
 * 3-column grid for visual impact, mobile list view preserved,
 * scroll-triggered stagger animations.
 *
 * Uses scroll-triggered animations via framer-motion useInView.
 * All design tokens from lib/theme.ts — no new dependencies.
 */

import React, { useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import Image from "next/image";

import dynamic from "next/dynamic";
import { SEO } from "../../components/SEO";
import { StructuredData } from "../../components/StructuredData";
import type { TeamMember } from "../../components/TeamMemberModal";
import { OUR_TEAM } from "../../lib/team-data";

const TeamMemberModal = dynamic(
  () =>
    import("../../components/TeamMemberModal").then(
      (mod) => mod.TeamMemberModal
    ),
  { ssr: false }
);
import {
  colors,
  typography,
  spacing,
  mediaQueries,
  borderRadius,
  transitions,
} from "../../lib/theme";
import heroImg from "../../public/assets/hero-team.webp";

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
// HERO SECTION
// ============================================================================

const HeroSection = styled.section`
  position: relative;
  width: 100%;
  height: 100vh;
  min-height: 600px;
  display: flex;
  align-items: flex-end;
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
// TEAM GRID — Full-bleed image overlay cards
// ============================================================================

const TeamGridSection = styled.section`
  padding: ${spacing[24]} ${spacing[8]};
  background: ${colors.neutral.white};

  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[16]} ${spacing[6]};
  }

  @media ${mediaQueries.mobileAndDown} {
    display: none;
  }
`;

const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${spacing[5]};
  max-width: 1200px;
  margin: 0 auto;

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const TeamCard = styled.div`
  position: relative;
  border-radius: ${borderRadius.lg};
  overflow: hidden;
  aspect-ratio: 3 / 4;
  cursor: pointer;
  background: ${colors.neutral.gray100};

  &:hover .card-img {
    transform: scale(1.05);
  }
`;

const CardImageWrap = styled.div`
  position: absolute;
  inset: 0;
  transition: transform 0.5s ease;

  img {
    object-position: top center !important;
  }
`;

const CardOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${spacing[6]};
  background: linear-gradient(
    180deg,
    transparent 50%,
    rgba(10, 8, 25, 0.7) 100%
  );
`;

const CardName = styled.h2`
  font-family: ${typography.fontFamily.heading};
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral.white};
  margin: 0 0 ${spacing[1]};
`;

const CardRole = styled.p`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.complimentary.light};
  letter-spacing: ${typography.letterSpacing.wider};
  text-transform: uppercase;
  margin: 0;
`;

// ============================================================================
// MOBILE LIST
// ============================================================================

const TeamListSection = styled.section`
  display: none;

  @media ${mediaQueries.mobileAndDown} {
    display: block;
    padding: ${spacing[10]} ${spacing[4]};
    background: ${colors.neutral.white};
  }
`;

const TeamList = styled.div`
  background: ${colors.neutral.white};
  border-radius: ${borderRadius.xl};
`;

const TeamRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  padding: ${spacing[4]};
  border-bottom: 1px solid ${colors.neutral.gray100};
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;

  &:active {
    background: ${colors.neutral.gray50};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const RowAccent = styled.div`
  width: 3px;
  height: 36px;
  border-radius: 2px;
  background: ${colors.complimentary.main};
  flex-shrink: 0;
`;

const RowContent = styled.div`
  flex: 1;
`;

const RowName = styled.div`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.primary.main};
  margin-bottom: 2px;
`;

const RowRole = styled.div`
  font-size: ${typography.fontSize.xs};
  color: ${colors.neutral.gray500};
`;

const RowChevron = styled.div`
  color: ${colors.neutral.gray300};
  flex-shrink: 0;
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function OurTeam() {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <SEO
        title="Our Team | BDCS - BD Corporate Services"
        description="Meet our experienced team of audit professionals from Big 4 firms. From junior to manager level, ready to support your audit needs."
        canonicalUrl="https://www.bdcs.me/our-team"
        ogUrl="https://www.bdcs.me/our-team"
        ogImgUrl="https://www.bdcs.me/og/og-team.png"
      />
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bdcs.me" },
              { "@type": "ListItem", position: 2, name: "Our Team", item: "https://www.bdcs.me/our-team" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebPage",
            name: "Our Team",
            url: "https://www.bdcs.me/our-team",
            description: "Meet our experienced team of audit professionals from Big 4 firms. From junior to manager level, ready to support your audit needs.",
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
        <HeroSection aria-label="Team page hero">
          <HeroImageWrapper>
            <Image
              src={heroImg}
              alt="BD Corporate Services team"
              fill
              sizes="100vw"
              style={{ objectFit: "cover" }}
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
              Meet our Team
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
              40+ professionals with Big 4 expertise, dedicated to delivering
              excellence.
            </HeroTagline>
          </HeroContent>
        </HeroSection>

        {/* Team Grid — Desktop/Tablet */}
        <TeamGridSection aria-label="Team members">
          <TeamGrid>
            {OUR_TEAM.map((member) => (
              <TeamCard
                key={member.email || member.name}
                onClick={() => handleCardClick(member)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(member);
                  }
                }}
              >
                <CardImageWrap className="card-img">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                    quality={90}
                  />
                </CardImageWrap>
                <CardOverlay>
                  <CardName>{member.name}</CardName>
                  <CardRole>{member.role}</CardRole>
                </CardOverlay>
              </TeamCard>
            ))}
          </TeamGrid>
        </TeamGridSection>

        {/* Mobile List */}
        <TeamListSection aria-label="Team members">
          <TeamList>
            {OUR_TEAM.map((member) => (
              <TeamRow
                key={member.email || member.name}
                onClick={() => handleCardClick(member)}
              >
                <RowAccent />
                <RowContent>
                  <RowName>{member.name}</RowName>
                  <RowRole>{member.role}</RowRole>
                </RowContent>
                <RowChevron>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </RowChevron>
              </TeamRow>
            ))}
          </TeamList>
        </TeamListSection>
      </PageWrapper>

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
      />
    </>
  );
}
