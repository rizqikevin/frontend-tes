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

interface AuthContextType {
  user: ReturnType<typeof getCurrentUser>;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
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
      return !!currentUser;
    } catch (error) {
      console.error("Login failed", error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    authLogout();
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
