"use client";
import React from "react";
import { useParams } from "next/navigation";
import MovieApi from "@/components/MovieDetail/MovieApi";

type detail = {
  movieId: number;
};
const Page = (movieId: detail) => {
  const params = useParams();
  return (
    <div>
      <MovieApi movieId={params.id} />
    </div>
  );
};
export default Page;
