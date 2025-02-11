import React, { useState } from "react";
import { Button } from "../ui/button";
import { Play } from "lucide-react";

export const PlayMovie = () => {
  const [trailerShow, setTrailerShow] = useState<boolean>(false);
  
  const handleTrailer = () => {
    if (trailerShow === false) {
      setTrailerShow(true);
    } else {
      setTrailerShow(false);
    }
  };

  return (
    <Button
      onClick={handleTrailer}
      className="bg-inherit absolute left-6 bottom-6 z-30 cursor-pointer"
    >
      <div className="bg-white w-[40px] h-[40px] rounded-full pl-3 pt-3">
        <Play color="black" />
      </div>
      <div>Play trailer 1:30</div>
    </Button>
  );
};
