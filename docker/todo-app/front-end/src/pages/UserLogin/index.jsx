import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginApi } from '../../utils/fetchUser';
import './style.css';

function UserLogin() {
  const history = useHistory();
  const [userData, setUserData] = useState({ email: '', password: '' });
  const [validFields, setValidFields] = useState({
    email: false,
    password: false,
  });
  const [allValidFields, setAllValidFields] = useState(false);
  const [loginFailed, setLoginFailed] = useState({
    failed: false,
    message: '',
    status: 0,
  });

  const loginUser = () => {
    loginApi('POST', '/login', userData)
      .then(({ data: token }) => {
        localStorage.setItem('userToken', JSON.stringify(token));
        history.push('/tasks')
      })
      .catch((error) => {
        const message = error.response.data.message;
        const status = error.response.status;
        setLoginFailed({ failed: true, message, status });
        console.error('ERROR:', message);
      });
  };

  const checkAllFields = () => {
    const {
      email,
      password,
    } = validFields;
    if (email && password) {
      setAllValidFields(true);
    } else {
      setAllValidFields(false);
    }
  }

  const validateFields = () => {
    const { email, password } = userData;
    const emailCheck = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (emailCheck) {
      setValidFields((prevState) => ({ ...prevState, email: true }));
    } else {
      setValidFields((prevState) => ({ ...prevState, email: false }));
    }
    if (password.length >= 6) {
      setValidFields((prevState) => ({ ...prevState, password: true }));
    } else {
      setValidFields((prevState) => ({ ...prevState, password: false }));
    }
  }

  useEffect(() => {
    const userToken = JSON.parse(localStorage.getItem('userToken'));
    if (userToken && userToken.token) {
      history.push('/tasks');
    }
  }, []);

  useEffect(() => {
    validateFields();
  }, [userData]);

  useEffect(() => {
    checkAllFields();
  }, [validFields]);

  const { failed, status } = loginFailed;

  return (
    <section className="section-login">
      <form className="section-form">
        <div>
          {
            (failed &&
            (status === 401 || status === 404)) && (
            <div className="div-login-failed-alert">
              E-mail ou senha incorretos !
            </div>)
          }
          {
            (failed &&
            (status !== 401 && status !== 404)) &&
            (<div className="div-login-failed-alert">
              Não foi possível efetuar o login !
            </div>)
          }
        </div>
        <div className="form-div-fields">
          <label htmlFor="input-email" className="form-label">E-mail</label>
          <br />
          <input
            type="email"
            className="form-input"
            id="input-email"
            value={ userData.email }
            required
            onChange={
              ({ target }) => setUserData((prevState) => ({ ...prevState, email: target.value }))
            }
          />
          <span className={
              userData.email.length === 0 ||
              validFields.email
              ? 'form-span-alert-valid' : 'form-span-alert-no-valid'
            }
          >
            * E-mail deve ser válido
          </span>
        </div>
        <div className="form-div-fields">
          <label htmlFor="input-password" className="form-label">Senha</label>
          <br />
          <input
            type="password"
            className="form-input"
            id="input-password"
            value={ userData.password }
            required
            onChange={
              ({ target }) => {
                setUserData((prevState) => ({
                  ...prevState,
                  password: target.value,
                }));
              }
            }
          />
          <span className={
              userData.password.length === 0 ||
              validFields.password
              ? 'form-span-alert-valid' : 'form-span-alert-no-valid'
            }
          >
            * Minímo de 6 caracteres
          </span>
        </div>
        <div>
          <button
            type="button"
            className="form-button-login"
            disabled={ !allValidFields }
            onClick={() => loginUser()}
          >
            Continuar
          </button>
        </div>
      </form>
    </section>
  );
}

export default UserLogin;
