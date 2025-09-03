import { useAuth } from "@/context/AuthContext";
import { UserRole } from "@/types";
import { Dashboard as DashboardDireksi } from "./direksi/Dashboard";
import DashboardAdmin from "./admin/DashboardAdmin";
import { DashboardSupport } from "./support/DashboardSupport";
import { Navigate } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/" replace />;
  }

  switch (user.role) {
    case UserRole.ADMIN:
      return <DashboardAdmin />;
    case UserRole.DIREKSI:
      return <DashboardDireksi />;
    case UserRole.SUPPORT:
      return <DashboardSupport />;
    default:
      return <Navigate to="/" replace />;
  }
};

export default DashboardPage;
