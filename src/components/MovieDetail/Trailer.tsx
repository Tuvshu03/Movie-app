"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type MovieId = {
  movieId: number;
  trailerShow: boolean;
};

const Trailer = (props: MovieId) => {
  const { movieId, trailerShow } = props;
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
    <div className=" z-30 w-screen h-screen">
      {trailerShow ? (
        <div className="w-full h-full bg-yellow-100">
          {loading && <p>Loading trailer...</p>}
          {error && <p>Error: {error}</p>}
          {trailerUrl ? (
            <div>
              <iframe
                width="400"
                height="315"
                src={trailerUrl}
                title="Movie Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          ) : (
            !loading && <p>No trailer available for this movie.</p>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
export default Trailer;
