/**
 * Layout Component
 *
 * Main layout wrapper for page content
 * Handles page transitions and overall structure
 */

import { motion } from "framer-motion";
import styled from "styled-components";
import { pageTransition } from "../lib/animations";
import { mediaQueries, spacing } from "../lib/theme";

// ============================================================================
// TYPES
// ============================================================================

interface LayoutProps {
  children: React.ReactNode;
  /** Set padding-bottom to 0 */
  noBottomPadding?: boolean;
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Main content wrapper with animations
 */
const Content = styled(motion.main)<{ $noBottomPadding?: boolean }>`
  flex: 1;
  width: 100%;
  padding-top: ${spacing[16]};
  padding-left: ${spacing[8]};
  padding-right: ${spacing[8]};
  padding-bottom: ${({ $noBottomPadding }) =>
    $noBottomPadding ? "0" : spacing[16]};
  overflow-x: clip;

  @media ${mediaQueries.tabletAndDown} {
    padding-top: ${spacing[12]};
    padding-left: ${spacing[6]};
    padding-right: ${spacing[6]};
    padding-bottom: ${({ $noBottomPadding }) =>
      $noBottomPadding ? "0" : spacing[12]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding-top: ${spacing[8]};
    padding-left: ${spacing[4]};
    padding-right: ${spacing[4]};
    padding-bottom: ${({ $noBottomPadding }) =>
      $noBottomPadding ? "0" : spacing[8]};
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Layout wrapper with page transition animations
 */
export function Layout({ children, noBottomPadding }: LayoutProps) {
  return (
    <Content
      $noBottomPadding={noBottomPadding}
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
      transition={{
        duration: 0.4,
        ease: "easeOut",
      }}
    >
      {children}
    </Content>
  );
}
