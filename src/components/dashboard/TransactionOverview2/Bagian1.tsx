import { CardPanel } from "./CardPanel";
import BarChart from "./BarChart";
import { DoughnutChart } from "./DoughnutChart";
import { SimplePanel } from "./SimplePanel";
import { OtherRevenueList } from "./OtherRevenueList";
import { AchievementRingContainer } from "./AchievementCard/AchievementRingContainer";
import { useRevenueStore } from "@/stores/useRevenueStore";
import { useEffect, useState } from "react";
import { useTransactionChartStore } from "@/stores/useTransactionChartStore ";
import { useTransactionOverviewStore } from "@/stores/useTransactionOverviewStore";
import { useDateFilterStore } from "@/stores/useDateFilterStore";
import { useTransactionStore } from "@/stores/useTransactionStore";
import { useSettlementStore } from "@/stores/useSettlementAchievementStore";
import { AchievementProgressBar } from "./AchievementCard/AchievementProgressBar";
import { Button } from "@/components/ui/button";
export const Bagian1 = ({
  selectedTab,
  setSelectedTab,
}: {
  selectedTab: "bagian1" | "bagian2";
  setSelectedTab: (tab: "bagian1" | "bagian2") => void;
}) => {
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

  const settlementPercent = data?.persentase_fs_rfs ?? 0;
  // console.log(settlementPercent);

  const colors = ["#FF9800", "#2196F3", "#4CAF50", "#FF69B4", "#8BC34A"];

  return (
    <div className="bg-dashboard-dark min-h-screen p-4 text-white space-y-4">
      {/* ROW 1 */}
      <div className="grid grid-cols-12 h-full">
        <div className="col-span-9">
          <div className=" bg-dashboard-accent shadow-md p-4 h-full grid grid-cols-12">
            {/* Doughnut Chart */}
            <div className="col-span-8">
              <DoughnutChart
                title="Daily"
                total={`RKAP ${rkapPercent.toFixed(2)}`}
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
                  {
                    label: "Settlement",
                    value: settlementPercent,
                    color: "#9C27B0",
                  },
                ]}
              />
              <div className="relative right-10 bottom-24 flex justify-end">
                <Button
                  className="w-full max-w-48"
                  variant="default"
                  onClick={() => {
                    setSelectedTab("bagian2");
                  }}
                >
                  Selanjutnya
                </Button>
              </div>
            </div>

            {/* Panel */}
            <div className="col-span-4 flex flex-col justify-between border-l-2 border-r-2 border-gray-500">
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
            </div>
          </div>
        </div>

        {/* Achievement Rings sebelah kanan */}
        <div className="col-span-3">
          <div className="h-full bg-dashboard-accent shadow-md">
            <AchievementRingContainer
              color="#4169e4"
              title="Achievement LHR"
              freq="daily"
            />
          </div>
        </div>

        {/* </div> */}
      </div>
      {/* ROW 2 */}
      <div className="grid grid-cols-12 gap-4">
        <div className="col-span-6 gap-4 bg-dashboard-accent shadow-md rounded-lg">
          <AchievementProgressBar
            color="#4169e4"
            title="Pencapaian Bulan Juli"
            freq="monthly"
          />
        </div>
        <div className="col-span-6 gap-4 bg-dashboard-accent shadow-md rounded-lg">
          <AchievementProgressBar
            color="#4169e4"
            title="Pencapaian Tahun 2025"
            freq="yearly"
          />
        </div>
      </div>
      <div className="grid grid-cols-12 gap-4">
        {/* 3 Chart */}
        <div className="col-span-12 grid grid-cols-3 gap-4">
          {/* <BarChart
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
          /> */}
        </div>
      </div>
      <div className="col-span-12 grid grid-cols-3 gap-4">
        {/* <BarChart
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
        /> */}
      </div>
      {/* ROW 3 - Card Panel */}
      <div className="grid grid-cols-7 gap-4">
        {/* {transactionOverview && transactionOverview.length > 0 ? (
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
        )} */}
      </div>
    </div>
  );
};

export default Bagian1;
