import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

interface FiltersProps {
  selectedRoute: string;
  setSelectedRoute: (value: string) => void;
  selectedDeviceType: string;
  setSelectedDeviceType: (value: string) => void;
  selectedStatus: string;
  setSelectedStatus: (value: string) => void;
  selectedCondition: string;
  setSelectedCondition: (value: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  selectedRoute,
  setSelectedRoute,
  selectedDeviceType,
  setSelectedDeviceType,
  selectedStatus,
  setSelectedStatus,
  selectedCondition,
  setSelectedCondition,
}) => {
  return (
    <div className="flex flex-wrap px-40 gap-2 items-center">
      <Select value={selectedRoute} onValueChange={setSelectedRoute}>
        <SelectTrigger className="w-48 bg-dashboard-accent">
          <SelectValue placeholder="Pilih Ruas Jalan" />
        </SelectTrigger>
        <SelectContent className="z-[9999]">
          <SelectItem value="kuala-tanjung">Kuala Tanjung</SelectItem>
          <SelectItem value="gerbang-sinaksak">Gerbang Sinaksak</SelectItem>
          <SelectItem value="dolok-merawan">Dolok Merawan</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedDeviceType} onValueChange={setSelectedDeviceType}>
        <SelectTrigger className="w-48 bg-dashboard-accent">
          <SelectValue placeholder="Semua Jenis Alat" />
        </SelectTrigger>
        <SelectContent className="z-[9999]">
          <SelectItem value="cctv">CCTV</SelectItem>
          <SelectItem value="vms">VMS</SelectItem>
          <SelectItem value="toll-gate">Toll Gate</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedStatus} onValueChange={setSelectedStatus}>
        <SelectTrigger className="w-48 bg-dashboard-accent">
          <SelectValue placeholder="Semua Status" />
        </SelectTrigger>
        <SelectContent className="z-[9999]">
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
          <SelectItem value="maintenance">Maintenance</SelectItem>
        </SelectContent>
      </Select>

      <Select value={selectedCondition} onValueChange={setSelectedCondition}>
        <SelectTrigger className="w-48 bg-dashboard-accent">
          <SelectValue placeholder="Semua Kondisi" />
        </SelectTrigger>
        <SelectContent className="z-[9999]">
          <SelectItem value="good">Good</SelectItem>
          <SelectItem value="warning">Warning</SelectItem>
          <SelectItem value="error">Error</SelectItem>
        </SelectContent>
      </Select>

      <Button className="px-6">Search</Button>
    </div>
  );
};

export default Filters;
