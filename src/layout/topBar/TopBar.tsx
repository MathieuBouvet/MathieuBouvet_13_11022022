import { useNavigate, Link } from "react-router-dom";
import { useAppSelector } from "../../store";
import { useDispatch } from "react-redux";

import FRONT_ROUTES from "../../config/frontRoutes";

import authenticator from "../../services/authenticator";

import { resetProfile } from "../../slices/profileSlice";
import useRequestProfile from "../../hooks/useRequestProfile";

import "./topBar.css";

const TopBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useRequestProfile();

  const userFirstName = useAppSelector(state => state.profile.data?.firstName);

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
        {!authenticator.isLoggedIn() ? (
          <Link className="main-nav-item" to={FRONT_ROUTES.login}>
            <i className="fa fa-user-circle"></i> Sign In
          </Link>
        ) : (
          <>
            <Link className="main-nav-item" to={FRONT_ROUTES.profile}>
              <i className="fa fa-user-circle"></i>
              {` ${userFirstName}`}
            </Link>
            <button
              className="main-nav-item logout"
              onClick={() => {
                authenticator.logout();
                dispatch(resetProfile());
                navigate(FRONT_ROUTES.home);
              }}
            >
              <i className="fa fa-sign-out"></i> Sign Out
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopBar;
