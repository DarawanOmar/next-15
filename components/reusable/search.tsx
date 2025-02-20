"use client";
import React, { Suspense } from "react";
import { Input } from "../ui/input";
import { useQueryState } from "nuqs";
import { cn } from "@/lib/utils";
import { SearchIcon } from "@/public/icons";

type Props = {
  nameSearch?: string;
  className?: string;
  palceHolder?: string;
};

function Search({
  nameSearch = "search",
  className,
  palceHolder = "گەڕان...",
}: Props) {
  const [name, setName] = useQueryState(nameSearch, {
    clearOnDefault: true,
    defaultValue: "",
    shallow: false,
    throttleMs: 1000,
  });
  return (
    <Input
      value={name}
      onChange={(e) => setName(e.target.value)}
      type="search"
      placeholder={palceHolder}
      Icon={SearchIcon}
      className={cn(
        "placeholder:font-normal placeholder:font-sirwan_reguler placeholder:text-muted-foreground",
        className
      )}
      sizeIcon={20}
    />
  );
}

export default Search;

export function FallBackInput() {
  return (
    <Input
      type="search"
      placeholder={"چاوەڕێبکە"}
      Icon={SearchIcon}
      className={cn(
        "placeholder:font-normal placeholder:font-sirwan_reguler placeholder:text-muted-foreground"
      )}
      sizeIcon={20}
    />
  );
}
