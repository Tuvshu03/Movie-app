"use client";
import React from "react";
import { useParams } from "next/navigation";
import MovieApi from "@/components/MovieDetail/MovieApi";
import PartPeople from "@/components/MovieDetail/PartPeople";
import Trailer from "@/components/MovieDetail/Trailer";
import MoreLike from "@/components/MovieDetail/MoreLike";
type detail= {
  id: number
}
const Page = () => {
  const params = useParams();
  return (
<div>
  <MovieApi id={params.id}/>
</div>
 
  );
};
export default Page;
