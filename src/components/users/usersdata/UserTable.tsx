import React, { useEffect, useState } from "react";
import { useUserStore } from "@/stores/useUserStore";
import UserModal from "./UserModal";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const UserTable: React.FC = () => {
  const { users, fetchUsers, deleteUser, loading } = useUserStore();
  const [selectedUser, setSelectedUser] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleEdit = (user: any) => {
    setSelectedUser(user);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUser(id);
      toast.success("User deleted");
    }
  };

  const openAddModal = () => {
    setSelectedUser(null);
    setIsEdit(false);
    setShowModal(true);
  };

  return (
    <div className="p-5 bg-dashboard-accent text-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Data Users</h2>
        <button
          onClick={openAddModal}
          className="bg-green-600 px-4 py-2 rounded text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add User
        </button>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700 text-sm">
          <thead>
            <tr className=" text-left bg-[#0d2e52] text-base">
              <th className="px-4 py-3">#</th>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Level</th>
              <th className="px-4 py-3">Username</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Visit</th>
              <th className="px-4 py-3">Last Visit</th>
              <th className="px-4 py-3">Date Created</th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-gray-400">
                  Loading users...
                </td>
              </tr>
            ) : (
              users.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-700 hover:bg-gray-800 text-base"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.name}</td>
                  <td className="px-4 py-2">
                    {user.level_id === 1
                      ? "Administrator"
                      : user.level_id === 2
                      ? "User"
                      : "Support"}
                  </td>
                  <td className="px-4 py-2">{user.username}</td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 rounded text-xs font-medium ${
                        user.status
                          ? "bg-green-700 text-white"
                          : "bg-red-600 text-white"
                      }`}
                    >
                      {user.status ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="px-4 py-2">{user.visit}</td>
                  <td className="px-4 py-2">
                    {new Date(user.last_visit).toLocaleString("sv-SE")}
                  </td>
                  <td className="px-4 py-2">
                    {new Date(user.datecreated).toLocaleString("sv-SE")}
                  </td>
                  <td className="px-4 py-2 flex gap-2">
                    <button
                      onClick={() => handleEdit(user)}
                      className="text-blue-400 hover:text-blue-600"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(user.id)}
                      className="text-red-400 hover:text-red-600"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showModal && (
        <UserModal
          isEdit={isEdit}
          user={selectedUser}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UserTable;
