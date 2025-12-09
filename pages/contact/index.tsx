/**
 * Contact Page
 *
 * Contact form with improved styling and user feedback
 * Includes form validation and success/error states
 */

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import styled from "styled-components";

import { Dialog } from "../../components/Dialog";
import { Layout } from "../../components/Layout";
import { ScrollReveal } from "../../components/ScrollReveal";
import { SEO } from "../../components/SEO";
import { Spinner } from "../../components/Spinner";
import {
  borderRadius,
  colors,
  mediaQueries,
  shadows,
  spacing,
  typography,
} from "../../lib/theme";

interface IFormInputs {
  name: string;
  email: string;
  subject: string;
  message: string;
}

interface IFetchResponse {
  data: {
    spreadsheetId: string;
  };
}

const defaultValues: IFormInputs = {
  name: "",
  email: "",
  subject: "",
  message: "",
};

// ============================================================================
// STYLED COMPONENTS
// ============================================================================

/**
 * Page wrapper
 */
const Wrapper = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

/**
 * Page title
 */
const PageTitle = styled.h1`
  font-size: ${typography.fontSize["4xl"]};
  font-weight: ${typography.fontWeight.bold};
  color: ${colors.primary.main};
  text-align: center;
  margin-bottom: ${spacing[4]};

  @media ${mediaQueries.tabletAndDown} {
    font-size: ${typography.fontSize["3xl"]};
  }

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize["2xl"]};
  }
`;

/**
 * Page subtitle
 */
const PageSubtitle = styled.p`
  font-size: ${typography.fontSize.lg};
  color: ${colors.secondary.lighter};
  text-align: center;
  margin-bottom: ${spacing[12]};

  @media ${mediaQueries.mobileAndDown} {
    font-size: ${typography.fontSize.base};
  }
`;

/**
 * Form container with card styling
 */
const FormWrapper = styled(motion.div)`
  max-width: 720px;
  margin: 0 auto ${spacing[8]};
  background-color: ${colors.neutral.white};
  padding: ${spacing[10]} ${spacing[8]};
  border-radius: ${borderRadius["3xl"]};
  box-shadow: ${shadows.xl};
  border: 1px solid ${colors.neutral.gray200};

  @media ${mediaQueries.tabletAndDown} {
    padding: ${spacing[8]} ${spacing[6]};
  }

  @media ${mediaQueries.mobileAndDown} {
    padding: ${spacing[6]} ${spacing[4]};
  }
`;

/**
 * Form element
 */
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${spacing[6]};
`;

/**
 * Form field wrapper
 */
const FormField = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: ${spacing[2]};
`;

/**
 * Form label
 */
const Label = styled.label`
  font-size: ${typography.fontSize.sm};
  font-weight: ${typography.fontWeight.semibold};
  color: ${colors.primary.main};
`;

/**
 * Text input
 */
const Input = styled.input`
  padding: ${spacing[3]} ${spacing[4]};
  border: 2px solid ${colors.neutral.gray200};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.base};
  color: ${colors.secondary.main};
  background-color: ${colors.neutral.white};
  transition: all 0.2s ease-out;

  &:focus {
    outline: none;
    border-color: ${colors.accent.main};
    box-shadow: 0 0 0 3px ${colors.accent.main}22;
  }

  &::placeholder {
    color: ${colors.neutral.gray400};
  }
`;

/**
 * Textarea for message
 */
const Message = styled.textarea`
  min-height: 150px;
  padding: ${spacing[3]} ${spacing[4]};
  border: 2px solid ${colors.neutral.gray200};
  border-radius: ${borderRadius.lg};
  font-size: ${typography.fontSize.base};
  color: ${colors.secondary.main};
  background-color: ${colors.neutral.white};
  resize: vertical;
  font-family: ${typography.fontFamily.primary};
  line-height: ${typography.lineHeight.relaxed};
  transition: all 0.2s ease-out;

  &:focus {
    outline: none;
    border-color: ${colors.accent.main};
    box-shadow: 0 0 0 3px ${colors.accent.main}22;
  }

  &::placeholder {
    color: ${colors.neutral.gray400};
  }
`;

/**
 * Error message
 */
const Error = styled.span`
  color: ${colors.error};
  font-size: ${typography.fontSize.xs};
  margin-top: ${spacing[1]};
`;

/**
 * Submit button
 */
export const SubmitButton = styled(motion.button)`
  cursor: pointer;
  width: 100%;
  max-width: 320px;
  height: 56px;
  margin: ${spacing[4]} auto 0;
  padding: ${spacing[3]} ${spacing[6]};
  background-color: rgba(1, 24, 73, 0.95);
  color: ${colors.neutral.white};
  font-weight: ${typography.fontWeight.semibold};
  font-size: ${typography.fontSize.base};
  text-transform: uppercase;
  letter-spacing: ${typography.letterSpacing.wide};
  border: 2px solid ${colors.primary.main};
  border-radius: ${borderRadius.xl};
  transition: all 0.3s ease-out;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: ${shadows.md};

  &:hover:not(:disabled) {
    background-color: rgba(1, 24, 73, 0.9);
    border-color: ${colors.primary.light};
    box-shadow: ${shadows.lg};
    transform: translateY(-2px);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    background-color: ${colors.neutral.gray300};
    border-color: ${colors.neutral.gray300};
    color: ${colors.neutral.gray500};
    cursor: not-allowed;
    box-shadow: none;
  }
`;

/**
 * Help text/caption
 */
const Caption = styled.p`
  text-align: center;
  font-size: ${typography.fontSize.sm};
  color: ${colors.secondary.lighter};
  font-style: italic;
  margin-top: ${spacing[8]};

  a {
    color: ${colors.accent.main};
    font-weight: ${typography.fontWeight.semibold};
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export default function Contact({ ...pageProps }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<IFormInputs>({ defaultValues });

  const [isFetching, isFetchingSet] = useState(false);
  const [showModal, showModalSet] = useState(false);

  // Reset form after succesful submit
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

    if (content?.data?.spreadsheetId) {
      showModalSet(true);
    }

    console.log("Submit::FetchResponse::", content);
  };

  return (
    <Layout>
      <SEO
        title="Contact Us | BD Corporate Services d.o.o. Podgorica"
        description="Get in touch with our team of experienced audit professionals. We're here to support your business needs."
        canonicalUrl="https://www.bdcs.me/contact"
        ogUrl="https://www.bdcs.me/contact"
        ogImgUrl="https://www.bdcs.me/logo.webp"
      />
      <Wrapper>
        {/* Page Header */}
        <ScrollReveal>
          <PageTitle>Get in Touch</PageTitle>
          <PageSubtitle>
            Have a question or want to work together? We'd love to hear from
            you.
          </PageSubtitle>
        </ScrollReveal>

        {/* Contact Form */}
        <ScrollReveal>
          <FormWrapper
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
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
                {errors.name && <Error>This field is required</Error>}
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
                  <Error>This field is required</Error>
                )}
                {errors.email && errors.email.type === "pattern" && (
                  <Error>Please enter a valid email address</Error>
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
                {errors.subject && <Error>This field is required</Error>}
              </FormField>

              <FormField>
                <Label htmlFor="message">Message*</Label>
                <Message
                  id="message"
                  placeholder="Tell us more about your inquiry..."
                  {...register("message", { required: true, minLength: 10 })}
                />
                {errors.message && errors.message.type === "required" && (
                  <Error>This field is required</Error>
                )}
                {errors.message && errors.message.type === "minLength" && (
                  <Error>Message must be at least 10 characters</Error>
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
          </FormWrapper>
        </ScrollReveal>

        {/* Alternative Contact */}
        <Caption>
          Having trouble with the form? You can also reach us directly at{" "}
          <Link href="mailto:info@bdcs.me">info@bdcs.me</Link>
        </Caption>
      </Wrapper>

      {/* Success Dialog */}
      <Dialog showModal={showModal} showModalSet={showModalSet} />
    </Layout>
  );
}
