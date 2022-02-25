import { useState } from "react";
import { useNavigate } from "react-router-dom";

import authenticator from "../../services/authenticator";

import FRONT_ROUTES from "../../config/frontRoutes";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [loginHasError, setLoginHasError] = useState(false);

  const [isLogginIn, setIsLogginIn] = useState(false);

  function handleLoginSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoginHasError(false);
    setIsLogginIn(true);
    authenticator.login({
      email,
      password,
      rememberMe,
      onLoginSuccess: () => {
        navigate(FRONT_ROUTES.profile);
      },
      onLoginFailed: () => {
        setLoginHasError(true);
        setIsLogginIn(false);
      },
    });
  }
  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleLoginSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="input-remember">
            <input
              type="checkbox"
              id="remember-me"
              checked={rememberMe}
              onChange={e => setRememberMe(e.target.checked)}
            />
            <label htmlFor="remember-me">Remember me</label>
          </div>
          <button className="sign-in-button">
            {isLogginIn && <i className="fa fa-spinner fa-spin spin-icon"/>}
            Sign In
          </button>
          {loginHasError && (
            <p className="login-error">
              Connexion impossible avec ces identifiants
            </p>
          )}
        </form>
      </section>
    </main>
  );
};

export default Login;
