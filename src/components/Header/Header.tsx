"use client";
import React, { useState } from "react";
import { Film, Moon, Search, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";
import { SearchResponsive } from "./SearchResponsive";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectLabel, SelectItem } from "@radix-ui/react-select";
import { Input } from "../ui/input";
import { useRouter } from "next/navigation";
const Header = () => {
  const { theme, setTheme } = useTheme();
  const {push} = useRouter()

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
          <div className="flex gap-2 text-indigo-700"
          onClick={()=>{push(`../`)}}>
            <Film />
            <p className="font-bold">Movie Z</p>
          </div>
          <div className="flex gap-4">
          <Select>
          <SelectTrigger className="w-9 h-9">
          <SelectValue placeholder="Genres"/>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel></SelectLabel>
              <SelectItem value="apple">Apple</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        
        <div className="flex h-9 w-full items-center rounded-md border-black">
          <Search/>
          <Input placeholder="Search"
          className="output-none"/>
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
