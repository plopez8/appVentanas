import React, { useState } from 'react';
import { Button, Container } from 'react-bootstrap';
import styled from 'styled-components';
import Form from 'react-bootstrap/Form';
import logo from 'assets/img/Gestorhoraris.png';
import { useHistory } from 'react-router-dom';
import { getWorker } from 'api/api';
import { setROL } from 'variables/variables';
const StyledForm = styled(Form)`
  padding-top: 40px;
  padding-bottom: 40px;
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: 0 auto;
`;

const ContainerCenter = styled(Container)`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  padding-bottom: 40px;
`;

const LoginButton = styled(Button)`
  width: 100%;
`;

function LoginView({ setAuthenticated, setType }) {
  console.log("Login");
  const history = useHistory();

  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const { email, password } = inputs;

  const handleChange = (e) => {
    const name = e.target.id;
    const { value } = e.target;
    setInputs((inputs) => ({ ...inputs, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const workerData = await getWorker(email);
      const workerPassword = workerData.password;
      const workerType = workerData.rol; 

      if (workerPassword === password) {
        // Contraseña correcta, redirigir al usuario
        setAuthenticated(true);
        setROL(workerType);
        setType(workerType);
        history.push('/private/obra');
      } else {
        // Contraseña incorrecta, mostrar un alert
        alert('Credencials incorrectes');
      }
    } catch (error) {
      alert('Credencials incorrectes');
      console.error('API error:', error);
    }
  };

  return (
    <ContainerCenter className="text-center">
      <StyledForm>
        <div className="card">
          <article className="card-body">
            <img
              style={{ maxHeight: '100px' }}
              className="img-fluid"
              alt="..."
              src={logo}
            />
            <hr />
            <p className="text-success text-center">Login to your account</p>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-user" />
                  </span>
                </div>
                <input
                  id="email"
                  name="email"
                  className="form-control"
                  placeholder="Email"
                  type="email"
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="form-group">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text">
                    <i className="fa fa-lock" />
                  </span>
                </div>
                <input
                  id="password"
                  className="form-control"
                  placeholder="Password"
                  type="password"
                  onChange={handleChange}
                />
              </div>
            </div>
            <LoginButton
              variant="primary"
              type="button"
              className="btn-fill"
              onClick={handleSubmit}
            >
              Login
            </LoginButton>
          </article>
        </div>
      </StyledForm>
    </ContainerCenter>
  );
}

export default LoginView;
