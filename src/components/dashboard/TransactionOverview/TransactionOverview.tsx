import { CardPanel } from "./CardPanel";
import BarChart from "./BarChart";
import { DoughnutChart } from "./DoughnutChart";
import { SimplePanel } from "./SimplePanel";
import { OtherRevenueList } from "./OtherRevenueList";
import { AchievementRingContainer } from "./AchievementCard/AchievementRingContainer";
import { useRevenueStore } from "@/stores/useRevenueStore";
import { useEffect } from "react";
import { useTransactionChartStore } from "@/stores/useTransactionChartStore ";
import { formatRevenue } from "@/utils/formatRevenue";

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
    totalRevenue,
  } = useRevenueStore();
  const { chartData, fetchChartData } = useTransactionChartStore();

  // console.log(totalRevenue);

  useEffect(() => {
    fetchChartData("lhr", "1"); // LHR vs Prognosa
    fetchChartData("lhr", "2"); // LHR vs Business Plan
    fetchChartData("lhr", "3"); // LHR vs RKAP

    fetchChartData("revenue", "1"); // Revenue vs Prognosa
    fetchChartData("revenue", "2"); // Revenue vs Business Plan
    fetchChartData("revenue", "3"); // Revenue vs RKAP
  }, []);

  useEffect(() => {
    fetchRevenue();
  }, []);

  const formatCurrency = (value: number) =>
    `Rp ${value.toLocaleString("id-ID")}`;

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
        {items.length > 0 ? (
          <div className="col-span-12 sm:col-span-1 lg:col-span-3 min-w-0 h-full">
            <DoughnutChart
              title="Akumulasi Pendapatan HMW"
              total={`Rp ${totalRevenue.toLocaleString("id-ID")}`}
              labels={items.map((item) => item.branch_name)}
              data={items.map((item) => item.revenue)}
              backgroundColors={[
                "#f9a825",
                "#00bcd4",
                "#7c4dff",
                "#607d8b",
                "#4caf50",
                "#9c27b0",
                "#795548",
                "#ff5722",
                "#8bc34a",
                "#3f51b5",
              ].slice(0, items.length)}
            />
          </div>
        ) : (
          <div className="col-span-12 sm:col-span-1 lg:col-span-3 flex items-center justify-center h-full text-gray-400">
            Tidak ada data revenue
          </div>
        )}

        {/* Achievement Ring */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-2 min-w-0 h-full">
          <AchievementRingContainer />
        </div>

        {/* 3 Chart */}
        <div className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 min-w-0 h-full">
          <BarChart
            title="LHR vs Prognosa"
            labels={chartData.lhr["1"].labels}
            datasets={chartData.lhr["1"].series}
          />
          <BarChart
            title="LHR vs Business Plan"
            labels={chartData.lhr["2"].labels}
            datasets={chartData.lhr["2"].series}
          />
          <BarChart
            title="LHR vs RKAP"
            labels={chartData.lhr["3"].labels}
            datasets={chartData.lhr["3"].series}
          />
        </div>
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-12 gap-4">
        {/* Info Panels */}
        <div className="col-span-2 flex flex-col">
          <SimplePanel
            title="Total Pendapatan Toll HMW (Internal)"
            dateRange={dateRange}
            value={formatCurrency(internalRevenue)}
          />
          <hr className=" border-white" />
          <SimplePanel
            title="Total Pendapatan Toll HMW (Integrasi"
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
            title="Pendapatan vs Prognosa"
            labels={chartData.revenue["1"].labels}
            datasets={chartData.revenue["1"].series}
          />
          <BarChart
            title="Pendapatan vs Business Plan"
            labels={chartData.revenue["2"].labels}
            datasets={chartData.revenue["2"].series}
          />
          <BarChart
            title="Pendapatan vs RKAP"
            labels={chartData.revenue["3"].labels}
            datasets={chartData.revenue["3"].series}
          />
        </div>
      </div>

      {/* ROW 3 - Card Panel */}
      <div className="grid grid-cols-6 gap-4">
        {items && items.length > 0 ? (
          items.map((item) => (
            <CardPanel
              key={item.branch_name}
              title={item.branch_name}
              value={item.revenue}
              percentage={0}
              location={item.branch_name}
              dateRange={`${startDate} / ${endDate}`}
            />
          ))
        ) : (
          <div className="col-span-6 text-center text-sm text-gray-400">
            Tidak ada data revenue yang tersedia.
          </div>
        )}
      </div>
    </div>
  );
};

export default TransactionOverview;
