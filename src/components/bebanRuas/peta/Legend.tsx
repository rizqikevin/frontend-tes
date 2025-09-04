interface LegendProps {
  titleRed: string;
  titleBlue: string;
  titleWhite: string;
}

const Legend: React.FC<LegendProps> = ({ titleRed, titleBlue, titleWhite }) => {
  return (
    <div className="absolute bottom-4 left-[1%] top-3 p-3 rounded text-white  text-sm">
      <div className="flex items-center mb-1">
        <div className="w-16 h-7 bg-red-600 mr-2 " />
        <span className="text-lg">{titleRed}</span>
      </div>
      <div className="flex items-center mb-1">
        <div className="w-16 h-7 bg-blue-500 mr-2 " />
        <span className="text-lg">{titleBlue}</span>
      </div>
      <div className="flex items-center">
        <div className="w-16 h-7 bg-white mr-2" />
        <span className="text-lg">{titleWhite}</span>
      </div>
    </div>
  );
};

export default Legend;
