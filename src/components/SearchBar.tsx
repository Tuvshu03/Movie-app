import { ChangeEvent } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { SearchResultMovies } from "./searchResults";

const SearchBar = () => {
  const [searchValue, setSearchValue] = useState<string>("");

  const handleMovie = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
  };

  return (
    <div className=" rounded-md">
      <div className="relative text-muted-foreground w-[379px] ">
        <Search className="absolute top-2.5 left-2.5 w-4 h-4" />
        <Input
          placeholder="Search"
          value={searchValue}
          onChange={handleMovie}
          className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
        />
      </div>
      <SearchResultMovies
        searchValue={searchValue}
        setSearchValue={setSearchValue}
      />
    </div>
  );
};

export default SearchBar;
