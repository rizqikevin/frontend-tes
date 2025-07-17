import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";

export interface DecodedToken {
  user: {
    id: number;
    username: string;
    name: string;
    role: number;
    rules: { alias: string; path: string | null }[];
  };
  iat: number;
  exp: number;
}

export const decodeJWT = (): DecodedToken | null => {
  const token = localStorage.getItem("auth_token");
  if (!token) return null;

  try {
    return jwtDecode<DecodedToken>(token);
  } catch (err) {
    toast.error("JWT decode failed:", err);
    return null;
  }
};
