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
    <div className="bg-dashboard-accent p-4 w-full text-white shadow-sm flex flex-col justify-start">
      <h3 className="text-sm text-gray-300 mb-2">Detail</h3>
      <ul className="text-sm space-y-3">
        {data.map((item, index) => (
          <li key={index} className="flex text-sm font-bold justify-between">
            <span>{item.name}</span>
            <span className="text-gray-300">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};
