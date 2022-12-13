import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { loginApi } from '../../utils/fetchUser';
import todoList from '../../to-do-list-64px.png';
import passwordOpenEye from '../../password-open-eye.png';
import passwordCloseEye from '../../password-close-eye.png';
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
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSelected, setPasswordSelected] = useState({
    elementTarget: { id: '', style: { border: '', outline: '' } },
  });

  const loginUser = () => loginApi('POST', '/login', userData)
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

  const handleClickPassword = (target) => {
    if (target.id === 'input-password') {
      const targetParent = target.parentNode;
      setPasswordSelected(() => ({ elementTarget: targetParent }));
      targetParent.style.outline = '2px solid rgb(0, 119, 182)';
      targetParent.style.border = '1px solid transparent';
      return
    }
    if (passwordSelected.elementTarget.id === 'form-div-password-eye') {
      passwordSelected.elementTarget.style.outline = '2px solid transparent';
      passwordSelected.elementTarget.style.border = '1px solid rgb(206, 212, 218)';
      setPasswordSelected({ elementTarget: { style: { border: '', outline: '' } } });
      return
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
    <section className="section-login" onClick={ ({ target }) => handleClickPassword(target) }>
      <title className="title-login">
        <img src={ todoList } className="todo-list-image" alt="to-do-list.png" />
        <br />
        <p className="title-p">Organize suas tarefas em um só lugar !</p>
      </title>
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
          <div
            id="form-div-password-eye"
            className="form-div-password-eye"
          >
            <input
              type={ showPassword ? 'text' : 'password' }
              className="form-input form-input-password"
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
            <div className="div-img-password-eye">
              {
                showPassword ?
                (<img
                  src={ passwordOpenEye }
                  onClick={() => setShowPassword(false)}
                  alt="password-open-eye.png"
                />) :
                (<img
                  src={ passwordCloseEye }
                  onClick={() => setShowPassword(true)}
                  alt="password-close-eye.png"
                />)
              }
            </div>
          </div>
          <span className={
              userData.password.length === 0 ||
              validFields.password
              ? 'form-span-alert-valid' : 'form-span-alert-no-valid'
            }
          >
            * Minímo de 6 caracteres
          </span>
        </div>
        <div className="form-div-button-login">
          <button
            type="button"
            className="form-button-login"
            disabled={ !allValidFields }
            onClick={() => loginUser()}
          >
            Continuar
          </button>
        </div>
        <div className="div-link-registration">
          <Link to="/registration" className="link-registration">
            Não possui um conta? Cadastre-se
          </Link>
        </div>
      </form>
    </section>
  );
}

export default UserLogin;
