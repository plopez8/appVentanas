import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../assets/scss/lbd/_requestView.scss';
import { FaChevronDown, FaImages } from 'react-icons/fa';
import ModalDescription from 'components/ModalDocuments/modalDescription';
import { BsPencilSquare, BsFillExclamationCircleFill } from 'react-icons/bs';
import ModalEditVentana from 'components/ModalVentana/modalEditVentana';
import ModalImages from 'components/ModalDocuments/modalImages';
import { deleteVentana, updateVentana } from 'api/api';



const HeaderRow = styled.tr`
  background-color: #d3e1f9;
  line-height: 5vh;
  th {
    padding: 0 1rem;
    color: #656565 !important;
    font-size: 1em !important;
    font-weight: 600 !important;
    text-transform: unset !important;

    svg {
      font-size: x-small;
      margin-left: 10px;
    }
  }
`;

const DataRow = styled.tr`
  background-color: #eff3f8 !important;
`;

const RowName = styled.td`
  p {
    margin: 15px auto;
    text-align: center;
    height: 30px;
    line-height: 30px;
    color: #2b7bfc;
    font-weight: 600;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;

const Table = styled.table`
  width: 100%;
`;

const TableWrapper = styled.div`
  overflow-x: auto;
  padding-bottom: 10px; /* Espaciado mínimo entre filas y scroll horizontal */
`;


function TableHeader({ columnNames }) {
  return (
    <HeaderRow>
      {columnNames.map((columnNames) => (
        <th key={columnNames}>
          {columnNames.name}
          {columnNames.drop ? <FaChevronDown></FaChevronDown> : null}
        </th>
      ))}
    </HeaderRow>
  );
}


function TableRow({ data, handleEditVentana, handleDeleteVentana }) {
  const [showDescription, setShowDescription] = useState(false);
  const handleDescriptionClick = () => {
    setShowDescription(true);
  };

  const [showImage, setShowImage] = useState(false);
  const handleImageClick = () => {
    setShowImage(true);
  };

  const [showEditVentana, setShowEditVentana] = useState(false);
  const [selectedVentanaData, setSelectedVentanaData] = useState(null);
  useEffect(() => {
  }, [selectedVentanaData]);
  const onEditVentana = (VentanaInfo) => {
    setSelectedVentanaData(VentanaInfo);
    setShowEditVentana(true);
  };



  return (
    <DataRow>
         {data.header ? (
        <RowName>
        <p>{data.header}</p>
      </RowName>
      ) : (
        ''
      )}
      {data.QuantitatValue ? (
        <RowName>
          <p>{data.QuantitatValue}</p>
        </RowName>
      ) : (
        ''
      )}
      {data.XValue ? (
         <RowName>
         <p>{data.XValue}</p>
       </RowName>
      ) : (
        ''
      )}
      {data.YValue ? (
        <RowName>
          <p>{data.YValue}</p>
        </RowName>
      ) : (
        ''
      )}

<td style={{ textAlign: 'center' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <button
      style={{
        background: '#2b7bfc',
        borderRadius: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '30px',
        border: 'none',
        cursor: 'pointer'
      }}
        type='submit'
        onClick={handleDescriptionClick}>
          <BsFillExclamationCircleFill style={{ color: 'white' }} />
        </button>
</div>
        <ModalDescription
          show={showDescription}
          text= {data.description}
          onClose={() => {
            setShowDescription(false);
          }}
        />

      </td>
      <td style={{ textAlign: 'center' }}>
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
    <button
      style={{
        background: '#2b7bfc',
        borderRadius: '30%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '40px',
        height: '30px',
        border: 'none',
        cursor: 'pointer'
      }}
        type='submit'
        onClick={handleImageClick}>
          <FaImages style={{ color: 'white' }} />
        </button>
</div>
        <ModalImages
          show={showImage}
          ventanaId = {data.id}
          onClose={() => {
            setShowImage(false);
          }}
        />
      </td>
      <td style={{ textAlign: 'center' }}>
                <BsPencilSquare onClick={() => onEditVentana(data)} />

                    <ModalEditVentana
  show={showEditVentana}
  onClose={() => setShowEditVentana(false)}
  data={[selectedVentanaData]}
  handleEditVentana={handleEditVentana}
  handleDeleteVentana={handleDeleteVentana}
/>
      </td>
    </DataRow>
  );
}

export function TablaVentana({ header, data, updateData}) {

  const handleDeleteVentana = async (editedData) => {
    try {
      await deleteVentana(editedData.id);
    } catch (error) {
      console.error('API error:', error);
    }
    const updatedData = data.filter((ventana) => ventana.id !== editedData.id);
    updateData(updatedData);
  };
  
  const handleEditVentana = async (editedData) => {
    try {
      await updateVentana(editedData.id, {
        header: editedData.header,
        XValue: editedData.XValue,
        YValue: editedData.YValue,
        QuantitatValue: editedData.QuantitatValue,
        description: editedData.description,
      });
    } catch (error) {
      console.error('API error:', error);
    }
    const updatedData = data.map((ventana) => {
      if (ventana.id === editedData.id) {
        return {
          id: editedData.id,
          header: editedData.header,
          XValue: editedData.XValue,
          YValue: editedData.YValue,
          QuantitatValue: editedData.QuantitatValue,
          description: editedData.description,
          obra_id: data[0].id
        };
      }
      return ventana;
    });
    updateData(updatedData);
  };

    return (
    <TableWrapper>

    <Table>
      <thead>
        <TableHeader columnNames={header} />
      </thead>
      <tbody>
        {data.map((ventana) => (
          <TableRow
            key={ventana.id}
            data={ventana}
            handleEditVentana={handleEditVentana}
            handleDeleteVentana={handleDeleteVentana}
          />
        ))}
      </tbody>
    </Table>
    </TableWrapper>

  );
}
