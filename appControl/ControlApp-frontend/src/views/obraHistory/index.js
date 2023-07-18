import React, {useState, useEffect} from 'react';
import { Tabla } from 'components/Tabla/Tabla';
import '../../assets/scss/lbd/_workerMarkingHistory.scss';
import styled from 'styled-components';
import ModalCreateObra from 'components/modalsObra/modalCreateObra';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import { getAllObras, createObra } from 'api/api';

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

function ObraHistory() {
  console.log("ObraHistory");
  const [showCreateObra, setShowCreateObra] = useState(false);
  const [data, setData] = useState([]);
    const header = [
        { name: 'Obra', drop: false },
        { name: 'Client', drop: false },
        { name: 'Data', drop: false },
        { name: 'Editar', drop: false },
    ];


  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workers = await getAllObras();
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



  const handleCreateObra = async (newData) => {
    try {
      await createObra({
        header: newData.header,
        cliente: newData.cliente,
        fecha: newData.fecha,
      });
    } catch (error) {
      console.error('API error:', error);
    }
  
    const updatedData = [...data, newData];
    updateData(updatedData);
  };


const updateData = (updatedData) => {
  setData(updatedData);

}

    return (
        <div className="home">
<FilterInfo>
  <div className="filterInfo">
    <div className="dateType">
      <Titulo>Obres</Titulo>
    </div>
  </div>
</FilterInfo>

      <CreateDiv>
                <TaskTypeBox>
                <DivAbs>
                                
                                <button
                                    className="btn-task "
                                    type="submit"
                                    onClick={() => {
                                        setShowCreateObra(true);
                                    }}
                                >
                                    <AiOutlinePlusCircle
                                        style={{
                                            fontSize: '20px',
                                        }}
                                    />{' '}
                                    Crear obra
                                </button>
                                <ModalCreateObra
                                    show={showCreateObra}
                                    onClose={() => {
                                        setShowCreateObra(false);
                                    }}
                                    handleCreateObra={handleCreateObra}
                                />
                                
                            </DivAbs>
                </TaskTypeBox>
                </CreateDiv>


                <TableContainer>
        <Tabla header={header} data={data} updateData={updateData} />
      </TableContainer>        </div>
    );
}

export default ObraHistory;
