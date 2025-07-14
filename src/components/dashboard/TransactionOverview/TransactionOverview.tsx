import { CardPanel } from "./CardPanel";
import BarChart from "./BarChart";
import { DoughnutChart } from "./DoughnutChart";
import { SimplePanel } from "./SimplePanel";
import { OtherRevenueList } from "./OtherRevenueList";
import { AchievementRingContainer } from "./AchievementCard/AchievementRingContainer";
import { useRevenueStore } from "@/stores/useRevenueStore";
import { useEffect } from "react";

const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const TransactionOverview = () => {
  const {
    items,
    startDate,
    endDate,
    fetchRevenue,
    externalRevenueTotal,
    internalRevenue,
    externalItems,
  } = useRevenueStore();

  console.log(externalItems);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const formatCurrency = (value: number) =>
    `Rp ${value.toLocaleString("id-ID", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const dateRange = `${startDate} / ${endDate}`;

  const otherRevenueData = externalItems.map((item) => ({
    name: item.branch_name,
    value: `Rp ${item.revenue.toLocaleString("id-ID")}`,
  }));

  const sampleBarData = [
    {
      label: "LHR",
      backgroundColor: "#42A5F5",
      data: [
        90000, 85000, 80000, 70000, 60000, 55000, 50000, 48000, 45000, 44000,
        42000, 40000,
      ],
    },
    {
      label: "Prognosa",
      backgroundColor: "#FFEB3B",
      data: [
        100000, 95000, 90000, 88000, 85000, 80000, 75000, 72000, 70000, 68000,
        65000, 62000,
      ],
    },
  ];

  return (
    <div className="bg-dashboard-dark min-h-screen p-4 text-white space-y-4">
      {/* ROW 1 */}
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Doughnut Chart */}
        <div className="col-span-12 sm:col-span-1 lg:col-span-3 min-w-0 h-full">
          <DoughnutChart
            title="Akumulasi Pendapatan HMW"
            total="Rp 555.000.000.000"
            labels={[
              "Kuala Tanjung",
              "Indrapura",
              "Tebing Tinggi",
              "Dolok Merawan",
              "Sinaksak",
              "Simpang Panei",
            ]}
            data={[
              75500000, 75500000, 100500000, 100500000, 100500000, 100500000,
            ]}
            backgroundColors={[
              "#f9a825",
              "#00bcd4",
              "#7c4dff",
              "#607d8b",
              "#4caf50",
              "#9c27b0",
            ]}
          />
        </div>

        {/* Achievement Ring */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-2 min-w-0 h-full">
          <AchievementRingContainer />
        </div>

        {/* 3 Chart */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0 h-full">
          <BarChart
            title="PERBANDINGAN LHR TERHADAP PROGNOSA"
            labels={months}
            datasets={sampleBarData}
          />
          <BarChart
            title="PERBANDINGAN LHR TERHADAP BUSINESS PLAN"
            labels={months}
            datasets={sampleBarData}
          />
          <BarChart
            title="PERBANDINGAN LHR TERHADAP RKAP"
            labels={months}
            datasets={sampleBarData}
          />
        </div>
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-12 gap-4">
        {/* Info Panels */}
        <div className="col-span-2 flex flex-col">
          <SimplePanel
            title="Keluar Toll HMW"
            dateRange={dateRange}
            value={formatCurrency(internalRevenue)}
          />
          <hr className=" border-white" />
          <SimplePanel
            title="Keluar selain tol HMW"
            dateRange={dateRange}
            value={formatCurrency(externalRevenueTotal)}
          />
        </div>
        <div className="col-span-3 h-full bg-dashboard-accent p-1 rounded-lg">
          <OtherRevenueList data={otherRevenueData} />
        </div>

        {/* 3 Chart */}
        <div className="col-span-7 grid grid-cols-3 gap-4">
          <BarChart
            title="PERBANDINGAN PENDAPATAN TERHADAP PROGNOSA"
            labels={months}
            datasets={sampleBarData}
          />
          <BarChart
            title="PERBANDINGAN PENDAPATAN TERHADAP BUSINESS PLAN"
            labels={months}
            datasets={sampleBarData}
          />
          <BarChart
            title="PERBANDINGAN PENDAPATAN TERHADAP RKAP"
            labels={months}
            datasets={sampleBarData}
          />
        </div>
      </div>

      {/* ROW 3 - Card Panel */}
      <div className="grid grid-cols-6 gap-4">
        {items.map((item) => (
          <CardPanel
            key={item.branch_name}
            title={item.branch_name}
            value={item.revenue}
            percentage={0}
            location={item.branch_name}
            dateRange={`${startDate} / ${endDate}`}
          />
        ))}
      </div>
    </div>
  );
};

export default TransactionOverview;
