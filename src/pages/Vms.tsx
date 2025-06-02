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

const VMS = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState<"light" | "dark">("dark");

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
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Jalan_Sudirman_-_Jakarta_Selatan.jpg/800px-Jalan_Sudirman_-_Jakarta_Selatan.jpg";

  return (
    <div className="flex h-screen bg-zinc-900 text-white">
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
              <div className="w-full h-full bg-[url('https://media.istockphoto.com/id/1033569348/video/loop-tv-snow-noise-background-no-signal.jpg?s=640x640&k=20&c=aKBU-YzOG53qtaFufQn38YldB5kVUVDA_7FKyLGk36s=')] bg-cover" />
            )}
          </div>
        ))}
      </div>

      {/* Sidebar */}
      <div className="w-[250px] bg-zinc-800 p-4 border-l border-zinc-700 flex flex-col justify-between">
        <div>
          <h2 className="font-semibold text-lg mb-4">VMS</h2>

          <div className="mt-4 ">
            <Input
              placeholder="Search..."
              className="text-black bg-dashboard-accent"
            />
            <div className="text-sm text-zinc-400 mt-6">Gate KM 78</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VMS;
