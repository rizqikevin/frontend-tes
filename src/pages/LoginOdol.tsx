import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { login } from "@/services/auth-service";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";
import { decodeJWT } from "../utils/decodeJWT";
import { UserRole } from "@/types";
import { TransitionOverlay } from "@/components/TransitionOverlay";

interface ErrorResponse {
  message: string;
  status?: number;
  error?: string;
}

export const LoginOdol = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [showTransition, setShowTransition] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      if (!username || !password) {
        toast.error("Email dan password harus diisi");
        return;
      }

      const response = await login({
        username: username.trim(),
        password,
      });

      const token = localStorage.getItem("auth_token");
      let role: number | null = null;

      if (token) {
        try {
          const decoded = decodeJWT();
          role = decoded.user.role;
        } catch (err) {
          toast.error("Gagal membaca role dari token");
          return;
        }
      }

      if (response) {
        toast.success("Login berhasil");
        setShowTransition(true);
        setTimeout(() => {
          if (role === UserRole.ADMIN) {
            navigate("/dashboard/admin", { replace: true });
          } else if (role === UserRole.DIREKSI) {
            navigate("/dashboard/direksi", { replace: true });
          } else if (role === UserRole.SUPPORT) {
            navigate("/odol", { replace: true });
          } else {
            toast.error("Role tidak dikenali");
          }
          window.location.assign(window.location.href);
        }, 1500);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        const axiosError = error as AxiosError<ErrorResponse>;
        toast.error(
          axiosError.response?.data?.message || "Email atau password salah"
        );
      } else {
        toast.error("Email atau password salah");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: "url('/img/odolTol.jpg')" }}
    >
      {showTransition && <TransitionOverlay />}
      <div className="absolute inset-0 bg-black/50 z-0"></div>
      <div className="bg-white/10 backdrop-blur-sm shadow-xl rounded-xl px-10 py-8 w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/img/Logo.png"
            alt="HMW Logo"
            style={{ width: "50%", padding: 10 }}
          />
        </div>

        {/* Welcome Text */}
        <div className="text-center mb-6">
          <p className="text-gray-300">Welcome to WIM HMW</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Username */}
          <div>
            <label htmlFor="username" className="text-sm text-white block mb-1">
              User Name or Email
            </label>
            <div className="relative">
              {/* Icon user */}
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 10a4 4 0 100-8 4 4 0 000 8zm-6 8a6 6 0 1112 0H4z" />
                </svg>
              </div>
              <Input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="bg-white border-gray-700 text-black w-full pl-10"
                placeholder="User Name"
                required
              />
            </div>
          </div>

          {/* Password */}
          <label htmlFor="password" className="text-sm text-white block mb-1">
            Password
          </label>
          <div className="relative">
            {/* Icon lock */}
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg
                className="h-5 w-5 text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a4 4 0 00-4 4v2H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-1V6a4 4 0 00-4-4zM8 6a2 2 0 114 0v2H8V6z"
                  clipRule="evenodd"
                />
              </svg>
            </div>

            {/* Toggle password button */}
            <div
              className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-1.183.205-2.315.588-3.375m5.812 8.25A6 6 0 1118 12c0 .794-.154 1.55-.432 2.238M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              ) : (
                <svg
                  className="h-5 w-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0zm2.121-2.121A10.05 10.05 0 0121 12c0 5.523-4.477 10-10 10-1.183 0-2.315-.205-3.375-.588m-1.5-1.5A9.974 9.974 0 013 12c0-1.183.205-2.315.588-3.375m1.5-1.5A9.974 9.974 0 0112 3c1.183 0 2.315.205 3.375.588m1.5 1.5L21 3m0 0l-3.375 3.375M3 3l3.375 3.375"
                  />
                </svg>
              )}
            </div>

            <Input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-white border-gray-700 text-black w-full pl-10 pr-10"
              placeholder="Password"
              required
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-blue-900 hover:bg-blue-800 text-white rounded-lg font-semibold"
            disabled={isLoading}
          >
            {isLoading ? "Logging in..." : "Sign In"}
          </Button>
        </form>

        <div className="mt-6 text-center text-xs text-white/80">
          Copyright 2025 Hutama Marga Waskita
        </div>
      </div>
    </div>
  );
};
