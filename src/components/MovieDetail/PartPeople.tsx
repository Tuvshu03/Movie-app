"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Play } from "lucide-react";
import { MovieDetail } from "@/app/types/MovieDetail";
import Image from "next/image";
import { Button } from "../ui/button";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

type MovieId = {
  id: number;
};

const PartPeople = (props:MovieId) => {
    const {id} = props;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | any>({});
  

  const getMovieData = async () => {
    console.log("abse url", TMDB_BASE_URL);
    console.log("amovie id ", id);
    console.log("atoken", TMDB_API_TOKEN);

    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${id}/credits?language=en-US`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setMovieDetail(response.data);
      console.log("detail", response.data)
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
        <div>Director</div>
        <hr/>
        <div>Writer</div>
        <hr/>
        <div>Stars</div>
        <hr/>
    </div>
  )
}

export default PartPeople