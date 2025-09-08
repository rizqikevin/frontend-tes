import React, { useState, useEffect } from "react";
import { useUserMenuStore } from "@/stores/useUserMenu";
import { toast } from "sonner";

interface Props {
  isEdit?: boolean;
  userMenu?: any;
  onClose: () => void;
}

const UserModal: React.FC<Props> = ({ isEdit = false, userMenu, onClose }) => {
  const addUserMenu = useUserMenuStore((state) => state.addUserMenu);
  const updateUserMenu = useUserMenuStore((state) => state.updateUserMenu);

  const [form, setForm] = useState({
    id: 0,
    method: "",
    path: "",
    user_level: "",
  });

  useEffect(() => {
    if (isEdit && userMenu) {
      setForm({
        id: userMenu.id,
        method: userMenu.method,
        path: userMenu.path,
        user_level: userMenu.user_level,
      });
    }
  }, [isEdit, userMenu]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  const handleSave = async () => {
    if (!form.method || !form.user_level || !form.path)
      return toast.error("Please fill in required fields");

    const payload = {
      method: form.method,
      path: form.path,
      user_level_id: form.user_level,
    };

    try {
      if (isEdit) {
        await updateUserMenu(userMenu.id, payload as any);
        toast.success("User updated!");
      } else {
        await addUserMenu(payload as any);
        toast.success("User created!");
      }
      onClose();
    } catch (err) {
      toast.error("Failed to save user");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dashboard-accent  rounded p-6 w-[400px] space-y-4">
        <h2 className="text-white text-xl font-semibold">
          {isEdit ? "Edit" : "Add"} User Menu
        </h2>

        <select
          className="w-full p-2 rounded bg-dashboard-accent border border-white text-white"
          name="method"
          value={form.method}
          onChange={handleChange}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
          <option value="PATCH">PATCH</option>
          <option value="OPTIONS">OPTIONS</option>
        </select>

        <select
          name="user_level"
          value={form.user_level}
          onChange={handleChange}
          className="w-full p-2 rounded bg-dashboard-accent border border-white text-white"
        >
          <option value={1}>Administrator</option>
          <option value={2}>User</option>
          <option value={4}>Support</option>
        </select>

        <input
          className="w-full p-2 rounded  bg-dashboard-accent border border-white text-white"
          placeholder="Path"
          name="path"
          value={form.path}
          onChange={handleChange}
        />
        <div className="flex justify-end gap-2">
          <button
            onClick={onClose}
            className="bg-red-600 px-4 py-2 rounded text-white"
          >
            Close
          </button>
          <button
            onClick={handleSave}
            className="bg-blue-600 px-4 py-2 rounded text-white"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserModal;
