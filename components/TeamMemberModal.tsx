/**
 * TeamMemberModal Component
 *
 * Modal for displaying detailed team member information
 * Features smooth animations, prev/next navigation, and accessibility
 */

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/legacy/image";
import React, { useEffect } from "react";
import styled from "styled-components";

import {
  borderRadius,
  colors,
  mediaQueries,
  shadows,
  spacing,
  typography,
  zIndex,
} from "../lib/theme";
import { IconButton } from "./Button";

// ============================================================================
// TYPES
// ============================================================================

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image: any;
  email?: string;
  phone?: string;
  linkedin?: string;
}

interface TeamMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: TeamMember | null;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Modal backdrop overlay
 */
const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.75);
  z-index: ${zIndex.modalBackdrop};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[4]};
  overflow-y: auto;
`;

/**
 * Modal content container
 */
const ModalContainer = styled(motion.div)`
  background-color: ${colors.neutral.white};
  border-radius: ${borderRadius["3xl"]};
  box-shadow: ${shadows["2xl"]};
  max-width: 900px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;
  position: relative;

  @media ${mediaQueries.mobileAndDown} {
    max-height: 95vh;
    border-radius: ${borderRadius["2xl"]};
  }
`;

/**
 * Close button
 */
const CloseButton = styled(IconButton)`
  position: absolute;
  top: ${spacing[4]};
  right: ${spacing[4]};
  z-index: 10;
  background-color: ${colors.neutral.white};
  box-shadow: ${shadows.md};

  &:hover {
    background-color: ${colors.neutral.gray100};
  }
`;

/**
 * Modal content grid
 */
const ModalContent = styled.div`
  display: grid;
  grid-template-columns: 300px 1fr;
  gap: ${spacing[8]};
  padding: ${spacing[8]};

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[6]};
    padding: ${spacing[6]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[4]};
  }
`;

/**
 * Image section
 */
const ImageSection = styled.div`
  position: relative;
  width: 100%;

  @media ${mediaQueries.tabletAndDown} {
    width: 300px;
    margin: 0 auto;
  }

  @media ${mediaQueries.mobileAndDown} {
    width: 200px;
  }
`;

/**
 * Image wrapper
 * Crops from top to keep faces visible
 */
const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: 100%; /* 1:1 aspect ratio */
  border-radius: ${borderRadius["2xl"]};
  overflow: hidden;
  box-shadow: ${shadows.lg};
  margin-bottom: ${spacing[4]};

  /* Ensure images crop from top, keeping heads visible */
  img {
    object-position: top center !important;
  }

  @media ${mediaQueries.mobileAndDown} {
    border-radius: ${borderRadius.xl};
    margin-bottom: ${spacing[3]};
  }
`;

/**
 * Info section
 */
const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
  padding-top: ${spacing[12]};

  @media ${mediaQueries.tabletAndDown} {
    padding-top: 0;
  }
`;

/**
 * Member name
 */
const MemberName = styled.h2`
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  margin: 0;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["2xl"]};
  }
`;

/**
 * Member role
 */
const MemberRole = styled.p`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.accent.main};
  font-style: italic;
  margin: 0;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.lg};
  }
`;

/**
 * Member bio
 */
const MemberBio = styled.p`
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.secondary.lighter};
  margin: ${spacing[4]} 0;
`;

/**
 * Contact information section
 */
const ContactInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
  padding-top: ${spacing[4]};
  border-top: 1px solid ${colors.neutral.gray200};
`;

/**
 * Contact item
 */
const ContactItem = styled.a`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  color: ${colors.secondary.main};
  text-decoration: none;
  font-size: ${typography.fontSize.sm};
  transition: color 0.2s ease-out;

  &:hover {
    color: ${colors.accent.main};
  }

  svg {
    width: 16px;
    height: 16px;
  }
`;

/**
 * Navigation buttons container
 */
const NavButtons = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 ${spacing[4]} ${spacing[4]};

  @media ${mediaQueries.mobileAndDown} {
    padding: 0 ${spacing[2]} ${spacing[4]};
  }
`;

/**
 * Nav button
 */
const NavButton = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  padding: ${spacing[2]} ${spacing[4]};
  background-color: ${colors.primary.main};
  color: ${colors.neutral.white};
  border: none;
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.2s ease-out;

  &:hover:not(:disabled) {
    background-color: ${colors.primary.light};
  }

  &:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  isOpen,
  onClose,
  member,
  onPrevious,
  onNext,
  hasPrevious = false,
  hasNext = false,
}) => {
  /**
   * Close modal on Escape key
   */
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      // Prevent body scroll when modal is open
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  /**
   * Handle keyboard navigation (arrow keys)
   */
  useEffect(() => {
    const handleArrowKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft" && hasPrevious && onPrevious) {
        onPrevious();
      } else if (e.key === "ArrowRight" && hasNext && onNext) {
        onNext();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleArrowKeys);
    }

    return () => {
      document.removeEventListener("keydown", handleArrowKeys);
    };
  }, [isOpen, hasPrevious, hasNext, onPrevious, onNext]);

  if (!member) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <Backdrop
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <ModalContainer
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <CloseButton onClick={onClose} aria-label="Close modal">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </CloseButton>

            {/* Modal Content */}
            <ModalContent>
              {/* Image Section */}
              <ImageSection>
                <ImageWrapper>
                  <Image
                    src={member.image}
                    alt={member.name}
                    layout="fill"
                    objectFit="cover"
                    objectPosition="top center"
                    quality={100}
                  />
                </ImageWrapper>
              </ImageSection>

              {/* Info Section */}
              <InfoSection>
                <div>
                  <MemberName>{member.name}</MemberName>
                  <MemberRole>{member.role}</MemberRole>
                </div>

                <MemberBio>{member.bio}</MemberBio>

                {/* Contact Information */}
                {(member.email || member.phone || member.linkedin) && (
                  <ContactInfo>
                    {member.email && (
                      <ContactItem href={`mailto:${member.email}`}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                        {member.email}
                      </ContactItem>
                    )}
                    {member.phone && (
                      <ContactItem href={`tel:${member.phone}`}>
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                        {member.phone}
                      </ContactItem>
                    )}
                    {member.linkedin && (
                      <ContactItem
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <svg viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z" />
                        </svg>
                        LinkedIn Profile
                      </ContactItem>
                    )}
                  </ContactInfo>
                )}
              </InfoSection>
            </ModalContent>

            {/* Navigation Buttons */}
            {(onPrevious || onNext) && (
              <NavButtons>
                <NavButton
                  onClick={onPrevious}
                  disabled={!hasPrevious}
                  whileHover={{ scale: hasPrevious ? 1.05 : 1 }}
                  whileTap={{ scale: hasPrevious ? 0.95 : 1 }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="16"
                    height="16"
                  >
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                  Previous
                </NavButton>
                <NavButton
                  onClick={onNext}
                  disabled={!hasNext}
                  whileHover={{ scale: hasNext ? 1.05 : 1 }}
                  whileTap={{ scale: hasNext ? 0.95 : 1 }}
                >
                  Next
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="16"
                    height="16"
                  >
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </NavButton>
              </NavButtons>
            )}
          </ModalContainer>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
