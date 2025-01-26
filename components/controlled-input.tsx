'use client'

import { useQueryState } from "nuqs";
import { Input } from "./ui/input";

export default function ControlledInput() {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });
  return (
    <Input
      placeholder="Search movies..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="max-w-md"
    />
  );
}
