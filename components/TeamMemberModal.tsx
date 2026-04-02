/**
 * TeamMemberModal Component — Ultra-Minimal
 *
 * No image, pure typography with gold top accent border.
 * Role above name, clean bio, simple contact links at bottom.
 * Escape to close, click backdrop to close.
 */

import { AnimatePresence, motion } from "framer-motion";
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
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const Backdrop = styled(motion.div)`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: ${zIndex.modalBackdrop};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[4]};
  overflow-y: auto;
`;

const ModalCard = styled(motion.div)`
  background: ${colors.neutral.white};
  border-radius: ${borderRadius["2xl"]};
  max-width: 480px;
  width: 100%;
  padding: ${spacing[8]};
  position: relative;
  box-shadow: ${shadows["2xl"]};
  border-top: 3px solid ${colors.complimentary.main};

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[6]} ${spacing[5]};
    margin: ${spacing[4]};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: ${spacing[4]};
  right: ${spacing[4]};
  width: 32px;
  height: 32px;
  border-radius: ${borderRadius.full};
  border: none;
  background: transparent;
  color: ${colors.neutral.gray400};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;

  &:hover {
    color: ${colors.primary.main};
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent.main};
    outline-offset: 3px;
  }
`;

const MemberRole = styled.p`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.complimentary.dark};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 0 0 ${spacing[3]};
`;

const MemberName = styled.h2`
  font-family: ${typography.fontFamily.heading};
  font-size: ${typography.fontSize["3xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  margin: 0 0 ${spacing[5]};
  line-height: ${typography.lineHeight.tight};
  padding-right: ${spacing[8]};

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["2xl"]};
  }
`;

const MemberBio = styled.p`
  font-size: ${typography.fontSize.sm};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.neutral.gray500};
  margin: 0 0 ${spacing[6]};
`;

const ContactLinks = styled.div`
  display: flex;
  gap: ${spacing[4]};
  padding-top: ${spacing[4]};
  border-top: 1px solid ${colors.neutral.gray100};
`;

const ContactLink = styled.a`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.medium};
  color: ${colors.primary.main};
  text-decoration: none;
  transition: color 0.2s;

  &:hover {
    color: ${colors.complimentary.dark};
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

export const TeamMemberModal: React.FC<TeamMemberModalProps> = ({
  isOpen,
  onClose,
  member,
}) => {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

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
          <ModalCard
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <CloseButton onClick={onClose} aria-label="Close modal">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </CloseButton>

            <MemberRole>{member.role}</MemberRole>
            <MemberName>{member.name}</MemberName>
            <MemberBio>{member.bio}</MemberBio>

            {(member.email || member.phone || member.linkedin) && (
              <ContactLinks>
                {member.email && (
                  <ContactLink href={`mailto:${member.email}`}>
                    Email
                  </ContactLink>
                )}
                {member.phone && (
                  <ContactLink href={`tel:${member.phone}`}>
                    Phone
                  </ContactLink>
                )}
                {member.linkedin && (
                  <ContactLink
                    href={member.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    LinkedIn
                  </ContactLink>
                )}
              </ContactLinks>
            )}
          </ModalCard>
        </Backdrop>
      )}
    </AnimatePresence>
  );
};
