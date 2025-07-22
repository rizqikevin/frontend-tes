import { CardPanel } from "./CardPanel";
import BarChart from "./BarChart";
import { DoughnutChart } from "./DoughnutChart";
import { SimplePanel } from "./SimplePanel";
import { OtherRevenueList } from "./OtherRevenueList";
import { AchievementRingContainer } from "./AchievementCard/AchievementRingContainer";
import { useRevenueStore } from "@/stores/useRevenueStore";
import { useEffect } from "react";
import { useTransactionChartStore } from "@/stores/useTransactionChartStore ";
import { useTransactionOverviewStore } from "@/stores/useTransactionOverviewStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { useTransactionStore } from "@/stores/useTransactionStore";

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
    fetchRevenue,
    externalRevenueTotal,
    internalRevenue,
    externalItems,
    totalRevenue,
  } = useRevenueStore();
  const { transactionOverview, fetchTransactionOverview, isDataLoading } =
    useTransactionOverviewStore();
  const { start_date, end_date } = useDateFilterStore();
  const { chartData, fetchChartData } = useTransactionChartStore();
  const { rkapPercent, otherTargets } = useTransactionStore();

  // console.log(totalRevenue);

  // console.log(transactionOverview);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchRevenue();
      await fetchTransactionOverview();
      await fetchChartData("lhr", "1");
      await fetchChartData("lhr", "2");
      await fetchChartData("lhr", "3");
      await fetchChartData("revenue", "1");
      await fetchChartData("revenue", "2");
      await fetchChartData("revenue", "3");
    };

    fetchAll();
  }, [start_date, end_date]);

  const formatCurrency = (value: number) =>
    `Rp ${value.toLocaleString("id-ID")}`;

  const dateRange = `${start_date} / ${end_date}`;

  const otherRevenueData = externalItems.map((item) => ({
    name: item.branch_name,
    value: `Rp ${item.revenue.toLocaleString("id-ID")}`,
  }));

  const mappedTarget = otherTargets.map((target) => {
    return {
      label: target.target_name,
      value: target.percent,
    };
  });

  const colors = ["#FF9800", "#2196F3", "#4CAF50", "#FF69B4", "#8BC34A"];

  console.log(mappedTarget);

  return (
    <div className="bg-dashboard-dark min-h-screen p-4 text-white space-y-4">
      {/* ROW 1 */}
      <div className="grid grid-cols-12 gap-4 items-start">
        {/* Doughnut Chart */}
        {items.length > 0 ? (
          <div className="col-span-12 sm:col-span-1 lg:col-span-3 min-w-0 h-full">
            <DoughnutChart
              title="Daily"
              total={`${rkapPercent.toFixed(2)}`}
              labels={transactionOverview.map((item) => item.name)}
              data={transactionOverview.map((item) => item.pendapatan)}
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
                "#ffeb3b",
                "#f44336",
                "#c2185b",
              ].slice(0, transactionOverview.length)}
              bars={[
                ...mappedTarget.map((target, index) => ({
                  label: target.label,
                  value: target.value,
                  color: colors[index % colors.length],
                })),
                { label: "RKAP", value: rkapPercent, color: "#4CAF50" },
                { label: "Settlement", value: 80, color: "#9C27B0" },
              ]}
            />
          </div>
        ) : (
          <div className="col-span-12 sm:col-span-1 lg:col-span-3 flex items-center justify-center h-full text-gray-400">
            Tidak ada data revenue
          </div>
        )}

        {/* Achievement Ring */}
        <div className="col-span-12 sm:col-span-4 lg:col-span-3 min-w-0 h-full">
          <div className="col-span-1 flex flex-col h-full">
            <SimplePanel
              title="Total Pendapatan Toll HMW "
              dateRange={dateRange}
              value={formatCurrency(internalRevenue + externalRevenueTotal)}
              title2="Pendapatan Internal"
              value2={formatCurrency(internalRevenue)}
              title3="Pendapatan Integrasi"
              value3={formatCurrency(externalRevenueTotal)}
            />
            <OtherRevenueList data={otherRevenueData} />

            {/* <SimplePanel
              title="Total Pendapatan Toll HMW (Integrasi)"
              dateRange={dateRange}
              value={formatCurrency(externalRevenueTotal)}
            /> */}
          </div>
        </div>

        {/* 3 Chart */}
        <div className="col-span-12 lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4 min-w-0 h-full">
          <div className="h-full bg-dashboard-accent p-1 rounded-lg">
            <AchievementRingContainer
              color="#FF9800"
              title="Pencapaian Bulan Juli"
              frequensi="monthly"
            />
          </div>
          <AchievementRingContainer
            color="#4169e1"
            title="Pencapaian Tahun 2025"
            frequensi="yearly"
          />
        </div>
      </div>

      {/* ROW 2 */}
      <div className="grid grid-cols-12 gap-4">
        {/* 3 Chart */}
        <div className="col-span-12 grid grid-cols-3 gap-4">
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

      <div className="col-span-12 grid grid-cols-3 gap-4">
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

      {/* ROW 3 - Card Panel */}
      <div className="grid grid-cols-7 gap-4">
        {transactionOverview && transactionOverview.length > 0 ? (
          transactionOverview.map((item) => (
            <CardPanel
              key={item.gate_code}
              title={item.name}
              value={item.pendapatan}
              percentage={0}
              location={item.name}
              dateRange={`${start_date} / ${end_date}`}
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
