import React from "react";
import { Button } from "../ui/button";
import { X } from "lucide-react";
import GenresApi from "./GenresApi";
import SearchBar from "../Search/SearchBar";

type SearchProps = {
  handleReverse: () => void;
};
export const SearchResponsive = (props: SearchProps) => {
  const { handleReverse } = props;

  return (
    <div className="flex justify-between w-full gap-2">
      <GenresApi />
      <SearchBar />
      <Button
        onClick={handleReverse}
        variant="outline"
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
      >
        <X />
      </Button>
    </div>
  );
};
