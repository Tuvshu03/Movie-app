"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { Movie } from "@/app/types/Movie";
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;


const Page = () => {
   
    const [error, setError] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);
    const [nowPlayingData, setNowPlayingData] = useState([]);
    const getMovieData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `${TMDB_BASE_URL} /movie/${movieId}?language=en-US`,
          {
            headers: {
              Authorization: `Bearer ${TMDB_API_TOKEN}`,
            },
          }
        );
        setNowPlayingData(response.data.results);
        console.log('happy',response);
        console.log("data", response.data.results);
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
    useEffect(()=>{
      getMovieData()
    }, [])
  return (
    <div>Page</div>
  )
}

export default Page