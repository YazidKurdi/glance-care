"use client"

import { useState, useMemo } from "react"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { LeaderBoardCard } from "./leaderboard-card"
import { calculateActorStats } from "./utils"
import { Movie, SortOption } from "../types/movies"
import { ActorStats } from "../types/actor-stats"

interface LeaderboardProps {
  movies: Movie[]
}

export function Leaderboard({ movies }: LeaderboardProps) {
  const [tab, setTab] = useState<"movie" | "actor">("movie")
  const [sortBy, setSortBy] = useState<SortOption>("imdb_rating")

  const actorStats = useMemo(() => calculateActorStats(movies), [movies])

  const sortedItems = useMemo(() => {
    if (tab === "movie") {
      return [...movies].sort((a, b) => b[sortBy] - a[sortBy])
    }

    const actorSortMap: Record<SortOption, keyof (typeof actorStats)[0]> = {
      imdb_rating: "averageImdbRating",
      oscar_nominations: "totalOscarNominations",
      oscar_winning: "totalOscarWins",
    }

    return [...actorStats].sort((a, b) => (b[actorSortMap[sortBy]] as number) - (a[actorSortMap[sortBy]] as number))
    
  }, [movies, actorStats, tab, sortBy])

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-6">
        <Tabs value={tab} onValueChange={(value) => setTab(value as "movie" | "actor")}>
          <TabsList>
            <TabsTrigger value="movie">Movies</TabsTrigger>
            <TabsTrigger value="actor">Actors</TabsTrigger>
          </TabsList>
        </Tabs>

        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="imdb_rating">IMDB Rating</SelectItem>
            <SelectItem value="oscar_nominations">Oscar Nominations</SelectItem>
            <SelectItem value="oscar_winning">Oscar Wins</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="grid gap-4">
        {sortedItems.map((item) => (
          <LeaderBoardCard key={tab === "movie" ? (item as Movie).title : (item as ActorStats).name} item={item} type={tab} />
        ))}
      </div>
    </div>
  )
}

