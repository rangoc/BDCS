/**
 * ScrollReveal Component
 * 
 * Wrapper component for scroll-triggered animations
 * Reveals content when it comes into view
 */

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { scrollReveal, scrollRevealContainer, scrollRevealItem } from '../lib/animations';

// ============================================================================
// TYPES
// ============================================================================

interface ScrollRevealProps {
  children: React.ReactNode;
  /** Animation variant to use */
  variant?: 'fade' | 'slideUp' | 'slideLeft' | 'slideRight' | 'scale';
  /** Custom animation variants */
  customVariants?: any;
  /** Delay before animation starts (in seconds) */
  delay?: number;
  /** Only animate once */
  once?: boolean;
  /** Amount of element that needs to be visible before triggering */
  amount?: number | 'some' | 'all';
  /** Margin around viewport for triggering animation */
  margin?: string;
  className?: string;
}

interface ScrollRevealContainerProps {
  children: React.ReactNode;
  /** Delay between each child animation (in seconds) */
  staggerDelay?: number;
  /** Only animate once */
  once?: boolean;
  className?: string;
}

// ============================================================================
// VARIANT PRESETS
// ============================================================================

const variants = {
  fade: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  slideUp: scrollReveal,
  slideLeft: {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  slideRight: {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.6, ease: 'easeOut' },
    },
  },
};

// ============================================================================
// COMPONENTS
// ============================================================================

/**
 * ScrollReveal - Animates element when scrolled into view
 */
export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  variant = 'slideUp',
  customVariants,
  delay = 0,
  once = true,
  amount = 0.3,
  margin = '-100px',
  className,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount, margin });

  const selectedVariants = customVariants || variants[variant];

  // Add delay to the visible variant
  const variantsWithDelay = React.useMemo(() => {
    if (delay === 0) return selectedVariants;

    return {
      ...selectedVariants,
      visible: {
        ...selectedVariants.visible,
        transition: {
          ...selectedVariants.visible.transition,
          delay,
        },
      },
    };
  }, [selectedVariants, delay]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variantsWithDelay}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScrollRevealContainer - Container for staggered child animations
 * Children will animate in sequence when scrolled into view
 */
export const ScrollRevealContainer: React.FC<ScrollRevealContainerProps> = ({
  children,
  staggerDelay = 0.15,
  once = true,
  className,
}) => {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once, amount: 0.3, margin: '-100px' });

  const containerVariants = React.useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: 0.1,
      },
    },
  }), [staggerDelay]);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/**
 * ScrollRevealItem - Individual item in a ScrollRevealContainer
 * Must be a direct child of ScrollRevealContainer
 */
export const ScrollRevealItem: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className,
}) => {
  return (
    <motion.div variants={scrollRevealItem} className={className}>
      {children}
    </motion.div>
  );
};

