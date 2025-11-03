/**
 * Dialog Component
 *
 * Success modal dialog matching the redesigned aesthetic
 * Features smooth animations and modern styling
 */

import { AnimatePresence, motion } from "framer-motion";
import styled from "styled-components";

import { backdropFade, modalContent } from "../lib/animations";
import {
  borderRadius,
  colors,
  mediaQueries,
  shadows,
  spacing,
  typography,
} from "../lib/theme";
import { Button } from "./Button";

// ============================================================================
// TYPES
// ============================================================================

interface IDialogProps {
  showModal: boolean;
  showModalSet: (showModal: boolean) => void;
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Modal backdrop with blur effect
 */
const ModalOverlay = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${spacing[4]};
`;

/**
 * Modal container
 */
const Modal = styled(motion.div)`
  position: relative;
  width: 100%;
  max-width: 480px;
  background-color: ${colors.neutral.white};
  border-radius: ${borderRadius["3xl"]};
  box-shadow: ${shadows["2xl"]};
  padding: ${spacing[10]} ${spacing[8]};
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[8]} ${spacing[6]};
    max-width: 100%;
  }
`;

/**
 * Success icon wrapper with animated checkmark
 */
const IconWrapper = styled(motion.div)`
  width: 80px;
  height: 80px;
  border-radius: ${borderRadius.full};
  background: linear-gradient(
    135deg,
    ${colors.success},
    rgba(16, 185, 129, 0.85)
  );
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${spacing[6]};
  box-shadow: 0 8px 24px -4px rgba(16, 185, 129, 0.3);

  @media ${mediaQueries.mobileAndDown} {
    width: 64px;
    height: 64px;
    margin-bottom: ${spacing[4]};
  }
`;

/**
 * Checkmark SVG icon
 */
const CheckmarkIcon = styled(motion.svg)`
  width: 48px;
  height: 48px;

  @media ${mediaQueries.mobileAndDown} {
    width: 36px;
    height: 36px;
  }
`;

/**
 * Content container
 */
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[3]};
  margin-bottom: ${spacing[8]};
`;

/**
 * Success title
 */
const Title = styled.h2`
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  margin: 0;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.xl};
  }
`;

/**
 * Success message
 */
const Message = styled.p`
  font-size: ${typography.fontSize.base};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.secondary.lighter};
  margin: 0;

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.sm};
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

/**
 * Checkmark path animation
 */
const checkmarkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: { duration: 0.5, ease: "easeInOut", delay: 0.2 },
      opacity: { duration: 0.3, delay: 0.2 },
    },
  },
};

/**
 * Icon container animation
 */
const iconContainerVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 15,
    },
  },
};

export function Dialog({ showModal, showModalSet }: IDialogProps) {
  const handleClose = () => {
    showModalSet(false);
  };

  return (
    <AnimatePresence>
      {showModal && (
        <ModalOverlay
          variants={backdropFade}
          initial="hidden"
          animate="visible"
          exit="exit"
          onClick={handleClose}
        >
          <Modal
            variants={modalContent}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Animated Success Icon */}
            <IconWrapper
              variants={iconContainerVariants}
              initial="hidden"
              animate="visible"
            >
              <CheckmarkIcon
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <motion.path
                  d="M20 6L9 17l-5-5"
                  stroke={colors.neutral.white}
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  variants={checkmarkVariants}
                  initial="hidden"
                  animate="visible"
                />
              </CheckmarkIcon>
            </IconWrapper>

            {/* Content */}
            <Content>
              <Title>Thank You!</Title>
              <Message>
                Your details have been successfully submitted. We'll get back to
                you soon.
              </Message>
            </Content>

            {/* Close Button */}
            <Button
              variant="primary"
              size="large"
              onClick={handleClose}
              fullWidth
            >
              Close
            </Button>
          </Modal>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
}
