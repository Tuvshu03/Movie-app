import React, {useState} from "react";
import { Button } from "../ui/button";
import { Search, X } from "lucide-react";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
// type SearchResponsive={
//   handleReverse: function
// }
export const SearchResponsive = (props) => {
  const { handleReverse} = props;
  
  return (
    <div className="flex h-[59px] items-center justify-between bg-background w-full">
      <div className="flex gap-3">
        <Select>
          <SelectTrigger className="w-9 h-9"></SelectTrigger>
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
