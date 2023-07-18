import PropTypes from 'prop-types';
import React, { useState } from "react";
import { Modal } from 'react-bootstrap';
import styled from 'styled-components';
import 'react-date-picker/dist/DatePicker.css';
import 'react-calendar/dist/Calendar.css';
import { AiOutlineClose } from 'react-icons/ai';

const Label = styled.label`
  font-weight: bold;
  color: #3472f7;
`;

const Title = styled.h1`
    font-weight: bold;
    color: #3472f7;
    font-size: 2rem;
`;

const ContentGrid = styled.div`
  display: flex;
  flex-direction: column;

  button {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    color: #95BDFD;
  }
  textarea {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    padding-right: 1rem;
    color: #95BDFD;
  }
  label {
    color: #2B7BFC;
    font-weight: bold;
  }
`;

const ModalContainer = styled(Modal)`
  @media (max-width: 768px) {
    .modal-dialog {
      margin: 0.5rem;
      width: calc(100% - 1rem);
    }
  }
`;

const RowContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: -0.5rem;
`;

const ColumnItem = styled.div`
  flex: 0 0 100%;
  padding: 0.5rem;
  width: 100%;

  input {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    color: #95BDFD;
    width: 100%;
  }
`;

function ModalCreateWorker({ show, onClose, handleCreateWorker }) {
  const [inputValues, setInputValues] = useState({
    nombre: "",
    correo: "",
    contrasenya: "",
    verificarContrasenya: "",
    rol: "user"
  });

  function checkPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }
  
  const handleCreate = () => {
    if (
      inputValues.nombre.trim() !== "" &&
      inputValues.correo.trim() !== "" &&
      inputValues.contrasenya.trim() !== "" &&
      inputValues.verificarContrasenya.trim() !== ""
    ) {
      if (checkPasswordsMatch(inputValues.contrasenya, inputValues.verificarContrasenya)) {
        const valuesArray = inputValues;
        handleCreateWorker(valuesArray);
        setInputValues({
          nombre: "",
          correo: "",
          contrasenya: "",
          verificarContrasenya: "",
          rol: "user"
        });
        onClose();
      } else {
        alert("Les contrasenyes no coincideixen");
      }
    } else {
      alert("Si us plau, ompli tots els camps.");
    }
  };
  

  return (
    <ModalContainer
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Title>Crear Treballador</Title>
        <button
          aria-hidden
          className="close"
          type="button"
          onClick={() => onClose()}
        >
          <AiOutlineClose style={{ color: '#3472f7' }} />
        </button>
      </Modal.Header>
      <Modal.Body>
        <ContentGrid>
          <RowContainer>
            <ColumnItem>
              <div>
                <Label>Nom</Label>
                <input
                  value={inputValues.nombre}
                  onChange={(event) =>
                    setInputValues((prevInputValues) => ({
                      ...prevInputValues,
                      nombre: event.target.value,
                    }))
                  }
                />
              </div>
            </ColumnItem>
            <ColumnItem>
              <div>
                <Label>Correu</Label>
                <input
                  value={inputValues.correo}
                  onChange={(event) =>
                    setInputValues((prevInputValues) => ({
                      ...prevInputValues,
                      correo: event.target.value,
                    }))
                  }
                />
              </div>
            </ColumnItem>
            <ColumnItem>
              <div>
                <Label>Contrasenya</Label>
                <input
                  type="password"
                  value={inputValues.contrasenya}
                  onChange={(event) =>
                    setInputValues((prevInputValues) => ({
                      ...prevInputValues,
                      contrasenya: event.target.value,
                    }))
                  }
                />
              </div>
            </ColumnItem>
            <ColumnItem>
              <div>
                <Label>Verificar Contrasenya</Label>
                <input
                  type="password"
                  value={inputValues.verificarContrasenya}
                  onChange={(event) =>
                    setInputValues((prevInputValues) => ({
                      ...prevInputValues,
                      verificarContrasenya: event.target.value,
                    }))
                  }
                />
              </div>
            </ColumnItem>
            <ColumnItem>
              <div>
                <Label>Rol</Label>
                <select
                  value={inputValues.rol}
                  onChange={(event) =>
                    setInputValues((prevInputValues) => ({
                      ...prevInputValues,
                      rol: event.target.value,
                    }))
                  }
                >
                  <option value="user">Treballador</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
            </ColumnItem>
          </RowContainer>
        </ContentGrid>
      </Modal.Body>
      <Modal.Footer>
        <button
          type="submit"
          style={{ width: '100%', margin: '0px' }}
          className="btn-historial"
          onClick={() => {
            if (checkPasswordsMatch(inputValues.contrasenya, inputValues.verificarContrasenya)) {
              handleCreate();
            } else {
              alert("Les contrasenyes no coincideixen");
            }
          }}
        >
          Crear treballador
        </button>
      </Modal.Footer>
    </ModalContainer>
  );
}

ModalCreateWorker.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  handleCreateWorker: PropTypes.func.isRequired,
};

export default ModalCreateWorker;