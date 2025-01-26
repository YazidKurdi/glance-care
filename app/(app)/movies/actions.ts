"use server";

export async function searchMoviePoster(title: string) {
  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${
        process.env.TMDB_API_KEY
      }&query=${encodeURIComponent(title)}`
    );

    if (!response.ok) {
      throw new Error("Failed to fetch movie poster");
    }

    const data = await response.json();

    if (data.results && data.results[0]) {
      return `https://image.tmdb.org/t/p/w500${data.results[0].poster_path}`;
    }

    return null;
  } catch (error) {
    console.error("Error fetching movie poster:", error);
    return null;
  }
}
