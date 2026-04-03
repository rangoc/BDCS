/**
 * Burger Component
 *
 * Animated hamburger menu button for mobile navigation
 * Changes color based on scroll state and menu state
 */

import styled from "styled-components";
import { colors, mediaQueries, zIndex } from "../lib/theme";

// ============================================================================
// TYPES
// ============================================================================

interface BurgerProps {
  open: boolean;
  isScrolled?: boolean;
}

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Burger button with animated bars
 */
export const StyledBurger = styled.button<BurgerProps>`
  display: none;
  position: relative;
  width: 1.75rem;
  height: 2rem;
  background: transparent;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: ${zIndex.modal};

  &:focus {
    outline: none;
  }

  /* Burger bar styles */
  div {
    width: 1.75rem;
    height: 2px;
    background: ${colors.neutral.white};
    border-radius: 10px;
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    transform-origin: 1px;

    /* Top bar */
    :first-child {
      transform: ${({ open }) => (open ? "rotate(45deg)" : "rotate(0)")};
      margin-bottom: ${({ open }) => (open ? "0" : "0.625rem")};
    }

    /* Middle bar */
    :nth-child(2) {
      opacity: ${({ open }) => (open ? "0" : "1")};
      transform: ${({ open }) => (open ? "translateX(20px)" : "translateX(0)")};
      margin-bottom: ${({ open }) => (open ? "0" : "0.625rem")};
    }

    /* Bottom bar */
    :nth-child(3) {
      transform: ${({ open }) => (open ? "rotate(-45deg)" : "rotate(0)")};
      margin-top: ${({ open }) => (open ? "-0.3rem" : "0")};
    }
  }

  /* Show only on mobile */
  @media ${mediaQueries.tabletAndDown} {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

export function Burger({
  open,
  setOpen,
  isScrolled = false,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
  isScrolled?: boolean;
}) {
  return (
    <StyledBurger
      open={open}
      isScrolled={isScrolled}
      onClick={() => setOpen(!open)}
      aria-label={open ? "Close menu" : "Open menu"}
      aria-expanded={open}
    >
      <div />
      <div />
      <div />
    </StyledBurger>
  );
}
