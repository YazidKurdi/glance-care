// "use client";

// import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import {
//   ChartConfig,
//   ChartContainer,
//   ChartTooltip,
//   ChartTooltipContent,
// } from "@/components/ui/chart";
// import { Movie } from "../types/movies";
// import { oscarWinsByYearSummary } from "./utils";

// const chartConfig = {
//   desktop: {
//     label: "Desktop",
//     color: "hsl(var(--chart-1))",
//   },
// } satisfies ChartConfig;

// export function OscarWinsByYear({ movies }: { movies: Movie[] }) {

//   const fromYear = movies.map((movie) => movie.year).sort()[0];
//   const toYear = movies.map((movie) => movie.year).sort()[movies.length - 1];

//   const data = oscarWinsByYearSummary(movies)

//   return (
//     <Card>
//       <CardHeader>
//         <CardTitle>Oscar Wins By Movie</CardTitle>
//         <CardDescription>
//           {fromYear} - {toYear}
//         </CardDescription>
//       </CardHeader>
//       <CardContent>
//         <ChartContainer config={chartConfig}>
//           <BarChart accessibilityLayer data={data}>
//             <CartesianGrid vertical={false} />
//             <XAxis
//               dataKey="year"
//               tickLine={false}
//               tickMargin={10}
//               axisLine={false}
//             />
//             <ChartTooltip
//               cursor={false}
//               content={<ChartTooltipContent hideLabel />}
//             />
//             <Bar dataKey="oscar_wins" fill="hsl(var(--chart-3))" radius={8} barSize={46} name="Oscar Wins"/>
//           </BarChart>
//         </ChartContainer>
//       </CardContent>
//     </Card>
//   );
// }

"use client";

import { Pie, PieChart } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Movie } from "../types/movies";
import { moviesByCountry } from "./utils";

const chartConfig = {
  usa: {
    label: "USA",
    color: "hsl(var(--chart-1))",
  },
  uk: {
    label: "UK",
    color: "hsl(var(--chart-2))",
  },
  south_korea: {
    label: "South Korea",
    color: "hsl(var(--chart-3))",
  },
  new_zealand: {
    label: "New Zealand",
    color: "hsl(var(--chart-4))",
  },
  india: {
    label: "India",
    color: "hsl(var(--chart-5))",
  },
} satisfies ChartConfig;

export function CountryContribution({ movies }: { movies: Movie[] }) {
  const data = moviesByCountry(movies);
  //   fill color for each item in data
  const chartData = data.map((item) => ({
    ...item,
    fill: chartConfig[item.country as keyof typeof chartConfig].color,
  }));

  return (
    <Card>
      <CardHeader>
        <CardTitle>Country Contribution</CardTitle>
        <CardDescription>
          Movies contributed by different countries.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig}>
          <PieChart>
            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
            <Pie data={chartData} dataKey="count" nameKey="country" />
            <ChartLegend
              content={<ChartLegendContent nameKey="country" />}
              className="-translate-y-2 flex-wrap gap-4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
