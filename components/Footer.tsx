/**
 * Footer Component
 *
 * Site footer with company information and links
 * Uses primary color scheme for professional appearance
 */

import Link from "next/link";
import styled from "styled-components";
import { colors, mediaQueries, spacing, typography } from "../lib/theme";

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Footer wrapper with glassy transparent background
 */
const Wrapper = styled.footer`
  background-color: rgba(1, 24, 73, 0.95);
  backdrop-filter: blur(10px) saturate(180%);
  -webkit-backdrop-filter: blur(10px) saturate(180%);
  color: ${colors.neutral.white};
  padding: ${spacing[12]} ${spacing[8]};
  margin-top: auto;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 -8px 32px 0 rgba(0, 0, 0, 0.1);

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[8]} ${spacing[4]};
  }
`;

/**
 * Footer content container
 */
const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${spacing[8]};

  @media ${mediaQueries.mobileAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[6]};
  }
`;

/**
 * Footer section
 */
const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${spacing[4]};
`;

/**
 * Footer heading
 */
const Heading = styled.h3`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.complimentary.light};
  margin-bottom: ${spacing[2]};
`;

/**
 * Footer link
 */
const FooterLink = styled(Link)`
  color: ${colors.neutral.white};
  text-decoration: none;
  font-size: ${typography.fontSize.base};
  transition: color 0.2s ease-out;

  &:hover {
    color: ${colors.complimentary.light};
  }
`;

/**
 * Footer text
 */
const Text = styled.p`
  font-size: ${typography.fontSize.sm};
  line-height: ${typography.lineHeight.relaxed};
  color: ${colors.neutral.gray200};
  margin: 0;
`;

/**
 * Copyright section
 */
const Copyright = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  margin-top: ${spacing[8]};
  padding-top: ${spacing[6]};
  border-top: 1px solid ${colors.primary.light};
  text-align: center;
  font-size: ${typography.fontSize.sm};
  color: ${colors.neutral.gray300};
`;

// ============================================================================
// COMPONENT
// ============================================================================

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Wrapper>
      <Content>
        {/* Company Info */}
        <Section>
          <Heading>BD Corporate Services</Heading>
          <Text>
            Professional audit and accounting outsourcing firm with experienced
            staff from Big 4 firms.
          </Text>
          <Text>Podgorica, Montenegro</Text>
          <Text>Sarajevo, Bosnia and Herzegovina</Text>
        </Section>

        {/* Quick Links */}
        <Section>
          <Heading>Quick Links</Heading>
          <FooterLink href="/">Home</FooterLink>
          <FooterLink href="/about">About Us</FooterLink>
          <FooterLink href="/why-choose-us">Why Choose Us</FooterLink>
          <FooterLink href="/our-team">Our Team</FooterLink>
          <FooterLink href="/contact">Contact</FooterLink>
        </Section>

        {/* Contact Info */}
        <Section>
          <Heading>Contact</Heading>
          <Text>
            <a
              href="mailto:info@bdcs.me"
              style={{ color: colors.neutral.white, textDecoration: "none" }}
            >
              info@bdcs.me
            </a>
          </Text>
          <Text>
            <a
              href="tel:+38268811727"
              style={{ color: colors.neutral.white, textDecoration: "none" }}
            >
              +382 68 811 727
            </a>
          </Text>
          <Text>
            <a
              href="tel:+31610016808"
              style={{ color: colors.neutral.white, textDecoration: "none" }}
            >
              +31 61 001 6808
            </a>
          </Text>
        </Section>
      </Content>

      {/* Copyright */}
      <Copyright>
        <p>
          © {currentYear} BD Corporate Services d.o.o. Podgorica. All rights
          reserved.
        </p>
      </Copyright>
    </Wrapper>
  );
}
