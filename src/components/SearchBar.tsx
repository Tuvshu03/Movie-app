import React from 'react'
import { Input } from './ui/input'
import { Search } from 'lucide-react'
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from 'react';
import axios from 'axios';

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

type movieView = {
  name: string;
  endpoint: string;
};

const SearchBar = () => {

  const { push } = useRouter();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=${page}`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.results);
    
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
      if (axios.isAxiosError(err)) {
        setError(err.response?.data.status_message);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovieData();
  }, []);
  return (
          <div className="flex h-9 w-full items-center rounded-md border-black">
              <Search/>
              <Input placeholder="Search"
              className="output-none"/>
            </div>
  )
}

export default SearchBar