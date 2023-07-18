import React, { useState, useEffect } from 'react';
import { TablaWorkers } from 'components/TablaWorkers/TablaWorkers';
import '../../assets/scss/lbd/_workerMarkingHistory.scss';
import styled from 'styled-components';
import ModalCreateWorker from 'components/modalsWorkers/modalCreateWorker';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { getWorkers, createWorker } from 'api/api';
import { getROL } from 'variables/variables';

const TaskTypeBox = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-end;
    align-items: center;
    gap: 20px;
`;

const CreateDiv = styled.div`
  float: right;
`;

const DivAbs = styled.div`
    font-size: 15px;

    @media (max-width: 1335px) {
        display: contents;
        margin-bottom: 20px;

        .div-sep {
            display: contents;
        }
    }
`;

const FilterInfo = styled.div`
  float: left;
`;

const Titulo = styled.h1`
  margin-bottom: 0;
`;

const TableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`;

function WorkersList() {
  if(getROL() !== "admin"){
    console.log("f");
  }
  console.log("workerList");
  const [showCreateWorker, setShowCreateWorker] = useState(false);
  const [data, setData] = useState([]);

  const header = [
    { name: 'Nom', drop: false },
    { name: 'Correu', drop: false },
    { name: 'Rol', drop: false },
    { name: 'Editar', drop: false },
  ];

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workers = await getWorkers();
        handleDataChange(workers);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []);

  const handleDataChange = (newData) => {
    setData(newData);
  };

  const handleCreateWorker = async (newData) => {
    try {
      await createWorker({
        correo: newData.correo,
        nombre: newData.nombre,
        password: newData.contrasenya,
        rol: newData.rol,
      });
    } catch (error) {
      console.error('API error:', error);
    }
  
    const updatedData = [...data, newData];
    updateData(updatedData);
  };

  const updateData = async (updatedData) => {
    setData(updatedData);
  };
  return (
    <div className="home">
<FilterInfo>

            <div className="filterInfo">
        <div className="dateType">
          <Titulo>Treballadors</Titulo>
        </div>
      </div>
</FilterInfo>

      <CreateDiv>
        <TaskTypeBox>
          <DivAbs>
            <button
              className="btn-task"
              type="submit"
              onClick={() => {
                setShowCreateWorker(true);
              }}
            >
              <AiOutlinePlusCircle style={{ fontSize: '20px' }} /> Crear treballador
            </button>
            <ModalCreateWorker
              show={showCreateWorker}
              onClose={() => {
                setShowCreateWorker(false);
              }}
              handleCreateWorker={handleCreateWorker}
            />
          </DivAbs>
        </TaskTypeBox>
      </CreateDiv>


      <TableContainer>
      <TablaWorkers header={header} data={data} updateData={updateData} />
      </TableContainer>        </div>
  );
}

export default WorkersList;
