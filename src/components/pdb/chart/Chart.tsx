import { useEffect, useState } from "react";
import LineChart from "./LineChart";
import { Button } from "@/components/ui/button";
import StatsCard from "./StatsCard";
import Beban from "./beban/Beban";
import PowerQuality from "./powerquality/PowerQuality";
import Fasa from "./fasa/Fasa";
import Anomali from "./anomali/Anomali";

export const Chart: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState("beban");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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
            <p className="text-lg text-gray-400">Riwayat Pemakaian</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-4">
          <StatsCard title="Total Beban" value="2.6" satuan=" kWh" />
          <StatsCard title="Demand Rata-rata" value="19.341" satuan=" kW" />
          <StatsCard title="Beban Puncak" value="20.341" satuan=" kW" />
          <StatsCard title="PF Median" value="0.4" satuan=" ɸ" />
          <StatsCard title="Freq Rata-rata" value="59.9" satuan=" Hz" />
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
