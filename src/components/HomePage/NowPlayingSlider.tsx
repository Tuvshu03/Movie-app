import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star} from "lucide-react";
import { Card, CardContent } from "../ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../ui/carousel";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Trailer from "../MovieDetail/Trailer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { MovieDetail } from "@/app/types";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const NowPlayingSlider = () => {
  const { push } = useRouter();
  const [, setError] = useState<string>("");
  const [nowPlayingData, setNowPlayingData] = useState<MovieDetail[]>([]);

  const getMovieData = async () => {
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.results);
    } catch (err) {
      console.log(err);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.status_message);
      }
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);

  return (
    <Carousel>
      <CarouselContent>
        {nowPlayingData.map((movie, index) => (
          <CarouselItem key={index}>
            <div className=" w-full ">
              <Card>
                <CardContent className="p-0">
                  <div className="relative w-full p-0">
                    <Image
                      src={`${TMDB_IMAGE_SERVICE_URL}/original/${movie.backdrop_path}`}
                      width={600}
                      height={600}
                      alt="property image"
                      className="w-full h-[600px] overflow-hidden object-cover"
                      priority
                      onClick={() => {
                        push(`/detail/${movie.id}`);
                      }}
                    />
                    <div className="lg:absolute lg:top-1/2 lg:left-1/4 lg:-translate-y-1/2z-10 bg-opacity-95 text-secondary-foreground">
                      <div className="p-5 space-y-4 lg:p-0">
                        <div className="flex justify-between lg:flex-col lg:space-y-1">
                          <div className="">
                            <h4>Now Playing:</h4>
                            <h3 className="">{movie.title}</h3>
                          </div>
                          <div className="flex items-center gap-x-1">
                            <Star
                              color="#fde047"
                              fill="#fde047"
                              className="bg-yellow w-[28px] h-[28px]"
                            />
                            <div className="font-medium">
                              <div className="text-sm">
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
                        <Trailer movieId={movie.id} />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full hidden lg:flex absolute top-1/2 -translate-y-1/2 left-11">
        <ArrowLeft />
      </CarouselPrevious>
      <CarouselNext className="items-center justify-center gap-2 whitespace-nowrap text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-8 w-8 rounded-full hidden lg:flex absolute top-1/2 -translate-y-1/2 right-11">
        <ArrowRight />
      </CarouselNext>
    </Carousel>
  );
};

export default NowPlayingSlider;
