import { Movie } from "../types/movies";

export const oscarWinsByYearSummary = (movies: Movie[]) => {
    const summary = movies.reduce((acc, movie) => {
        const year = movie.year;
        acc[year] = (acc[year] || 0) + movie.oscar_winning;
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(summary).map(([year, oscar_wins]) => ({ year, oscar_wins }));
};

export const moviesByCountry = (movies: Movie[]) => {
    const toSnakeCase = (str: string) =>
        str.toLowerCase().replace(/\s+/g, '_');

    const summary = movies.reduce((acc, movie) => {
        movie.country.forEach((country) => {
            const snakeCaseCountry = toSnakeCase(country);
            acc[snakeCaseCountry] = (acc[snakeCaseCountry] || 0) + 1;
        });
        return acc;
    }, {} as Record<string, number>);

    return Object.entries(summary).map(([country, count]) => ({ country, count }));
};

export const movieSummaryByYear = (movies: Movie[]) => {
    const summary = movies.reduce((acc, movie) => {
        const year = movie.year;

        if (!acc[year]) {
            acc[year] = { nominations: 0, winnings: 0, ratings: 0, count: 0 };
        }

        acc[year].nominations += movie.oscar_nominations;
        acc[year].winnings += movie.oscar_winning;
        acc[year].ratings += movie.imdb_rating;
        acc[year].count += 1;

        return acc;
    }, {} as Record<string, { nominations: number; winnings: number; ratings: number; count: number }>);

    return Object.entries(summary).map(([year, data]) => ({
        year,
        oscar_nominations: +(data.nominations / data.count).toFixed(2),
        oscar_winnings: +(data.winnings / data.count).toFixed(2),
        imdb_rating: +(data.ratings / data.count).toFixed(2),
    }));
};

export const fromToYear = (movies: Movie[]) => {
    const fromYear = movies.map((movie) => movie.year).sort()[0];
    const toYear = movies.map((movie) => movie.year).sort()[movies.length - 1];
    return { fromYear, toYear };
};
