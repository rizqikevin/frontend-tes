import {
  DndContext,
  closestCenter,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DashboardSidebar from "@/components/DashboardSidebar";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useEffect, useState } from "react";
import api from "@/services/api";
import { useCameraStore } from "@/stores/useCameraStore";
import ReactPlayer from "react-player";

type CameraGroup = {
  id: number;
  name: string;
  description: string;
};

type Camera = {
  id: string;
  name: string;
  group_id: string;
  url_local: string;
  status_id?: number;
};

const DraggableCamera = ({ camera }: { camera: Camera }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: camera.id,
      data: camera,
    });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        opacity: isDragging ? 0.5 : 1,
      }}
      className="text-sm bg-zinc-700 text-white p-2 rounded shadow cursor-move"
    >
      {camera.name}
    </div>
  );
};

const DroppableGridSlot = ({
  id,
  camera,
  onDropCamera,
  onRemoveCamera,
}: {
  id: string;
  camera: Camera | null;
  onDropCamera: (index: number, camera: Camera) => void;
  onRemoveCamera: (index: number) => void;
}) => {
  const { setNodeRef, isOver } = useDroppable({ id });
  const index = parseInt(id);
  const SERVER_CAMERA = import.meta.env.VITE_CAMERA_SERVER;
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div
      ref={setNodeRef}
      className={`aspect-video border-2 transition-colors duration-200 ${
        isOver ? "border-green-400" : "border-zinc-700"
      } bg-black relative`}
    >
      {camera ? (
        <>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-10 bg-black/60">
              <img
                src="/icons/loading.png"
                alt="Loading"
                className="w-10 h-10 animate-spin"
              />
            </div>
          )}
          <div data-video-index={index}>
            <ReactPlayer
              key={camera.id}
              src={`${SERVER_CAMERA}/camera/bearer/jlp/${camera.group_id}/${camera.id}/index.m3u8`}
              playing
              muted
              width="100%"
              height="100%"
              onReady={() => setIsLoading(false)}
              onError={() => setIsLoading(false)}
            />
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs p-1 z-10">
            {camera.name}
          </div>
          <button
            onClick={() => onRemoveCamera(index)}
            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded z-10"
          >
            ✖
          </button>
        </>
      ) : (
        <div className="flex items-center justify-center h-full text-zinc-500 text-xs">
          Drop CCTV Here
        </div>
      )}
    </div>
  );
};

const CCTVList = () => {
  const [cameraGroups, setCameraGroups] = useState<CameraGroup[]>([]);
  const [selectedGroupId, setSelectedGroupId] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState<
    "active" | "inactive" | "maintenance"
  >("active");

  const { cameraList, fetchCameras, grid, setCameraAt, removeCameraAt } =
    useCameraStore();

  useEffect(() => {
    fetchCameras();
  }, []);

  useEffect(() => {
    const fetchGroups = async () => {
      const res = await api.get("/cctvgroup");
      if (res.data?.status === "success") {
        setCameraGroups(res.data.data);
      }
    };
    fetchGroups();
  }, []);

  const filteredCameras =
    selectedGroupId === null
      ? []
      : cameraList.filter((cam) => {
          const matchGroup = Number(cam.group_id) === selectedGroupId;
          const matchSearch = cam.name
            .toLowerCase()
            .includes(search.toLowerCase());

          return matchGroup && matchSearch;
        });

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && active.data.current) {
      const camera = active.data.current as Camera;
      const index = parseInt(over.id as string);
      setCameraAt(index, camera);
    }
  };

  return (
    <div className="flex h-screen bg-dashboard-dark text-white">
      <DashboardSidebar />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2 flex-1 p-4 ${
            isSidebarCollapsed ? "ml-16" : "ml-64"
          } transition-all duration-300`}
        >
          {grid.map((camera, i) => (
            <DroppableGridSlot
              key={i}
              id={i.toString()}
              camera={camera}
              onDropCamera={setCameraAt}
              onRemoveCamera={removeCameraAt}
            />
          ))}
        </div>

        <div className="w-[250px] bg-zinc-800 p-4 border-l border-zinc-700 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-lg mb-4">CCTV List</h2>

            <Select
              value={selectedStatus}
              onValueChange={(value) =>
                setSelectedStatus(
                  value as "active" | "inactive" | "maintenance"
                )
              }
            >
              <SelectTrigger className="w-full mb-4 bg-dashboard-accent">
                <SelectValue placeholder="Pilih Status" />
              </SelectTrigger>
              <SelectContent className="bg-dashboard-accent">
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>

            <div className="grid grid-cols-2 gap-2 mb-4">
              {cameraGroups.map((group) => (
                <Button
                  key={group.id}
                  variant={selectedGroupId === group.id ? "default" : "outline"}
                  onClick={() =>
                    setSelectedGroupId(
                      selectedGroupId === group.id ? null : group.id
                    )
                  }
                  className={`text-xs whitespace-normal h-auto py-2 bg-dashboard-accent ${
                    selectedGroupId === group.id
                      ? "border-blue-500 bg-blue-700 text-white"
                      : "border-zinc-600 bg-dashboard-accent text-white"
                  }`}
                >
                  {group.name}
                </Button>
              ))}
            </div>

            <Input
              placeholder="Search..."
              className="text-black bg-dashboard-accent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <div className="mt-4 space-y-2 max-h-[60vh] overflow-auto">
              {selectedGroupId === null ? (
                <div className="text-center text-sm text-zinc-400">
                  Pilih grup CCTV terlebih dahulu
                </div>
              ) : filteredCameras.length === 0 ? (
                <div className="text-center text-sm text-zinc-400">
                  Tidak ada kamera ditemukan
                </div>
              ) : (
                filteredCameras.map((cam) => (
                  <DraggableCamera key={cam.id} camera={cam} />
                ))
              )}
            </div>
          </div>

          <div className="text-sm text-zinc-400 mt-6">Gate KM 78</div>
        </div>
      </DndContext>
    </div>
  );
};

export default CCTVList;
