import Image from "next/legacy/image";
import styled from "styled-components";

import { Layout } from "../../components/Layout";
import { SEO } from "../../components/SEO";
import { QUERIES } from "../../lib/constants";

import whyResource from "../../public/chooseUs.webp";

const Wrapper = styled.section`
  max-width: 1200px;
  display: flex;
  align-items: center;
  margin: auto;
  gap: 50px;

  @media ${QUERIES.tabletAndDown} {
    flex-direction: column;
    align-items: revert;
  }
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;

  @media ${QUERIES.tabletAndDown} {
    align-items: center;
  }
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-block-end: 64px;
  max-width: 512px;
  text-align: center;
`;

const BreakLine = styled.br`
  @media ${QUERIES.tabletAndDown} {
    display: none;
  }
`;

const Articles = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 50px;
`;

const Article = styled.article`
  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-end;
  align-items: center;
`;

const Caption = styled.p`
  font-size: 1.5rem;
  margin-block-start: 24px;
  text-align: center;
  font-weight: 300;
  @media ${QUERIES.mobileAndDown} {
    font-size: 1rem;
  }
`;

const ArticleImage = styled.div`
  width: 40px;
  height: 40px;

  svg {
    width: 100%;
    height: 100%;
  }
`;

const ImageWrapper = styled.div`
  flex: 1;
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
          <Title>
            Why choose <BreakLine />
            BD Corporate Services
          </Title>
          <Articles>
            <Article>
              <Caption>Professional Approach</Caption>
              <ArticleImage>
                <svg
                  preserveAspectRatio="xMidYMid meet"
                  data-bbox="0 16.7 200.1 166.7"
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 16.7 200.1 166.7"
                  role="presentation"
                  aria-hidden="true"
                >
                  <g>
                    <path d="M195.8 41.7h-52.1c0-.1.1-.2.1-.4 0-13.8-11-24.6-25-24.6H85.4c-14 0-25 10.6-25 24.2 0 .3.1.5.2.8H4.2c-2.3 0-4.2 1.9-4.2 4.2v133.3c0 2.3 1.9 4.2 4.2 4.2h191.7c2.3 0 4.2-1.9 4.2-4.2V45.8c-.1-2.3-2-4.1-4.3-4.1zm-127-.8C68.8 32 76.1 25 85.4 25h33.3c9.3 0 16.7 7.2 16.7 16.3 0 .1.1.2.1.4H68.6c.1-.3.2-.5.2-.8zM191.7 175H8.3v-71.2c6.6 7.7 16.3 12.9 26.6 12.9h134.4c8.9 0 16.8-4.1 22.4-10.6V175zm0-92.7c0 12.8-8.4 26-22.4 26H34.9c-13.7 0-26.6-12.6-26.6-26V50h183.3l.1 32.3zm-89.6 20.4c6.9 0 12.5-5.6 12.5-12.5s-5.6-12.5-12.5-12.5-12.5 5.6-12.5 12.5c0 6.8 5.6 12.5 12.5 12.5zm0-16.7c2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2s-4.2-1.9-4.2-4.2 1.9-4.2 4.2-4.2z"></path>
                  </g>
                </svg>
              </ArticleImage>
            </Article>
            <Article>
              <Caption>Competitive Pricing</Caption>
              <ArticleImage>
                <svg
                  preserveAspectRatio="xMidYMid meet"
                  data-bbox="7.961 0.012 184.079 200.088"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="7.961 0.012 184.079 200.088"
                  role="presentation"
                  aria-hidden="true"
                >
                  <g>
                    <path d="M191.8 177.8C185.5 152 144.9 72 143.2 68.6l-1.2-2.3H58l-1.2 2.3C55.1 72 14.5 152.4 8.2 178.2c-.4 1.8-.2 4.4-.1 5.5.2 8.8 10.4 16.4 18.8 16.4h146.2c8.9 0 18.8-6.7 18.8-15.3.1-1.9.3-5.2-.1-7zm-8.3 6.6c0 3.7-6 7.3-10.4 7.3H26.9c-4.7 0-10.4-4.6-10.4-8.3v-.5c-.1-.9-.2-2.3-.1-2.8 5.5-22.5 40-92 46.8-105.5H137c6.8 13.5 41.3 82.6 46.7 105 0 .6 0 2.7-.2 4.8zM140.8 49.6c2.3 0 4.2 1.9 4.2 4.2 0 2.3-1.9 4.2-4.2 4.2H57.2c-2.3 0-4.2-1.9-4.2-4.2 0-2.3 1.9-4.2 4.2-4.2h83.6zm-66.3-8.4h17.1c1.3 0 2.4-.6 3.2-1.5.8-1 1.1-2.2.9-3.5C91.5 14.9 79.4 1.4 63.4.1 51.9-.8 41.1 5.3 37.6 14.7c-1.5 4.1-1.2 8.1 1 11.6 7.1 11.5 33 14.6 35.9 14.9zM45.4 17.6c2.2-5.9 9.5-9.8 17.3-9.2 10.9.9 19.5 9.9 23.7 24.4H75.1c-9.5-1-25.7-4.9-29.5-11-.7-1.2-.8-2.6-.2-4.2zm62.3 23.6h17.1c2.9-.3 28.8-3.3 35.9-14.9 2.2-3.5 2.5-7.6 1-11.6C158.2 5.3 147.4-.8 136 .1c-16 1.3-28.1 14.8-32.4 36.1-.2 1.2.1 2.5.9 3.5.8.9 1.9 1.5 3.2 1.5zm28.9-32.8c7.8-.6 15 3.2 17.3 9.2.6 1.6.5 3-.3 4.3-3.7 6.1-20 9.9-29.5 11H113c4.1-14.6 12.8-23.6 23.6-24.5zm-14.2 141.1c0 10.2-7.1 17.3-17.9 18.8v5.1c0 2.3-1.9 4.2-4.2 4.2s-4.2-1.9-4.2-4.2v-5.1c-10.9-1.5-17.9-8.6-17.9-18.8 0-2.3 1.9-4.2 4.2-4.2 2.3 0 4.2 1.9 4.2 4.2 0 10 10.5 10.7 13.7 10.7s13.7-.8 13.7-10.7c0-6.2-2.4-7.7-12.7-12.7l-5.8-2.9c-10.1-5-17.4-8.6-17.4-20.2 0-10.2 7.1-17.5 17.9-18.9v-5c0-2.3 1.9-4.2 4.2-4.2s4.2 1.9 4.2 4.2v5c10.7 1.5 17.7 8.7 17.7 18.9 0 2.3-1.9 4.2-4.2 4.2-2.3 0-4.2-1.9-4.2-4.2 0-10.1-10.3-10.9-13.5-10.9-6.6 0-13.7 2.9-13.7 10.9 0 6.2 2.4 7.6 12.7 12.7l5.8 2.9c10.2 5 17.4 8.6 17.4 20.2z"></path>
                  </g>
                </svg>
              </ArticleImage>
            </Article>
            <Article>
              <Caption>Personalized Attention</Caption>
              <ArticleImage>
                <svg
                  preserveAspectRatio="xMidYMid meet"
                  data-bbox="0 0.744 200 198.556"
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="0 0.744 200 198.556"
                  role="presentation"
                  aria-hidden="true"
                >
                  <g>
                    <path d="M144.8 80.7V63.4c0-4 0-10.9-8.7-12.6V37.5c0-14.8-4.6-25.3-13.7-31.3-17.9-11.8-46.7-1.1-52.1 1C54.1 7.7 41 21.1 41 37.5v14.7c-3.4 2-8.7 5.9-8.7 11.3v17.3c0 6.2 6.3 10.8 12.1 12.4 1.3 15.9 10.6 33.2 24 43.4l-10.2 15.7H47.6c-28 0-47.6 17.3-47.6 42.1 0 2.4 1.9 4.3 4.3 4.3s4.3-1.9 4.3-4.3c0-23.1 19.6-33.5 38.9-33.5h13c1.5 0 2.8-.7 3.6-2l11.5-17.7c5.5 2.8 11.5 4.5 17.8 4.5 25.4 0 43.5-27.1 45-52.7 3.2-1.4 6.4-4.6 6.4-12.3zm-8.7 0c0 4.3-1.1 4.3-1.8 4.3-2.4 0-4.3 1.9-4.3 4.3 0 22.5-15.6 47.6-36.4 47.6-21.9 0-40.6-26.2-40.6-47.6 0-2.4-1.9-4.3-4.3-4.3-3.4 0-7.6-2.9-7.6-4.3V63.4c.2-1 3-3.4 6.1-4.7 1.6-.7 2.6-2.2 2.6-3.9V37.5c0-11.9 9.7-21.6 21.6-21.6.6 0 1.2-.1 1.7-.3.2-.1 14.7-6.2 28.6-6.2 5.8 0 11.5 1.1 16.1 4.1 6.5 4.3 9.8 12.4 9.8 24.1v17.3c0 2.4 1.9 4.3 4.3 4.3 4.3 0 4.3 0 4.3 4.3v17.2zm42.4 49.3c-6 0-11.6 2.5-15.6 6.7-4-4.3-9.7-6.8-15.7-6.8-11.9 0-21.5 9.8-21.5 21.8 0 5.3 1.9 10.6 5.2 14.3.1.1.2.2.2.3l28.6 31.6c.8.9 2 1.4 3.2 1.4 1.2 0 2.4-.5 3.2-1.4l28.5-31.6c.1-.1.1-.2.2-.3 3.3-3.7 5.2-9 5.2-14.4 0-11.9-9.7-21.6-21.5-21.6zm9.7 30.4c-.1.1-.2.2-.3.4l-25 27.8-25.1-27.7c-.1-.1-.2-.3-.3-.4-1.9-2-3.2-5.5-3.2-8.7 0-7.1 5.9-13.2 12.9-13.2 5 0 9.6 3 11.7 7.6.7 1.5 2.2 2.5 3.9 2.5 1.7 0 3.2-1 3.9-2.5 2.1-4.5 6.7-7.5 11.7-7.5 7.1 0 12.9 5.8 12.9 13 0 3.2-1.2 6.7-3.1 8.7z"></path>
                  </g>
                </svg>
              </ArticleImage>
            </Article>
            <Article>
              <Caption>National Standards</Caption>
              <ArticleImage>
                <svg
                  preserveAspectRatio="xMidYMid meet"
                  data-bbox="16.6 0 166.7 200.1"
                  xmlns="http://www.w3.org/2000/svg"
                  width="200"
                  height="200"
                  viewBox="16.6 0 166.7 200.1"
                  role="presentation"
                  aria-hidden="true"
                >
                  <g>
                    <path d="M179.2 0H20.8c-2.3 0-4.2 1.9-4.2 4.2v191.7c0 2.3 1.9 4.2 4.2 4.2h158.3c2.3 0 4.2-1.9 4.2-4.2V4.2c0-2.3-1.8-4.2-4.1-4.2zM175 191.7H25V8.3h150v183.4zm-45-62c0-.1 0-.1 0 0 .4-2 .6-4.1.6-6.2 0-16.1-13.1-29.2-29.2-29.2s-29.2 13.1-29.2 29.2c0 2.1.2 4.1.7 6.1l-.1.1-25 41.7c-.9 1.5-.8 3.4.3 4.8s2.9 1.9 4.6 1.3l22.6-7.5 14.8 14.8c.8.8 1.9 1.2 2.9 1.2.4 0 .7 0 1.1-.2 1.4-.4 2.6-1.5 2.9-3l4.3-17.2 4.3 17.2c.4 1.5 1.5 2.6 2.9 3 .4.1.7.2 1.1.2 1.1 0 2.2-.4 2.9-1.2l14.8-14.8 22.6 7.5c1.7.5 3.5 0 4.6-1.3 1.1-1.4 1.2-3.3.3-4.8L130 129.7zm-28.6-27.1c11.5 0 20.8 9.3 20.8 20.8s-9.3 20.8-20.8 20.8-20.8-9.3-20.8-20.8c0-11.4 9.4-20.8 20.8-20.8zm-10.6 71.1l-11.5-11.5c-1.1-1.1-2.8-1.5-4.3-1L60.8 166l16.1-26.8c4.3 6.7 11.2 11.5 19.3 13l-5.4 21.5zm37-12.5c-1.5-.5-3.1-.1-4.3 1L112 173.7l-5.4-21.5c8.1-1.5 15-6.3 19.3-13L142 166l-14.2-4.8zm-65.3-132c0-2.3 1.9-4.2 4.2-4.2h66.7c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2H66.7c-2.3-.1-4.2-1.9-4.2-4.2zm4.2 54.1c-2.3 0-4.2-1.9-4.2-4.2s1.9-4.2 4.2-4.2h66.7c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2H66.7zM37.5 54.2c0-2.3 1.9-4.2 4.2-4.2h116.7c2.3 0 4.2 1.9 4.2 4.2s-1.9 4.2-4.2 4.2H41.7c-2.3-.1-4.2-1.9-4.2-4.2z"></path>
                  </g>
                </svg>
              </ArticleImage>
            </Article>
          </Articles>
        </Content>
        <ImageWrapper>
          <Image
            src={whyResource}
            alt="By choosing us, you won't make a mistake."
            layout="responsive"
          />
        </ImageWrapper>
      </Wrapper>
    </Layout>
  );
}
