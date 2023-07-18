import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import '../../assets/scss/lbd/_requestView.scss';
import { FaChevronDown } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import ModalEditObra from 'components/modalsObra/modalEditObra';
import { updateObra, deleteObra } from 'api/api';
import { useHistory } from 'react-router-dom';

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

const Button = styled.button`
  background: none;
  border: none;
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



function TableRow({ data, handleEditObra, handleDeleteObra }) {
  const history = useHistory()
  const [showEditObra, setShowEditObra] = useState(false);
  const [selectedObraData, setSelectedObraData] = useState(null);
  useEffect(() => {
  }, [selectedObraData]);
  const onEditObra = (ObraInfo) => {
    setSelectedObraData(ObraInfo);
    setShowEditObra(true);
  };


  const handleRedirect = (data) => {
    const destination = {
      pathname: 'ventanas',
      state: { data }
    };
    history.push(destination);
  };


  return (
    <DataRow>
   {data.header ? (
  <RowName style={{ display: 'flex', justifyContent: 'center' }}>
  <Button
    type="button"
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      textAlign: 'center'
    }}
    onClick={() => handleRedirect(data)}
  >
    <p style={{ margin: 0 }}>{data.header}</p>
  </Button>
</RowName>
      ) : (
        ''
      )}
      {data.cliente ? (
        <RowName>
          <p>{data.cliente}</p>
        </RowName>
      ) : (
        ''
      )}
        {data.fecha ? (
        <RowName>
          <p>{data.fecha}</p>
        </RowName>
      ) : (
        ''
      )}
      <td style={{ textAlign: 'center' }}>
        <BsPencilSquare onClick={() => onEditObra(data)} />

                    <ModalEditObra
  show={showEditObra}
  onClose={() => setShowEditObra(false)}
  data={[selectedObraData]}
  handleEditObra={handleEditObra}
  handleDeleteObra={handleDeleteObra}
/>
      </td>
    </DataRow>
  );
}

export function Tabla({ header, data, updateData }) {
  const handleDeleteObra = async (editedData) => {
    try {
      await deleteObra(editedData.id);
    } catch (error) {
      console.error('API error:', error);
    }
    const updatedData = data.filter((obra) => obra.id !== editedData.id);
    updateData(updatedData);
  };
  
  const handleEditObra = async (editedData) => {
    try {
      await updateObra(editedData.id, {
        header: editedData.header,
        cliente: editedData.cliente,
        fecha: editedData.fecha,
      });
    } catch (error) {
      console.error('API error:', error);
    }
    const updatedData = data.map((obra) => {
      if (obra.id === editedData.id) {
        return {
          id: editedData.id,
          header: editedData.header,
          cliente: editedData.cliente,
          fecha: editedData.fecha,
        };
      }
      return obra;
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
          {data.map((treballador) => (
            <TableRow
              key={treballador.id}
              data={treballador}
              handleEditObra={handleEditObra}
              handleDeleteObra={handleDeleteObra}
            />
          ))}
        </tbody>
      </Table>
    </TableWrapper>
  );
}
