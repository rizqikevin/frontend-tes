import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash2 } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import Header from "@/components/Header";

// Mock data for the table
const mockTransactionData = [
  {
    id: "01",
    jenisinput: "RKAP",
    bulan: "Januari",
    tahun: "2025",
    gerbang: "Dolok Merawan",
    targetpendapatan: "Rp 100.000.000",
    realisasipendapatan: "Rp 80.000.000",
    capaian: "80%",
  },
];

export const InputPrognosa: React.FC = () => {
  const { user, logout } = useAuth();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [jenisInput, setJenisInput] = useState("");
  const [tanggal, setTanggal] = useState("");
  const [gerbang, setGerbang] = useState("");
  const [nilaiPendapatan, setNilaiPendapatan] = useState("");
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

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div
        className={`flex-1 ${
          isSidebarCollapsed ? "ml-16" : "ml-64"
        } transition-all duration-300`}
      >
        <Header isDark={isDark} user={user} logout={logout} />

        <main className="p-8">
          {/* Date filters */}
          <div className="flex justify-end mb-8">
            <div className="flex justify-between items-center px-0">
              <div className="flex items-center space-x-4">
                <Select value={jenisInput} onValueChange={setJenisInput}>
                  <SelectTrigger className="w-[180px]  bg-dashboard-accent">
                    <SelectValue placeholder="Jenis Input" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rkap">RKAP</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={tanggal} onValueChange={setTanggal}>
                  <SelectTrigger className="w-[180px]  bg-dashboard-accent">
                    <SelectValue placeholder="Tanggal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="januari">Januari</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={gerbang} onValueChange={setGerbang}>
                  <SelectTrigger className="w-[180px]  bg-dashboard-accent">
                    <SelectValue placeholder="Gerbang" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="dolok-merawan">Dolok Merawan</SelectItem>
                  </SelectContent>
                </Select>

                <Input
                  type="text"
                  placeholder="Rp Nilai Pendapatan"
                  value={nilaiPendapatan}
                  onChange={(e) => setNilaiPendapatan(e.target.value)}
                  className="w-[220px]  bg-dashboard-accent"
                />

                <Button className="bg-green-600 hover:bg-green-700">
                  Simpan
                </Button>
                <Button className="bg-red-600 hover:bg-red-700">Batal</Button>
              </div>
            </div>
          </div>

          {/* Call Logs Section */}
          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <div className="flex justify-between items-center px-0">
              <div>
                <h1 className="text-xl font-semibold">
                  Tabel Rekap Data Input
                </h1>
                <p className="text-gray-100">
                  Daftar data input dari macam macam gerbang
                </p>
              </div>
            </div>
            <div className="overflow-x-auto mt-5">
              <table className="min-w-full text-left text-sm text-white">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="px-4 py-3 text-white">#</th>
                    <th className="px-4 py-3 text-white">Jenis input</th>
                    <th className="px-4 py-3 text-white">Bulan</th>
                    <th className="px-4 py-3 text-white">Tahun</th>
                    <th className="px-4 py-3 text-white">Gerbang</th>
                    <th className="px-4 py-3 text-white">Target Pendapatan</th>
                    <th className="px-4 py-3 text-white">
                      Realisasi Pendapatan
                    </th>
                    <th className="px-4 py-3 text-white">Capaian%</th>
                    <th className="px-4 py-3 text-white">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactionData.map((item) => (
                    <tr
                      key={item.id}
                      className="border-b border-gray-700 hover:bg-gray-800 transition"
                    >
                      <td className="px-5 py-5">{item.id}</td>
                      <td className="px-5 py-5">{item.jenisinput}</td>
                      <td className="px-5 py-5">{item.bulan}</td>
                      <td className="px-5 py-5">{item.tahun}</td>
                      <td className="px-5 py-5">{item.gerbang}</td>
                      <td className="px-5 py-5">{item.targetpendapatan}</td>
                      <td className="px-5 py-5">{item.realisasipendapatan}</td>
                      <td className="px-5 py-5">{item.capaian}</td>
                      <td className="px-2 py-2 flex gap-2">
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-white hover:text-gray-600"
                        >
                          <Pencil className="w-4 h-4" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="text-red-500"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="flex justify-end items-center mt-4 text-sm">
              <div>
                Rows per page:
                <select className="ml-2 bg-transparent border border-gray-700 rounded px-2 py-1">
                  <option>09</option>
                  <option>20</option>
                  <option>50</option>
                </select>
              </div>

              <div className="flex items-center ml-5">
                <span className="mr-4">1-09 of 100</span>
                <div className="inline-flex">
                  <button className="px-2 py-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M12.5 15L7.5 10L12.5 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <button className="px-2 py-1">
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                      <path
                        d="M7.5 15L12.5 10L7.5 5"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
