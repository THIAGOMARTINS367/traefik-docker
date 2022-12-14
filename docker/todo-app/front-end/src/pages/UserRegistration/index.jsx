import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { registrationApi } from '../../utils/fetchUser';
import passwordOpenEye from '../../password-open-eye.png';
import passwordCloseEye from '../../password-close-eye.png';
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
  const [showPassword, setShowPassword] = useState(false);
  const [passwordSelected, setPasswordSelected] = useState({
    elementTarget: { id: '', style: { border: '', outline: '' } },
  });

  const registerUser = () => registrationApi('POST', '/registration', userData)
    .then((registrationData) => {
      console.log('registrationData:', registrationData);
      const token = registrationData.data;
      localStorage.setItem('userToken', JSON.stringify(token));
      history.push('/tasks')
    })
    .catch((error) => {
      setRegistrationFailed(true);
      if (error.response) {
        console.error('ERROR:', error.response.data.message);
      } else {
        console.error(`ERROR: unable to register user`);
      }
      setTimeout(() => window.location.reload(false), 3000);
    });

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

  const handleClickPassword = (target) => {
    if (target.id === 'input-password' || target.id === 'input-confirm-password') {
      const targetParent = target.parentNode;
      setPasswordSelected(() => ({ elementTarget: targetParent }));
      passwordSelected.elementTarget.style.outline = '2px solid transparent';
      passwordSelected.elementTarget.style.border = '1px solid rgb(206, 212, 218)';
      targetParent.style.outline = '2px solid rgb(0, 119, 182)';
      targetParent.style.border = '1px solid transparent';
      return
    }
    if (passwordSelected.elementTarget.className === 'form-div-password-eye') {
      passwordSelected.elementTarget.style.outline = '2px solid transparent';
      passwordSelected.elementTarget.style.border = '1px solid rgb(206, 212, 218)';
      setPasswordSelected({ elementTarget: { style: { border: '', outline: '' } } });
      return
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
    <section className="section-registration" onClick={ ({ target }) => handleClickPassword(target) }>
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
          <div className="form-div-password-eye">
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
        <div className="form-div-fields form-confirm-password-field">
          <label htmlFor="input-confirm-password" className="form-label">Confirme Senha</label>
          <br />
          <div className="form-div-password-eye">
            <input
              type={ showPassword ? 'text' : 'password' }
              className="form-input form-input-password"
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
        <div className="div-link-login">
          <Link to="/login" className="link-login">
            Já possui conta? Login
          </Link>
        </div>
      </form>
    </section>
  );
}

export default UserRegistration;
