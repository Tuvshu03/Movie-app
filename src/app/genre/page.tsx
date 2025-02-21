"use client";

import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { ChevronRight, Star, X } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Skeleton } from "@/components/ui/skeleton";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const Genre = (props: any) => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;
  const router = useRouter();
  const [totalPage, SetTotalPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const startPage = Math.max(0, currentPage - 2);
  const slicePage = 3;
  const endPage = Math.min(totalPage, startPage + slicePage);

  const [genres, setGenres] = useState<{ id: number; name: string }[]>([]);

  const selectedGenreIds = searchParams.get("genresId")?.split(",") || [];

  interface Movie {
    vote_average: number;
    poster_path: string | null;
    id: number;
    title: string;
  }

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");


  const getMovieData = useCallback(async () => {
    try {
      setLoading(true);

      const genreListResponse = await axios.get(
        `${TMDB_BASE_URL}/genre/movie/list?language=en`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      const genreIds = searchParams.get("genresId") || "";
      const genreMoviesResponse = await axios.get(
        `${TMDB_BASE_URL}/discover/movie?language=en&with_genres=${genreIds}&page=${currentPage}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );

      SetTotalPage(genreMoviesResponse.data.total_pages);
      setGenres(genreListResponse.data.genres);
      setMovies(genreMoviesResponse.data.results);
      setTotalResults(genreMoviesResponse.data.total_results);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.status_message || "Алдаа гарлаа.");
      }
    }
  }, [searchParams, currentPage]);

  useEffect(() => {
    getMovieData();
  }, [getMovieData, currentPage, searchParams]);
  
  const x = (genreId: number) => {
    const genreIdStr = genreId.toString();
    let updatedGenres;

    if (selectedGenreIds.includes(genreIdStr)) {
      updatedGenres = selectedGenreIds.filter((id) => id !== genreIdStr);
    } else {
      updatedGenres = [...selectedGenreIds, genreIdStr];
    }

    const queryParams = new URLSearchParams();

    if (updatedGenres.length > 0) {
      queryParams.set("genresId", updatedGenres.join(","));
    } else {
      queryParams.delete("genresId");
    }

    router.push(`/genre/?${queryParams.toString()}`);
  };

  const handlePageChange = (pageNumber: number) => {
    if (pageNumber > 0 && pageNumber <= totalPage) {
      const genreIds = searchParams.get("genresId") || "";
      router.push(`/genre?genresId=${genreIds}&page=${pageNumber}`);
    }
  };

  if(loading){
    return <Skeleton className="w-full px-5 p-8 xl:w-[1280px] flex flex-wrap justify-between">

    </Skeleton>
  }

  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-full px-5 p-8 xl:w-[1280px] flex flex-wrap justify-between">
        <div className="mb-8 text-2xl font-semibold xl:w-[1280px] xl:h-[36px] xl:mb-10">
          Search Filter
        </div>
        <div className="w-auto h-auto xl:w-[387px] xl:h-[352px] lg:sticky">
          <div className="flex justify-between items-start flex-col">
            <div className="text-xl font-semibold ">Search by genre</div>
            <div className="text-base font-normal">
              See lists of movies by genre
            </div>
          </div>
          <div className="flex flex-wrap mt-5 gap-3  ">
            {genres.length > 0 &&
              genres.map((genre) => {
                const genreId = genre.id.toString();
                const isSelected = selectedGenreIds.includes(genreId);
                return (
                  <div
                    key={genre.id}
                    className={`${
                      isSelected
                        ? "bg-black text-white dark:bg-white dark:text-black "
                        : ""
                    }h-[20px] border border-gray-500 rounded-full flex justify-between gap-2 items-center p-[10px] text-xs font-semibold cursor-pointer`}
                    onClick={() => x(genre.id)}
                  >
                    {genre.name}
                    {isSelected ? (
                        <X width={16} height={16} />
                      ) : (
                        <ChevronRight width={16} height={16} />
                      )}
                  </div>
                );
              })}
          </div>
        </div>
        <div className="flex flex-col justify-center items-start ">
          <div className="text-xl font-semibold mt-8 xl:mt-0">
            {totalResults} titles{" "}
          </div>
          <div className="flex flex-col items-end ">
            <div className="w-[350px] sm:w-[806px] h-auto justify-items-center items-between gap-4 sm:gap-[31.2px] my-10 grid grid-cols-4">
            {movies.length > 0 &&
                movies.map((movie, index) => {
                  return (
                    <Card
                      onClick={() => {
                        push(`/detail/${movie.id}`);
                      }}
                      key={index}
                      className="bg-secondary"
                    >
                      <CardContent className="p-0 w-[157.5px] bg-zinc-500 overflow-hidden rounded-lg bg-hidden space-y-1 lg:w-[190px]">
                        <div className="flex flex-col justify-center">
                          <Image
                            src={`${TMDB_IMAGE_SERVICE_URL}/original/${movie.poster_path}`}
                            width={157.5}
                            height={233.1}
                            alt="property image"
                            className="overflow-hidden w-full"
                          />
                          <div className="flex pl-2 mt-2">
                            <Star
                              color="#fde047"
                              fill="#fde047"
                              className="bg-yellow"
                            />
                            <span>{movie.vote_average}/10</span>
                          </div>
                          <div className="w-full text-sm overflow-hidden pl-2 mb-2 mt-1">
                            {movie.title}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })}
            </div>
            <div className="xl:w-[110px] xl:h-[40px] flex justify-end items-end xl:mr-10">
              <Pagination className="w-auto float-right">
                <PaginationContent className="">
                  <PaginationItem>
                    <PaginationPrevious
                      className={`${
                        currentPage === 1 && "opacity-50 cursor-default"
                      }`}
                      onClick={() => handlePageChange(currentPage - 1)}
                    />
                  </PaginationItem>

                  {[...Array(totalPage).keys()]
                    .slice(startPage, endPage)
                    .map((pageNum) => (
                      <PaginationItem key={pageNum + 1}>
                        <PaginationLink
                          onClick={() => handlePageChange(pageNum + 1)}
                          isActive={currentPage === pageNum + 1}
                        >
                          {pageNum + 1}
                        </PaginationLink>
                      </PaginationItem>
                    ))}
                  <PaginationItem>
                    <PaginationNext
                      className={`${
                        currentPage === totalPage && "opacity-50 cursor-default"
                      }`}
                      onClick={() => handlePageChange(currentPage + 1)}
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Genre;
