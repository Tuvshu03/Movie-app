"use client";
import React, { useState } from "react";
import { Film, Moon, Search, Sun, ChevronDown } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { SearchResponsive } from "./SearchResponsive";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
import GenresApi from "./GenresApi";

const Header = () => {
  const { theme, setTheme } = useTheme();
  const { push } = useRouter();

  const [reverse, setReverse] = useState(false);
  const handleReverse = () => {
    if (!reverse) {
      setReverse(true);
    } else {
      setReverse(false);
    }
  };
  return (
    <div>
      {reverse === true ? (
        <SearchResponsive reverse={reverse} handleReverse={handleReverse} />
      ) : (
        <div className="flex justify-between items-center my-3">
          <div
            className="flex gap-2 text-indigo-700"
            onClick={() => {
              push(`../`);
            }}
          >
            <Film />
            <p className="font-bold">Movie Z</p>
          </div>
          <div className="gap-4 hidden lg:flex">
            <GenresApi/>
            <div className="relative text-muted-foreground w-[379px] ">
              <Search className="absolute top-2.5 left-2.5 w-4 h-4"/>
              <Input placeholder="Search" className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"></Input>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="sm:hidden">
              <Button
                onClick={handleReverse}
                variant="outline"
                className="w-[36px] h-[36px] inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground h-9 w-9"
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
      )}
    </div>
  );
};

export default Header;
