import React from "react";

interface SimplePanelProps {
  title: string;
  value: string;
  title2?: string;
  value2?: string;
  title3?: string;
  value3?: string;
}

export const SimplePanel: React.FC<SimplePanelProps> = ({
  title,
  value,
  title2,
  value2,
  title3,
  value3,
}) => {
  return (
    <div className="bg-dashboard-accent p-4  h-full w-full text-white shadow-sm flex flex-col justify-start ">
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold mt-1 mb-2">{value}</p>
        <hr className=" border-gray-500 mb-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title2}</h3>
        <p className="text-2xl font-bold mt-1 mb-2">{value2}</p>
        <hr className=" border-gray-500 mb-4" />
      </div>

      <div>
        <h3 className="text-sm font-semibold">{title3}</h3>
        <p className="text-2xl font-bold ">{value3}</p>
      </div>
    </div>
  );
};
