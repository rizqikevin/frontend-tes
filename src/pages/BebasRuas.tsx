import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import SeksiCard from "@/components/bebanRuas/SeksiCard";
import Legend from "@/components/bebanRuas/Legend";

interface RuasData {
  id: number;
  name: string;
  panjang: number;
  persen: number;
  nilaiA: number;
  nilaiB: number;
  posisi: {
    top: string;
    left: string;
  };
}

export const BebanRuas: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [ruasData, setRuasData] = useState<RuasData[]>([]);

  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    const checkTheme = () => {
      const savedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(savedTheme);
    };

    checkTheme();
    const themeInterval = setInterval(checkTheme, 100);
    window.addEventListener(
      "sidebarStateChange",
      handleSidebarChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "sidebarStateChange",
        handleSidebarChange as EventListener
      );
      clearInterval(themeInterval);
    };
  }, []);

  useEffect(() => {
    setRuasData([
      {
        id: 1,
        name: "Seksi 1",
        panjang: 20.4,
        persen: 68,
        nilaiA: 11900,
        nilaiB: 8046,
        posisi: { top: "52%", left: "59%" },
      },
      {
        id: 2,
        name: "Seksi 2",
        panjang: 18.05,
        persen: 11,
        nilaiA: 7612,
        nilaiB: 823,
        posisi: { top: "20%", left: "85%" },
      },
      {
        id: 3,
        name: "Seksi 3",
        panjang: 30,
        persen: 114,
        nilaiA: 6025,
        nilaiB: 6875,
        posisi: { top: "50%", left: "22%" },
      },
      {
        id: 4,
        name: "Seksi 4",
        panjang: 28,
        persen: 106,
        nilaiA: 6025,
        nilaiB: 6357,
        posisi: { top: "75%", left: "22%" },
      },
      {
        id: 5,
        name: "Seksi 5",
        panjang: 15.2,
        persen: 74,
        nilaiA: 5000,
        nilaiB: 3700,
        posisi: { top: "13%", left: "40%" },
      },
    ]);
  }, []);

  //   const posisiRuas = {
  //     seksi1: { top: "55%", left: "55%" },
  //     seksi2: { top: "30%", left: "75%" },
  //     seksi3: { top: "40%", left: "25%" },
  //     seksi4: { top: "60%", left: "30%" },
  //     seksi5: { top: "35%", left: "40%" },
  //   }

  // const mappedRuasData = ruasData.map((ruas) => {
  //   const seksiKey = `seksi${ruas.id}`;
  //   return { ...ruas, posisi: posisiRuas[seksiKey] };
  // });

  const isDark = theme === "dark";

  return (
    <div className="flex min-h-screen text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 bg-dashboard-dark relative overflow-hidden ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <Header
          isDark={isDark}
          user={
            user
              ? {
                  name: user.name,
                  role: String(user.role),
                }
              : null
          }
          logout={logout}
        />

        <main className="p-10 relative">
          <div className="flex flex-col justify-end mb-3">
            <h1 className="text-2xl text-white font-bold">Beban Ruas</h1>
            <div>
              <p className="text-xs font-semibold text-gray-400">
                Pantau Detail dari setiap ruas
              </p>
            </div>
          </div>
          <div className="relative w-full h-[90vh] bg-dashboard-accent rounded-lg">
            <img
              src="/gate/tolgatemap.svg"
              alt="Gate Mapping"
              className="absolute w-full h-full object-contain pointer-events-none select-none"
            />

            {ruasData.map((ruas) => (
              <div
                key={ruas.id}
                className="absolute"
                style={{
                  top: ruas.posisi.top,
                  left: ruas.posisi.left,
                  transform: "translate(-50%, -50%)",
                }}
              >
                <SeksiCard
                  name={ruas.name}
                  panjang={ruas.panjang}
                  persen={ruas.persen}
                  nilaiA={ruas.nilaiA}
                  nilaiB={ruas.nilaiB}
                />
              </div>
            ))}

            <Legend />
          </div>
        </main>
      </div>
    </div>
  );
};

export default BebanRuas;
