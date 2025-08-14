import { useEffect, useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useAuth } from "@/context/AuthContext";
import Header from "@/components/Header";
import SeksiCard from "@/components/bebanRuas/SeksiCard";
import Legend from "@/components/bebanRuas/Legend";
import { api2 } from "@/services/api";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import { Button } from "@/components/ui/button";

interface SegmentTarget {
  target_name: string;
  lhr: number;
  total_lhr: number;
}

interface SegmentLoad {
  segment_id: number;
  segment_name: string;
  branch_code: string;
  load: number;
  lhr: number;
  target: SegmentTarget[];
}

interface RuasData {
  id: number;
  name: string;
  persen: number;
  binisPlanLhr: number;
  realisasiLhr: number;
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
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(new Date());

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

  const fetchRuasData = async () => {
    const posisiMapping: { [key: number]: { top: string; left: string } } = {
      1: { top: "82%", left: "25%" }, // SINAKSAK - SIMPANG PANEI
      2: { top: "60%", left: "25%" }, // DOLOK MERAWAN -SINAKSAK
      3: { top: "41%", left: "25%" }, // JC TEBING TINGGI - DOLOK MERAWAN
      4: { top: "15%", left: "81%" }, // KUALA TANJUNG - INDRAPURA
      5: { top: "1000%", left: "59%" }, // INDRAPURA - SS INDRAPURA
      6: { top: "42%", left: "57%" }, // TEBING TINGGI - SS INDRAPURA
      7: { top: "23%", left: "33%" }, // JC TEBING TINGGI - TEBING TINGGI
    };

    try {
      api2
        .get("/tracomm/transaction/segment/load", {
          params: {
            start_date: startDate.toISOString().split("T")[0],
            end_date: endDate.toISOString().split("T")[0],
            freq: "yearly",
          },
        })
        .then((response) => {
          const data = response.data?.data?.segment_load;
          if (!Array.isArray(data)) return;

          const ruas = data.map((segment) => {
            const targetBussinesPlan = segment.target.find(
              (t: SegmentTarget) => t.target_name === "BUSSINES PLAN"
            );

            const realisasiLhr = data.map((segment) => {
              const realLhr = segment.lhr;
              return realLhr;
            });

            console.log(realisasiLhr);

            const persen = targetBussinesPlan
              ? Math.round((segment.lhr / targetBussinesPlan.lhr) * 100)
              : 0;

            // console.log(
            //   `Segment: ${segment.segment_name}, LHR: ${segment.lhr}, Target: ${targetBussinesPlan?.lhr}, Persen: ${persen}`
            // );

            return {
              id: segment.segment_id,
              name: segment.segment_name,
              persen: persen,
              binisPlanLhr: targetBussinesPlan?.lhr ?? 0,
              realisasiLhr: Math.round(segment.lhr),
              posisi: posisiMapping[segment.segment_id] || {
                top: "0%",
                left: "0%",
              },
            };
          });

          setRuasData(ruas);
        })
        .catch((error) => {
          console.error("Failed to load segment data:", error);
        });
    } catch (error) {
      console.error("Failed to load segment data:", error);
    }
  };

  useEffect(() => {
    fetchRuasData();
  }, []);

  const isDark = theme === "dark";

  return (
    <div className="flex min-h-screen text-white">
      <DashboardSidebar />
      <div
        className={`flex-1 bg-dashboard-dark relative overflow-hidden ${
          isSidebarCollapsed ? "ml-0" : "ml-64"
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
          <div className="flex flex-row justify-between mb-3">
            <div className="flex flex-col">
              <h1 className="text-2xl text-white font-bold">
                Beban Ruas Tahun 2025
              </h1>
              <p className="text-xs font-semibold text-gray-400">
                Pantau Detail dari setiap ruas
              </p>
            </div>
            {/* <div className="flex items-center gap-2 mt-2 p-3 md:mt-0">
              <div className="bg-dashboard-accent border border-white flex rounded px-0 py-2 text-white">
                <Calendar className="h-5 w-5 mr-2 ml-1 text-gray-400" />
                <DatePicker
                  selected={startDate}
                  onChange={(date: Date) => setStartDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="bg-transparent w-24 outline-none text-white"
                />
              </div>
              <div className="flex items-center">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12H19M19 12L12 5M19 12L12 19"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <div className="bg-dashboard-accent border border-white flex rounded px-0 py-2 text-white">
                <Calendar className="h-5 w-5 mr-2 ml-1 text-gray-400" />
                <DatePicker
                  selected={endDate}
                  onChange={(date: Date) => setEndDate(date)}
                  dateFormat="dd/MM/yyyy"
                  className="bg-transparent  w-24 outline-none text-white"
                />
              </div>
              <Button
                onClick={fetchRuasData}
                className="bg-white text-black rounded hover:bg-gray-200"
              >
                Search
              </Button>
            </div> */}
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
                  persen={ruas.persen}
                  binisPlanLhr={ruas.binisPlanLhr}
                  realisasiLhr={ruas.realisasiLhr}
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
