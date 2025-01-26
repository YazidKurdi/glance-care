import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import useMoviePoster from "@/hooks/usePosterURL";
import { ActorStats } from "../types/actor-stats";
import { Movie } from "../types/movies";

interface LeaderBoardCardProps {
  item: Movie | ActorStats;
  type: "movie" | "actor";
}

export function LeaderBoardCard({ item, type }: LeaderBoardCardProps) {
  const movie = type === "movie" ? (item as Movie) : null;
  const { posterUrl, isLoading } = useMoviePoster(movie?.title ?? "");

  if (type === "movie" && movie) {
    return (
      <Card className="w-full h-[250px] md:h-[300px] overflow-hidden group relative hover:shadow-lg transition-shadow flex flex-col">
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
            <Badge variant="secondary">{movie.imdb_rating}</Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="relative z-10 flex flex-col flex-1 justify-end">
          <div className="space-y-2">
            <div className="flex flex-wrap gap-1">
              {movie.genre.map((g) => (
                <Badge key={g} variant="secondary">
                  {g}
                </Badge>
              ))}
            </div>
            <div className="text-sm text-gray-300">
              <p>Oscar Nominations: {movie.oscar_nominations}</p>
              <p>Oscar Wins: {movie.oscar_winning}</p>
            </div>
          </div>
        </CardContent>
        {isLoading && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}
      </Card>
    );
  }

  const actor = item as ActorStats;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex justify-between items-start">
          <div>{actor.name}</div>
          <Badge variant="secondary">{actor.averageImdbRating}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-2">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Movies: {actor.totalMovies}</span>
            <span>Oscar Nominations: {actor.totalOscarNominations}</span>
            <span>Oscar Wins: {actor.totalOscarWins}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
