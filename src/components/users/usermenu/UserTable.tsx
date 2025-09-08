import React, { useEffect, useState } from "react";
import { useUserMenuStore } from "@/stores/useUserMenu";
import UserModal from "./UserModal";
import { Pencil, Trash2, Plus } from "lucide-react";
import { toast } from "sonner";

const UserTable: React.FC = () => {
  const userMenu = useUserMenuStore((state) => state.userMenu);
  const page = useUserMenuStore((state) => state.page);
  const limit = useUserMenuStore((state) => state.limit);
  const setPage = useUserMenuStore((state) => state.setPage);
  const setLimit = useUserMenuStore((state) => state.setLimit);
  const fetchUserMenu = useUserMenuStore((state) => state.fetchUserMenu);
  const deleteUserMenu = useUserMenuStore((state) => state.deleteUserMenu);
  const loading = useUserMenuStore((state) => state.loading);
  const [selectedUserMenu, setSelectedUserMenu] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);

  useEffect(() => {
    fetchUserMenu();
  }, [page, limit]);

  const handleEdit = (user: any) => {
    setSelectedUserMenu(user);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      await deleteUserMenu(id);
      toast.success("User deleted");
    }
  };

  const openAddModal = () => {
    setSelectedUserMenu(null);
    setIsEdit(false);
    setShowModal(true);
  };

  const total = userMenu.reduce((sum, val) => sum + val.id, 0);
  const totalPages = Math.ceil(total / limit);

  return (
    <div className="p-5 bg-dashboard-accent text-white rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Data Users Menu</h2>
        <button
          onClick={openAddModal}
          className="bg-green-600 px-4 py-2 rounded text-white flex items-center gap-2"
        >
          <Plus className="w-4 h-4" /> Add User Menu
        </button>
      </div>

      <div className="overflow-auto rounded-lg border border-gray-700">
        <table className="min-w-full divide-y divide-gray-700 text-sm">
          <thead>
            <tr className=" text-left bg-[#0d2e52] text-base">
              <th className="px-4 py-3">No</th>
              <th className="px-4 py-3">ID</th>
              <th className="px-4 py-3">Method</th>
              <th className="px-4 py-3">Path</th>
              <th className="px-4 py-3">User Level</th>

              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={9} className="px-4 py-6 text-center text-gray-400">
                  Loading usersMenu...
                </td>
              </tr>
            ) : (
              userMenu.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-700 hover:bg-gray-800 text-base"
                >
                  <td className="px-4 py-2">{index + 1}</td>
                  <td className="px-4 py-2">{user.id}</td>
                  <td className="px-4 py-2">{user.method}</td>

                  <td className="px-4 py-2">{user.path}</td>

                  <td className="px-4 py-2">{user.user_level}</td>
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
        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 text-sm">
          <div>
            Rows per page:
            <select
              className="ml-2 bg-transparent border border-gray-700 rounded px-2 py-1"
              value={limit}
              onChange={(e) => setLimit(Number(e.target.value))}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>

          <div className="flex items-center ml-5">
            <span className="mr-4">
              {Math.min((page - 1) * limit + 1, total)} -{" "}
              {Math.min(page * limit, total)} of {total}
            </span>
            <div className="inline-flex">
              <button
                className="px-2 py-1"
                onClick={() => setPage(Math.max(page - 1, 1))}
                disabled={page === 1}
              >
                &lt;
              </button>
              <button
                className="px-2 py-1"
                onClick={() => setPage(Math.min(page + 1, totalPages))}
                disabled={page === totalPages}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      </div>

      {showModal && (
        <UserModal
          isEdit={isEdit}
          userMenu={selectedUserMenu}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default UserTable;
