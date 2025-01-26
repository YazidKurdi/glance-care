"use client";

import { useQueryState } from "nuqs";
import { Input } from "@/components/ui/input";
import { Movie } from "@/app/(app)/types/movies";
import MovieCard from "./movie-card";

export default function MoviesList({ movies }: { movies: Movie[] }) {
  const [search, setSearch] = useQueryState("search", { defaultValue: "" });

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <Input
        placeholder="Search movies..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="max-w-md"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.title} movie={movie} />
        ))}
      </div>
      {filteredMovies.length === 0 && (
        <div className="text-center text-muted-foreground py-12">
          No movies found matching your search.
        </div>
      )}
    </div>
  );
}
