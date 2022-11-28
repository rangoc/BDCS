import Image from "next/legacy/image";
import Link from "next/link";
import styled from "styled-components";

import { QUERIES } from "../lib/constants";

import logo from "../public/favicon.ico";

const Wrapper = styled.header`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  background-color: white;
  padding-block-start: 32px;
`;

const LogoWrapper = styled.div`
  width: 302px;
  background-color: white;

  @media ${QUERIES.tabletAndDown} {
    width: 202px;
  }

  @media ${QUERIES.mobileAndDown} {
    width: 102px;
  }
`;

const Navbar = styled.nav`
  padding-inline: 8px;
`;

const List = styled.ul`
  display: flex;
  list-style: none;
  padding: 0;
  color: black;
`;

const ListItem = styled.li`
  position: relative;
  a {
    color: inherit;
    text-decoration: none;
  }

  &:not(:first-of-type) {
    margin-inline-start: 30px;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: black;
    transform-origin: bottom right;
    transition: transform 0.25s ease-out;
  }

  &:hover {
    &::after {
      transform: scaleX(1);
      transform-origin: bottom left;
    }
  }
`;

export function Header() {
  return (
    <Wrapper>
      <LogoWrapper>
        <Image
          src={logo}
          alt="BD Corporate Services"
          priority={true}
          layout="responsive"
        />
      </LogoWrapper>
      <Navbar>
        <List>
          <ListItem>
            <Link scroll={false} href="/">
              Home
            </Link>
          </ListItem>
          <ListItem>
            <Link scroll={false} href="/about">
              About
            </Link>
          </ListItem>
          <ListItem>
            <Link scroll={false} href="/why-choose-us">
              Why Choose Us
            </Link>
          </ListItem>
          <ListItem>
            <Link scroll={false} href="/contact">
              Contact
            </Link>
          </ListItem>
        </List>
      </Navbar>
    </Wrapper>
  );
}
