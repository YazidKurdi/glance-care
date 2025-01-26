import Shell from "@/components/shell";
import { Movie } from "../types/movies";
import fs from "fs/promises";
import { OscarWinsByYear } from "./oscan-wins-by-movie";
import { CountryContribution } from "./country-contribution";
import { Metadata } from "next";
import { AvgSummary } from "./avg-summary";

export const metadata: Metadata = {
  title: "Analytics",
};

export default async function Page() {
  // rate limited with jsondataai - fallback to fake json data with similar structure
  // const data = await fetch("https://www.jsondataai.com/api/guK8Sdo")

  const data = await fs.readFile("movies.json", "utf-8");
  const movies: Movie[] = JSON.parse(data);

  return (
    <Shell>
      <div className="grid gap-8 grid-cols-1 lg:grid-cols-2">
        <OscarWinsByYear movies={movies} />
        <CountryContribution movies={movies} />
        <AvgSummary movies={movies} />
      </div>
    </Shell>
  );
}
