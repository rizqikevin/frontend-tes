import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { Input } from "@/components/ui/input";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useEffect, useState } from "react";
import api from "@/services/api";
import ReactPlayer from "react-player";

type Camera = {
  id: string;
  name: string;
  group_id: string;
  url_local: string;
};

type GridSlot = Camera | null;

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

const videoFullScreen = (index: number) => {
  const el = document.querySelector(`[data-video-index="${index}"]`);
  if (el?.requestFullscreen) el.requestFullscreen();
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
          <div
            data-video-index={index}
            onDoubleClick={() => videoFullScreen(index)}
          >
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

const VMS = () => {
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [grid, setGrid] = useState<GridSlot[]>(new Array(16).fill(null));
  useEffect(() => {
    const fetchCameras = async () => {
      const res = await api.get("/cctv/all");
      setCameraList(res.data);
      console.log(res.data);
    };
    fetchCameras();
  }, []);

  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    const checkTheme = () => {
      const savedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(savedTheme);
    };

    checkTheme();
    const themeInterval = setInterval(checkTheme, 100);

    window.addEventListener(
      "sidebarStateChange",
      handleSidebarChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "sidebarStateChange",
        handleSidebarChange as EventListener
      );
      clearInterval(themeInterval);
    };
  }, []);

  const filteredCameras = cameraList.filter((cam) => {
    const matchGroup = Number(cam.group_id) === 5;
    const matchSearch = cam.name.toLowerCase().includes(search.toLowerCase());
    const isUsed = grid.some((item) => item?.id === cam.id);
    return matchGroup && matchSearch && !isUsed;
  });

  useEffect(() => {
    const handleSidebarChange = (event: CustomEvent) => {
      setIsSidebarCollapsed(event.detail.collapsed);
    };

    const checkTheme = () => {
      const savedTheme =
        (localStorage.getItem("theme") as "light" | "dark") || "dark";
      setTheme(savedTheme);
    };

    checkTheme();
    const themeInterval = setInterval(checkTheme, 100);

    window.addEventListener(
      "sidebarStateChange",
      handleSidebarChange as EventListener
    );

    return () => {
      window.removeEventListener(
        "sidebarStateChange",
        handleSidebarChange as EventListener
      );
      clearInterval(themeInterval);
    };
  }, []);

  const onDropCamera = (index: number, camera: Camera) => {
    const updated = [...grid];
    updated[index] = camera;
    setGrid(updated);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event;
    if (over && active.data.current) {
      const camera = active.data.current as Camera;
      const index = parseInt(over.id as string);
      onDropCamera(index, camera);
    }
  };

  const onRemoveCamera = (index: number) => {
    const updated = [...grid];
    updated[index] = null;
    setGrid(updated);
  };

  return (
    <div className="flex h-screen bg-dashboard-dark text-white">
      <DashboardSidebar />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-1 flex-1 p-0  ${
            isSidebarCollapsed ? "ml-6" : "ml-64"
          } transition-all duration-300`}
        >
          {grid.map((camera, i) => (
            <DroppableGridSlot
              key={i}
              id={i.toString()}
              camera={camera}
              onDropCamera={onDropCamera}
              onRemoveCamera={onRemoveCamera}
            />
          ))}
        </div>

        <div className="w-[250px] bg-zinc-800 p-4 border-l border-zinc-700 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-lg mb-4">VMS List</h2>
            <Input
              placeholder="Search..."
              className="text-white bg-dashboard-accent"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div className="mt-4 space-y-2 max-h-[70vh] overflow-auto">
              {filteredCameras.map((cam) => (
                <DraggableCamera key={cam.id} camera={cam} />
              ))}
            </div>
          </div>
        </div>
      </DndContext>
    </div>
  );
};

export default VMS;
