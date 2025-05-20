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

// Mock data for the table
const mockTransactionData = [
  {
    id: "01",
    date: "28/02/2025",
    namaPenelepon: "Anton",
    nomorPenelepon: "086978568834",
    namaPenerima: "Rudi",
    nomorPenerima: "021777366",
    status: "Terjawab",
    durasi: "00:10:32",
    timeBridgeEnter: "14:10:32",
    timeDialBegin: "14:10:32",
    timeHangup: "14:10:32",
  },
  {
    id: "02",
    date: "28/02/2025",
    namaPenelepon: "Anton",
    nomorPenelepon: "086978568834",
    namaPenerima: "Rudi",
    nomorPenerima: "021777366",
    status: "Terjawab",
    durasi: "00:10:32",
    timeBridgeEnter: "14:10:32",
    timeDialBegin: "14:10:32",
    timeHangup: "14:10:32",
  },
  {
    id: "03",
    date: "28/02/2025",
    namaPenelepon: "Anton",
    nomorPenelepon: "086978568834",
    namaPenerima: "Rudi",
    nomorPenerima: "021777366",
    status: "Terjawab",
    durasi: "00:10:32",
    timeBridgeEnter: "14:10:32",
    timeDialBegin: "14:10:32",
    timeHangup: "14:10:32",
  },
  {
    id: "04",
    date: "28/02/2025",
    namaPenelepon: "Anton",
    nomorPenelepon: "086978568834",
    namaPenerima: "Rudi",
    nomorPenerima: "021777366",
    status: "Terjawab",
    durasi: "00:10:32",
    timeBridgeEnter: "14:10:32",
    timeDialBegin: "14:10:32",
    timeHangup: "14:10:32",
  },
  {
    id: "05",
    date: "28/02/2025",
    namaPenelepon: "Anton",
    nomorPenelepon: "086978568834",
    namaPenerima: "Rudi",
    nomorPenerima: "021777366",
    status: "Terjawab",
    durasi: "00:10:32",
    timeBridgeEnter: "14:10:32",
    timeDialBegin: "14:10:32",
    timeHangup: "14:10:32",
  },
  {
    id: "06",
    date: "28/02/2025",
    namaPenelepon: "Anton",
    nomorPenelepon: "086978568834",
    namaPenerima: "Rudi",
    nomorPenerima: "021777366",
    status: "Terjawab",
    durasi: "00:10:32",
    timeBridgeEnter: "14:10:32",
    timeDialBegin: "14:10:32",
    timeHangup: "14:10:32",
  },
  {
    id: "07",
    date: "28/02/2025",
    namaPenelepon: "Anton",
    nomorPenelepon: "086978568834",
    namaPenerima: "Rudi",
    nomorPenerima: "021777366",
    status: "Terjawab",
    durasi: "00:10:32",
    timeBridgeEnter: "14:10:32",
    timeDialBegin: "14:10:32",
    timeHangup: "14:10:32",
  },
  {
    id: "08",
    date: "28/02/2025",
    namaPenelepon: "Anton",
    nomorPenelepon: "086978568834",
    namaPenerima: "Rudi",
    nomorPenerima: "021777366",
    status: "Terjawab",
    durasi: "00:10:32",
    timeBridgeEnter: "14:10:32",
    timeDialBegin: "14:10:32",
    timeHangup: "14:10:32",
  },
  {
    id: "09",
    date: "28/02/2025",
    namaPenelepon: "Anton",
    nomorPenelepon: "086978568834",
    namaPenerima: "Rudi",
    nomorPenerima: "021777366",
    status: "Terjawab",
    durasi: "00:10:32",
    timeBridgeEnter: "14:10:32",
    timeDialBegin: "14:10:32",
    timeHangup: "14:10:32",
  },
];

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const currentDate = new Date();
  const [startDate, setStartDate] = useState("01 - Januari - 2024");
  const [endDate, setEndDate] = useState("31 - Desember - 2024");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-dashboard-dark text-white">
      {/* Sidebar */}
      <DashboardSidebar />

      {/* Main Content */}
      <div className={`flex-1 ${isSidebarCollapsed ? "ml-16" : "ml-64"}`}>
        <header className="flex justify-between items-center py-6 px-8 border-b border-dashboard-accent">
          <div>
            <h1 className="text-2xl font-medium">Transaction Overview</h1>
            <p className="text-gray-400">Pantau setiap detail transaksi</p>
          </div>

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
          {/* Date filters */}
          <div className="flex justify-between mb-8">
            <div className="flex items-center space-x-4">
              <h2 className="text-xl font-medium">Call Logs</h2>
              <p className="text-gray-400">Jumlah Aktivitas Log VIoP</p>
            </div>

            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-4">
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

          {/* Call Logs Section */}
          <div className="bg-dashboard-accent rounded-lg p-6 mb-8">
            <div className="overflow-x-auto">
              <table className="dashboard-table">
                <thead>
                  <tr>
                    <th className="rounded-tl-lg">#</th>
                    <th>Tanggal</th>
                    <th>Nama Penelepon</th>
                    <th>Nomor Penelepon</th>
                    <th>Nama Penerima</th>
                    <th>Nomor Penerima</th>
                    <th>Status</th>
                    <th>Durasi</th>
                    <th>Time Bridge Enter</th>
                    <th>Time Dial Begin</th>
                    <th className="rounded-tr-lg">Time Hangup</th>
                  </tr>
                </thead>
                <tbody>
                  {mockTransactionData.map((item) => (
                    <tr key={item.id} className="border-b border-gray-700">
                      <td>{item.id}</td>
                      <td>{item.date}</td>
                      <td>{item.namaPenelepon}</td>
                      <td>{item.nomorPenelepon}</td>
                      <td>{item.namaPenerima}</td>
                      <td>{item.nomorPenerima}</td>
                      <td>{item.status}</td>
                      <td>{item.durasi}</td>
                      <td>{item.timeBridgeEnter}</td>
                      <td>{item.timeDialBegin}</td>
                      <td>{item.timeHangup}</td>
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

export default Dashboard;
