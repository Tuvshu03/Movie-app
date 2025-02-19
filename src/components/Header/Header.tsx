"use client";

import React, { useState } from "react";
import { Film, Moon, Search, Sun, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { SearchResponsive } from "./SearchResponsive";
import { useRouter } from "next/navigation";
import GenresApi from "./GenresApi";
import SearchBar from "../SearchBar";

const Header = () => {
  const [reverse, setReverse] = useState(false);
  const { theme, setTheme } = useTheme();
  const { push } = useRouter();

  const handleReverse = () => {
    if (!reverse) {
      setReverse(true);
    } else {
      setReverse(false);
    }
  };

  return (
    <div className="fixed inset-0 z-30 bg-secondary h-16">
      {reverse === true ? (
        <SearchResponsive reverse={reverse} handleReverse={handleReverse} />
      ) : (
        <div className="flex justify-between my-3 max-w-7xl mx-auto">
          <div
            className="flex gap-2 text-indigo-700 cursor-pointer"
            onClick={() => {
              push(`../`);
            }}
          >
            <Film />
            <p className="font-bold">Movie Z</p>
          </div>
          <div className="gap-4 hidden lg:flex">
            <GenresApi />
            <SearchBar />
          </div>
          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <Button
                onClick={handleReverse}
                variant="outline"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
              >
                <Search />
              </Button>
            </div>

            {theme === "dark" ? (
              <Button
                variant="outline"
                className="w-9 h-9"
                onClick={() => setTheme("light")}
              >
                <Sun />
              </Button>
            ) : (
              <Button
                variant="outline"
                className="w-9 h-9"
                onClick={() => setTheme("dark")}
              >
                <Moon />
              </Button>
            )}
          </div>
        </div>
        // </div>
      )}
    </div>
  );
};

export default Header;
