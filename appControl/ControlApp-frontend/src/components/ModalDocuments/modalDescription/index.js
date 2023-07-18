/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React from "react";
import { Modal } from 'react-bootstrap';
import { AiOutlineClose } from 'react-icons/ai';
import styled from 'styled-components';

const Title = styled.h1`
    font-weight: bold;
    color: #3472f7;
    font-size: 2rem;
`;

const Label = styled.label`
    font-weight: bold;
    color: #3472f7;
`;

function ModalDescription({ show, onClose, text }) {
  return (
    <Modal
      animation={false}
      show={show}
      backdrop
      size="l"
      onHide={() => onClose()}
    >
      <Modal.Body>
        <button
          aria-hidden
          className="close"
          type="button"
          onClick={() => onClose()}
        >
          <AiOutlineClose style={{ color: '#3472f7' }} />
        </button>
        <Title>Descripció</Title>

        <div>
          <Label>{text}</Label>
        </div>
      </Modal.Body>
    </Modal>
  );
}

ModalDescription.propTypes = {
  show: PropTypes.bool,
  onClose: PropTypes.func,
  text: PropTypes.string,
};

export default ModalDescription;
