const Legend = () => {
  return (
    <div className="absolute bottom-4 left-[85%] bg-dashboard-accent bg-opacity-80 p-3 rounded text-white  text-sm shadow-md">
      <div className="flex items-center mb-1">
        <div className="w-5 h-5 bg-red-600 mr-2 border border-black" />
        Pencapaian BP/Real
      </div>
      <div className="flex items-center mb-1">
        <div className="w-5 h-5 bg-blue-500 mr-2 border border-black" />
        Bisnis Plan LHR
      </div>
      <div className="flex items-center">
        <div className="w-5 h-5 bg-white mr-2 border border-black" />
        Realisasi LHR
      </div>
    </div>
  );
};

export default Legend;
