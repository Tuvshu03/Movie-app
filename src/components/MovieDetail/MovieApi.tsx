"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star, Play } from "lucide-react";
import { MovieDetail } from "@/app/types/MovieDetail";
import Image from "next/image";
import { Button } from "../ui/button";
import PartPeople from "./PartPeople";
import MoreLike from "./MoreLike";
import Trailer from "./Trailer";
import { Skeleton } from "../ui/skeleton";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

type MovieId = {
  movieId: number;
};

const MovieApi = (props: MovieId) => {
  const { movieId } = props;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [movieDetail, setMovieDetail] = useState<MovieDetail | any>({});
  const [trailerShow, setTrailerShow] = useState<boolean>(false);
  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${movieId}?language=en-US`,
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

  const handleTrailer = () => {
    if (trailerShow === false) {
      setTrailerShow(true);
    } else {
      setTrailerShow(false);
    }
  };
  if (loading) {
    <Skeleton className="h-96 w-96" />;
  }
  const runtime = movieDetail.runtime;
  const hour = Math.floor(runtime / 60);
  const minute = runtime - hour * 60;
  return (
    <div className="page-detail text-foreground mt-5">
      <Trailer movieId={movieId} trailerShow={trailerShow} />
      {!movieDetail.movieId ? (
        <div className="max-w-6xl">
          <div className="mt-8 mb-4 px-5 flex justify-between lg:mt-[52px] lg:mb-6 lg:px-0">
            <div className="space-y-1">
              <h1 className="break-words text-2xl font-bold w-52 lg:w-fit lg:text-4xl">
                {movieDetail.original_title}
              </h1>
              <h4 className="text-sm lg:text-lg flex">
                {movieDetail.release_date}
                {movieDetail.adult === false && <div> · PG · </div>} {hour}h{" "}
                {minute}m
              </h4>
            </div>
            <div className="flex flex-col justify-center">
              <h5 className="hidden lg:block w-full align-center">Rating</h5>
              <div className="flex py-[2px] gap-x-1">
                <Star
                  color="#fde047"
                  fill="#fde047"
                  className="bg-yellow w-[28px] h-[28px]"
                />
                <div className="flex flex-col items-center">
                  <div className="font-medium">
                    {movieDetail.vote_average}/10
                  </div>
                  <div>{movieDetail.vote_count}</div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-between mb-8">
            <div className="overflow-hidden relative hidden lg:block w-[290px] h-[428px] rounded">
              <Image
                src={`${TMDB_IMAGE_SERVICE_URL}/original/${movieDetail.poster_path}`}
                width={290}
                height={428}
                alt="property image"
                className="overflow-hidden"
              />
            </div>
            <div className="relative ">
              <Button
                onClick={handleTrailer}
                className="bg-inherit absolute bottom-6 right-6 z-30"
              >
                <div className="bg-white w-8 h-8 rounded-full pl-2 pt-2">
                  <Play color="black" />
                </div>
                <div>Play trailer 1:30</div>
              </Button>
              <div className=" overflow-hidden w-[375px] lg:w-[760px] h-[211px] lg:h-[428px] lg:rounded">
                <Image
                  src={`${TMDB_IMAGE_SERVICE_URL}/original/${movieDetail.backdrop_path}`}
                  width={760}
                  height={428}
                  alt="property image"
                  className="overflow-hidden w-full"
                />

                <div className="absolute inset-0 z-10 transition-all duration-300 group-hover:bg-primary/30"></div>
              </div>
            </div>
          </div>
          <div className="px-5 lg:px-0">
            <div className="flex gap-x-[34px] lg:block">
              <div className="relative overflow-hidden block w-[100px] h-[148px] rounded shrink-0 lg:hidden">
                <Image
                  src={`${TMDB_IMAGE_SERVICE_URL}/w500${movieDetail.poster_path}`}
                  width={290}
                  height={428}
                  alt="property image"
                  className="overflow-hidden"
                />
              </div>
              <div className="space-y-5 mb-5">
                <div className="flex flex-wrap gap-3">
                  {Array.isArray(movieDetail?.genres) &&
                    movieDetail.genres.length > 0 &&
                    movieDetail.genres.map((genre: any) => {
                      return (
                        <div
                          key={genre.id}
                          className="inline-flex items-center border px-2.5 py-0.5 font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full text-xs"
                        >
                          {genre.name}
                        </div>
                      );
                    })}
                </div>
                <p>{movieDetail.overview}</p>
              </div>
            </div>
            <PartPeople movieId={movieId} />
            <MoreLike movieId={movieId} />
          </div>
        </div>
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default MovieApi;

// "use client";
// import React, { useState, useEffect } from "react";
// import { ChevronRight, X, Star, Navigation } from "lucide-react";
// import axios from "axios";
// import { Separator } from "@radix-ui/react-separator";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import Image from "next/image";
// import { MovieDetail } from "../types/MovieDetail";

// type Genres = {
//   id: number;
//   name: string;
// };
// const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
// const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
// const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;
// const page = () => {
//   const [error, setError] = useState<string>("");
//   const [loading, setLoading] = useState<boolean>(false);
//   const [genres, setGenres] = useState<Genres[]>([]);
//   const [selectedGenreIds, setSelectedGenreIds] = useState<string[]>([]);
//   const [movies, setMovies] = useState<MovieDetail[]>([]);
//   const { push } = useRouter();

//   const searchParams = useSearchParams();
//   const searchedGenresId = searchParams.get("genresId");
//   const currentPage = Number(searchParams.get("page")) || 1
//   const [totalPage, SetTotalPage] = useState(1);
//   const [totalResults, setTotalResults] = useState(0);

//   const startPage = Math.max(0, currentPage - 2);
//   const slicePage = 3;
//   const endPage = Math.min(totalPage, startPage + slicePage);

//   const getGenres = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${TMDB_BASE_URL}/genre/movie/list?language=en`,
//         {
//           headers: {
//             Authorization: `Bearer ${TMDB_API_TOKEN}`,
//           },
//         }
//       );
//       setGenres(response.data.genres);
//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data.status_message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     getGenres();
//   }, []);

//   const getMovieGenres = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get(
//         `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${searchedGenresId}&page=${currentPage}`,
//         {
//           headers: {
//             Authorization: `Bearer ${TMDB_API_TOKEN}`,
//           },
//         }
//       );
//       setMovies(response.data.results);
//       console.log(response.data);

//       setLoading(false);
//     } catch (err) {
//       console.log(err);
//       setLoading(false);
//       if (axios.isAxiosError(err)) {
//         setError(err.response?.data.status_message);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     getMovieGenres();
//   }, [searchedGenresId]);

//   const handleGenreSelection = (genreId: any) => () => {
//     const updateGenres = selectedGenreIds.includes(genreId)
//       ? selectedGenreIds.filter((item) => item !== genreId)
//       : [...selectedGenreIds, genreId];
//     setSelectedGenreIds(updateGenres);
//     const queryParams = new URLSearchParams();
//     queryParams.set("genresId", updateGenres.join(","));
//     const newPath = queryParams.toString();
//     push(`/genre?${newPath}`);
//   };
//   return (
//     <div className="flex flex-col page-primary pt-[59px]">
//       <div className="py-8 lg:pt-[52px]">
//         <h3 className="mb-8 text-2xl font-semibold text-foreground lg:text-3xl">
//           Search Filter
//         </h3>
//         <div className="flex flex-col lg:flex-row space-y-8 lg:space-y-0">
//           <div className="static h-fit w-full lg:sticky lg:top-[111px] lg:w-[387px] space-y-5">
//             <div className="text-foreground space-y-1">
//                 <div className="text-2xl font-semibold">Genres</div>
//                 <div>See lists of movies by genre</div>
//             </div>
//             <div className="flex flex-wrap gap-4">
//               {genres?.length > 0 &&
//                 genres.map((item) => {
//                   const genreId: string = item.id.toString();
//                   const isSelected = selectedGenreIds.includes(genreId);
//                   return (
//                     <div
//                       onClick={handleGenreSelection(genreId)}
//                       key={item.name}
//                       className={`${
//                         isSelected
//                           ? "bg-black text-white dark:bg-white dark:text-black"
//                           : ""
//                       } inline-flex items-center border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 text-foreground rounded-full cursor-pointer`}
//                     >
//                       {item.name}
//                       {isSelected ? (
//                         <X width={16} height={16} />
//                       ) : (
//                         <ChevronRight width={16} height={16} />
//                       )}
//                     </div>
//                   );
//                 })}
//             </div>
//           </div>
//           <Separator orientation="vertical" className="shrink-0 bg-border w-[1px] hidden lg:block border h-screen mx-4"/>
//           <div className="w-full justify-center">
//             <div className="flex justify-between mb-9">
//               <div>{movies.length} titles</div>
//             </div>
//             <div className="flex flex-wrap gap-10 ">
//               {movies.length > 0 &&
//                 movies.map((movie, index) => {
//                   return (
//                     <Card
//                       onClick={() => {
//                         push(`/detail/${movie.id}`);
//                       }}
//                       key={index}
//                       className="bg-secondary"
//                     >
//                       <CardContent className="p-0 w-[157.5px] bg-zinc-500 overflow-hidden rounded-lg bg-hidden space-y-1 lg:w-[233px]">
//                         <div className="flex flex-col justify-center">
//                           <Image
//                             src={`${TMDB_IMAGE_SERVICE_URL}/original/${movie.poster_path}`}
//                             width={157.5}
//                             height={233.1}
//                             alt="property image"
//                             className="overflow-hidden rounded-lg w-full"
//                           />
//                           <div className="flex pl-2 mt-2">
//                             <Star
//                               color="#fde047"
//                               fill="#fde047"
//                               className="bg-yellow"
//                             />
//                             <span>{movie.vote_average}/10</span>
//                           </div>
//                           <div className="w-full text-sm overflow-hidden pl-2 mb-2 mt-1">
//                             {movie.title}
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   );
//                 })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default page;
