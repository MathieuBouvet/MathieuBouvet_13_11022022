import tokenManager from "./tokenManager";
import apiClient from "./apiClient";
import { loginRoute } from "../config/api/apiRoutes";
import { LoginResponse } from "../config/api/apiResponses";

type Authenticator = {
  login: (params: {
    email: string;
    password: string;
    rememberMe: boolean;
    onLoginSuccess?: () => void;
    onLoginFailed?: () => void;
  }) => void;
  logout: () => void;
  isLoggedIn: () => boolean;
};

const authenticator: Authenticator = {
  async login({
    email,
    password,
    rememberMe,
    onLoginSuccess = () => {},
    onLoginFailed = () => {},
  }) {
    try {
      const response = await apiClient.post<LoginResponse>(
        loginRoute(),
        { email, password },
        false
      );
      if (response.body.token === "") {
        throw new Error();
      }
      tokenManager.saveToken(response.body.token, rememberMe);
      onLoginSuccess();
    } catch (error) {
      onLoginFailed();
    }
  },
  logout() {
    tokenManager.clearToken();
  },
  isLoggedIn() {
    return tokenManager.retrieveToken() != null;
  },
};

export default authenticator;
