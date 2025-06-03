import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

export interface ErrorItem {
  jenisAlat: string;
  ruas: string;
  waktu: string;
  lamaError: string;
  status: "error" | "warning" | "success";
}

const ErrorLog = ({ errorLogData }: { errorLogData: ErrorItem[] }) => {
  return (
    <div className="rounded-lg border p-4 bg-dashboard-accent">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">Log error alat</h3>
      </div>

      <div className="flex gap-4 mb-4">
        <Select>
          <SelectTrigger className="flex-1 bg-dashboard-accent">
            <SelectValue placeholder="Pilih Ruas Jalan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="kuala-tanjung">Kuala Tanjung</SelectItem>
            <SelectItem value="gerbang-sinaksak">Gerbang Sinaksak</SelectItem>
          </SelectContent>
        </Select>

        <Select>
          <SelectTrigger className="flex-1 bg-dashboard-accent">
            <SelectValue placeholder="Semua Jenis Alat" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="cctv">CCTV</SelectItem>
            <SelectItem value="vms">VMS</SelectItem>
            <SelectItem value="toll-gate">Toll Gate</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <div className="grid grid-cols-4 gap-2 text-xs font-medium p-2 rounded">
          <span>Jenis Alat</span>
          <span>Ruas</span>
          <span>Waktu</span>
          <span>Lama Error</span>
        </div>

        {errorLogData.map((item, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-2 text-xs p-2 rounded border"
          >
            <span>{item.jenisAlat}</span>
            <span>{item.ruas}</span>
            <span>{item.waktu}</span>
            <span
              className={`inline-flex px-2 py-1 rounded text-xs ${
                item.status === "error"
                  ? "bg-red-500"
                  : item.status === "warning"
                  ? "bg-orange-500"
                  : "bg-green-500"
              } text-white`}
            >
              {item.lamaError}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ErrorLog;
