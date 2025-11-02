/**
 * Card Component
 * 
 * Flexible card container with optional hover effects
 * Used for content sections, team members, features, etc.
 */

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, spacing, borderRadius, shadows, transitions, mediaQueries } from '../lib/theme';

// ============================================================================
// TYPES
// ============================================================================

interface CardProps {
  elevated?: boolean;
  hoverable?: boolean;
  padding?: 'none' | 'small' | 'medium' | 'large';
  noBorder?: boolean;
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Base card component with motion animations
 */
export const Card = styled(motion.div)<CardProps>`
  background-color: ${colors.neutral.white};
  border-radius: ${borderRadius['2xl']};
  border: 1px solid ${({ noBorder }) => 
    noBorder ? 'transparent' : colors.neutral.gray200};
  transition: ${transitions.default};
  
  /* Elevation/shadow */
  ${({ elevated }) => elevated && `
    box-shadow: ${shadows.lg};
  `}
  
  /* Padding variants */
  ${({ padding = 'medium' }) => {
    switch (padding) {
      case 'none':
        return `padding: 0;`;
      case 'small':
        return `
          padding: ${spacing[4]};
          
          @media ${mediaQueries.tabletAndUp} {
            padding: ${spacing[6]};
          }
        `;
      case 'large':
        return `
          padding: ${spacing[8]};
          
          @media ${mediaQueries.tabletAndUp} {
            padding: ${spacing[12]};
          }
        `;
      case 'medium':
      default:
        return `
          padding: ${spacing[6]};
          
          @media ${mediaQueries.tabletAndUp} {
            padding: ${spacing[8]};
          }
        `;
    }
  }}
  
  /* Hoverable effect */
  ${({ hoverable }) => hoverable && `
    cursor: pointer;
    
    &:hover {
      box-shadow: ${shadows.xl};
      transform: translateY(-4px);
      border-color: ${colors.primary.lightest};
    }
    
    &:active {
      transform: translateY(-2px);
    }
  `}
`;

// ============================================================================
// CARD VARIANTS
// ============================================================================

/**
 * Feature card with icon
 * Used for service highlights, benefits, etc.
 */
export const FeatureCard = styled(Card)`
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${spacing[4]};
  height: 100%;
`;

/**
 * Card header section
 */
export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${spacing[4]};
  padding-bottom: ${spacing[4]};
  border-bottom: 1px solid ${colors.neutral.gray200};
`;

/**
 * Card title
 */
export const CardTitle = styled.h3`
  font-size: ${spacing[5]};
  font-weight: 600;
  color: ${colors.primary.main};
  margin: 0;
`;

/**
 * Card body/content section
 */
export const CardContent = styled.div`
  flex: 1;
  color: ${colors.secondary.main};
`;

/**
 * Card footer section
 */
export const CardFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: ${spacing[4]};
  padding-top: ${spacing[4]};
  border-top: 1px solid ${colors.neutral.gray200};
`;

/**
 * Icon container for cards
 */
export const CardIcon = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary.main};
  color: ${colors.neutral.white};
  border-radius: ${borderRadius.xl};
  margin-bottom: ${spacing[4]};
  
  svg {
    width: 32px;
    height: 32px;
  }
`;

/**
 * Image card - card with image at top
 */
export const ImageCard = styled(Card)`
  overflow: hidden;
  padding: 0;
  
  img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }
`;

/**
 * Image card content (goes below image)
 */
export const ImageCardContent = styled.div`
  padding: ${spacing[6]};
  
  @media ${mediaQueries.tabletAndUp} {
    padding: ${spacing[8]};
  }
`;

