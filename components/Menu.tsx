/**
 * Menu Component
 * 
 * Mobile slide-in navigation menu
 * Appears from the right side on mobile devices
 */

import Link from "next/link";
import styled from "styled-components";
import { colors, spacing, typography, zIndex, shadows } from "../lib/theme";

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Mobile menu container - slides in from right
 */
export const StyledMenu = styled.nav<{ open: boolean }>`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${zIndex.modalBackdrop};
  height: 100vh;
  width: 280px;
  background: ${colors.primary.main};
  color: ${colors.neutral.white};
  padding: ${spacing[8]} ${spacing[6]};
  padding-top: ${spacing[20]};
  box-shadow: ${shadows['2xl']};
  
  /* Slide animation */
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  /* Overlay effect when menu is open */
  &::before {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 280px;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    opacity: ${({ open }) => (open ? 1 : 0)};
    pointer-events: ${({ open }) => (open ? "all" : "none")};
    transition: opacity 0.3s ease-in-out;
  }
`;

/**
 * Navigation list
 */
const List = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

/**
 * Navigation list item with animated underline
 */
const ListItem = styled.li`
  position: relative;
  width: max-content;
  
  a {
    color: ${colors.neutral.white};
    text-decoration: none;
    font-size: ${typography.fontSize.lg};
    font-weight: ${typography.fontWeight.medium};
    transition: color 0.2s ease-out;
    
    &:hover {
      color: ${colors.complimentary.light};
    }
  }

  /* Animated underline */
  &::after {
    content: "";
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${colors.complimentary.main};
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

export function Menu({
  open,
  setOpen,
}: {
  open: boolean;
  setOpen: (open: boolean) => void;
}) {
  /**
   * Close menu when clicking a link
   */
  const handleLinkClick = () => {
    setOpen(false);
  };

  return (
    <StyledMenu open={open}>
      <List>
        <ListItem onClick={handleLinkClick}>
          <Link scroll={false} href="/">
            Home
          </Link>
        </ListItem>
        <ListItem onClick={handleLinkClick}>
          <Link scroll={false} href="/about">
            About Us
          </Link>
        </ListItem>
        <ListItem onClick={handleLinkClick}>
          <Link scroll={false} href="/why-choose-us">
            Why Choose Us
          </Link>
        </ListItem>
        <ListItem onClick={handleLinkClick}>
          <Link scroll={false} href="/our-team">
            Our Team
          </Link>
        </ListItem>
        <ListItem onClick={handleLinkClick}>
          <Link scroll={false} href="/contact">
            Contact
          </Link>
        </ListItem>
      </List>
    </StyledMenu>
  );
}
