"use client"
import React from "react";
import { useParams } from "next/navigation";
const Page = () => {
  const params = useParams();
  console.log(params.id)
  return <div>Detail Page {params.id}</div>;
};
export default Page;
