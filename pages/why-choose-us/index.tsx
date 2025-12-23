/**
 * Why Choose Us Page
 *
 * Features our competitive advantages with interactive cards
 * Includes hover effects and scroll animations
 */

import { motion } from "framer-motion";
import Image from "next/legacy/image";
import styled from "styled-components";

import { Layout } from "../../components/Layout";
import { SEO } from "../../components/SEO";
import { WHY_CHOOSE_US } from "../../lib/constants";
import {
  borderRadius,
  colors,
  mediaQueries,
  shadows,
  spacing,
  typography,
} from "../../lib/theme";

import whyResource from "../../public/assets/chooseUs.webp";

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Page wrapper
 */
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

/**
 * Page title
 */
const PageTitle = styled.h1`
  font-size: ${typography.fontSize["4xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  text-align: center;
  margin-bottom: ${spacing[16]};

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize["3xl"]};
    margin-bottom: ${spacing[12]};
  }

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["2xl"]};
  }
`;

/**
 * Features grid
 * All cards will have equal heights in their row
 */
const FeaturesGrid = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${spacing[8]};
  margin-bottom: ${spacing[16]};

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[6]};
  }
`;

/**
 * Feature card with hover effects
 * Flex layout ensures content fills the card height
 */
const FeatureCard = styled(motion.article)`
  background-color: ${colors.neutral.white};
  padding: ${spacing[8]};
  border-radius: ${borderRadius["2xl"]};
  border: 2px solid ${colors.neutral.gray200};
  box-shadow: ${shadows.base};
  transition: all 0.3s ease-out;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  -webkit-tap-highlight-color: transparent;

  /* Only apply hover effects on devices with hover capability */
  @media (hover: hover) and (pointer: fine) {
    &:hover {
      border-color: ${colors.accent.main};
      box-shadow: ${shadows.xl};
      transform: translateY(-8px);

      /* Icon animation on hover */
      .icon-wrapper {
        background: linear-gradient(
          135deg,
          ${colors.accent.main},
          ${colors.complimentary.main}
        );
        transform: scale(1.1) rotate(5deg);
      }

      /* SVG color change on hover */
      svg {
        fill: ${colors.neutral.white};
      }
    }
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[6]};
  }
`;

/**
 * Card header with icon
 */
const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  margin-bottom: ${spacing[4]};
`;

/**
 * Icon wrapper with gradient background
 */
const IconWrapper = styled.div`
  width: 64px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${colors.primary.main};
  border-radius: ${borderRadius.xl};
  transition: all 0.3s ease-out;
  flex-shrink: 0;

  svg {
    width: 36px;
    height: 36px;
    fill: ${colors.neutral.white};
    transition: fill 0.3s ease-out;
  }
`;

/**
 * Feature title
 */
const FeatureTitle = styled.h2`
  font-size: ${typography.fontSize.xl};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.primary.main};
  margin: 0;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.lg};
  }
`;

/**
 * Feature description
 */
const FeatureDescription = styled.p`
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.secondary.lighter};
  margin: 0;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.sm};
  }
`;

/**
 * Image section
 */
const ImageSection = styled.section`
  margin-top: ${spacing[16]};
  border-radius: ${borderRadius["3xl"]};
  overflow: hidden;
  box-shadow: ${shadows.xl};
`;

// ============================================================================
// COMPONENT
// ============================================================================

export default function WhyChooseUs({ ...pageProps }) {
  // Animation variants for staggered card entrance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <Layout>
      <SEO
        title="Why Choose Us | BD Corporate Services d.o.o. Podgorica"
        description="Professional approach. Competitive pricing. Personalised attention. National standards."
        canonicalUrl="https://www.bdcs.me/why-choose-us"
        ogUrl="https://www.bdcs.me/why-choose-us"
        ogImgUrl="https://www.bdcs.me/logo.webp"
      />
      <Wrapper>
        {/* Page Title */}
        <PageTitle>Why choose BD Corporate Services</PageTitle>

        {/* Features Grid */}
        <FeaturesGrid
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {WHY_CHOOSE_US.map(({ title, description, image }) => (
            <FeatureCard key={title} variants={cardVariants}>
              <CardHeader>
                <IconWrapper className="icon-wrapper">{image}</IconWrapper>
                <FeatureTitle>{title}</FeatureTitle>
              </CardHeader>
              <FeatureDescription>{description}</FeatureDescription>
            </FeatureCard>
          ))}
        </FeaturesGrid>

        {/* Image Section */}
        <ImageSection>
          <Image
            src={whyResource}
            alt="By choosing us, you won't make a mistake"
            layout="responsive"
            quality={100}
          />
        </ImageSection>
      </Wrapper>
    </Layout>
  );
}
