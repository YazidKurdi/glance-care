"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Movie } from "../types/movies";
import useMoviePoster from "@/hooks/usePosterURL";

function MovieCard({ movie }: { movie: Movie }) {

  const { posterUrl, isLoading } = useMoviePoster(movie.title);

  return (
    <Card className="overflow-hidden group relative hover:shadow-lg transition-shadow h-[400px] flex flex-col">
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-200
          ${isLoading ? "opacity-0" : "opacity-100"}`}
        style={{
          backgroundImage: posterUrl ? `url(${posterUrl})` : "none",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30" />
      <CardHeader className="relative z-10">
        <CardTitle className="flex justify-between items-start text-white">
          <div>
            <span className="block">{movie.title}</span>
            <span className="text-sm text-gray-300">{movie.year}</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-4 h-4 fill-yellow-400 stroke-yellow-400" />
            <span className="text-sm">{movie.imdb_rating}</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-col flex-1  justify-end align-bottom">
        <div className="space-y-2">
          <div className="flex flex-wrap gap-1">
            {movie.genre.map((genre) => (
              <Badge key={genre} variant="secondary">
                {genre}
              </Badge>
            ))}
          </div>
          <div className="text-sm text-gray-300">
            <p>Oscar Nominations: {movie.oscar_nominations}</p>
            <p>Oscar Wins: {movie.oscar_winning}</p>
          </div>
        </div>
      </CardContent>
      {isLoading && <div className="absolute inset-0 bg-muted animate-pulse" />}
    </Card>
  );
}

export default MovieCard;
