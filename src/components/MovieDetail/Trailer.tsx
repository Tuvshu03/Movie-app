"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type MovieId = {
  movieId: number;
};

const Trailer = (props: MovieId) => {
  const { movieId } = props;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [trailerUrl, setTrailerUrl] = useState<string | null>(null);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      if (response.data.results.length > 0) {
        const trailer = response.data.results.find(
          (video: any) => video.type === "Trailer"
        );

        if (trailer) {
          setTrailerUrl(`https://www.youtube.com/embed/${trailer.key}`);
        }
      } else {
        setError("Trailer not available for this movie.");
      }
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.status_message);
      }
    } finally {
      setLoading(false);
    }
  };
  const id = movieId;
  useEffect(() => {
    getMovieData();
  }, [id]);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Play />
          <h4 className="text-sm">Watch Trailer</h4>
        </Button>
      </DialogTrigger>
      <DialogContent className="w-full h-1/4 p-0 rounded-2xl">
          {loading && <p>Loading trailer...</p>}
          {error && <p>Error: {error}</p>}
          {trailerUrl ? (
              <iframe
                width="455"
                height="315"
                src={trailerUrl}
                title="Movie Trailer"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full rounded-lg"
              ></iframe>
          ) : (
            !loading && <p>No trailer available for this movie.</p>
          )}
      </DialogContent>
    </Dialog>
  );
};
export default Trailer;
