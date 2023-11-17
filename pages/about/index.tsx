import Image from "next/legacy/image";
import styled from "styled-components";
import { Layout } from "../../components/Layout";

import { SEO } from "../../components/SEO";
import { ABOUT_US, QUERIES } from "../../lib/constants";
import about from "../../public/about.webp";
import { useState } from "react";

const Wrapper = styled.div`
  max-width: 1200px;
  padding-block-end: 64px;
  margin: auto;

  section:nth-child(2) {
    margin-block-start: 8rem;
  }

  section:nth-child(3) {
    margin-block-start: 4rem;
  }
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: 700;
  margin-block-end: 1rem;
  @media ${QUERIES.mobileAndDown} {
    padding-inline: 16px;
  }
`;
const ListItem = styled.li<{ isSelected: boolean }>`
  font-size: 2rem;
  font-weight: 700;
  position: relative;
  cursor: pointer;

  &::after {
    content: "";
    position: absolute;
    width: ${({ isSelected }) => (isSelected ? "100%" : "0%")};
    transform: ${({ isSelected }) => (isSelected ? "scaleX(1)" : "scaleX(0)")};
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: black;
    transform-origin: bottom left;
    transition: transform 0.25s ease-out;
  }

  @media ${QUERIES.mobileAndDown} {
    font-size: 1.2rem;
  }
`;

export const Description = styled.p`
  font-size: 1.125rem;
  font-weight: 300;
  text-align: justify;

  @media ${QUERIES.tabletAndDown} {
    font-size: 1rem;
  }

  @media ${QUERIES.mobileAndDown} {
    padding-inline: 16px;
  }
`;

const Switcher = styled.ul`
  display: flex;
  list-style: none;
  align-items: center;
  justify-content: space-around;
  margin-block-end: 3rem;
  padding: 0;

  @media ${QUERIES.mobileAndDown} {
    padding-inline: 16px;
    justify-content: space-between;
  }
`;

export default function About({ ...pageProps }) {
  const [selectedItem, setSelectedItem] = useState<string | null>("Mission");

  const handleClick = (title: string) => {
    setSelectedItem(title);
  };

  return (
    <Layout>
      <SEO
        title="About Us | BD Corporate Services d.o.o. Podgorica"
        description="BDCS explores and realizes opportunities with the provision of high quality in accounting and audit services that go beyond cost reductions."
        ogUrl={pageProps.canonical}
      />
      <Wrapper>
        <section>
          <Title>About BD Corporate Services</Title>
          <Description>
            BD Corporate services is an outsourcing firm consisting of highly
            dedicated experienced staff with different knowledge within audit
            gained at Big 4 firms. We offer a flexible hybrid team from junior
            to manager level that will be able to respond on various audit tasks
            at your request. With all the experience gained in auditing the
            local Dutch companies reporting under Dutch GAAP, and the knowledge
            of various IFRS experts, we can ensure that our clients receive
            great support.
          </Description>
        </section>

        <section>
          <Switcher>
            {ABOUT_US.map((item) => (
              <ListItem
                key={item.title}
                onClick={() => handleClick(item.title)}
                isSelected={selectedItem === item.title}
              >
                {item.title}
              </ListItem>
            ))}
          </Switcher>

          {ABOUT_US.map((item) => (
            <div key={item.description}>
              {selectedItem === item.title && (
                <Description
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></Description>
              )}
            </div>
          ))}
        </section>
        <section>
          <Image
            src={about}
            alt="We care about our clients and products"
            layout="responsive"
          />
        </section>
      </Wrapper>
    </Layout>
  );
}
