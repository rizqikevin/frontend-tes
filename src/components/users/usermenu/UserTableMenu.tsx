import React, { useEffect, useState } from "react";
import { useUserMenuStore } from "@/stores/useUserMenu";
import UserModal from "./UserModalMenu";
import { Pencil, Trash2, Plus } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const UserTable: React.FC = () => {
  const {
    userMenu,
    page,
    limit,
    total,
    loading,
    error,
    setPage,
    setLimit,
    fetchUserMenu,
    deleteUserMenu,
    updateUserMenu,
  } = useUserMenuStore();

  const [selectedUserMenu, setSelectedUserMenu] = useState<any | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [filterUserLevel, setFilterUserLevel] = useState<string>("");
  const [filterMethod, setFilterMethod] = useState<string>("");

  console.log("User Menu:", userMenu);

  useEffect(() => {
    fetchUserMenu({ method: filterMethod, user_level_id: filterUserLevel });
  }, [page, limit, filterMethod, filterUserLevel, fetchUserMenu]);

  const handleEdit = (user: any) => {
    setSelectedUserMenu(user);
    setIsEdit(true);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserMenu(id);
      } catch (error) {}
    }
  };

  const openAddModal = () => {
    setSelectedUserMenu(null);
    setIsEdit(false);
    setShowModal(true);
  };

  const totalPages = Math.ceil(total / limit);

  const userLevels = ["1", "2", "4"];
  const methods = ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"];

  const handleToggle = async (id: number) => {
    const user = userMenu.find((u) => u.id === id);
    if (!user) return;

    const isCurrentlyOff = user.path.endsWith("/off");
    const newPath = isCurrentlyOff
      ? user.path.slice(0, -4)
      : `${user.path}/off`;

    await updateUserMenu(id, {
      ...user,
      path: newPath,
    });
  };

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
              <th className="px-4 py-3">
                Method
                <select
                  value={filterMethod}
                  onChange={(e) => setFilterMethod(e.target.value)}
                  className="bg-[#0d2e52] border border-gray-600 rounded px-2 py-1 w-full mt-1 text-xs"
                >
                  <option value="">All</option>
                  {methods.map((method) => (
                    <option key={method} value={method}>
                      {method}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-3">Path</th>
              <th className="px-4 py-3">
                User Level
                <select
                  value={filterUserLevel}
                  onChange={(e) => setFilterUserLevel(e.target.value)}
                  className="bg-[#0d2e52] border border-gray-600 rounded px-2 py-1 w-full mt-1 text-xs"
                >
                  <option value="">All</option>
                  {userLevels.map((level) => (
                    <option key={level} value={level}>
                      {level === "1"
                        ? "Administrator"
                        : level === "2"
                        ? "Direksi"
                        : "Support"}
                    </option>
                  ))}
                </select>
              </th>
              <th className="px-4 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  Loading...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-red-400">
                  Error: {error}
                </td>
              </tr>
            ) : userMenu.length === 0 ? (
              <tr>
                <td colSpan={6} className="px-4 py-6 text-center text-gray-400">
                  No data found.
                </td>
              </tr>
            ) : (
              userMenu.map((user, index) => (
                <tr
                  key={user.id}
                  className="border-t border-gray-700 hover:bg-gray-800 text-base"
                >
                  <td className="px-4 py-2">
                    {(page - 1) * limit + index + 1}
                  </td>
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
                    <Switch
                      checked={!user.path.endsWith("/off")}
                      onCheckedChange={() => handleToggle(user.id)}
                    />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
        {/* Pagination */}
        <div className="flex justify-end items-center mt-4 text-sm p-2">
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
              <option value="100">100</option>
            </select>
          </div>

          <div className="flex items-center ml-5">
            <span className="mr-4">
              {total > 0 ? (page - 1) * limit + 1 : 0} -{" "}
              {Math.min(page * limit, total)} of {total}
            </span>
            <div className="inline-flex">
              <button
                className="px-2 py-1 disabled:opacity-50"
                onClick={() => setPage(page - 1)}
                disabled={page === 1}
              >
                &lt;
              </button>
              <button
                className="px-2 py-1 disabled:opacity-50"
                onClick={() => setPage(page + 1)}
                disabled={page === totalPages || totalPages === 0}
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
