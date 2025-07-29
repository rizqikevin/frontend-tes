import React from "react";

interface CctvCardProps {
  date: string;
  active: number;
  nonActive: number;
  title?: string;
  description?: string;
}

const CctvCard: React.FC<CctvCardProps> = ({
  date,
  active,
  nonActive,
  title,
  description,
}) => {
  return (
    <div className="bg-dashboard-accent text-white rounded-lg p-4 w-full  shadow-md">
      {/* Header */}
      <div className="flex justify-between items-center mb-1">
        <div>
          <h3 className="text-sm font-semibold">{title}</h3>
          <p className="text-xs text-gray-400">{description}</p>
        </div>
        <span className="text-xs text-gray-400">{date}</span>
      </div>

      {/* Divider */}
      <hr className="border-gray-600 my-2" />

      {/* Content */}
      <div className="flex justify-between text-sm mt-4">
        <div className="text-center flex-1">
          <div className="text-gray-400">Active</div>
          <div className="font-bold">{active} Units</div>
        </div>
        <div className="border-l border-gray-600 mx-4 h-full" />
        <div className="text-center flex-1">
          <div className="text-gray-400">Non-Active</div>
          <div className="font-bold">{nonActive} Units</div>
        </div>
      </div>
    </div>
  );
};

export default CctvCard;
