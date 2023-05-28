import Image from "next/legacy/image";
import styled from "styled-components";

import { Layout } from "../../components/Layout";
import { SEO } from "../../components/SEO";
import { QUERIES, WHY_CHOOSE_US } from "../../lib/constants";

import whyResource from "../../public/chooseUs.webp";

const Wrapper = styled.section`
  max-width: 1200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  gap: 50px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  @media ${QUERIES.mobileAndDown} {
    padding-inline: 16px;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-block-end: 64px;
`;

const Articles = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  article:not(:first-child) {
    margin-block-start: 3rem;
  }
`;

const Article = styled.article`
  display: flex;
  flex-direction: column;
`;

const Caption = styled.p`
  font-size: 1.5rem;
  font-weight: 500;
  line-height: 2rem;
`;

const ArticleImage = styled.div`
  width: 40px;
  height: 40px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ArticleHeader = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 18px;
`;

const ArticleDescription = styled.p`
  font-size: 1.125rem;
  font-weight: 300;
  margin-block-start: 1rem;
  @media ${QUERIES.tabletAndDown} {
    font-size: 1rem;
  }
`;

export default function WhyChooseUs({ ...pageProps }) {
  return (
    <Layout>
      <SEO
        title="Why Choose Us | BD Corporate Services d.o.o. Podgorica"
        description="Professional approach. Competitive pricing. Personalised attention. National standards."
        ogUrl={pageProps.canonical}
      />
      <Wrapper>
        <Content>
          <Title>Why choose BD Corporate Services</Title>
          <Articles>
            {WHY_CHOOSE_US.map(({ title, description, image }) => (
              <Article key={title}>
                <ArticleHeader>
                  <ArticleImage>{image}</ArticleImage>
                  <Caption>{title}</Caption>
                </ArticleHeader>
                <ArticleDescription>{description}</ArticleDescription>
              </Article>
            ))}
          </Articles>
        </Content>

        <Image
          src={whyResource}
          alt="By choosing us, you won't make a mistake."
        />
      </Wrapper>
    </Layout>
  );
}
