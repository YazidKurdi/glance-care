export type Movie = {
    title: string;
    year: string;
    genre: string[];
    country: string[];
    imdb_rating: number;
    oscar_nominations: number;
    oscar_winning: number;
    cast: string[];
    language: string[];
    oscar_nominations_list: string[];
    oscar_winning_list: string[];
}

export type SortOption = "imdb_rating" | "oscar_nominations" | "oscar_winning"