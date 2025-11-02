/**
 * SectionTitle Component
 * 
 * Consistent section heading component with optional subtitle
 * Includes built-in animations and responsive styling
 */

import styled from 'styled-components';
import { motion } from 'framer-motion';
import { colors, typography, spacing, mediaQueries } from '../lib/theme';
import { textReveal, textStaggerContainer, textStaggerLine } from '../lib/animations';

// ============================================================================
// TYPES
// ============================================================================

interface SectionTitleProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center' | 'right';
  animated?: boolean;
  className?: string;
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const TitleWrapper = styled(motion.div)<{ align: 'left' | 'center' | 'right' }>`
  text-align: ${({ align }) => align};
  margin-bottom: ${spacing[12]};
  
  @media ${mediaQueries.mobileAndDown} {
    margin-bottom: ${spacing[8]};
  }
`;

const Title = styled(motion.h2)`
  font-size: ${typography.fontSize['4xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  line-height: ${typography.lineHeight.tight};
  margin-bottom: ${spacing[4]};
  
  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize['3xl']};
  }
  
  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize['2xl']};
  }
`;

const Subtitle = styled(motion.p)`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.light};
  color: ${colors.secondary.lighter};
  line-height: ${typography.lineHeight.relaxed};
  max-width: 600px;
  margin: 0 auto;
  
  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize.base};
  }
`;

const Divider = styled(motion.div)<{ align: 'left' | 'center' | 'right' }>`
  width: 60px;
  height: 4px;
  background: linear-gradient(
    to right,
    ${colors.accent.main},
    ${colors.complimentary.main}
  );
  border-radius: 2px;
  margin-top: ${spacing[4]};
  margin-bottom: ${spacing[4]};
  
  ${({ align }) => {
    if (align === 'center') return 'margin-left: auto; margin-right: auto;';
    if (align === 'right') return 'margin-left: auto;';
    return '';
  }}
`;

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * SectionTitle - Consistent heading component for page sections
 */
export const SectionTitle: React.FC<SectionTitleProps> = ({
  title,
  subtitle,
  align = 'center',
  animated = true,
  className,
}) => {
  if (animated) {
    return (
      <TitleWrapper
        align={align}
        className={className}
        variants={textStaggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
      >
        <Title variants={textStaggerLine}>{title}</Title>
        <Divider
          align={align}
          variants={textStaggerLine}
        />
        {subtitle && (
          <Subtitle variants={textStaggerLine}>{subtitle}</Subtitle>
        )}
      </TitleWrapper>
    );
  }

  return (
    <TitleWrapper align={align} className={className}>
      <Title>{title}</Title>
      <Divider align={align} />
      {subtitle && <Subtitle>{subtitle}</Subtitle>}
    </TitleWrapper>
  );
};

// ============================================================================
// SIMPLE VARIANTS (for use in styled-components)
// ============================================================================

/**
 * Simple heading - for use without the full SectionTitle component
 */
export const Heading = styled.h2`
  font-size: ${typography.fontSize['3xl']};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  line-height: ${typography.lineHeight.tight};
  margin-bottom: ${spacing[6]};
  
  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize['2xl']};
  }
  
  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.xl};
  }
`;

/**
 * Simple subheading
 */
export const Subheading = styled.h3`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.primary.main};
  line-height: ${typography.lineHeight.snug};
  margin-bottom: ${spacing[4]};
  
  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.lg};
  }
`;

