import { ActorStats } from "../types/actor-stats";
import { Movie } from "../types/movies";


export function calculateActorStats(movies: Movie[]): ActorStats[] {
  const actorMap = new Map<string, ActorStats>();

  movies.forEach((movie) => {
    movie.cast.forEach((actor) => {
      const stats = actorMap.get(actor) || {
        name: actor,
        totalMovies: 0,
        averageImdbRating: 0,
        totalOscarNominations: 0,
        totalOscarWins: 0,
      };

      stats.totalMovies++;
      stats.averageImdbRating += movie.imdb_rating;
      stats.totalOscarNominations += movie.oscar_nominations;
      stats.totalOscarWins += movie.oscar_winning;

      actorMap.set(actor, stats);
    });
  });

  return Array.from(actorMap.values()).map((stats) => ({
    ...stats,
    averageImdbRating: Number(
      (stats.averageImdbRating / stats.totalMovies).toFixed(1)
    ),
  }));
}
