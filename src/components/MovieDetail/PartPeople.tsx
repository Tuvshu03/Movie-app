"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { MovieDetail, MovieId } from "@/app/types";
import { Skeleton } from "../ui/skeleton";
import { Loader } from "lucide-react";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

const PartPeople = (props: MovieId) => {
  const { movieId } = props;
  const [, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<MovieDetail>(
    {} as MovieDetail
  );

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
  
  if(loading){
    return <Skeleton><Loader/></Skeleton>
  }
  return (
    <div className="space-y-5 text-foreground mb-8">
      <div className="flex pb-1 gap-10">
        <div className="font-bold w-16 mr-13">Director</div>
        <div className="flex flex-1 flex-wrap">
          {movieDetail?.crew
            ?.filter((crew) => crew.job === "Director")
            .map((direct) => {
              return (
                <div key={direct.id} className="text-black">
                  {direct.name}
                  <span className="mx-2">·</span>
                </div>
              );
            })}
        </div>
      </div>
      <hr />
      <div className="flex pb-1 gap-10">
        <div className="font-bold w-16 mr-13">Writer</div>
        <div className="flex flex-1 flex-wrap">
          {" "}
          {movieDetail?.crew
            ?.filter((crew) => crew.job === "Writer")
            .map((write) => {
              return (
                <div key={write.id} className="text-black">
                  {write.name}
                  <span className="mx-2">·</span>
                </div>
              );
            })}
        </div>
      </div>
      <hr />
      <div className="flex pb-1 gap-10">
        <div className="font-bold w-16 mr-13">Stars</div>
        <div className="flex flex-1 flex-wrap">
          {movieDetail?.cast?.slice(0, 3).map((cast) => {
            return (
              <div key={cast.id} className="">
                {cast.name}
                <span className="mx-2">·</span>
              </div>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default PartPeople;
