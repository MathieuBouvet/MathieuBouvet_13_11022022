export type TokenManager = {
  retrieveToken: () => string | null;
  saveToken: (token: string, saveInLocalstorage: boolean) => void;
  clearToken: () => void;
};

const tokenKey = "auth-token";

const tokenManager: TokenManager = {
  retrieveToken() {
    return localStorage.getItem(tokenKey) ?? sessionStorage.getItem(tokenKey);
  },

  saveToken(token, saveInLocalstorage) {
    const storage = saveInLocalstorage ? localStorage : sessionStorage;

    storage.setItem(tokenKey, token);
  },

  clearToken() {
    localStorage.removeItem(tokenKey);
    sessionStorage.removeItem(tokenKey);
  },
};

export default tokenManager;
