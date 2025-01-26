import { Movie } from "../types/movies";
import fs from "fs/promises";
import { Leaderboard } from "./leaderbord";
import Shell from "@/components/shell";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leaderboards",
};

export default async function LeaderboardPage() {
  // rate limited with jsondataai - fallback to fake json data with similar structure
  // const data = await fetch("https://www.jsondataai.com/api/guK8Sdo")

  const data = await fs.readFile("movies.json", "utf-8");
  const movies: Movie[] = JSON.parse(data);

  return (
    <Shell>
      <Leaderboard movies={movies} />
    </Shell>
  );
}
