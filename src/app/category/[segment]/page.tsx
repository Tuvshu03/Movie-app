"use client";

import React, { useEffect, useState } from "react";
import { Star, ArrowRight, ArrowLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import axios from "axios";
import { MovieDetail } from "@/app/types";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

const Page = () => {
  const { push } = useRouter();
  const [, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieDetail[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const params = useParams();
  const endpoint = params.segment;

  const getMovieData = async (page: number) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/${endpoint}?language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.results);
      setTotalPages(response.data.total_pages);
    } catch (err) {
      console.error(err);
      setError("An error occurred while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieData(currentPage);
  }, [currentPage]);

  let name = "Now Playing";
  if (endpoint === "upcoming") {
    name = "Upcoming";
  } else if (endpoint === "popular") {
    name = "Popular";
  } else if (endpoint === "top_rated") {
    name = "Top Rated";
  }

  if (loading) {
    return (
      <div className="animate-pulse">
        Loading...
        <div className="mt-16 w-full max-w-7xl flex flex-col items-center mx-auto p-0">
          <div className="w-full max-w-7xl justify-center p-0">
            <div className="mb-9 mt-8 text-3xl font-semibold">{name}</div>
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 justify-center">
              {[...Array(10)].map((_, index) => (
                <div key={index} className="flex justify-center col-span-1">
                  <Card className="w-[157.5px] lg:w-[233px] bg-secondary">
                    <CardContent className="p-0 w-full bg-zinc-500 overflow-hidden rounded-lg bg-hidden">
                      <div className="flex flex-col justify-center">
                        <div className="w-full h-[233px] bg-gray-300 animate-pulse"></div>
                        <div className="flex pl-2 mt-2">
                          <div className="bg-yellow w-[20px] h-[20px] animate-pulse"></div>
                          <span className="bg-gray-400 w-16 h-4 animate-pulse"></span>
                        </div>
                        <div className="w-full text-sm overflow-hidden pl-2 mb-2 mt-1 bg-gray-400 animate-pulse h-5"></div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-16 w-full max-w-7xl flex flex-col items-center mx-auto p-0">
      <div className="w-full max-w-7xl justify-center p-0">
        <div className="mb-9 mt-8 text-3xl font-semibold">{name}</div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-5 justify-center">
          {nowPlayingData.length > 0 &&
            nowPlayingData.map((movie, index) => (
              <div key={index} className="flex justify-center col-span-1 cursor-pointer">
                <Card
                  onClick={() => {
                    push(`/detail/${movie.id}`);
                  }}
                  className="w-[157.5px] lg:w-[233px] bg-secondary"
                >
                  <CardContent className="p-0 w-full bg-zinc-500 overflow-hidden rounded-lg bg-hidden">
                    <div className="flex flex-col justify-center">
                      <Image
                        src={`${TMDB_IMAGE_SERVICE_URL}/w500${movie.poster_path}`}
                        width={157.5}
                        height={233}
                        alt="property image"
                        className="overflow-hidden rounded-lg w-full"
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
              </div>
            ))}
        </div>

        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationPrevious
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              aria-disabled={currentPage === 1}
            >
              <ArrowLeft />
            </PaginationPrevious>

            {[...Array(totalPages)].map((_, index) => {
              const pageNum = index + 1;
              return (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    onClick={() => setCurrentPage(pageNum)}
                    className={currentPage === pageNum ? "font-bold" : ""}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              );
            })}

            <PaginationNext
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              aria-disabled={currentPage === totalPages}
            >
              <ArrowRight />
            </PaginationNext>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
};

export default Page;
