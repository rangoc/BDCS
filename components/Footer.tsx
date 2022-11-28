import styled from "styled-components";

const Wrapper = styled.footer`
  display: flex;
  justify-content: center;
  padding-block: 16px;
  color: white;
  background-color: black;
`;

export function Footer() {
  return (
    <Wrapper>
      <p>Ⓒ 2022 by BD Corporate Services</p>
    </Wrapper>
  );
}
