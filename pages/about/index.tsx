import Image from "next/legacy/image";
import styled from "styled-components";
import { Layout } from "../../components/Layout";

import { SEO } from "../../components/SEO";
import { QUERIES } from "../../lib/constants";
import about from "../../public/about.webp";

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
`;

const CopyWrapper = styled.section`
  max-width: 768px;
  text-align: center;
  margin: auto;
`;

const Article = styled.article`
  margin-block-end: 3rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-block-end: 1rem;
`;

const Description = styled.p`
  font-size: 1.125rem;
  font-weight: 300;

  @media ${QUERIES.tabletAndDown} {
    font-size: 1rem;
  }

  @media ${QUERIES.mobileAndDown} {
    padding-inline: 8px;
  }
`;

const ImageWrapper = styled.section``;

export default function About({ ...pageProps }) {
  return (
    <Layout>
      <SEO
        title="About | BD Corporate Services d.o.o. Podgorica"
        description="BDCS explores and realizes opportunities with the provision of high quality in accounting and audit services that go beyond cost reductions."
        ogUrl={pageProps.canonical}
      />
      <Wrapper>
        <CopyWrapper>
          <Article>
            <Title>Mission</Title>
            <Description>
              BDCS explores and realizes opportunities with the provision of{" "}
              <strong>high quality</strong> in accounting and audit services
              that go beyond <strong>cost reductions</strong>.<br /> BDCS
              ensures <strong>time efficiency and reduced overheads</strong>,
              resulting in our clients ability to have a greater focus on other
              areas of their business.
            </Description>
          </Article>
          <Article>
            <Title>Vision</Title>
            <Description>
              To be recognized as{" "}
              <strong>one of the top outsourcing companies</strong> as a center
              of excellence for providing accounting and audit services. We aim
              to do that with the efforts of our dedicated team through{" "}
              <strong>commitment</strong> to <strong>excellence</strong>,{" "}
              <strong>integrity</strong> and <strong>responsiveness</strong>.
            </Description>
          </Article>
          <Article>
            <Title>Values</Title>
            <Description>
              <strong>Quality</strong> – At BDCS we strive for quality that
              delivers premium value to our clients.
              <br />
              <strong>Teamwork</strong> – We work together to meet the needs of
              our clients and to help BDCS excel.
              <br />
              <strong>Respect for people</strong> – We value our people,
              encourage their development, recognize and reward their
              performance.
              <br />
              <strong>Excellence</strong> – We are dedicated to our work to
              retain our image for providing excellent and high quality service.
              <br />
              <strong>Integrity</strong> – Integrity builds trust. We are
              committed to individual and organizational success through open
              and honest cooperation.
            </Description>
          </Article>
        </CopyWrapper>
        <ImageWrapper>
          <Image
            src={about}
            alt="We care about our clients and products"
            layout="responsive"
          />
        </ImageWrapper>
      </Wrapper>
    </Layout>
  );
}
