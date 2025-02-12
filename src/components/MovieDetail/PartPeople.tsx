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
      setMovieDetail(response.data);
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
  console.log("sad", movieDetail.crew)
  console.log("happy", movieDetail.cast)
  console.log(movieDetail.id);
  
  return (
    <div>
      {!movieDetail.id? (
        <div>
          {/* <div>
          <div className="">Director</div>
            {Array.isArray(movieDetail?.crew) &&
              movieDetail.length > 0 && 
              const director = movieDetail.crew.filter(movieDetail.crew.known_for_department==="Directing")

              director.map((direct:any)=>{
                return (
                  <div key={direct.id} className="">{direct.name}</div>
                )
              })}
          </div>
          <hr />
          <div>
            <div className="">Writer</div>
            {Array.isArray(movieDetail?.crew) &&
              movieDetail.length > 0 && 
              const writer === movieDetail.crew.filter(movieDetail.crew.known_for_department==="Writing")

              writer.slice(0, 2).map((write:any)=>{
                return (
                  <div key={write.id} className="">{write.name}</div>
                )
              })}
          </div> */}
          <hr />
          <div>
            <div className="">Stars</div>
            {
            Array.isArray(movieDetail?.crew) && movieDetail.length > 0 &&
              movieDetail.cast.slice(0, 3).map((cast: any) => {
                return (
                  <div key={cast.id} className="">
                   sdfads
                  </div>
                );
              })}
          </div>
          <hr />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default PartPeople;
