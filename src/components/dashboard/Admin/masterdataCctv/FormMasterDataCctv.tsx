import { useState, useEffect } from "react";
import { Button } from "../../../ui/button";
import { AddCctvModal } from "./AddCctvModal";
import api from "@/services/api";
import { toast } from "sonner";
import { EditCctvModal } from "./EditCctvModal";

export interface Cctv {
  id: number;
  group_id: number;
  name: string;
  url: string;
  url_local: string;
  latitude: string;
  longitude: string;
  description: string;
  status_id: number;
  datecreated: string;
  dateupdated: string;
  updatedby: string;
}

export const FormMasterDataCctv: React.FC = () => {
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [cctv, setCctv] = useState<Cctv[]>([]);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedCctv, setSelectedCctv] = useState<Cctv | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const fetchCctv = async () => {
    try {
      const response = await api.get("/cctv/all");
      setCctv(response.data);
    } catch (error) {
      toast.error("Error fetching cctv:", {
        description: error.message,
      });
    }
  };

  useEffect(() => {
    fetchCctv();
  }, []);

  const handleSuccess = () => {
    fetchCctv();
    setAddModalOpen(false);
    setEditModalOpen(false);
    toast.success("CCTV data has been successfully updated.");
  };

  // Pagination logic
  const lastItemIndex = currentPage * itemsPerPage;
  const firstItemIndex = lastItemIndex - itemsPerPage;
  const currentItems = cctv.slice(firstItemIndex, lastItemIndex);
  const totalPages = Math.ceil(cctv.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="bg-dashboard-accent text-white rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-lg font-semibold">Master Data CCTV</h2>
          <p className="text-sm text-gray-400">Daftar CCTV</p>
        </div>
        <Button
          onClick={() => setAddModalOpen(true)}
          className="bg-white text-black hover:bg-gray-200"
        >
          Add CCTV
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left text-white border-separate border-spacing-y-2">
          <thead className="text-xs text-gray-300 uppercase">
            <tr>
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">ID</th>
              <th className="px-4 py-2">Group ID</th>
              <th className="px-4 py-2">Nama Kamera</th>
              <th className="px-4 py-2">Url</th>
              <th className="px-4 py-2">Url Local</th>
              <th className="px-4 py-2">Latitude</th>
              <th className="px-4 py-2">Longitude</th>
              <th className="px-4 py-2">Deskripsi</th>
              <th className="px-4 py-2">Dibuat</th>
              <th className="px-4 py-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={item.id} className="bg-[#2a2a2a] rounded-md">
                <td className="px-4 py-2">
                  {(firstItemIndex + index + 1).toString().padStart(2, "0")}
                </td>
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.group_id}</td>
                <td className="px-4 py-2">{item.name}</td>
                <td className="px-4 py-2">{item.url}</td>
                <td className="px-4 py-2">{item.url_local}</td>
                <td className="px-4 py-2">{item.latitude}</td>
                <td className="px-4 py-2">{item.longitude}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.updatedby}</td>
                <td className="px-4 py-2">
                  <div className="flex space-x-2">
                    <Button
                      onClick={() => {
                        setSelectedCctv(item);
                        setEditModalOpen(true);
                      }}
                      className="bg-blue-500 w-16 text-white hover:bg-blue-600"
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => {
                        if (
                          window.confirm(
                            "Are you sure you want to delete this CCTV?"
                          )
                        ) {
                          api
                            .delete(`/cctv/${item.id}`)
                            .then(() => {
                              toast.success("CCTV deleted successfully.");
                              fetchCctv();
                            })
                            .catch((error) => {
                              toast.error("Error deleting CCTV:", {
                                description: error.message,
                              });
                            });
                        }
                      }}
                      className="bg-red-500 w-16 text-white hover:bg-red-600"
                    >
                      Delete
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center mt-4">
        <div>
          <span className="text-sm text-gray-400">
            Showing {firstItemIndex + 1} to{" "}
            {Math.min(lastItemIndex, cctv.length)} of {cctv.length} entries
          </span>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="px-2 py-1 rounded bg-[#2a2a2a] text-white text-sm"
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={20}>20 per page</option>
            <option value={50}>50 per page</option>
          </select>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-2 py-1"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M12.5 15L7.5 10L12.5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <span className="text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-2 py-1"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path
                d="M7.5 15L12.5 10L7.5 5"
                stroke="white"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
      <AddCctvModal
        isOpen={addModalOpen}
        onClose={() => setAddModalOpen(false)}
        onSuccess={handleSuccess}
      />
      {selectedCctv && (
        <EditCctvModal
          isOpen={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          cctv={selectedCctv}
          onSuccess={handleSuccess}
        />
      )}
    </div>
  );
};
