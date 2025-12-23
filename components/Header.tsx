/**
 * Header Component
 *
 * Main navigation header with sticky behavior
 * - Transparent on page load
 * - Fills with primary color on scroll
 * - Responsive with mobile menu
 */

import { motion } from "framer-motion";
import Image from "next/legacy/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useOnClickOutside } from "../hooks/useOnClickOutside";
import {
  colors,
  mediaQueries,
  spacing,
  transitions,
  zIndex,
} from "../lib/theme";
import logo from "../public/logo.webp";
import { Burger } from "./Burger";
import { Menu } from "./Menu";

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Header wrapper - fixed positioning with background transition
 */
const Wrapper = styled(motion.header)<{ $isScrolled: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: ${zIndex.sticky};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${spacing[4]} ${spacing[8]};
  background-color: ${({ $isScrolled }) =>
    $isScrolled ? "rgba(1, 24, 73, 0.95)" : "transparent"};
  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? "blur(10px) saturate(180%)" : "none"};
  -webkit-backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? "blur(10px) saturate(180%)" : "none"};
  color: ${({ $isScrolled }) =>
    $isScrolled ? colors.neutral.white : colors.primary.main};
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled ? "0 8px 32px 0 rgba(0, 0, 0, 0.1)" : "none"};
  border-bottom: ${({ $isScrolled }) =>
    $isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none"};
  transition: all 0.3s ease-in-out;

  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[4]} ${spacing[6]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[3]} ${spacing[4]};
  }
`;

/**
 * Logo container with responsive sizing
 */
const LogoWrapper = styled(Link)`
  display: block;
  width: 180px;
  cursor: pointer;
  transition: ${transitions.fast};

  &:hover {
    transform: scale(1.02);
  }

  @media ${mediaQueries.tabletAndDown} {
    width: 140px;
  }

  @media ${mediaQueries.mobileAndDown} {
    width: 100px;
  }
`;

/**
 * Desktop navigation
 */
const Navbar = styled.nav`
  @media ${mediaQueries.tabletAndDown} {
    display: none;
  }
`;

/**
 * Navigation list
 */
const List = styled.ul`
  display: flex;
  align-items: center;
  gap: ${spacing[8]};
  list-style: none;
  margin: 0;
  padding: 0;

  @media ${mediaQueries.tabletAndDown} {
    gap: ${spacing[6]};
  }
`;

/**
 * Navigation list item with animated underline
 */
const ListItem = styled.li<{ $isScrolled: boolean }>`
  position: relative;

  a {
    color: inherit;
    text-decoration: none;
    font-weight: 500;
    font-size: 1rem;
    padding: ${spacing[2]} 0;
    transition: ${transitions.fast};

    &:hover {
      color: ${({ $isScrolled }) =>
        $isScrolled ? colors.complimentary.light : colors.accent.main};
    }
  }

  /* Animated underline */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: ${({ $isScrolled }) =>
      $isScrolled ? colors.complimentary.main : colors.accent.main};
    transform: scaleX(0);
    transform-origin: bottom right;
    transition: transform 0.3s ease-out;
  }

  &:hover::after {
    transform: scaleX(1);
    transform-origin: bottom left;
  }
`;

/**
 * Mobile menu container (positioned absolute)
 */
const MobileMenuWrapper = styled.div`
  display: none;

  @media ${mediaQueries.tabletAndDown} {
    display: block;
  }
`;

// ============================================================================
// COMPONENT
// ============================================================================

export function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const node = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useOnClickOutside(node, () => setOpen(false));

  /**
   * Track scroll position to change header background
   */
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 1);
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Wrapper $isScrolled={isScrolled}>
      {/* Logo */}
      <LogoWrapper href="/">
        <Image
          src={logo}
          alt="BD Corporate Services"
          priority={true}
          layout="responsive"
        />
      </LogoWrapper>

      {/* Desktop Navigation */}
      <Navbar>
        <List>
          <ListItem $isScrolled={isScrolled}>
            <Link scroll={false} href="/">
              Home
            </Link>
          </ListItem>
          <ListItem $isScrolled={isScrolled}>
            <Link scroll={false} href="/about">
              About Us
            </Link>
          </ListItem>
          <ListItem $isScrolled={isScrolled}>
            <Link scroll={false} href="/why-choose-us">
              Why Choose Us
            </Link>
          </ListItem>
          <ListItem $isScrolled={isScrolled}>
            <Link scroll={false} href="/our-team">
              Our Team
            </Link>
          </ListItem>
          <ListItem $isScrolled={isScrolled}>
            <Link scroll={false} href="/contact">
              Contact
            </Link>
          </ListItem>
        </List>
      </Navbar>

      {/* Mobile Menu Toggle and Menu */}
      <MobileMenuWrapper ref={node}>
        <Burger open={open} setOpen={setOpen} isScrolled={isScrolled} />
        <Menu open={open} setOpen={setOpen} />
      </MobileMenuWrapper>
    </Wrapper>
  );
}
