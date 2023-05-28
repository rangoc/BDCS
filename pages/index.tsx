import Image from "next/legacy/image";
import styled from "styled-components";

import { Layout } from "../components/Layout";
import { SEO } from "../components/SEO";
import { QUERIES } from "../lib/constants";

import home from "../public/home.webp";

const HeadingWrapper = styled.div`
  text-align: center;
  margin-block-end: 3rem;
`;

const Title = styled.h1`
  font-size: 4rem;
  font-weight: 700;

  @media ${QUERIES.tabletAndDown} {
    font-size: 2.5rem;
  }

  @media ${QUERIES.mobileAndDown} {
    font-size: 2rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 2rem;
  font-weight: 300;
  letter-spacing: 2px;

  @media ${QUERIES.tabletAndDown} {
    font-size: 1.5rem;
  }
`;

const ImageWrapper = styled.div`
  max-width: 1020px;
  margin-inline: auto;
  margin-block-end: 3rem;
`;

const DescriptionWrapper = styled.div`
  max-width: 1024px;
  margin: auto;

  p:not(:first-child) {
    margin-block-start: 3rem;
  }
`;

const Description = styled.p`
  font-size: 1.125rem;
  font-weight: 300;

  @media ${QUERIES.tabletAndDown} {
    font-size: 1rem;
  }

  @media ${QUERIES.mobileAndDown} {
    padding-inline: 16px;
  }
`;

export default function Home() {
  return (
    <Layout>
      <SEO
        title="Home | BD Corporate Services d.o.o. Podgorica"
        description="As an outsourcing firm, we believe in setting the bar high. We go above and beyond to make sure all of our clients’ needs are not only met, but exceeded."
      />
      <HeadingWrapper>
        <Title>BD Corporate Services</Title>
        <Subtitle>Strive for quality</Subtitle>
      </HeadingWrapper>

      <ImageWrapper>
        <Image
          src={home}
          alt="Collegues walking together"
          layout="responsive"
          quality={100}
          priority
        />
      </ImageWrapper>

      <DescriptionWrapper>
        <Description>
          As an outsourcing firm located in Podgorica, Montenegro, we believe in
          setting the bar high, with an unwavering commitment to our clients as
          well as outstanding and uparalled service. We go above and beyond to
          make sure all of our clients' needs are not only met, but exceeded.
          For more information about us, check out our website and get in touch
          today.
        </Description>
      </DescriptionWrapper>
    </Layout>
  );
}
