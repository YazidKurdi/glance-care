import { searchMoviePoster } from "@/app/(app)/movies/actions";
import { useState, useEffect } from "react";

function useMoviePoster(title: string) {
  const [posterUrl, setPosterUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!title) return; // Prevent fetching if no title is provided

    async function fetchPoster() {
      try {
        setIsLoading(true);
        const url = await searchMoviePoster(title); // Assume this is an available API function
        setPosterUrl(url);
      } catch (error) {
        console.error("Failed to fetch movie poster:", error);
        setPosterUrl(null);
      } finally {
        setIsLoading(false);
      }
    }

    fetchPoster();
  }, [title]);

  return { posterUrl, isLoading };
}

export default useMoviePoster;
