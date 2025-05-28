import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, LogOut } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import MapView from "@/components/MapView";

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const currentDate = new Date();
  const [startDate, setStartDate] = useState("27 - February - 2025");
  const [endDate, setEndDate] = useState("27 - February - 2025");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      <DashboardSidebar />
      <div className={`flex-1 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <header className="flex justify-between items-center py-1 px-8">
          <div></div>
          <div className="flex items-center space-x-2">
            {user && (
              <div className="flex items-center">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center space-x-2 cursor-pointer outline-none">
                    <div className="mr-2">
                      <img
                        src={user.image}
                        alt={user.firstName}
                        className="h-8 w-8 rounded-full"
                      />
                    </div>
                    <div className="text-sm">Hi, {user.firstName}</div>
                    <ChevronDown className="h-4 w-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-dashboard-accent border border-gray-700"
                  >
                    <DropdownMenuItem
                      className="text-gray-200 flex items-center space-x-2"
                      onClick={logout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      <span>Logout</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </header>

        <main className="p-8">
          <div className="flex justify-between mb-8">
            <div className="flex justify-between items-center px-0">
              <div>
                <h1 className="text-2xl font-semibold">
                  Geographic Informasi Sistem
                </h1>
                <p className="text-gray-400">
                  Pantau detail dari setiap kejadian
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
                <div className="relative">
                  <div className="border border-gray-700 rounded flex items-center px-5 py-2 bg-dashboard-accent">
                    <select className="bg-dashboard-accent text-white">
                      <option value="1">Geographic Informasi Sistem</option>
                      <option value="2">Transaction Overview</option>
                      <option value="3">Overload-Over Dimention</option>
                    </select>
                  </div>
                </div>
                <div className="relative">
                  <div className="border border-gray-700 rounded flex items-center px-4 py-2 bg-dashboard-accent">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{startDate}</span>
                  </div>
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
                <div className="relative">
                  <div className="border border-gray-700 rounded flex items-center px-4 py-2 bg-dashboard-accent">
                    <Calendar className="h-5 w-5 mr-2 text-gray-400" />
                    <span>{endDate}</span>
                  </div>
                </div>
              </div>
              <Button className="px-4 py-2 bg-white text-black rounded hover:bg-gray-200">
                Search
              </Button>
            </div>
          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-6 gap-4 mb-8">
            {[
              { label: "Total Revenue", value: "Rp 59,492.10" },
              { label: "Total Transaction", value: "2101" },
              { label: "Active Gate", value: "9" },
              { label: "Inactive Gate", value: "1" },
              { label: "Total Beban Ruas", value: "1.000" },
              { label: "Total LHR", value: "500" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-dashboard-accent border border-gray-700 rounded px-4 py-3"
              >
                <div className="text-gray-400 text-sm mb-1">{item.label}</div>
                <div className="text-lg font-semibold">{item.value}</div>
                <div className="text-xs text-gray-500 mt-1">25/02/2025</div>
              </div>
            ))}
          </div>

          {/* Top Cards */}
          <div className="grid grid-cols-5 gap-4 mb-8">
            <div className="bg-dashboard-accent border border-gray-700 rounded px-4 py-3">
              <select className=" bg-dashboard-accent text-white text-sm mb-1">
                <option value="">Pilih Ruas Jalan</option>
                <option value="dolok-merawan-sinaksak">
                  Dolok Merawan - Sinaksak
                </option>
                <option value="sinaksak-kuala-tanjung">
                  Sinaksak - Kuala Tanjung
                </option>
                <option value="kuala-tanjung-tanjung-morawa">
                  Kuala Tanjung - Tanjung Morawa
                </option>
                <option value="tanjung-morawa-teluk-nibung">
                  Tanjung Morawa - Teluk Nibung
                </option>
                <option value="teluk-nibung-tanjung-balai">
                  Teluk Nibung - Tanjung Balai
                </option>
              </select>
            </div>
            <div className="bg-dashboard-accent border border-gray-700 rounded px-4 py-3">
              <select className=" bg-dashboard-accent text-white text-sm mb-1">
                <option value="">Semua Jenis Alat</option>
                <option value="dolok-merawan-sinaksak">CCTV</option>
                <option value="sinaksak-kuala-tanjung">VMS</option>
                <option value="kuala-tanjung-tanjung-morawa">Gardu</option>
                <option value="tanjung-morawa-teluk-nibung">Toll Gate</option>
                <option value="teluk-nibung-tanjung-balai">Street Light</option>
              </select>
            </div>
            <div className="bg-dashboard-accent border border-gray-700 rounded px-4 py-3">
              <select className=" bg-dashboard-accent text-white text-sm mb-1">
                <option value="">Semua Status</option>
                <option value="dolok-merawan-sinaksak">CCTV</option>
                <option value="sinaksak-kuala-tanjung">VMS</option>
                <option value="kuala-tanjung-tanjung-morawa">Gardu</option>
                <option value="tanjung-morawa-teluk-nibung">Toll Gate</option>
                <option value="teluk-nibung-tanjung-balai">Street Light</option>
              </select>
            </div>
            <div className="bg-dashboard-accent border border-gray-700 rounded px-4 py-3">
              <select className=" bg-dashboard-accent text-white text-sm mb-1">
                <option value="">Semua Kondisi</option>
                <option value="dolok-merawan-sinaksak">CCTV</option>
                <option value="sinaksak-kuala-tanjung">VMS</option>
                <option value="kuala-tanjung-tanjung-morawa">Gardu</option>
                <option value="tanjung-morawa-teluk-nibung">Toll Gate</option>
                <option value="teluk-nibung-tanjung-balai">Street Light</option>
              </select>
            </div>
            <div className="bg-dashboard-accent border border-gray-700 rounded px-4 py-3">
              <button className=" bg-dashboard-accent text-white text-sm mb-1">
                Search
              </button>
            </div>
          </div>

          {/* Map and Log Section Placeholder */}
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 bg-dashboard- rounded shadow">
              <div className="object-cover rounded">
                <MapView />
              </div>
            </div>
            <div className="bg-dashboard-dark">
              <div className="bg-dashboard-accent rounded-lg p-4 mb-4">
                <h2 className="text-base font-semibold mb-4">Log error alat</h2>
                <div className="flex gap-4 mb-4">
                  <select className="bg-dashboard-dark text-white border border-gray-600 rounded px-3 py-2 text-sm w-1/2">
                    <option>Pilih Ruas Jalan</option>
                  </select>
                  <select className="bg-dashboard-dark text-white border border-gray-600 rounded px-3 py-2 text-sm w-1/2">
                    <option>Semua Jenis Alat</option>
                  </select>
                </div>

                <table className="table-auto text-sm w-full">
                  <thead>
                    <tr className="text-gray-400 text-left">
                      <th className="py-2">Jenis Alat</th>
                      <th>Ruas</th>
                      <th>Waktu</th>
                      <th>Lama Error</th>
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    <tr className="border-t border-gray-700">
                      <td className="py-2">CCTV</td>
                      <td>Kuala Tanjung</td>
                      <td>30/04/2025, 11:12:35 WIB</td>
                      <td>
                        <span className="bg-red-600 text-white text-xs px-2 py-1 rounded">
                          2 Hari 2 Jam
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="py-2">VMS</td>
                      <td>Kuala Tanjung</td>
                      <td>01/05/2025, 13:12:35 WIB</td>
                      <td>
                        <span className="bg-yellow-500 text-white text-xs px-2 py-1 rounded">
                          1 Hari 2 Jam
                        </span>
                      </td>
                    </tr>
                    <tr className="border-t border-gray-700">
                      <td className="py-2">Toll Gate</td>
                      <td>Gerbang Sinaksak</td>
                      <td>02/05/2025, 13:12:35 WIB</td>
                      <td>
                        <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                          1 Jam
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
