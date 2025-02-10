"use client";
import React from "react";
import { useParams } from "next/navigation";
import MovieList from "@/components/HomePage/MovieList";
const Page = (props:string) => {
  const {endpoints} = props
  const params = useParams();
  console.log(params.segment);
  return <div>Category Page {params.segment}
  <MovieList endpoints={params.segment}/>
  </div>;
};
export default Page;
