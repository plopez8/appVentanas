import React, {useState, useEffect} from 'react';
import { TablaVentana } from 'components/TablaVentana/TablaVentana';
import '../../assets/scss/lbd/_workerMarkingHistory.scss';
import { AiOutlinePlusCircle } from 'react-icons/ai';
import styled from 'styled-components';
import { useLocation, useHistory } from 'react-router-dom';
import { getVentanasDeObra } from 'api/api';


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

function VentanaHistory() {
  console.log("ventanaHistory");
  const history = useHistory()
  const location = useLocation();
  const datos = location.state?.data;
  if(!datos){
    history.push({
    pathname: '/public',
  });
}
  const header = [
    { name: 'Títol', drop: false },
    { name: 'Quantitat', drop: false },
    { name: 'Amplada', drop: true },
    { name: 'Altura', drop: true },
    { name: 'Descripció', drop: false },
    { name: 'Imatges', drop: false },
    { name: 'Editar', drop: false },
  ];
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchWorkers = async () => {
      try {
        const workers = await getVentanasDeObra(datos.id);
        handleDataChange(workers);
      } catch (error) {
        console.error('Error fetching workers:', error);
      }
    };

    fetchWorkers();
  }, []);

  const updateData = async (updatedData) => {
    setData(updatedData);
  };


  const handleDataChange = (newData) => {
    setData(newData);
  };

  const handleRedirect = (data) => {
    const destination = {
      pathname: 'documents',
      state: { data }
    };
    history.push(destination);
  };

  return (
    <div className="home">
<FilterInfo>
            <div className="filterInfo">
        <div className="dateType">
          <Titulo>Finestres de l&apos;obra: {datos.header}</Titulo>
        </div>
      </div>
</FilterInfo>

            <CreateDiv>
                <TaskTypeBox>
                <DivAbs>
                                
                                <button
                                    className="btn-task "
                                    type="submit"
                                    onClick={() => handleRedirect(datos.id)}
                                >
                                    <AiOutlinePlusCircle
                                        style={{
                                            fontSize: '20px',
                                        }}
                                    />{' '}
                                    Crear finestra
                                </button>
                               
                            </DivAbs>
                </TaskTypeBox>
                </CreateDiv>
                <TableContainer>
      <TablaVentana header={header} data={data} updateData={updateData}></TablaVentana>
      </TableContainer>        </div>
  );
}

export default VentanaHistory;
