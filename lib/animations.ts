/**
 * Animation Utilities
 *
 * Reusable framer-motion animation variants and utilities
 * Includes: fade-ins, slide-ins, scale effects, stagger animations, parallax
 *
 * Usage with framer-motion:
 * <motion.div variants={fadeIn} initial="hidden" animate="visible" />
 */

import { Transition, Variants } from "framer-motion";

// ============================================================================
// TRANSITION PRESETS
// ============================================================================

/**
 * Common transition configurations
 */
export const transitions = {
  // Smooth default transition
  smooth: {
    type: "tween",
    ease: "easeOut",
    duration: 0.3,
  } as Transition,

  // Spring physics for playful interactions
  spring: {
    type: "spring",
    stiffness: 100,
    damping: 15,
  } as Transition,

  // Bouncy spring for emphasis
  bouncy: {
    type: "spring",
    stiffness: 300,
    damping: 20,
  } as Transition,

  // Fast transition for quick feedback
  fast: {
    type: "tween",
    ease: "easeOut",
    duration: 0.2,
  } as Transition,

  // Slow transition for dramatic effect
  slow: {
    type: "tween",
    ease: "easeOut",
    duration: 0.5,
  } as Transition,
} as const;

// ============================================================================
// FADE ANIMATIONS
// ============================================================================

/**
 * Basic fade in animation
 */
export const fadeIn: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
};

/**
 * Fade in with slight delay
 */
export const fadeInDelayed: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      ...transitions.smooth,
      delay: 0.2,
    },
  },
};

// ============================================================================
// SLIDE ANIMATIONS
// ============================================================================

/**
 * Slide in from bottom with fade
 */
export const slideInUp: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Slide in from top with fade
 */
export const slideInDown: Variants = {
  hidden: {
    opacity: 0,
    y: -30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Slide in from left with fade
 */
export const slideInLeft: Variants = {
  hidden: {
    opacity: 0,
    x: -30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

/**
 * Slide in from right with fade
 */
export const slideInRight: Variants = {
  hidden: {
    opacity: 0,
    x: 30,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: transitions.smooth,
  },
};

// ============================================================================
// SCALE ANIMATIONS
// ============================================================================

/**
 * Scale up with fade in
 */
export const scaleIn: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth,
  },
};

/**
 * Scale up from center (good for modals)
 */
export const scaleInCenter: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.spring,
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: transitions.fast,
  },
};

/**
 * Gentle pulse effect
 */
export const pulse: Variants = {
  initial: {
    scale: 1,
  },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

// ============================================================================
// STAGGER ANIMATIONS
// ============================================================================

/**
 * Container for staggered children animations
 * Use with staggerChild variants
 */
export const staggerContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

/**
 * Individual child element in stagger animation
 */
export const staggerChild: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth,
  },
};

/**
 * Stagger with fade only (no movement)
 */
export const staggerFadeChild: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: transitions.smooth,
  },
};

// ============================================================================
// HOVER & TAP ANIMATIONS
// ============================================================================

/**
 * Subtle lift effect on hover
 */
export const hoverLift = {
  rest: {
    y: 0,
    scale: 1,
  },
  hover: {
    y: -4,
    scale: 1.02,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.98,
    transition: transitions.fast,
  },
};

/**
 * Scale up slightly on hover
 */
export const hoverScale = {
  rest: {
    scale: 1,
  },
  hover: {
    scale: 1.05,
    transition: transitions.fast,
  },
  tap: {
    scale: 0.95,
    transition: transitions.fast,
  },
};

/**
 * Glow effect on hover (combine with box-shadow)
 */
export const hoverGlow = {
  rest: {
    boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
  },
  hover: {
    boxShadow:
      "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    transition: transitions.fast,
  },
};

// ============================================================================
// PAGE TRANSITIONS
// ============================================================================

/**
 * Page enter/exit transitions
 */
export const pageTransition: Variants = {
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

/**
 * Smooth fade page transition
 */
export const pageFade: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.3,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// MODAL/OVERLAY ANIMATIONS
// ============================================================================

/**
 * Modal backdrop fade
 */
export const backdropFade: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.2,
    },
  },
  exit: {
    opacity: 0,
    transition: {
      duration: 0.2,
    },
  },
};

/**
 * Modal content animation (scale + fade)
 */
export const modalContent: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    y: 20,
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

// ============================================================================
// SCROLL-TRIGGERED ANIMATIONS
// ============================================================================

/**
 * Scroll reveal from bottom
 * Use with framer-motion's useInView hook
 */
export const scrollReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

/**
 * Scroll reveal with stagger for multiple elements
 */
export const scrollRevealContainer: Variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
};

/**
 * Individual item in scroll reveal stagger
 */
export const scrollRevealItem: Variants = {
  hidden: {
    opacity: 0,
    y: 30,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// TEXT ANIMATIONS
// ============================================================================

/**
 * Text reveal with slight slide up
 */
export const textReveal: Variants = {
  hidden: {
    opacity: 0,
    y: 20,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

/**
 * Stagger text lines (use on container)
 */
export const textStaggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
    },
  },
};

/**
 * Individual text line in stagger
 */
export const textStaggerLine: Variants = {
  hidden: {
    opacity: 0,
    y: 10,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Check if user prefers reduced motion
 * Use this to conditionally disable animations
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};

/**
 * Get animation variants with reduced motion support
 * Returns instant transitions if user prefers reduced motion
 */
export const getAccessibleVariants = (variants: Variants): Variants => {
  if (prefersReducedMotion()) {
    const reduced: Variants = {};
    Object.keys(variants).forEach((key) => {
      reduced[key] = {
        ...(variants[key] as object),
        transition: { duration: 0 },
      };
    });
    return reduced;
  }
  return variants;
};

/**
 * Create custom delay for animation
 */
export const withDelay = (variant: Variants, delay: number): Variants => {
  const result: Variants = {};
  Object.keys(variant).forEach((key) => {
    const state = variant[key];
    if (typeof state === "object" && state !== null) {
      result[key] = {
        ...state,
        transition: {
          ...(state.transition as object),
          delay,
        },
      };
    }
  });
  return result;
};

/**
 * Generate stagger delay based on index
 */
export const staggerDelay = (index: number, baseDelay = 0.1): number => {
  return index * baseDelay;
};
