import React, { useState } from 'react';
import styled from 'styled-components';
import '../../assets/scss/lbd/_requestView.scss';
import { FaChevronDown } from 'react-icons/fa';
import { BsPencilSquare } from 'react-icons/bs';
import ModalEditWorker from 'components/modalsWorkers/modalEditWorker';
import { updateWorker, deleteWorker } from 'api/api';

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



function TableRow({ data, handleEditWorker, handleDeleteWorker }) {
  const [showEditWorker, setShowEditWorker] = useState(false);
  const [selectedMaintenanceData, setSelectedMaintenanceData] = useState(null);

  const onEditWorker = (maintenanceInfo) => {
    setSelectedMaintenanceData(maintenanceInfo); 
    setShowEditWorker(true);
  };

  return (
    <DataRow>
      {data.nombre ? (
        <RowName>
          <p>{data.nombre}</p>
        </RowName>
      ) : (
        ''
      )}
      {data.correo ? (
        <RowName>
          <p>{data.correo}</p>
        </RowName>
      ) : (
        ''
      )}
        {data.rol ? (
        <RowName>
          <p>{data.rol}</p>
        </RowName>
      ) : (
        ''
      )}
            <td style={{ textAlign: 'center' }}>
        <BsPencilSquare onClick={() => onEditWorker(data)} />

                    <ModalEditWorker
  show={showEditWorker}
  onClose={() => setShowEditWorker(false)}
  data={[selectedMaintenanceData]}
  handleEditWorker={handleEditWorker}
  handleDeleteWorker={handleDeleteWorker}
/>
      </td>
    </DataRow>
  );
}

export function TablaWorkers({ header, data, updateData }) {
  const handleDeleteWorker = async (editedData) => {
    try {
      await deleteWorker(editedData.correo);
    } catch (error) {
      console.error('API error:', error);
    }
    const updatedData = data.filter((worker) => worker.correo !== editedData.correo);
    updateData(updatedData);
  };
  
  const handleEditWorker = async (editedData) => {
    try {
      await updateWorker(editedData.correo, {
        correo: editedData.correo,
        nombre: editedData.nombre,
        password: editedData.contrasenya,
        rol: editedData.rol
      });
    } catch (error) {
      console.error('API error:', error);
    }
    const updatedData = data.map((worker) => {
      if (worker.correo === editedData.correo) {
        return {
          correo: editedData.correo,
          nombre: editedData.nombre,
          password: editedData.contrasenya,
          rol: editedData.rol,
        };
      }
      return worker;
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
            key={treballador.correo}
            data={treballador}
            handleEditWorker={handleEditWorker}
            handleDeleteWorker={handleDeleteWorker}
          />
        ))}
      </tbody>
    </Table>
    </TableWrapper>

  );
}
