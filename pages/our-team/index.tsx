import Image from "next/legacy/image";
import styled from "styled-components";
import { Layout } from "../../components/Layout";

import { SEO } from "../../components/SEO";
import { OUR_TEAM, QUERIES } from "../../lib/constants";

import mailIcon from "../../public/mail.png";
import linkedinIcon from "../../public/linkedin.png";
import phoneIcon from "../../public/phone.png";
import Link from "next/link";

const Wrapper = styled.div`
  max-width: 1200px;
  padding-block-end: 64px;
  margin: auto;
  @media ${QUERIES.mobileAndDown} {
    padding-inline: 16px;
  }
`;

const Articles = styled.section`
  display: grid;
  gap: 5rem;
`;
const ImageWrapper = styled.div`
  max-width: 300px;
  height: 300px;
  overflow: clip;
`;

const Article = styled.article`
  display: flex;
  gap: 32px;

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
  margin-inline-start: 0.5rem;
  @media ${QUERIES.mobileAndDown} {
    margin-block-start: 8px;
    margin-inline-start: 0;
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
        description="BD Corporate services is an outsourcing firm consisting of highly dedicated experienced staff with different knowledge within audit gained at Big 4 firms. We offer a flexible hybrid team from junior to manager level that will be able to respond on various audit tasks at your request. With all the experience gained in auditing the local Dutch companies reporting under Dutch GAAP, and the knowledge of various IFRS experts, we can ensure that our clients receive great support."
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
                      <Link href={linkedin}>
                        <ArticleIconWrapper>
                          <Image src={linkedinIcon} />
                        </ArticleIconWrapper>
                      </Link>
                    )}
                    <ArticleIconWrapper>
                      <Link href={`tel:${phone}`}>
                        <Image src={phoneIcon} />
                      </Link>
                    </ArticleIconWrapper>
                    <ArticleIconWrapper>
                      <Link href={`mailto:${email}`}>
                        <Image src={mailIcon} />
                      </Link>
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
