import { Button } from "../ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Filter } from "lucide-react";

export default function SearchHeader() {
  const [filterLog, setFilterLog] = useState("");

  return (
    <div className="flex items-center gap-4 px-4 py-2  text-white">
      <Select value={filterLog} onValueChange={setFilterLog}>
        <SelectTrigger className="w-[1200px]  bg-dashboard-accent">
          <SelectValue placeholder="Tol HMW, Sumatera Utara" />
        </SelectTrigger>
        <SelectContent className="bg-dashboard-accent">
          <SelectItem value="rkap">ALL</SelectItem>
        </SelectContent>
      </Select>
      <Button className=" bg-transparent p-2 rounded">
        <Filter className="text-white" size={20} />
      </Button>
      <Button className="bg-white px-4 py-2 rounded text-black">Search</Button>
      <Button className="bg-green-600 px-4 py-2 rounded text-white">
        Add Search
      </Button>
      <Button className="bg-red-600 px-4 py-2 rounded text-white">
        Delete Search
      </Button>
    </div>
  );
}
