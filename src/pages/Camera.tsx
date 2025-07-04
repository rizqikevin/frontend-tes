import {
  DndContext,
  closestCenter,
  useDraggable,
  useDroppable,
  DragEndEvent,
} from "@dnd-kit/core";
import { Input } from "@/components/ui/input";
import DashboardSidebar from "@/components/DashboardSidebar";
import { useRef, useEffect, useState } from "react";
import api from "@/services/api";
import Hls from "hls.js";

type Camera = {
  id: string;
  name: string;
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
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let hls: Hls | null = null;
    const video = videoRef.current;

    if (camera && camera.url_local && video) {
      setIsLoading(true);

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.loadSource(camera.url_local);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          setIsLoading(false);
        });

        hls.on(Hls.Events.ERROR, () => {
          setIsLoading(false);
        });
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = camera.url_local;
        video.onloadeddata = () => setIsLoading(false);
      }
    }

    return () => {
      if (hls) hls.destroy();
    };
  }, [camera]);

  return (
    <div
      ref={setNodeRef}
      className={`aspect-video border-2 transition-colors duration-200 ${
        isOver ? "border-green-400" : "border-zinc-700"
      } bg-dashboard-sidebar relative`}
    >
      {camera ? (
        <>
          <video
            ref={videoRef}
            className="w-full h-full object-cover"
            autoPlay
            muted
            controls={false}
          />
          {isLoading && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
              <img
                src="/icons/loading.png"
                alt="Loading"
                className="w-8 h-8 animate-spin-slow"
              />
            </div>
          )}
          <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-xs p-1 z-20">
            {camera.name}
          </div>
          <button
            onClick={() => onRemoveCamera(index)}
            className="absolute top-1 right-1 bg-red-600 hover:bg-red-700 text-white text-xs px-2 py-1 rounded z-20"
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

const Camera = () => {
  const [cameraList, setCameraList] = useState<Camera[]>([]);
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [grid, setGrid] = useState<GridSlot[]>(new Array(16).fill(null));

  useEffect(() => {
    const fetchCameras = async () => {
      const res = await api.get("/cctv/all");
      const data = res.data;
      setCameraList(data);
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

  const filteredCameras = cameraList.filter((cam) =>
    cam.name.toLowerCase().includes(search.toLowerCase())
  );

  const onRemoveCamera = (index: number) => {
    const updated = [...grid];
    updated[index] = null;
    setGrid(updated);
  };

  return (
    <div className="flex h-screen bg-dashboard-dark text-white">
      <DashboardSidebar />

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        {/* Grid */}
        <div
          className={`grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px flex-1  mb-21 p-5 ${
            isSidebarCollapsed ? "ml-16" : "ml-64"
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

        {/* Sidebar */}
        <div className="w-[250px] bg-zinc-800 p-4 border-l border-zinc-700 flex flex-col justify-between">
          <div>
            <h2 className="font-semibold text-lg mb-4">Camera List</h2>
            <Input
              placeholder="Search..."
              className="text-black bg-dashboard-accent"
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

export default Camera;
