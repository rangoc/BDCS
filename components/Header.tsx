/**
 * Header Component
 *
 * Main navigation header with sticky behavior
 * - Transparent on page load, fills with primary color on scroll
 * - Responsive with mobile menu
 * - CTA "Get in Touch" button separated from nav links
 * - Active page indicator (gold underline bar)
 */

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import styled from "styled-components";

import { useOnClickOutside } from "../hooks/useOnClickOutside";
import {
  borderRadius,
  colors,
  mediaQueries,
  shadows,
  spacing,
  transitions,
  typography,
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
    $isScrolled ? "rgba(10, 8, 25, 0.97)" : "transparent"};
  backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? "blur(12px) saturate(180%)" : "none"};
  -webkit-backdrop-filter: ${({ $isScrolled }) =>
    $isScrolled ? "blur(12px) saturate(180%)" : "none"};
  color: ${({ $isScrolled }) =>
    $isScrolled ? colors.neutral.white : colors.primary.main};
  box-shadow: ${({ $isScrolled }) =>
    $isScrolled ? "0 8px 32px 0 rgba(0, 0, 0, 0.1)" : "none"};
  border-bottom: ${({ $isScrolled }) =>
    $isScrolled ? "1px solid rgba(255, 255, 255, 0.1)" : "none"};
  transition: all 0.35s ease-in-out;

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
  width: 120px;
  cursor: pointer;

  @media ${mediaQueries.tabletAndDown} {
    width: 100px;
  }

  @media ${mediaQueries.mobileAndDown} {
    width: 80px;
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
  gap: ${spacing[1]};
  list-style: none;
  margin: 0;
  padding: 0;
`;

/**
 * Navigation list item with active gold underline indicator
 */
const ListItem = styled.li<{ $isScrolled: boolean; $active: boolean }>`
  position: relative;

  a {
    color: ${({ $isScrolled, $active }) => {
      if ($isScrolled)
        return $active ? colors.neutral.white : "rgba(255,255,255,0.8)";
      return $active ? colors.neutral.white : "rgba(255,255,255,0.75)";
    }};
    text-decoration: none;
    font-weight: ${({ $active }) =>
      $active ? typography.fontWeight.semibold : typography.fontWeight.medium};
    font-size: ${typography.fontSize.sm};
    letter-spacing: ${typography.letterSpacing.wide};
    padding: ${spacing[2]} ${spacing[3]};
    display: inline-block;
    transition: ${transitions.fast};

    @media (hover: hover) {
      &:hover {
        color: ${colors.neutral.white};
      }
    }
  }

  /* Active indicator — gold underline bar */
  &::after {
    content: "";
    position: absolute;
    bottom: 0;
    left: ${spacing[3]};
    right: ${spacing[3]};
    height: 2px;
    background-color: ${({ $isScrolled }) =>
      $isScrolled ? colors.complimentary.main : colors.accent.main};
    transform: scaleX(${({ $active }) => ($active ? 1 : 0)});
    transform-origin: center;
    transition: transform 0.25s ease-out;
  }

  @media (hover: hover) {
    &:hover::after {
      transform: scaleX(1);
    }
  }
`;

/**
 * Right side group — CTA button + mobile burger
 */
const RightGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[4]};
`;

/**
 * CTA button — "Get in Touch"
 */
const CTAButton = styled(motion.a)<{ $isScrolled: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
  font-family: ${typography.fontFamily.primary};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.sm};
  letter-spacing: ${typography.letterSpacing.wider};
  text-transform: uppercase;
  padding: ${spacing[2]} ${spacing[5]};
  border-radius: ${borderRadius.sm};
  background: linear-gradient(
    135deg,
    ${colors.complimentary.main} 0%,
    ${colors.complimentary.light} 100%
  );
  color: ${({ $isScrolled }) =>
    $isScrolled ? colors.neutral.white : colors.primary.darker};
  border: none;
  cursor: pointer;
  transition: box-shadow 0.15s ease, filter 0.15s ease;
  min-height: 40px;
  white-space: nowrap;

  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover {
      filter: brightness(1.1);
      box-shadow: 0 2px 10px rgba(174, 151, 81, 0.15);
    }
  }

  &:active {
    filter: brightness(0.95);
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent.main};
    outline-offset: 3px;
  }

  @media ${mediaQueries.tabletAndDown} {
    display: none;
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
// NAV LINKS DATA
// ============================================================================

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/why-choose-us", label: "Why Choose Us" },
  { href: "/our-team", label: "Our Team" },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function Header() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const node = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Close menu when clicking outside
  useOnClickOutside(node, () => setOpen(false));

  // Only the homepage gets a transparent header — all other pages start filled
  const isHomePage = router.pathname === "/";

  /**
   * Track scroll position to change header background
   * On non-homepage routes, header is always in the "scrolled" (filled) state
   */
  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }

    const handleScroll = () => {
      // On mobile, #__next is the scroll container (position: fixed wrapper)
      // so window.scrollY is always 0. Check #__next's scrollTop instead.
      const nextEl = document.getElementById("__next");
      const scrollY = nextEl ? Math.max(window.scrollY, nextEl.scrollTop) : window.scrollY;
      setIsScrolled(scrollY > 1);
    };

    handleScroll();
    const nextEl = document.getElementById("__next");
    window.addEventListener("scroll", handleScroll, { passive: true });
    nextEl?.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      nextEl?.removeEventListener("scroll", handleScroll);
    };
  }, [isHomePage]);

  return (
    <Wrapper $isScrolled={isScrolled}>
      {/* Logo */}
      <LogoWrapper href="/">
        <Image
          src={logo}
          alt="BD Corporate Services"
          priority={true}
          sizes="120px"
          style={{ width: "100%", height: "auto" }}
        />
      </LogoWrapper>

      {/* Desktop Navigation — 4 links (Contact moved to CTA) */}
      <Navbar aria-label="Main navigation">
        <List>
          {navLinks.map((link) => (
            <ListItem
              key={link.href}
              $isScrolled={isScrolled}
              $active={router.pathname === link.href}
            >
              <Link href={link.href}>
                {link.label}
              </Link>
            </ListItem>
          ))}
        </List>
      </Navbar>

      {/* Right side — CTA + Mobile Menu */}
      <RightGroup>
        {/* Desktop CTA Button */}
        <Link href="/contact" passHref legacyBehavior>
          <CTAButton
            $isScrolled={isScrolled}
          >
            Get in Touch
          </CTAButton>
        </Link>

        {/* Mobile Menu Toggle and Menu */}
        <MobileMenuWrapper ref={node}>
          <Burger open={open} setOpen={setOpen} isScrolled={isScrolled} />
          <Menu open={open} setOpen={setOpen} />
        </MobileMenuWrapper>
      </RightGroup>
    </Wrapper>
  );
}
