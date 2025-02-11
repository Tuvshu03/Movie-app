"use client";
import React from "react";
import { useParams } from "next/navigation";
import MovieList from "@/components/HomePage/MovieList";
type MovieName = {
  endpoint: string,
  name:string
};
const Page = (props: MovieName) => {
  const params = useParams();
  return (
    <div className="flex justify-center">
      <MovieList endpoint={params.segment} />
    </div>
  );
};
export default Page;
