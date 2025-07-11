import React from "react";

interface Item {
  name: string;
  value: string;
}

interface OtherRevenueListProps {
  data: Item[];
}

export const OtherRevenueList: React.FC<OtherRevenueListProps> = ({ data }) => {
  return (
    <div className="bg-[#2b2b2b] p-4 rounded-lg h-full">
      <h3 className="text-sm font-semibold mb-2">
        Pendapatan HMW di ruas lain
      </h3>
      <ul className="text-sm space-y-1">
        {data.map((item, index) => (
          <li key={index} className="flex justify-between">
            <span>{item.name}</span>
            <span className="text-gray-300">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
