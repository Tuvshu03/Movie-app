import { MovieDetail } from "@/app/types/MovieDetail";
import { Star, ArrowRight, LoaderCircle } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent } from "./ui/card";
import axios from "axios";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

type SearchResultMoviesProps = {
  searchValue: string;
  setSearchValue: (value: string) => void;
};

export const SearchResultMovies = (props: SearchResultMoviesProps) => {
  const { searchValue, setSearchValue } = props;
  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieDetail[]>([]);

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

  if (loading) {
    return (
      <Skeleton className="relative mt-10 text-muted-foreground w-[379px] h-[192px] bg-black flex justify-center items-center">
        <LoaderCircle />
      </Skeleton>
    );
  }

  return (
    searchValue.length > 0 && (
      <div className="absolute z-30 rounded-xl bg-primary p-2 mt-3">
        {nowPlayingData.slice(0, 5).map((movie) => {
          return (
            <Card key={movie.id} className="border-none">
              <CardContent
                onClick={() => {
                  push(`/detail/${movie.id}`);
                  setSearchValue("");
                }}
                className="flex gap-x-4 mb-2 p-2 hover:bg-muted hover:rounded-xl border-none "
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
                    <span className="font-medium">{movie.vote_average}/10</span>
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
    )
  );
};
