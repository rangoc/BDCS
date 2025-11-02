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
 * Footer wrapper with primary background
 */
const Wrapper = styled.footer`
  background-color: ${colors.primary.main};
  color: ${colors.neutral.white};
  padding: ${spacing[12]} ${spacing[8]};
  margin-top: auto;

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
              href="tel:+38269340084"
              style={{ color: colors.neutral.white, textDecoration: "none" }}
            >
              +382 69 340 084
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
