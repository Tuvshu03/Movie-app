import { ChangeEvent, useEffect } from "react";
import { Input } from "./ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { SearchResultMovies } from "./searchResults";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Calculator,
  Calendar,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandDialog,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import axios from "axios";
import { MovieDetail } from "@/app/types";

const TMDB_BASE_URL = process.env.TMDB_BASE_URL;
const TMDB_API_TOKEN = process.env.TMDB_API_TOKEN;
const TMDB_IMAGE_SERVICE_URL = process.env.TMDB_IMAGE_SERVICE_URL;

export function SearchBar() {
  const [searchValue, setSearchValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [nowPlayingData, setNowPlayingData] = useState<MovieDetail[]>([]);

  const handleMovie = (value: string) => {
    setSearchValue(value);
    console.log("Search value updated:", value);
  };

  const getMovieData = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=1`,
        {
          headers: {
            Authorization: `Bearer ${TMDB_API_TOKEN}`,
          },
        }
      );
      console.log("API Response:", response.data.results);
      setNowPlayingData(response.data.results);
      setLoading(false);
    } catch (err) {
      console.log("Error fetching data:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchValue.length > 0) {
      getMovieData();
    }
  }, [searchValue]);

  useEffect(() => {
    if (isOpen) return;
    if (searchValue.length > 0) {
      setIsOpen(true);
    }
  }, [searchValue]);

  return (
    <Command className="rounded-lg border shadow-md md:min-w-[450px]">
      <div className="text-muted-foreground w-[379px]">
        <Search className="absolute top-2.5 left-2.5 w-4 h-4" />
        <CommandInput
          placeholder="Search"
          value={searchValue}
          onChangeCapture={(e) => handleMovie(e.target.value)}
          className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
        />
      </div>
      {searchValue && (
        <CommandList>
          {loading ? (
            <CommandEmpty>Loading...</CommandEmpty>
          ) : nowPlayingData.length === 0 ? (
            <CommandEmpty>No results found.</CommandEmpty>
          ) : (
            <CommandGroup heading="Suggestions">
              {nowPlayingData.slice(0, 5).map((movie, index) => {
                console.log("Rendering movie:", movie); // Add logging to ensure movie is being rendered

                return (
                  <CommandItem key={index}>
                    <Calendar />
                    <p>{movie.title}</p>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          )}
        </CommandList>
      )}
    </Command>
  )
}


// const SearchBar = () => {
//   const [searchValue, setSearchValue] = useState<string>("");
//   const [isOpen, setIsOpen] = useState(false);

//   const handleMovie = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchValue(event.target.value);
//   };

//   const handleInputChange = () => {
//     console.log("ajillaa", searchValue);
//     // setIsOpen(!isOpen);

//     // if (searchValue.length > 0) {
//     //   // setIsOpen(true);

//     setIsOpen(!isOpen);
//     // }
//   };

//   useEffect(() => {
//     if (isOpen) return;
//     if (searchValue.length > 0) {
//       console.log(searchValue.length);

//       setIsOpen(true);
//     }
//   }, [searchValue]);

//   return (
//     <div className=" rounded-md">
//       <Popover open={isOpen} onOpenChange={handleInputChange}>
//         <PopoverTrigger asChild>
//           <div className=" text-muted-foreground w-[379px]">
//             <Search className="absolute top-2.5 left-2.5 w-4 h-4" />
//             <Input
//               placeholder="Search"
//               value={searchValue}
//               onChange={(event) => {
//                 handleMovie(event);
//               }}
//               className="flex h-9 rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm pl-[38px]"
//             />
//           </div>
//         </PopoverTrigger>
//         <PopoverContent className="h-full w-full">
//           <SearchResultMovies
//             searchValue={searchValue}
//             setSearchValue={setSearchValue}
//           />
//         </PopoverContent>
//       </Popover>
//     </div>
//   );
// };

// export default SearchBar;
