/**
 * Our Team Page
 * 
 * Displays team members in a grid with modal details
 * Handles 38+ team members efficiently with hover effects and animations
 */

import { useState } from "react";
import Image from "next/legacy/image";
import styled from "styled-components";
import { motion } from "framer-motion";

import { Layout } from "../../components/Layout";
import { SEO } from "../../components/SEO";
import { ScrollReveal, ScrollRevealContainer, ScrollRevealItem } from "../../components/ScrollReveal";
import { TeamMemberModal, TeamMember } from "../../components/TeamMemberModal";
import { colors, spacing, typography, mediaQueries, borderRadius, shadows } from "../../lib/theme";
import { OUR_TEAM } from "../../lib/constants";

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Page wrapper
 */
const Wrapper = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

/**
 * Page title
 */
const PageTitle = styled.h1`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  text-align: center;
  margin-bottom: ${spacing[16]};
  
  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize['3xl']};
    margin-bottom: ${spacing[12]};
  }
  
  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize['2xl']};
  }
`;

/**
 * Team members grid (desktop/tablet)
 */
const TeamGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${spacing[8]};
  
  @media ${mediaQueries.laptopAndDown} {
    grid-template-columns: repeat(3, 1fr);
    gap: ${spacing[6]};
  }
  
  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: repeat(2, 1fr);
    gap: ${spacing[6]};
  }
  
  @media ${mediaQueries.mobileAndDown} {
    display: none;
  }
`;

/**
 * Team list (mobile only)
 */
const TeamList = styled.div`
  display: none;
  
  @media ${mediaQueries.mobileAndDown} {
    display: flex;
    flex-direction: column;
    gap: ${spacing[1]};
  }
`;

/**
 * Individual team member card (desktop/tablet)
 */
const TeamCard = styled(motion.div)`
  background-color: ${colors.neutral.white};
  border-radius: ${borderRadius['2xl']};
  overflow: hidden;
  box-shadow: ${shadows.base};
  cursor: pointer;
  transition: all 0.3s ease-out;
  
  &:hover {
    box-shadow: ${shadows.xl};
    transform: translateY(-8px);
    
    .image-wrapper {
      transform: scale(1.05);
    }
    
    .member-name {
      color: ${colors.accent.main};
    }
  }
`;

/**
 * Team member row (mobile only)
 */
const TeamRow = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[4]};
  background-color: ${colors.neutral.white};
  border-radius: ${borderRadius.lg};
  border: 1px solid ${colors.neutral.gray200};
  cursor: pointer;
  transition: all 0.2s ease-out;
  
  &:hover {
    background-color: ${colors.primary.main};
    border-color: ${colors.primary.main};
    
    .row-name {
      color: ${colors.neutral.white};
    }
    
    .row-role {
      color: ${colors.complimentary.light};
    }
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

/**
 * Row content wrapper
 */
const RowContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[1]};
`;

/**
 * Row name
 */
const RowName = styled.div`
  font-size: ${typography.fontSize.base};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.primary.main};
  transition: color 0.2s ease-out;
`;

/**
 * Row role
 */
const RowRole = styled.div`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.accent.main};
  font-style: italic;
  transition: color 0.2s ease-out;
`;

/**
 * Image container (desktop/tablet only)
 * Crops from top to keep faces visible
 */
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1;
  overflow: hidden;
  background-color: ${colors.neutral.gray100};
  transition: transform 0.3s ease-out;
  
  /* Ensure images crop from top, keeping heads visible */
  img {
    object-position: top center !important;
  }
`;

/**
 * Card content (desktop/tablet only)
 */
const CardContent = styled.div`
  padding: ${spacing[4]};
`;

/**
 * Member name (desktop/tablet only)
 */
const MemberName = styled.h2`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.primary.main};
  margin: 0 0 ${spacing[2]} 0;
  transition: color 0.2s ease-out;
`;

/**
 * Member role (desktop/tablet only)
 */
const MemberRole = styled.p`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.accent.main};
  font-style: italic;
  margin: 0;
`;

// ============================================================================
// COMPONENT
// ============================================================================

export default function OurTeam({ ...pageProps }) {
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  /**
   * Open modal with selected team member
   */
  const handleCardClick = (member: TeamMember) => {
    setSelectedMember(member);
    setIsModalOpen(true);
  };

  /**
   * Close modal
   */
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  /**
   * Navigate to previous team member
   */
  const handlePrevious = () => {
    if (!selectedMember) return;
    const currentIndex = OUR_TEAM.findIndex(m => m.email === selectedMember.email);
    if (currentIndex > 0) {
      setSelectedMember(OUR_TEAM[currentIndex - 1]);
    }
  };

  /**
   * Navigate to next team member
   */
  const handleNext = () => {
    if (!selectedMember) return;
    const currentIndex = OUR_TEAM.findIndex(m => m.email === selectedMember.email);
    if (currentIndex < OUR_TEAM.length - 1) {
      setSelectedMember(OUR_TEAM[currentIndex + 1]);
    }
  };

  // Check if navigation is available
  const currentIndex = selectedMember 
    ? OUR_TEAM.findIndex(m => m.email === selectedMember.email)
    : -1;
  const hasPrevious = currentIndex > 0;
  const hasNext = currentIndex < OUR_TEAM.length - 1;

  return (
    <Layout>
      <SEO
        title="Our Team | BD Corporate Services d.o.o. Podgorica"
        description="Meet our experienced team of audit professionals from Big 4 firms. From junior to manager level, ready to support your audit needs."
        canonicalUrl="https://www.bdcs.me/our-team"
        ogUrl="https://www.bdcs.me/our-team"
        ogImgUrl="https://www.bdcs.me/logo.webp"
      />
      <Wrapper>
        {/* Page Title */}
        <ScrollReveal>
          <PageTitle>Meet our Team</PageTitle>
        </ScrollReveal>

        {/* Team Grid - Desktop/Tablet */}
        <ScrollRevealContainer staggerDelay={0.05}>
          <TeamGrid>
            {OUR_TEAM.map((member) => (
              <ScrollRevealItem key={member.email || member.name}>
                <TeamCard onClick={() => handleCardClick(member)}>
                  <ImageWrapper className="image-wrapper">
                    <Image
                      src={member.image}
                      alt={member.name}
                      layout="fill"
                      objectFit="cover"
                      objectPosition="top center"
                      quality={90}
                    />
                  </ImageWrapper>
                  <CardContent>
                    <MemberName className="member-name">{member.name}</MemberName>
                    <MemberRole>{member.role}</MemberRole>
                  </CardContent>
                </TeamCard>
              </ScrollRevealItem>
            ))}
          </TeamGrid>
        </ScrollRevealContainer>

        {/* Team List - Mobile Only */}
        <TeamList>
          {OUR_TEAM.map((member) => (
            <TeamRow
              key={member.email || member.name}
              onClick={() => handleCardClick(member)}
              whileTap={{ scale: 0.98 }}
            >
              <RowContent>
                <RowName className="row-name">{member.name}</RowName>
                <RowRole className="row-role">{member.role}</RowRole>
              </RowContent>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                style={{ flexShrink: 0, opacity: 0.5 }}
              >
                <path d="M9 18l6-6-6-6" />
              </svg>
            </TeamRow>
          ))}
        </TeamList>
      </Wrapper>

      {/* Team Member Modal */}
      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        member={selectedMember}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={hasPrevious}
        hasNext={hasNext}
      />
    </Layout>
  );
}
