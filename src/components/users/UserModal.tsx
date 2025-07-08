import React, { useState, useEffect } from "react";
import { useUserStore } from "@/stores/useUserStore";
import { toast } from "sonner";

interface Props {
  isEdit?: boolean;
  user?: any;
  onClose: () => void;
}

const UserModal: React.FC<Props> = ({ isEdit = false, user, onClose }) => {
  const { addUser, updateUser } = useUserStore();

  const [form, setForm] = useState({
    name: "",
    level_id: 2,
    status: true,
    username: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (isEdit && user) {
      setForm({
        name: user.name,
        level_id: user.level_id,
        status: user.status,
        username: user.username,
        password: "",
        confirmPassword: "",
      });
    }
  }, [isEdit, user]);

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
    if (!form.name || !form.username)
      return toast.error("Please fill in required fields");
    if (!isEdit && form.password !== form.confirmPassword)
      return toast.error("Passwords do not match");

    try {
      if (isEdit && user?.id) {
        await updateUser(user.id, form);
        toast.success("User updated!");
      } else {
        await addUser(form);
        toast.success("User created!");
      }
      onClose();
    } catch (err) {
      toast.error("Failed to save user");
    }
  };

  return (
    <div className="fixed inset-0 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-dashboard-accent  rounded p-6 w-[400px] space-y-4">
        <h2 className="text-white text-xl font-semibold">
          {isEdit ? "Edit" : "Add"} User
        </h2>

        <input
          className="w-full p-2 rounded bg-dashboard-accent border border-white text-white"
          placeholder="Name"
          name="name"
          value={form.name}
          onChange={handleChange}
        />

        <select
          name="level_id"
          value={form.level_id}
          onChange={handleChange}
          className="w-full p-2 rounded bg-dashboard-accent border border-white text-white"
        >
          <option value={1}>Administrator</option>
          <option value={2}>User</option>
          <option value={3}>Support</option>
        </select>

        <select
          name="status"
          value={String(form.status)}
          onChange={(e) =>
            setForm((f) => ({ ...f, status: e.target.value === "true" }))
          }
          className="w-full p-2 rounded bg-dashboard-accent border border-white text-white"
        >
          <option value="true">Active</option>
          <option value="false">Non-Active</option>
        </select>

        <input
          className="w-full p-2 rounded  bg-dashboard-accent border border-white text-white"
          placeholder="Username"
          name="username"
          value={form.username}
          onChange={handleChange}
        />

        <input
          className="w-full p-2 rounded bg-dashboard-accent border border-white text-white"
          type="password"
          placeholder="Password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <input
          className="w-full p-2 rounded  bg-dashboard-accent border border-white text-white"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          value={form.confirmPassword}
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
