import styled from "styled-components";
import { motion } from "framer-motion";
import { QUERIES } from "../lib/constants";

interface ILayoutProps {
  children: React.ReactNode;
}

const variants = {
  hidden: { opacity: 0, x: 0, y: 0 },
  enter: { opacity: 1, x: 0, y: 0 },
  exit: { opacity: 0, x: 0, y: 0 },
};

const Content = styled(motion.main)`
  padding-block: 64px;
  padding-inline: 64px;
  margin-block-end: 6rem;

  @media ${QUERIES.mobileAndDown} {
    /* padding-inline: 32px; */
    padding-inline: 0;
  }
`;

export function Layout({ children }: ILayoutProps) {
  return (
    <Content
      initial="hidden"
      animate="enter"
      exit="exit"
      variants={variants}
      transition={{ type: "linear" }}
    >
      {children}
    </Content>
  );
}
