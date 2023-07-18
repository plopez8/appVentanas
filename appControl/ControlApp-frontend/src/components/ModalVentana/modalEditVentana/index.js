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

const GridContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }

  input {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    color: #95BDFD;
    width: 100%;
  }

  button {
    background-color: #F1F6FE;
    border-radius: 1rem;
    border: none;
    padding-left: 1rem;
    color: #95BDFD;
  }
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

function ModalEditVentana({ show, onClose, data, handleEditVentana, handleDeleteVentana }) {
  const [formData, setFormData] = useState(data);

  const [inputValues, setInputValues] = useState({
    id: "",
    header: "",
    XValue: "",
    YValue: "",
    QuantitatValue: "",
    description: "",
    obra_id: "",
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
        id: data[0].id || "",
        header: data[0].header || "",
        XValue: data[0].XValue || "",
        YValue: data[0].YValue ||  "",
        QuantitatValue: data[0].QuantitatValue || "",
        description: data[0].description || "",
        obra_id: data[0].obra_id || "",
      });
    }
    setFormData(data);
  }, [data]);


  const handleDelete = () => {
    const valuesArray = inputValues;
    handleDeleteVentana(valuesArray);
    onClose();
  };

  const handleEdit = () => {
    // Verificar si todos los campos están completos
    if (
      inputValues.header !== "" &&
      inputValues.XValue !== "" &&
      inputValues.YValue !== "" &&
      inputValues.QuantitatValue !== "" &&
      inputValues.description !== ""
    ) {
        const valuesArray = inputValues;
        handleEditVentana(valuesArray);
        onClose();
      
    } else {
      alert('Si us plau, omple tots els camps.');
    }
  };


  return (
    <Modal
      show={show}
      onHide={onClose}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header>
        <Title>Edita finestra</Title>
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
          <GridContainer>
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
            <div>
              <Label>Quantitat</Label>
              <input
                placeholder={formData.QuantitatValue}
                value={inputValues.QuantitatValue}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    QuantitatValue: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Amplada</Label>
              <input
                placeholder={formData.XValue}
                value={inputValues.XValue}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    XValue: event.target.value,
                  }))
                }
              />
            </div>
            <div>
              <Label>Alçada</Label>
              <input
                placeholder={formData.YValue}
                value={inputValues.YValue}
                onChange={(event) =>
                  setInputValues((prevInputValues) => ({
                    ...prevInputValues,
                    YValue: event.target.value,
                  }))
                }
              />
            </div>
          </GridContainer>
          <div>
            <br></br>
            <Label>Descripció</Label>
            <br></br>
            <textarea
              style={{ width: '100%' }}
              placeholder={formData.description}
              value={inputValues.description}
              onChange={(event) =>
                setInputValues((prevInputValues) => ({
                  ...prevInputValues,
                  description: event.target.value,
                }))
              }
            />
          </div>
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
          Elimina finestra
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
          Edita finestra
        </button>
      </Modal.Footer>
    </Modal>
  );
}

ModalEditVentana.propTypes = {
  show: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

export default ModalEditVentana;
