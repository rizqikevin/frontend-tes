import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useEffect, useState } from "react";
import api from "@/services/api";

interface CameraGroup {
  id: string;
  name: string;
  description: string;
}

const CCTVList = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  const fetchData = async () => {
    const res = await api.get("/cctv/all");
    const data = res.data;

    try {
      if (data.status === "success") {
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Listen for theme changes and sidebar state changes
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

  const cameras = new Array(16).fill(null);
  cameras[0] =
    "https://upload.wikimedia.org/wikipedia/commons/a/a6/Anjungan_JPO_Karet_Sudirman_Jakarta.jpg";

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      {/* Grid CCTV */}
      <DashboardSidebar />
      <div
        className={`grid grid-cols-4 gap-2 p-4 flex-1 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        } transition-all duration-300`}
      >
        {cameras.map((src, i) => (
          <div key={i} className="aspect-video bg-black">
            {src ? (
              <img
                src={src}
                alt={`CCTV ${i + 1}`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-[url('https://static.vecteezy.com/system/resources/previews/004/138/690/large_2x/no-signal-to-monitor-static-noise-bad-tv-signal-black-and-white-photo.jpg')] bg-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="w-[250px] bg-zinc-800 p-4 border-l border-zinc-700 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-4">CCTV List</h2>

          <Select>
            <SelectTrigger className="w-full mb-4">
              <SelectValue placeholder="Active" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>

          <div className="grid grid-cols-2 gap-2">
            {[
              "Camera VMS",
              "Camera Main Road",
              "Camera Lajur Cabang",
              "CCTV ALPR",
              "CCTV Dome",
              "Counting",
            ].map((label) => (
              <Button
                key={label}
                variant="outline"
                className="text-xs whitespace-normal h-auto py-2"
              >
                {label}
              </Button>
            ))}
          </div>

          <div className="mt-4">
            <Input placeholder="Search..." className="text-black" />
          </div>
        </div>

        <div className="text-sm text-zinc-400 mt-6">Gate KM 78</div>
      </div>
    </div>
  );
};

export default CCTVList;
