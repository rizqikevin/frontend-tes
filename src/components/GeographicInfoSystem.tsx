import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import MapView from "@/components/MapView";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const GeographicInfoSystem: React.FC = () => {
  const [selectedRoute, setSelectedRoute] = useState("");
  const [selectedDeviceType, setSelectedDeviceType] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedCondition, setSelectedCondition] = useState("");

  const statsData = [
    {
      label: "Total Revenue",
      value: "Rp 59,492.10",
      date: "25/02/2025",
    },
    {
      label: "Total Transaction",
      value: "2101",
      date: "25/02/2025",
    },
    { label: "Active Gate", value: "9", date: "25/02/2025" },
    { label: "Inactive Gate", value: "1", date: "25/02/2025" },
    {
      label: "Total Beban Ruas",
      value: "1.000",
      date: "25/02/2025",
    },
    {
      label: "Total LHR",
      value: "500",
      date: "01/02/2025 - 25/02/2025",
    },
  ];

  const errorLogData = [
    {
      jenisAlat: "CCTV",
      ruas: "Kuala Tanjung",
      waktu: "30/04/2025, 11:12:35 WIB",
      lamaError: "2 Hari 2 Jam",
      status: "error",
    },
    {
      jenisAlat: "VMS",
      ruas: "Kuala Tanjung",
      waktu: "01/05/2025, 13:12:35 WIB",
      lamaError: "1 Hari 2 Jam",
      status: "warning",
    },
    {
      jenisAlat: "Toll Gate",
      ruas: "Gerbang Sinaksak",
      waktu: "02/05/2025, 13:12:35 WIB",
      lamaError: "1 Jam",
      status: "success",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {statsData.map((stat, index) => (
          <div
            key={index}
            className="p-2 rounded-lg border bg-dashboard-accent"
          >
            <div className="flex items-center justify-between mb-2"></div>
            <h3 className="text-sm font-medium mb-1">{stat.label}</h3>
            <p className="text-lg font-semibold">{stat.value}</p>
            <p className="text-xs">{stat.date}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-wrap px-40 gap-2 items-center">
        <Select value={selectedRoute} onValueChange={setSelectedRoute}>
          <SelectTrigger className="w-48 bg-dashboard-accent">
            <SelectValue placeholder="Pilih Ruas Jalan" />
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            <SelectItem value="kuala-tanjung">Kuala Tanjung</SelectItem>
            <SelectItem value="gerbang-sinaksak">Gerbang Sinaksak</SelectItem>
            <SelectItem value="dolok-merawan">Dolok Merawan</SelectItem>
          </SelectContent>
        </Select>

        <Select
          value={selectedDeviceType}
          onValueChange={setSelectedDeviceType}
        >
          <SelectTrigger className="w-48  bg-dashboard-accent">
            <SelectValue placeholder="Semua Jenis Alat" />
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            <SelectItem value="cctv">CCTV</SelectItem>
            <SelectItem value="vms">VMS</SelectItem>
            <SelectItem value="toll-gate">Toll Gate</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedStatus} onValueChange={setSelectedStatus}>
          <SelectTrigger className="w-48  bg-dashboard-accent">
            <SelectValue placeholder="Semua Status" />
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="maintenance">Maintenance</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedCondition} onValueChange={setSelectedCondition}>
          <SelectTrigger className="w-48  bg-dashboard-accent ">
            <SelectValue placeholder="Semua Kondisi" />
          </SelectTrigger>
          <SelectContent className="z-[9999]">
            <SelectItem value="good">Good</SelectItem>
            <SelectItem value="warning">Warning</SelectItem>
            <SelectItem value="error">Error</SelectItem>
          </SelectContent>
        </Select>

        <Button className="px-6">Search</Button>
      </div>

      <div className="grid grid-row-2 lg:grid-cols-3 gap-6">
        {/* Map Section */}
        <div className="lg:col-span-2 rounded-lg border relative overflow-hidden">
          <div className="w-full h-3/6 rounded-lg">
            <MapView />
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-lg border p-4  bg-dashboard-accent">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Log error alat</h3>
            </div>

            <div className="flex gap-4 mb-4 ">
              <Select>
                <SelectTrigger className="flex-1  bg-dashboard-accent">
                  <SelectValue placeholder="Pilih Ruas Jalan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="kuala-tanjung">Kuala Tanjung</SelectItem>
                  <SelectItem value="gerbang-sinaksak">
                    Gerbang Sinaksak
                  </SelectItem>
                </SelectContent>
              </Select>

              <Select>
                <SelectTrigger className="flex-1  bg-dashboard-accent">
                  <SelectValue placeholder="Semua Jenis Alat" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cctv">CCTV</SelectItem>
                  <SelectItem value="vms">VMS</SelectItem>
                  <SelectItem value="toll-gate">Toll Gate</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Error Log Table */}
            <div className="space-y-2">
              <div className="grid grid-cols-4 gap-2 text-xs font-medium p-2 rounded">
                <span>Jenis Alat</span>
                <span>Ruas</span>
                <span>Waktu</span>
                <span>Lama Error</span>
              </div>

              {errorLogData.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-2 text-xs p-2 rounded border"
                >
                  <span>{item.jenisAlat}</span>
                  <span>{item.ruas}</span>
                  <span>{item.waktu}</span>
                  <span
                    className={`inline-flex px-2 py-1 rounded text-xs ${
                      item.status === "error"
                        ? "bg-red-500 text-white"
                        : item.status === "warning"
                        ? "bg-orange-500 text-white"
                        : "bg-green-500 text-white"
                    }`}
                  >
                    {item.lamaError}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeographicInfoSystem;
