import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

const statuses: string[] = [
  "REQUESTED",
  "APPROVED",
  "DISPATCHED",
  "IN_TRANSIT",
  "DELIVERED",
  "CANCELLED",
];

const sortByDate: { value: string; label: string }[] = [
  { value: "-deliveryDate", label: "Recent Delivery" },
  { value: "deliveryDate", label: "Oldest Delivery" },
  { value: "-createdAt", label: "Recent Created" },
  { value: "createdAt", label: "Oldest Created" },
];

export interface IProps {
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  type: string | null;
  setType: React.Dispatch<React.SetStateAction<string | null>>;
  typeNames: string[];
  currentStatus: string | null;
  setCurrentStatus: React.Dispatch<React.SetStateAction<string | null>>;
  sort: string;
  setSort: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchAndFilter({
  searchTerm,
  setSearchTerm,
  type,
  setType,
  typeNames,
  currentStatus,
  setCurrentStatus,
  sort,
  setSort,
}: IProps) {
  const resetFilters = () => {
    setSearchTerm("");
    setType(null);
    setCurrentStatus(null);
    setSort("");
  };

  return (
    <div className="flex flex-wrap items-center gap-3">
      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search anything..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-8 w-[220px]"
        />
      </div>

      {/* Type Filter */}
      <Select
        value={type || ""}
        onValueChange={(v) => setType(v === "all" ? null : v)}
      >
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {typeNames.map((name, i) => (
            <SelectItem value={name} key={i}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Status Filter */}
      <Select
        value={currentStatus || ""}
        onValueChange={(v) => setCurrentStatus(v === "all" ? null : v)}
      >
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All</SelectItem>
          {statuses.map((name, i) => (
            <SelectItem value={name} key={i}>
              {name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sort || ""} onValueChange={setSort}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {sortByDate.map((name, i) => (
            <SelectItem value={name.value} key={i}>
              {name.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Reset Button */}
      <Button variant="outline" onClick={resetFilters}>
        Reset
      </Button>
    </div>
  );
}
