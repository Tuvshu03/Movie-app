import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Play } from "lucide-react";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import Image from "next/image";
import { MovieDetail } from "@/app/types/MovieDetail";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const NowPlayingSlider = () => {
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieDetail[]>([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.results);
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
    <div className="justify-center ">
      <Carousel className="">
        <CarouselContent className="">
          {nowPlayingData.slice(10, 18).map((movie, index) => (
            <CarouselItem key={index}>
              <div className=" w-full ">
                <Card>
                  <CardContent className="p-0">
                    <div className="relative w-full p-0">
                      <Image
                        src={`${TMDB_IMAGE_SERVICE_URL}/original/${movie.backdrop_path}`}
                        width={1000}
                        height={100}
                        alt="property image"
                        className="overflow-hidden w-full h-full"
                        onClick={() => {
                          push(`/detail/${movie.id}`);
                        }}
                      />
                      <div className="static text-foreground lg:absolute lg:top-1/2 lg:left-[140px] lg:-translate-y-1/2 lg:text-white z-10">
                        <div className="p-5 space-y-4 lg:p-0">
                          <div className="flex justify-between lg:flex-col lg:space-y-1">
                            <div className="">
                              <h4>Now Playing:</h4>
                              <h3>{movie.title}</h3>
                            </div>
                            <div className="flex items-center gap-x-1">
                              <Star
                                color="#fde047"
                                fill="#fde047"
                                className="bg-yellow w-[28px] h-[28px]"
                              />
                              <div className="font-medium">
                                <div className="text-foreground text-sm lg:text-white">
                                  {movie.vote_average}
                                </div>
                                <div className="text-muted-foreground text-xs">
                                  10
                                </div>
                              </div>
                            </div>
                          </div>
                          <p className="w-[302px] text-sm line-clamp-5">
                            {movie.overview}
                          </p>
                          <Button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80 h-9 px-4 py-2">
                            <Play />
                            <h4 className="text-sm">Watch Trailer</h4>
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
};

export default NowPlayingSlider;
