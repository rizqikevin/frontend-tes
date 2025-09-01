type Props = {
  title: string;
  imageUrl: string;
};

export const ImageCard: React.FC<Props> = ({ title, imageUrl }) => {
  return (
    <div className="bg-dashboard-accent rounded-lg overflow-hidden shadow-sm">
      <p className="text-lg font-bold px-4 pt-3 pb-1">{title}</p>
      <img src={imageUrl} alt={title} className="w-full h-auto p-2" />
    </div>
  );
};
