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
  selectedRuas: string;
  setSelectedRuas: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedAlat,
  setSelectedAlat,
  selectedRuas,
  setSelectedRuas,
  selectedStatus,
  setSelectedStatus,
}) => {
  const { data: cordinat } = useHeartbeatStore();

  const jenisAlatOptions = useMemo(() => {
    return Array.from(new Set(cordinat.map((item) => item.id_alat)));
  }, [cordinat]);

  const ruasOptions = useMemo(() => {
    return Array.from(new Set(cordinat.map((item) => item.nama_gerbang)));
  }, [cordinat]);

  const statusOptions = useMemo(() => {
    return Array.from(new Set(cordinat.map((item) => item.last_status)));
  }, [cordinat]);

  // console.log(selectedStatus);
  // console.log(selectedStatus.length);

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

      <Select value={selectedRuas} onValueChange={setSelectedRuas}>
        <SelectTrigger className="w-48 bg-dashboard-accent">
          <SelectValue placeholder="Semua Ruas" />
        </SelectTrigger>
        <SelectContent className="z-[9999] bg-dashboard-accent">
          {ruasOptions.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedStatus.length > 3 ? (
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
      ) : (
        <div></div>
      )}

      <Button className="px-6">Search</Button>
    </div>
  );
};

export default Filters;
