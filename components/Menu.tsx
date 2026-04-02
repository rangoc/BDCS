/**
 * Menu Component — Redesigned (Dark Editorial)
 *
 * Full-screen mobile menu with dark gradient background,
 * cross-hatch texture, gold top line, large editorial typography,
 * gold bar before active link, faded-corner separator line.
 */

import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  borderRadius,
  colors,
  spacing,
  transitions,
  typography,
  zIndex,
} from "../lib/theme";

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Full-screen overlay menu
 */
export const StyledMenu = styled.nav<{ open: boolean; $mounted: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${zIndex.modalBackdrop};
  width: 100%;
  height: 100vh;
  background: linear-gradient(
    180deg,
    ${colors.primary.darker} 0%,
    ${colors.primary.main} 100%
  );
  color: ${colors.neutral.white};
  padding: ${spacing[20]} ${spacing[6]} ${spacing[6]};
  overflow-y: auto;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  visibility: ${({ open }) => (open ? "visible" : "hidden")};
  transform: ${({ open }) => (open ? "translateX(0)" : "translateX(100%)")};
  transition: ${({ $mounted, open }) =>
    $mounted
      ? open
        ? "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s 0s"
        : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), visibility 0s 0.3s"
      : "none"};

  /* Cross-hatch texture */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L40 40M40 0L0 40' stroke='%23FFFFFF' stroke-width='0.5' opacity='0.025'/%3E%3C/svg%3E");
    pointer-events: none;
  }

  /* Gold top line */
  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    background: linear-gradient(
      90deg,
      transparent,
      ${colors.complimentary.main},
      ${colors.complimentary.light},
      ${colors.complimentary.main},
      transparent
    );
    pointer-events: none;
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
  gap: ${spacing[5]};
  flex: 1;
  position: relative;
`;

/**
 * Navigation list item with gold bar active indicator
 */
const ListItem = styled.li<{ $active: boolean }>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${spacing[3]};

  /* Gold bar before active link */
  &::before {
    content: "";
    width: ${({ $active }) => ($active ? "24px" : "0px")};
    height: 2px;
    background: ${colors.complimentary.main};
    transition: width 0.25s ease-out;
    flex-shrink: 0;
  }

  &:hover::before {
    width: 24px;
  }

  a {
    color: ${({ $active }) =>
      $active ? colors.neutral.white : "rgba(255, 255, 255, 0.6)"};
    text-decoration: none;
    font-family: ${typography.fontFamily.heading};
    font-size: ${typography.fontSize["2xl"]};
    font-weight: ${({ $active }) =>
      $active ? typography.fontWeight.bold : typography.fontWeight.medium};
    transition: color 0.2s ease-out;

    &:hover {
      color: ${colors.neutral.white};
    }
  }
`;

/**
 * Faded-corner separator line
 */
const Separator = styled.div`
  width: 100%;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${colors.complimentary.main} 30%,
    ${colors.complimentary.main} 70%,
    transparent 100%
  );
  opacity: 0.3;
`;

/**
 * CTA button container
 */
const CTAContainer = styled.div`
  position: relative;
  margin-top: auto;
  padding-top: ${spacing[6]};
`;

/**
 * CTA button
 */
const MobileCTA = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};
  letter-spacing: ${typography.letterSpacing.wider};
  text-transform: uppercase;
  padding: ${spacing[4]} ${spacing[8]};
  border-radius: ${borderRadius.sm};
  background: linear-gradient(
    135deg,
    ${colors.complimentary.main} 0%,
    ${colors.complimentary.light} 100%
  );
  color: ${colors.primary.darker};
  min-height: 48px;
  transition: box-shadow 0.15s ease, filter 0.15s ease;

  &:hover {
    filter: brightness(1.1);
    box-shadow: 0 2px 10px rgba(174, 151, 81, 0.15);
  }

  &:active {
    filter: brightness(0.95);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent.main};
    outline-offset: 3px;
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
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleLinkClick = () => {
    setOpen(false);
  };

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && open) {
        setOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, setOpen]);

  return (
    <StyledMenu open={open} $mounted={mounted}>
      <List>
        <ListItem $active={router.pathname === "/"} onClick={handleLinkClick}>
          <Link href="/">
            Home
          </Link>
        </ListItem>
        <ListItem
          $active={router.pathname === "/about"}
          onClick={handleLinkClick}
        >
          <Link href="/about">
            About Us
          </Link>
        </ListItem>
        <ListItem
          $active={router.pathname === "/why-choose-us"}
          onClick={handleLinkClick}
        >
          <Link href="/why-choose-us">
            Why Choose Us
          </Link>
        </ListItem>
        <ListItem
          $active={router.pathname === "/our-team"}
          onClick={handleLinkClick}
        >
          <Link href="/our-team">
            Our Team
          </Link>
        </ListItem>
        <ListItem
          $active={router.pathname === "/contact"}
          onClick={handleLinkClick}
        >
          <Link href="/contact">
            Contact
          </Link>
        </ListItem>
      </List>

      <CTAContainer>
        <Separator />
        <div style={{ paddingTop: spacing[6] }}>
          <Link href="/contact" passHref legacyBehavior>
            <MobileCTA onClick={handleLinkClick}>Get in Touch</MobileCTA>
          </Link>
        </div>
      </CTAContainer>
    </StyledMenu>
  );
}
