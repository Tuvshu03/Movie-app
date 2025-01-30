"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Movie } from "@/app/types/Movie";
const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

const Page = (props: Movie) => {
  const { title } = props;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<Movie[]>([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/upcoming?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.result);
      console.log(response);
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
    <div className="w-full justify-center">
      <div>
        <div>Up Coming</div>
        <div>See more</div>
      </div>
      {nowPlayingData.map((movie, index) => {
        return (
          <Card key={index}>
            <CardContent>
              <div>
                {/* <Image
                  src={movie.backdrop_path}
                /> */}
                <div>
                  <Star />
                  {movie.vote_average}/10
                </div>
                {movie.title}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default Page;
