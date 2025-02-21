import React, { useEffect, useState } from "react";
import axios from "axios";
type Moviee = {
    title:string,
    description: string
}

const ConnectBackEnd = () => {
  const [movieData, setMovieData] = useState<Moviee[]>([]);
  const getMovie = async () => {
    const { data } = await axios.get("http://localhost:3000/movie");
    setMovieData(data);
    console.log("sad", data)
  };
  useEffect(()=>{
    getMovie()
  }, [])
  return (
    <div>
      {movieData.map((movie) => {
        return <div>
            <p className="">{movie.title}</p>
        </div>
      })}
    </div>
  );
};

export default ConnectBackEnd;
