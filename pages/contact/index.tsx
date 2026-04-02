/**
 * Contact Page — Redesigned (Variant D: Full Dark + Form Card)
 *
 * Immersive dark gradient background with cross-hatch texture.
 * Two-column layout: contact info left, white form card right.
 * Gold accent labels, scroll-triggered animations.
 *
 * Preserves existing form logic (react-hook-form, /api/submit, Dialog).
 * All design tokens from lib/theme.ts — no new dependencies.
 */

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { motion } from "framer-motion";
import { SubmitHandler, useForm } from "react-hook-form";

import { Dialog } from "../../components/Dialog";
import { SEO } from "../../components/SEO";
import { StructuredData } from "../../components/StructuredData";
import { Spinner } from "../../components/Spinner";
import {
  borderRadius,
  colors,
  mediaQueries,
  shadows,
  spacing,
  transitions,
  typography,
} from "../../lib/theme";

// ============================================================================
// TYPES
// ============================================================================

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface IFetchResponse {
  data: {
    emailId: string;
  };
}

const defaultValues: IFormInputs = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

// ============================================================================
// DATA
// ============================================================================

const PHONE_NUMBERS = [
  { number: "+382 68 811 727", href: "tel:+38268811727", label: "Montenegro" },
  {
    number: "+31 61 001 6808",
    href: "tel:+31610016808",
    label: "Netherlands",
  },
];

const LOCATIONS = [
  { city: "Podgorica", country: "Montenegro" },
  { city: "Sarajevo", country: "Bosnia and Herzegovina" },
];

// ============================================================================
// ANIMATION HELPERS
// ============================================================================

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

// ============================================================================
// PAGE WRAPPER
// ============================================================================

const PageWrapper = styled(motion.main)`
  width: 100%;
  overflow-x: hidden;
  font-family: ${typography.fontFamily.primary};

  margin-top: -112px;

  @media (max-width: 768px) {
    margin-top: -96px;
  }

  @media (max-width: 550px) {
    margin-top: -72px;
  }
`;

// ============================================================================
// DARK SECTION
// ============================================================================

const DarkSection = styled.section`
  position: relative;
  overflow: hidden;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  align-items: center;
  background: linear-gradient(
    180deg,
    ${colors.primary.darker} 0%,
    ${colors.primary.main} 50%,
    ${colors.primary.dark} 100%
  );
  padding: ${spacing[16]} ${spacing[8]};
  padding-top: calc(112px + ${spacing[16]});

  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[12]} ${spacing[6]};
    padding-top: calc(96px + ${spacing[12]});
    min-height: auto;
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[10]} ${spacing[4]};
    padding-top: calc(72px + ${spacing[10]});
  }
`;

const DarkTexture = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background-image: url("data:image/svg+xml,%3Csvg width='40' height='40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0L40 40M40 0L0 40' stroke='%23FFFFFF' stroke-width='0.5' opacity='0.025'/%3E%3C/svg%3E");
`;

const DarkGoldGlow = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    ellipse 60% 50% at 30% 50%,
    rgba(174, 151, 81, 0.05) 0%,
    transparent 70%
  );
`;

// ============================================================================
// TWO-COLUMN LAYOUT
// ============================================================================

const TwoColGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: ${spacing[12]};
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  align-items: start;
  width: 100%;

  @media ${mediaQueries.tabletAndDown} {
    grid-template-columns: 1fr;
    gap: ${spacing[8]};
  }
`;

// ============================================================================
// LEFT COLUMN — Contact Info
// ============================================================================

const InfoColumn = styled(motion.div)`
  padding-top: ${spacing[4]};

  @media ${mediaQueries.tabletAndDown} {
    padding-top: 0;
  }
`;

const GoldLine = styled(motion.div)`
  width: 40px;
  height: 2px;
  background: ${colors.complimentary.main};
  margin-bottom: ${spacing[6]};
  transform-origin: left center;
`;

const InfoHeading = styled(motion.h1)`
  font-family: ${typography.fontFamily.heading};
  font-size: clamp(
    ${typography.fontSize["3xl"]},
    4vw,
    ${typography.fontSize["5xl"]}
  );
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.neutral.white};
  line-height: ${typography.lineHeight.tight};
  letter-spacing: ${typography.letterSpacing.tight};
  margin: 0 0 ${spacing[5]};
`;

const InfoSubtext = styled(motion.p)`
  font-size: ${typography.fontSize.lg};
  font-weight: ${typography.fontWeight.light};
  color: ${colors.neutral.gray300};
  line-height: ${typography.lineHeight.relaxed};
  margin: 0 0 ${spacing[10]};
  max-width: 440px;
`;

const ContactItem = styled(motion.div)`
  margin-bottom: ${spacing[5]};
`;

const ContactLabel = styled.div`
  font-size: ${typography.fontSize.xs};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.widest};
  text-transform: uppercase;
  color: ${colors.complimentary.main};
  margin-bottom: ${spacing[1]};
`;

const ContactValue = styled.div`
  font-size: ${typography.fontSize.base};
  color: ${colors.neutral.white};
  line-height: ${typography.lineHeight.relaxed};

  a {
    color: ${colors.neutral.white};
    text-decoration: none;
    transition: color 0.2s ease;

    @media (hover: hover) {
      &:hover {
        color: ${colors.complimentary.light};
      }
    }
  }
`;

// ============================================================================
// RIGHT COLUMN — Form Card
// ============================================================================

const FormCard = styled(motion.div)`
  background: ${colors.neutral.white};
  border-radius: ${borderRadius.xl};
  padding: ${spacing[8]};
  box-shadow: ${shadows["2xl"]};

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[6]} ${spacing[5]};
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const FormField = styled.div`
  margin-bottom: ${spacing[5]};
`;

const Label = styled.label`
  display: block;
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.primary.main};
  margin-bottom: ${spacing[2]};
`;

const Input = styled.input`
  width: 100%;
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.neutral.gray200};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.base};
  font-family: ${typography.fontFamily.primary};
  color: ${colors.secondary.main};
  background: ${colors.neutral.white};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.accent.main};
    box-shadow: 0 0 0 3px ${colors.accent.main}22;
  }

  &::placeholder {
    color: ${colors.neutral.gray400};
  }
`;

const Textarea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${spacing[3]} ${spacing[4]};
  border: 1px solid ${colors.neutral.gray200};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.base};
  font-family: ${typography.fontFamily.primary};
  color: ${colors.secondary.main};
  background: ${colors.neutral.white};
  resize: vertical;
  line-height: ${typography.lineHeight.relaxed};
  transition: all 0.2s ease;

  &:focus {
    outline: none;
    border-color: ${colors.accent.main};
    box-shadow: 0 0 0 3px ${colors.accent.main}22;
  }

  &::placeholder {
    color: ${colors.neutral.gray400};
  }
`;

const ErrorText = styled.span`
  color: ${colors.error};
  font-size: ${typography.fontSize.xs};
  margin-top: ${spacing[1]};
  display: block;
`;

const SubmitButton = styled(motion.button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: ${spacing[3]} ${spacing[8]};
  font-family: ${typography.fontFamily.primary};
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  letter-spacing: ${typography.letterSpacing.wider};
  text-transform: uppercase;
  color: ${colors.primary.darker};
  background: linear-gradient(
    135deg,
    ${colors.complimentary.main} 0%,
    ${colors.complimentary.light} 100%
  );
  border: none;
  border-radius: ${borderRadius.sm};
  cursor: pointer;
  min-height: 44px;
  transition: ${transitions.default};
  margin-top: ${spacing[2]};

  -webkit-tap-highlight-color: transparent;

  @media (hover: hover) {
    &:hover:not(:disabled) {
      background: linear-gradient(
        135deg,
        ${colors.complimentary.light} 0%,
        ${colors.complimentary.lightest} 100%
      );
      box-shadow: 0 2px 10px rgba(174, 151, 81, 0.15);
      transform: translateY(-1px);
    }
  }

  &:disabled {
    background: ${colors.neutral.gray300};
    color: ${colors.neutral.gray500};
    cursor: not-allowed;
    box-shadow: none;
  }

  &:focus-visible {
    outline: 2px solid ${colors.accent.main};
    outline-offset: 3px;
  }
`;

// ============================================================================
// MAIN COMPONENT
// ============================================================================

export default function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInputs>({ defaultValues });

  const [isFetching, isFetchingSet] = useState(false);
  const [showModal, showModalSet] = useState(false);

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...defaultValues });
    }
  }, [isSubmitSuccessful]);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    const requestData: IFormInputs = {
      ...data,
      email: data.email.trim().toLowerCase(),
    };

    isFetchingSet(true);
    const response = await fetch("/api/submit", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(requestData),
    });

    const content = (await response.json()) as IFetchResponse;
    isFetchingSet(false);

    if (content?.data?.emailId) {
      showModalSet(true);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | BDCS - BD Corporate Services"
        description="Get in touch with our team of experienced audit professionals. We're here to support your business needs."
        canonicalUrl="https://www.bdcs.me/contact"
        ogUrl="https://www.bdcs.me/contact"
        ogImgUrl="https://www.bdcs.me/og/og-contact.png"
      />
      <StructuredData
        data={[
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://www.bdcs.me" },
              { "@type": "ListItem", position: 2, name: "Contact Us", item: "https://www.bdcs.me/contact" },
            ],
          },
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contact Us",
            url: "https://www.bdcs.me/contact",
            description: "Get in touch with our team of experienced audit professionals. We're here to support your business needs.",
            mainEntity: {
              "@type": "Organization",
              name: "BD Corporate Services d.o.o.",
              email: "info@bdcs.me",
              telephone: "+382 68 811 727",
              address: [
                { "@type": "PostalAddress", addressLocality: "Podgorica", addressCountry: "ME" },
                { "@type": "PostalAddress", addressLocality: "Sarajevo", addressCountry: "BA" },
              ],
            },
          },
        ]}
      />
      <PageWrapper
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <DarkSection>
          <DarkTexture />
          <DarkGoldGlow />

          <TwoColGrid>
            {/* Left — Contact Information */}
            <InfoColumn
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-200px" }}
            >
              <GoldLine
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.7,
                  delay: 0.2,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              />

              <InfoHeading variants={fadeUp}>
                Ready to elevate your operations?
              </InfoHeading>

              <InfoSubtext variants={fadeUp}>
                Partner with a team whose expertise was forged at the highest
                levels of the profession.
              </InfoSubtext>

              <ContactItem variants={fadeUp}>
                <ContactLabel>Email</ContactLabel>
                <ContactValue>
                  <a href="mailto:info@bdcs.me">info@bdcs.me</a>
                </ContactValue>
              </ContactItem>

              <ContactItem variants={fadeUp}>
                <ContactLabel>Phone</ContactLabel>
                {PHONE_NUMBERS.map((phone) => (
                  <ContactValue key={phone.number}>
                    <a href={phone.href}>{phone.number}</a> ({phone.label})
                  </ContactValue>
                ))}
              </ContactItem>

              <ContactItem variants={fadeUp}>
                <ContactLabel>Offices</ContactLabel>
                {LOCATIONS.map((loc) => (
                  <ContactValue key={loc.city}>
                    {loc.city}, {loc.country}
                  </ContactValue>
                ))}
              </ContactItem>
            </InfoColumn>

            {/* Right — Form Card */}
            <FormCard
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-200px" }}
              transition={{ delay: 0.3 }}
            >
              <Form onSubmit={handleSubmit(onSubmit)}>
                <FormField>
                  <Label htmlFor="name">Name*</Label>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Your full name"
                    {...register("name", { required: true })}
                  />
                  {errors.name && <ErrorText>This field is required</ErrorText>}
                </FormField>

                <FormField>
                  <Label htmlFor="email">Email*</Label>
                  <Input
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    {...register("email", {
                      required: true,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    })}
                  />
                  {errors.email && errors.email.type === "required" && (
                    <ErrorText>This field is required</ErrorText>
                  )}
                  {errors.email && errors.email.type === "pattern" && (
                    <ErrorText>Please enter a valid email address</ErrorText>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="subject">Subject*</Label>
                  <Input
                    type="text"
                    id="subject"
                    placeholder="How can we help you?"
                    {...register("subject", { required: true })}
                  />
                  {errors.subject && (
                    <ErrorText>This field is required</ErrorText>
                  )}
                </FormField>

                <FormField>
                  <Label htmlFor="message">Message*</Label>
                  <Textarea
                    id="message"
                    placeholder="Tell us more about your inquiry..."
                    {...register("message", { required: true, minLength: 10 })}
                  />
                  {errors.message && errors.message.type === "required" && (
                    <ErrorText>This field is required</ErrorText>
                  )}
                  {errors.message && errors.message.type === "minLength" && (
                    <ErrorText>
                      Message must be at least 10 characters
                    </ErrorText>
                  )}
                </FormField>

                <SubmitButton
                  type="submit"
                  disabled={isFetching}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isFetching ? <Spinner /> : "Send Message"}
                </SubmitButton>
              </Form>
            </FormCard>
          </TwoColGrid>
        </DarkSection>

      </PageWrapper>

      {/* Success Dialog */}
      <Dialog showModal={showModal} showModalSet={showModalSet} />
    </>
  );
}
