import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import DelamataBilanoLogo from "@/components/HmwLogo";
import { toast } from "sonner";
import { login } from "@/services/auth-service";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { UserRole } from "@/types";

interface ErrorResponse {
  message: string;
  status?: number;
  error?: string;
}

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Validate input
      if (!email || !password) {
        toast.error("Email dan password harus diisi");
        return;
      }

      console.log("Submitting login form:", {
        email: email.trim(),
        hasPassword: !!password,
      });

      const response = await login({
        email: email.trim(),
        password,
      });

      console.log("User role:", response.user.role);
      console.log("Enum ADMIN:", UserRole.ADMIN);
      const role = response.user.role;

      if (response.user) {
        toast.success("Login berhasil");
        console.log("User after login:", response.user);

        // Set timeout before navigating
        setTimeout(() => {
          if (role === UserRole.ADMIN) {
            navigate("/dashboard/admin", { replace: true });
            window.location.reload();
            console.log("Navigating based on role:", role);
          } else if (role === UserRole.DIREKSI) {
            navigate("/dashboard/direksi", { replace: true });
            console.log("Navigating based on role:", role);
            window.location.reload();
          } else {
            toast.error("Role tidak dikenali");
          }
        }, 2000); // Set timeout 2 detik (2000 ms)
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error instanceof Error) {
        if (error instanceof AxiosError) {
          const axiosError = error as AxiosError<ErrorResponse>;
          toast.error(
            axiosError.response?.data?.message || "Email atau password salah"
          );
        } else {
          toast.error(error.message || "Email atau password salah");
        }
      } else {
        toast.error("Email atau password salah");
      }
    } finally {
      setIsLoading(false); // Ensure loading state is reset after error or success
    }
  };

  return (
    <div className="login-page">
      {/* Left side - Image */}
      <div
        className="login-image"
        style={{ backgroundImage: `url('/img/tol.jpg')` }}
      />

      {/* Right side - Form */}
      <div className="login-form">
        <div className="max-w-md w-full space-y-8">
          <div className="flex justify-center mb-8">
            <DelamataBilanoLogo />
          </div>

          <div className="text-left mb-8">
            <h2 className="text-2xl font-medium">Hello</h2>
            <p className="text-gray-400">Welcome to PT Hutama Marga Waskita</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="username" className="block text-sm font-medium">
                User Name or Email
              </label>
              <div className="relative">
                <Input
                  id="username"
                  type="text"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white w-full pl-10"
                  required
                  placeholder="User Name"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-800 border-gray-700 text-white w-full pl-10"
                  required
                  placeholder="Password"
                />
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 text-gray-400"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
            </div>

            <div>
              <Button
                type="submit"
                className="button-primary"
                disabled={isLoading}
              >
                {isLoading ? "Logging in..." : "Login"}
              </Button>
            </div>
          </form>

          <div className="mt-16 text-center text-xs text-gray-500">
            Copyright 2025 Syafiq
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
