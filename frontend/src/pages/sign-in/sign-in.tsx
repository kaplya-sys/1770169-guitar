import {ChangeEvent, FormEvent, useState} from 'react';

import {AuthUser} from '../../libs/shared/types';
import {validateFields} from '../../libs/shared/helpers';
import {useAppDispatch} from '../../hooks';
import {authAction} from '../../store';

export const SignIn = () => {
  const [passwordType, setPasswordType] = useState<string>('password');
  const [data, setData] = useState<AuthUser>({
    email: '',
    password: ''
  });
  const [error, setError] = useState<Partial<AuthUser>>({});
  const dispatch = useAppDispatch();

  const handleInputChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const {name, value} = evt.target;
    setData((prevState) => ({...prevState, [name]: value}));
  };
  const handleViewPasswordClick = () => {
    setPasswordType((prevState) => prevState === 'password' ? 'text' : 'password');
  };
  const handleFormSubmit = (evt: FormEvent<HTMLFormElement>) => {
    evt.preventDefault();
    const newError = validateFields(data);

    if (!newError) {
      dispatch(authAction(data));
    } else {
      setError(newError);
    }
  };

  return (
    <div className="container">
      <section className="login">
        <h1 className="login__title">Войти</h1>
        <p className="login__text">
          Hовый пользователь? <a className="login__link" href="registration.html">Зарегистрируйтесь</a> прямо сейчас
        </p>
        <form method="post" action="#" onSubmit={handleFormSubmit}>
          <div className="input-login">
            <label htmlFor="email">Введите e-mail</label>
            <input
              type="email"
              id="email"
              name="email"
              autoComplete="off"
              onChange={handleInputChange}
              required
            />
            <p className="input-login__error">{error.email}</p>
          </div>
          <div className="input-login">
            <label htmlFor="password">Введите пароль</label>
            <span>
              <input
                type={passwordType}
                placeholder="• • • • • • • • • • • •"
                id="password"
                name="password"
                autoComplete="off"
                onChange={handleInputChange}
                required
              />
              <button className="input-login__button-eye" type="button" onClick={handleViewPasswordClick}>
                <svg width="14" height="8" aria-hidden="true">
                  <use xlinkHref="#icon-eye"></use>
                </svg>
              </button>
            </span>
            <p className="input-login__error">{error.password}</p>
          </div>
          <button className="button login__button button--medium" type="submit">Войти</button>
        </form>
      </section>
    </div>
  );
};
