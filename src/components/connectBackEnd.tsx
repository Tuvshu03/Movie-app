"use client"
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

type Moviee = {
  title: string;
  description: string;
};

const ConnectBackEnd = () => {
  const [movieData, setMovieData] = useState<Moviee[]>([]);
  const getMovie = async () => {
    const { data } = await axios.get("http://localhost:3000/users/login");
    setMovieData(data);
    // console.log("sad", data);
  };
  useEffect(() => {
    getMovie();
  }, []);

  console.log(movieData);
  return (
    <div className="mt-16">
        <Input placeholder="username"/>
        <Input placeholder="password"/>
        <Button/>
    </div>
  );
};

export default ConnectBackEnd;
