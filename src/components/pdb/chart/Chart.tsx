import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { Button } from "@/components/ui/button";
import StatsCard from "./StatsCard";
import Beban from "./beban/Beban";
import PowerQuality from "./powerquality/PowerQuality";
import Fasa from "./fasa/Fasa";
import Anomali from "./anomali/Anomali";
import api from "@/services/api";
import { usePdbHistoryStore } from "@/stores/useStatsCardPdbStore";
import { Calendar } from "lucide-react";
import DatePicker from "react-datepicker";
import { setTime } from "node_modules/react-datepicker/dist/date_utils";

interface OptionsData {
  sensor_name: string;
}

export const Chart: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("beban");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [sensorOptions, setSensorOptions] = useState<OptionsData[]>([]);
  const {
    data,
    time,
    setTime,
    loading,
    error,
    fetchData,
    sensorName,
    setSensorName,
  } = usePdbHistoryStore();

  useEffect(() => {
    fetchData();
  }, [sensorName, time]);

  // console.log(data);

  useEffect(() => {
    const fetchGateOptions = async () => {
      try {
        const res = await api.get("/sensor/pdb/name");
        setSensorOptions(res.data.data);
      } catch (error) {
        console.error("Error fetching gate options:", error);
      }
    };
    fetchGateOptions();
  }, []);

  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    const checkTheme = () => {
      const savedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(savedTheme);
    };

    // Initial theme check
    checkTheme();

    // Listen for theme changes
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

  const isDark = theme === "dark";

  const renderContent = () => {
    switch (selectedTab) {
      case "beban":
        return <Beban />;
      case "power":
        return <PowerQuality />;
      case "fasa":
        return <Fasa />;
      case "anomali":
        return <Anomali />;
      default:
        return null;
    }
  };
  return (
    <>
      <div className="bg-dashboard-dark max-h-screen p-0 text-white space-y-4">
        <div className="flex flex-row justify-between mb-3">
          <div className="flex flex-col">
            <h1 className="text-2xl text-white font-bold">PDB</h1>
            <p className="text-lg text-gray-400">Overview Pemakaian</p>
          </div>
          <div className="flex flex-row gap-4">
            {" "}
            <div className="bg-dashboard-accent items-center border border-white flex rounded px-0 py-2 text-white">
              <Calendar className="h-5 w-5 mr-2 ml-1 text-gray-400" />
              <DatePicker
                selected={time}
                onChange={(date: Date) => setTime(date)}
                dateFormat="dd/MM/yyyy"
                className="bg-transparent w-24 outline-none text-white"
              />
            </div>
            <div className="bg-dashboard-accent border  border-white flex rounded text-white">
              <select
                onChange={(e) => setSensorName(e.target.value)}
                className="text-white  bg-dashboard-accent p-3 rounded-lg outline-none"
              >
                {sensorOptions.map((g) => (
                  <option key={g.sensor_name} value={g.sensor_name}>
                    {g.sensor_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <StatsCard title="Total Beban" value={data?.energy} satuan=" kWh" />
          <StatsCard
            title="Demand Rata-rata"
            value={data?.avg_energy_perhour}
            satuan=" kW"
          />
          <StatsCard
            title="Beban Puncak"
            value={data?.beban_puncak}
            satuan=" kW"
          />
          <StatsCard title="PF Median" value="0.4" satuan=" ɸ" />
          <StatsCard
            title="Freq Rata-rata"
            value={data?.avg_frequency}
            satuan=" Hz"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Button
            onClick={() => setSelectedTab("beban")}
            className={`${
              selectedTab === "beban"
                ? "bg-gray-50 text-gray-900"
                : "bg-dashboard-accent text-white"
            }`}
          >
            Beban (kW)
          </Button>
          <Button
            onClick={() => setSelectedTab("power")}
            className={`${
              selectedTab === "power"
                ? "bg-gray-50 text-gray-900"
                : "bg-dashboard-accent text-white"
            }`}
          >
            Power Quality
          </Button>
          <Button
            onClick={() => setSelectedTab("fasa")}
            className={`${
              selectedTab === "fasa"
                ? "bg-gray-50 text-gray-900"
                : "bg-dashboard-accent text-white"
            }`}
          >
            Per Fasa
          </Button>
          <Button
            onClick={() => setSelectedTab("anomali")}
            className={`${
              selectedTab === "anomali"
                ? "bg-gray-50 text-gray-900"
                : "bg-dashboard-accent text-white"
            }`}
          >
            Anomali
          </Button>
        </div>
        <div className="p-0">{renderContent()}</div>
      </div>
    </>
  );
};
