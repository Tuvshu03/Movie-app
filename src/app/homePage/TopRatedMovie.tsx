import React, { useEffect, useState } from 'react'
import axios from 'axios'

const TopRatedMovie = ( ) => {
    const  TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [nowPlayingData, setNowPlayingData] = useState([]);

    const getMovieData = async ()=>{
        try{
          setLoading(true)
            const response = await axios.get(`${TMDB_BASE_URL}/movie/top_rated?language=en-US&page=1`,
              {headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,  
              }}
            )
            setNowPlayingData(response.data.result);
            setLoading(false)
        }
        catch(err){
          setLoading(false);
          if(axios.isAxiosError(err)){
            setError(err.response?.data.status_message)
          }

        }
        finally{ setLoading(false);}
    }
    useEffect(()=>{
      getMovieData()
    }, [])
  return (
    <div>TopRatedMovie</div>
  )
}

export default TopRatedMovie