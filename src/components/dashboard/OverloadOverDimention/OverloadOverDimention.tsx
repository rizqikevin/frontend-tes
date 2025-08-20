import React, { useEffect } from "react";
import { useGolonganChartStore } from "@/stores/useGolonganChartStore";
import numeral from "numeral";
import { VehichleDougnut } from "./VehicleDougnut";
import { ComparisonChart1 } from "./ComparisonChart1";
import { ComparisonChart2 } from "./ComparisonChart2";
import { ComparisonChart3 } from "./ComparisonChart3";
import { ComparisonChart5 } from "./ComparisonChart5";
import { StatusVehicleCard } from "./StatusVehicleCard";
import { StatusDougnut } from "./StatusDougnut";

export const OverloadOverDimention: React.FC = () => {
  const { chartData, fetchChartData } = useGolonganChartStore();

  let date = new Date();
  let year = date.getFullYear();
  let month = date.getMonth();
  let startDate = new Date(year, month, 2).toISOString().split("T")[0];
  let endDate = new Date(year, month + 1, 1).toISOString().split("T")[0];
  let startYears = new Date(year, 0, 1).toISOString().split("T")[0];
  let endYears = new Date(year + 1, 0, 1).toISOString().split("T")[0];

  const monthTitle = new Date().toLocaleString("id-ID", { month: "long" });

  // console.log("monthTitle", monthTitle);

  // console.log("start_years", start_years);
  // console.log("end_years", end_years);

  // console.log("start_date", start_date);
  // console.log("end_date", end_date);
  // console.log("month", month);
  // console.log("year", year);

  // console.log("chartData", chartData);

  let title1 = chartData?.labels[0];
  let title2 = chartData?.labels[1];
  let value1 = chartData?.datasets[0].data[0];
  let value2 = chartData?.datasets[0].data[1];

  // console.log("title1", title1);

  useEffect(() => {
    fetchChartData();
  }, [fetchChartData]);

  const data = chartData?.datasets[0].data;
  const total = data?.reduce((sum, val) => sum + val, 0);
  let percentage = total > 0 ? ((value1 / total) * 100).toFixed(1) : "0.0";
  let percentage2 = total > 0 ? ((value2 / total) * 100).toFixed(1) : "0.0";
  // console.log("percentage", percentage);
  // console.log("percentage2", percentage2);

  return (
    <div className="bg-dashboard-dark min-h-screen text-white p-0 space-y-4">
      <div className="grid grid-cols-12 gap-4 h-full">
        <div className="bg-dashboard-accent col-span-5 grid grid-cols-2 gap-4">
          <VehichleDougnut />
          <StatusVehicleCard
            title="Jumlah Kendaraan"
            value={total}
            title2={title1}
            value2={numeral(value1).format("0,0")}
            title3={title2}
            value3={numeral(value2).format("0,0")}
            percentage2={Number(percentage)}
            percentage={Number(percentage2)}
          />
        </div>
        <div className=" col-span-7 grid grid-cols-2 gap-4">
          <StatusDougnut
            title={`Bulan ${monthTitle} ${year}`}
            start={startDate}
            end={endDate}
          />
          <StatusDougnut
            title={`Tahun ${year}`}
            start={startYears}
            end={endYears}
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <ComparisonChart5 />
        </div>
        <div className="col-span-6">
          <ComparisonChart1 />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6">
          <ComparisonChart3 />
        </div>
        <div className="col-span-6">
          <ComparisonChart2 />
        </div>
      </div>
    </div>
  );
};
