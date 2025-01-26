"use client";

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Movie } from "../types/movies";
import { fromToYear, oscarWinsByYearSummary } from "./utils";

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

export function OscarWinsByYear({ movies }: { movies: Movie[] }) {

  const data = oscarWinsByYearSummary(movies)
  const { fromYear, toYear } = fromToYear(movies);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Oscar Wins By Movie</CardTitle>
        <CardDescription>
          {fromYear} - {toYear}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="year"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar dataKey="oscar_wins" fill="hsl(var(--chart-3))" radius={8} barSize={46} name="Oscar Wins"/>
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
