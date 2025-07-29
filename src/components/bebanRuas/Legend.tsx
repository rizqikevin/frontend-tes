const Legend = () => {
  return (
    <div className="absolute bottom-4 left-[1%] top-3 p-3 rounded text-white  text-sm shadow-md">
      <div className="flex items-center mb-1">
        <div className="w-16 h-7 bg-red-600 mr-2 border border-black" />
        <span className="text-lg">Pencapaian BP/Real</span>
      </div>
      <div className="flex items-center mb-1">
        <div className="w-16 h-7 bg-blue-500 mr-2 border border-black" />
        <span className="text-lg">Bisnis Plan LHR</span>
      </div>
      <div className="flex items-center">
        <div className="w-16 h-7 bg-white mr-2 border border-black" />
        <span className="text-lg">Realisasi LHR</span>
      </div>
    </div>
  );
};

export default Legend;
