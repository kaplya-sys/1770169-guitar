import {Link} from 'react-router-dom';

export const Header = () => (
  <header className="header" id="header">
    <div className="container">
      <div className="header__wrapper">
        <a className="header__logo logo" href="main.html">
          <img className="logo__img" width="70" height="70" src="./img/svg/logo.svg" alt="Логотип"/>
        </a>
        <nav className="main-nav">
          <ul className="main-nav__list">
            <li className="main-nav__item">
              <Link className="link main-nav__link" to="/products">Каталог</Link>
            </li>
            <li className="main-nav__item">
              <Link className="link main-nav__link" to="#">Где купить?</Link>
            </li>
            <li className="main-nav__item">
              <Link className="link main-nav__link" to="#">О компании</Link>
            </li>
          </ul>
        </nav>
        <div className="header__container">
          <span className="header__user-name">Имя</span>
          <a className="header__link" href="login.html" aria-label="Перейти в личный кабинет">
            <svg className="header__link-icon" width="12" height="14" aria-hidden="true">
              <use xlinkHref="#icon-account"></use>
            </svg>
            <span className="header__link-text">Вход</span>
          </a>
        </div>
      </div>
    </div>
  </header>
);
