import api from "./api";
import { decodeJWT } from "../utils/decodeJWT";

const TOKEN_KEY = "auth_token";
const TOKEN_CCTV = "token_cctv";

interface LoginResponse {
  token: string;
  tokenCctv?: string;
}

interface LoginCredentials {
  username: string;
  password: string;
}

export const login = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  try {
    // console.log("Attempting login with:", credentials);
    const { data } = await api.post<LoginResponse>("/auth/login", credentials);

    if (!data.token) {
      throw new Error("Invalid response: missing token");
    }

    // Save token and user data
    localStorage.setItem(TOKEN_KEY, data.token);
    localStorage.setItem(TOKEN_CCTV, data.tokenCctv);
    console.log("Token saved:", data.token);
    console.log("Token cctv saved:", data.tokenCctv);

    return data;
  } catch (error) {
    // console.error("Login error:", error);
    throw error;
  }
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(TOKEN_CCTV);
  window.location.href = "/";
};

export const getToken = (): string | null => {
  return localStorage.getItem(TOKEN_KEY);
};

export const getTokenCctv = (): string | null => {
  return localStorage.getItem(TOKEN_CCTV);
};

export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  const decoded = decodeJWT();
  const now = Math.floor(Date.now() / 1000);
  return !!decoded && decoded.exp > now;
};

export const getCurrentUser = () => {
  const decoded = decodeJWT();
  return decoded?.user ?? null;
};
