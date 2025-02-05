import React, { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Search, X, ChevronRight, ChevronDown } from "lucide-react";
import { Input } from "../ui/input";
import GenresApi from "./GenresApi";


export const SearchResponsive = (props) => {
  const { handleReverse } = props;

  return (
    <div className="flex  items-center justify-between bg-background w-full">
      <div className="flex gap-3">
        <GenresApi/>
        <div className="flex h-9 w-full items-center rounded-md border-black">
          <Search />
          <Input placeholder="Search" className="output-none" />
        </div>
      </div>
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
