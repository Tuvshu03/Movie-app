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

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
type Genres = {
  id: number;
  name: string;
};

const GenresApi = () => {
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<Genres[]>([]);

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
      setNowPlayingData(response.data.genres);
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
    <DropdownMenu>
      <DropdownMenuTrigger className="w-9 h-9 border flex justify-center items-center lg:w-[97px] lg:h-[36px] lg:py-4 lg:px-2 gap-2 rounded-md">
        <ChevronDown className="w-4 h-4" />
        <div className="hidden lg:block">Genres</div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-5 w-[335px] lg:justifty-center sm:w-[577px]">
        <DropdownMenuGroup className="  ">
          <div className="flex flex-col mb-5">
            <DropdownMenuLabel>Genres</DropdownMenuLabel>
            <p>See list of movies by genre</p>
            <hr />
          </div>
          <div className="flex flex-wrap items-start gap-4">
            {nowPlayingData?.map((movie, index) => {
              return (
                <div
                  key={index}
                  className="flex rounded-full items-center border"
                >
                  <DropdownMenuItem
                    onClick={() => {
                      push(`/genre`);
                    }}
                    key={index}
                    className="text-sx"
                    value={movie.name}
                  >
                    {movie.name}
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
