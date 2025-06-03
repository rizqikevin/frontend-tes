import { CardPanel } from "./CardPanel";
import BarChart from "./BarChart";
import { DoughnutChart } from "./DoughnutChart";
import { SummaryPanel } from "./SummaryPanel";

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
  const sampleBarData = [
    {
      label: "LHR",
      backgroundColor: "#42A5F5",
      data: [
        90_000, 85_000, 80_000, 70_000, 60_000, 55_000, 50_000, 48_000, 45_000,
        44_000, 42_000, 40_000,
      ],
    },
    {
      label: "Prognosa",
      backgroundColor: "#FFEB3B",
      data: [
        100_000, 95_000, 90_000, 88_000, 85_000, 80_000, 75_000, 72_000, 70_000,
        68_000, 65_000, 62_000,
      ],
    },
  ];

  return (
    <div className="bg-dashboard-dark min-h-screen p-6 text-white space-y-4 ">
      <div className="grid grid-cols-6 gap-4 mb-6">
        <CardPanel
          title="Kuala Tanjung"
          value={75500000}
          percentage={16.6}
          location="Kuala Tanjung"
          dateRange="01 Jan 2024 - 31 Des 2024"
        />
        <CardPanel
          title="Indrapura"
          value={75500000}
          percentage={16.6}
          location="Indrapura"
          dateRange="01 Jan 2024 - 31 Des 2024"
        />
        <CardPanel
          title="Tebing Tinggi"
          value={100500000}
          percentage={16.6}
          location="Tebing Tinggi"
          dateRange="01 Jan 2024 - 31 Des 2024"
        />
        <CardPanel
          title="Dolok Merawan"
          value={100500000}
          percentage={16.6}
          location="Tebing Tinggi"
          dateRange="01 Jan 2024 - 31 Des 2024"
        />
        <CardPanel
          title="Sinaksak"
          value={100500000}
          percentage={16.6}
          location="Sinaksak"
          dateRange="01 Jan 2024 - 31 Des 2024"
        />
        <CardPanel
          title="Simpang Panei"
          value={100500000}
          percentage={16.6}
          location="Simpang Panei"
          dateRange="01 Jan 2024 - 31 Des 2024"
        />
      </div>

      <div className="grid grid-cols-4 gap-4">
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
        <div className="grid grid-cols-1 gap-4">
          <SummaryPanel />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-4 ">
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
        <div className="bg-dashboard-accent p-4 rounded-lg text-white shadow-md w-auto flex justify-center items-center">
          <div className="grid grid-cols-1 gap-4">
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
                "#f9a825", // Orange
                "#00bcd4", // Cyan
                "#7c4dff", // Purple
                "#607d8b", // Blue Gray
                "#4caf50", // Green
                "#9c27b0", // Magenta
              ]}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionOverview;
