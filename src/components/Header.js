import mainLogo from "../images/header-logo.svg";
import { Link } from "react-router-dom";

function Header({ link, alt, onSignOut, text, email }) {
  return (
    <>
      <header className="header">
        <img src={mainLogo} alt={alt} className="header__logo" />
        <nav className="header__container">
          <p className="header__text">{email}</p>
          <Link
            to={link}
            className="header__link button"
            type="button"
            onClick={onSignOut}
          >
            {text}
          </Link>
        </nav>
      </header>
    </>
  );
}

export default Header;
