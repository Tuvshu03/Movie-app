"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetail } from "@/app/types/MovieDetail";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

type MovieId = {
  movieId: number;
};

const PartPeople = (props: MovieId) => {
  const { movieId } = props;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | any>({});


  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovieDetail(response.data)
      console.log("response", response.data);
     
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

  useEffect(() => {
    getMovieData();
  }, []);
  return (
    <div>
      {!movieDetail.movieId ? (
        <div>
          <div>
            <div className="">Director</div>
            {Array.isArray(movieDetail?.crew) &&
              movieDetail.length > 0 && movieDetail.crew.filter((crew)=>{
                
              }).map((director:any)=>{
                return (
                  <div key={director.id} className="">{director.name}</div>
                )
              })}
          </div>
          <hr />
          <div>Writer</div>
          <hr />
          <div>
            <div className="">Stars</div>
            {Array.isArray(movieDetail?.cast) &&
              movieDetail.length > 0 &&
              movieDetail.cast.slice(0, 3).map((cast: any) => {
                return (
                  <div key={cast.id} className=""> 
                    {cast.name}
                  </div>
                );
              })}
          </div>
          <hr />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default PartPeople;
