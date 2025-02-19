"use client";
import React from "react";
import { useParams } from "next/navigation";
import MovieApi from "@/components/MovieDetail/MovieApi";

const Page = () => {
  const params = useParams();
  return (
    <div className="flex justify-center">
      <MovieApi movieId={params.id} />
    </div>
  );
};
export default Page;
