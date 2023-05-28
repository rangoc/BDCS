import Image from "next/legacy/image";
import styled from "styled-components";
import { Layout } from "../../components/Layout";

import { SEO } from "../../components/SEO";
import { OUR_TEAM, QUERIES } from "../../lib/constants";

import mailIcon from "../../public/mail.png";
import linkedinIcon from "../../public/linkedin.png";
import phoneIcon from "../../public/phone.png";

const Wrapper = styled.div`
  max-width: 1200px;
  margin: auto;
  padding-inline: 16px;
`;

const Articles = styled.section`
  display: grid;
  gap: 5rem;
`;
const ImageWrapper = styled.div`
  max-width: 300px;
  height: 300px;
`;

const Article = styled.article`
  display: flex;
  gap: 16px;

  @media ${QUERIES.tabletAndDown} {
    flex-direction: column;
  }
`;

const ArticleInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 16px;
  flex: 1;
`;

const ArticleName = styled.h2`
  margin-block-end: 16px;
  line-height: 1;
`;

const ArticleRole = styled.span`
  font-weight: 300;
  font-size: 1.5rem;
  font-style: italic;
  @media ${QUERIES.mobileAndDown} {
    margin-block-start: 8px;
    display: block;
  }
`;

const ArticleContact = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: max-content;
  justify-content: space-between;
`;

const ArticleIconWrapper = styled.div`
  width: 25px;
  height: 25px;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-block-end: 64px;
`;

const ArticleDescription = styled.p`
  font-size: 1.125rem;
  font-weight: 300;
  margin-block-start: 1rem;
  @media ${QUERIES.tabletAndDown} {
    font-size: 1rem;
  }
`;

export default function OurTeam({ ...pageProps }) {
  return (
    <Layout>
      <SEO
        title="Our Team | BD Corporate Services d.o.o. Podgorica"
        description="Meet our Team"
        ogUrl={pageProps.canonical}
      />
      <Wrapper>
        <Title>Meet our Team</Title>
        <Articles>
          {OUR_TEAM.map(
            ({ name, bio, role, image, linkedin, email, phone }) => (
              <Article key={email}>
                <ImageWrapper>
                  <Image src={image} />
                </ImageWrapper>
                <ArticleInformation>
                  <div>
                    <ArticleName>
                      {name} <ArticleRole>{role}</ArticleRole>
                    </ArticleName>
                    <ArticleDescription>{bio}</ArticleDescription>
                  </div>

                  <ArticleContact>
                    {linkedin && (
                      <a href={linkedin}>
                        <ArticleIconWrapper>
                          <Image src={linkedinIcon} />
                        </ArticleIconWrapper>
                      </a>
                    )}
                    <ArticleIconWrapper>
                      <a href={`tel:${phone}`}>
                        <Image src={phoneIcon} />
                      </a>
                    </ArticleIconWrapper>
                    <ArticleIconWrapper>
                      <a href={`mailto:${email}`}>
                        <Image src={mailIcon} />
                      </a>
                    </ArticleIconWrapper>
                  </ArticleContact>
                </ArticleInformation>
              </Article>
            )
          )}
        </Articles>
      </Wrapper>
    </Layout>
  );
}
