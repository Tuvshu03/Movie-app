"use client";
import React from "react";
import { useParams } from "next/navigation";
import MovieApi from "@/components/MovieDetail/MovieApi";

const Page = () => {
  const { id } = useParams();

  if (!id) return null;

  return (
    <div className="flex justify-center">
      <MovieApi movieId={Number(id)} />
    </div>
  );
};
export default Page;
