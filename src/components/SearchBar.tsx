import React from "react";
import { Input } from "./ui/input";
import { Search, Star, ArrowRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent } from "./ui/card";
import Image from "next/image";
import { MovieDetail } from "@/app/types/MovieDetail";
import { Skeleton } from "./ui/skeleton";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const SearchBar = () => {
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieDetail[]>([]);
  const [searchValue, setSearchValue] = useState<string>("");

  const handleMovie = (event: any) => {
    setSearchValue(event.target.value);
  };

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
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
  }, [searchValue]);

  if(loading){
    return <Skeleton className="absolute w-[335px] h-[128px] bg-[E4E4E7] flex justify-center items-center">
      <LoaderCircle/>
    </Skeleton>
  }
  return (
    <div className="">
      <div className="relative text-muted-foreground w-[379px] ">
        <Search className="absolute top-2.5 left-2.5 w-4 h-4" />
        <Input
          placeholder="Search"
          onChange={handleMovie}
          className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
        />
      </div>
      {searchValue.length > 0 && (
        <div className="absolute z-30 rounded-xl bg-gray-50 p-2">
          {nowPlayingData.slice(0, 4).map((movie) => {
            return (
              <Card 
              key={movie.id}
              className="border-none">
                <CardContent
                  onClick={() => {
                    push(`/detail/${movie.id}`);
                    setSearchValue("");
                  }}
                  className="flex gap-x-4 mb-2 p-2 hover:bg-muted border-none "
                >
                  <Image
                    src={`${TMDB_IMAGE_SERVICE_URL}/original/${movie.poster_path}`}
                    width={290}
                    height={428}
                    alt="property image"
                    className="relative overflow-hidden w-[67px] h-[100px] rounded-md"
                  />
                  <div className="flex-1 text-foreground">
                    <h4 className="w-48 lg:w-96 truncate text-xl font-semibold">
                      {movie.title}
                    </h4>
                    <div className="flex items-center gap-x-1">
                      <Star
                        color="#fde047"
                        fill="#fde047"
                        className="bg-yellow"
                      />
                      <span className="font-medium">
                        {movie.vote_average}/10
                      </span>
                    </div>
                    <div className="mt-3 flex justify-between text-sm font-medium">
                      <h5>{movie.release_date}</h5>
                      <div className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 text-primary underline-offset-4 hover:underline h-9 px-4 py-2">
                        see more
                        <ArrowRight />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
