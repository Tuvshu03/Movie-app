import React, { useEffect, useState } from "react";
import axios from "axios";
import { Star } from "lucide-react";
import { Card, CardContent } from "../ui/card";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;

const NowPlayingSlider = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [nowPlayingData, setNowPlayingData] = useState([]);

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/movie/now_playing?language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      setNowPlayingData(response.data.result);
      console.log(response);
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
    <div className="w-full justify-center">
      {/* <Carousel className="w-full ">
        <CarouselContent>
          {Array.from({ length: 5 }).map((_, index) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <CarouselPrevious />
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <div>
                      <div className="static text-foreground absolute top-1/2 left-[140px] -translate-y-1/2 z-10">
                        <div className="p-5 space-y-4 p-0">
                          <div className="flex justify-between flex-col space-y-1">
                            <div>
                              <h4 className="text-sm">Now playing</h4>
                              <h3 className="w-52 text-2xl font-semibold truncate">
                                Sonic the Hedgehog 3
                              </h3>
                            </div>
                            <div>
                              <Star />
                              7.1/10
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel> */}
    </div>
  );
};

export default NowPlayingSlider;
