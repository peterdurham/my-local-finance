import React from "react";
import styled from "styled-components";

const BackdropStyles = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  z-index: 100;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Backdrop = ({ showModal, setShowModal }) =>
  showModal ? (
    <BackdropStyles onClick={() => setShowModal(false)}></BackdropStyles>
  ) : null;

export default Backdrop;
