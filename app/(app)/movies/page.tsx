import Shell from "@/components/shell";
import { Movie } from "../types/movies";
import fs from "fs/promises";
import MoviesList from "@/app/(app)/movies/movies-list";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Movies",
};

export default async function Page() {
  // rate limited with jsondataai - fallback to fake json data with similar structure
  // const data = await fetch("https://www.jsondataai.com/api/guK8Sdo")

  const data = await fs.readFile("movies.json", "utf-8");
  const movies: Movie[] = JSON.parse(data);

  return (
    <Shell>
        <MoviesList movies={movies} />
    </Shell>
  );
}
