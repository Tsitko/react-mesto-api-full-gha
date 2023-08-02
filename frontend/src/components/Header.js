import logo from "../images/logo.svg";
import { Link } from "react-router-dom";

function Header(props) {
  const currentUrl = window.location.pathname;
  return (
    <header className="header">
      <img src={logo} alt="логотип место" className="header__logo" />
      <div className="header__auth-info">
        {props.isLoggedIn && <p className="header__email">{props.email}</p>}
        {props.isLoggedIn && (
          <Link
            to="/sign-in"
            className="header__auth-link"
            onClick={props.onSignOut}
          >
            Выйти
          </Link>
        )}
        {!props.isLoggedIn && currentUrl == "/sign-in" && (
          <Link to="/sign-up" className="header__link">
            Регистрация
          </Link>
        )}
        {!props.isLoggedIn && currentUrl == "/sign-up" && (
          <Link to="/sign-in" className="header__link">
            Войти
          </Link>
        )}
      </div>
    </header>
  );
}

export default Header;
