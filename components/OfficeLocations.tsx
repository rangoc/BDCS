/**
 * Footer office locations: each city gets a gold pin and links to the
 * office in Google Maps (new tab).
 */

import styled from "styled-components";

import {
  colors,
  mediaQueries,
  spacing,
  transitions,
  typography,
} from "../lib/theme";

// ============================================================================
// DATA
// ============================================================================

export const OFFICES = [
  {
    city: "Podgorica",
    country: "Montenegro",
    street: "Hercegovačka 49",
    postal: "81000 Podgorica",
  },
  {
    city: "Sarajevo",
    country: "Bosnia and Herzegovina",
    street: "Fra Anđela Zvizdovića 1",
    postal: "71000 Sarajevo",
  },
];

type Office = (typeof OFFICES)[number];

const mapsUrl = (o: Office) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${o.street}, ${o.postal}, ${o.country}`
  )}`;

const linkProps = (o: Office) => ({
  href: mapsUrl(o),
  target: "_blank",
  rel: "noopener noreferrer",
  "aria-label": `${o.city} office: ${o.street}, ${o.postal}, ${o.country} (opens Google Maps in a new tab)`,
});

// ============================================================================
// ICONS
// ============================================================================

function PinIcon() {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 22s7-6.2 7-12a7 7 0 10-14 0c0 5.8 7 12 7 12z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

// ============================================================================
// PINS
// ============================================================================

export function OfficePins() {
  return (
    <PinsGroup>
      {OFFICES.map((o) => (
        <PinLink key={o.city} {...linkProps(o)}>
          <PinMark>
            <PinIcon />
          </PinMark>
          <span>
            {o.city}, {o.country}
          </span>
        </PinLink>
      ))}
    </PinsGroup>
  );
}

const PinsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${spacing[6]};
  font-size: ${typography.fontSize.xs};
  letter-spacing: ${typography.letterSpacing.wide};

  @media ${mediaQueries.mobileAndDown} {
    flex-direction: column;
    gap: ${spacing[3]};
  }
`;

const PinMark = styled.span`
  display: inline-flex;
  color: ${colors.complimentary.main};
  transition: transform ${transitions.duration.fast}ms
    ${transitions.easing.easeInOut};
`;

const PinLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${spacing[2]};
  color: ${colors.neutral.gray400};
  text-decoration: none;
  transition: color ${transitions.duration.fast}ms
    ${transitions.easing.easeInOut};

  &:hover,
  &:focus-visible {
    color: ${colors.complimentary.light};

    ${PinMark} {
      transform: translateY(-2px);
    }
  }
`;
