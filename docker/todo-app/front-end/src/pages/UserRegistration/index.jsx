import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { registrationApi } from '../../utils/fetchUser';
import './style.css';

function UserRegistration() {
  const history = useHistory();
  const [userData, setUserData] = useState({ fullName: '', email: '', password: '' });
  const [passwordConfirmation, setPasswordConfirmation] = useState({ password: '' });
  const [validFields, setValidFields] = useState({
    fullName: false,
    email: false,
    password: false,
    passwordConfirmation: null,
  });
  const [allValidFields, setAllValidFields] = useState(false);
  const [ registrationFailed, setRegistrationFailed ] = useState(false);

  const registerUser = () => {
    registrationApi('POST', '/registration', userData)
      .then(({ data: token }) => {
        localStorage.setItem('userToken', JSON.stringify(token));
        history.push('/tasks')
      })
      .catch((error) => {
        setRegistrationFailed(true);
        console.error('ERROR:', error.response.data.message);
      });
  };

  const validatePassword = () => {
    if (passwordConfirmation.password.length === 0) return;
    if (userData.password === passwordConfirmation.password) {
      setValidFields((prevState) => ({ ...prevState, passwordConfirmation: true }));
    } else {
      setValidFields((prevState) => ({ ...prevState, passwordConfirmation: false }));
    }
  };

  const checkAllFields = () => {
    const {
      fullName,
      email,
      password,
      passwordConfirmation,
    } = validFields;
    if (fullName && email && password && passwordConfirmation) {
      setAllValidFields(true);
    } else {
      setAllValidFields(false);
    }
  }

  const validateFields = () => {
    const { fullName, email, password } = userData;
    const emailCheck = email.toLowerCase().match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
    if (fullName.length >= 8) {
      setValidFields((prevState) => ({ ...prevState, fullName: true }));
    } else {
      setValidFields((prevState) => ({ ...prevState, fullName: false }));
    }
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
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    validateFields();
    validatePassword();
  }, [userData]);

  useEffect(() => {
    validatePassword();
  }, [passwordConfirmation]);

  useEffect(() => {
    checkAllFields();
  }, [validFields]);

  return (
    <section className="section-registration">
      <form className="section-form">
        <div className={ registrationFailed ? 'div-registration-failed-alert' : 'div-registration-ok-alert' }>
          Não foi possível efetuar o cadastro !
        </div>
        <div className="form-div-fields">
          <label htmlFor="input-name" className="form-label">Nome</label>
          <br />
          <div>
            <input
              type="text"
              className="form-input"
              id="input-name"
              value={ userData.fullName }
              required
              onChange={
                ({ target }) => setUserData((prevState) => ({ ...prevState, fullName: target.value }))
              }
            />
          </div>
          <span className={
              userData.fullName.length === 0 ||
              validFields.fullName
              ? 'form-span-alert-valid' : 'form-span-alert-no-valid'
            }
          >
            * Minímo de 8 caracteres
          </span>
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
        <div className="form-div-fields form-confirm-password-field">
          <label htmlFor="input-confirm-password" className="form-label">Confirme Senha</label>
          <br />
          <input
            type="password"
            className="form-input"
            id="input-confirm-password"
            value={ passwordConfirmation.password }
            required
            onChange={
              ({ target }) => {
                setPasswordConfirmation({
                  password: target.value,
                })
              }
            }
          />
          <span className={
              validFields.passwordConfirmation === null ||
              validFields.passwordConfirmation
              ? 'form-span-alert-valid' : 'form-span-alert-no-valid'
            }
          >
            * Senhas diferentes
          </span>
        </div>
        <div>
          <button
            type="button"
            className="form-button-register"
            disabled={ !allValidFields }
            onClick={() => registerUser()}
          >
            Continuar
          </button>
        </div>
      </form>
    </section>
  );
}

export default UserRegistration;
