import FRONT_ROUTES from "../../config/frontRoutes";

import { Link } from "react-router-dom";

import "./topBar.css";

const TopBar = () => {
  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to={FRONT_ROUTES.home}>
        <img
          className="main-nav-logo-image"
          src="/img/argentBankLogo.png"
          alt="Argent Bank Logo"
        />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      <div>
        <Link className="main-nav-item" to={FRONT_ROUTES.login}>
          <i className="fa fa-user-circle"></i> Sign In
        </Link>
      </div>
    </nav>
  );
};

export default TopBar;
