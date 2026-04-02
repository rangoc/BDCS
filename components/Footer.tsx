/**
 * Footer Component
 *
 * Premium footer matching the homepage hero treatment:
 * dark gradient background, SVG texture overlay, radial gold glow,
 * decorative BDCS watermark, 3-column info grid, and bottom bar.
 */

import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import {
  colors,
  mediaQueries,
  spacing,
  typography,
  transitions,
} from "../lib/theme";

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.55,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

const FooterWrapper = styled.footer`
  position: relative;
  background: linear-gradient(
    180deg,
    ${colors.primary.darker} 0%,
    ${colors.primary.main} 50%,
    ${colors.primary.dark} 100%
  );
  color: ${colors.neutral.gray300};
  font-family: ${typography.fontFamily.primary};
  overflow: hidden;
  margin-top: auto;
  padding-bottom: env(safe-area-inset-bottom, 0px);
`;

const GoldRadialOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(174, 151, 81, 0.06) 0%,
    transparent 70%
  );
`;

const Watermark = styled.span`
  position: absolute;
  bottom: -0.15em;
  right: -0.02em;
  font-family: ${typography.fontFamily.heading};
  font-size: 18rem;
  font-weight: ${typography.fontWeight.bold};
  letter-spacing: 0.04em;
  line-height: 1;
  color: ${colors.neutral.white};
  opacity: 0.03;
  user-select: none;
  pointer-events: none;
  white-space: nowrap;

  @media ${mediaQueries.tabletAndDown} {
    font-size: 12rem;
  }

  @media ${mediaQueries.mobileAndDown} {
    font-size: 7rem;
  }
`;

const GoldTopLine = styled.div`
  width: 100%;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    ${colors.complimentary.main} 20%,
    ${colors.complimentary.light} 50%,
    ${colors.complimentary.main} 80%,
    transparent 100%
  );
`;

const Inner = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing[16]} ${spacing[6]} 0;

  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[12]} ${spacing[6]} 0;
  }
`;

// ============================================================================
// ROW 1: 2-COLUMN GRID
// ============================================================================

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1.4fr 1fr 1fr;
  gap: ${spacing[10]};

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 1fr 1fr;
    gap: ${spacing[8]};
  }

  @media ${mediaQueries.mobileAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[10]};
  }
`;

const Column = styled(motion.div)``;

const SectionLabel = styled.span`
  display: block;
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.complimentary.main};
  margin-bottom: ${spacing[4]};
`;

const CompanyName = styled.h3`
  font-size: ${typography.fontSize["2xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral.white};
  margin: 0 0 ${spacing[3]};
  line-height: ${typography.lineHeight.tight};
`;

const Tagline = styled.p`
  font-size: ${typography.fontSize.sm};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.neutral.gray400};
  margin: 0;
  max-width: 320px;
`;

const EmailLink = styled.a`
  font-size: ${typography.fontSize.sm};
  color: ${colors.complimentary.main};
  text-decoration: none;
  transition: color ${transitions.duration.fast}ms
    ${transitions.easing.easeInOut};
  display: inline-block;
  margin-bottom: ${spacing[4]};

  @media (hover: hover) {
    &:hover {
      color: ${colors.complimentary.light};
    }
  }
`;

const PhoneItem = styled.div`
  margin-bottom: ${spacing[2]};

  a {
    font-size: ${typography.fontSize.sm};
    color: ${colors.neutral.white};
    text-decoration: none;
    transition: color ${transitions.duration.fast}ms
      ${transitions.easing.easeInOut};

    @media (hover: hover) {
      &:hover {
        color: ${colors.complimentary.light};
      }
    }
  }
`;

// ============================================================================
// ROW 2: BOTTOM BAR
// ============================================================================

const BottomBar = styled.div`
  position: relative;
  z-index: 1;
  margin-top: ${spacing[12]};
  border-top: none;
`;

const BottomBarInner = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${spacing[6]};
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media ${mediaQueries.tabletAndDown} {
    flex-direction: column;
    gap: ${spacing[4]};
    text-align: center;
  }
`;

const SocialGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[5]};
  margin-top: ${spacing[2]};
`;

const SocialLink = styled(motion.a)`
  display: inline-flex;
  align-items: center;
  color: ${colors.complimentary.main};
  transition: color ${transitions.duration.fast}ms
    ${transitions.easing.easeInOut};
  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover {
      color: ${colors.complimentary.light};
    }
  }

  svg {
    width: 20px;
    height: 20px;
    fill: currentColor;
  }
`;

const LocationsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[2]};
  font-size: ${typography.fontSize.xs};
  color: ${colors.neutral.gray400};
  letter-spacing: ${typography.letterSpacing.wide};
`;

const LocationDot = styled.span`
  display: inline-block;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: ${colors.complimentary.dark};
`;

const CopyrightText = styled.p`
  font-size: ${typography.fontSize.xs};
  color: ${colors.neutral.gray500};
  margin: 0;
`;

// ============================================================================
// INLINE SVG ICONS
// ============================================================================

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

// ============================================================================
// DATA
// ============================================================================

const PHONE_NUMBERS = [
  { number: "+382 68 811 727", href: "tel:+38268811727" },
  { number: "+31 61 001 6808", href: "tel:+31610016808" },
];

const LOCATIONS = [
  { city: "Podgorica", country: "Montenegro" },
  { city: "Sarajevo", country: "Bosnia and Herzegovina" },
];

// ============================================================================
// COMPONENT
// ============================================================================

export function Footer() {
  const foundingYear = 2023;

  return (
    <FooterWrapper aria-label="Site footer">
      <GoldRadialOverlay aria-hidden="true" />
      <Watermark aria-hidden="true">BDCS</Watermark>
      <GoldTopLine aria-hidden="true" />

      <Inner>
        <Grid>
          {/* Column 1: Company */}
          <Column
            custom={0}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel>Company</SectionLabel>
            <CompanyName>BD Corporate Services</CompanyName>
            <Tagline>
              Professional audit and accounting outsourcing firm with experienced
              staff from Big 4 firms.
            </Tagline>
          </Column>

          {/* Column 2: Contact */}
          <Column
            custom={1}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel>Contact</SectionLabel>
            <EmailLink href="mailto:info@bdcs.me">info@bdcs.me</EmailLink>
            {PHONE_NUMBERS.map((phone) => (
              <PhoneItem key={phone.number}>
                <a href={phone.href}>{phone.number}</a>
              </PhoneItem>
            ))}
          </Column>

          {/* Column 3: Follow Us */}
          <Column
            custom={2}
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <SectionLabel>Follow Us</SectionLabel>
            <SocialGroup>
              <SocialLink
                href="https://www.linkedin.com/company/bd-corporate-services/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
              >
                <LinkedInIcon />
              </SocialLink>
              <SocialLink
                href="https://www.instagram.com/bd_corporate_services/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.95 }}
              >
                <InstagramIcon />
              </SocialLink>
            </SocialGroup>
          </Column>
        </Grid>
      </Inner>

      <BottomBar>
        <BottomBarInner>
          {/* Locations */}
          <LocationsGroup>
            {LOCATIONS.map((loc, idx) => (
              <React.Fragment key={loc.city}>
                {idx > 0 && <LocationDot />}
                <span>
                  {loc.city}, {loc.country}
                </span>
              </React.Fragment>
            ))}
          </LocationsGroup>

          {/* Copyright */}
          <CopyrightText>
            &copy; {foundingYear} BD Corporate Services d.o.o. Podgorica. All
            rights reserved.
          </CopyrightText>
        </BottomBarInner>
      </BottomBar>
    </FooterWrapper>
  );
}
