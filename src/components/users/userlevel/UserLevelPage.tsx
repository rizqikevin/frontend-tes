import { useEffect, useState } from "react";
import { useUserLevelStore } from "@/stores/useUserLevelStore";
import UserLevelTable from "./UserLevelTable";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import Swal from "sweetalert2";

const UserLevelPage = () => {
  const { fetchLevels, addLevel, updateLevel, deleteLevel } =
    useUserLevelStore();

  const [form, setForm] = useState<{ id: number | ""; name: string }>({
    id: "",
    name: "",
  });

  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchLevels();
  }, []);

  const handleSubmit = () => {
    if (form.id === "" || !form.name.trim()) {
      return toast.error("ID and Name are required");
    }

    if (isEdit) {
      updateLevel(form.id, { name: form.name });
      toast.success("Level updated!");
    } else {
      addLevel({ id: form.id, name: form.name });
      toast.success("Level added!");
    }

    setForm({ id: "", name: "" });
    setIsEdit(false);
  };

  const handleEdit = (id: number, name: string) => {
    setForm({ id, name });
    setIsEdit(true);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteLevel(id);
        toast.success("Level deleted!");
      }
    });
  };

  return (
    <div className="bg-dashboard-dark p-6 text-white space-y-4 rounded-lg">
      <h2 className="text-xl font-bold">Manage User Levels</h2>
      <div className="flex gap-2">
        <Input
          type="number"
          value={form.id}
          className="w-32 bg-dashboard-accent text-white"
          onChange={(e) => {
            const value = parseInt(e.target.value);
            if (value >= 0 || isNaN(value)) {
              setForm({ ...form, id: value || "" });
            }
          }}
          disabled={isEdit}
        />

        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Enter level name"
          className="flex-1 bg-dashboard-accent text-white"
        />

        <Button className="bg-blue-500" onClick={handleSubmit}>
          {isEdit ? "Update" : "Add"}
        </Button>
        {isEdit && (
          <Button
            variant="ghost"
            className="bg-red-500"
            onClick={() => {
              setIsEdit(false);
              setForm({ id: form.id, name: "" });
            }}
          >
            Cancel
          </Button>
        )}
      </div>

      <div className="bg-dashboard-accent p-4 rounded-md overflow-auto">
        <UserLevelTable onEdit={handleEdit} onDelete={handleDelete} />
      </div>
    </div>
  );
};

export default UserLevelPage;
