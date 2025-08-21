import React from "react";
import LineChart from "./LineChart";
import DistribusiBebanChart from "./DistribusiBebanChart";
const Beban: React.FC = () => {
  return (
    <div className="flex flex-col gap-4 h-full ">
      <LineChart />
      <DistribusiBebanChart />
    </div>
  );
};

export default Beban;
