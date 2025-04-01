import React, { useState, useEffect } from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import axios from "axios";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { useRouter } from "next/navigation";
import { Skeleton } from "../ui/skeleton";
import { Genre} from "@/app/types";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

const GenresApi = () => {
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [genres, setGenres] = useState<Genre[]>([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setGenres(response.data.genres);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.status_message);
        console.log(error);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getMovieData();
  }, []);

  if (loading)
    return (
      <Skeleton className="p-5 w-[335px] lg:justifty-center sm:w-[577px]">
        <div className=""></div>
      </Skeleton>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="w-9 h-9 border flex justify-center items-center lg:w-[97px] lg:h-[36px] lg:py-4 lg:px-2 gap-2 rounded-md">
        <ChevronDown className="w-4 h-4" />
        <div className="hidden lg:block">Genres</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="absolute -left-11 p-5 w-[335px] lg:justifty-center sm:w-[577px]">
        <DropdownMenuGroup>
          <div className="flex flex-col mb-5">
            <DropdownMenuLabel>Genres</DropdownMenuLabel>
            <p>See list of movies by genre</p>
            <hr />
          </div>
          <div className="flex flex-wrap items-start gap-4">
            {genres?.map((genre, index) => {
              return (
                <div
                  key={index}
                  className="flex rounded-full items-center border"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      push(`/genre?genresId=${genre.id}`);
                    }}
                    className="text-sx"
                  >
                    {genre.name}
                  </DropdownMenuItem>
                  <ChevronRight className="w-4 h-4" />
                </div>
              );
            })}
          </div>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default GenresApi;
