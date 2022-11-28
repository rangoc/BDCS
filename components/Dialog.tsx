import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import styled from "styled-components";

import tick from "../public/tick.png";

interface IDialogProps {
  showModal: boolean;
  showModalSet: (showModal: boolean) => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  width: 100%;
  inset: 0;
  background-color: hsla(188, 100%, 3%, 0.4);
`;

const Modal = styled.div`
  width: 320px;
  height: 320px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 32px;
  padding-block-start: 80px;
  inset: 0;
  margin: auto;
  background-color: white;
  border-radius: 1rem;
`;

const ImageWrapper = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: -35px;
  margin: auto;
  width: 75px;
  height: 75px;
`;

const Content = styled.div`
  text-align: center;
`;

const Button = styled.button`
  cursor: pointer;
  max-width: 320px;
  min-width: 240px;
  padding: 8px;
  background-color: black;
  color: white;
  font-weight: 700;
  text-transform: uppercase;
  border: 2px solid black;
  transition: all 0.25s ease-out;

  @media (hover: hover) and (pointer: fine) {
    &:hover {
      background-color: white;
      color: revert;
    }
  }
`;

export function Dialog({ showModal, showModalSet }: IDialogProps) {
  if (!showModal) {
    return null;
  }

  return (
    showModal && (
      <ModalOverlay>
        <Modal>
          <ImageWrapper>
            <Image src={tick} width={75} height={75} alt="tick" />
          </ImageWrapper>

          <Content>
            <p>Thank you!</p>
            <p>Your details have been successfully submitted.</p>
          </Content>

          <Button onClick={() => showModalSet(!showModal)}>OK</Button>
        </Modal>
      </ModalOverlay>
    )
  );
}
