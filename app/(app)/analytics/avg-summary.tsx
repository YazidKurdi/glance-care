"use client"

import * as React from "react"
import { CartesianGrid, Line, LineChart, XAxis } from "recharts"

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"
import { movieSummaryByYear } from "./utils"
import { Movie } from "../types/movies"

const chartConfig = {
  oscar_nominations: {
    label: "Total Oscar Nominations",
    color: "hsl(var(--chart-1))",
  },
  imdb_rating: {
    label: "Average IMDb Rating",
    color: "hsl(var(--chart-2))",
  },
  oscar_winnings: {
    label: "Total Oscar Winnings",
    color: "hsl(var(--chart-2))",
  }
} satisfies ChartConfig

export function AvgSummary({ movies }: { movies: Movie[] }) {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>("oscar_nominations")
  
  const chartData = movieSummaryByYear(movies)

  const total = React.useMemo(
    () => ({
      oscar_nominations: chartData.reduce((acc, curr) => acc + curr.oscar_nominations, 0).toFixed(0),
      imdb_rating: chartData.reduce((acc, curr) => acc + curr.imdb_rating, 0) / chartData.length,
      oscar_winnings: chartData.reduce((acc, curr) => acc + curr.oscar_winnings, 0).toFixed(0),
    }),
    [chartData]
  )

  return (
    <Card className="md:col-span-2">
      <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
        <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
          <CardTitle>Movie stastics over the years</CardTitle>
        </div>
        <div className="flex">
          {["oscar_nominations", "imdb_rating", "oscar_winnings"].map((key) => {
            const chart = key as keyof typeof chartConfig
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className="flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(chart)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[chart].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {total[key as keyof typeof total].toLocaleString()}
                </span>
              </button>
            )
          })}
        </div>
      </CardHeader>
      <CardContent className="px-2 sm:p-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey="a"
                />
              }
            />
            <Line
              dataKey={activeChart}
              type="monotone"
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
