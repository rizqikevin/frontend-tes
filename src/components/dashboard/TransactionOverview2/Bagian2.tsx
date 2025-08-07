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
import { useSettlementStore } from "@/stores/useSettlementAchievementStore";

export const Bagian2 = () => {
  const {
    items,
    fetchRevenue,
    externalRevenueTotal,
    internalRevenue,
    externalItems,
  } = useRevenueStore();
  const { transactionOverview, fetchTransactionOverview } =
    useTransactionOverviewStore();
  const { start_date, end_date } = useDateFilterStore();
  const { chartData, fetchChartData } = useTransactionChartStore();
  const { daily, fetchAchievement } = useTransactionStore();
  const { data, fetchData } = useSettlementStore();

  const rkapPercent = daily.rkapPercent;
  const mappedTarget = [
    ...daily.otherTargets.map((item) => ({
      label: item.target_name,
      value: parseFloat(item.percent),
    })),
  ];

  // console.log(transactionAchievement);

  useEffect(() => {
    const fetchAll = async () => {
      await fetchRevenue();
      await fetchAchievement("daily");
      await fetchData();
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

  const settlementPercent = data?.persentase ?? 0;
  // console.log(settlementPercent);

  const colors = ["#FF9800", "#2196F3", "#4CAF50", "#FF69B4", "#8BC34A"];

  return (
    <div className="bg-dashboard-dark min-h-screen p-4 text-white space-y-4">
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

export default Bagian2;
