import React, { useEffect, useState } from 'react'
import axios from 'axios'

const NowPlayingSlider = () => {
  
    const  TMDB_BASE_URL = process.env.TMDB_BASE_URL;
    const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [nowPlayingData, setNowPlayingData] = useState([]);

    const getMovieData = async ()=>{
        try{
          setLoading(true)
            const response = await axios.get(`${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
              {headers: {
                Authorization: `Bearer ${TMDB_API_TOKEN}`,  
              }}
            )
            setNowPlayingData(response.data.result);
            console.log(response.data.result)
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
    <div>HomePlayingSlider</div>
  )
}

export default NowPlayingSlider