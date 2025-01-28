"use client";
import React from "react";
import { Film, Moon, Search, Sun } from "lucide-react";
import { Button } from "../ui/button";
import { useTheme } from "next-themes";

const Header = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex justify-between items-center my-3">
      <div className="flex gap-2 text-indigo-700">
        <Film />
        <p className="font-bold">Movie Z</p>
      </div>
      <div className="flex gap-3">
        <Button variant="outline" className="w-[36px] h-[36px]">
          <Search />
        </Button>
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
  );
};

export default Header;
