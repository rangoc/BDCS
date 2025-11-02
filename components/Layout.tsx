/**
 * Layout Component
 * 
 * Main layout wrapper for page content
 * Handles page transitions and overall structure
 */

import styled from "styled-components";
import { motion } from "framer-motion";
import { spacing, mediaQueries } from "../lib/theme";
import { pageTransition } from "../lib/animations";

// ============================================================================
// TYPES
// ============================================================================

interface LayoutProps {
  children: React.ReactNode;
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Main content wrapper with animations
 */
const Content = styled(motion.main)`
  flex: 1;
  width: 100%;
  padding: ${spacing[16]} ${spacing[8]};
  overflow-x: clip;
  
  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[12]} ${spacing[6]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[8]} ${spacing[4]};
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Layout wrapper with page transition animations
 */
export function Layout({ children }: LayoutProps) {
  return (
    <Content
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={pageTransition}
      transition={{
        duration: 0.4,
        ease: 'easeOut',
      }}
    >
      {children}
    </Content>
  );
}
