import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

import { useHeartbeatStore } from "@/stores/useHeartbeatStore";
import { useMemo } from "react";

interface FiltersProps {
  selectedAlat: string;
  setSelectedAlat: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedAlat,
  setSelectedAlat,
  selectedStatus,
  setSelectedStatus,
}) => {
  const { data: cordinat } = useHeartbeatStore();

  const jenisAlatOptions = useMemo(() => {
    return Array.from(new Set(cordinat.map((item) => item.id_alat)));
  }, [cordinat]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(cordinat.map((item) => item.last_status)));
  }, [cordinat]);

  return (
    <div className="flex flex-wrap gap-2 ">
      <Select value={selectedAlat} onValueChange={setSelectedAlat}>
        <SelectTrigger className="w-48 bg-dashboard-accent">
          <SelectValue placeholder="Semua Jenis Alat" />
        </SelectTrigger>
        <SelectContent className="z-[9999] bg-dashboard-accent">
          {jenisAlatOptions.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="w-48 bg-dashboard-accent">
          <SelectValue placeholder="Semua Status" />
        </SelectTrigger>
        <SelectContent className="z-[9999] bg-dashboard-accent">
          {statusOptions.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Button className="px-6">Search</Button>
    </div>
  );
};

export default Filters;
