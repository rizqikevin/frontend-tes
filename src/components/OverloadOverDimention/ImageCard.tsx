type Props = {
  title: string;
  imageUrl: string;
};

export const ImageCard: React.FC<Props> = ({ title, imageUrl }) => {
  return (
    <div className="bg-dashboard-accent rounded-lg overflow-hidden shadow-sm">
      <p className="text-sm font-semibold px-4 pt-3 pb-4">{title}</p>
      <img src={imageUrl} alt={title} className="w-full h-auto" />
    </div>
  );
};
