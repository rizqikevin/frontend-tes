import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  login as authLogin,
  logout as authLogout,
  getCurrentUser,
  isAuthenticated,
} from "../services/auth-service";

type User = ReturnType<typeof getCurrentUser>;

interface AuthContextType {
  user: User;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<User | null>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState(getCurrentUser());
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated()) {
      setUser(getCurrentUser());
    }
    setIsLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    try {
      await authLogin({ username, password });
      const currentUser = getCurrentUser();
      setUser(currentUser);
      return currentUser;
    } catch (error) {
      console.error("Login failed", error);
      setUser(null);
      // Manually clear token instead of calling authLogout to avoid page refresh
      localStorage.removeItem("auth_token");
      localStorage.removeItem("token_cctv");
      return null;
    }
  };

  const logout = () => {
    authLogout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used in AuthProvider");
  return context;
}
