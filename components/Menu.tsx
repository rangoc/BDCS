import Link from "next/link";
import styled from "styled-components";

export const StyledMenu = styled.nav<{ open: boolean }>`
  z-index: 2;
  background: black;
  color: white;
  height: 100vh;
  padding: 2rem;
  padding-top: 8rem;
  position: fixed;
  top: 0;
  right: -335px;
  transition: transform 0.3s ease-in-out;
  transform: ${({ open }) => (open ? "translateX(-335px)" : "translateX(0%)")};
`;

const List = styled.ul`
  list-style: none;
  padding: 0;
`;

const ListItem = styled.li`
  position: relative;
  width: max-content;
  a {
    color: inherit;
    text-decoration: none;
  }

  &::after {
    content: "";
    position: absolute;
    width: 100%;
    transform: scaleX(0);
    height: 2px;
    bottom: 0;
    left: 0;
    background-color: white;
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

export function Menu({ open }: { open: boolean }) {
  return (
    <StyledMenu open={open}>
      <List>
        <ListItem>
          <Link scroll={false} href="/">
            Home
          </Link>
        </ListItem>
        <ListItem>
          <Link scroll={false} href="/about">
            About Us
          </Link>
        </ListItem>
        <ListItem>
          <Link scroll={false} href="/why-choose-us">
            Why Choose Us
          </Link>
        </ListItem>
        <ListItem>
          <Link scroll={false} href="/our-team">
            Our Team
          </Link>
        </ListItem>
        <ListItem>
          <Link scroll={false} href="/contact">
            Contact
          </Link>
        </ListItem>
      </List>
    </StyledMenu>
  );
}
