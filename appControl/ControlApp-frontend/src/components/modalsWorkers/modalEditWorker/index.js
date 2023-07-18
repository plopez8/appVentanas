import PropTypes from 'prop-types';
import React, { useState, useEffect } from "react";
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

const InfoText = styled.span`
  display: block;
  margin-top: 0.5rem;
  color: #3472f7; /* Color azul */
`;

function ModalEditWorker({ show, onClose, data, handleEditWorker, handleDeleteWorker }) {
  const [formData, setFormData] = useState(data);

  const [inputValues, setInputValues] = useState({
    nombre: "",
    correo: "",
    contrasenya: "",
    verificarContrasenya: "",
    rol: "treballador"
  });

  useEffect(() => {
    
    if (typeof data.header === 'undefined') {
      const { header } = "null";
      setFormData((prevFormData) => ({
        ...prevFormData,
        header,
      }));
    } else {
      const { header } = data[0];
      setFormData((prevFormData) => ({
        ...prevFormData,
        header,
      }));
    }
  }, [data]);

  useEffect(() => {

    if(data[0]){
      setInputValues({
        nombre: data[0].nombre || "",
        correo: data[0].correo || "",
        contrasenya: data[0].password || "",
        verificarContrasenya: "",
        rol: data[0].rol || "",
      });
    }
    setFormData(data);
  }, [data]);


  const handleDelete = () => {
    const valuesArray = inputValues;
    handleDeleteWorker(valuesArray);
    onClose();
  };

  const handleEdit = () => {
    if (
      inputValues.nombre.trim() !== "" &&
      inputValues.correo.trim() !== "" &&
      inputValues.contrasenya.trim() !== "" &&
      inputValues.verificarContrasenya.trim() !== ""
    ) {
      if (checkPasswordsMatch(inputValues.contrasenya, inputValues.verificarContrasenya)) {
        const valuesArray = inputValues;
        handleEditWorker(valuesArray);
        onClose();
      } else {
        alert("Les contrasenyes no coincideixen");
      }
    } else {
      alert("Si us plau, ompli tots els camps.");
    }
  };
  function checkPasswordsMatch(password, confirmPassword) {
    return password === confirmPassword;
  }


  return (
    <ModalContainer
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Title>Editar Treballador</Title>
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
                  placeholder={formData.nombre}
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
                <InfoText>{inputValues.correo}</InfoText>              </div>
            </ColumnItem>
            <ColumnItem>
              <div>
                <Label>Contrasenya</Label>
                <input
                  type="text"
                  placeholder={formData.contrasenya}
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
                  type="text"
                  placeholder={formData.verificarContrasenya}
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
          style={{ width: '100%', margin: '0px', backgroundColor: 'red' }}
          className="btn-historial"
          onClick={() => {
            handleDelete();
          }}
        >
          Eliminar treballador
        </button>
        <br></br>
        <button
          type="submit"
          style={{ width: '100%', margin: '0px' }}
          className="btn-historial"
          onClick={() => {
            if (checkPasswordsMatch(inputValues.contrasenya, inputValues.verificarContrasenya)) {
              handleEdit();
            } else {
                alert("Les contrasenyes no coincideixen");
            }
          }}
        >
          Editar treballador
        </button>
      </Modal.Footer>
    </ModalContainer>
  );
}

ModalEditWorker.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ModalEditWorker;