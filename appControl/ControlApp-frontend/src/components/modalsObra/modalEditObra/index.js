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
  flex: 0 0 50%;
  padding: 0.5rem;
  width: 100%;

  @media (max-width: 768px) {
    flex: 0 0 100%;
  }

  input {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    color: #95BDFD;
    width: 100%;
  }
`;

function ModalEditObra({ show, onClose, data, handleEditObra, handleDeleteObra }) {
  const [formData, setFormData] = useState(data);
  const [inputValues, setInputValues] = useState({
    id: "",
    header:  "",
    cliente:  "",
    fecha: "",
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
    if (data[0]) {
      setInputValues({
        id: data[0].id || "",
        header: data[0].header || "",
        cliente: data[0].cliente || "",
        fecha: data[0].fecha || "",
      });
    }
    setFormData(data);
  }, [data]);

  const handleDelete = () => {
    const valuesArray = inputValues;
    handleDeleteObra(valuesArray);
    onClose();
  };

  const handleEdit = () => {
    const { header, cliente, fecha } = inputValues;

    // Verificar que los valores no estén vacíos
    if (header !== "" && cliente !== "" && fecha !== "") {
      const valuesArray = inputValues;
      handleEditObra(valuesArray);
      onClose();
    } else {
      alert("Por favor, complete todos los campos.");
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
        <Title>Editar obra</Title>
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
                <Label>Títol</Label>
                <input
                  placeholder={formData.header}
                  value={inputValues.header}
                  onChange={(event) =>
                    setInputValues((prevInputValues) => ({
                      ...prevInputValues,
                      header: event.target.value,
                    }))
                  }
                />
              </div>
            </ColumnItem>
            <ColumnItem>
              <div>
                <Label>Client:</Label>
                <input
                  placeholder={formData.header}
                  value={inputValues.cliente}
                  onChange={(event) =>
                    setInputValues((prevInputValues) => ({
                      ...prevInputValues,
                      cliente: event.target.value,
                    }))
                  }
                />
              </div>
            </ColumnItem>
            <ColumnItem>
              <div>
                <Label>Data</Label>
                <input
                  type='date'
                  value={inputValues.fecha}
                  onChange={(event) =>
                    setInputValues((prevInputValues) => ({
                      ...prevInputValues,
                      fecha: event.target.value,
                    }))
                  }
                />
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
          Eliminar obra
        </button>
        <br></br>
        <button
          type="submit"
          style={{ width: '100%', margin: '0px' }}
          className="btn-historial"
          onClick={() => {
            handleEdit();
          }}
        >
          Editar obra
        </button>
      </Modal.Footer>
    </ModalContainer>
  );
}

ModalEditObra.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ModalEditObra;