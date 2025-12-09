/**
 * About Us Page
 *
 * Company information with Mission, Vision, and Values switcher
 * Features smooth animations and responsive design
 */

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/legacy/image";
import { useState } from "react";
import styled from "styled-components";

import { Layout } from "../../components/Layout";
import { SEO } from "../../components/SEO";
import { ABOUT_US } from "../../lib/constants";
import {
  borderRadius,
  colors,
  mediaQueries,
  shadows,
  spacing,
  typography,
} from "../../lib/theme";
import about from "../../public/assets/about.webp";

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Page wrapper with load-in animation
 */
const Wrapper = styled(motion.div)`
  max-width: 1200px;
  margin: 0 auto;
`;

/**
 * Main intro section
 */
const IntroSection = styled.section`
  margin-bottom: ${spacing[16]};
`;

/**
 * Section title
 * Changed from h1 to h2 to avoid deprecation warning (h1 inside section)
 */
const SectionTitle = styled.h2`
  font-size: ${typography.fontSize["4xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  margin-bottom: ${spacing[6]};

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize["3xl"]};
  }

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["2xl"]};
  }
`;

/**
 * Description text
 */
const Description = styled.p`
  font-size: ${typography.fontSize.lg};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.secondary.lighter};

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize.base};
  }
`;

/**
 * Mission/Vision/Values section
 */
const MVVSection = styled.section`
  margin-bottom: ${spacing[16]};
`;

/**
 * Timeline layout container
 */
const TimelineContainer = styled.div`
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: ${spacing[12]};

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 150px 1fr;
    gap: ${spacing[8]};
  }

  @media ${mediaQueries.mobileAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[6]};
  }
`;

/**
 * Timeline sidebar with items
 */
const TimelineSidebar = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  min-height: 400px;

  @media ${mediaQueries.mobileAndDown} {
    flex-direction: row;
    justify-content: space-around;
    min-height: auto;
  }
`;

/**
 * Vertical connecting line
 */
const TimelineLine = styled.div`
  position: absolute;
  left: 15px;
  top: 16px;
  bottom: 16px;
  width: 3px;
  background-color: ${colors.neutral.gray200};

  @media ${mediaQueries.mobileAndDown} {
    display: none;
  }
`;

/**
 * Animated progress line
 * Fills from first dot to current dot
 */
const TimelineProgress = styled(motion.div)<{ $currentIndex: number }>`
  position: absolute;
  left: 15px;
  top: 16px;
  width: 3px;
  background: linear-gradient(
    to bottom,
    ${colors.accent.main},
    ${colors.complimentary.main}
  );
  height: ${({ $currentIndex }) => `calc(${$currentIndex * 50}% - 15px)`};
  transition: height 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  @media ${mediaQueries.mobileAndDown} {
    display: none;
  }
`;

/**
 * Individual timeline item
 */
const TimelineItem = styled(motion.div)<{ $isActive: boolean }>`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
  cursor: pointer;
  position: relative;
  z-index: 1;

  @media ${mediaQueries.mobileAndDown} {
    flex-direction: column;
    gap: ${spacing[2]};
  }
`;

/**
 * Timeline dot indicator
 */
const TimelineDot = styled(motion.div)<{ $isActive: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${({ $isActive }) =>
    $isActive ? colors.accent.main : colors.neutral.white};
  border: 3px solid
    ${({ $isActive }) =>
      $isActive ? colors.accent.main : colors.neutral.gray300};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  transition: all 0.3s ease-out;
  box-shadow: ${({ $isActive }) =>
    $isActive ? shadows.accentGlow : shadows.sm};

  /* Number inside dot */
  color: ${({ $isActive }) =>
    $isActive ? colors.neutral.white : colors.secondary.lighter};
  font-weight: ${typography.fontWeight.bold};
  font-size: ${typography.fontSize.sm};
`;

/**
 * Timeline label
 */
const TimelineLabel = styled.div<{ $isActive: boolean }>`
  font-size: ${typography.fontSize.lg};
  font-weight: ${({ $isActive }) =>
    $isActive ? typography.fontWeight.bold : typography.fontWeight.medium};
  color: ${({ $isActive }) =>
    $isActive ? colors.primary.main : colors.secondary.lighter};
  transition: all 0.3s ease-out;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.sm};
    text-align: center;
  }
`;

/**
 * Content area
 * Uses relative positioning for natural flow
 */
const ContentArea = styled.div`
  position: relative;
`;

/**
 * Content container with animation
 * Natural height to prevent overflow
 */
const ContentContainer = styled(motion.div)`
  width: 100%;
  background-color: ${colors.neutral.white};
  padding: ${spacing[8]};
  border-radius: ${borderRadius["2xl"]};
  box-shadow: ${shadows.lg};
  border: 2px solid ${colors.accent.main};

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[6]};
  }
`;

/**
 * Content text with HTML support
 */
const ContentText = styled.div`
  font-size: ${typography.fontSize.lg};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.secondary.main};

  strong {
    color: ${colors.primary.main};
    font-weight: ${typography.fontWeight.semibold};
  }

  br {
    display: block;
    margin-bottom: ${spacing[3]};
  }

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize.base};
  }
`;

/**
 * Image section
 */
const ImageSection = styled.section`
  border-radius: ${borderRadius["3xl"]};
  overflow: hidden;
  box-shadow: ${shadows.xl};
`;

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const contentVariants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.3,
      ease: "easeIn",
    },
  },
};

// ============================================================================
// COMPONENT
// ============================================================================

export default function About({ ...pageProps }) {
  const [selectedItem, setSelectedItem] = useState<string>("Mission");

  const handleClick = (title: string) => {
    setSelectedItem(title);
  };

  // Find current content and current index for progress line
  const currentIndex = ABOUT_US.findIndex(
    (item) => item.title === selectedItem
  );
  const currentContent = ABOUT_US.find((item) => item.title === selectedItem);

  return (
    <Layout>
      <SEO
        title="About Us | BD Corporate Services d.o.o. Podgorica"
        description="BDCS explores and realizes opportunities with the provision of high quality in accounting and audit services that go beyond cost reductions."
        canonicalUrl="https://www.bdcs.me/about"
        ogUrl="https://www.bdcs.me/about"
        ogImgUrl="https://www.bdcs.me/logo.webp"
      />
      <Wrapper
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Intro Section */}
        <IntroSection>
          <SectionTitle>About BD Corporate Services</SectionTitle>
          <Description>
            BD Corporate services is an outsourcing firm consisting of highly
            dedicated experienced staff with different knowledge within audit
            gained at Big 4 firms. We offer a flexible hybrid team from junior
            to manager level that will be able to respond on various audit
            tasks at your request. With all the experience gained in auditing
            the local Dutch companies reporting under Dutch GAAP, and the
            knowledge of various IFRS experts, we can ensure that our clients
            receive great support.
          </Description>
        </IntroSection>

        {/* Mission, Vision, Values Section - Timeline Style */}
        <MVVSection>
            <TimelineContainer>
              {/* Timeline Sidebar */}
              <TimelineSidebar>
                <TimelineLine />
                <TimelineProgress $currentIndex={currentIndex} />

                {ABOUT_US.map((item, index) => {
                  const isActive = selectedItem === item.title;
                  return (
                    <TimelineItem
                      key={item.title}
                      $isActive={isActive}
                      onClick={() => handleClick(item.title)}
                      whileHover={{ x: 4 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <TimelineDot
                        $isActive={isActive}
                        animate={{
                          scale: isActive ? 1.2 : 1,
                        }}
                        transition={{
                          type: "spring",
                          stiffness: 400,
                          damping: 17,
                        }}
                      >
                        {index + 1}
                      </TimelineDot>
                      <TimelineLabel $isActive={isActive}>
                        {item.title}
                      </TimelineLabel>
                    </TimelineItem>
                  );
                })}
              </TimelineSidebar>

              {/* Content Area */}
              <ContentArea>
                <AnimatePresence mode="wait">
                  {currentContent && (
                    <ContentContainer
                      key={currentContent.title}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{
                        duration: 0.4,
                        ease: "easeOut",
                      }}
                    >
                      <ContentText
                        dangerouslySetInnerHTML={{
                          __html: currentContent.description,
                        }}
                      />
                    </ContentContainer>
                  )}
                </AnimatePresence>
              </ContentArea>
            </TimelineContainer>
        </MVVSection>

        {/* Image Section */}
        <ImageSection>
          <Image
            src={about}
            alt="We care about our clients and products"
            layout="responsive"
            quality={100}
          />
        </ImageSection>
      </Wrapper>
    </Layout>
  );
}
