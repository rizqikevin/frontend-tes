import { useUserLevelStore } from "@/stores/useUserLevelStore";
import { Pencil, Trash2 } from "lucide-react";

interface Props {
  onEdit: (id: number, name: string) => void;
  onDelete: (id: number) => void;
}

const UserLevelTable: React.FC<Props> = ({ onEdit, onDelete }) => {
  const { levels, loading } = useUserLevelStore();

  if (loading) return <p className="text-center">Loading...</p>;
  if (!levels.length)
    return <p className="text-center">No user levels found.</p>;

  return (
    <table className="w-full text-left text-lg">
      <thead>
        <tr className="bg-[#0d2e52] text-white">
          <th className="py-2 px-4 border">ID</th>
          <th className="py-2 px-4 border">Name</th>
          <th className="py-2 px-4 border text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {levels.map((level) => (
          <tr
            key={level.id}
            className="border-t border-gray-600 hover:bg-[#12305d]"
          >
            <td className="py-2 px-4 border">{level.id}</td>
            <td className="py-2 px-4 border">{level.name}</td>
            <td className="py-2 px-4 border text-center space-x-2">
              <button onClick={() => onEdit(level.id, level.name)}>
                <Pencil size={16} />
              </button>
              <button onClick={() => onDelete(level.id)}>
                <Trash2 size={16} className="text-red-400" />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default UserLevelTable;
